/**
 * Licensed to Open-Ones under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Open-Ones licenses this file to you under the Apache License,
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
package mks.dms.service;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import mks.dms.dao.entity.User;

/**
 * @author ThachLe
 *
 */
public class BaseService {
    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("DecisionMaker-DBModelPU");
    
    User user;
    
    public static EntityManagerFactory getEmf() {
        return emf;
    }

    /**
     * Get value of user.
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * Set the value for user.
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
    }

}
