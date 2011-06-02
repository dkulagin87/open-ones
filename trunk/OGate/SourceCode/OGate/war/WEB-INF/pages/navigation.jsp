<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%--set some common properties (new version)--%>
<c:set var="skin" value=""/>
<c:set var="active_bg" value="dark"/>
<c:set var="inactive_bg" value="med"/>
<c:set var="before_selected_tab" value="before_active_tab"/>
<c:set var="after_selected_tab" value="after_active_tab"/>
<c:set var="after_inactive_tab" value="after_inactive_tab"/>
<c:forEach var="tab" items="${moduleTabs}">
    <c:if test="${MainScreen == tab.id}">
        <c:set var="selectedTabIndex" value="${tab.order}"></c:set>
    </c:if>
</c:forEach>

<%-- For intro tab --%>
<c:set var="nav_intro_med_highlight" value="highlight"/>
<c:set var="nav_intro_dark_highlight" value="highlight"/>
<c:set var="nav_intro_dark_med" value="med"/>
<c:set var="nav_intro_dark_shadow" value="shadow"/>
<c:set var="nav_intro_active" value="after_inactive"/>
<c:set var="nav_intro_selected" value=""/>
<c:set var="nav_intro_inactive" value="inactive"/>
<%--new version --%>
<c:set var="intro_bg" value="med"/>
<c:set var="intro_aTab" value="after_inactive_tab"/>

<%-- For service tab --%>
<c:set var="nav_service_dark_highlight" value="highlight"/>
<c:set var="nav_service_dark_med" value="med"/>
<c:set var="nav_service_dark_shadow" value="shadow"/>
<c:set var="nav_service_active" value="after_inactive"/>
<c:set var="nav_service_selected" value=""/>
<%--new version --%>
<c:set var="service_bg" value="med"/>
<c:set var="service_bTab" value="${intro_aTab}"/>
<c:set var="service_aTab" value="after_inactive_tab"/>

<%-- For member tab --%>
<c:set var="nav_member_dark_highlight" value="highlight"/>
<c:set var="nav_member_dark_med" value="med"/>
<c:set var="nav_member_dark_shadow" value="shadow"/>
<c:set var="nav_member_active" value="after_inactive"/>
<c:set var="nav_member_selected" value=""/>
<%--new version --%>
<c:set var="member_bg" value="med"/>
<c:set var="member_bTab" value="${service_aTab}"/>
<c:set var="member_aTab" value="after_inactive_tab"/>

<%-- For product tab --%>
<c:set var="nav_product_dark_highlight" value="highlight"/>
<c:set var="nav_product_dark_med" value="med"/>
<c:set var="nav_product_dark_shadow" value="shadow"/>
<c:set var="nav_product_active" value="after_inactive"/>
<c:set var="nav_product_selected" value=""/>
<%--new version --%>
<c:set var="product_bg" value="med"/>
<c:set var="product_bTab" value="${member_aTab}"/>
<c:set var="product_aTab" value="after_inactive_tab"/>

<%--which is active tab (new version)--%>
<%--insert code here --%>


<%--older version --%>
<c:if test='${MainScreen == "service"}'>
  <c:set var="nav_service_dark_highlight" value="dark" />
  <c:set var="nav_service_dark_med" value="dark" />
  <c:set var="nav_service_dark_shadow" value="dark" />
  <c:set var="nav_service_active" value="after_active" />
  <c:set var="nav_service_selected" value="-selected" />
  <c:set var="nav_product_active" value="before_active" />
</c:if>

<c:if test='${MainScreen == "intro"}'>
  <c:set var="nav_intro_med_highlight" value="med"/>
  <c:set var="nav_intro_dark_highlight" value="dark" />
  <c:set var="nav_intro_dark_med" value="dark" />
  <c:set var="nav_intro_dark_shadow" value="dark" />
  <c:set var="nav_intro_active" value="after_active" />
  <c:set var="nav_intro_selected" value="-selected" />
  <c:set var="nav_intro_inactive" value="active"/>
</c:if>

<c:if test='${MainScreen == "member"}'>
  <c:set var="nav_member_dark_highlight" value="dark" />
  <c:set var="nav_member_dark_med" value="dark" />
  <c:set var="nav_member_dark_shadow" value="dark" />
  <c:set var="nav_member_active" value="after_active" />
  <c:set var="nav_member_selected" value="-selected" />
  <c:set var="nav_service_active" value="before_active" />
</c:if>

<c:if test='${MainScreen == "product"}'>
  <c:set var="nav_product_dark_highlight" value="dark" />
  <c:set var="nav_product_dark_med" value="dark" />
  <c:set var="nav_product_dark_shadow" value="dark" />
  <c:set var="nav_product_active" value="after_active" />
  <c:set var="nav_product_selected" value="-selected" />
  <c:set var="nav_intro_active" value="before_active" />
</c:if>

<form name="frmNavigation" action="main.do" method="post">
      <input type="hidden" name="screenId" value="Navigation" />
       <input type="hidden" name="eventId" value="" />
       
<%-- New version: dynamic tabs are loaded from persistence layer --%>
<table border="0" width="100%" cellspacing="0" cellpadding="0" name="newNavigation" >
    <tr height="20" align="left" valign="top">
        <td width="99%" colspan="3" class=uportal-background-dark noWrap
        align=left valign="top" height="1">
            <table border=0 cellSpacing=0 cellPadding=0 height="1">
                <tr>
                    <%-- tab: instance of ModuleDTO --%>
                    <c:forEach var="tab2" items="${moduleTabs}">
                        <c:choose>
                            <%--Neu tab dc chon la intro --%>
                            <c:when test="${selectedTabIndex==tab.order}">
                                <%--Hien thi tab intro voi after_selected_tab  --%>
                                <%--code--%>
                                <td class=uportal-background-shadow noWrap align=left height="1">
                                <table border=0 cellSpacing=0 cellPadding=0>
                                <tr>
                                <td class=uportal-background-dark noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                <td class=uportal-background-med rowSpan=4 width=22>
                                <img alt="" src="pages/images/${after_selected_tab}.gif" width=22 height=23>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-dark height=20 vAlign=center noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10> 
                                <a class=uportal-tab-text-selected href="#" 
                                onclick='submitAction("frmNavigation","Navigation", "click_${tab2.id}")'>${tab2.id} ${tab2.order}</a>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-dark noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-dark noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                </table>
                                </td>
                                <%--/code --%>

                            </c:when> 
                            <c:otherwise>
                                <c:choose>
                                    <%--Neu tab tiep theo tab nay la tab dc chon--%>              
                                    <c:when test="${selectedTabIndex == tab2.order + 1}">
                                    <%--hien thi tab voi before_selected_tab--%>
                                        <%--code--%>
                                        <td class=uportal-background-shadow noWrap align=left height="1">
                                <table border=0 cellSpacing=0 cellPadding=0>
                                <tr>
                                <td class=uportal-background-highlight noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                <td class=uportal-background-med rowSpan=4 width=22>
                                <img alt="" src="pages/images/${before_selected_tab}.gif" width=22 height=23>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-med height=20 vAlign=center noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10> 
                                <a class=uportal-tab-text-selected href="#" 
                                onclick='submitAction("frmNavigation","Navigation", "click_${tab2.id}")'>${tab2.name}</a>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-shadow noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-highlight noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                </table>
                                </td>
                                        <%--/code--%>
                                    </c:when>
                                    <c:otherwise>
                                        <c:choose>
                                            <%--Neu tab nay la tab chon--%>
                                            <c:when test="${selectedTabIndex == tab2.order}">
                                            <%--Hien thi tab nay voi after_selected_tab --%>
                                                <%--code --%>
                                                <td class=uportal-background-shadow noWrap align=left height="1">
                                <table border=0 cellSpacing=0 cellPadding=0>
                                <tr>
                                <td class=uportal-background-dark noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                <td class=uportal-background-med rowSpan=4 width=22>
                                <img alt="" src="pages/images/${after_selected_tab}.gif" width=22 height=23>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-dark height=20 vAlign=center noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10> 
                                <a class=uportal-tab-text-selected href="#" 
                                onclick='submitAction("frmNavigation","Navigation", "click_${tab2.id}")'>${tab2.name}</a>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-dark noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-dark noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                </table>
                                </td>
                                                <%--/code --%>    
                                            </c:when>
                                            <c:otherwise>
                                            <%--Neu day la tab binh thuong --%>
                                            <%--Hien thi tab nay voi after_inactive_tab--%>
                                                <%--code --%>
                                                <td class=uportal-background-shadow noWrap align=left height="1">
                                <table border=0 cellSpacing=0 cellPadding=0>
                                <tr>
                                <td class=uportal-background-highlight noWrap><%--tren cung --%>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                <td class=uportal-background-med rowSpan=4 width=22>
                                <img alt="" src="pages/images/${after_inactive_tab}.gif" width=22 height=23>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-med height=20 vAlign=center noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10> 
                                <a class=uportal-tab-text-selected href="#" 
                                onclick='submitAction("frmNavigation","Navigation", "click_${tab2.id}")'>${tab2.name}</a>
                                <img alt="" src="pages/images/transparent.gif" width=10 height=10>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-shadow noWrap>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                <tr>
                                <td class=uportal-background-highlight noWrap><%--duoi cung --%>
                                <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                </td>
                                </tr>
                                </table>
                                </td>
                                                <%--/code --%>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:otherwise>
                                </c:choose>
                            </c:otherwise>
                        </c:choose>                                
                    </c:forEach>                                                                                                       
                </tr>      
            </table>
        </td>
    </tr>
</table>
<%--sample
                                            <td class=uportal-background-med noWrap align=left height="1">
                                                <table border=0 cellSpacing=0 cellPadding=0>
                                                    <tr>
                                                        <td class=uportal-background-${nav_intro_med_highlight} noWrap>
                                                            <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                                        </td>
                                                        <td class=uportal-background-${nav_intro_dark_med} rowSpan=4 width=22>
                                                            <img alt="" src="pages/images/.gif" width=22 height=23>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class=uportal-background-${tab.id}_bg height=20 vAlign=center noWrap>
                                                            <img alt="" src="pages/images/transparent.gif" width=10 height=10> 
                                                            <a class=uportal-tab-text${nav_intro_selected} href="#" 
                                                                onclick='submitAction("frmNavigation","Navigation", "click_${tab.id}")'>${tab.id}</a>
                                                            <img alt="" src="pages/images/transparent.gif" width=10 height=10>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class=uportal-background-${nav_intro_dark_shadow} noWrap>
                                                            <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class=uportal-background-${nav_intro_dark_highlight} noWrap>
                                                            <img alt="" src="pages/images/transparent.gif" width=1 height=1>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
 --%>
<%-------------------------------------------------------------------------------------%>
<!-- <table border="0" width="100%" cellspacing="0" cellpadding="0"> -->
<!--     <tr height="20" align="left" valign="top"> -->
<!--       <td width="99%" colspan="3" class=uportal-background-dark noWrap -->
<!--         align=left valign="top" height="1"> -->
<!--         <table border=0 cellSpacing=0 cellPadding=0 height="1"> -->
<!--           <tr> -->
<!--             <td class=uportal-background-med noWrap align=left -->
<!--               height="1"> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_intro_med_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<%--                   <TD class=uportal-background-${nav_intro_dark_med} rowSpan=4 width=22><IMG alt="" src="pages/images/${nav_intro_active}_tab.gif" width=22 height=23></TD> --%>
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_intro_dark_med} height=20 vAlign=center noWrap><IMG alt="" src="pages/images/transparent.gif" width=10 -->
<%--                     height=10> <A class=uportal-tab-text${nav_intro_selected} href="#" onclick='submitAction("frmNavigation","Intro", "clickIntro")'>${applicationScope.Introduction}</A><IMG alt="" src="pages/images/transparent.gif" width=10 --%>
<!--                     height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_intro_dark_shadow} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_intro_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->

<!--             <td class=uportal-background-med noWrap align=left> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_product_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1  height=1></TD> -->
<%--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG alt="" src="pages/images/${nav_product_active}_tab.gif" width=22 height=23></TD> --%>
<!--                 </TR> -->
<!--                 <TR> -->
<%--                   <TD class=uportal-background-${nav_product_dark_med} height=20 vAlign=center noWrap><IMG alt="" src="pages/images/transparent.gif" width=10 height=10><A class=uportal-tab-text${nav_product_selected} href="#" onclick='submitAction("frmNavigation","Navigation", "clickProduct")'>${applicationScope.Product}</A> --%>
<!--                     <IMG alt="" src="pages/images/transparent.gif" width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_product_dark_shadow} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_product_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--             <td> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_service_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1  height=1></TD> -->
<%--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG alt="" src="pages/images/${nav_service_active}_tab.gif" width=22 height=23></TD> --%>
<!--                 </TR> -->
<!--                 <TR> -->
<%--                   <TD class=uportal-background-${nav_service_dark_med} height=20 vAlign=center noWrap><IMG alt="" src="pages/images/transparent.gif" width=10 height=10><A class=uportal-tab-text${nav_service_selected} href="#" onclick='submitAction("frmNavigation","Navigation", "clickService")'>${applicationScope.Service}</A> --%>
<!--                     <IMG alt="" src="pages/images/transparent.gif" width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_service_dark_shadow} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_service_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--               <td> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_member_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1  height=1></TD> -->
<%--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG alt="" src="pages/images/${nav_member_active}_tab.gif" width=22 height=23></TD> --%>
<!--                 </TR> -->
<!--                 <TR> -->
<%--                   <TD class=uportal-background-${nav_member_dark_med} height=20 vAlign=center noWrap><IMG alt="" src="pages/images/transparent.gif" width=10 height=10><A class=uportal-tab-text${nav_member_selected} href="#" onclick='submitAction("frmNavigation","Navigation", "clickMember")'>${applicationScope.Member}</A> --%>
<!--                     <IMG alt="" src="pages/images/transparent.gif" width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_member_dark_shadow} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-${nav_member_dark_highlight} noWrap><IMG alt="" src="pages/images/transparent.gif" width=1 height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--             <td> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG -->
<!--                     alt="" src="pages/images/after_inactive_tab.gif" -->
<!--                     width=22 height=23></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-med height=20 -->
<!--                     vAlign=center noWrap><IMG alt="" -->
<!--                     src="pages/images/transparent.gif" width=10 -->
<%--                     height=10> <A class=uportal-tab-text href="#">${applicationScope.Forum}</A><IMG alt="" src="pages/images/transparent.gif" --%>
<!--                     width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-shadow noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--             <td> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG -->
<!--                     alt="" src="pages/images/after_inactive_tab.gif" -->
<!--                     width=22 height=23></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-med height=20 -->
<!--                     vAlign=center noWrap><IMG alt="" -->
<!--                     src="pages/images/transparent.gif" width=10 -->
<%--                     height=10> <A class=uportal-tab-text href="#">${applicationScope.Career}</A><IMG alt="" src="pages/images/transparent.gif" --%>
<!--                     width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-shadow noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--             <td> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG -->
<!--                     alt="" src="pages/images/after_inactive_tab.gif" -->
<!--                     width=22 height=23></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-med height=20 -->
<!--                     vAlign=center noWrap><IMG alt="" -->
<!--                     src="pages/images/transparent.gif" width=10 -->
<%--                     height=10> <A class=uportal-tab-text href="#">${applicationScope.Activity}</A><IMG alt="" src="pages/images/transparent.gif" --%>
<!--                     width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-shadow noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--             <td> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                   <TD class=uportal-background-med rowSpan=4 width=22><IMG -->
<!--                     alt="" src="pages/images/after_inactive_tab.gif" -->
<!--                     width=22 height=23></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-med height=20 -->
<!--                     vAlign=center noWrap><IMG alt="" -->
<!--                     src="pages/images/transparent.gif" width=10 -->
<%--                     height=10> <A class=uportal-tab-text href="#">${applicationScope.Project}</A><IMG alt="" src="pages/images/transparent.gif" --%>
<!--                     width=10 height=10></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-shadow noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></td> -->
<!--             <TD class=uportal-background-med width="100%" noWrap -->
<!--               align="right"> -->
<!--               <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%"> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-channel-text height=20 vAlign=center -->
<%--                     align="right" noWrap>${applicationScope.NumberOfMember}: 60</TD> --%>
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-shadow noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--                 <TR> -->
<!--                   <TD class=uportal-background-highlight noWrap><IMG -->
<!--                     alt="" src="pages/images/transparent.gif" width=1 -->
<!--                     height=1></TD> -->
<!--                 </TR> -->
<!--               </TABLE></TD> -->
<!--           </tr> -->
<!--         </table></td> -->
<!--     </tr> -->
<!--     </table> -->
    </form>