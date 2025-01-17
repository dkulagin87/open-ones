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
package openones.idict.portlet.form;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * Lookup Form is used to capture submitted data from the JSP.
 * @author Thach Le
 */
public class LookupForm implements Serializable {
    /** input: to be search word. */
    private String word;

    /** input: identified of selected dictionary. */
    private String selectedDict;

    /** output: dictionaries from repository. */
    private List<DictInfo> dictInfoList;

    /** Contains meanings of word. */
    private Collection<DictInfo> dictMeanings = null;
    /**
     * Get value of word.
     * @return the word
     */
    public String getWord() {
        return word;
    }

    /**
     * Set the value for word.
     * @param word the word to set
     */
    public void setWord(String word) {
        this.word = word;
    }

    /**
     * Get value of dictInfoList.
     * @return the dictInfoList
     */
    public List<DictInfo> getDictInfoList() {
        return dictInfoList;
    }

    /**
     * Set the value for dictInfoList.
     * @param dictInfoList the dictInfoList to set
     */
    public void setDictInfoList(List<DictInfo> dictInfoList) {
        this.dictInfoList = dictInfoList;
    }

    /**
     * Get value of selectedDict.
     * @return the selectedDict
     */
    public String getSelectedDict() {
        return selectedDict;
    }

    /**
     * Set the value for selectedDict.
     * @param selectedDict the selectedDict to set
     */
    public void setSelectedDict(String selectedDict) {
        this.selectedDict = selectedDict;
    }

    /**
     * Get value of dictMeanings.
     * @return the dictMeanings
     */
    public Collection<DictInfo> getDictMeanings() {
        return dictMeanings;
    }

    /**
     * Set the value for dictMeanings.
     * @param dictMeanings the dictMeanings to set
     */
    public void setDictMeanings(Collection<DictInfo> dictMeanings) {
        this.dictMeanings = dictMeanings;
    }

    /**
     * Support combo box "Dictionary". Map keys are interpreted as option values and the map values correspond to option
     * labels.
     * @return the dictNames
     */
    public Map<String, String> getDictNames() {
        Map<String, String> dictNames = new TreeMap<String, String>();

        if (dictInfoList != null) {
            for (DictInfo dictInfo : dictInfoList) {
                dictNames.put(dictInfo.getName(), dictInfo.getName());
            }
        }
        return dictNames;
    }
}
