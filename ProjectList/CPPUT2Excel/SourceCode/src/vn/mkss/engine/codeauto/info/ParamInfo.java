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
package vn.mkss.engine.codeauto.info;

/**
 * @author thachle
 *
 */
public class ParamInfo {
    private String type;
    private String name;
    
    private boolean isConst;
    private boolean isPointer;

    public ParamInfo(String paramType, String paramName, boolean isConst, boolean isPointer) {
        this.type = paramType;
        this.name = paramName;
        this.isConst = isConst;
        this.isPointer = isPointer;
    }
    /**
     * Get value of type.
     * @return the type
     */
    public String getType() {
        return type;
    }
    /**
     * Set the value for type.
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
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
    /**
     * Get value of isPointer.
     * @return the isPointer
     */
    public boolean isPointer() {
        return isPointer;
    }
    /**
     * Set the value for isPointer.
     * @param isPointer the isPointer to set
     */
    public void setPointer(boolean isPointer) {
        this.isPointer = isPointer;
    }
    /**
     * Get value of isConst.
     * @return the isConst
     */
    public boolean isConst() {
        return isConst;
    }
    /**
     * Set the value for isConst.
     * @param isConst the isConst to set
     */
    public void setConst(boolean isConst) {
        this.isConst = isConst;
    }
}
