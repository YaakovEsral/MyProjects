/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! namespace exports */
/*! export startAnimation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startAnimation": () => /* binding */ startAnimation
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _levels_json5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./levels.json5 */ "./src/levels.json5");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




function get(id) {
  return document.getElementById(id);
}

function show(elem) {
  elem.classList.remove('hidden');
}

function hide(elem) {
  elem.classList.add('hidden');
}

var buttonDiv = get('buttonDiv');
var howToPlayOverlay = get('howToPlayOverlay');
var aboutOverlay = get('aboutOverlay');
var developerOverlay = get('developerOverlay');
var canvas = get('canvas');
var c = canvas.getContext('2d');
var height = canvas.height;
var width = canvas.width;
var bgImg = new Image();
bgImg.src = './images/mainBg.png';
var avatarImg = new Image();
avatarImg.src = './images/mainAvatar.png';
avatarImg.width = _game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 8;
avatarImg.height = _game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 12;
console.log(_game__WEBPACK_IMPORTED_MODULE_0__.UNIT, 'unit');
(0,_game__WEBPACK_IMPORTED_MODULE_0__.setLevelIndex)(0);
var animationOn = false;
var animationId;

function animate() {
  if (animationOn) {
    repaint();
    animationId = requestAnimationFrame(animate);
  }
} // console.log(canvas.height, 'height');


function repaint() {
  c.drawImage(bgImg, 0, 0, canvas.width, canvas.height); //draw the bubbles

  circles.forEach(function (circle) {
    return circle.update();
  });
  c.fillStyle = 'rgba(0, 0, 109, 0.7)';
  c.fillRect(_game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 2, _game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 3.2, canvas.width - _game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 4, _game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 5);
  c.fillStyle = '#fff705';
  c.font = "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 4, "px Luckiest Guy");
  c.textAlign = 'center';
  c.textBaseline = 'alphabetic'; // console.log(c);

  c.fillText('Bubble Trouble', canvas.width / 2, canvas.height * 0.3);
  c.drawImage(avatarImg, canvas.width - avatarImg.width * 1.3, canvas.height - avatarImg.height * 1.1, avatarImg.width, avatarImg.height);
}

get('startGameBtn').addEventListener('click', function () {
  hide(buttonDiv);
  animationOn = false;
  cancelAnimationFrame(animationId);
  (0,_game__WEBPACK_IMPORTED_MODULE_0__.startNewGame)();
});
get('howToPlayBtn').addEventListener('click', function () {
  return show(howToPlayOverlay);
});
get('aboutBtn').addEventListener('click', function () {
  return show(aboutOverlay);
});
get('devBtn').addEventListener('click', function () {
  return show(developerOverlay);
}); //variables for largest possible circle radius, fastest possible speed and circles array

var largestRadius = _game__WEBPACK_IMPORTED_MODULE_0__.UNIT * 2.7;
var fastestSpeed = _game__WEBPACK_IMPORTED_MODULE_0__.UNIT / 3.375;
var circles = [];

var Circle = /*#__PURE__*/function () {
  function Circle(x, y, radius, color, incrementX, incrementY) {
    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.incrementX = incrementX;
    this.incrementY = incrementY;
  } //check for a collision before redrawing the circle


  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      this.checkCollision();
      this.x += this.incrementX;
      this.y += this.incrementY;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    } //check for collision with one of the walls. x and y coordinates are the circle's center
    //so there is a need to add or subtract the radius

  }, {
    key: "checkCollision",
    value: function checkCollision() {
      if (this.x + this.radius >= width || this.x - this.radius <= 0) {
        this.incrementX = -this.incrementX;
      }

      if (this.y + this.radius >= height || this.y - this.radius <= 0) {
        this.incrementY = -this.incrementY;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Circle;
}(); //get a random starting point for the center of the circle.
//the calculation is to ensure that the starting center point of the ball will never be too close to
//the edge, which would prevent the ball from leaving that position. "too close" means within a distance
//of the "largestRadius", which is the largest possible radius of any ball.


function randomPoint(range) {
  return Math.floor(Math.random() * (range - largestRadius * 2) + largestRadius);
}

function randomRadius() {
  return Math.floor(Math.random() * (largestRadius - 25)) + 25;
} //random color generator. we are using opacity here. current calculation ensures that opacity should 
//never be lower than 0.5


function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var op = Math.random() * 0.5 + 0.5;
  return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(op, ")");
} //controls the speed and starting direction. 


function randomIncrementer() {
  var plusMinus = Math.random() < 0.5 ? 1 : -1;
  return plusMinus * (Math.random() * fastestSpeed);
} //function to create new circle and add it to the circle array


function newCircle() {
  var circle = new Circle(randomPoint(width), randomPoint(height), randomRadius(), randomColor(), randomIncrementer(), randomIncrementer());
  circles.push(circle);
}

for (var i = 0; i < 50; i++) {
  newCircle();
}

function startAnimation() {
  animationOn = true;
  show(buttonDiv);
  animate();
}
bgImg.onload = startAnimation(); //control the popup boxes

get('howToPlayExit').addEventListener('click', function () {
  return hide(howToPlayOverlay);
});
get('aboutExit').addEventListener('click', function () {
  return hide(aboutOverlay);
});
get('developerExit').addEventListener('click', function () {
  return hide(developerOverlay);
});

/***/ }),

/***/ "./src/avatar.js":
/*!***********************!*\
  !*** ./src/avatar.js ***!
  \***********************/
/*! namespace exports */
/*! export Avatar [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Avatar": () => /* binding */ Avatar
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import avatarImgSrc from './images/avatar.png';
var avatarImg = new Image(); // avatarImg.src = avatarImgSrc;

avatarImg.src = './images/avatar.png';

var Avatar = /*#__PURE__*/function () {
  function Avatar(field, UNIT) {
    _classCallCheck(this, Avatar);

    // this.canvas = canvas;
    this.field = field;
    this.img = avatarImg;
    this.movePlusMinus = 0;
    this.moveIncrement = UNIT / 10; //6.67; //may want to make him slower eventually

    this.width = UNIT * 2;
    this.height = UNIT * 3;
    this.x = this.field.width / 2 - UNIT;
    this.y = this.field.height - UNIT * 3;

    this.midpoint = function () {
      return this.x + this.width / 2;
    };

    this.hitOffset = UNIT / 3.85;
    this.gotHit = false;
    this.lives = 3;
    this.beam = {
      width: UNIT / 6.83,
      //6 when UNIT = 41
      x: undefined,
      yTop: this.y,
      //refers to the Avatar's y
      yBottom: field.height,
      shooting: false,
      color: '#363a42',
      // color: '#059ee6',
      increment: UNIT / 9 // 10.25
      // , 
      // reset: reset

    };
  }

  _createClass(Avatar, [{
    key: "move",
    value: function move() {
      if (this.x + this.width <= this.field.width && this.movePlusMinus === 1) {
        this.x += this.moveIncrement * this.movePlusMinus;
      } else if (this.x >= 0 && this.movePlusMinus === -1) {
        this.x += this.moveIncrement * this.movePlusMinus;
      } // console.log(avatar.x);

    }
  }, {
    key: "shoot",
    value: function shoot() {
      if (this.beam.shooting) {
        return;
      }

      this.beam.x = this.midpoint(); // console.log('avatar shooting');

      this.beam.shooting = true; // this.beam.reset();
    }
  }, {
    key: "resetBeam",
    value: function resetBeam() {
      this.beam.shooting = false;
      this.beam.yTop = this.y; //Avatar's height

      this.beam.yBottom = this.field.height;
    }
  }]);

  return Avatar;
}(); // function reset() {
//     console.log('reset outside Avatar class');
// }




/***/ }),

/***/ "./src/bubble.js":
/*!***********************!*\
  !*** ./src/bubble.js ***!
  \***********************/
/*! namespace exports */
/*! export Bubble [provided] [no usage info] [missing usage info prevents renaming] */
/*! export bubbleTypes [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bubbleTypes": () => /* binding */ bubbleTypes,
/* harmony export */   "Bubble": () => /* binding */ Bubble
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// vy range is from 5.5 (lowest) to 11- (highest) when UNIT is 40~41
var bubbleTypes = [{
  type: 1,
  radiusFactor: 5.5,
  // results in radius of 7.5 when UNIT/radiusFactor and UNIT is 41
  velocityFactor: 7.45 // results in yVelocity of 5.5 when UNIT/velocityFactor and UNIT is 41

}, {
  type: 2,
  radiusFactor: 2.73,
  //15,
  velocityFactor: 6.3 // 6.5

}, {
  type: 3,
  radiusFactor: 1.64,
  //25,
  velocityFactor: 5.5 // 7.5

}, {
  type: 4,
  radiusFactor: 1.17,
  //35,
  velocityFactor: 5.25 // 7.8

}, {
  type: 5,
  radiusFactor: 0.91,
  //45,
  velocityFactor: 5.125 //8

}, {
  type: 6,
  radiusFactor: 0.745,
  //55,
  velocityFactor: 4.71 // 8.7

}, {
  type: 7,
  radiusFactor: 0.63,
  //65,
  velocityFactor: 4.31 //9.5

}];
var Bubble = /*#__PURE__*/function () {
  // static velocityFactor = 7.45; //not allowed with webpack until we get babel set up
  function Bubble(fieldData, obj, UNIT) {
    _classCallCheck(this, Bubble);

    this.field = fieldData.field;
    this.ctx = fieldData.ctx; // this.radius = obj.radius;

    this.type = obj.type;
    this.radius = UNIT / bubbleTypes[this.type - 1].radiusFactor; //offset -1 to get the proper index

    this.x = obj.x || this.radius * 2;
    this.y = obj.y || this.field.height / 2; //enable the user to pass in an offset value to position each bubble

    if (obj.offset && obj.offset.left === true) {
      this.x = obj.offset.val * this.x;
    } else if (obj.offset && !obj.offset.left) {
      this.x = this.field.width - obj.offset.val * this.x;
    }

    this.velocityX = obj.velocityX || UNIT / 20.5; //was 2 with UNIT 41

    this.velocityY = obj.velocityY || 0; //user can choose to start the direction going left

    if (obj.dirLeft) {
      this.velocityX *= -1;
    }

    this.gravity = UNIT / 410; //was 0.1 with UNIT 41

    this.maxBounceYVelocity = UNIT / (obj.maxBounceYVelocity || bubbleTypes[this.type - 1].velocityFactor); //offset -1 to get the proper index
    // this.maxBounceYVelocity = UNIT / 7.45; //was 5.5 with UNIT 41

    this.hitStatus = false;
    this.color = obj.bubbleColor; // this.incrementX = obj.incrementX;
    // this.incrementY = obj.incrementY;
  } //check for a collision before redrawing the bubble


  _createClass(Bubble, [{
    key: "draw",
    value: function draw() {
      this.checkWallCollision();
      this.velocityY += this.gravity;
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    } //check for collision with one of the walls. x and y coordinates are the circle's center
    //so there is a need to add or subtract the radius

  }, {
    key: "checkWallCollision",
    value: function checkWallCollision() {
      //sideways collision
      if (this.x + this.radius >= this.field.width || this.x - this.radius <= 0) {
        this.velocityX = -this.velocityX;
      } //floor collision


      if (this.y + this.radius >= this.field.height) {
        this.velocityY = -this.maxBounceYVelocity;
      }
    }
  }, {
    key: "checkBeamCollision",
    value: function checkBeamCollision(beam) {
      // let hitStatus = false;
      //could be this algo needs work
      if (beam.x > this.x - this.radius && beam.x + beam.width < this.x + this.radius && beam.yTop < this.y + this.radius && beam.yBottom > this.y - this.radius) {
        this.hitStatus = true;
      }

      return this.hitStatus;
    }
  }, {
    key: "checkCeilingCollision",
    value: function checkCeilingCollision() {
      if (this.y - this.radius <= 0) {
        this.hitStatus = true;
      }

      return this.hitStatus;
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Bubble;
}();

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! namespace exports */
/*! export UNIT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setLevelIndex [provided] [no usage info] [missing usage info prevents renaming] */
/*! export startNewGame [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UNIT": () => /* binding */ UNIT,
/* harmony export */   "setLevelIndex": () => /* binding */ setLevelIndex,
/* harmony export */   "startNewGame": () => /* binding */ startNewGame
/* harmony export */ });
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./avatar */ "./src/avatar.js");
/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bubble */ "./src/bubble.js");
/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./level */ "./src/level.js");
/* harmony import */ var _levels_json5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./levels.json5 */ "./src/levels.json5");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app */ "./src/app.js");


 // import { bubbleTypes } from './bubble';





function get(id) {
  return document.getElementById(id);
}
/*
Bugs:
1. Avatar is able to go off the screen if the key event was fired before he was off. - fixed!
2. Game sometimes starts before the avatar is fully loaded (use Promise)
3. ball collision with avatar doesn't work when ball comes from top - fixed!
*/


var canvas = get('canvas');
var c = canvas.getContext('2d'); //height to width should be 4:6

var UNIT = Math.floor(window.innerHeight / 24);
console.log(window.innerHeight, UNIT);
canvas.height = UNIT * 24;
canvas.width = UNIT * 36;
var gameFont = 'Luckiest Guy';
var gameOn = false;
var hud = {
  height: UNIT * 3,
  width: canvas.width,
  img: new Image()
};
hud.img.src = './images/brickBg.png';
var field = {
  height: canvas.height - hud.height,
  width: canvas.width
};
var timerWidth = hud.width - UNIT;
var timerHeight = UNIT * 0.75;
var timeElapsed;
var timeInc;
var timeRunning;
var timeUp;
var avatarHeadImg = new Image();
avatarHeadImg.src = './images/avatarHead.png';
avatarHeadImg.height = avatarHeadImg.width = UNIT * 1.75;
var score;
var scoreFactor = 3; //points per hit = bubbleType * scoreFactor

var timeScoreFactor = 5; //used to calculate points for completing level in time

var ceilingBonusFactor = 2;
var avatar;
var bubbles = [];
var levels = [];

for (var i = 0; i < _levels_json5__WEBPACK_IMPORTED_MODULE_4__.length; i++) {
  levels[i] = new _level__WEBPACK_IMPORTED_MODULE_3__.Level(_levels_json5__WEBPACK_IMPORTED_MODULE_4__[i]);
}

var levelIndex;
function setLevelIndex(i) {
  if (i >= 0 && i < levels.length) {
    levelIndex = i;
  }
}
var animationId;
/*originally used to import all bg images at one time. now we are using CopyPlugin to 
copy all images from original directory 'src/images' into 'dist/images'
*/
//import all level bg images 
// function importAll(r) {
//     return r.keys().map(r);
// }
// const bgImages = importAll(require.context('./images', false, /level/));

function animate() {
  // if (gameOn) { //may want to move this later to the actual loop
  repaint();
  animationId = requestAnimationFrame(animate); // }
} // import bg from './images/level1.png';
// const backgroundImg = new Image();
// backgroundImg.src = bg;
// startNewGame();


function startNewGame() {
  avatar = new _avatar__WEBPACK_IMPORTED_MODULE_1__.Avatar(field, UNIT);
  bubbles = [];
  score = 0;

  if (!levelIndex) {
    levelIndex = 0;
  }

  timeUp = false;
  gameOn = true;
  getNewLevel();
  levels[levelIndex].bgImg.onload = animate(); // animate();
} // console.log(avatarHeadImg);

function repaint() {
  // console.log(animationId, 'anim Id');
  if (gameOn) {
    c.drawImage(levels[levelIndex].bgImg, 0, 0, canvas.width, canvas.height); //drawing the hud

    c.drawImage(hud.img, 0, canvas.height - hud.height, hud.width, hud.height); //time

    updateTime(); //level no.

    c.fillStyle = '#054263';
    c.font = "".concat(UNIT * 1.5, "px ").concat(gameFont);
    c.textAlign = 'center';
    c.textBaseline = 'top';
    c.fillText("Level ".concat(levelIndex + 1), UNIT * 3, field.height + hud.height / 2); //lives

    c.fillStyle = '#054263';
    c.font = "".concat(UNIT * 1.5, "px ").concat(gameFont);
    c.textAlign = 'left';
    c.textBaseline = 'top';
    c.fillText('Lives:', field.width / 3, field.height + hud.height / 2);
    var offset = 0; //offset to space the lives

    for (var _i = 0; _i < avatar.lives; _i++) {
      c.drawImage(avatarHeadImg, field.width / 2 - avatarHeadImg.width + offset, field.height + hud.height / 2 - avatarHeadImg.height / 4, avatarHeadImg.width, avatarHeadImg.height);
      offset += avatarHeadImg.width * 1.25;
    } //score


    updateScore(); //end level if time is out

    if (timerWidth - timeElapsed <= 0) {
      c.fillStyle = 'yellow';
      c.font = "".concat(UNIT * 3, "px ").concat(gameFont);
      c.textAlign = 'center';
      c.fillText('TIME\'S UP!!!', field.width / 2, field.height / 3);
      timeUp = true; // endLevel();

      handleAvatarGettingOut();
    } //end level if a bubble hits the avatar


    for (var _i2 = 0; _i2 < bubbles.length; _i2++) {
      if (bubbles[_i2].x + bubbles[_i2].radius > avatar.x + avatar.hitOffset && bubbles[_i2].x - bubbles[_i2].radius < avatar.x + avatar.width - avatar.hitOffset && bubbles[_i2].y > avatar.y) {
        avatar.gotHit = true;
        handleAvatarGettingOut();
        break;
      }
    } //draw the beam


    if (avatar.beam.shooting) {
      c.strokeStyle = avatar.beam.color;
      c.lineWidth = avatar.beam.width;
      c.beginPath();
      c.moveTo(avatar.beam.x, avatar.beam.yBottom);
      c.lineTo(avatar.beam.x, avatar.beam.yTop -= avatar.beam.increment);
      c.stroke(); //check for beam collision while beam is shooting

      for (var _i3 = 0; _i3 < bubbles.length; _i3++) {
        if (bubbles[_i3].checkBeamCollision(avatar.beam) === true) {
          handleBeamCollision(_i3);
        } else if (bubbles[_i3].checkCeilingCollision() === true) {
          handleCeilingCollision(_i3);
        }
      }
    } //reset the beam once it goes off the screen


    if (avatar.beam.yTop <= 0) {
      avatar.resetBeam();
    } //move the avatar if it is in a moving state


    if (avatar.movePlusMinus !== 0) {
      avatar.move();
    } //draw the avatar


    c.drawImage(avatar.img, avatar.x, avatar.y, avatar.width, avatar.height); //draw the bubbles

    bubbles.forEach(function (bubble) {
      return bubble.update();
    });
  }
}

function getNewLevel() {
  timeInc = UNIT / levels[levelIndex].timeFactor;
  timeElapsed = 0;
  timeRunning = true;
  gameOn = true;
  bubbles = [];
  avatar.gotHit = false;
  timeUp = false;
  levels[levelIndex].bubbles.forEach(function (bubble) {
    bubbles.push(new _bubble__WEBPACK_IMPORTED_MODULE_2__.Bubble({
      field: field,
      ctx: c
    }, bubble, UNIT));
  });
}

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowRight':
      if (avatar.x + avatar.width >= canvas.width || avatar.movePlusMinus !== 0) {
        return;
      }

      avatar.movePlusMinus = 1;
      break;

    case 'ArrowLeft':
      if (avatar.x <= 0 || avatar.movePlusMinus !== 0) {
        return;
      }

      avatar.movePlusMinus = -1;
      break;

    case ' ':
      avatar.shoot();
      break;
  }
});
window.addEventListener('keyup', function (e) {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowLeft':
      avatar.movePlusMinus = 0;
      break;
  }
});

function handleBeamCollision(index) {
  var oldBubble = bubbles[index]; //increment score. may make a function for this later

  score += oldBubble.type * scoreFactor; //remove the bubble and the beam

  bubbles.splice(index, 1);
  avatar.resetBeam();

  if (oldBubble.type > 1) {
    //if it's anything but the smallest type
    //create two new bubbles
    bubbles.push(new _bubble__WEBPACK_IMPORTED_MODULE_2__.Bubble({
      field: field,
      ctx: c
    }, {
      x: oldBubble.x,
      y: oldBubble.y,
      bubbleColor: oldBubble.color,
      velocityX: -Math.abs(oldBubble.velocityX),
      velocityY: -Math.abs(oldBubble.maxBounceYVelocity * 0.7),
      type: oldBubble.type - 1
    }, UNIT));
    bubbles.push(new _bubble__WEBPACK_IMPORTED_MODULE_2__.Bubble({
      field: field,
      ctx: c
    }, {
      x: oldBubble.x,
      y: oldBubble.y,
      bubbleColor: oldBubble.color,
      velocityX: Math.abs(oldBubble.velocityX),
      velocityY: -Math.abs(oldBubble.maxBounceYVelocity * 0.7),
      //-Math.abs(oldBubble.velocityY)
      type: oldBubble.type - 1
    }, UNIT));
  }

  if (!bubbles.length) {
    endLevel();
  }
}

function handleCeilingCollision(index) {
  // console.log('ceiling collision');
  var oldBubble = bubbles[index]; //increment score. may make a function for this later

  score += oldBubble.type;
  score += oldBubble.type * ceilingBonusFactor; //remove the bubble and the beam

  bubbles.splice(index, 1);
  avatar.resetBeam();

  if (!bubbles.length) {
    endLevel();
  }
}

function updateScore() {
  c.fillStyle = '#054263';
  c.font = "".concat(UNIT * 1.5, "px ").concat(gameFont);
  c.textAlign = 'center';
  c.textBaseline = 'top';
  c.fillText("Score: ".concat(score), hud.width - UNIT * 5, field.height + hud.height / 2);
}

function updateTime() {
  c.strokeStyle = 'black';
  c.lineWidth = 1;
  c.strokeRect(UNIT * 0.5, field.height + UNIT * 0.25, timerWidth, timerHeight);
  c.fillStyle = '#e41d1d';
  c.fillRect(UNIT * 0.5, field.height + UNIT * 0.25, timerWidth - timeElapsed, timerHeight);

  if (timeRunning) {
    timeElapsed += timeInc;
  }
}

function endLevel() {
  timeRunning = false;

  if (timeUp || avatar.gotHit) {
    gameOn = false;
    endGame();
    return;
  } // console.log('end level');


  score += Math.floor(timerWidth / timeElapsed * timeScoreFactor);
  avatar.resetBeam();

  if (levelIndex >= levels.length) {
    return;
  }

  setTimeout(function () {
    levelIndex++;
    getNewLevel();
  }, 1000);
}

function handleAvatarGettingOut() {
  avatar.lives--;
  avatar.resetBeam(); // console.log('lives remaining', avatar.lives);

  if (avatar.lives === 0) {
    endLevel();
  } else {
    gameOn = false;
    setTimeout(getNewLevel, 500);
  }
}

function endGame() {
  setTimeout(function () {
    c.fillStyle = 'yellow';
    c.font = "".concat(UNIT * 3, "px ").concat(gameFont);
    c.textAlign = 'center';
    c.fillText('GAME OVER', field.width / 2, field.height / 2);
    cancelAnimationFrame(animationId); // console.log('just canceled', animationId);

    setTimeout(_app__WEBPACK_IMPORTED_MODULE_5__.startAnimation, 2000);
  }, 500);
}

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! namespace exports */
/*! export Level [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Level": () => /* binding */ Level
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function Level(obj) {
  _classCallCheck(this, Level);

  this.bgImg = new Image();
  this.bgImg.src = obj.bgImgSrc;
  this.bubbles = obj.bubbles;
  this.timeFactor = obj.timeFactor;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/style.css ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*{\r\n    font-family: 'Luckiest Guy';\r\n}\r\n\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    text-align: center;\r\n    /* background: yellow; */\r\n    overflow: hidden;\r\n    position: relative;\r\n}\r\n\r\n#container {\r\n    display: inline-block;\r\n    position: relative;\r\n}\r\n\r\ncanvas {\r\n    /* border: 1px solid black; */\r\n    margin: auto;\r\n}\r\n\r\n.btn1 {\r\n    color: #FDFDFD;\r\n    border-radius: 5px;\r\n    width: 185px;\r\n    height: 39px;\r\n    font-size: 18px;\r\n    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);\r\n    /* margin: auto; */\r\n    margin-bottom: 10px;\r\n    cursor: pointer;\r\n    font-weight: bold;\r\n    display: block;\r\n}\r\n\r\n#buttonDiv {\r\n    position: absolute;\r\n    top: 40%;\r\n    left: 0;\r\n    right: 0;\r\n    /* text-align: center; */\r\n    margin: auto;\r\n    max-width: 185px;\r\n    z-index: 1;\r\n}\r\n\r\nbutton {\r\n    letter-spacing: 2px;\r\n}\r\n\r\n#startGameBtn {\r\n    background-color: #4d921b;\r\n}\r\n\r\n#howToPlayBtn{\r\n    background-color: rgb(5, 99, 99);\r\n}\r\n\r\n#aboutBtn{\r\n    background-color: rgb(139, 7, 100);\r\n}\r\n\r\n\r\n.modalOverlay {\r\n    z-index: 100;\r\n    width: 100%;\r\n    height: 100%;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    background-color: rgba(0,0,0,0.4);\r\n}\r\n\r\n.modalContent {\r\n    position: relative;\r\n    top: 22%;\r\n    text-align: center;\r\n    width: 400px;\r\n    height: 240px;\r\n    /* height: 312px; */\r\n    background: #fff705;\r\n    /* background: #FDFDFD; */\r\n    box-shadow: 4px 4px 10px 5px rgba(0, 0, 0, 0.25);\r\n    border-radius: 2px;\r\n    margin: auto;\r\n}\r\n\r\n.exitIcon {\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 15px;\r\n    cursor: pointer;\r\n}\r\n\r\n.modalContent * {\r\n    color: #00006d\r\n}\r\n\r\n.modalContent h1 {\r\n    padding-top: 1em;\r\n}\r\n\r\n.modalContent p {\r\n    padding-top: 20px;\r\n    font-size: 1.3em;\r\n    margin: 0 1em;\r\n}\r\n\r\n#devBtn {\r\n    position: absolute;\r\n    left: 2%;\r\n    top: 3%;\r\n    cursor: pointer;\r\n    transition: .4s opacity;\r\n}\r\n\r\n#devBtn:hover {\r\n    opacity: 1;\r\n}\r\n\r\nul {\r\n    list-style-type: none;\r\n}\r\n\r\n.hidden {\r\n    display: none;\r\n}\r\n\r\n.invisible {\r\n    opacity: 0;\r\n}", "",{"version":3,"sources":["webpack://./src/css/style.css"],"names":[],"mappings":"AAAA;IACI,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,6BAA6B;IAC7B,YAAY;AAChB;;AAEA;IACI,cAAc;IACd,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,eAAe;IACf,2CAA2C;IAC3C,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;IACf,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,OAAO;IACP,QAAQ;IACR,wBAAwB;IACxB,YAAY;IACZ,gBAAgB;IAChB,UAAU;AACd;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,kCAAkC;AACtC;;;AAGA;IACI,YAAY;IACZ,WAAW;IACX,YAAY;IACZ,eAAe;IACf,OAAO;IACP,MAAM;IACN,iCAAiC;AACrC;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,yBAAyB;IACzB,gDAAgD;IAChD,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,WAAW;IACX,eAAe;AACnB;;AAEA;IACI;AACJ;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,aAAa;AACjB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,OAAO;IACP,eAAe;IACf,uBAAuB;AAC3B;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,UAAU;AACd","sourcesContent":["*{\r\n    font-family: 'Luckiest Guy';\r\n}\r\n\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    text-align: center;\r\n    /* background: yellow; */\r\n    overflow: hidden;\r\n    position: relative;\r\n}\r\n\r\n#container {\r\n    display: inline-block;\r\n    position: relative;\r\n}\r\n\r\ncanvas {\r\n    /* border: 1px solid black; */\r\n    margin: auto;\r\n}\r\n\r\n.btn1 {\r\n    color: #FDFDFD;\r\n    border-radius: 5px;\r\n    width: 185px;\r\n    height: 39px;\r\n    font-size: 18px;\r\n    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);\r\n    /* margin: auto; */\r\n    margin-bottom: 10px;\r\n    cursor: pointer;\r\n    font-weight: bold;\r\n    display: block;\r\n}\r\n\r\n#buttonDiv {\r\n    position: absolute;\r\n    top: 40%;\r\n    left: 0;\r\n    right: 0;\r\n    /* text-align: center; */\r\n    margin: auto;\r\n    max-width: 185px;\r\n    z-index: 1;\r\n}\r\n\r\nbutton {\r\n    letter-spacing: 2px;\r\n}\r\n\r\n#startGameBtn {\r\n    background-color: #4d921b;\r\n}\r\n\r\n#howToPlayBtn{\r\n    background-color: rgb(5, 99, 99);\r\n}\r\n\r\n#aboutBtn{\r\n    background-color: rgb(139, 7, 100);\r\n}\r\n\r\n\r\n.modalOverlay {\r\n    z-index: 100;\r\n    width: 100%;\r\n    height: 100%;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    background-color: rgba(0,0,0,0.4);\r\n}\r\n\r\n.modalContent {\r\n    position: relative;\r\n    top: 22%;\r\n    text-align: center;\r\n    width: 400px;\r\n    height: 240px;\r\n    /* height: 312px; */\r\n    background: #fff705;\r\n    /* background: #FDFDFD; */\r\n    box-shadow: 4px 4px 10px 5px rgba(0, 0, 0, 0.25);\r\n    border-radius: 2px;\r\n    margin: auto;\r\n}\r\n\r\n.exitIcon {\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 15px;\r\n    cursor: pointer;\r\n}\r\n\r\n.modalContent * {\r\n    color: #00006d\r\n}\r\n\r\n.modalContent h1 {\r\n    padding-top: 1em;\r\n}\r\n\r\n.modalContent p {\r\n    padding-top: 20px;\r\n    font-size: 1.3em;\r\n    margin: 0 1em;\r\n}\r\n\r\n#devBtn {\r\n    position: absolute;\r\n    left: 2%;\r\n    top: 3%;\r\n    cursor: pointer;\r\n    transition: .4s opacity;\r\n}\r\n\r\n#devBtn:hover {\r\n    opacity: 1;\r\n}\r\n\r\nul {\r\n    list-style-type: none;\r\n}\r\n\r\n.hidden {\r\n    display: none;\r\n}\r\n\r\n.invisible {\r\n    opacity: 0;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 15:0-14 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 230:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/levels.json5":
/*!**************************!*\
  !*** ./src/levels.json5 ***!
  \**************************/
/*! default exports */
/*! export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 1 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 2 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 3 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 4 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 1 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 5 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 1 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 2 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 3 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 4 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 6 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 1 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 10 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 11 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 2 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 3 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 4 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 5 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 6 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 7 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 8 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     export 9 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export dirLeft [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export maxBounceYVelocity [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export offset [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export left [provided] [no usage info] [missing usage info prevents renaming] */
/*!         export val [provided] [no usage info] [missing usage info prevents renaming] */
/*!         other exports [not provided] [no usage info] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 7 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bgImgSrc [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export bubbles [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export bubbleColor [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export timeFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = JSON.parse("[{\"bgImgSrc\":\"./images/level1.png\",\"bubbles\":[{\"bubbleColor\":\"#574FFF\",\"type\":2}],\"timeFactor\":27},{\"bgImgSrc\":\"./images/level2.png\",\"bubbles\":[{\"bubbleColor\":\"#e36505\",\"type\":3}],\"timeFactor\":37},{\"bgImgSrc\":\"./images/level3.png\",\"bubbles\":[{\"bubbleColor\":\"#1c7a02\",\"type\":4}],\"timeFactor\":47},{\"bgImgSrc\":\"./images/level4.png\",\"bubbles\":[{\"bubbleColor\":\"#FFCF23\",\"type\":5}],\"timeFactor\":100},{\"bgImgSrc\":\"./images/level5.png\",\"bubbles\":[{\"bubbleColor\":\"#3d0563\",\"type\":4},{\"bubbleColor\":\"#3d0563\",\"type\":4,\"offset\":{\"left\":false,\"val\":1},\"dirLeft\":true}],\"timeFactor\":200},{\"bgImgSrc\":\"./images/level6.png\",\"bubbles\":[{\"bubbleColor\":\"#42FF21\",\"type\":2,\"maxBounceYVelocity\":3.6,\"offset\":{\"left\":true,\"val\":1.5}},{\"bubbleColor\":\"#42FF21\",\"type\":2,\"maxBounceYVelocity\":3.6,\"offset\":{\"left\":true,\"val\":3}},{\"bubbleColor\":\"#42FF21\",\"type\":2,\"maxBounceYVelocity\":3.6,\"offset\":{\"left\":true,\"val\":4.5}},{\"bubbleColor\":\"#42FF21\",\"type\":2,\"maxBounceYVelocity\":3.6,\"offset\":{\"left\":true,\"val\":6}},{\"bubbleColor\":\"#42FF21\",\"type\":2,\"maxBounceYVelocity\":3.6,\"offset\":{\"left\":true,\"val\":7.5}}],\"timeFactor\":90},{\"bgImgSrc\":\"./images/level7.png\",\"bubbles\":[{\"bubbleColor\":\"#FF1205\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":true,\"val\":1}},{\"bubbleColor\":\"#F59105\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":true,\"val\":7}},{\"bubbleColor\":\"#0094FF\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":true,\"val\":13}},{\"bubbleColor\":\"#009B21\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":true,\"val\":19}},{\"bubbleColor\":\"#B200FF\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":true,\"val\":25}},{\"bubbleColor\":\"#FF00DC\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":true,\"val\":31}},{\"bubbleColor\":\"#FF1205\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":false,\"val\":1},\"dirLeft\":true},{\"bubbleColor\":\"#F59105\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":false,\"val\":7},\"dirLeft\":true},{\"bubbleColor\":\"#0094FF\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":false,\"val\":13},\"dirLeft\":true},{\"bubbleColor\":\"#009B21\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":false,\"val\":19},\"dirLeft\":true},{\"bubbleColor\":\"#B200FF\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":false,\"val\":25},\"dirLeft\":true},{\"bubbleColor\":\"#FF00DC\",\"type\":1,\"maxBounceYVelocity\":5,\"offset\":{\"left\":false,\"val\":31},\"dirLeft\":true}],\"timeFactor\":50},{\"bgImgSrc\":\"./images/level8.png\",\"bubbles\":[{\"bubbleColor\":\"#42FF21\",\"type\":7}],\"timeFactor\":300}]");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/app.js");
/******/ })()
;
//# sourceMappingURL=main.js.map