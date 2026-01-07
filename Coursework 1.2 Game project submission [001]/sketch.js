/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var gravity;
var jumpPower;
var collectable;

var trees_x;
var clouds;
var mountains;
var cameraPosX;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	gravity = 2;
	jumpPower = -100;

	cameraPosX = 0;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	trees_x = [100, 300, 500, 900, 1100, 1500, 1800, 2200, 2600, 3000, 3500];

	clouds = [
        {x_pos: 100, y_pos: 100, width: 100, height: 60},
        {x_pos: 600, y_pos: 120, width: 100, height: 60},
        {x_pos: 800, y_pos: 100, width: 100, height: 60},
        {x_pos: 1200, y_pos: 150, width: 100, height: 60},
		{x_pos: 1800, y_pos: 100, width: 100, height: 60}, 
        {x_pos: 2500, y_pos: 140, width: 100, height: 60},
        {x_pos: 3200, y_pos: 110, width: 100, height: 60}
	];

	mountains = [
        {x_pos: -100, height: 250},
		{x_pos: 500, height: 350},  
        {x_pos: 1100, height: 200},  
		{x_pos: 1600, height: 300}, 
        {x_pos: 2400, height: 250},
        {x_pos: 3500, height: 400} 
    ];

	collectable = {x_pos: 300, y_pos: floorPos_y, size: 30, isFound: false};
	canyon = {x_pos: 100, width: 100};

}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y);

	cameraPosX = gameChar_x - width / 2;

	push();
	translate(-cameraPosX, 0);
	
	//draw some green ground
	
	//mountains
	for(var i = 0; i < mountains.length; i++)
    {
        fill(0, 100, 0);
        triangle(
            mountains[i].x_pos, floorPos_y,
            mountains[i].x_pos + 250, floorPos_y - mountains[i].height,
            mountains[i].x_pos + 500, floorPos_y
        );
    }

	//trees
	for(var i = 0; i < trees_x.length; i++)
    {
        var treeBaseY = floorPos_y - 150;

        // Trunk 
        fill(130, 100, 0); 
        rect(trees_x[i], treeBaseY, 50, 150);    
        
        // Leaves
        fill(0, 150, 0); 
        triangle(trees_x[i] - 50, treeBaseY + 50, trees_x[i] + 25, treeBaseY, trees_x[i] + 100, treeBaseY + 50);
        triangle(trees_x[i] - 50, treeBaseY + 25, trees_x[i] + 25, treeBaseY - 25, trees_x[i] + 100, treeBaseY + 25);
        triangle(trees_x[i] - 50, treeBaseY,      trees_x[i] + 25, treeBaseY - 50, trees_x[i] + 100, treeBaseY);
    }

	//clouds
	for(var i = 0; i < clouds.length; i++)
    {
        fill(255, 255, 255);
        ellipse(clouds[i].x_pos - 50, clouds[i].y_pos, clouds[i].width * 0.6, clouds[i].height);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].width, clouds[i].height * 1.3);
        ellipse(clouds[i].x_pos + 50, clouds[i].y_pos, clouds[i].width * 0.6, clouds[i].height);
    }

	//collectable item
	if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 20)
		{
			collectable.isFound = true;	
		}	
	
		if(collectable.isFound == false)
	{
		fill(200,0,0); 
		ellipse(collectable.x_pos, collectable.y_pos -30, collectable.size);
	}

	//draw the canyon
		fill(40, 130, 255);
		rect(canyon.x_pos, floorPos_y, canyon.width, 1000);

		//checking character when in canyon 
		if(gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width)
		{
			isPlummeting = true;
		}
		//plummeting
		if(isPlummeting)
		{
			gameChar_y += 10;
		}
	
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		//face
		fill(200,150,150);
		ellipse(gameChar_x, gameChar_y -52, 25);

		//body
		fill(255,0,0);
		rect(gameChar_x - 13,gameChar_y -40, 26, 25);

		//arms
		fill(0);
		rect(gameChar_x + 2, gameChar_y - 50, 6, 20);
	
		//feet
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 15, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 15, 10, 10);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		//face
		fill(200,150,150);
		ellipse(gameChar_x, gameChar_y -52, 25);

		//body
		fill(255,0,0);
		rect(gameChar_x - 13,gameChar_y -40, 26, 25);

		//arms
		fill(0);
		rect(gameChar_x - 10, gameChar_y - 50, 6, 20);
	
		//feet
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 15, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 15, 10, 10);

	}
	else if(isLeft)
	{
		// add your walking left code
		//face
		fill(200,150,150);
		ellipse(gameChar_x, gameChar_y -47, 25);

		//body
		fill(255,0,0);
		rect(gameChar_x - 13,gameChar_y -35, 26, 30);

		//arms
		fill(0);
		rect(gameChar_x + 2, gameChar_y - 35, 6, 20);

		//feet
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 6, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 6, 10, 10);

	}
	else if(isRight)
	{
		// add your walking right code
		//face
		fill(200,150,150);
		ellipse(gameChar_x, gameChar_y -47, 25);

		//body
		fill(255,0,0);
		rect(gameChar_x - 13,gameChar_y -35, 26, 30);

		//arms
		fill(0);
		rect(gameChar_x -8, gameChar_y - 35, 6, 20);

		//feet
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 6, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 6, 10, 10);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		//face
		fill(200,150,150);
		ellipse(gameChar_x, gameChar_y -52, 25);

		//body
		fill(255,0,0);
		rect(gameChar_x - 13,gameChar_y -40, 26, 25);

		//arms
		fill(0);
		rect(gameChar_x - 18, gameChar_y - 50, 6, 20);
		rect(gameChar_x + 12, gameChar_y - 50, 6, 20);
	
		//feet
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 15, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 15, 10, 10);

		//gameChar_y += gravity;

	}
	else
	{
		// add your standing front facing code
		//face
		fill(200,150,150);
		ellipse(gameChar_x, gameChar_y -47, 25);

		//body
		fill(255,0,0);
		rect(gameChar_x - 13,gameChar_y -35, 26, 30);

		//arms
		fill(0);
		rect(gameChar_x - 18, gameChar_y - 35, 6, 20);
		rect(gameChar_x + 12, gameChar_y - 35, 6, 20);

		//feet
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 6, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 6, 10, 10);


	}

	pop();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(isLeft)
	{
		gameChar_x -= 5;
	}
	if(isRight)
	{
		gameChar_x += 5;
	}

	if(gameChar_y < floorPos_y) 
	{
		gameChar_y += gravity;
		isFalling = true;
	}
	else if(isPlummeting == false)
	{	
		gameChar_y = floorPos_y
		isFalling = false;
	}



}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	//console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(isPlummeting == false) {
		if(keyCode == 37)
		{
			console.log("Left arrow")
			isLeft = true;
		}
		else if(keyCode == 39) 
		{
			console.log('Right arrow')
			isRight = true;
		}
		else if(keyCode == 32 && gameChar_y == floorPos_y)
		{
			console.log('Space bar - Jumping & Falling')
			isFalling = true;
			gameChar_y += jumpPower;
		}
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if(keyCode == 37)
	{
		console.log("Left arrow")
		isLeft = false;
	}
	else if(keyCode == 39) 
	{
		console.log('Right arrow')
		isRight = false;
	}

}
