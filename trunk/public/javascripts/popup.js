/*
	Configuration

	Functions
	- getPageScroll()
	- getPageSize()
	- pause()
	- getKey()
	- listenKey()
	- showLightbox()
	- hideLightbox()
	- initLightbox()
	- addLoadEvent()

	Function Calls
	- addLoadEvent(initLightbox)
*/

//
// Configuration
//

// If you would like to use a custom loading image or close button reference them in the next two lines.
var loadingImage = 'images/loading.gif';
var closeButton = 'images/x.png';

onClickImgHandler = function(event) {
    document.getElementById("mainPortfolioImg").innerHTML = "<img alt='Img1' class='imgtag-main' src='" + event.id + "' >";
    document.getElementById("mainPortfolioImgCaption").innerHTML = event.name;
};

onCloseHandler = function () {
    hideLightbox();
    return false;
}

//
// getPageScroll()
// Returns array with x,y page scroll values.
//
function getPageScroll() {

    var yScroll;

    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
    } else if (document.body) {// all other Explorers
        yScroll = document.body.scrollTop;
    }

    arrayPageScroll = new Array('',yScroll)
    return arrayPageScroll;
}



//
// getPageSize()
// Returns array with page width, height and window width, height
//
function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
        
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;

    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) {	// all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
        
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;

    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight) {
        pageHeight = windowHeight;
        
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }


    arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
    return arrayPageSize;
}


//
// pause(numberMillis)
// Pauses code execution for specified time. Uses busy code, not good.
//
function pause(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

//
// getKey(key)
// Gets keycode. If 'x' is pressed then it hides the lightbox.
//

function getKey(e){
    if (e == null) { // ie
        keycode = event.keyCode;
        
    } else { // mozilla
        keycode = e.which;
    }
    key = String.fromCharCode(keycode).toLowerCase();

    if(key == 'x') {
        hideLightbox();
    }
}


//
// listenKey()
//
function listenKey () {
    document.onkeypress = getKey;
}


//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//
function showLightbox(objLink) {

//    new Ajax.Request(url, {
//      method: 'get',
//      onSuccess: function(transport) {
//        var notice = $('notice');
//        if (transport.responseText.match(/href="http:\/\/prototypejs.org/))
//          notice.update('Yeah! You are in the Top 10!').setStyle({ background: '#dfd' });
//        else
//          notice.update('Damn! You are beyond #10...').setStyle({ background: '#fdd' });
//      }
//    });
//
//
//    new Ajax.Request("/Controller/portfolios_controller.rb", {
//        method: 'POST',
////        def: "show",
//        data: null, // optional data
//        onSuccess: function(transport) {
//            alert(transport);
//        }/*,
//        error : function(req, status, error) {
//            alert("errror");
//        }*/
//    });

    // prep objects
    var objOverlay = document.getElementById('overlay');
    var objLightbox = document.getElementById('lightbox');
    var objCaption = document.getElementById('lightboxCaption');
    var objImage = document.getElementById('lightboxImage');
    var objLoadingImage = document.getElementById('loadingImage');
    var objLightboxDetails = document.getElementById('lightboxDetails');

    var arrayPageSize = getPageSize();
    var arrayPageScroll = getPageScroll();

    // center loadingImage if it exists
    if (objLoadingImage) {
        objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
        objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
        objLoadingImage.style.display = 'block';
    }

    // set height of Overlay to take up whole page and show
    objOverlay.style.height = (arrayPageSize[1] + 'px');
    objOverlay.style.display = 'block';


//    if (portfolioArr[0]) {
//        // Portfolio gallery -> sends all the approved portfolio ids in an array
//        if (portfolioArr.indexOf(objLink.id) > -1) {
//            // Clicked on portfolio from Home page
//            objLightbox.name = objLink.id;
//
//        } else {
//            // Next or Previous button clicked
//
//        }
//
//    } else {
//        // Preview Porfolio -> sends only the portfolio id
//        objLightbox.name = portfolioArr;
//    }
//
//    if (objLink.name > -1) {
//        objLightbox.name = parseInt(objLink.name);
//
//    } else if (objLink == -1) {
//        objLightbox.name++;
//
//    } else if (objLink == -2) {
//        if (objLightbox.name > 1) {
//            objLightbox.name--;
//
//        } else {
//            alert("Go forward");
//            // go to the last one
//        }
//    }

    var portfolioArr;
    
    if (objLink == -1) {
        objLink = document.getElementsByClassName("nextButton")[0];
        portfolioArr = objLink.name.split(",");

    } else if (objLink == -2) {
        objLink = document.getElementsByClassName("backButton")[0];
        portfolioArr = objLink.name.split(",");

    } else if (objLink.name) {
        portfolioArr = objLink.name.split(" ");

    } else {
        portfolioArr = objLink.id;
    }
    
    objLightbox.name = objLink.id;
    objLightbox.portfolioArr = portfolioArr;
    if (portfolioArr.indexOf(objLink.id) < portfolioArr.length - 1) {
        objLightbox.nextPortfolio = portfolioArr[portfolioArr.indexOf(objLink.id) + 1];

    } else {
        // Go back to the first one
        objLightbox.nextPortfolio = portfolioArr[0];
    }

    if (portfolioArr.indexOf(objLink.id) > 0) {
        objLightbox.prevPortfolio = portfolioArr[portfolioArr.indexOf(objLink.id) - 1];

    } else {
        // Go to the last one
        objLightbox.prevPortfolio = portfolioArr[portfolioArr.length - 1];
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4) {
            if (xmlhttp.status==200) {
                // Response for the request
                objLightbox.innerHTML = xmlhttp.responseText;
                document.getElementsByClassName("nextButton")[0].id = objLightbox.nextPortfolio;
                document.getElementsByClassName("nextButton")[0].name = objLightbox.portfolioArr;
                document.getElementsByClassName("backButton")[0].id = objLightbox.prevPortfolio;
                document.getElementsByClassName("backButton")[0].name = objLightbox.portfolioArr;

            } else {
                alert("Go back");
            }
        }
    }

    xmlhttp.open("GET", "/portfolios/" + objLightbox.name, true);
    xmlhttp.send();

    if (objLoadingImage) {
        objLoadingImage.style.display = 'none';
    }

    objLightbox.style.display = 'block';

    // preload image
//    imgPreload = new Image();
//    imgPreload.style.width = "300px";
//    imgPreload.style.height = "200px";
//
//    imgPreload.onload=function() {
//        objImage.src = objLinkName[1];
//        objImage.style.width = "500px";
//        objImage.style.height = "300px";
//
////        objImage.src = objLink.name;
//
//        // center lightbox and make sure that the top and left values are not negative
//        // and the image placed outside the viewport
//        var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
//        var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);
//
//        objLightbox.style.top = "50px";
//        objLightbox.style.left = "50px";
////        objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
////        objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";
//
//        // ---- Can add image caption here ----
//        objLightboxDetails.innerHTML = objLink.name;
//        objLightboxDetails.style.width = imgPreload.width + 'px';
//
//        if(objLink.getAttribute('title')) {
//            objCaption.style.display = 'block';
//            //objCaption.style.width = imgPreload.width + 'px';
////            objCaption.innerHTML = objLink.getAttribute('title');
////            objCaption.innerHTML = objLink.name;
//
//        } else {
//            objCaption.style.display = 'none';
//        }
//
//        // A small pause between the image loading and displaying is required with IE,
//        // this prevents the previous image displaying for a short burst causing flicker.
//        if (navigator.appVersion.indexOf("MSIE")!=-1) {
//            pause(250);
//        }
//
//        if (objLoadingImage) {
//            objLoadingImage.style.display = 'none';
//        }
//
//        // Hide select boxes as they will 'peek' through the image in IE
//        selects = document.getElementsByTagName("select");
//        var i = 0;
//        for (i = 0; i != selects.length; i++) {
//            selects[i].style.visibility = "hidden";
//        }
//
//        objLightbox.style.display = 'block';
//        objLightbox.style.width = '1100px';
//        objLightbox.style.height = '400px';
//
//        // After image is loaded, update the overlay height as the new image might have
//        // increased the overall page height.
//        arrayPageSize = getPageSize();
//        objOverlay.style.height = (arrayPageSize[1] + 'px');
//
//        // Check for 'x' keypress
//        listenKey();
//
//        return false;
//    }
//
//    imgPreload.src = objLinkName[1];
//    imgPreload.src = objLink.name;
}



//
// hideLightbox()
//
function hideLightbox() {
    // get objects
    objOverlay = document.getElementById('overlay');
    objLightbox = document.getElementById('lightbox');

    // hide lightbox and overlay
    objOverlay.style.display = 'none';
    objLightbox.style.display = 'none';

    // make select boxes visible
    selects = document.getElementsByTagName("select");
    var i = 0;
    for (i = 0; i != selects.length; i++) {
        selects[i].style.visibility = "visible";
    }

    // disable keypress listener
    document.onkeypress = '';
}




//
// initLightbox()
// Function runs on window load, going through link tags looking for rel="lightbox".
// These links receive onclick events that enable the lightbox display for their targets.
// The function also inserts html markup at the top of the page which will be used as a
// container for the overlay pattern and the inline image.
//
function initLightbox() {

    if (!document.getElementsByTagName) {
        return;
    }

    var anchors = document.getElementsByTagName("img");

    // loop through all anchor tags
    for (var i=0; i<anchors.length; i++) {
        var anchor = anchors[i];

        if (anchor.getAttribute("class") == "imgtag lightbox" || anchor.getAttribute("class") == "backButton"
            || anchor.getAttribute("class") == "nextButton") {
            anchor.onclick = function () {
                showLightbox(this);
                return false;
            }
        }
    }

    anchors = document.getElementsByClassName("popupligthbox");

    // loop through all anchor tags
    for (var i=0; i<anchors.length; i++) {
        anchor = anchors[i];
        anchor.onclick = function () {
            showLightbox(this);
            return false;
        }
    }

    // the rest of this code inserts html at the top of the page that looks like this:
    //
    // <div id="overlay">
    //		<a href="#" onclick="hideLightbox(); return false;"><img id="loadingImage" /></a>
    //	</div>
    // <div id="lightbox">
    //		<a href="#" onclick="hideLightbox(); return false;" title="Click anywhere to close image">
    //			<img id="closeButton" />
    //			<img id="lightboxImage" />
    //		</a>
    //		<div id="lightboxDetails">
    //			<div id="lightboxCaption"></div>
    //			<div id="keyboardMsg"></div>
    //		</div>
    // </div>

    var objBody = document.getElementsByTagName("body").item(0);

    // create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
    var objOverlay = document.createElement("div");
    objOverlay.setAttribute('id','overlay');

    objOverlay.style.display = 'none';
    objOverlay.style.position = 'absolute';
    objOverlay.style.top = '0';
    objOverlay.style.left = '0';
    objOverlay.style.zIndex = '90';
    objOverlay.style.width = '100%';
    objBody.insertBefore(objOverlay, objBody.firstChild);

    var arrayPageSize = getPageSize();
    var arrayPageScroll = getPageScroll();

    // preload and create loader image
    var imgPreloader = new Image();

    // if loader image found, create link to hide lightbox and create loadingimage
    imgPreloader.onload=function() {

        var objLoadingImageLink = document.createElement("a");
        objLoadingImageLink.setAttribute('href','');

        objOverlay.appendChild(objLoadingImageLink);

        var objLoadingImage = document.createElement("img");
        objLoadingImage.src = loadingImage;
        objLoadingImage.setAttribute('id','loadingImage');
        objLoadingImage.style.position = 'absolute';
        objLoadingImage.style.zIndex = '150';
        objLoadingImageLink.appendChild(objLoadingImage);

        imgPreloader.onload=function() {};	//	clear onLoad, as IE will flip out w/animated gifs

        return false;
    }

    imgPreloader.src = loadingImage;

    // create lightbox div, same note about styles as above
    var objLightbox = document.createElement("div");
    objLightbox.setAttribute('id','lightbox');
    objLightbox.style.display = 'none';
    objLightbox.style.position = 'absolute';
    objLightbox.style.left = '25px';
//    objLightbox.style.width = '1275px';
    objLightbox.style.width = '95%';
//    objLightbox.style.height = '500px';
    objLightbox.style.height = '90%';
    objLightbox.style.zIndex = '100';
    objLightbox.style.marginTop = '7px';
    objBody.insertBefore(objLightbox, objOverlay.nextSibling);

    // create link
    var objLink = document.createElement("a");

    objLightbox.appendChild(objLink);

    // preload and create close button image
    var imgPreloadCloseButton = new Image();

    // if close button image found,
    imgPreloadCloseButton.onload=function() {

        var objCloseButton = document.createElement("img");
        objCloseButton.src = closeButton;
        objCloseButton.setAttribute('id','closeButton');
        objCloseButton.style.position = 'absolute';
        objCloseButton.style.zIndex = '200';
        objCloseButton.style.cursor = 'pointer';
        objCloseButton.onclick = function () {
            hideLightbox();
            return false;
        }
        objLink.appendChild(objCloseButton);

        return false;
    }

    imgPreloadCloseButton.src = closeButton;

    // create image
    var objImage = document.createElement("img");
    objImage.setAttribute('id','lightboxImage');
    objLink.appendChild(objImage);

    // create details div, a container for the caption and keyboard message
    var objLightboxDetails = document.createElement("div");
    objLightboxDetails.setAttribute('id','lightboxDetails');
    objLightbox.appendChild(objLightboxDetails);

    // create caption
    var objCaption = document.createElement("div");
    objCaption.setAttribute('id','lightboxCaption');
    objCaption.style.display = 'none';
    objLightboxDetails.appendChild(objCaption);

    // create keyboard message
    var objKeyboardMsg = document.createElement("div");
    objKeyboardMsg.setAttribute('id','keyboardMsg');
    //objKeyboardMsg.innerHTML = 'press <kbd>x</kbd> to close';
    objLightboxDetails.appendChild(objKeyboardMsg);
}




//
// addLoadEvent()
// Adds event to window.onload without overwriting currently assigned onload functions.
//
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
        
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}



addLoadEvent(initLightbox);	// run initLightbox onLoad
