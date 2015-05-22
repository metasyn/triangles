// SETUP //

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');

// COLORS //

/* python:

import seaborn as sns

colors = sns.color_palette('husl', 30)
rgbs = []
for (r,g,b) in colors:
    r *= 255
    g *= 255
    b *= 255
    rgbs.append((int(r),int(g),int(b)))

colors = ["#{0:02x}{1:02x}{2:02x}".format(r,b,g) for (r,g,b) in rgbs]

*/
colors = ['#cff2e1', '#93dec4', '#4ac997', '#17ab64']



window.onload = function() {
    var div = document.getElementById("canvasContainer");

    canvas.height = div.offsetHeight;
    canvas.width  = div.offsetWidth;
}

Array.prototype.randomChoice = function () {
	return this[Math.floor(Math.random() * this.length)]
}

// DRAWIN THEM ANGLES //

function drawDescendingTriangles(x, y, h, w){

	ctx.fillStyle = colors.randomChoice();
	var topRight = new Path2D(
		'M' + x + ' ' + (y-h) + 
		' h ' + w +
		' v ' + h
		);

	ctx.fill(topRight)

	ctx.fillStyle = colors.randomChoice();
	var bottomLeft = new Path2D(
		'M' + x + ' ' + (y-h) +
		' v ' + h +
		' h ' + w
		);

	ctx.fill(bottomLeft)

}

function drawAscendingTriangles(x, y, h, w){

	ctx.fillStyle = colors.randomChoice();
	var topLeft = new Path2D(
		'M' + x + ' ' + y + 
		' h ' + w +
		' v -' + h
		);

	ctx.fill(topLeft)

	ctx.fillStyle = colors.randomChoice();
	var bottomRight = new Path2D(
		'M' + x + ' ' + y +
		' v -' + h +
		' h '+ w
		);

	ctx.fill(bottomRight)

}

// SINGLE ROWS

function drawDescendingRow(size, height){
	for (var i = 0; i < canvas.width; i += (size)) {
		drawDescendingTriangles(i, height, size, size);
	}
}

function drawAscendingRow(size, height){
	for (var i = 0; i < canvas.width; i += (size)) {
		drawAscendingTriangles(i, height, size, size);
	}
}

function drawMixedRowA(size, height){
	for (var i = 0; i < canvas.width; i += (size+size)) {
		drawDescendingTriangles(i, height, size, size);
		drawAscendingTriangles(i+size, height, size, size);
	}
}

function drawMixedRowB(size, height){
	for (var i = 0; i < canvas.width; i += (size+size)) {
		drawAscendingTriangles(i, height, size, size);
		drawDescendingTriangles(i+size, height, size, size);
	}
}

// MULTIPLE ROWS


function drawDescendingRows(size){
	for (var i = 0; i < canvas.height; i += (size)){
		drawDescendingRow(size, i);
	}
}

function drawAscendingRows(size){
	for (var i = 0; i < canvas.height; i += (size)){
		drawAscendingRow(size, i);
	}
}

function drawMixedRows(size){
	for (var i = 0; i < canvas.height; i += (2*size)){
		drawMixedRowA(size, i-size);
		drawMixedRowB(size, i);
	}
}


function drawRandomRows(size){
    for (var i = 0; i < canvas.height; i += (size)){
        Math.random() > .5 ? drawMixedRowA(size, i-size) : drawMixedRowB(size, i);
	}
}


 // TIMER //

function repeater(){
  drawRandomRows(500);
  setInterval(
      function(){
          drawRandomRows(50);
          ctx.globalAlpha = 0.3; }, 100)
}

document.body.onload(repeater());


