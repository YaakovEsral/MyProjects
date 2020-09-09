//initial boilerplate for this file can be found at 
//https://github.com/christopher4lis/canvas-boilerplate/blob/master/src/js/canvas.js

'use strict';
const instr = 'Instructions: Click the circle to make it disappear';
pcs.messageBox.show(instr);

//basic starting variables
const canvas = document.querySelector('canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

//variables for largest possible circle radius, fastest possible speed and circles array
const largestRadius = 75;
const fastestSpeed = 8;
let circles = [];

class Circle {
    constructor(x, y, radius, color, incrementX, incrementY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.incrementX = incrementX;
        this.incrementY = incrementY;
    }


    //check for a collision before redrawing the circle
    draw() {
        this.checkCollision();
        this.x += this.incrementX;
        this.y += this.incrementY;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    //check for collision with one of the walls. x and y coordinates are the circle's center
    //so there is a need to add or subtract the radius
    checkCollision() {
        if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            this.incrementX = -this.incrementX;
        }
        if (this.y + this.radius >= height || this.y - this.radius <= 0) {
            this.incrementY = -this.incrementY;
        }
    }

    update() {
        this.draw();
    }
}

//we will eventually need the mouse's coordinates to determine if a user is clicking
//on a point where there is a circle
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

//event listener for the canvas itself. loop through the array to see which circles
//the user hit. if there is a hit, remove that circle and set the hit boolean to true.
//if the user didn't hit any, create a new circle.
addEventListener('click', () => {
    let hit = false;
    for (let i = 0; i < circles.length; i++) {
        if (mouse.x > circles[i].x - circles[i].radius &&
            mouse.x < circles[i].x + circles[i].radius &&
            mouse.y < circles[i].y + circles[i].radius &&
            mouse.y > circles[i].y - circles[i].radius) {
            circles.splice(i, 1);
            hit = true;
        }
    }
    if (!hit){
        newCircle();
    }
});

// const cursorUrl = 'url(spike.png)';
addEventListener('mousedown', () => {
    document.body.style.cursor = 'url(\'spike.png\')';
    // document.body.style.cursor = 'pointer';
    console.log('cursor down');
});

//set of functions that generate random values for all the constructor parameters

//get a random starting point for the center of the circle.
//the calculation is to ensure that the starting center point of the ball will never be too close to
//the edge, which would prevent the ball from leaving that position. "too close" means within a distance
//of the "largestRadius", which is the largest possible radius of any ball.
function randomPoint(range) {
    return Math.floor(Math.random() * (range - (largestRadius * 2)) + (largestRadius));
}

function randomRadius() {
    return Math.floor(Math.random() * (largestRadius - 25)) + 25;
}

//random color generator. we are using opacity here. current calculation ensures that opacity should 
//never be lower than 0.5
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const op = Math.random() * 0.5 + 0.5;
    return `rgba(${r},${g},${b},${op})`;
}

//controls the speed and starting direction. 
function randomIncrementer() {
    const plusMinus = Math.random() < 0.5 ? 1 : -1;
    return plusMinus * (Math.random() * fastestSpeed);
}

//function to create new circle and add it to the circle array
function newCircle() {
    const circle = new Circle(randomPoint(width), randomPoint(height), randomRadius(),
        randomColor(), randomIncrementer(), randomIncrementer());
    circles.push(circle);
}

//our animation loop. we can reset the canvas size and color here if we want
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    circles.forEach(circle => {
        circle.update();
    });
}
//initially creating one circle to start
newCircle();
animate();