function startScroll(reelInstance){
    	if(reelInstance.ticker1){
		reelInstance.ticker1.stop()
		reelInstance.ticker1 = null;
	}
	
    reelInstance.ticker1 = new PIXI.ticker.Ticker()
    reelInstance.ticker2 = new PIXI.ticker.Ticker()
    reelInstance.ticker3 = new PIXI.ticker.Ticker()

	let changepos1 = true, isSpin1 = true, state1 = false
	let changepos2 = true, isSpin2 = true, state2 = false
	let changepos3 = true, isSpin3 = true, state3 = false
	reelInstance.ticker1.add(()=>{
		renderer.render(stage)
		reelInstance.reelElements1.forEach(element => {
			if(isSpin1){
				element.y+=24
				if(element.y >= reelInstance.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[reelInstance.reelstrip1[reelInstance.reelcontinue1%reelInstance.reelstrip1.length]]
					if(reelInstance.reelcontinue1 === 0){
						reelInstance.reelcontinue1 = reelInstance.reelstrip1.length-1
					} else {
						reelInstance.reelcontinue1--
					}
					let diffWidth = (element.width - reelInstance.widthBySqureOfMask)/2
					element.position.set(reelInstance.startWidthElement-diffWidth, reelInstance.startHeightElement - reelInstance.heightBySqureOfMask)
        		} setTimeout(()=>{
					isSpin1 = false
				}, 1150)
			} else if(changepos1) {
				if(element.y >= reelInstance.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[reelInstance.reelstrip1[reelInstance.reelcontinue1%reelInstance.reelstrip1.length]]
					if(reelInstance.reelcontinue1 === 0){
						reelInstance.reelcontinue1 = reelInstance.reelstrip1.length-1
					} else {
						reelInstance.reelcontinue1--
					}
					let diffWidth = (element.width - reelInstance.widthBySqureOfMask)/2
					element.position.set(reelInstance.startWidthElement-diffWidth, reelInstance.startHeightElement - reelInstance.heightBySqureOfMask)
        		}
				if(element.y == reelInstance.startHeightElement-reelInstance.heightBySqureOfMask+22 ||
					element.y == reelInstance.startHeightElement+22 ||
					element.y == reelInstance.startHeightElement+reelInstance.heightBySqureOfMask+22 
				){
					return
				}
				if(element.y != reelInstance.startHeightElement+reelInstance.heightBySqureOfMask*2+22){
					element.y+=2
				} else {
					state1 = true
					changepos1 = false
				}
			} else if(state1) {
				if(element.y == reelInstance.startHeightElement-reelInstance.heightBySqureOfMask ||
					element.y == reelInstance.startHeightElement ||
					element.y == reelInstance.startHeightElement+reelInstance.heightBySqureOfMask
				){
					return
				}
				if(element.y != reelInstance.startHeightElement+reelInstance.heightBySqureOfMask*2){
					element.y-=2
				} else {
					reelInstance.isStopped1 = true
					reelInstance.arrCheckLines[0][0] = reelInstance.reelstrip1[(reelInstance.reelcontinue1+2)%reelInstance.reelstrip1.length]
					reelInstance.arrCheckLines[1][0] = reelInstance.reelstrip1[(reelInstance.reelcontinue1+3)%reelInstance.reelstrip1.length]
					reelInstance.arrCheckLines[2][0] = reelInstance.reelstrip1[(reelInstance.reelcontinue1+4)%reelInstance.reelstrip1.length]
					state1 = false
					reelInstance.ticker1.stop()					
				}
			}
		})
	})
	reelInstance.ticker1.start()


	
	reelInstance.ticker2.add(()=>{
		renderer.render(stage)
		reelInstance.reelElements2.forEach(element => {
			if(isSpin2){
				element.y+=24
				if(element.y >= reelInstance.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[reelInstance.reelstrip2[reelInstance.reelcontinue2%reelInstance.reelstrip2.length]]
					if(reelInstance.reelcontinue2 === 0){
						reelInstance.reelcontinue2 = reelInstance.reelstrip2.length-1
					} else {
						reelInstance.reelcontinue2--
					}
					let diffWidth = (element.width - reelInstance.widthBySqureOfMask)/2
					element.position.set(reelInstance.startWidthElement+reelInstance.widthBySqureOfMask+10-diffWidth, reelInstance.startHeightElement- reelInstance.heightBySqureOfMask)
        		}
				 setTimeout(()=>{
					isSpin2 = false
				}, 1615)
			} else if(changepos2) {
				if(element.y >= reelInstance.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[reelInstance.reelstrip2[reelInstance.reelcontinue2%reelInstance.reelstrip2.length]]
					if(reelInstance.reelcontinue2 === 0){
						reelInstance.reelcontinue2 = reelInstance.reelstrip2.length-1
					} else {
						reelInstance.reelcontinue2--
					}
					let diffWidth = (element.width - reelInstance.widthBySqureOfMask)/2
					element.position.set(reelInstance.startWidthElement+reelInstance.widthBySqureOfMask+10-diffWidth, reelInstance.startHeightElement- reelInstance.heightBySqureOfMask)
        		}
				if(element.y == reelInstance.startHeightElement-reelInstance.heightBySqureOfMask+22 ||
					element.y == reelInstance.startHeightElement+22 ||
					element.y == reelInstance.startHeightElement+reelInstance.heightBySqureOfMask+22 
				){
					return
				}
				if(element.y != reelInstance.startHeightElement+reelInstance.heightBySqureOfMask*2+22){
					element.y+=2
				} else {
					state2 = true
					changepos2 = false
				}
			} else if(state2) {
				if(element.y == reelInstance.startHeightElement-reelInstance.heightBySqureOfMask ||
					element.y == reelInstance.startHeightElement ||
					element.y == reelInstance.startHeightElement+reelInstance.heightBySqureOfMask
				){
					return
				}
				if(element.y != reelInstance.startHeightElement+reelInstance.heightBySqureOfMask*2){
					element.y-=2
				} else {
					reelInstance.arrCheckLines[0][1] = reelInstance.reelstrip2[(reelInstance.reelcontinue2+2)%reelInstance.reelstrip2.length]
					reelInstance.arrCheckLines[1][1] = reelInstance.reelstrip2[(reelInstance.reelcontinue2+3)%reelInstance.reelstrip2.length]
					reelInstance.arrCheckLines[2][1] = reelInstance.reelstrip2[(reelInstance.reelcontinue2+4)%reelInstance.reelstrip2.length]
					reelInstance.isStopped2 = true
					reelInstance.ticker2.stop()
					state2 = false
				}
			}
		})
	})
	reelInstance.ticker2.start()

	reelInstance.ticker3.add(()=>{
		renderer.render(stage)
		reelInstance.reelElements3.forEach(element => {
			if(isSpin3){
				element.y+=24
				if(element.y >= reelInstance.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[reelInstance.reelstrip3[reelInstance.reelcontinue3%reelInstance.reelstrip3.length]]
					if(reelInstance.reelcontinue3 === 0){
						reelInstance.reelcontinue3 = reelInstance.reelstrip3.length-1
					} else {
						reelInstance.reelcontinue3--
					}
					let diffWidth = (element.width - reelInstance.widthBySqureOfMask)/2
					element.position.set(reelInstance.startWidthElement+(reelInstance.widthBySqureOfMask+10)*2-diffWidth, reelInstance.startHeightElement- reelInstance.heightBySqureOfMask )
        		} setTimeout(()=>{
					isSpin3 = false
				}, 1965)
			} else if(changepos3) {
				if(element.y >= reelInstance.startHeightElement + elementHeight * 3) {
            		element.texture = reelElementsTexture[reelInstance.reelstrip3[reelInstance.reelcontinue3%reelInstance.reelstrip3.length]]
					if(reelInstance.reelcontinue3 === 0){
						reelInstance.reelcontinue3 = reelInstance.reelstrip3.length-1
					} else {
						reelInstance.reelcontinue3--
					}
					let diffWidth = (element.width - reelInstance.widthBySqureOfMask)/2
					element.position.set(reelInstance.startWidthElement+(reelInstance.widthBySqureOfMask+10)*2-diffWidth, reelInstance.startHeightElement- reelInstance.heightBySqureOfMask )
        		}
				if(element.y == reelInstance.startHeightElement-reelInstance.heightBySqureOfMask+30 ||
					element.y == reelInstance.startHeightElement+30 ||
					element.y == reelInstance.startHeightElement+reelInstance.heightBySqureOfMask+30 
				){
					return
				}
				if(element.y != reelInstance.startHeightElement+reelInstance.heightBySqureOfMask*2+30){
					element.y+=2
				} else {
					state3 = true
					changepos3 = false
				}
			} else if(state3) {
				if(element.y == reelInstance.startHeightElement-reelInstance.heightBySqureOfMask ||
					element.y == reelInstance.startHeightElement ||
					element.y == reelInstance.startHeightElement+reelInstance.heightBySqureOfMask
				){
					return
				}
				if(element.y != reelInstance.startHeightElement+reelInstance.heightBySqureOfMask*2){
					element.y-=2
				} else {
					reelInstance.isStopped3 = true
					reelInstance.arrCheckLines[0][2] = reelInstance.reelstrip3[(reelInstance.reelcontinue3+2)%reelInstance.reelstrip3.length]
					reelInstance.arrCheckLines[1][2] = reelInstance.reelstrip3[(reelInstance.reelcontinue3+3)%reelInstance.reelstrip3.length]
					reelInstance.arrCheckLines[2][2] = reelInstance.reelstrip3[(reelInstance.reelcontinue3+4)%reelInstance.reelstrip3.length]
					state3 = false
					reelInstance.ticker3.stop()
				}
			}
		})
	})
	reelInstance.ticker3.start()
    const checkAllStopped = () => {
        if(reelInstance.isStopped1 && reelInstance.isStopped2 && reelInstance.isStopped3) {
            reelInstance.checkWin()
        } else {
            setTimeout(checkAllStopped, 100)
        }
    }
    
    setTimeout(checkAllStopped, 100)
    return true
}