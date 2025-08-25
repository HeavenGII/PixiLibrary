function Reel(strip1, strip2, strip3)
{
	PIXI.Container.call(this);
	
	this.reelstrip1 = strip1
	this.reelstrip2 = strip2
	this.reelstrip3 = strip3
	this.startWidthElement = null
	this.startHeightElement = null
	this.reelElements1 = []
	this.reelElements2 = []
	this.reelElements3 = []
	this.reelMask = null
	this.reelcontinue1 = null
	this.reelcontinue2 = null
	this.reelcontinue3 = null
	this.widthBySqureOfMask = null
	this.heightBySqureOfMask = null
	this.isStopped1 = false
	this.isStopped2 = false
	this.isStopped3 = false
	this.reelContentContainer = new PIXI.Container()
	this.arrCheckLines = [[null, null, null], [null, null, null], [null, null, null]]
	this.isButtonLocked = false

}
Reel.prototype = Object.create(PIXI.Container.prototype)
Reel.prototype.constructor = Reel

Reel.prototype.init = function()
{	
	let arrElements = []
	let texture = resources['elements'].texture

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


	var bgr = new PIXI.Sprite(resources.bgr.texture)
	var reelPanel = new PIXI.Sprite(resources.reel.texture)

	this.startWidthElement = (bgr.width-reelPanel.width)/2
	this.startHeightElement = (bgr.height-reelPanel.height)/2

	let cube = new PIXI.Graphics()
	cube.beginFill(0xFFFFFF)
	cube.drawRect(this.startWidthElement, this.startHeightElement, elementWidth*3+10*2+1, elementHeight*3)
	cube.endFill()
	this.widthBySqureOfMask = cube.width/3-7
	this.heightBySqureOfMask = cube.height/3
	console.log(this.heightBySqureOfMask)

	this.addChild(bgr)
	this.addChild(reelPanel)
	this.addChild(this.reelContentContainer)
	this.reelContentContainer.mask = cube
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
	this.reelcontinue1 = this.reelstrip1.length - n1 - 6 // -4 - grapes; -1 - lemon; -7 - seven; -6 - bar; -8 - star
	this.reelcontinue2 = this.reelstrip2.length - n2 - 9 // -7 - grapes; -5 - lemon; -1 - seven; -9 - bar; -2 - star
	this.reelcontinue3 = this.reelstrip3.length - n3 - 9 // -7 - grapes; -10 - lemon; -1 - seven; -9 - bar; -0 - star

	let buttonContainer = new PIXI.Container()
	this.addChild(buttonContainer)
	let textureButn = resources['button_elements'].texture
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

	button.on('mousedown', ()=>{
		if (this.isButtonLocked) return
		button.texture = buttonTextures[1]
		this.isButtonLocked = true
		reel1.spin()
	})
	button.on(`mouseup`, ()=>{
		button.texture = buttonTextures[0]
		this.isButtonLocked = true
	})
	let spin = new PIXI.Sprite(resources.spin.texture)
	spin.position.set(reel1.width/6*5+9,(reel1.height-spin.height)/2)

	buttonContainer.addChild(button)
	buttonContainer.addChild(spin)

	let payTableTexture = resources.paytable.texture
	paytable = new PIXI.Sprite(payTableTexture)
	this.addChild(paytable)
	paytable.position.set((bgr.width/8-paytable.width/2), (bgr.height-paytable.height)/2)

	const payvaluesContainer = new PIXI.Container()
	this.addChild(payvaluesContainer)
	payvaluesContainer.position.set(paytable.x, paytable.y)
	const payouts = [40, 20, 16, 16, 2, 2, 2, 2, 50]
	payouts.forEach((payout, i)=>{
		const text = new PIXI.extras.BitmapText(
			`${payout}`,
			{
 				font: '50px win_font'
			}
		)
		if(payout <10){
			text.position.set(215, i*48.5+5)
		} else {
			text.position.set(200, i*48.5+5)
		}
        payvaluesContainer.addChild(text)
	})

	let logolineTexture = resources.logoline.texture
	logoline = new PIXI.Sprite(logolineTexture)
	this.addChild(logoline)
	logoline.position.set((bgr.width-logoline.width)/2, 20)

	let paylineTexture = resources.payline.texture
	payline = new PIXI.Sprite(paylineTexture)
	this.addChild(payline)
	payline.position.set((bgr.width-payline.width)/2, 25)
	payline.visible = false

	this.winText = new PIXI.extras.BitmapText('0', {
		font: '50px win_font',
		align: 'center'
	})
	this.winText.position.set(610, 33)
	this.addChild(this.winText)
	this.winText.visible = false
}

Reel.prototype.spin = function() {
	return startScroll(this)
}

Reel.prototype.RandomValue = function(reelstrip){
	return Math.floor(Math.random()*reelstrip.length)
} 

Reel.prototype.checkWin = function() {
	checkWin(this)
}

Reel.prototype.createAnimation = function(element, symbolId) {
    const anim = new PIXI.extras.AnimatedSprite(symbolAnimations[symbolId].textures)
    if (symbolId === 8) {
        const diffX = (element.width - (elementWidth + 26)) / 2
        const diffY = (element.height - (elementHeight + 22)) / 2
        anim.x = element.x + diffX
        anim.y = element.y + diffY
    } else {
        anim.x = element.x
        anim.y = element.y
    }
    
    anim.animationSpeed = 0.3
    anim.loop = true
    this.reelContentContainer.addChild(anim)
    element.visible = false
    anim.play()
    return anim
}

Reel.prototype.removeAnimation = function(animation, originalElement) {
    this.reelContentContainer.removeChild(animation)
    if (originalElement) {
        originalElement.visible = true
    }
}