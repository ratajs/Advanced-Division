var keyWhitelist =
[
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	".",
	",",
	"r",
	"/",
	"∶",
	"∕",
	"=",
	"ArrowLeft",
	"ArrowRight",
	"Home",
	"End",
	"Backspace",
	"Delete",
	"Cancel",
	"Tab",
	"Enter",
	"Escape"
];
window.caret = 0;
function keydown(event) {
	if(keyWhitelist.indexOf(event.key) < 0)
		return true;
	if(event.preventDefault)
		event.preventDefault();
	if(document.getElementsByClassName("focus").length < 1)  {
		document.getElementById("n1").className = "focus";
		window.caret = document.getElementById("n1").innerText.length;
		showCaret();
	};
	var ae = document.getElementsByClassName("focus")[0];
	if(ae.id=="n2" && event.key=="r") {
		alert("Not yet supported");
		return false;
	};
	if(window.caret < 0)
		window.caret = 0;
	if(window.caret > ae.innerText.length)
		window.caret = ae.innerText.length;
	switch(event.key) {
		case "0":
			addCharacter("0"); window.caret+= 1; break;
		case "1":
			addCharacter("1"); window.caret+= 1; break;
		case "2":
			addCharacter("2"); window.caret+= 1; break;
		case "3":
			addCharacter("3"); window.caret+= 1; break;
		case "4":
			addCharacter("4"); window.caret+= 1; break;
		case "5":
			addCharacter("5"); window.caret+= 1; break;
		case "6":
			addCharacter("6"); window.caret+= 1; break;
		case "7":
			addCharacter("7"); window.caret+= 1; break;
		case "8":
			addCharacter("8"); window.caret+= 1; break;
		case "9":
			addCharacter("9"); window.caret+= 1; break;
		case ".":
			(ae.innerHTML.indexOf(".") < 0) ? (
				addCharacter(".")
			) : null; window.caret+= 1; break;
		case ",":
			(ae.innerHTML.indexOf(".") < 0) ? (
				addCharacter(".")
			) : null; window.caret+= 1; break;
		case "r":
			ae.innerHTML =
			(ae.children.length > 0) ? (
				ae.innerHTML.replace("<em>", "").replace("</em>", "")
			) : (
				(ae.innerHTML.indexOf(".") > -1 && ae.innerHTML.indexOf(".") < window.caret) ? (
					ae.innerHTML.slice(0, window.caret) + "<em>" +
					((window.caret < ae.innerHTML.length) ? (
						ae.innerHTML.slice(window.caret)
					) : (
						""
					)
					) + "</em>"
				) : ae.innerHTML
			)
			break;
		case "ArrowLeft":
			(window.caret > 0) ? (window.caret-= 1) : null; break;
		case "ArrowRight":
			(window.caret < ae.innerText.length) ? (window.caret+= 1) : null; break;
		case "Home":
			window.caret = 0; break;
		case "End":
			window.caret = ae.innerText.length; break;
		case "Backspace":
			(ae.children.length > 0 && (ae.childNodes.length < 2 || ae.childNodes[0].data.length < window.caret)) ? (
				ae.children[0].innerHTML =
				ae.children[0].innerHTML.slice(0, window.caret - 1 - ((ae.childNodes.length < 2) ? 0 : ae.childNodes[0].data.length))
				+
				ae.children[0].innerHTML.slice(window.caret - ((ae.childNodes.length < 2) ? 0 : ae.childNodes[0].data.length))
			) : (
				(ae.innerHTML.length > 0 && window.caret > 0) ? (
					ae.innerHTML =
					ae.innerHTML.slice(0, window.caret - 1)
					+
					ae.innerHTML.slice(window.caret)
				) : (
					window.caret+= 1
				)
			); window.caret-= 1; break;
		case "Delete":
			(ae.children.length > 0 && (ae.childNodes.length < 2 || ae.childNodes[0].data.length <= window.caret)) ? (
				ae.children[0].innerHTML =
				ae.children[0].innerHTML.slice(0, window.caret - ((ae.childNodes.length < 2) ? 0 : ae.childNodes[0].data.length))
				+
				ae.children[0].innerHTML.slice(window.caret + 1 - ((ae.childNodes.length < 2) ? 0 : ae.childNodes[0].data.length))
			) : (
				(ae.innerHTML.length > 0 && window.caret <= ae.innerHTML.length) ? (
					ae.innerHTML =
					ae.innerHTML.slice(0, window.caret)
					+
					ae.innerHTML.slice(window.caret + 1)
				) : null
			); break;
		case "Cancel":
			ae.innerHTML = "";
			window.caret = 0;
			break;
		case "Tab":
		case "/":
		case "∶":
		case "∕":
			document.getElementById("n1").className = (document.getElementById("n1").className=="focus") ? "" : "focus";
			document.getElementById("n2").className = (document.getElementById("n2").className=="focus") ? "" : "focus";
			window.caret = document.getElementsByClassName("focus")[0].innerText.length;
			break;
		case "=":
		case "Enter":
			submit(); break;
		case "Escape":
			ae.className = ""; window.caret = 0; document.getElementById("caret").style.display = "none"; break;
	};
	if(ae.children.length > 0 && ae.children[0].innerHTML.length < 1 && event.key!="r")
		ae.children[0].remove();
	if(window.caret < 0)
		window.caret = 0;
	if(window.caret > ae.innerHTML.length)
		window.caret = ae.innerHTML.length;
	if(document.getElementsByClassName("focus").length > 0)
		showCaret();
	if(ae.children.length > 0 && ae.innerText.indexOf(".") < 0)
		ae.innerHTML = ae.innerHTML.replace("<em>", "").replace("</em>", "");
	return false;
};
function mousedown(event) {
	event.preventDefault();
	keydown({ key: this.name });
	return false;
};
function click(event) {
	event.preventDefault();
	if(this.className=="focus" || event.target.className=="numpadkey") {
		event.stopPropagation();
		if(this.className=="focus") {
			var pos = Math.round((event.clientX - this.offsetLeft - parseFloat(getComputedStyle(this).paddingLeft)) / window.monospaceWidth);
			if(pos > this.innerText.length)
				window.caret = this.innerText.length;
			else
				window.caret = pos;
			showCaret();
		};
		return false;
	};
	document.getElementById("caret").style.display = "none";
	if(document.getElementsByClassName("focus").length > 0)
		document.getElementsByClassName("focus")[0].className = "";
	window.caret = 0;
	if(this.tagName.toLowerCase()=="span") {
		this.className = "focus";
		var pos = Math.round((event.clientX - this.offsetLeft - parseFloat(getComputedStyle(this).paddingLeft)) / window.monospaceWidth);
		if(pos > this.innerText.length)
			window.caret = this.innerText.length;
		else
			window.caret = pos;
		showCaret();
		event.stopPropagation();
	};
	return false;
};
function addCharacter(char) {
	var ae = document.getElementsByClassName("focus")[0];
	if(ae.children.length < 1 || ae.childNodes.length < 2 || window.caret < ae.childNodes[0].length || (window.caret==ae.childNodes[0].length && ae.children[0].innerHTML.length > 0))
		ae.innerHTML = ae.innerHTML.slice(0, window.caret) + char + ae.innerHTML.slice(window.caret);
	else if(ae.children[0].innerHTML.length < 1 && window.caret >= ae.childNodes[0].length)
		ae.innerHTML = ae.childNodes[0].data + "<em>" + char + "</em>";
	else
		ae.innerHTML = ae.childNodes[0].data + "<em>" + ae.children[0].innerHTML.slice(0, window.caret - ae.childNodes[0].length) + char + ae.children[0].innerHTML.slice(window.caret - ae.childNodes[0].length) + "</em>";
};
function showCaret() {
	var caret = document.getElementById("caret");
	var ae = document.getElementsByClassName("focus")[0];
	if(!ae)
		ae = document.getElementById("n1");
	caret.style.display = "block";
	caret.style.top = document.getElementById("math").offsetTop + "px";
	caret.style.left = (ae.offsetLeft + parseFloat(getComputedStyle(ae).paddingLeft) + (window.caret * window.monospaceWidth)) + "px";
};
function submit() {
	if(document.getElementById("n1").innerText.indexOf(".")==0)
		document.getElementById("n1").innerHTML = "0" + document.getElementById("n1").innerHTML;
	if(document.getElementById("n2").innerText.indexOf(".")==0)
		document.getElementById("n2").innerHTML = "0" + document.getElementById("n2").innerHTML;
	document.getElementById("result").className = "";
	if(document.getElementById("n2").innerText.length < 1 || parseFloat(document.getElementById("n2").innerText)==0) {
		document.getElementById("result").innerHTML = "Division by zero!";
		document.getElementById("result").className = "error";
	}
	else if(document.getElementById("n1").innerText.length < 1 || parseFloat(document.getElementById("n1").innerText)==0 || (document.getElementById("n1").children.length > 0 && document.getElementById("n1").childNodes.length < 2))
		document.getElementById("result").innerHTML = 0;
	else {
		if(document.getElementById("n1").children.length < 1 || document.getElementById("n1").children[0].innerText.length < 1)
			var r = 0;
		else
			var r = document.getElementById("n1").children[0].innerText;
		document.getElementsByTagName("button")[0].className = "computing";
		window.setTimeout(function() {
			document.getElementById("result").innerHTML = advdiv(parseFloat(document.getElementById("n1").childNodes[0].data), parseFloat(document.getElementById("n2").innerText), r, "<em>", "</em>");
			while(true) {
				if(document.getElementById("result").innerHTML.length > 0) {
					document.getElementsByTagName("button")[0].className = "";
					break;
				};
			};
		}, 100);
	};
};
window.onresize = function(event) {
	var span = document.createElement("span");
	span.style.fontFamily = "'Roboto Mono', monospace";
	span.style.fontSize = "200%";
	span.style.opacity = "0";
	while(span.innerHTML.length < 1000) {
		span.innerHTML+= "0";
	};
	document.body.appendChild(span);
	window.monospaceWidth = span.offsetWidth / 1000;
	span.remove();
	if(document.getElementsByClassName("focus").length > 0)
		showCaret();
};
document.body.onload = function(event) {
	window.onkeydown = keydown;
	document.getElementsByTagName("span")[0].onclick = click;
	document.getElementsByTagName("span")[1].onclick = click;
	document.body.onclick = click;
	var i = 0;
	var numpadkeys = document.getElementsByClassName("numpadkey");
	while(i < numpadkeys.length) {
		numpadkeys[i].onmousedown = mousedown;
		i++;
	};
	window.onresize();
};
