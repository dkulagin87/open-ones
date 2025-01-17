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
package openones.gae.users;

import java.io.Serializable;

import com.google.appengine.api.users.User;

/**
 * Wrapper of com.google.appengine.api.users.User.
 * @author Thach Le
 */
public final class OUser implements Serializable {
    /** Original properties of GAE User. */
    private String userId;
    private String email;
    private String nickname;
    private String authDomain;
    private String federatedIdentity;
    /**********************************/

    /** Administrator flag.*/
    private boolean isAdmin = false;

    public OUser(User user) {
        email = user.getEmail();
        nickname = user.getNickname();
        userId = user.getUserId();
        federatedIdentity = user.getFederatedIdentity();
        authDomain = user.getAuthDomain();
        
        if (email.indexOf("@") == -1) {
            email += "@gmail.com";
        }
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String id) {
        this.userId = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getAuthDomain() {
        return authDomain;
    }

    public void setAuthDomain(String authDomain) {
        this.authDomain = authDomain;
    }

    public String getFederatedIdentity() {
        return federatedIdentity;
    }

    public void setFederatedIdentity(String federatedIdentity) {
        this.federatedIdentity = federatedIdentity;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
    
    public boolean getIsAdmin() {
        
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

}
