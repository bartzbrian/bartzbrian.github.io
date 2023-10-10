function hamburger() {
  var x = document.getElementById("myLinks");
  var y = document.getElementById("nav-bar");
  var z = document.getElementById("description");
  if (x.style.display === "flex") {
    x.style.opacity = "0";

    z.style.display = "block";
    setTimeout(function () {
      x.style.display = "none";
      y.style.height = "64px";
    }, 250);
  } else {
    setTimeout(function () {
      x.style.opacity = "1";
    }, 250);
    x.style.display = "flex";
    x.style.flexDirection = "column";
    y.style.height = "256px";
    z.style.display = "none";
  }
}
