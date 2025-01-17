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
package mks.dms.model;

import java.io.Serializable;

/**
 * @author ThachLN
 *
 */
public class DurationUnit implements Serializable {
    private String cd;
    private String name;
    
    public DurationUnit(String cd, String name) {
        this.cd = cd;
        this.name = name;
    }
    /**
     * Get value of cd.
     * @return the cd
     */
    public String getCd() {
        return cd;
    }
    /**
     * Set the value for cd.
     * @param cd the cd to set
     */
    public void setCd(String cd) {
        this.cd = cd;
    }
    /**
     * Get value of name.
     * @return the name
     */
    public String getName() {
        return name;
    }
    /**
     * Set the value for name.
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
}
