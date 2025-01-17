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

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Locale;

import javax.portlet.CacheControl;

/**
 * @author <a href="mailto:ate@douma.nu">Ate Douma</a>
 * @version $Id: PortletMimeResponseContext.java 759870 2009-03-30 08:32:06Z cziegeler $
 */
public interface PortletMimeResponseContext extends PortletResponseContext
{
    CacheControl getCacheControl();
    PortletURLProvider getPortletURLProvider(PortletURLProvider.TYPE type);
    Locale getLocale();
    String getContentType();
    void setContentType(String contentType);
    String getCharacterEncoding();
    OutputStream getOutputStream() throws IOException, IllegalStateException;
    PrintWriter getWriter() throws IOException, IllegalStateException;
    int getBufferSize();
    void setBufferSize(int size);
    void reset();
    void resetBuffer();
    void flushBuffer() throws IOException;
    boolean isCommitted();
}
