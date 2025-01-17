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
package mks.dms.dao.controller;

import static org.junit.Assert.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import mks.dms.dao.entity.Request;
import mks.dms.dao.entity.RequestType;
import mks.dms.service.BaseService;
import mks.dms.service.MasterService;

import org.junit.Test;

/**
 * @author ThachLN
 *
 */
public class ExRequestTypeJpaControllerTest {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("DecisionMaker-DBModelPU");
    /**
     * Test method for {@link mks.dms.dao.controller.ExRequestTypeJpaController#findRequestTypeByCd(java.lang.String)}.
     * @throws ParseException 
     */
    @Test
    public void testFindRequestTypeByCd() throws ParseException {
    	ExRequestJpaController exDaoCtrl = new ExRequestJpaController(emf);
    	RequestJpaController daoCtrl = new RequestJpaController(emf);
    	ExRequestTypeJpaController requestTypeDaoCtrl = new ExRequestTypeJpaController(emf);
    	RequestTypeJpaController requestTypeJpaDaoCtrl = new RequestTypeJpaController(emf);
        List<RequestType> listRequestTypes = requestTypeJpaDaoCtrl.findRequestTypeEntities();
//        for (RequestType type:listRequestTypes) {
//        	if (type.getCd().equals("Rule")) {
//        		listRequestTypes.remove(type);
//        	}
//        	System.out.println(type.getName());
//        }
        for (int i = 0; i < listRequestTypes.size(); i++) {
        	if (listRequestTypes.get(i).getCd().equals("Rule")) {
        		listRequestTypes.remove(i);
        		i--;
        	}
        }
        for (RequestType type:listRequestTypes) {
        	System.out.println(type.getName());
        }
//    	Date today = new Date();
//    	SimpleDateFormat formater = new SimpleDateFormat("dd-MM-yyyy");
//    	List<Request> listRequest = exDaoCtrl.searchRequest("", null, null, "0", "0", "Task");
//    	List<Request> listRequest = daoCtrl.findRequestEntities();
//    	System.out.println(formater.format(today));
//    	System.out.println(formater.parse(formater.format(today)));
    }

    @Test
    public void testDeleteAttachment() throws Exception {
        ExRequestJpaController exDaoCtrl = new ExRequestJpaController(emf);
        
        int requestId = 3;
        int fileId = 1;
        exDaoCtrl.deleteAttachment(requestId, fileId);
        
        Request request = exDaoCtrl.findRequest(requestId);
        assertNull(request.getFilename1());
        assertNull(request.getAttachment1());
    }

}
