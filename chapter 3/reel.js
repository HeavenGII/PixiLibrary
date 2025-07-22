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
Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

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
		if (this.isButtonLocked) return
		button.texture = buttonTextures[1]
		this.isButtonLocked = true
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
	
    this.ticker1 = new PIXI.ticker.Ticker()
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
            		element.texture = reelElementsTexture[this.reelstrip1[this.reelcontinue1%this.reelstrip1.length]]
					if(this.reelcontinue1 === 0){
						this.reelcontinue1 = this.reelstrip1.length-1
					} else {
						this.reelcontinue1--
					}
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement-diffWidth, this.startHeightElement - this.heightBySqureOfMask)
        		} setTimeout(()=>{
					isSpin1 = false
				}, 1150)
			} else if(changepos1) {
				if(element.y >= this.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[this.reelstrip1[this.reelcontinue1%this.reelstrip1.length]]
					if(this.reelcontinue1 === 0){
						this.reelcontinue1 = this.reelstrip1.length-1
					} else {
						this.reelcontinue1--
					}
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement-diffWidth, this.startHeightElement - this.heightBySqureOfMask)
        		}
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
					this.isStopped1 = true
					this.arrCheckLines[0][0] = this.reelstrip1[(this.reelcontinue1+2)%this.reelstrip1.length]
					this.arrCheckLines[1][0] = this.reelstrip1[(this.reelcontinue1+3)%this.reelstrip1.length]
					this.arrCheckLines[2][0] = this.reelstrip1[(this.reelcontinue1+4)%this.reelstrip1.length]
					state1 = false
					this.ticker1.stop()					
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
            		element.texture = reelElementsTexture[this.reelstrip2[this.reelcontinue2%this.reelstrip2.length]]
					if(this.reelcontinue2 === 0){
						this.reelcontinue2 = this.reelstrip2.length-1
					} else {
						this.reelcontinue2--
					}
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement+this.widthBySqureOfMask+10-diffWidth, this.startHeightElement- this.heightBySqureOfMask)
        		}
				 setTimeout(()=>{
					isSpin2 = false
				}, 1615)
			} else if(changepos2) {
				if(element.y >= this.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[this.reelstrip2[this.reelcontinue2%this.reelstrip2.length]]
					if(this.reelcontinue2 === 0){
						this.reelcontinue2 = this.reelstrip2.length-1
					} else {
						this.reelcontinue2--
					}
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement+this.widthBySqureOfMask+10-diffWidth, this.startHeightElement- this.heightBySqureOfMask)
        		}
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
					this.arrCheckLines[0][1] = this.reelstrip2[(this.reelcontinue2+2)%this.reelstrip2.length]
					this.arrCheckLines[1][1] = this.reelstrip2[(this.reelcontinue2+3)%this.reelstrip2.length]
					this.arrCheckLines[2][1] = this.reelstrip2[(this.reelcontinue2+4)%this.reelstrip2.length]
					this.isStopped2 = true
					this.ticker2.stop()
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
            		element.texture = reelElementsTexture[this.reelstrip3[this.reelcontinue3%this.reelstrip3.length]]
					if(this.reelcontinue3 === 0){
						this.reelcontinue3 = this.reelstrip3.length-1
					} else {
						this.reelcontinue3--
					}
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement+(this.widthBySqureOfMask+10)*2-diffWidth, this.startHeightElement- this.heightBySqureOfMask )
        		} setTimeout(()=>{
					isSpin3 = false
				}, 1965)
			} else if(changepos3) {
				if(element.y >= this.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[this.reelstrip3[this.reelcontinue3%this.reelstrip3.length]]
					if(this.reelcontinue3 === 0){
						this.reelcontinue3 = this.reelstrip3.length-1
					} else {
						this.reelcontinue3--
					}
					let diffWidth = (element.width - this.widthBySqureOfMask)/2
					element.position.set(this.startWidthElement+(this.widthBySqureOfMask+10)*2-diffWidth, this.startHeightElement- this.heightBySqureOfMask )
        		}
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
					this.isStopped3 = true
					this.arrCheckLines[0][2] = this.reelstrip3[(this.reelcontinue3+2)%this.reelstrip3.length]
					this.arrCheckLines[1][2] = this.reelstrip3[(this.reelcontinue3+3)%this.reelstrip3.length]
					this.arrCheckLines[2][2] = this.reelstrip3[(this.reelcontinue3+4)%this.reelstrip3.length]
					state3 = false
					this.ticker3.stop()
				}
			}
		})
	})
	this.ticker3.start()
    const checkAllStopped = () => {
        if(this.isStopped1 && this.isStopped2 && this.isStopped3) {
			this.isButtonLocked = false
            this.checkWin()
        } else {
            setTimeout(checkAllStopped, 100)
        }
    }
    
    setTimeout(checkAllStopped, 100)
    return true
}
Reel.prototype.RandomValue = function(reelstrip){
	return Math.floor(Math.random()*reelstrip.length)
} 

Reel.prototype.checkWin = function() {
    if (this.arrCheckLines[1][0] === this.arrCheckLines[1][1] && 
        this.arrCheckLines[1][0] === this.arrCheckLines[1][2]) {
        
        const winningSymbol = this.arrCheckLines[1][0]
        console.log('Winning combination with:', symbolAnimations[winningSymbol].name)

        const centerY = this.startHeightElement + this.heightBySqureOfMask

        const anim1Element = this.reelElements1.find(el => Math.abs(el.y - centerY) < 5)
        const anim2Element = this.reelElements2.find(el => Math.abs(el.y - centerY) < 5)
        const anim3Element = this.reelElements3.find(el => Math.abs(el.y - centerY) < 5)

        const anim1 = this.createAnimation(anim1Element, winningSymbol)
        const anim2 = this.createAnimation(anim2Element, winningSymbol)
        const anim3 = this.createAnimation(anim3Element, winningSymbol)

        if (anim1 && anim2 && anim3) {
            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)
            })
            animTicker.start()

            setTimeout(() => {
                this.removeAnimation(anim1, anim1Element)
                this.removeAnimation(anim2, anim2Element)
                this.removeAnimation(anim3, anim3Element)
                animTicker.stop()
                this.isButtonLocked = false
            }, 3000);
        } else {
            this.isButtonLocked = false
        }
    } else {
        this.isButtonLocked = false
    }

    this.isStopped1 = false
    this.isStopped2 = false
    this.isStopped3 = false
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