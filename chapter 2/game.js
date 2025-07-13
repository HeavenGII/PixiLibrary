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
		8, //Star
		0, //Seven
		2, //Melon
		4, //Plum
		6, //Lemon
		1, //Bar
		3, //Grapes
		5, //Orange
		7, //Cherry
		8  //Star
	],
		reelstrip2 = [
		0, //Seven
		1, //Bar
		1, //Bar
		2, //Melon
		3, //Grapes
		4, //Plum
		6, //Lemon
		6, //Lemon
		7, //Cherry
		8, //Star
		0, //Seven
		2, //Melon
		4 //Plum
	],
		reelstrip3 = [
		0, //Seven
		0, //Seven
		8, //Star
		3, //Grapes
		4, //Plum
		5, //Orange
		6, //Lemon
		7, //Cherry
		7, //Cherry
		2, //Melon
		4, //Plum
		2, //Melon
		6, //Lemon
		1, //Bar
		1, //Bar
		3, //Grapes
		5, //Orange
		7, //Cherry
		7, //Cherry
		2 //Melon
	];
	
loader
	.add('bgr', './images/bgr.png')
	.add('reel', './images/reels.png')	
	.add('elements', './images/spritesheet.png')
	.add('button_elements', './images/button-tileset.png')
	.add('spin', './images/ico_play.png')
	.load(onAssetsLoaded);

var reel1
let elementWidth = 198, elementHeight = 168, reelElement, reelElementsTexture, buttonTextures;

function onAssetsLoaded() 
{
	init();
}
				
function init() {
    reel1 = new Reel(reelstrip1, reelstrip2, reelstrip3);
    reel1.init();
    stage.addChild(reel1);

	let buttonContainer = new PIXI.Container()
	stage.addChild(buttonContainer)
	let texture = resources['button_elements'].texture;
	let arrButtonElem = []
	for(let i = 0; i<2; i++){
		arrButtonElem.push(new PIXI.Rectangle(120*i, 0, 120, 120))
	}
	buttonTextures = arrButtonElem.map(frame=>{
		let element = new PIXI.Texture(texture)
		element.frame = frame
		return element
	})
	let button = new PIXI.Sprite(buttonTextures[0])
	button.buttonMode = true;
	button.interactive = true
	button.position.set(reel1.width/2+reel1.width/3,(reel1.height-button.height)/2)
	button.on('tap', ()=>{
		console.log('hello')
	})
	// let spin = new PIXI.Sprite(resources['spin'].texture)
	// spin.position.set(reel1.width/6*5+9,(reel1.height-spin.height)/2)
	// buttonContainer.addChild(spin)

	buttonContainer.addChild(button)
    ticker = PIXI.ticker.shared;
    ticker.add(render);
}

function render()
{
	reel1.spin()
	renderer.render(stage);
};