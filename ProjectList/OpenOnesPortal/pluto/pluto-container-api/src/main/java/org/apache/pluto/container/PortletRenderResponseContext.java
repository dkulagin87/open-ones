/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.pluto.container;

import java.util.Collection;

import javax.portlet.PortletMode;

/**
 * @author <a href="mailto:ate@douma.nu">Ate Douma</a>
 * @version $Id: PortletRenderResponseContext.java 759870 2009-03-30 08:32:06Z cziegeler $
 */
public interface PortletRenderResponseContext extends PortletMimeResponseContext
{
    void setTitle(String title);
    void setNextPossiblePortletModes(Collection<PortletMode> portletModes);
}
