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
package vn.mkss.engine.codeauto;

import rocky.common.Constant;

/**
 * @author thachle
 */
public class AppHelper {

    /**
     * Get first line of a string. <br/>
     * Line separator is '\n' character
     * @param text
     * @return
     */
    public static String getFirstLine(String text) {
        int idxLineSeparator = text.indexOf(Constant.LF);

        if (idxLineSeparator > 0) {
            return text.substring(0, idxLineSeparator - 1);
        }

        return null;
    }
}
