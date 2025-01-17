var isFrames;
var secondsVisible;
var topCount;
var imgSrc;
var imgSiz;
var borWid;

function go(form) {
    var where = form.hex.options[form.hex.selectedIndex].value;
    if (where.charAt(0) == "!") {
        window.location.href = where.substring(1,where.length);
    }
}

NS4 = (document.layers);
IE4 = (document.all);
ver4 = (NS4 || IE4);
isMac = (navigator.appVersion.indexOf("Mac") != -1);
isMenu = (NS4 || (IE4 && !isMac));

function popUp() {
    return
}

function popDown() {
    return
}

function startIt() {
    return
}

if (!ver4) {
    event = null;
}

if (isMenu) {
    fntCol = "navy";
    fntBold = "false";
    fntItal = "false";
    backCol = "3399FF";
    overCol = "FFFFFF";
    overFnt = "0000FF";
    fntSiz = 8;
    fntFam = "Arial";
    menuWidth = 120;
    borWid = 0;
    borCol = "black";
    borSty = "solid";
    itemPad = 3;
    separator = 1;
    separatorCol = "FFFFFF";
    imgSrc = "tri.gif";
    imgSiz = 10;

    childOffset = null;
    childOverlap = null;
    perCentOver = null;

    secondsVisible = .5;

    isFrames = false;
    navFrLoc = "left";
    mainFrName = "main";
}

loader = (isFrames) ? (NS4) ? parent : parent.document.body : window;
loader.onload = startIt;
if(NS4) {
    origWidth = loader.innerWidth;
    origHeight = loader.innerHeight;
    loader.onresize = reDo;
}
isLoaded = false;
NSresized = false;

if (!window.menuVersion) {
    clickKill = showVisited = NSfontOver = keepHilite = clickStart = false;
}

if (!window.imgHspace) {
    imgHspace = 0;
}

isWin = (navigator.appVersion.indexOf("Win") != -1)
if (!isWin && !isMac) {
    NSfontOver = showVisited = false;
}

mSecsVis = secondsVisible * 1000;
isRight = (window.navFrLoc && navFrLoc == "right");

imgSuf = (isRight) ? ">"  : " ALIGN=RIGHT>";

imgStr = "<IMG SRC='" + imgSrc + "' WIDTH=" + imgSiz + " HEIGHT=" + imgSiz +" VSPACE=2 HSPACE=" + imgHspace + " BORDER=0" + imgSuf;

fullImgSize = (imgSiz + (imgHspace * 2));

if (IE4) {
    imgStr = "<SPAN STYLE='height:100%;width:" + (fullImgSize - (isRight ? 3 : 0)) + ";float:"+ (isRight ? "left" : "right") + ";overflow:hidden'>" + imgStr + "</SPAN>";
}

areCreated = false;
menuLoc = null;

function initVars() {
    if (areCreated) {
        for (i = 1; i < topCount; i++) {
            cur = eval("elMenu" + i);
            clearTimeout(cur.hideTimer);
            cur.hideTimer = null;
        }
        clearTimeout(allTimer);
    }
    topCount = 1;
    areCreated = false;
    beingCreated = false;
    isOverMenu = false;
    currentMenu = null;
    allTimer = null;
}

initVars();

function NSunloaded(){
    isLoaded = false;
}

function NSloaded(e) {
    if (e.target.name == mainFrName) {
        initVars();
        startIt();
    }
}

function IEunloaded() {
    initVars();
    isLoaded = false;
    setTimeout("keepTrack()",50)
}

function keepTrack() {
    if (menuLoc.document.readyState == "complete") {
        initVars();
        startIt();
    }
    else {
        setTimeout("keepTrack()", 50);
    }
}

function startIt() {
    isLoaded = true;

    if (isFrames) {
        menuLoc = eval("parent.frames." + mainFrName);
        if (NS4) {
            loader.captureEvents(Event.LOAD);
            loader.onload = NSloaded;
            menuLoc.onunload = NSunloaded;
        }
        if (IE4) {
            menuLoc.document.body.onunload = IEunloaded;
        }
    }
    else {
        menuLoc = window;
    }
    menuLoc.nav = nav = window;
    if (clickKill) {
        if (NS4) menuLoc.document.captureEvents(Event.MOUSEDOWN);
        menuLoc.document.onmousedown = clicked;
    }
    makeTop();
}

function makeTop(){
    beingCreated = true;

    if(IE4) {
        topZ = 0;
        for (z = 0; z < menuLoc.document.all.length; z++) {
            oldEl = menuLoc.document.all(z);
            topZ = Math.max(oldEl.style.zIndex,topZ)
        }
    }
    while (eval("window.arMenu" + topCount)) {
        (NS4) ? makeMenuNS(false,topCount) : makeMenuIE(false,topCount);
        topCount++
    }

    areCreated = true;
    beingCreated = false;
}

function makeMenuNS(isChild, menuCount, parMenu, parItem) {
    tempArray = eval("arMenu" + menuCount);

    if (!isChild) {
        tempWidth = tempArray[0] ? tempArray[0] : menuWidth;
        menu = makeElement("elMenu" + menuCount, tempWidth, null, null);
    }
    else {
        menu = makeElement("elMenu" + menuCount, null, parMenu, null);
    }
    menu.array = tempArray;
    menu.setMenuTree = setMenuTree;
    menu.setMenuTree(isChild, parMenu);

    while (menu.itemCount < menu.maxItems) {
        menu.itemCount++;
        prevItem = (menu.itemCount > 1) ? menu.item : null;
        itemName = "item" + menuCount + "_" + menu.itemCount;

        menu.item = makeElement(itemName, null, null, menu);

        menu.item.prevItem = prevItem;
        menu.item.setup = itemSetup;
        menu.item.setup(menu.itemCount, menu.array);
        if (menu.item.hasMore) {
            makeMenuNS(true,menuCount + "_" + menu.itemCount, menu, menu.item);
            menu = menu.parentMenu;
        }
    }

    menu.lastItem = menu.item;
    menu.setup(isChild, parMenu, parItem);
}

function findTree(men){
    foundTree = false;
    for (i = 11; i < men.array.length; i += 3) {
        if (men.array[i]) {
            foundTree = true;
            break;
        }
    }
    return foundTree;
}

function setMenuTree(isChild, parMenu) {
    if (!isChild) {
        this.menuWidth = this.array[0] ? this.array[0] : menuWidth;
        this.menuLeft = this.array[1];
        this.menuTop = this.array[2];
        this.menuFontColor = this.array[3] ? this.array[3] : fntCol;
        this.menuFontOver = this.array[4] ? this.array[4] : overFnt;
        this.menuBGColor = this.array[5] ? this.array[5] : backCol;
        this.menuBGOver = this.array[6] ? this.array[6] : overCol;
        this.menuBorCol = this.array[7] ? this.array[7] : borCol;
        this.menuSeparatorCol = this.array[8] ? this.array[8] : separatorCol;
        this.treeParent = this;
        this.startChild = this;

        this.isTree = findTree(this);
    }
    else {
        this.menuWidth = parMenu.menuWidth;
        this.menuLeft = parMenu.menuLeft;
        this.menuTop = parMenu.menuTop;
        this.menuFontColor = parMenu.menuFontColor;
        this.menuFontOver = parMenu.menuFontOver;
        this.menuBGColor = parMenu.menuBGColor;
        this.menuBGOver = parMenu.menuBGOver;
        this.menuBorCol = parMenu.menuBorCol;
        this.menuSeparatorCol = parMenu.menuSeparatorCol;
        this.treeParent = parMenu.treeParent;

        this.isTree = parMenu.isTree;
    }

    this.maxItems = (isChild) ? this.array.length / 3 : (this.array.length - 9) / 3;
    this.hasParent = isChild;
    this.setup = menuSetup;
    this.itemCount = 0;
}

function makeMenuIE(isChild, menuCount, parMenu) {

    menu = makeElement("elMenu" + menuCount);
    menu.array = eval("arMenu" + menuCount);

    menu.setMenuTree = setMenuTree;
    menu.setMenuTree(isChild, parMenu);

    menu.itemStr = "";

    while (menu.itemCount < menu.maxItems) {
        menu.itemCount++;
        itemName = "item" + menuCount + "_" + menu.itemCount;

        arrayPointer = (isChild) ? (menu.itemCount - 1) * 3 : ((menu.itemCount - 1) * 3) + 9;
        dispText = menu.array[arrayPointer];
        hasMore = menu.array[arrayPointer + 2];
        htmStr = (hasMore) ? imgStr + dispText : dispText;

        menu.itemStr += "<SPAN ID=" + itemName + " STYLE=\"width:" + (menu.menuWidth - (borWid * 2)) + "\">" + htmStr + "</SPAN><BR>";

        if (hasMore) {
            makeMenuIE(true,menuCount + "_" + menu.itemCount,menu);
            menu = menu.parentMenu;
        }
    }

    menu.innerHTML = menu.itemStr;
    itemColl = menu.children.tags("SPAN");
    for (i = 0; i < itemColl.length; i++) {
        it = itemColl(i);
        it.setup = itemSetup;
        it.setup(i + 1, menu.array);
    }
    menu.lastItem = itemColl(itemColl.length - 1);
    menu.setup(isChild, parMenu);
}

function makeElement(whichEl, whichWidth, whichParent, whichContainer) {
    if (NS4) {
        if (whichWidth) {
            elWidth = whichWidth;
        }
        else {
            elWidth = (whichContainer) ? whichContainer.menuWidth : whichParent.menuWidth;
            if (whichContainer) {
                elWidth = elWidth - (borWid * 2) - (itemPad * 2);
            }
        }
        if (!whichContainer) {
            whichContainer = menuLoc;
        }
        eval(whichEl + "= new Layer(elWidth,whichContainer)");
    }
    else {
        elStr = "<DIV ID=" + whichEl + " STYLE='position:absolute'></DIV>";
        menuLoc.document.body.insertAdjacentHTML("BeforeEnd", elStr);
        if (isFrames) {
            eval(whichEl + "= menuLoc." + whichEl);
        }
    }
    return eval(whichEl);
}

function itemSetup(whichItem,whichArray) {
    this.onmouseover = itemOver;
    this.onmouseout = itemOut;
    this.container = (NS4) ? this.parentLayer : this.offsetParent;

    arrayPointer = (this.container.hasParent) ? (whichItem - 1) * 3 : ((whichItem - 1) * 3) + 9;

    this.dispText = whichArray[arrayPointer];
    this.linkText = whichArray[arrayPointer + 1];
    this.hasMore = whichArray[arrayPointer + 2];

    if (IE4 && this.hasMore) {
        this.child = eval("elMenu" + this.id.substr(4));
        this.child.parentMenu = this.container;
        this.child.parentItem = this;
    }

    if (this.linkText) {
        if (NS4) {
            this.captureEvents(Event.MOUSEUP)
            this.onmouseup = linkIt;
        }
        else {
            this.onclick = linkIt;
            this.style.cursor = "hand";
        }
    }

    if (NS4) {
        htmStr = this.dispText;
        if (fntBold) htmStr = htmStr.bold();
//      if (fntItal) htmStr = htmStr.italics();

        htmStr = "<FONT FACE='" + fntFam + "' POINT-SIZE=" + fntSiz + ">" + htmStr + "</FONT>";

        this.htmStrOver = htmStr.fontcolor(this.container.menuFontOver);
        this.htmStr = htmStr.fontcolor(this.container.menuFontColor);

        if (this.hasMore) {
            this.document.write(imgStr);
            this.document.close();
        }

        this.visibility = "inherit";
        this.bgColor = this.container.menuBGColor;

        if (whichItem == 1) {
            this.top = borWid + itemPad;
        }
        else {
            this.top = this.prevItem.top + this.prevItem.clip.height + separator;
        }
        this.left = borWid + itemPad;
        this.clip.top = this.clip.left = -itemPad;
        this.clip.right = this.container.menuWidth - (borWid * 2) - itemPad;

        maxTxtWidth = this.container.menuWidth - (borWid * 2) - (itemPad * 2);
        if (this.container.isTree) {
            maxTxtWidth -= (fullImgSize);
        }

        this.txtLyr = new Layer(maxTxtWidth, this);

        if (isRight && this.container.isTree) {
            this.txtLyr.left = fullImgSize;
        }

        this.txtLyr.document.write(this.htmStr);
        this.txtLyr.document.close();
        this.txtLyr.visibility = "inherit";

        this.clip.bottom = this.txtLyr.document.height + itemPad;

        this.dummyLyr = new Layer(100, this);
        this.dummyLyr.left = this.dummyLyr.top = -itemPad;
        this.dummyLyr.clip.width = this.clip.width;
        this.dummyLyr.clip.height = this.clip.height;
        this.dummyLyr.visibility = "inherit";
    }
    else {
        with (this.style) {
            padding = itemPad;

            if (this.container.isTree && !this.hasMore) {
                if (isRight) {
                    paddingLeft = itemPad + fullImgSize;
                }
                else {
                    paddingRight = itemPad+fullImgSize;
                }
            }
            color = this.container.menuFontColor;
            fontSize = fntSiz + "pt";
            fontWeight = (fntBold) ? "normal" : "normal";
            fontStyle = (fntItal) ? "normal" : "normal";
            fontFamily = fntFam;

            borderBottomWidth = separator + "px";
            borderBottomColor = this.container.menuSeparatorCol;
            borderBottomStyle = "solid";
            backgroundColor = this.container.menuBGColor;
        }
    }
}

function menuSetup(hasParent, openCont, openItem) {
    this.onmouseover = menuOver;
    this.onmouseout = menuOut;

    this.showIt = showIt;
    this.keepInWindow = keepInWindow;
    this.hideTree = hideTree
    this.hideParents = hideParents;
    this.hideChildren = hideChildren;
    this.hideTop = hideTop;
    this.hasChildVisible = false;
    this.isOn = false;
    this.hideTimer = null;

    this.childOverlap = (perCentOver != null) ? ((perCentOver / 100) * this.menuWidth) : childOverlap;
    this.currentItem = null;
    this.hideSelf = hideSelf;

    if (hasParent) {
        this.hasParent = true;
        this.parentMenu = openCont;
        if (NS4) {
            this.parentItem = openItem;
            this.parentItem.child = this;
        }
    }
    else {
        this.hasParent = false;
    }

    if (NS4) {
        this.bgColor = this.menuBorCol;
        this.fullHeight = this.lastItem.top + this.lastItem.clip.bottom + borWid;
        this.clip.right = this.menuWidth;
        this.clip.bottom = this.fullHeight;
    }
    else {
        with (this.style) {
            width = this.menuWidth;
            borderWidth = borWid;
            borderColor = this.menuBorCol;
            borderStyle = borSty;

            zIndex = topZ;
        }

        this.lastItem.style.border="";
        this.fullHeight = this.scrollHeight;
        this.showIt(false);
        this.onselectstart = cancelSelect;
        this.moveTo = moveTo;
        this.moveTo(0, 0);
    }
}

function popUp(menuName, e){
    if (isMenu) {
        if (NS4 && NSresized) {
            startIt();
        }
        if (!isLoaded) {
            return;
        }
        linkEl = (NS4) ? e.target : event.srcElement;
        if (clickStart) {
            linkEl.onclick = popMenu;
        }
        if (!beingCreated && !areCreated) {
            startIt();
        }
        linkEl.menuName = menuName;
        if (!clickStart) {
            popMenu(e);
        }
    }
}

function popMenu(e){
    if (!isLoaded || !areCreated) {
        return true;
    }

    eType = (NS4) ? e.type : event.type;
    if (clickStart && eType != "click") {
        return true;
    }
    hideAll();

    linkEl = (NS4) ? e.target : event.srcElement;

    currentMenu = eval(linkEl.menuName);
    currentMenu.hasParent = false;
    currentMenu.treeParent.startChild = currentMenu;

    if (IE4) {
        menuLocBod = menuLoc.document.body;
    }
    if (!isFrames) {
        xPos = (currentMenu.menuLeft) ? currentMenu.menuLeft : (NS4) ? e.pageX : (event.clientX + menuLocBod.scrollLeft);
        yPos = (currentMenu.menuTop) ? currentMenu.menuTop : (NS4) ? e.pageY : (event.clientY + menuLocBod.scrollTop);
    }
    else {
        switch (navFrLoc) {
            case "left":
                xPos = (currentMenu.menuLeft) ? currentMenu.menuLeft : (NS4) ? menuLoc.pageXOffset : menuLocBod.scrollLeft;
                yPos = (currentMenu.menuTop) ? currentMenu.menuTop : (NS4) ? (e.pageY - pageYOffset) + menuLoc.pageYOffset : event.clientY + menuLocBod.scrollTop;
                break;
            case "top":
                xPos = (currentMenu.menuLeft) ? currentMenu.menuLeft : (NS4) ? (e.pageX - pageXOffset) + menuLoc.pageXOffset : event.clientX + menuLocBod.scrollLeft;
                yPos = (currentMenu.menuTop) ? currentMenu.menuTop : (NS4) ? menuLoc.pageYOffset : menuLocBod.scrollTop;
                break;
            case "bottom":
                xPos = (currentMenu.menuLeft) ? currentMenu.menuLeft : (NS4) ? (e.pageX - pageXOffset) + menuLoc.pageXOffset : event.clientX + menuLocBod.scrollLeft;
                yPos = (currentMenu.menuTop) ? currentMenu.menuTop : (NS4) ? menuLoc.pageYOffset + menuLoc.innerHeight : menuLocBod.scrollTop + menuLocBod.clientHeight;
                break;
            case "right":
                xPos = (currentMenu.menuLeft) ? currentMenu.menuLeft : (NS4) ? menuLoc.pageXOffset + menuLoc.innerWidth : menuLocBod.scrollLeft + menuLocBod.clientWidth;
                yPos = (currentMenu.menuTop) ? currentMenu.menuTop : (NS4) ? (e.pageY - pageYOffset) + menuLoc.pageYOffset : event.clientY + menuLocBod.scrollTop;
                break;
        }
    }

    currentMenu.moveTo(xPos, yPos);
    currentMenu.keepInWindow()
    currentMenu.isOn = true;
    currentMenu.showIt(true);

    return false;
}

function menuOver(e) {
    this.isOn = true;
    isOverMenu = true;
    currentMenu = this;
    if (this.hideTimer) {
        clearTimeout(this.hideTimer);
    }
}

function menuOut() {
    if (IE4) {
        theEvent = menuLoc.event;
        if (theEvent.srcElement.contains(theEvent.toElement)) {
            return;
        }
    }
    this.isOn = false;
    isOverMenu = false;

    menuLoc.status = "";
    if (!clickKill) {
        allTimer = setTimeout("currentMenu.hideTree()", 10);
    }
}

function itemOver(){
    if (keepHilite) {
        if (this.container.currentItem && this.container.currentItem != this) {
            if (NS4) {
                this.container.currentItem.bgColor = this.container.menuBGColor;
                if (NSfontOver) {
                    with (this.container.currentItem.txtLyr.document) {
                        write(this.container.currentItem.htmStr)
                        close();
                    }
                }
            }
            else {
                with (this.container.currentItem.style) {
                    backgroundColor = this.container.menuBGColor;
                    color = this.container.menuFontColor;
                }
            }
        }
    }

    if (IE4) {
        theEvent = menuLoc.event;
        if (theEvent.srcElement.tagName == "IMG") return;
        this.style.backgroundColor = this.container.menuBGOver;
        this.style.color = this.container.menuFontOver;
    }
    else {
        this.bgColor = this.container.menuBGOver;
        if (NSfontOver) {
            this.txtLyr.document.write(this.htmStrOver);
            this.txtLyr.document.close();
        }
    }

    menuLoc.status = this.linkText;

    this.container.currentItem = this;

    if (this.container.hasChildVisible) {
        this.container.hideChildren(this);
    }

    if (this.hasMore) {
        horOffset = (isRight) ? (this.container.childOverlap - this.container.menuWidth) : (this.container.menuWidth - this.container.childOverlap);

        if (NS4) {
            this.childX = this.container.left + horOffset;


            this.childY = (this.pageY + this.clip.top) + childOffset;
        }
        else {
            this.childX = this.container.style.pixelLeft + horOffset;


            this.childY = this.offsetTop + this.container.style.pixelTop + childOffset + borWid;
        }

        this.child.moveTo(this.childX, this.childY);
        this.child.keepInWindow();
        this.container.hasChildVisible = true;
        this.container.visibleChild = this.child;
        this.child.showIt(true);
    }
}

function itemOut() {
    if (IE4) {
        theEvent = menuLoc.event;
        if (theEvent.srcElement.contains(theEvent.toElement)
                || (theEvent.fromElement.tagName=="IMG" && theEvent.toElement.contains(theEvent.fromElement))) {
            return;
        }
        if (!keepHilite) {
            this.style.backgroundColor = this.container.menuBGColor;
            this.style.color = this.container.menuFontColor;
        }
    }
    else {
        if (!keepHilite) {
            this.bgColor = this.container.menuBGColor;
            if (NSfontOver) {
                with (this.txtLyr.document) {
                    write(this.htmStr);
                    close();
                }
            }

        }
        if (!isOverMenu && !clickKill) {
            allTimer = setTimeout("currentMenu.hideTree()", 10);
        }
    }
}

function moveTo(xPos,yPos) {
    this.style.pixelLeft = xPos;
    this.style.pixelTop = yPos;
}

function showIt(on) {
    if (NS4) {
        this.visibility = (on) ? "show" : "hide";
        if (keepHilite && this.currentItem) {
            this.currentItem.bgColor = this.menuBGColor;
            if (NSfontOver) {
                with (this.currentItem.txtLyr.document) {
                    write(this.currentItem.htmStr);
                    close();
                }
            }
        }
    }
    else {
        this.style.visibility = (on) ? "visible" : "hidden";
        if (keepHilite && this.currentItem) {
            with (this.currentItem.style) {
                backgroundColor = this.menuBGColor;
                color = this.menuFontColor;
            }
        }
    }
    this.currentItem = null;
}

function keepInWindow() {
    scrBars = 20;
    botScrBar = (isFrames && navFrLoc == "bottom") ? (borWid * 2) : scrBars;
    rtScrBar = (isFrames && navFrLoc == "right") ? (borWid * 2) : scrBars;
    if (NS4) {
        winRight = (menuLoc.pageXOffset + menuLoc.innerWidth) - rtScrBar;
        rightPos = this.left + this.menuWidth;

        if (rightPos > winRight) {
            if (this.hasParent) {
                parentLeft = this.parentMenu.left;
                newLeft = ((parentLeft - this.menuWidth) + this.childOverlap);
                this.left = newLeft;
            }
            else {
                dif = rightPos - winRight;
                this.left -= dif;
            }
        }

        winBot = (menuLoc.pageYOffset + menuLoc.innerHeight) - botScrBar ;
        botPos = this.top + this.fullHeight;

        if (botPos > winBot) {
            dif = botPos - winBot;
            this.top -= dif;
        }

        winLeft = menuLoc.pageXOffset;
        leftPos = this.left;

        if (leftPos < winLeft) {
            if (this.hasParent) {
                parentLeft = this.parentMenu.left;
                newLeft = ((parentLeft + this.menuWidth) - this.childOverlap);
                this.left = newLeft;
            }
            else {
                this.left = 5;
            }
        }
    }
    else {
        winRight = (menuLoc.document.body.scrollLeft + menuLoc.document.body.clientWidth) - rtScrBar;
        rightPos = this.style.pixelLeft + this.menuWidth;

        if (rightPos > winRight) {
            if (this.hasParent) {
                parentLeft = this.parentMenu.style.pixelLeft;
                newLeft = ((parentLeft - this.menuWidth) + this.childOverlap);
                this.style.pixelLeft = newLeft;
            }
            else {
                dif = rightPos - winRight;
                this.style.pixelLeft -= dif;
            }
        }

        winBot = (menuLoc.document.body.scrollTop + menuLoc.document.body.clientHeight) - botScrBar;
        botPos = this.style.pixelTop + this.fullHeight;

        if (botPos > winBot) {
            dif = botPos - winBot;
            this.style.pixelTop -= dif;
        }

        winLeft = menuLoc.document.body.scrollLeft;
        leftPos = this.style.pixelLeft;

        if (leftPos < winLeft) {
            if (this.hasParent) {
                parentLeft = this.parentMenu.style.pixelLeft;
                newLeft = ((parentLeft + this.menuWidth) - this.childOverlap);
                this.style.pixelLeft = newLeft;
            }
            else {
                this.style.pixelLeft = 5;
            }
        }
    }
}

function linkIt() {
    if (this.linkText.indexOf("javascript:") != -1) {
        eval(this.linkText);
    }
    else {
        menuLoc.location.href = this.linkText;
    }
}

function popDown(menuName){
    if (isMenu) {
        if (!isLoaded || !areCreated) {
            return;
        }
        whichEl = eval(menuName);
        whichEl.isOn = false;
        if (!clickKill) {
            whichEl.hideTop();
        }
    }
}

function hideAll() {
    for (i = 1; i < topCount; i++) {
        temp = eval("elMenu" + i + ".startChild");
        temp.isOn = false;
        if (temp.hasChildVisible) {
            temp.hideChildren();
        }
        temp.showIt(false);
    }
}

function hideTree() {
    allTimer = null;
    if (isOverMenu) {
        return;
    }
    if (this.hasChildVisible) {
        this.hideChildren();
    }
    this.hideParents();
}

function hideTop() {
    whichTop = this;
    (clickKill) ? whichTop.hideSelf() : (this.hideTimer = setTimeout("if(whichTop.hideSelf)whichTop.hideSelf()", mSecsVis));
}

function hideSelf() {
    this.hideTimer = null;
    if (!this.isOn && !isOverMenu) {
        this.showIt(false);
    }
}

function hideParents() {
    tempMenu = this;
    while (tempMenu.hasParent) {
        tempMenu.showIt(false);
        tempMenu.parentMenu.isOn = false;
        tempMenu = tempMenu.parentMenu;
    }
    tempMenu.hideTop();
}

function hideChildren(item) {
    tempMenu = this.visibleChild;
    while (tempMenu.hasChildVisible) {
        tempMenu.visibleChild.showIt(false);
        tempMenu.hasChildVisible = false;
        tempMenu = tempMenu.visibleChild;
    }

    if (!this.isOn || !item.hasMore || this.visibleChild != this.child) {
        this.visibleChild.showIt(false);
        this.hasChildVisible = false;
    }
}

function cancelSelect() {
    return false;
}

function reDo(){
    if (loader.innerWidth == origWidth && loader.innerHeight == origHeight) {
        return;
    }
    initVars();
    NSresized = true;
    menuLoc.location.reload();
}

function clicked() {
    if (!isOverMenu && currentMenu!=null && !currentMenu.isOn) {
        whichEl = currentMenu;
        whichEl.hideTree();
    }
}

window.onerror = handleErr;

function handleErr(){
    arAccessErrors = ["permission","access"];
    mess = arguments[0].toLowerCase();
    found = false;
    for (i = 0; i < arAccessErrors.length; i++) {
        errStr = arAccessErrors[i];
        if (mess.indexOf(errStr) != -1) {
            found = true;
        }
    }
    return found;
}

//Create our menus and menu items
var x1, y1;
x1 = 2;
y1 = 83;

arMenu1 = new Array(
        101,
        x1, y1,
        
        "black", "black",
        "DFF1FF", "66CCFF",
        "black", "white",

        "Add New", "javascript:MenuOnSubmit('AddTimesheet')", 0,
        "List", "javascript:MenuOnSubmit('ListTimesheet')", 0,
        "Import", "javascript:MenuOnSubmit('ImportTimesheet')", 0
);

var x2, y2
x2 = 105;
y2 = 83;

arMenu2 = new Array(
        164,
        x2, y2,

        "black", "black",
        "DFF1FF", "66CCFF",
        "black", "white",

        "Approved for Internal/External Projects", "javascript:MenuOnSubmit('ListPL')", 0,
        "Approved for Public Projects", "javascript:MenuOnSubmit('ListGL')", 0,
        "Approve By Quality Assurance", "javascript:MenuOnSubmit('ListQA')", 0
);

var x3, y3
x3 = 208;
y3 = 83;

arMenu3 = new Array(
        101,
        x3, y3,

        "black", "black",
        "DFF1FF", "66CCFF",
        "black", "white",

        "Summary", "javascript:MenuOnSubmit('Summary')", 0,
        "Inquiry", "javascript:MenuOnSubmit('Inquiry')", 0,        
        "Tracking", "javascript:MenuOnSubmit('Tracking')", 0
);

//Submit function

function MenuOnSubmit(goto) {
    var strRole = window.document.forms[0].Role.value;
    var form = window.document.forms[0];

    clearInvalidControls(form);

    // Logout
    if (goto == 'Logout') {
        LogoutClientHandler('TimesheetHomepage');
    }
    // ChangePassword
    else if (goto == 'ChangePassword') {
        GotoChangePasswordClientHandler(goto);
    }
    //Addnew
    else if (goto == 'AddTimesheet') {
	    if ( strRole.substring(0, 1) == '1' || strRole.substring(6, 7) == '1'
	    	 || strRole.substring(7, 8) == '1' || strRole.substring(8, 9) == '1') {
            GotoAddnewClientHandler(goto);
        }
        else {
            alert('Sorry, unauthorized access. You are not a Developer');
        }
    }
    else if (goto == 'ListTimesheet') {
   	    if ( strRole.substring(0, 1) == '1' || strRole.substring(6, 7) == '1'
   	    	 || strRole.substring(7, 8) == '1' || strRole.substring(8, 9) == '1') {
            GotoListingClientHandler(goto);
        }
        else {
            alert('Sorry, unauthorized access. You are not a Developer');
        }
    }
    //Import
    else if (goto == 'ImportTimesheet') {
        if (strRole.substring(4, 5) == '1') {
            GotoImportClientHandler(goto);
        }
        else {
            alert('Sorry, unauthorized access. You are not a QA');
        }
    }
    else if (goto == 'Summary') {
    	if ( strRole.substring(6, 7) == '1' || strRole.substring(7, 8) == '1' ) {
    		alert('Sorry, unauthorized access. You are not a Developer');
    	}
    	else {
   	        GotoSummaryClientHandler("SummaryReport");
    	}
    }
    else if (goto == 'Inquiry') {
    	if ( strRole.substring(6, 7) == '1' || strRole.substring(7, 8) == '1' ) {
    		alert('Sorry, unauthorized access. You are not a Developer');
    	}
    	else {
   	        GotoInquiryClientHandler("InquiryReport");
    	}
    }
    //HanhTN added -- 08/08/2006
    else if (goto == 'Tracking') {
    	if ( strRole.substring(6, 7) == '1' || strRole.substring(7, 8) == '1' ) {
    		alert('Sorry, unauthorized access. You are not a Developer');
    	}
    	else {
   	        GotoTrackingClientHandler("LackTSGroup");
    	}
    }
    else if (goto == 'HelpActivityCode') {
        HelpActivityCodeClientHandler('GotoHelpActivityCode');
    }

    //LD Approve
    else if (goto == 'ListPL') {
        if (strRole.substring(1, 2) == '1' || strRole.substring(2, 3) == '1') {
            GotoLDApproveClientHandler(goto);
        }
        else {
            alert('Sorry, unauthorized access. You are not a Leader');
        }
    }
    //Other Approve
    else if (goto == 'ListGL') {
        if (strRole.substring(3, 4) == '1' || strRole.substring(2, 3) == '1') {
            GotoOtherApproveClientHandler(goto);
        }
        else if (strRole.substring(1, 2) == '1' || strRole.substring(2, 3) == '1') {
            GotoOtherApproveClientHandler(goto);
        }
        else {
            alert('Sorry, unauthorized access. You are not a Leader');
        }
    }
    //QA Approve
    else if (goto == 'ListQA') {
        if (strRole.substring(4, 5) == '1') {
            GotoQAApproveClientHandler(goto);
        }
        else {
            alert('Sorry, unauthorized access. You are not a QA');
        }
    }
}

//Clear invalid date values if this form contains them
function clearInvalidControls(form) {
    var control;
    for (var count = 0x00; count < form.length; count++) {
        control = form.item(count);
        if (control.name.indexOf("FromDate", 0) >= 0 ||
                control.name.indexOf("ToDate", 0) >= 0) {
            
            if (control.value.length > 0) {
                if (!isDate(control.value)) {
                    form.item(count).value = "";
                }
            }
        }
    }
}

//*****************************************************************************
// Menu Client Handlers....

function LogoutClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = eventSourceName;    //approval action
    fireMenuServerEvent(eventSourceName);
}

function GotoChangePasswordClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

//
function GotoListingClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

function GotoAddnewClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

function GotoImportClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

//
function GotoInquiryClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "RA";       //report action
    fireMenuServerEvent(eventSourceName);
}

function GotoSummaryClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "RA";
    fireMenuServerEvent(eventSourceName);
}

function GotoWeeklyClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "RA";
    fireMenuServerEvent(eventSourceName);
}

//HanhTN added -- 08/08/2006
function GotoTrackingClientHandler(eventSourceName) {
//	alert("Hello -- GotoTrackingClientHandler");
    document.forms[0].hidAction.value = "RA";
    fireMenuServerEvent(eventSourceName);
}

function HelpActivityCodeClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

//////////////////////////////////
function GotoLDApproveClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

function GotoQAApproveClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

function GotoOtherApproveClientHandler(eventSourceName) {
    document.forms[0].hidAction.value = "AA";
    fireMenuServerEvent(eventSourceName);
}

//////////////////////////////

function fireMenuServerEvent(eventSourceName) {
    document.forms[0].hidActionDetail.value = eventSourceName;
    document.forms[0].action = "TimesheetServlet";
    document.forms[0].submit();
}