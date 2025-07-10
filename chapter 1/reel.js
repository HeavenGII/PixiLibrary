function Reel(strip)
{
	PIXI.Container.call(this);
	
	this.reelstrip = strip;
	this.startWidthElement = null;
	this.startHieghtElement = null;
	this.reelElements= [];
	this.reelMask = null;
}
Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function()
{	
	let arrElements = []
	let texture = resources['elements'].texture;

	for(let i = 0; i < 8; i++){
		arrElements.push(new PIXI.Rectangle(i*elementWidth,0, elementWidth,elementHight))
	}
	reelElementsTexture = arrElements.map(frame=>{
		let element = new PIXI.Texture(texture)
		element.frame = frame;
		return element
	}) 

	var bgr = new PIXI.Sprite(resources.bgr.texture);
	var reelPanel = new PIXI.Sprite(resources.reel.texture);

	this.startWidthElement = bgr.width-reelPanel.width;
	this.startHieghtElement = bgr.height-reelPanel.height;

	let cube = new PIXI.Graphics();
	cube.beginFill(0xFFFFFF, 0);
	cube.drawRect(this.startWidthElement/2+10, this.startHieghtElement/2+10-elementHight, elementWidth, elementHight*4);
	cube.endFill();

    this.addChild(bgr);
	this.addChild(reelPanel)
	this.addChild(cube)


	reelPanel.position.set((bgr.width-reelPanel.width)/2,(bgr.height-reelPanel.height)/2)
	for(let i = 3; i>=0; i--){
		reelElement = new PIXI.Sprite(reelElementsTexture[this.reelstrip[this.reelstrip.length-1]])
		if(i === 0) {
            reelElement.alpha = 0
        } else {
			reelElement.alpha = 1
		}
		this.reelElements.push(reelElement)
		this.addChild(reelElement)
		reelElement.position.set((this.startWidthElement)/2+10,((this.startHieghtElement)/2+10)+elementHight*i-elementHight)
		reelElement.mask = cube
		this.reelstrip.length--
	}
	console.log(this.reelstrip)

	/*
	 * TODO add all necessary elements of the reel (sprites, mask) here
	 *
	 * Add 4 symbols (sprites) and position them on the reel 
	 * The first symbol is positioned outside of the reel
	 * The second symbol is the first visible symbol followed by the other symbols
	 * The mask is covering the visible part of the reel
	 */
};

Reel.prototype.spin = function()
{
	this.reelElements.forEach(element =>{
		element.y+=10
		if(element.y> this.startHieghtElement+10-elementHight){
			element.alpha = 1

		}
	})
	
	/*
	 * TODO implement the spin functionality here
	 * 
	 * Move all symbols downwards 
	 * If a symbol is out of the reel
	 * position it above the reel (where first symbol is positioned at the start) 
	 * and change the symbol according to the reelstrip
	 */
};

//TODO add additional used functions of the reel element here