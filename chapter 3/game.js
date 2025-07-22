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
	.add('sevenAnim','./images/gsym_0/gsym_0_animation.png')
	.add('barAnim','./images/gsym_1/gsym_1_animation.png')
	.add('melonAnim', './images/gsym_2/gsym_2_animation.png')
	.add('grapesAnim', './images/gsym_3/gsym_3_animation.png')
	.add('plumAnim', './images/gsym_4/gsym_4_animation.png')
	.add('orangeAnim', './images/gsym_5/gsym_5_animation.png')
	.add('lemonAnim', './images/gsym_6/gsym_6_animation.png')
	.add('cherryAnim', './images/gsym_7/gsym_7_animation.png')
	.add('starAnim', './images/gsym_8/gsym_8_animation.png')
	.load(onAssetsLoaded);

const symbolAnimations = {
    0: { name: 'seven', textures: null },
    1: { name: 'bar', textures: null },
    2: { name: 'melon', textures: null },
    3: { name: 'grapes', textures: null },
    4: { name: 'plum', textures: null },
    5: { name: 'orange', textures: null },
    6: { name: 'lemon', textures: null },
    7: { name: 'cherry', textures: null },
    8: { name: 'star', textures: null }
}
var reel1
let elementWidth = 198, elementHeight = 168, reelElement, reelElementsTexture, buttonTextures;
let arrMelonAnimTextures;
let button 

function onAssetsLoaded() 
{
	initSymbolAnimations()
	init()
}
				
function init() {
    reel1 = new Reel(reelstrip1, reelstrip2, reelstrip3);
    reel1.init();
    stage.addChild(reel1);

	renderer.render(stage);
}

function render()
{
	reel1.spin()
	renderer.render(stage)
}

function initSymbolAnimations() {
    for (let i = 0; i <= 8; i++) {
        const animTexture = resources[symbolAnimations[i].name + 'Anim'].texture
        symbolAnimations[i].textures = []
        if (i !== 8) {
            for (let frame = 0; frame < 11; frame++) {
                const texture = new PIXI.Texture(animTexture)
                texture.frame = new PIXI.Rectangle(
                    0, 
                    elementHeight * frame, 
                    elementWidth, 
                    elementHeight
                );
                symbolAnimations[i].textures.push(texture)
            }
        } 
        else {
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 2; col++) {
                    if (row === 5 && col === 1) continue
                    const texture = new PIXI.Texture(animTexture)
                    texture.frame = new PIXI.Rectangle(
                        (elementWidth + 26) * col,
                        (elementHeight + 22) * row,
                        elementWidth + 26,
                        elementHeight + 22
                    )
                    symbolAnimations[i].textures.push(texture)
                }
            }
        }
    }
}
