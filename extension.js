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
	console.log('CursorHop is active.');

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
        }
	});

	const cursorAtBottom = vscode.commands.registerCommand('cursorhop.cursorAtBottom', function () {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
			vr = editor.visibleRanges;
			cursor = editor.selection.active;
			vscode.commands.executeCommand('revealLine', {at: 'bottom', lineNumber: cursor.line});
        }
	});

	const cursorInCenter = vscode.commands.registerCommand('cursorhop.cursorInCenter', function () {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
			cursor = editor.selection.active;
			vscode.commands.executeCommand('revealLine', {at: 'center', lineNumber: cursor.line});
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
	const editorConfig = vscode.workspace.getConfiguration('editor')
	const maxLineCount = 5;//editorConfig.stickyScroll.maxLineCount;

	if (editor) {
		position  = editor.selection.active;
		offset = position.character;
		if ((editor.selections.length > 1) || (offset != 0)) {
			if (select)
				vscode.commands.executeCommand('cursorHomeSelect');
			else
			    vscode.commands.executeCommand('cursorHome');
			return;
		}

		visibleRanges = editor.visibleRanges;
		visibleLines = calcVisibleLines(visibleRanges);

		if (visibleLines.length < maxLineCount) {
			return;
		}

		line = position.line;
		middleLineIndex = Math.trunc(visibleLines.length / 2);
		currentLineIndex = getCurrentLineIndex(line, visibleLines);

		if (currentLineIndex > middleLineIndex) {
			vscode.commands.executeCommand('cursorMove', {to: "up",
														  by: "line",
														  value: visibleLines[currentLineIndex] - visibleLines[middleLineIndex],
														  select:select});
		}
		else if (currentLineIndex > maxLineCount) {
			vscode.commands.executeCommand('cursorMove', {to: "up",
														  by: "line",
														  value: visibleLines[currentLineIndex - 5] - visibleLines[0],
														  select:select});
		}
	}
}

function down (select) {
	const editor = vscode.window.activeTextEditor;
	const editorConfig = vscode.workspace.getConfiguration('editor')
	const maxLineCount = editorConfig.stickyScroll.maxLineCount + 1;

	if (editor) {
		position  = editor.selection.active;
		offset = position.character;
		lastCharOffset = editor.document.lineAt(position).range.end.character
		if ((editor.selections.length > 1) || (lastCharOffset != offset)) {
			if (select)
				vscode.commands.executeCommand('cursorEndSelect');
			else
			    vscode.commands.executeCommand('cursorEnd');
			return;
		}

		visibleRanges = editor.visibleRanges;
		visibleLines = calcVisibleLines(visibleRanges);

		if (visibleLines.length < maxLineCount) {
			return;
		}

		line = position.line;
		middleLineIndex = Math.trunc(visibleLines.length / 2);
		currentLineIndex = getCurrentLineIndex(line, visibleLines);

		if (currentLineIndex < middleLineIndex) {
			vscode.commands.executeCommand('cursorMove', {to: "down",
														  by: "line",
														  value: visibleLines[middleLineIndex] - visibleLines[currentLineIndex],
														  select:select});
			if (select)
				vscode.commands.executeCommand('cursorEndSelect');
			else
				vscode.commands.executeCommand('cursorEnd');
		}

		else if (currentLineIndex < visibleLines.length - maxLineCount) {
			vscode.commands.executeCommand('cursorMove', {to: "down",
														  by: "line",
														  value: visibleLines[visibleLines.length - maxLineCount] - visibleLines[currentLineIndex],
														  select:select});
			if (select)
				vscode.commands.executeCommand('cursorEndSelect');
			else
				vscode.commands.executeCommand('cursorEnd');
		}
	}
}

function calcVisibleLines (visibleRanges) {
	var visibleLines = [];
	for (var i = 0; i < visibleRanges.length; i++) {
		for (var line = visibleRanges[i].start.line; line <= visibleRanges[i].end.line; line++)
			visibleLines.push(line);
	}
	return visibleLines;
}

function getCurrentLineIndex(line, visibleLines) {
	for (var i = 0; i < visibleLines.length; i++)
		if (visibleLines[i] == line)
			return i;
	return 0;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
