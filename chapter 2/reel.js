function Reel(strip1, strip2, strip3)
{
	PIXI.Container.call(this);
	
	this.reelstrip1 = strip1;
	this.reelstrip2 = strip2;
	this.reelstrip3 = strip3;
	this.startWidthElement = null;
	this.startHeightElement = null;
	this.reelElements1 = [];
	this.reelElements2 = [];
	this.reelElements3 = [];
	this.reelMask = null;
	this.reelcontinue1 = null;
	this.reelcontinue2 = null;
	this.reelcontinue3 = null;
	this.widthBySqureOfMask = null;
	this.reelContentContainer = new PIXI.Container();
}
Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function()
{	
	let arrElements = []
	let texture = resources['elements'].texture;

	for(let i = 0; i < 5; i++){
		for(let j = 0; j<2; j++){
			if(i == 4 && j == 0){
				arrElements.push(new PIXI.Rectangle(elementWidth*j,elementHeight*i, elementWidth+26,elementHeight+22))
			} else {
				arrElements.push(new PIXI.Rectangle(elementWidth*j,elementHeight*i, elementWidth,elementHeight))
			}
		}
	}
	arrElements.pop()

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
	cube.drawRect(this.startWidthElement, this.startHeightElement, elementWidth*3+10*2+1, elementHeight*3);
	cube.endFill();
	this.widthBySqureOfMask = cube.width/3-7

	this.addChild(bgr)
	this.addChild(reelPanel)
	this.addChild(this.reelContentContainer)
	this.reelContentContainer.mask = cube;
	this.reelContentContainer.addChild(cube)
	reelPanel.position.set(this.startWidthElement-10, this.startHeightElement-10)
	let n1 = 0;
	let n2 = 0;
	let n3 = 0;

	for(let i = 3; i >=0; i--){
		reelElement = new PIXI.Sprite(reelElementsTexture[this.reelstrip1[this.reelstrip1.length - i - 14]])
		this.reelContentContainer.addChild(reelElement)
		reelElement.position.set(this.startWidthElement,this.startHeightElement+elementHeight*n1-elementHeight)
		this.reelElements1.push(reelElement)
		n1++;
	}
	for(let i = 3; i>=0; i--){
		reelElement = new PIXI.Sprite(reelElementsTexture[this.reelstrip2[this.reelstrip2.length - i - 9]])
		this.reelContentContainer.addChild(reelElement)
		reelElement.position.set(this.startWidthElement+elementWidth+10,this.startHeightElement+elementHeight*n2-elementHeight)
		this.reelElements2.push(reelElement)
		n2++;
	}
	for(let i = 3; i>=0; i--){
		reelElement = new PIXI.Sprite(reelElementsTexture[this.reelstrip3[this.reelstrip3.length - i - 13]])
		this.reelContentContainer.addChild(reelElement)
		reelElement.position.set(this.startWidthElement+(elementWidth+10)*2,this.startHeightElement+elementHeight*n3-elementHeight)
		this.reelElements3.push(reelElement)
		n3++;
	}
	this.reelcontinue1 = this.reelstrip1.length - n1 - 14
	this.reelcontinue2 = this.reelstrip2.length - n2 - 9
	this.reelcontinue3 = this.reelstrip3.length - n3 - 13

}

Reel.prototype.spin = function() {  
	this.reelElements1.forEach(element => {
		element.y+=10
		if(element.y > this.startHeightElement + elementHeight * 3) {
            element.texture = reelElementsTexture[this.reelstrip1[this.reelcontinue1%this.reelstrip1.length]]
			let diffWidth = (element.width - this.widthBySqureOfMask)/2
			element.position.set(this.startWidthElement-diffWidth, this.startHeightElement- elementHeight)
			if(this.reelcontinue1 === 0){
				this.reelcontinue1 = this.reelstrip1.length-1
			} else {
				this.reelcontinue1--
			}
        }
	})
	this.reelElements2.forEach(element => {
		element.y+=10
		if(element.y > this.startHeightElement + elementHeight * 3) {
            element.texture = reelElementsTexture[this.reelstrip2[this.reelcontinue2%this.reelstrip2.length]]
			let diffWidth = (element.width - this.widthBySqureOfMask)/2
			element.position.set(this.startWidthElement+this.widthBySqureOfMask+9-diffWidth, this.startHeightElement- elementHeight)
			if(this.reelcontinue2 === 0){
				this.reelcontinue2 = this.reelstrip2.length-1
			} else {
				this.reelcontinue2--
			}
        }
	})
	this.reelElements3.forEach(element => {
		element.y+=10
		if(element.y > this.startHeightElement + elementHeight * 3) {
            element.texture = reelElementsTexture[this.reelstrip3[this.reelcontinue3%this.reelstrip3.length]]
			let diffWidth = (element.width - this.widthBySqureOfMask)/2
			element.position.set(this.startWidthElement+(this.widthBySqureOfMask+10)*2-diffWidth, this.startHeightElement- elementHeight)
			if(this.reelcontinue3 === 0){
				this.reelcontinue3 = this.reelstrip3.length-1
			} else {
				this.reelcontinue3--
			}
        }
	})

}  
