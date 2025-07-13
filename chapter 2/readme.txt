Chapter 2: Ticker, Interaction
(Reuse game.html, game.css, game.js, reel.js and pixi.4.3.2.js from chapter1)

Task:
Add 2 more reels (reel2, reel3) to the game and replace reels.png

Add addional functionality to the reel element:
 1. It should be possible to start and stop the spin (separate spin from render function and add/remove it from the ticker)
 2. The reel should stop at a defined position

Add a button element (make a new button.js file) which can be pressed.
You can either use PIXI.interaction or add a separate listener for the button
By pressing the button the following should happen:
 1. Button should change its state (btn_pressed.png)
 2. For each reel a random stop position should be generated
 3. The reels start to spin and each reel stops at the defined position
 4. After button is released button should change its state back (btn.png)

Watch demo2.mp4 to see how the result should look like!

Resources:
All necessary graphics are in the images folder

Reels 1: 
0 //Seven
1 //Bar
2 //Melon
3 //Grapes
4 //Plum
5 //Orange
6 //Lemon
7 //Cherry
8 //Star
0 //Seven
2 //Melon
4 //Plum
6 //Lemon
1 //Bar
3 //Grapes
5 //Orange
7 //Cherry
8 //Star

Reels 2: 
0 //Seven
1 //Bar
1 //Bar
2 //Melon
3 //Grapes
4 //Plum
6 //Lemon
6 //Lemon
7 //Cherry
8 //Star
0 //Seven
2 //Melon
4 //Plum

Reels 3: 
0 //Seven
0 //Seven
8 //Star
3 //Grapes
4 //Plum
5 //Orange
6 //Lemon
7 //Cherry
7 //Cherry
2 //Melon
4 //Plum
2 //Melon
6 //Lemon
1 //Bar
1 //Bar
3 //Grapes
5 //Orange
7 //Cherry
7 //Cherry
2 //Melon