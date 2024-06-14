// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('CursorHop is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const uphop = vscode.commands.registerCommand('cursorhop.uphop', function () {
        up(false);
	});

	const uphopSelect = vscode.commands.registerCommand('cursorhop.uphopSelect', function () {
        up(true);
	});

	const downhop = vscode.commands.registerCommand('cursorhop.downhop', function () {
        down(false);
	});

	const downhopSelect = vscode.commands.registerCommand('cursorhop.downhopSelect', function () {
        down(true);
	});

	const cursorAtTop = vscode.commands.registerCommand('cursorhop.cursorAtTop', function () {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
			cursor = editor.selection.active;
			vscode.commands.executeCommand('revealLine', {at: 'top', lineNumber: cursor.line});

//			editor.revealRange(new vscode.Range(editor.selection.active, editor.selection.active),
//                vscode.TextEditorRevealType.AtTop);
//			// Make sure xthe cursor is visible (that may not be the case if we have a wrapped line or code folding)
//			cursor = editor.selection.active;
//			editor.revealRange(new vscode.Range(cursor, cursor),
//                vscode.TextEditorRevealType.Default);
        }
	});

	const cursorAtBottom = vscode.commands.registerCommand('cursorhop.cursorAtBottom', function () {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
			cursor = editor.selection.active;
			vscode.commands.executeCommand('revealLine', {at: 'bottom', lineNumber: cursor.line});


//            length = editor.visibleRanges[0].end.line - editor.visibleRanges[0].start.line;
//			newTopLine = editor.selection.active.line - length + 5;
//			if (newTopLine < 0) newTopLine = 0;
//            start = editor.document.validatePosition(
//                new vscode.Position(newTopLine, editor.selection.active.character));
//            editor.revealRange(new vscode.Range(start, editor.selection.active));
//			// Make sure xthe cursor is visible (that may not be the case if we have a wrapped line or code folding)
//			cursor = editor.selection.active;
//			editor.revealRange(new vscode.Range(cursor, cursor),
//                vscode.TextEditorRevealType.Default);
        }
	});

	const cursorInCenter = vscode.commands.registerCommand('cursorhop.cursorInCenter', function () {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
			cursor = editor.selection.active;
			vscode.commands.executeCommand('revealLine', {at: 'center', lineNumber: cursor.line});


//			range = editor.selection.active;
//			start = editor.document.validatePosition(
//                new vscode.Position(range.line + 3, editor.selection.active.character));
//			editor.revealRange(new vscode.Range(start, start),
//                vscode.TextEditorRevealType.InCenter);
//			// Make sure xthe cursor is visible (that may not be the case if we have a wrapped line or code folding)
//			cursor = editor.selection.active;
//			editor.revealRange(new vscode.Range(cursor, cursor),
//                vscode.TextEditorRevealType.Default);
        }
	});

	context.subscriptions.push(uphop);
	context.subscriptions.push(uphopSelect);
	context.subscriptions.push(downhop);
	context.subscriptions.push(downhopSelect);
	context.subscriptions.push(cursorAtTop);
	context.subscriptions.push(cursorAtBottom);
	context.subscriptions.push(cursorInCenter);
}

function up (select) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		position  = editor.selection.active;
		topPosition = editor.visibleRanges[0].start;
		bottomPosition = editor.visibleRanges[0].end;
		offset = position.character;
		line = position.line;
		firstLine = topPosition.line;
		bottomLine = bottomPosition.line;
		middleLine = Math.trunc(firstLine + (bottomLine - firstLine) / 2);
		if (offset != 0) {
			if (select)
				vscode.commands.executeCommand('cursorHomeSelect');
			else
			    vscode.commands.executeCommand('cursorHome');
			return;
		}
		if (bottomLine - firstLine < 5) {
			return;
		}
		if (line > middleLine) {
			vscode.commands.executeCommand('cursorMove', {to: "up",
														  by: "line",
														  value: line - middleLine,
														  select:select});
		}
		else if (line > firstLine + 5) {
			vscode.commands.executeCommand('cursorMove', {to: "up",
														  by: "line",
														  value: line - firstLine - 5,
														  select:select});
		}
	}
}

function down (select) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		position  = editor.selection.active;
		topPosition = editor.visibleRanges[0].start;
		bottomPosition = editor.visibleRanges[0].end;
		offset = position.character;
		line = position.line;
		firstLine = topPosition.line;
		bottomLine = bottomPosition.line;
		middleLine = Math.trunc(firstLine + (bottomLine - firstLine) / 2);
		lastCharOffset = editor.document.lineAt(position).range.end.character
		if (lastCharOffset != offset) {
			if (select)
				vscode.commands.executeCommand('cursorEndSelect');
			else
			    vscode.commands.executeCommand('cursorEnd');
			return;
		}
		if (bottomLine - firstLine < 5) {
			return;
		}
		if (line < middleLine) {
			vscode.commands.executeCommand('cursorMove', {to: "down",
														  by: "line",
														  value: middleLine - line,
														  select:select});
			if (select)
				vscode.commands.executeCommand('cursorEndSelect');
			else
				vscode.commands.executeCommand('cursorEnd');
		}

		else if (line < bottomLine - 1) {
			vscode.commands.executeCommand('cursorMove', {to: "down",
														  by: "line",
														  value: bottomLine - line - 1,
														  select:select});
			if (select)
				vscode.commands.executeCommand('cursorEndSelect');
			else
				vscode.commands.executeCommand('cursorEnd');
		}
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
