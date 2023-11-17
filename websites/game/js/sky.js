// Define the size of the player, canvas dimensions, player position, and image variable.
var gridSize = 50; // Size of the player
var canvasWidth, canvasHeight; // Width and height of the canvas
var playerX, playerY; // Position of the player
var cloudOne, cloudTwo, cloudThree; // Image variable for the player
var arrowKeys;
var numclouds = 40;
var score;
var firstKeyPress = true;

var floppys = [];

// Array to store cloud positions.
var clouds = [];

var moveInterval = setInterval(moveClouds, 1500);

class cloud {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }

  display() {
    image(this.img, this.x, this.y, gridSize, gridSize);
  }

  move() {
    let newX = this.x - gridSize;

    if (this.y != playerY || newX != playerX) {
      this.x = newX;
    }

    if (this.x < 0) {
      this.x = (width / gridSize - 2) * gridSize;
      this.y = floor(random(canvasHeight / gridSize)) * gridSize;
    }
  }
}

class floppy {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }

  display() {
    image(this.img, this.x, this.y, gridSize, gridSize);
  }

  displayBig() {
    image(this.img, this.x, this.y, gridSize * 2, gridSize * 2);
  }

  place() {
    this.x = -1;
    while (this.x < 0) {
      this.x = floor(random(canvasWidth / gridSize) - 1) * gridSize;
      this.y = floor(random(canvasHeight / gridSize)) * gridSize;
    }
  }
}

function setup() {
  // Load the image and set up the canvas.
  cloudOne = loadImage("media/cloud-alt.png");
  arrowKeys = loadImage("media/arrow-keys.png");
  flopper = loadImage("media/FLOPPY.gif");
  canvasWidth = gridSize * 18; // Make the canvas width a multiple of gridSize
  canvasHeight = gridSize * 10; // Make the canvas height a multiple of gridSize

  createCanvas(canvasWidth, canvasHeight);

  playerX = 0;
  playerY = 0;

  colorMode(HSB);

  // Generate random cloud positions and add them to the array.
  for (var i = 0; i < numclouds; i++) {
    var cloudX = -1;

    //prevents the placement of clouds off the left edge
    while (cloudX < 0) {
      cloudX = floor(random(canvasWidth / gridSize) - 1) * gridSize;
    }
    var cloudY = floor(random(canvasHeight / gridSize)) * gridSize;

    clouds.push(new cloud(cloudX, cloudY, cloudOne));
  }

  floppys[0] = new floppy(0, 0, flopper);
  floppys[0].place();

  score = canvasHeight / gridSize;
}

function draw() {
  // Draw the background.
  background(200, 80, 80);

  if (!isGameOver()) {
    //draw the main floppy
    floppys[0].display();

    // Draw clouds.
    for (var i = 0; i < clouds.length; i++) {
      clouds[i].display();
    }

    // Draw the player.
    displayPlayer();

    //draw sidebar
    drawSidebar();

    //display sidebarfloppys
    for (var i = 1; i < floppys.length; i++) {
      floppys[i].display();
    }

    //check if you got the floppy
    checkIfFloppyCollected();
  } else {
    endSequence();
  }
}

function keyPressed() {
  firstKeyPress = false;
  var newX = playerX;
  var newY = playerY;

  // Move the player based on arrow key input.
  if (keyCode === LEFT_ARROW) {
    newX -= gridSize;
  } else if (keyCode === RIGHT_ARROW) {
    newX += gridSize;
  } else if (keyCode === UP_ARROW) {
    newY -= gridSize;
  } else if (keyCode === DOWN_ARROW) {
    newY += gridSize;
  }

  // Check for collisions with clouds.
  var canMove = true;
  for (var i = 0; i < clouds.length; i++) {
    if (
      pointInSquare(
        newX + gridSize / 2,
        newY + gridSize / 2,
        clouds[i].x,
        clouds[i].y,
        gridSize
      ) ||
      newX < 0 ||
      newX > (width / gridSize - 2) * gridSize ||
      newY < 0 ||
      newY > (height / gridSize - 1) * gridSize
    ) {
      canMove = false;
      break;
    }
  }

  // Update player position if there's no collision.
  if (canMove) {
    playerX = newX;
    playerY = newY;
  }
}

function pointInSquare(x, y, sX, sY, sZ) {
  if (x >= sX && x <= sX + sZ && y >= sY && y <= sY + sZ) {
    return true;
  } else {
    return false;
  }
}

function moveClouds() {
  for (var i = 0; i < clouds.length; i++) {
    // let rV = random(10);
    // if (rV > 5) {
    clouds[i].move();
    // }
  }
}

function drawSidebar() {
  //draw sidebar
  fill(0, 0, 100, 0.4);
  noStroke();
  rect(width - gridSize, 0, gridSize, height);
}

function displayPlayer() {
  if (!firstKeyPress) {
    image(cloudOne, playerX, playerY, gridSize, gridSize);
  } else {
    image(arrowKeys, playerX, playerY, gridSize, gridSize);
  }
}

function displayPlayerBig() {
  image(cloudOne, playerX, playerY, gridSize * 2, gridSize * 2);
}

function checkIfFloppyCollected() {
  if (dist(playerX, playerY, floppys[0].x, floppys[0].y) == 0) {
    score -= 1;
    floppys[0].place();
    floppys.push(new floppy(width - gridSize, score * gridSize, flopper));
    floppys[canvasHeight / gridSize - score].display();
  }
}

function isGameOver() {
  if (score == 0) {
    return true;
  } else {
    return false;
  }
}

function endSequence() {
  clearInterval(moveInterval);

  for (var i = 0; i < clouds.length; clouds++) {
    clouds[i].x = -gridSize;
    clouds[i].y = -gridSize;
    clouds[i].display();
  }
  floppys[0].x = width / 2 - gridSize;
  floppys[0].y = height / 2 - gridSize;
  floppys[0].displayBig();
  displayPlayerBig();
}
