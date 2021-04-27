var BG, capI1, capI2, capIl1, capIl2;
var cap, invG;
var x, y, bx, by;;
var capI3, capIl3;
var gameState = 0;
var animationleft = 0;
var animationright = 0;
var collectS, badI, badGroup, coin1Group, coin2Group;
var score = 0;
var BGS, done, badS;
function preload()
{
	BG = loadImage("BGP.png");
	
	capI2 = loadImage("cap1.gif"/* "capleft1.gif"*/);
	capIl2 = loadImage("capleft1.gif");
	capI3 = loadImage("cap4.gif");
	capIl3 = loadImage("capl4.gif");
	coinI = loadImage("coin.png");
	badI = loadImage("object.png");
	collectS = loadSound("Collect.mp3");
	BGS = loadSound("BGM.mp3");
	done = loadSound("Game over.wav");
	badS = loadSound("bad.wav");
}

function setup() {
	createCanvas(displayWidth, displayHeight-105);
	cap = createSprite(100, 100, 100, 100);
	cap.addAnimation("moving", capI3);
	invG = createSprite((displayWidth / 2), 650, 2000, 100);
	invG.visible = 0;
	
	coin1Group = new Group;
	coin2Group = new Group;
	badGroup = new Group;

	cap.setCollider("obb", cap.x -100, cap.y-100, 75, 100);
    cap.debug = true;
}


function draw() {
	background(BG);
	cap.velocityY = cap.velocityY + 5;
	cap.collide(invG);
	x = cap.collider.x;
	y = cap.collider.y;
	if (gameState === 1) {
		
		if (frameCount % 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000 === 1) {
			loop(100);
			BGS.play();
		}
		movement();
		objects();
		if (coin1Group.isTouching(cap)) {
			coin1Group.destroyEach();
			collectS.play();
			score += 1;
			
		}
		if (coin2Group.isTouching(cap)) {
			coin2Group.destroyEach();
			collectS.play();
			score += 1;
		}
		if (badGroup.isTouching(cap)) {
			gameState = 2;
			done.play();
			score += 1;
		}
		
	}
	if (gameState === 2) {
		coin1Group.setLifetimeEach(-1);
		coin2Group.lifetime = (-1);
		badGroup.lifetime = (-1);
		coin1Group.setVelocityYEach(0);
		coin2Group.setVelocityYEach(0);
		badGroup.setVelocityYEach(0);
		cap.velocityY = 0;
		cap.addAnimation("strings", capI3);
		if (keyWentDown("SPACE")) {
			gameState = 1;
			coin1Group.destroyEach();
			coin2Group.destroyEach();
			badGroup.destroyEach();
			score = 0;
        }
    }
	textSize(50);
	fill(0);
	drawSprites();
	if (gameState === 0) {
		text("PRESS SPACE TO START", 400, displayHeight / 2);
		frameCount -= frameCount;
	}
	if (keyDown("space") && gameState === 0) {
		gameState = 1;
    }
	if (gameState === 1) {
		
		text("Score: " + score, 50, 50);
	}
}

function movement() {
	if (animationleft === 0 && animationright ===0) {
		cap.addAnimation("moving", capI3);

		
	}
	if (keyDown(RIGHT_ARROW)) {
		cap.x += 15;
		cap.addAnimation("moving", capI2);
		animationleft = 0;
		animationright = 1;
		cap.setCollider("obb", x, y , 200, 100);
	}
	else {
		if (animationleft === 0 && animationright === 1) {
			cap.addAnimation("moving", capI3);
			cap.setCollider("obb", x, y, 75, 100);
		}
    }
	if (keyDown(LEFT_ARROW)) {
		cap.x -= 15;
		cap.addAnimation("moving", capIl2);
		animationleft = 1;
		animationright = 0;
		cap.setCollider("obb", x, y , 200, 100);
	}
	else {
		
		if (animationleft === 1 && animationright === 0) {
			cap.addAnimation("moving", capIl3);
			cap.setCollider("obb", x, y, 75, 100);
		}
    }
	if (keyWentDown("space")&& cap.y >400) {
		cap.velocityY = -50;
	}
}
function objects() {
	if (frameCount % 120 === 0) {
		var coin = createSprite(100, -100, 10, 10);
		coin.addAnimation("coined", coinI);
		coin.x = Math.round(random(700, 1600));
		coin.velocityY = 10;
		coin.scale = 0.25;
		coin.lifetime = 1000;
		coin1Group.add(coin);
	}
	if (frameCount % 104 === 38) {
		var coin1 = createSprite(100, -100, 10, 10);
		coin1.addAnimation("coined", coinI);
		coin1.x = Math.round(random(300, 700));
		coin1.velocityY = 10;
		coin1.scale = 0.25;
		coin1.lifetime = 1000;
		coin2Group.add(coin1);
	}
	if (frameCount % 100 === 0) {
		var bad = createSprite(100, -100, 10, 10);
		bad.addAnimation("coined", badI);
		
		bx = bad.x-25;
		by = bad.y+25;
		//bad.setCollider("circle", bx, by, 200)
		//bad.debug = true;
		bad.x = Math.round(random(300, 1400));
		bad.velocityY = 10;
		bad.scale = 0.125;
		badS.play();
		badGroup.add(bad);
	}
}