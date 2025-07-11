function Reel(strip)
{
	PIXI.Container.call(this);
	
	this.reelstrip = strip;
	this.startWidthElement = null;
	this.startHeightElement = null;
	this.reelElements= [];
	this.reelMask = null;
	this.continue = null;
	this.reelContentContainer = new PIXI.Container();
}
Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function()
{	
	let arrElements = []
	let texture = resources['elements'].texture;

	for(let i = 0; i < 8; i++){
		arrElements.push(new PIXI.Rectangle(i*elementWidth,0, elementWidth,elementHeight))
	}
	reelElementsTexture = arrElements.map(frame=>{
		let element = new PIXI.Texture(texture)
		element.frame = frame
		return element
	}) 

	var bgr = new PIXI.Sprite(resources.bgr.texture);
	var reelPanel = new PIXI.Sprite(resources.reel.texture);

	this.startWidthElement = (bgr.width-reelPanel.width)/2;
	this.startHeightElement = (bgr.height-reelPanel.height)/2;

	let cube = new PIXI.Graphics();
	cube.beginFill(0xFFFFFF);
	cube.drawRect(this.startWidthElement, this.startHeightElement, elementWidth, elementHeight*3);
	cube.endFill();
	this.addChild(bgr)
	this.addChild(reelPanel)

	this.addChild(this.reelContentContainer)
	this.reelContentContainer.mask = cube;
	this.reelContentContainer.addChild(cube)
	reelPanel.position.set(this.startWidthElement-10, this.startHeightElement-10)
	let n = 0;
	for(let i = 3; i >=0; i--){
		reelElement = new PIXI.Sprite(reelElementsTexture[this.reelstrip[this.reelstrip.length - i - 1]])
		this.reelContentContainer.addChild(reelElement)
		reelElement.position.set(this.startWidthElement,this.startHeightElement+elementHeight*n-elementHeight)
		this.reelElements.push(reelElement)
		n++;
	}
	this.continue = n;
};

Reel.prototype.spin = function() {  
	this.reelElements.forEach(element => {
		element.y+=20
		if(element.y > this.startHeightElement + elementHeight * 3) {
			this.continue++
            element.y = this.startHeightElement - elementHeight
            element.texture = reelElementsTexture[this.reelstrip[this.reelstrip.length - this.continue]];
            if(this.continue == 16){
				this.continue = 0
			}
        }
	})
}  
