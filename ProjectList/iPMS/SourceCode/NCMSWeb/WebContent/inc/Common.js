function trim(s) {
    var i, sRetVal = "";
    i = s.length - 1;
    while ((i >= 0) && (s.charAt(i) == ' ')) {
        i--;
    }
    s = s.substring(0, i + 1); // trim blanks on the right
    i = 0;
    while ((i < s.length) && (s.charAt(i) == ' ')) {
        i++;
    }
    return s.substring(i);
}

function isDate(s) {
    var sDay, sMonth, sYear, nMonth, nDay, nYear, nSep1, nSep2, strMonth;
    var x = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
    var dt,year;

    nSep1 = s.indexOf("-");
    if (nSep1 < 0) {
        return false;
    }
    nSep2 = s.lastIndexOf("-");
    if (nSep2 < 0) {
        return false;
    }
    if (nSep1 == nSep2) {
        return false;
    }
    sMonth = 0;
    sDay = s.substring(0, nSep1);
    strMonth = s.substring(nSep1 + 1, nSep2);
    sYear = s.substring(nSep2 + 1);
    for (var j = 0; j < 12; j++) {
        if (strMonth.toUpperCase() == x[j])
        sMonth = j + 1;
    }
    stDate = sMonth + "/" + sDay + "/" + sYear;
    dt = new Date(stDate);
    year = dt.getFullYear();
    if (!isNaN(year)) {
        if ((parseInt(year) < 1000) || (parseInt(year) > 9999)) {
            return false;
        }
    }
    else {
        return false;
    }
    if ((sMonth.length == 0) || (sDay.length == 0) || (sYear.length == 0)) {
        return false;
    }
    // isNaN(empty) is false
    if (isNaN(sMonth) || isNaN(sDay) || isNaN(sYear)) return false;
    nMonth = parseInt(sMonth, 10);
    nDay = parseInt(sDay, 10);
    nYear = parseInt(sYear, 10);
    if ((nMonth <= 0) || (nDay <= 0) || (nYear < 0)) {
        return false;
    }
    if (nMonth > 12) {
        return false;
    }
    if ((nMonth == 1) || (nMonth == 3) || (nMonth == 5) || (nMonth == 7) || (nMonth == 8) || (nMonth == 10) || (nMonth == 12)) {
        if (nDay > 31) {
            return false;
        }
    }
    if ((nMonth == 4) || (nMonth == 6) || (nMonth == 9) || (nMonth == 11)) {
        if (nDay > 30) {
            return false;
        }
    }
    if (nMonth == 2) {
        if ((nYear % 4 == 0) && (nYear % 100 != 0)) { // leap year
            if (nDay > 29) {
                return false;
            }
        } else if (nDay > 28) {
            return false;
        }
    }
    return true;
} // isDate function

function validDates(oParentForm, arrObjName, blnAlert, stMessage) {
    frmParent = oParentForm;
    intLength = arrObjName.length;
    var i, stDate;
    for (i = 0; i < intLength; i++) {
        if (frmParent(arrObjName[i]) != null) {
            stDate = trim(frmParent(arrObjName[i]).value);
            if (stDate.length == 0) {
                continue;
            }
            if (!isDate(stDate)) {
                if (blnAlert) {
                    alert(stMessage);
                    frmParent(arrObjName[i]).focus();
                    return false;
                }
            }
        }
        else {
            if (!confirm("\"" + arrObjName[i] + "\" is not a control of form " + frmParent.name + "!\nDo you want to continue?")) {
                return false;
            }
        }
    }
    return true;
}

function compareDate(strStartDate,strEndDate) {
    var dt1, dt2;
    bnRet = true;
    dt1 = new Date(strStartDate);
    dt2 = new Date(strEndDate);
    year1 = dt1.getYear();
    year2 = dt2.getYear();
    month1 = dt1.getMonth();
    month2 = dt2.getMonth();
    day1 = dt1.getDate();
    day2 = dt2.getDate();
    if (parseInt(year1) > parseInt(year2)) {
        return false;
    }
    if (parseInt(year1) == parseInt(year2)) {
        if (parseInt(month1) > parseInt(month2)) {
            return false;
        }
        if (parseInt(month1) == parseInt(month2)) {
            if (parseInt(day1) > parseInt(day2)) {
                return false;
            }
        }
    }
    return true;
}

function isSimpleDate(s) {
    var sDay, sMonth, sYear, nMonth, nDay, nYear, nSep1, nSep2;
    nSep1 = s.indexOf("/");
    if (nSep1 < 0) {
        return false;
    }
    nSep2 = s.lastIndexOf("/");
    if (nSep2 < 0) {
        return false;
    }
    if (nSep1 == nSep2) {
        return false;
    }
    sMonth = s.substring(0, nSep1);
    sDay = s.substring(nSep1 + 1, nSep2);
    sYear = s.substring(nSep2 + 1);
    if (!sMonth.length || !sDay.length || !sYear.length) {
        return false;
    }
    // isNaN(empty) is false
    if (isNaN(sMonth) || isNaN(sDay) || isNaN(sYear)) {
        return false;
    }
    nMonth = parseInt(sMonth,10);
    nDay = parseInt(sDay,10);
    nYear = parseInt(sYear,10);
    if ((nMonth <= 0) || (nDay <= 0) || (nYear < 0)) {
        return false;
    }
    if (nMonth > 12) {
        return false;
    }
    if ((nMonth == 1) || (nMonth == 3) || (nMonth == 5) || (nMonth == 7) || (nMonth == 8) || (nMonth == 10) || (nMonth == 12)) {
        if (nDay > 31) {
            return false;
        }
    }
    if ((nMonth == 4) || (nMonth == 6) || (nMonth == 9) || (nMonth == 11)) {
        if (nDay > 30) {
            return false;
        }
    }
    if (nMonth == 2) {
        if ((nYear % 4 == 0) && (nYear % 100 != 0)) { // leap year
            if (nDay > 29) {
                return false;
            }
        } else if (nDay > 28) {
            return false;
        }
    }
    return true;
} // isDate function

function convertDate(strDateString) {
    if (trim(strDateString) != "") {
        var s = strDateString;
        if (!isDate(s)) {
            if (isSimpleDate(s)) {
                var sDay, sMonth, sYear, nMonth, nDay, nYear, nSep1, nSep2, strFullDate;
                var x = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
                nSep1 = s.indexOf("/");
                if (nSep1 < 0) {
                    return false;
                }
                nSep2 = s.lastIndexOf("/");
                if (nSep2 < 0) {
                    return false;
                }
                if (nSep1 == nSep2) {
                    return false;
                }
                sMonth = s.substring(0, nSep1);
                sDay = s.substring(nSep1 + 1, nSep2);
                sYear = s.substring(nSep2 + 1);
                nYear = parseInt(sYear, 10);
                nDay = parseInt(sDay, 10);
                nMonth = parseInt(sMonth,10);
                for (var j = 0; j < 12; j++) {
                    if (nMonth == j + 1) {
                        strMonth = x[j];
                    }
                }
                strFullDate = sDay + "-" + strMonth + "-" + sYear;
                return strFullDate;
            } else {
                return "";
            }
        }
    }
}

function convertToSimpleDate(strDateString) {
    if (trim(strDateString)!= "") {
        var s = strDateString;
        if (isDate(s)) {
            var sDay, sMonth, sYear, strMonth, nSep1, nSep2, strFullDate;
            var x = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
            nSep1 = s.indexOf("-");
            if (nSep1 < 0) {
                return false;
            }
            nSep2 = s.lastIndexOf("-");
            if (nSep2 < 0) {
                return false;
            }
            if (nSep1 == nSep2) {
                return false;
            }
            sDay = s.substring(0, nSep1);
            strMonth = s.substring(nSep1 + 1, nSep2);
            sYear = s.substring(nSep2 + 1);
            for (var j = 0; j < 12; j++) {
                if (strMonth.toUpperCase() == x[j]) {
                    sMonth = j + 1;
                }
            }
            strFullDate = sMonth + "/" + sDay + "/" + sYear;
            return strFullDate;
        }
        else {
            return "";
        }
    }
    else return "";
}

function isIntegerString(strNumber) {
    if (strNumber == null) {
        return false;
    }
    else if (strNumber.length <= 0) {
        return false;
    }
    else {
        for (var i = 0; i < strNumber.length; i++) {
            if (strNumber.substring(i, i+1) < "0" ||
                strNumber.substring(i, i+1) > "9")
            {
                return false;
            }
        }
    }
    return true;
}

function isTime(txtControl, isMandatory) {
    if (txtControl == null) {
        return false;
    }
    else if ((txtControl.value.length <= 0) || (txtControl.value.length == null)) {
        if (isMandatory) {
            return false;
        }
        else {
            return true;
        }
    }
    
    var strTime = txtControl.value;
    var nPos1 = strTime.indexOf(":");
    var strHour = strTime.substring(0, nPos1);
    var strMinute = strTime.substring(nPos1 + 1);
    var nHour = 0, nMinute = 0;
    
    if (nPos1 <= 0) {
        return false;
    }
    else if (!isIntegerString(strHour) || !isIntegerString(strMinute)) {
        return false;
    }
    else {
        nHour = parseInt(strHour);
        nMinute = parseInt(strMinute);
        if ((nHour < 0) || (nHour > 23)) {
            return false;
        }
        if ((nMinute < 0) || (nMinute > 59)) {
            return false;
        }
    }
    
    return true;
}

// Check date with time
function isDateTime(txtDate, txtTime, isMandatory, isDisplayMessage) {
    if (txtDate == null || txtTime == null) {
        if (isDisplayMessage) {
            alert("Not a control");
        }
        return false;
    }
    else if ((txtTime.value.length > 0) && (txtDate.value.length <= 0)) {
        if (isDisplayMessage) {
            alert("Enter date before enter time");
        }
        txtDate.focus();
        return false;
    }
    else if (txtDate.value.length <= 0 && isMandatory) {
        if (isDisplayMessage) {
            alert("Enter date value please");
        }
        txtDate.focus();
        return false;
    }
    else if (isDate(txtDate.value) && isTime(txtTime, false)) {
        return true;
    }
    else if ((txtDate.value.length <= 0) && (txtTime.value.length <= 0)) {
        return true;
    }
    else {
        if (!isDate(txtDate.value)) {
            if (isDisplayMessage) {
                alert("Enter correct date value please");
            }
            txtDate.focus();
        }
        else if (!isTime(txtTime, false)) {
            if (isDisplayMessage) {
                alert("Enter correct time value please");
            }
            txtTime.focus();
        }
        return false;
    }
}

function dateCompare(strStartDate,strEndDate) {
    var dt1 = new Date(strStartDate);
    var dt2 = new Date(strEndDate);
    var year1 = dt1.getYear();
    var year2 = dt2.getYear();
    var month1 = dt1.getMonth();
    var month2 = dt2.getMonth();
    var day1 = dt1.getDate();
    var day2 = dt2.getDate();
    if (parseInt(year1) > parseInt(year2)) {
        return 1;
    }
    else if (parseInt(year1) < parseInt(year2)) {
        return -1;
    }
    else {
        if (parseInt(month1) > parseInt(month2)) {
            return 1;
        }
        else if (parseInt(month1) < parseInt(month2)) {
            return -1;
        }
        else {
            if (parseInt(day1) > parseInt(day2)) {
                return 1;
            }
            else if (parseInt(day1) < parseInt(day2)) {
                return -1;
            }
            else {
                return 0;  //All fields are equals
            }
        }
    }
    
    // Not all cases above, may be error
    return -2;
}

function getTimeInMinutes(txtControl) {
    if (txtControl == null) {
        return -1;
    }
    else if ((txtControl.value.length <= 0) || (txtControl.value.length == null)) {
        return -1;
    }
    
    var strTime = txtControl.value;
    var nPos1 = strTime.indexOf(":");
    var strHour = strTime.substring(0, nPos1);
    var strMinute = strTime.substring(nPos1 + 1);
    var nHour = 0, nMinute = 0;
    
    if (nPos1 <= 0) {
        return -1;
    }
    else if (!isIntegerString(strHour) || !isIntegerString(strMinute)) {
        return -1;
    }
    else {
        nHour = parseInt(strHour);
        nMinute = parseInt(strMinute);
        if ((nHour < 0) || (nHour > 23)) {
            return -1;
        }
        if ((nMinute < 0) || (nMinute > 59)) {
            return -1;
        }
        return nHour * 60 + nMinute;
    }
}

function numberAllowed() {
    if (window.event.keyCode < 48 || window.event.keyCode > 57) {
        if (window.event.keyCode != 13) {
            window.event.keyCode = 0;
        }
    }
}