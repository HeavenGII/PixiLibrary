var width = 1280,
	height = 720,
	loader = PIXI.loader,
	resources = loader.resources,
	renderer = new PIXI.autoDetectRenderer(width, height, {view: document.getElementById("canvas")});
	stage = new PIXI.Container();
	ticker = null,
	reelPanel = null,
	reel1 = null,
	reelstrip1 = [
		0, //Seven
		1, //Bar
		2, //Melon
		3, //Grapes
		4, //Plum
		5, //Orange
		6, //Lemon
		7, //Cherry
		0, //Seven
		2, //Melon
		4, //Plum
		6, //Lemon
		1, //Bar
		3, //Grapes
		5, //Orange
		7  //Cherry
	];
	
loader
	.add('bgr', 'images/bgr.jpg')
	.add('reel', './images/reels.png')	
	.add('elements', './images/spritesheet.png')
	.load(onAssetsLoaded);

var reel1
let elementWidth = 198, elementHeight = 168, reelElement, reelElementsTexture;

function onAssetsLoaded() 
{
	init();
}
				
function init() {
    reel1 = new Reel(reelstrip1);
    reel1.init();
    
    stage.addChild(reel1);
    
    ticker = PIXI.ticker.shared;
    ticker.add(render);
}

function render()
{
	reel1.spin()
	renderer.render(stage);
};