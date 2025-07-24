Chapter 4: Text, BitmapText, Bitmapfonts, Graphic tool
(Reuse game.html, game.css and all js files from the previous chapter)

Task:
1. Add the bitmap font (win_font in the images folder) in the loader
2. Add a logo (Sprite) which is always shown above the reels except during the win animation
3. Add a paytable (Container which contains Sprite for paytable.png and Text) where the values of the paytable below are shown
4. Add a winpanel (Container which contains Sprite for wfd.png and BitmapText) which is shown above the reels during the win animation
5. Add four winlines to the existing one (winlines see below) which are also checked
   Play the symbol animations in the winlines one after the other until the start button is pressed and the next game is starting
6. If a win occurs play a count up animation for the win, hide winpanel when count up is finished or start button is pressed
7. Prepare the bitmap font (win_font.png & win_font.fnt) so that all numbers have the same width (see Bitmap Font.pdf) 
   You can compare with the win_font in /bitmap font
   You can use any graphic tool with what you are familiar like Gimp or Photoshop
8. Replace the old bitmap font with the new one in the loader and check the difference

Watch demo4.mp4 to see how the result should look like!

Resources:
All necessary graphics are in the images folder

Tools: Graphic tool like Gimp or Photoshop

Paytable:
Seven: 	40
Bar:	20
Melon:	16
Grapes:	16
Plum:	 2
Orange:	 2
Lemon:	 2
Cherry:	 2
Star:	50

Winlines:
Line 1: xxx
	ooo
	xxx

Line 2: ooo
	xxx
	xxx

Line 3: xxx
	xxx
	ooo

Line 4: oxx
	xox
	xxo

Line 5: xxo
	xox
	oxx