function checkPay(reelInstance, totalWin){
if(totalWin != 0) {
        payline.visible = true
        
        if (!reelInstance.winText) {
            reelInstance.winText = new PIXI.extras.BitmapText('0', {
                font: '50px win_font',
                align: 'center'
            })
            reelInstance.winText.position.set(reelInstance.bgr.width - 100, 50)
            reelInstance.addChild(reelInstance.winText)
        }
        
        reelInstance.winText.visible = true
        reelInstance.winText.text = '0'
        
        let currentWin = 0
        let countingUp = true
        let lastUpdateTime = 0
        const updateInterval = 30
        let maxValueShown = false

        reelInstance.winTicker = new PIXI.ticker.Ticker()
        reelInstance.winTicker.add(() => {
            const now = Date.now()
            
            if (now - lastUpdateTime < updateInterval) return
            lastUpdateTime = now
            
            if (countingUp) {
                if (currentWin < totalWin) {
                    currentWin += 1
                    reelInstance.winText.text = currentWin.toString()
                } else {
                    if (!maxValueShown) {
                        reelInstance.winText.text = totalWin.toString()
                        maxValueShown = true
                        
                        setTimeout(() => {
                            countingUp = false;
                        }, 500)
                    }
                }
            } 
            else if (countingUp === false) {
                currentWin -= 1
                if (currentWin <= 0) {
                    currentWin = 0
                    countingUp = null     
                    reelInstance.winText.visible = false
                    reelInstance.winTicker.stop()
                }
                reelInstance.winText.text = currentWin.toString()
            }
        })
        
        reelInstance.winTicker.start()
        
        setTimeout(() => {
            payline.visible = false
        }, 2000)
    }
}