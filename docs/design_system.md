The visual design system for the Hangman game ensures a cohesive and engaging user experience. It incorporates consistent use of structural components, a defined color palette, and carefully chosen fonts and sizes.

1. Structural / Recurring Components
   1.1 Headers

Description: The header includes the game title.
Placement: Positioned at the top of the game container.
Style:
Font Size: 2.5rem
Font Weight: Bold
Color: #0481a0
Margin: 20px 0
1.2 Footers

Description: Instructions are placed at the bottom of the game container.
Placement: Positioned below the canvas.
Style:
Font Size: 1rem
Color: #333
Margin: 20px 0
1.3 Scoreboard

Description: Displays the wrong letters guessed.
Placement: Below the word display.
Style:
Font Size: 1rem
Color: #ff4c4c
Margin: 20px 0
1.4 Play Area

Description: Contains the word to guess, the hangman canvas, and the wrong letters.
Placement: Center of the game container.
Style:
Text Align: Center
Background Color: #ffffff
Padding: 30px
Border Radius: 15px
Box Shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
Max Width: 500px
Width: 100%
1.5 Popups

Description: Notification for duplicate letters and end game popup.
Placement: Fixed in the center of the screen for end game, below the wrong letters container for notifications.
Style:
Notification:
Display: None (shown when needed)
Background Color: #ffeb3b
Padding: 10px
Margin: 10px 0
Border Radius: 5px
Color: #333

Popup:

Display: None (shown when needed)
Position: Fixed
Top: 0
Left: 0
Width: 100%
Height: 100%
Background Color: rgba(0, 0, 0, 0.7)
Display: Flex
Justify Content: Center
Align Items: Center
Inner Popup:
Background Color: #ffffff
Padding: 30px
Text Align: Center 2. Color Palette
Primary Color: #0481a0 (used for headings, borders, and buttons)
Secondary Color: #2bbfd1 (used in the background gradient)
Error Color: #ff4c4c (used for wrong letters)
Notification Color: #ffeb3b (used for notifications)
Background Color: #ffffff (used for the main game container and popup)
Text Color: #333 (used for general text) 3. Fonts / Sizes
Primary Font: 'Arial', sans-serif
Heading Font Size: 2.5rem
Text Font Size: 1rem
Letter Font Size: 2rem
Notification Font Size: 1rem
Popup Font Size: 1.5rem
