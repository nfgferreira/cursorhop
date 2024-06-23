# CursorHop Home/End extender

## Features

CursorHop comes with four functions that extend the way that the stock Home and End keys work in VS Code. It also comes with functions that allow to move the line under the cursor to the top, middle and bottom of the screen.

The "Cursor Up" function works this way:
 - If the cursor is not at the beginning of the line, the VS Code function _cursorHome_ is called. That leads the cursor to the line's farthest non-blank character at its left if there is one. If all the characters at the left of the cursor are non-blank, the cursor goes to the beginning of the line. That is what you get from the VS Code when you are not using the extension.
 - If the cursor is at the beginning of a line below the middle of the window, the cursor goes to the beginning of the middle line.
 - If the cursor is at the beginning of the middle line or on any line above that and below the 5th line, it goes to the beginning of the 5th line.

The "Cursor Down" works similarly. The functions "Cursor Up Select" and "Cursor Down Select" work the same except the whole area traversed by the cursor is selected.

Functions "Cursor position on top/center/bottom" move the line with the cursor at the respective positions on the screen.

The following keybindings are implemented. The first 4 keybindings replace the stock cursorHome, cursorEnd, cursorHomeSelect and cursorEndSelect.

 |Command | Keybinding | When |
 |--------|------------|------|
 | cursorhop.uphop | Home | textInputFocus |
 | cursorhop.downhop | End | textInputFocus |
 | cursorhop.uphopSelect | Shift + Home | textInputFocus |
 | cursorhop.downhopSelect | Shift + End | textInputFocus |
 | cursorhop.cursorAtTop | Ctrl + Shift + / t | textInputFocus |
 | cursorhop.cursorAtBottom | Ctrl + Shift + / b | textInputFocus |
 | cursorhop.cursorInCenter | Ctrl + Shift + / z | textInputFocus |


