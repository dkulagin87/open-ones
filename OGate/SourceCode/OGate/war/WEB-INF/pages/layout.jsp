<%-- 
/*
 * layout.jsp 0.1 Apr 30, 2011
 * 
 * Copyright (c) 2011, Open-Ones Group
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
 --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="openones.gate.util.ConfManager"%>
<%@page import="openones.gae.users.OUser"%>
<%@page import="openones.gate.Cons"%>
<%@page import="com.google.appengine.api.users.User"%>
<%@page import="com.google.appengine.api.users.UserServiceFactory"%>
<%@page import="com.google.appengine.api.users.UserService"%>
<%@page import="openones.gae.session.SessionCounter"%>


<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html itemscope itemtype="http://schema.org/Organization">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="description" content="Cộng đồng lập trình" />
<meta name="keywords" content="open-ones.com, thuc tap he, lap trinh vien, lien ket y tuong, nang cao ky nang, bo sung ky nang, hoc qui trinh phan mem, luyện kỹ năng lập trình, làm việc nhóm, tăng cường kỹ năng mềm, mã nguồn mở, liên kết ý tưởng, thực tập CNTT, phát triển phần mềm, lập trình viên chất lượng cao" />
<meta name="robots" content="INDEX,FOLLOW" />
<meta itemprop="name" content="Cong dong lap trinh">
<meta itemprop="description" content="ky nang lap trinh, kỹ năng lập trình, ky nang mem CNTT, kỹ năng mềm CNTT, lap trinh vien chuyen nghiep, LTV chuyên nghiệp, phat trien phan mem, phát triển dự án phần mềm, hoc quy trinh phan mem, học quy trình phần mềm, ket noi CNTT, kết nối CNTT">
<meta itemprop="image" content="http://lh5.googleusercontent.com/-gBWSooHZBY0/AAAAAAAAAAI/AAAAAAAAAA0/8cLLSwzvkq8/photo.jpg?sz=200">

<title>${applicationScope.HomePage}</title>
<script type="text/javascript" src='pages/scripts/common.js'></script>
<SCRIPT type=text/javascript src='pages/scripts/layout.js'></SCRIPT>
<link rel=stylesheet type=text/css href="pages/css/interface.css">
<link rel=stylesheet type=text/css href="pages/css/java.css">
<!-- Google Analytics -->
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26308540-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

<!-- Add+1 button -->
<script type="text/javascript">
  window.___gcfg = {lang: 'vi'};

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'http://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
</head>
<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    if (user != null) {
        OUser ouser = new OUser(user);
        //System.out.println("ouser.getEmail()=" + ouser.getEmail());
        //System.out.println("ConfManager.getAdmin()=" + ConfManager.getAdminEmail());
        if (ouser.getEmail().equalsIgnoreCase(ConfManager.getAdminEmail())) {
            ouser.setAdmin(true);
        }
        
        session.setAttribute(Cons.SK_USER, ouser);
    }
%>

<body class=x-layout-container>
<!-- Header -->
<table border="0" width="100%" height="70px" cellspacing="0" cellpadding="0">
<tr><td>
<DIV style="POSITION: absolute; WIDTH: 100%; HEIGHT: 75px; TOP: 0px; LEFT: 0px" id=headerPanel class="x-layout-panel x-layout-panel-west x-layout-panel-body">
  <jsp:include page="/header.part" flush="true"></jsp:include>
</DIV>
</td></tr>
</table>

<table border="0" width="100%" height="30px" cellspacing="0" cellpadding="0">
<tr><td>
<!-- Navigation -->
<DIV style="POSITION: absolute; WIDTH: 100%; HEIGHT: 24px; TOP: 75px; LEFT: 0px" id=headerPanel class="x-layout-panel x-layout-panel-west x-layout-panel-body">
  <jsp:include page="/navigation.part" flush="true">
    <jsp:param name="screenId" value="${screenId}"/>
    <jsp:param name="eventId" value="${eventId}"/>
  </jsp:include>
</DIV>
</td></tr>
</table>
   
 <table id="tablePanel" width=100% height=80% cellpadding=0 cellspacing=0>
  <tr>
   <td id="leftColPanel" width=215px>
     <c:choose>
         <%-- Display Menu for Admin --%>
        <c:when test='${(not empty user) && (user.isAdmin)}'>
          <jsp:include page="/WEB-INF/pages/leftmenu.jsp" flush="true">
            <jsp:param name="screenId" value="${screenId}"/>
            <jsp:param name="eventId" value="${eventId}"/>
           </jsp:include>
        </c:when>
        <c:otherwise>
          <jsp:include page="/WEB-INF/pages/leftmenu4user.jsp" flush="true">
            <jsp:param name="screenId" value="${screenId}"/>
            <jsp:param name="eventId" value="${eventId}"/>
           </jsp:include>
        </c:otherwise>
    </c:choose>
    </td>
<td valign="top">
<%-- Main body --%>
  <jsp:include page="/WEB-INF/pages/mainbody.jsp" flush="true">
    <jsp:param name="MainScreen" value="${MainScreen}" />
    <jsp:param name="screenId" value="${screenId}" />
    <jsp:param name="eventId" value="${eventId}" />
  </jsp:include>
</td>
 </tr>
 </table>
 <jsp:include page="/WEB-INF/pages/footer.jsp" flush="true">
    <jsp:param name="screenId" value="${screenId}"/>
    <jsp:param name="eventId" value="${eventId}"/>
</jsp:include>
 
</body>
</html>