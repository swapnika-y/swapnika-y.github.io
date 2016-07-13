function mainNavItem2ClickHandler() {
	console.log("in Item2ClickHandler");
	document.getElementById('subUL3').style.display = 'none';
	document.getElementById('subUL1').style.display = 'none';
	document.getElementById('subUL2').style.display = 'block';
	document.getElementById("subUL2").className = "nav1left";
}
function mainNavItem1ClickHandler() {
	console.log("in Item2ClickHandler");
	document.getElementById('subUL3').style.display = 'none';
	document.getElementById('subUL2').style.display = 'none';
	document.getElementById('subUL1').style.display = 'block';
	document.getElementById("subUL1").className = "nav1left";
}
function addEventListenerByClass(className, event, fn) {
	var i;
    var list = document.getElementsByClassName(className);
    for (i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
(function () {
	console.log("im IIFE");
	document.querySelector("#mainItem1").addEventListener("click",mainNavItem1ClickHandler,false);
	document.querySelector("#mainItem2").addEventListener("click",mainNavItem2ClickHandler,false);
})();
