/*
 * Copyright (c) 2009, FPT Software JSC
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *	- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *	- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *	- Neither the name of the FPT Software JSC nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
 package com.fms1.infoclass.group;
import java.sql.Date;
import com.fms1.common.group.PCB;
/**
 * @author manu
 */
public class PCBGalInfo {
	public Date startDate;
	public Date endDate;
	public Date reportDate;
	public String period;
	public int year;
	public String[] projectCodes;
	public int reportType; //PCB.REPORT_XXXX constants
	public String reportTypeComment;
	public String[] metrics;
	public String methodology;
	public String galComment;
	public String metricComments;
	public String lastProblemsReview;
	public String lastSuggestionsReview;
	public String problems;
	public String suggestions;
	public String author;
	public long authorID;
	public int[] metricIDs;
	public long[] projectIDs;
	public long workUnitID;
	public String reportName;
	public long pcbID;
	public int lifecycleID;
	public void setReportType(int ReportConstant) {
		reportType = ReportConstant;
		switch (ReportConstant) {
			case PCB.REPORT_CUSTOM :
				reportTypeComment = "Selected closed  projects in the period";
				break;
			case PCB.REPORT_ALL :
				reportTypeComment = "All projects closed in the period";
				break;
			case PCB.REPORT_DEVELOPMENT :
				reportTypeComment = "All projects closed in the period with lifecycle 'Development'";
				break;
			case PCB.REPORT_MAINTENANCE :
				reportTypeComment = "All projects closed in the period with lifecycle 'Maintenance'";
				break;
			case PCB.REPORT_OTHER :
				reportTypeComment = "All projects closed in the period with lifecycle 'Other'";
				break;
		}
	}
}
