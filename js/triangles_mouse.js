// SETUP //

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');
var mousex, mousey;

// LISTENERS
document.addEventListener('mousemove', function(e){
  mousex = e.clientX || e.pageX;
  mousey = e.clientY || e.pageY;
  changeColor(colors);
  }
);

// LOADERS
window.onload = function() {
    var div = document.getElementById("canvasContainer");

    canvas.height = div.offsetHeight;
    canvas.width  = div.offsetWidth;
}

// HELPERS
Array.prototype.randomChoice = function () {
	return this[Math.floor(Math.random() * this.length)]
}

// COLORS //

colors = 
['rgb(82.74510%, 93.25490%, 80.31373%)',
 'rgb(59.60784%, 83.45098%, 57.88235%)',
 'rgb(29.49020%, 69.01961%, 38.43137%)',
 'rgb(8.23529%, 49.80392%, 23.13726%)']

/* python to generate colors

import seaborn as sns

colors = sns.color_palette('husl', 30)
percs = []
percs = ["rgb({0:.5%}, {1:.5%}, {2:.5%})".format(r,b,g) for (r,g,b) in colors]
*/

function changeColor(colors, mousex){
    // choose an index
    var randomIndex = [0,1,2,3].randomChoice();
    var colorChoice = colors[randomIndex];
    colorChoice = colorChoice.slice(4, -1).split(',');

    // generally we'll change the green color
    var randomRGBIndex = [1,1,1,1,1,1,2].randomChoice();


    var editedRGB = parseFloat(colorChoice[randomRGBIndex]);

    if (randomRGBIndex == 1){
    	editedRGB < 65 ? editedRGB += randomIndex : editedRGB -= randomIndex;
    }
    else if (randomRGBIndex == 2) {
    	editedRGB < 80 ? editedRGB += randomIndex : editedRGB -= randomIndex;
    } else {
    	editedRGB < 40 ? editedRGB += randomIndex : editedRGB -= randomIndex;
    }
    colorChoice[randomRGBIndex] = editedRGB + '%';
    colors[randomIndex] = 'rgb(' + colorChoice + ')';
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


