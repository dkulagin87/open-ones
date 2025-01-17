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
package openones.svnloader.dao;

import openones.svnloader.dao.entity.ISVNRepo;

/**
 * @author Thach.Le
 */
public interface ISVNRepoManager {

    /**
     * [Give the description for method].
     * @param url
     * @param revisionID
     * @return SVNRepo
     * @throws Exception
     */
    public abstract ISVNRepo createSVNRepo(String url, long revisionID) throws Exception;

    /**
     * [Give the description for method].
     * @param url
     * @return SVNRepo
     * @throws Exception
     */
    public abstract ISVNRepo createSVNRepo(String url) throws Exception;

    /**
     * create a SVN Repo with URL and project code params
     * @param url: URl source code in SVN server
     * @param projectCode: Name of project
     * @return SVNRepo
     */
    public abstract ISVNRepo createSVNRepo(String url, String projectCode) throws Exception;

    /**
     * [Give the description for method].
     * @param repo SVNRepo
     * @throws Exception
     */
    public abstract void updateSVNRepo(Object repo) throws Exception;

    /**
     * [Give the description for method].
     * @param URL
     * @return SVNRepo
     */
    public abstract ISVNRepo findRepoByURL(String URL);

}