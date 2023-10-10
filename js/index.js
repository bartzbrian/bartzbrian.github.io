$(document).ready(function(){
	jsPlumb.ready(function() {  
	
	var ray = ["a","b","c","d"]
    var points = ["a","a","a","b","c","c","d","d","e","f","g","h","i","j","k","l","m","n","o","p"]

	//coin toss to determine which of the two page styles will load
	var styleSelector = Math.round(Math.random());

	//two different color scheme options
	var colorSchemes = [
	["#e6e6e6","#61c2ff","#47a3ff","#b8d2ff","#7dadff","#9cc0ff"],
	["#121212","#2fff00","#bdff59","#0fff23","#48f72d","#036309"]
	];

	main();
	
	function main(){

		//set background
		document.body.style.backgroundColor = colorSchemes[styleSelector][0];

		//set correct gif
		setImage();

		//set button colors
		changeButtonColor();

		//randomize button locations
		randomizeLocations();
				

		//creates connections btwn points
        for (var i = 0; i < points.length; i++) {

        	//randomize connection endpoints
        	var src = points[i];
        	var tgt = ray[Math.floor((Math.random() * 3) + 1)];

        	//eliminates self connections
        	while (src==tgt) {
        		tgt = ray[Math.floor((Math.random() * 3) + 1)];
        	}

        	//instantiate actuale jsplumb connectors
            jsPlumb.connect({
                source: src,
                target: tgt
            }, randomizeConnectorStyle());//return randomized connector color
        
        }; // end for

        //manually connect img to name
        jsPlumb.connect({
        	source: "d",
        	target: "p"
        }, randomizeConnectorStyle());
							
	} //end main

	//returns connector type based on randomized page style
	function bezierOrFlowchart() {
		if (styleSelector == 0){
			return "Bezier";
		} else {
			return "Flowchart"
		}
	}//end bezierOrFlowchart

	function setImage() {
		if (styleSelector == 0){
			//cloud
			document.getElementById("gif").src="./media/index/cloud.gif";
			$("#footer_paragraph").css("color","#bababa");
		} else {
			document.getElementById("gif").src="./media/index/crystal.gif";
			$("#footer_paragraph").css("color","#3d3d3d");
		}
	}//end setImage

	//returns connector with correct style and randomized color from correct scheme
	function randomizeConnectorStyle() {	
		var Connector = {
			connector:[bezierOrFlowchart(), {cornerRadius:6}],
			paintStyle:{lineWidth:2,strokeStyle:(colorSchemes[styleSelector][Math.floor((Math.random() * colorSchemes[styleSelector].length)+1)])},
			endpoint:"Blank",
			anchor:"Continuous", 
		};
		return Connector
	} // end randomizeConnectorStyle

	//changes button color to match background and outlines + font to be opposite
	function changeButtonColor() {
		var cols = document.getElementsByClassName('window');
		for(i = 0; i < cols.length; i++) {
			cols[i].style.backgroundColor = colorSchemes[styleSelector][0];
			if (styleSelector==0){
				cols[i].style.border = "2px solid " + colorSchemes[0][2];
				cols[i].style.color = colorSchemes[0][2];
			} else {
				cols[i].style.border = "2px solid " + colorSchemes[1][Math.floor((Math.random() * colorSchemes[styleSelector].length)+1)];
			}
		}
	}//end changeButtonColor

	//randomize locations of on screen buttons (within certain bounds and depending on whether screen is mobile)
	function randomizeLocations(){

        	if ($(window).width() > 800 ){ //if not on mobile
				$('#a').css("left", Math.floor((Math.random() * 35) + 55)+"%");
				$('#a').css("top", Math.floor((Math.random() * 30) + 5)+"%");

				$('#b').css("left", Math.floor((Math.random() * 30) + 25)+"%");
				$('#b').css("top", Math.floor((Math.random() * 40) + 50)+"%");

				$('#c').css("left", Math.floor((Math.random() * 20) + 65)+"%");
				$('#c').css("top", Math.floor((Math.random() * 50) + 40)+"%");

				$('#d').css("left", Math.floor((Math.random() * 30) + 4)+"%");
				$('#d').css("top", Math.floor((Math.random() * 35) + 4)+"%");
            	jsPlumb.draggable($(".window"));

            } else { //if on a mobile device (less random layout)
				$('#a').css("left", Math.floor((Math.random() * 40) + 22.5)+"%");
				$('#a').css("top", "80%");
				$('#b').css("left", Math.floor((Math.random() * 15) + 10)+"%");
				$('#b').css("top", "35%");
				$('#c').css("left", Math.floor((Math.random() * 15) + 10)+"%");
				$('#c').css("top", "57.5%");
				$('#d').css("left", Math.floor((Math.random() * 15) + 10)+"%");
				$('#d').css("top", "12.5%");
				$('#p').remove();

            }
	
		} // end randomizeLocations
			
	});	// end jsplumb callback	

}); // end document ready callback