var script = [
  "Hello welcome to Google maps, copyright 2018! Feel free to click and drag your cursor to move your virtual self. We will be touring some places today. These places are The Cloud.",
  "The Cloud is an interesting thing. The cloud is an aggregate of many smaller clouds. The Cloud is also a product of something called abstraction.",
  "As engineers may tell you, abstraction is the act of purposely forgetting information that is irrelevant to what's at hand.",
  "It is a useful way to direct focus onto only what is considered most important.",
  "But what is considered most important? And what is considered unimportant enough to purposefully forget?",
  "While many people are told to believe that clouds are simply as light as the air itself, they are actually quite heavy, and occupy a lot of space. Just look at this big cloud here!",
  "This is often considered to be a flaw. It is an inevitable failure of abstraction. As much as some would like. abstraction cannot make the physical vanish.",
  "Most clouds these days are actually made of smog. Fortunately, a cloud made of smog can easily be passed off as the normal kind. Everybody feels better about it that way",
  "It is funny how well clouds blend into the landscape. They rarely look out of place at all. You have likely driven by clouds hundreds of times without even knowing.",
  "Many believe that nobody can own a cloud, but in fact clouds are becoming increasingly territorialized. They are well hidden, and highly guarded, they emerge in the cracks and fissures between jurisdictions.",
  "Here we can see a tree that’s actually part of a cloud, hiding right in plain sight. Wow. Incredible. Why would we disguise part of a cloud as a tree?",
  "People need clouds now. They have been around long enough that we cannot imagine life without them.",
  "Once people need and use something for long enough, they take it for granted and don’t ever think about it anymore.",
  "And when they stop thinking about it. it tends to dissolve right into the air itself. They may live it and breathe it in every single day, but for all intents and purposes, it becomes invisible and disappears.",
  "Or in other words, it becomes a cloud.",
  "Thank you for using Google Maps, copyright 2018! Have a nice day.",
];

function ZoomIn(map, max, cnt) {
  if (cnt >= max) {
    return;
  } else {
    z = google.maps.event.addListener(map, "zoom_changed", function (event) {
      google.maps.event.removeListener(z);
      ZoomIn(map, max, cnt + 1);
    });
    setTimeout(function () {
      map.setZoom(cnt);
    }, 400);
  }
}

function ZoomOut(map, max, cnt) {
  if (cnt <= max) {
    return;
  } else {
    z = google.maps.event.addListener(map, "zoom_changed", function (event) {
      google.maps.event.removeListener(z);
      ZoomOut(map, max, cnt - 1);
    });
    setTimeout(function () {
      map.setZoom(cnt);
    }, 400);
  }
}

function moveMapLocation(map, latitude, longitude) {
  map.setCenter({ lat: latitude, lng: longitude });
}

function setNewStreetView(pano, ltd, lngtd, hdng, ptch) {
  var location = { lat: ltd, lng: lngtd };
  pano.setPosition(location);
  pano.setPov({
    heading: hdng,
    pitch: ptch,
  });
}

function switchScreens(state) {
  if (state == 1) {
    document.getElementById("map").style.zIndex = "-1";
    document.getElementById("pano").style.zIndex = "0";
  } else if (state == 0) {
    document.getElementById("map").style.zIndex = "-1";
    document.getElementById("pano").style.zIndex = "-2";
  }
}

function initialize() {
  var start = { lat: 36.2425217, lng: -95.3310985 }; //first location
  var map = new google.maps.Map(document.getElementById("map"), {
    center: start,
    zoom: 4,
    mapTypeId: "satellite",
    disableDefaultUI: true,
  });

  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: start,
      pov: {
        heading: 140,
        pitch: 7,
      },
    }
  );
  map.setStreetView(panorama);
  runTimedSequence(map, panorama);
}

function loadScreenBegin() {
  // switchScreens(0);
  $("body").css("background-color", "black");
}

function loadScreenEnd() {
  $("p").remove();
  $("button").remove();
  $("body").css("background-color", "transparent");
  document.getElementById("sound").play();
  setTimeout(function () {
    initialize();
  }, 1500);
}

function change() {
  document.getElementById("load").innerHTML =
    "THIS WEBSITE DOES NOT WORK ON MOBILE.<br> WORKS BEST WITH STRONG INTERNET CONNECTION.<br>ONLY WORKS ON CHROME AND FIREFOX.<br> TURN VOLUME UP.<br> CLICK THE BUTTON TO CONTINUE.";
  document.getElementById("load").style =
    "margin-left:0%;text-align:center;font-size:100%;";
  $("button").show();
}
//function startAudioPlayback(){
//  unimplemented
//}

function intro() {
  // window.onbeforeunload = function(e){e.preventDefault();return 'please dont leave';};
  $("button").hide();
  loadScreenBegin();
  setTimeout(function () {
    change();
  }, 3000);
}

function runTimedSequence(map, pano) {
  //    ({action()},time from start)

  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 3000);
  setTimeout(function () {
    switchScreens(1);
  }, 10500); //    zoom from 4 to 24 takes abt 7500 ms
  // setTimeout(function(){responsiveVoice.speak(script[0],"US English Female", {rate:0.95});},10500);
  // setTimeout(function(){responsiveVoice.speak(script[1],"UK English Female", {rate:0.95});},25000);

  setTimeout(function () {
    switchScreens(0);
  }, 32500); //    stay in a place for 22000 ms
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 31000);
  setTimeout(function () {
    setNewStreetView(pano, 39.0296863, -77.4573608, 280, 15, 1);
  }, 35000);
  // setTimeout(function(){responsiveVoice.speak(script[2],"US English Female", {rate:0.95});},37000);
  setTimeout(function () {
    moveMapLocation(map, 39.0296863, -77.4573608);
  }, 40000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 41000);
  setTimeout(function () {
    switchScreens(1);
  }, 48500);
  // setTimeout(function(){responsiveVoice.speak(script[3],"UK English Female", {rate:0.95});},50000);
  // setTimeout(function(){responsiveVoice.speak(script[4],"US English Female", {rate:0.95});},58000);

  setTimeout(function () {
    switchScreens(0);
  }, 65000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 63500);
  setTimeout(function () {
    setNewStreetView(pano, 35.8987921, -81.5461029, 290, 5);
  }, 68000);
  setTimeout(function () {
    moveMapLocation(map, 35.8987921, -81.5461029);
  }, 71000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 72000);
  // setTimeout(function(){responsiveVoice.speak(script[5],"UK English Female", {rate:0.95});},70500);
  setTimeout(function () {
    switchScreens(1);
  }, 79500);
  // setTimeout(function(){responsiveVoice.speak(script[6],"US English Female", {rate:0.95});},87500);

  setTimeout(function () {
    switchScreens(0);
  }, 90000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 88500);
  setTimeout(function () {
    setNewStreetView(pano, 45.6303935, -121.1998433, 335.67, 10);
  }, 93000);
  setTimeout(function () {
    moveMapLocation(map, 45.6303935, -121.1998433);
  }, 96000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 97000);
  // setTimeout(function(){responsiveVoice.speak(script[7],"US English Female", {rate:0.95});},104000);
  setTimeout(function () {
    switchScreens(1);
  }, 104500);

  setTimeout(function () {
    switchScreens(0);
  }, 117000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 115500);
  setTimeout(function () {
    setNewStreetView(pano, 45.839722, -119.657194, 58.58, 10);
  }, 120000);
  setTimeout(function () {
    moveMapLocation(map, 45.839722, -119.657194);
  }, 123000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 124000);
  // setTimeout(function(){responsiveVoice.speak(script[8],"UK English Female", {rate:0.95});},131000);
  setTimeout(function () {
    switchScreens(1);
  }, 131500);

  setTimeout(function () {
    switchScreens(0);
  }, 143000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 141000);
  setTimeout(function () {
    setNewStreetView(pano, 50.4726595, 3.8671352, 200, 5);
  }, 146000);
  setTimeout(function () {
    moveMapLocation(map, 50.4726595, 3.8671352);
  }, 149000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 150000);
  // setTimeout(function(){responsiveVoice.speak(script[9],"UK English Female", {rate:0.95});},155500);
  setTimeout(function () {
    switchScreens(1);
  }, 157500);

  setTimeout(function () {
    switchScreens(0);
  }, 172000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 170000);
  setTimeout(function () {
    setNewStreetView(pano, 33.8773712, -84.4122695, 256, 20);
  }, 175000);
  setTimeout(function () {
    moveMapLocation(map, 33.8773712, -84.4122695);
  }, 178000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 179000);
  setTimeout(function () {
    switchScreens(1);
  }, 187500);
  // setTimeout(function(){responsiveVoice.speak(script[10],"US English Female", {rate:0.95});},187750);

  setTimeout(function () {
    switchScreens(0);
  }, 202000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 200000);
  setTimeout(function () {
    setNewStreetView(pano, 25.9731318, -80.194207, 140, 22);
  }, 205000);
  setTimeout(function () {
    moveMapLocation(map, 25.9731318, -80.194207);
  }, 208000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 209000);
  // setTimeout(function(){responsiveVoice.speak(script[11],"UK English Female", {rate:0.95});},212000);
  setTimeout(function () {
    switchScreens(1);
  }, 216500);
  // setTimeout(function(){responsiveVoice.speak(script[12],"US English Female", {rate:0.95});},221000);
  // setTimeout(function(){responsiveVoice.speak(script[13],"UK English Female", {rate:0.95});},228000);

  setTimeout(function () {
    switchScreens(0);
  }, 228000);
  setTimeout(function () {
    ZoomOut(map, 3, map.getZoom());
  }, 226000);
  setTimeout(function () {
    setNewStreetView(pano, 37.4229465, -122.0649955, 300, 12);
  }, 231000);
  setTimeout(function () {
    moveMapLocation(map, 37.4229465, -122.0649955);
  }, 234000);
  setTimeout(function () {
    ZoomIn(map, 24, map.getZoom());
  }, 235000);
  // setTimeout(function(){responsiveVoice.speak(script[14],"US English Female", {rate:0.95});},243000);
  setTimeout(function () {
    switchScreens(1);
  }, 243000);
  // setTimeout(function(){responsiveVoice.speak(script[15],"UK English Female", {rate:0.95});},248000);

  setTimeout(function () {
    location.reload(true);
  }, 288000);
}
