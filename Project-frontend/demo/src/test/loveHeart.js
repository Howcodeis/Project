const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.beginPath();
ctx.moveTo(200, 200);

ctx.bezierCurveTo(200, 100, 100, 200, 300, 300, 200, 400);

ctx.bezierCurveTo(200, 400, 100, 500, 100, 600);

ctx.closePath();
ctx.fillStyle = 'red';
ctx.fill();

ctx.strokeStyle = 'red';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.arc(200, 200, 100, 0, 180);
ctx.stroke();