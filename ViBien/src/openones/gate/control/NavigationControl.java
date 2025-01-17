/**
 * Licensed to Open-Ones Group under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Open-Ones Group licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a
 * copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package openones.gate.control;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import openones.corewa.BaseOutForm;

/**
 * @author Thach Le
 * 
 */
public class NavigationControl extends LayoutControl {
    private final Logger LOG = Logger.getLogger(this.getClass().getName());

    public BaseOutForm gotoIntro(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
            IOException {
        LOG.finest("gotoIntro.START");
        BaseOutForm outForm = new BaseOutForm();

        outForm.putRequest("MainScreen", "Intro");

        return outForm;
    }


    public BaseOutForm gotoMenu(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
            IOException {
        LOG.finest("gotoMenu.START");
        BaseOutForm outForm = new BaseOutForm();

        outForm.putRequest("MainScreen", "Menu");

        return outForm;
    }
    
    public BaseOutForm gotoContact(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
            IOException {
        LOG.finest("gotoContact.START");
        BaseOutForm outForm = new BaseOutForm();

        outForm.putRequest("MainScreen", "Contact");

        return outForm;
    }
}
