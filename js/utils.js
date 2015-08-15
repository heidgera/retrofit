function position(elem){
	var offset = {x:0,y:0};
	while (elem)
	{
		offset.x += elem.offsetLeft;
		offset.y += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return offset;
}

var $ = function( id ) { 

	switch(id.charAt(0)){
		case '#':
			return document.getElementById( id.substr(1) );
			break;
		case '.':
			return document.getElementsByClassName( id.substr(1) );
			break;
		case '$': 
			return document.getElementsByTagName( id.substr(1) );
			break;
		default:
			return document.getElementById( id );
			break;
	}

};

function scaleImageByHeight(img,h){
	var nH = img.naturalHeight;
	img.height = h;
	img.width = img.naturalWidth*(img.height)/nH;
}

function sign(x) {
    return (x > 0) - (x < 0);
}

function constrain(num, a, b){
	return num = Math.min(Math.max(num, a), b);
}

function degToRad(d) {
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}

function extractNumber(value)
{
    var n = parseInt(value);
	
    return n == null || isNaN(n) ? 0 : n;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

/////////////////////////////////////////////////
//		CSS Animations

function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + " {" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

// search the CSSOM for a specific -webkit-keyframe rule
function findKeyframesRule(rule)
    {
        // gather all stylesheets into an array
        var ss = document.styleSheets;
        
        // loop through the stylesheets
        for (var i = 0; i < ss.length; ++i) {
            
            // loop through all the rules
            for (var j = 0; j < ss[i].cssRules.length; ++j) {
                
                // find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
                if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
                    return ss[i].cssRules[j];
            }
        }
        
        // rule not found
        addCSSRule(ss[0],"@-webkit-keyframes "+rule,"0% {} 100% {}",ss[0].cssRules.length);
        return ss[0].cssRules[ss[0].cssRules.length-1];
    }

// remove old keyframes and add new ones
/*function change(anim)
    {
        // find our -webkit-keyframe rule
        var keyframes = findKeyframesRule(anim);
        
        // remove the existing 0% and 100% rules
        keyframes.deleteRule("0%");
        keyframes.deleteRule("100%");
        
        // create new 0% and 100% rules with random numbers
        keyframes.insertRule("0% { -webkit-transform: rotate("+randomFromTo(-360,360)+"deg); }");
        keyframes.insertRule("100% { -webkit-transform: rotate("+randomFromTo(-360,360)+"deg); }");
        
        // assign the animation to our element (which will cause the animation to run)
        document.getElementById('box').style.webkitAnimationName = anim;
    }

// begin the new animation process
function startChange()
    {
        // remove the old animation from our object
        document.getElementById('box').style.webkitAnimationName = "none";
        
        // call the change method, which will update the keyframe animation
        setTimeout(function(){change("rotate");}, 0);
    }*/
    
function anim(id,firstRule,secondRule,time){
	document.getElementById(id).style.webkitAnimationName = "none";
	setTimeout(function(){
		var keyframes = findKeyframesRule(id);
	
		if(keyframes.cssRules.length) console.log(keyframes.cssRules[0]);
		
		// remove the existing 0% and 100% rules
		keyframes.deleteRule("0%");
		keyframes.deleteRule("100%");
	
		if(keyframes.cssRules.length) console.log(keyframes.cssRules[0]);
	
		// create new 0% and 100% rules with random numbers
		keyframes.insertRule("0% { "+firstRule+" }");
		keyframes.insertRule("100% { "+secondRule+" }");
	
		// assign the animation to our element (which will cause the animation to run)
		$(id).style.webkitAnimationDuration=time+"s";
		$(id).style.webkitAnimationIterationCount="1";
		$(id).style.webkitAnimationFillMode="forwards";
		$(id).style.webkitAnimationName = id;
	},0);
}
