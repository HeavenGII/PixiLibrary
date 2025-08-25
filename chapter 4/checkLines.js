function checkWin(reelInstance){
    const PAYOUTS = [40, 20, 16, 16, 2, 2, 2, 2, 50]
    let totalWin = 0

    reelInstance.isButtonLocked = true
        //(ooo / xxx / xxx)
    if (reelInstance.arrCheckLines[0][0] === reelInstance.arrCheckLines[0][1] && 
             reelInstance.arrCheckLines[0][0] === reelInstance.arrCheckLines[0][2]) {
        
        const winningSymbol = reelInstance.arrCheckLines[0][0]
        console.log('Winning combination on top line with:', symbolAnimations[winningSymbol].name)
        
        totalWin += PAYOUTS[winningSymbol]

        const topY = reelInstance.startHeightElement
        

        const anim1Element = reelInstance.reelElements1.find(el => Math.abs(el.y - topY) < 5)
        const anim2Element = reelInstance.reelElements2.find(el => Math.abs(el.y - topY) < 5)
        const anim3Element = reelInstance.reelElements3.find(el => Math.abs(el.y - topY) < 5)

        const anim1 = reelInstance.createAnimation(anim1Element, winningSymbol)
        const anim2 = reelInstance.createAnimation(anim2Element, winningSymbol)
        const anim3 = reelInstance.createAnimation(anim3Element, winningSymbol)

        if (anim1 && anim2 && anim3) {
            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)
            })
            animTicker.start()

            setTimeout(() => {
                reelInstance.removeAnimation(anim1, anim1Element)
                reelInstance.removeAnimation(anim2, anim2Element)
                reelInstance.removeAnimation(anim3, anim3Element)
                reelInstance.isButtonLocked = false
                animTicker.stop()

            }, 4300)
        }
    }
    //(xxx / ooo / xxx)
    else if (reelInstance.arrCheckLines[1][0] === reelInstance.arrCheckLines[1][1] && 
        reelInstance.arrCheckLines[1][0] === reelInstance.arrCheckLines[1][2]) {
        
        const winningSymbol = reelInstance.arrCheckLines[1][0]
        console.log('Winning combination on middle line with:', symbolAnimations[winningSymbol].name)

        totalWin += PAYOUTS[winningSymbol];

        const centerY = reelInstance.startHeightElement + reelInstance.heightBySqureOfMask

        const anim1Element = reelInstance.reelElements1.find(el => Math.abs(el.y - centerY) < 5)
        const anim2Element = reelInstance.reelElements2.find(el => Math.abs(el.y - centerY) < 5)
        const anim3Element = reelInstance.reelElements3.find(el => Math.abs(el.y - centerY) < 5)

        const anim1 = reelInstance.createAnimation(anim1Element, winningSymbol)
        const anim2 = reelInstance.createAnimation(anim2Element, winningSymbol)
        const anim3 = reelInstance.createAnimation(anim3Element, winningSymbol)

        if (anim1 && anim2 && anim3) {
            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)
            })
            animTicker.start()

            setTimeout(() => {
                reelInstance.removeAnimation(anim1, anim1Element)
                reelInstance.removeAnimation(anim2, anim2Element)
                reelInstance.removeAnimation(anim3, anim3Element)
                reelInstance.isButtonLocked = false
                animTicker.stop()
            }, 4300)
        }
    }
    //(xxx / xxx / ooo)
    else if (reelInstance.arrCheckLines[2][0] === reelInstance.arrCheckLines[2][1] && 
             reelInstance.arrCheckLines[2][0] === reelInstance.arrCheckLines[2][2]) {
        
        const winningSymbol = reelInstance.arrCheckLines[2][0]
        console.log('Winning combination on bottom line with:', symbolAnimations[winningSymbol].name)

        totalWin += PAYOUTS[winningSymbol]

        const bottomY = reelInstance.startHeightElement + reelInstance.heightBySqureOfMask * 2

        const anim1Element = reelInstance.reelElements1.find(el => Math.abs(el.y - bottomY) < 5)
        const anim2Element = reelInstance.reelElements2.find(el => Math.abs(el.y - bottomY) < 5)
        const anim3Element = reelInstance.reelElements3.find(el => Math.abs(el.y - bottomY) < 5)

        const anim1 = reelInstance.createAnimation(anim1Element, winningSymbol)
        const anim2 = reelInstance.createAnimation(anim2Element, winningSymbol)
        const anim3 = reelInstance.createAnimation(anim3Element, winningSymbol)

        if (anim1 && anim2 && anim3) {
            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)
            })
            animTicker.start()

            setTimeout(() => {
                reelInstance.removeAnimation(anim1, anim1Element)
                reelInstance.removeAnimation(anim2, anim2Element)
                reelInstance.removeAnimation(anim3, anim3Element)
                console.log('button check')
                reelInstance.isButtonLocked = false
                console.log('button false')
                animTicker.stop()
            }, 4300)
        }
    }
    //(oxx / xox / xxo)
    else if (reelInstance.arrCheckLines[0][0] === reelInstance.arrCheckLines[1][1] && 
             reelInstance.arrCheckLines[0][0] === reelInstance.arrCheckLines[2][2]) {
        
        const winningSymbol = reelInstance.arrCheckLines[0][0]
        console.log('Winning combination on diagonal \\ with:', symbolAnimations[winningSymbol].name)

        totalWin += PAYOUTS[winningSymbol]

        const topLeftY = reelInstance.startHeightElement;
        const anim1Element = reelInstance.reelElements1.find(el => Math.abs(el.y - topLeftY) < 5)
        
        const centerY = reelInstance.startHeightElement + reelInstance.heightBySqureOfMask
        const anim2Element = reelInstance.reelElements2.find(el => Math.abs(el.y - centerY) < 5)
        

        const bottomRightY = reelInstance.startHeightElement + reelInstance.heightBySqureOfMask * 2
        const anim3Element = reelInstance.reelElements3.find(el => Math.abs(el.y - bottomRightY) < 5)

        const anim1 = reelInstance.createAnimation(anim1Element, winningSymbol)
        const anim2 = reelInstance.createAnimation(anim2Element, winningSymbol)
        const anim3 = reelInstance.createAnimation(anim3Element, winningSymbol)

        if (anim1 && anim2 && anim3) {
            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)
            })
            animTicker.start()

            setTimeout(() => {
                reelInstance.removeAnimation(anim1, anim1Element)
                reelInstance.removeAnimation(anim2, anim2Element)
                reelInstance.removeAnimation(anim3, anim3Element)
                reelInstance.isButtonLocked = false
                animTicker.stop()
            }, 3000)
        }
    }
    //(xxo / xox / oxx)
    else if (reelInstance.arrCheckLines[2][0] === reelInstance.arrCheckLines[1][1] && 
             reelInstance.arrCheckLines[2][0] === reelInstance.arrCheckLines[0][2]) {
        
        const winningSymbol = reelInstance.arrCheckLines[2][0]
        console.log('Winning combination on diagonal / with:', symbolAnimations[winningSymbol].name)

        totalWin += PAYOUTS[winningSymbol];

        const bottomLeftY = reelInstance.startHeightElement + reelInstance.heightBySqureOfMask * 2
        const anim1Element = reelInstance.reelElements1.find(el => Math.abs(el.y - bottomLeftY) < 5)
        
        const centerY = reelInstance.startHeightElement + reelInstance.heightBySqureOfMask;
        const anim2Element = reelInstance.reelElements2.find(el => Math.abs(el.y - centerY) < 5)
        
        const topRightY = reelInstance.startHeightElement
        const anim3Element = reelInstance.reelElements3.find(el => Math.abs(el.y - topRightY) < 5)

        const anim1 = reelInstance.createAnimation(anim1Element, winningSymbol)
        const anim2 = reelInstance.createAnimation(anim2Element, winningSymbol)
        const anim3 = reelInstance.createAnimation(anim3Element, winningSymbol)

        if (anim1 && anim2 && anim3) {
            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)

            });
            animTicker.start()

            setTimeout(() => {
                reelInstance.removeAnimation(anim1, anim1Element)
                reelInstance.removeAnimation(anim2, anim2Element)
                reelInstance.removeAnimation(anim3, anim3Element)
                reelInstance.isButtonLocked = false
                animTicker.stop()

            }, 4300)
        } 
    } 
    if(totalWin== 0){
        reelInstance.isButtonLocked = false
    }

    reelInstance.isStopped1 = false
    reelInstance.isStopped2 = false
    reelInstance.isStopped3 = false
    checkPay(reelInstance, totalWin)
}