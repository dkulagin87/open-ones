/*
 * CentralConntroller.java 0.1 June 30, 2010
 * 
 * Copyright (c) 2010, LunarCal4U
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package openones.corewa;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import openones.corewa.config.ConfigUtil;
import openones.corewa.config.CoreWa;
import openones.corewa.config.Event;
import openones.corewa.config.Screen;
import openones.corewa.control.BaseControl;
import openones.corewa.res.DefaultRes;
import rocky.common.CommonUtil;
import rocky.common.Constant;

public class CentralConntroller extends HttpServlet {
    /**  . */
    private static final String SK_LANG = "lang";
    /**      */
    private static final String K_EVENT_ID = "eventId";
    /**      */
    private static final String K_SCREEN_ID = "screenId";
    private final Logger LOG = Logger.getLogger(this.getClass().getName());
    private final static String DEF_EVENTID = "init";
    private final static String DEF_PROCID = "procInit";
    private final static String DEF_ERRORPAGE = "/WEB-INF/pages/error.jsp";
    private CoreWa conf;
    private BaseOutForm resultForm;

    static Map<String, Object> cacheControl = new HashMap<String, Object>();
    
    /** Previous value of language code. */
    private String preLang;
    
    /** Value language code of current request. */  
    private String lang;

    public final static String KEY_RESOURCE = "KEY_RESOURCE_CONF";
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        String confFile = config.getInitParameter("conf-file");
        String realPath = config.getServletContext().getRealPath("WEB-INF/" + confFile);
        LOG.finest("real path of confFile=" + confFile);
        try {
            conf = ConfigUtil.parse(new FileInputStream(realPath));
        } catch (FileNotFoundException fnfex) {
            LOG.log(Level.CONFIG, "init", fnfex);
            throw new ServletException(fnfex);
        }
        
        // Load resource
        String langCd = (String) config.getServletContext().getAttribute(SK_LANG);
        
        DefaultRes resource = DefaultRes.getInstance(new String[]{langCd, DefaultRes.DEF_LANG});
        if (resource != null) {
            for (Object key : resource.getKey()) {
                this.getServletContext().setAttribute(key.toString(), resource.get(key.toString()));
            }
            
            // Update the previous, current language code
            preLang = resource.getLang();
            lang = preLang;
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Screen screen;
        Event event;
        Object controlClass = null;
        String procId = null;
        String nextScrId = null;
        Method method;
        
        try {
            req.setCharacterEncoding(Constant.DEF_ENCODE);
            resp.setCharacterEncoding(Constant.DEF_ENCODE);

            String screenId = req.getParameter(K_SCREEN_ID);
            String eventId = req.getParameter(K_EVENT_ID);
            String servletPath = req.getServletPath().substring(1); // servlet path without forward character /

            // Get the language code from the request
            lang = req.getParameter(SK_LANG);
            
            LOG.log(Level.INFO, "servlet path=" + servletPath);
            LOG.log(Level.INFO, "home screen id=" + conf.getHomeScreenId());
//            if ((conf.getLayout() != null) && (conf.getLayout().getPart(servletPath) != null) && (screenId == null)) {
//                Part homePart = conf.getLayout().getPart(servletPath);
//                screenId = homePart.getScreenId();
//                LOG.log(Level.INFO, "Layout mode; screenId=" + screenId);
//            }
            
            if ((screenId == null) || (eventId == null)) {
                eventId = DEF_EVENTID;
            }

            LOG.log(Level.INFO, "screenId=" + screenId + ";eventId=" + eventId);
            screen = conf.getScreen(screenId);

            if (screen == null) { // Using home screen from the configuration
                screen = conf.getScreens().get(conf.getHomeScreenId());
            }

            event = screen.getEvent(eventId);

            if (event != null) {
                procId = event.getProcId();
                nextScrId = event.getNextScrId();
            }

            if (!CommonUtil.isNNandNB(procId)) { // procId is not declared, it is default
                procId = DEF_PROCID;
            }

            if (!CommonUtil.isNNandNB(nextScrId)) { // the next screen id is not declared, it is the same.
                nextScrId = screen.getInputPage();
            }

            LOG.log(Level.INFO, "procId=" + procId + ";nextScreenId=" + nextScrId);
            
            String ctrlClassName = screen.getCtrlClass();
            
            if (CommonUtil.isNNandNB(ctrlClassName)) {
                if (cacheControl.containsKey(ctrlClassName)) { // The control is already created
                    controlClass = cacheControl.get(ctrlClassName);
                } else { // Create new the instance of the control. The put it into the cache
                    try {
                        Class ctrlClazz = Class.forName(ctrlClassName);
                        // Get constructor with parameter ServletConfig
                        Constructor<Object> ctrlCtor = ctrlClazz.getConstructor(ServletConfig.class);
                        controlClass = ctrlCtor.newInstance(this.getServletConfig());
                    } catch (Exception noMethodOrSecurityEx) {
                        // call default constructor
                        LOG.warning("Could not new instance of the control with parameter ServletConfig."
                                    + noMethodOrSecurityEx.getMessage());
                        controlClass = Class.forName(ctrlClassName).newInstance();  
                    }
                    // Save the control class into Cache
                    cacheControl.put(ctrlClassName, controlClass);
                }
            }

            // Assumption if tag <event> without attribute "redirect", tag "control" is not null
            if ((event != null) && (!event.isRedirect())) {
               // ScreenForm screenForm = (ScreenForm) BaseControl.getData(request, ScreenForm.class);
                Map<String, Object> mapReq = BaseControl.getMapData(req);
                
                if (!CommonUtil.isNNandNB(lang)) { // get the language code from the request
                    lang = (String) mapReq.get(SK_LANG);
                }
                
                LOG.log(Level.FINE, "Invoke method '" + procId + "' of class '" + screen.getCtrlClass() + "'");
                
                try {
                    method = controlClass.getClass().getMethod(procId, HttpServletRequest.class, Map.class,
                            HttpServletResponse.class);
                    resultForm = (BaseOutForm) method.invoke(controlClass, req, mapReq, resp);
                } catch (NoSuchMethodException nsmEx) {
                    LOG.warning("Could not invoke method " + controlClass + "." + procId + "(Request, Map, Respone)"
                              + "Try to invoke older method (Request, Response)");
                    // @deprecated
                    method = controlClass.getClass().getMethod(procId, HttpServletRequest.class, HttpServletResponse.class);
                    resultForm = (BaseOutForm) method.invoke(controlClass, req, resp);
                } catch (Exception ex) {
                    LOG.log(Level.WARNING, "Error in invoke method " + controlClass + "." + procId + "(Request, Map, Respone)", ex);
                }
            } else if (controlClass != null) { // Initial screen
                method = controlClass.getClass().getMethod(DEF_PROCID, HttpServletRequest.class, HttpServletResponse.class);
                resultForm = (BaseOutForm) method.invoke(controlClass, req, resp);
            }
            
            Event.DispType distType = null;
            if (resultForm != null) {
                partResultFormIntoWeb(resultForm, req, req.getSession());
                if (CommonUtil.isNNandNB(resultForm.getNextScreen())) {
                    nextScrId = resultForm.getNextScreen();
                    distType = resultForm.getDispType();
                    
                    if (resultForm.isDispatched()) { // Skip next section if the request is dispatche in the control
                        return;
                    }
                    // resp.sendRedirect(resultForm.getNextScreen());
                }
            }
            
            if ((resultForm == null) || (!CommonUtil.isNNandNB(resultForm.getNextScreen()))) {
                if ((conf.getLayout() != null) && CommonUtil.isNNandNB(conf.getLayout().getId())) {
                    LOG.info("Layout page:" + conf.getScreen(conf.getHomeScreenId()).getInputPage());
                    nextScrId = conf.getScreen(conf.getHomeScreenId()).getInputPage();
                }
                
                if ((event != null) && (event.getDispType() == Event.DispType.FORWARD)) {
                    LOG.info("Forward to '" + nextScrId);
                    distType = Event.DispType.FORWARD;
                } else {
                    LOG.info("Include '" + nextScrId);
                    distType = Event.DispType.INCLUDE;
                }
            }
            
            LOG.info("nextScrId=" + nextScrId + ";distType" + ";preLang=" + preLang + ";lang" + lang);
            
            // Check to reload the resource of language code
//            if (!CommonUtil.isNNandNB(lang)) {
//                // get the language code from the session
//                lang = (String) req.getSession().getAttribute(SK_LANG);
//                if (CommonUtil.isNNandNB(lang) && (!lang.equals(preLang))) {
//                    processLang(req);
//                    preLang = lang;
//                }
//            }
            
            
            // Process transition screen
            RequestDispatcher dispatcher = req.getRequestDispatcher(nextScrId);
            // Keep the screenId and eventId in the request
            req.setAttribute(K_SCREEN_ID, screenId);
            req.setAttribute(K_EVENT_ID, eventId);
            if (distType == Event.DispType.FORWARD) {
                dispatcher.forward(req, resp);
            } else if (distType == Event.DispType.INCLUDE) {
                dispatcher.include(req, resp);
            } else { // redirect
                resp.sendRedirect(nextScrId);
            }
        } catch (Throwable th) {
            LOG.log(Level.FINEST, "doPost", th);
            th.printStackTrace();
            req.getRequestDispatcher(DEF_ERRORPAGE).include(req, resp);
        }
    }
    
    /**
     * [Give the description for method].
     * @param req
     */
    private void processLang(HttpServletRequest req) {
        LOG.finest("processLang.START;lang=" + lang);
        DefaultRes resource = DefaultRes.getInstance(lang);
        if (resource != null) {
            LOG.warning("Loading the resource of language code '" + lang + "'");
            for (Object key : resource.getKey()) {
                this.getServletContext().setAttribute(key.toString(), resource.get(key.toString()));
            }
            
            // Update the previous, current language code
            preLang = resource.getLang();
            lang = preLang;
        } else {
            LOG.warning("Could not load the resource of language code '" + lang + "'");
        }
        LOG.finest("processLang.END;");
    }

    /**
     * 
     * @param request
     * @param session
     */
    private void partResultFormIntoWeb(BaseOutForm resultForm, HttpServletRequest request, HttpSession session) {
        //
        if (resultForm != null) {
            // Scan object in session map to put into the session
            Map<String, Object> sessionMap = resultForm.getSessionMap();
            
            if (sessionMap.keySet() != null) {
                for (String key : sessionMap.keySet()) {
                    LOG.log(Level.FINEST, "Set session attribute: key = " + key);
                    session.setAttribute(key, sessionMap.get(key));
                    LOG.log(Level.FINEST, "Set session attribute: sessionMap.get(key) = " + sessionMap.get(key));
                }
            }

            // Scan object in request map to put into the request
            Map<String, Object> requestMap = resultForm.getRequestMap();
            if (requestMap.keySet() != null) {
                for (String key : requestMap.keySet()) {
                    LOG.log(Level.FINEST,"Set request attribute: key = " + key);
                    request.setAttribute(key, requestMap.get(key));
                }
            }
            
            // Scan key to remove from the request
            if (resultForm.getRemoveRequestKeys() != null) {
                for (String key : resultForm.getRemoveRequestKeys()) {
                    request.removeAttribute(key);
                }
            }
            
            // Scan key to remove from the session
            if (resultForm.getRemoveSessionKeys() != null) {
                for (String key : resultForm.getRemoveSessionKeys()) {
                    request.removeAttribute(key);
                }
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

}
