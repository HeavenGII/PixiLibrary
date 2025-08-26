function checkWin(reelInstance) {
    const PAYOUTS = [40, 20, 16, 16, 2, 2, 2, 2, 50];
    const winLines = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
        [0, 1, 2], 
        [2, 1, 0] 
    ]

    let totalWin = 0
    reelInstance.isButtonLocked = true

    winLines.forEach(line => {
        const [row1, row2, row3] = line
        const symbol1 = reelInstance.arrCheckLines[row1][0]
        const symbol2 = reelInstance.arrCheckLines[row2][1]
        const symbol3 = reelInstance.arrCheckLines[row3][2]

        if (symbol1 === symbol2 && symbol1 === symbol3) {
            const winningSymbol = symbol1            
            totalWin += PAYOUTS[winningSymbol]

            const yPositions = [
                reelInstance.startHeightElement + reelInstance.heightBySqureOfMask * row1,
                reelInstance.startHeightElement + reelInstance.heightBySqureOfMask * row2,
                reelInstance.startHeightElement + reelInstance.heightBySqureOfMask * row3
            ]

            const animElements = [
                reelInstance.reelElements1.find(el => Math.abs(el.y - yPositions[0]) < 5),
                reelInstance.reelElements2.find(el => Math.abs(el.y - yPositions[1]) < 5),
                reelInstance.reelElements3.find(el => Math.abs(el.y - yPositions[2]) < 5)
            ]

            const animations = []
            animElements.forEach((element) => {
                if (element) {
                    animations.push(reelInstance.createAnimation(element, winningSymbol))
                } else {
                    animations.push(null)
                }
            })

            const animTicker = new PIXI.ticker.Ticker()
            animTicker.add(() => {
                renderer.render(stage)
            })
            animTicker.start()

            setTimeout(() => {
                animations.forEach((anim, index) => {
                    if (anim) {
                        reelInstance.removeAnimation(anim, animElements[index])
                    }
                })
                reelInstance.isButtonLocked = false
                animTicker.stop()
            }, 4300)
        }
    })

    if (totalWin === 0) {
        reelInstance.isButtonLocked = false
    }

    reelInstance.isStopped1 = false
    reelInstance.isStopped2 = false
    reelInstance.isStopped3 = false
    
    checkPay(reelInstance, totalWin)
}