<%-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="true" %>
<%
    // Invalidate the current session
    if (session != null) {
        session.invalidate();
        session=null;
    }

    // Clear the JSESSIONID cookie
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("JSESSIONID".equals(cookie.getName())) {
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logout</title>
    <script>
        // Show an alert and redirect to login.jsp
        window.onload = function () {
            alert('You have been successfully logged out.');
            window.location.href = 'login.jsp';
        };
    </script>
</head>
<body>
    <noscript>
        <!-- If JavaScript is disabled, provide a fallback message -->
        <p>You have been logged out. <a href="login.jsp">Click here</a> to log in again.</p>
    </noscript>
</body>
</html>
 --%>