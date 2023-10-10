//BRIAN BARTZ 2023

$(document).ready(function () {
  //first set all texts to display = none
  $(".closebtn").css("display", "none");
  var allText = document.getElementsByClassName("txt");
  for (var i = 0; i < allText.length; i++) {
    allText[i].style.display = "none";
  }
  if ($(window).width() > 773) {
    $(window).scroll(function () {
      //this top section dynamically changes the sidebar text to match
      //the corresponding project for the images most predominant in the viewport

      //first set all texts to display = none
      var allText = document.getElementsByClassName("txt");
      for (var i = 0; i < allText.length; i++) {
        allText[i].style.display = "none";
      }
      $(".closebtn").css("display", "none");

      var allImages = document.getElementsByClassName("img"); //array of all image divs in HTML
      var viewportImagesIndex = []; //array of indices referring to the current images in viewport in allImages
      var classes = []; //array of the classes of images in the viewport (essentially which project they belong to)
      var winner = ""; //the class name of the project with the most images present in viewport

      //checks which images are in viewport and stores their indices in viewportImagesIndex
      for (var i = 0; i < allImages.length; i++) {
        inViewport = elementInViewport(allImages[i], 1);
        if (inViewport) {
          viewportImagesIndex.push(i);
        }
      }

      //iterates through the divs of images in viewport and determines what class (project) they belong to, storing that info classes
      for (var i = 0; i < viewportImagesIndex.length; i++) {
        var classList = allImages[viewportImagesIndex[i]].className.split(" ");
        for (var x = 0; x < classList.length; x++) {
          if (
            classList[x] != "img" &&
            classList[x] != "large" &&
            classList[x] != "portrait"
          ) {
            classes.push(classList[x]);
          }
        }
      }

      //determines which class is predominantly present in the viewport based on the contents of classes
      winner = mode(classes);
      winner += "_txt";

      var displayText = document.getElementById(winner);
      displayText.style.display = "block";
    }); //end interval
  } else {
    //end screenwidth

    //set all text to display = none when mobile layout/scripts load
    var allText = document.getElementsByClassName("txt");
    for (var i = 0; i < allText.length; i++) {
      allText[i].style.display = "none";
    }
    //display the intro text on load
    $("#mobile_intro_txt").css("display", "inline-block");
    $(".closebtn").css("display", "block");

    //shrinks the title font to fit the screen and not wrap on mobile
    // setInterval(function () {
    //   if ($("#title").height() > 25) {
    //     var fontSize = parseInt($("#title").css("font-size"));
    //     fontSize = fontSize - 3.5 + "px";

    //     $("#title").css("font-size", fontSize);
    //   }
    // }, 100);
    //end interval

    //handler functions for clicking on images when sized for mobile
    $(".img").click(function () {
      var allText = document.getElementsByClassName("txt");
      for (var i = 0; i < allText.length; i++) {
        allText[i].style.display = "none";
      }

      var getClass = "#" + $(this).attr("class").split(" ")[0] + "_txt";

      $(getClass).css("display", "inline-block");
      $(".closebtn").css("display", "block");
    });

    $(".closebtn").click(function () {
      var allText = document.getElementsByClassName("txt");
      for (var i = 0; i < allText.length; i++) {
        allText[i].style.display = "none";
      }

      $(".closebtn").css("display", "none");
    });
  } // end else

  //dynamically resize iframes when too small
  setTimeout(function () {
    if ($("iframe").height() < 200) {
      var newheight = $("#height-reference").height();
      console.log(newheight);
      $("iframe").height(newheight - 80);
    }
  }, 1000);
}); //end docReady

//takes a HTML element and returns 1 if its in the viewport and 0 if it isnt
function elementInViewport(el, percentVisible) {
  let rect = el.getBoundingClientRect(),
    windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
      percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
      percentVisible
  );
}

//returns the mode (most frequently occuring entry) of an array
function mode(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
}
