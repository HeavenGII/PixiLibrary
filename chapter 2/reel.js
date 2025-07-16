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
	this.heightBySqureOfMask = null;
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
	this.heightBySqureOfMask = cube.height/3
	console.log(this.heightBySqureOfMask)

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

	let buttonContainer = new PIXI.Container()
	this.addChild(buttonContainer)
	let textureButn = resources['button_elements'].texture;
	let arrButtonElem = []
	for(let i = 0; i<2; i++){
		arrButtonElem.push(new PIXI.Rectangle(120*i, 0, 120, 120))
	}
	buttonTextures = arrButtonElem.map(frame=>{
		let element = new PIXI.Texture(textureButn)
		element.frame = frame
		return element
	})
	button = new PIXI.Sprite(buttonTextures[0])
	button.buttonMode = true
	button.interactive = true
	button.position.set(reel1.width/2+reel1.width/3,(reel1.height-button.height)/2)

	button.on('mouseup', ()=>{
		button.texture = buttonTextures[1]

		setTimeout(()=>{
			button.texture = buttonTextures[0]
		}, 100)
		reel1.spin()

	})
	let spin = new PIXI.Sprite(resources['spin'].texture)
	spin.position.set(reel1.width/6*5+9,(reel1.height-spin.height)/2)

	buttonContainer.addChild(button)
	buttonContainer.addChild(spin)


}

Reel.prototype.spin = function() {
	if(this.ticker1){
		this.ticker1.stop()
		this.ticker1 = null;
	}
	this.ticker1 = PIXI.ticker.shared;
	this.ticker2 = new PIXI.ticker.Ticker()
	this.ticker3 = new PIXI.ticker.Ticker()
	let changepos1 = true, isSpin1 = true, state1 = false
	let changepos2 = true, isSpin2 = true, state2 = false
	let changepos3 = true, isSpin3 = true, state3 = false
	this.ticker1.add(()=>{
		renderer.render(stage)
		this.reelElements1.forEach(element => {
			if(isSpin1){
				element.y+=24
				if(element.y >= this.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[this.reelstrip1[this.RandomValue(this.reelstrip1)]]
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement-diffWidth, this.startHeightElement - this.heightBySqureOfMask)
        		} setTimeout(()=>{
					if(element.y != this.startHeightElement-this.heightBySqureOfMask ||
					element.y != this.startHeightElement ||
					element.y != this.startHeightElement+this.heightBySqureOfMask ||
					element.y != this.startHeightElement+this.heightBySqureOfMask*2)
					{
						element+=24
					}
					isSpin1 = false
				}, 1150)
			} else if(changepos1) {

				if(element.y == this.startHeightElement-this.heightBySqureOfMask+22 ||
					element.y == this.startHeightElement+22 ||
					element.y == this.startHeightElement+this.heightBySqureOfMask+22 
				){
					return
				}
				if(element.y != this.startHeightElement+this.heightBySqureOfMask*2+22){
					element.y+=2
				} else {
					state1 = true
					changepos1 = false
				}
			} else if(state1) {
				if(element.y == this.startHeightElement-this.heightBySqureOfMask ||
					element.y == this.startHeightElement ||
					element.y == this.startHeightElement+this.heightBySqureOfMask
				){
					return
				}
				if(element.y != this.startHeightElement+this.heightBySqureOfMask*2){
					element.y-=2
				} else {
					state1 = false
				}
			}
		})
	})
	this.ticker1.start()


	
	this.ticker2.add(()=>{
		renderer.render(stage)
		this.reelElements2.forEach(element => {
			if(isSpin2){
				element.y+=24
				if(element.y >= this.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[this.reelstrip2[this.RandomValue(this.reelstrip2)]]
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement+this.widthBySqureOfMask+10-diffWidth, this.startHeightElement- this.heightBySqureOfMask )
        		}
				 setTimeout(()=>{
					if(element.y != this.startHeightElement-this.heightBySqureOfMask ||
					element.y != this.startHeightElement ||
					element.y != this.startHeightElement+this.heightBySqureOfMask ||
					element.y != this.startHeightElement+this.heightBySqureOfMask*2)
					{
						element+=24
					}
					isSpin2 = false
				}, 1500)
			} else if(changepos2) {

				if(element.y == this.startHeightElement-this.heightBySqureOfMask+22 ||
					element.y == this.startHeightElement+22 ||
					element.y == this.startHeightElement+this.heightBySqureOfMask+22 
				){
					return
				}
				if(element.y != this.startHeightElement+this.heightBySqureOfMask*2+22){
					element.y+=2
				} else {
					state2 = true
					changepos2 = false
				}
			} else if(state2) {
				if(element.y == this.startHeightElement-this.heightBySqureOfMask ||
					element.y == this.startHeightElement ||
					element.y == this.startHeightElement+this.heightBySqureOfMask
				){
					return
				}
				if(element.y != this.startHeightElement+this.heightBySqureOfMask*2){
					element.y-=2
				} else {
					state2 = false
				}
			}
		})
	})
	this.ticker2.start()

	this.ticker3.add(()=>{
		renderer.render(stage)
		this.reelElements3.forEach(element => {
			if(isSpin3){
				element.y+=24
				if(element.y >= this.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[this.reelstrip3[this.RandomValue(this.reelstrip3)]]
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement+(this.widthBySqureOfMask+10)*2-diffWidth, this.startHeightElement- this.heightBySqureOfMask )
        		} setTimeout(()=>{
					if(element.y != this.startHeightElement-this.heightBySqureOfMask ||
					element.y != this.startHeightElement ||
					element.y != this.startHeightElement+this.heightBySqureOfMask ||
					element.y != this.startHeightElement+this.heightBySqureOfMask*2)
					{
						element+=24
					}
					isSpin3 = false
				}, 1965)
			} else if(changepos3) {

				if(element.y == this.startHeightElement-this.heightBySqureOfMask+30 ||
					element.y == this.startHeightElement+30 ||
					element.y == this.startHeightElement+this.heightBySqureOfMask+30 
				){
					return
				}
				if(element.y != this.startHeightElement+this.heightBySqureOfMask*2+30){
					element.y+=2
				} else {
					state3 = true
					changepos3 = false
				}
			} else if(state3) {
				if(element.y == this.startHeightElement-this.heightBySqureOfMask ||
					element.y == this.startHeightElement ||
					element.y == this.startHeightElement+this.heightBySqureOfMask
				){
					return
				}
				if(element.y != this.startHeightElement+this.heightBySqureOfMask*2){
					element.y-=2
				} else {
					state3 = false
				}
			}
		})
	})
	this.ticker3.start()
 
	return true
}
Reel.prototype.RandomValue = function(reelstrip){
	return Math.floor(Math.random()*reelstrip.length)
} 

