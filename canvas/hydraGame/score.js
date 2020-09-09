'use strict';

//doesn't seem to be working

/*global ctx */

const score = document.createElement('div');
score.id = 'score';

score.innerText = '0';

document.body.appendChild(score);

ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: " + score, 8, 20);

