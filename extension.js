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
	console.log('Congratulations, your extension "cursorhop" is now active!');

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


	context.subscriptions.push(uphop);
	context.subscriptions.push(uphopSelect);
	context.subscriptions.push(downhop);
	context.subscriptions.push(downhopSelect);
}

function up (select) {
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
//		vscode.window.showInformationMessage('Hello World from CursorHop!');
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		cursor_position  = editor.selection.active;
		visible_top_position = editor.visibleRanges[0].start;
		visible_bottom_position = editor.visibleRanges[0].end;
		cursor_offset = cursor_position.character;
		cursor_line = cursor_position.line;
		first_line = visible_top_position.line;
		bottom_line = visible_bottom_position.line;
		middle_line = Math.trunc(first_line + (bottom_line - first_line) / 2);
		if (cursor_offset != 0) {
			if (select)
				vscode.commands.executeCommand('cursorHomeSelect');
			else
			    vscode.commands.executeCommand('cursorHome');
			return;
		}
		if (bottom_line - first_line < 5) {
			return;
		}
		if (cursor_line > middle_line) {
			vscode.commands.executeCommand('cursorMove', {to: "up",
														  by: "line",
														  value: cursor_line - middle_line,
														  select:select});
//				vscode.commands.executeCommand('cursorMove', {to: 'viewPortCenter'});
			console.log('Executou1', cursor_line, middle_line, cursor_offset);
		}
		else if (cursor_line > first_line + 5) {
			vscode.commands.executeCommand('cursorMove', {to: "up",
														  by: "line",
														  value: cursor_line - first_line - 5,
														  select:select});
//				vscode.commands.executeCommand('cursorMove', {to: 'viewPortTop'});
			console.log('Executou2', cursor_line, first_line, cursor_offset);
		}
	}
}

function down (select) {
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
//		vscode.window.showInformationMessage('Hello World from CursorHop!');
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		cursor_position  = editor.selection.active;
		visible_top_position = editor.visibleRanges[0].start;
		visible_bottom_position = editor.visibleRanges[0].end;
		cursor_offset = cursor_position.character;
		cursor_line = cursor_position.line;
		first_line = visible_top_position.line;
		bottom_line = visible_bottom_position.line;
		middle_line = Math.trunc(first_line + (bottom_line - first_line) / 2);
		last_char_offset = editor.document.lineAt(cursor_position).range.end.character
		if (last_char_offset != cursor_offset) {
			vscode.commands.executeCommand('cursorMove', {to: "right",
				by: "character",
				value: last_char_offset - cursor_offset,
				select:select});
			return;
		}
		if (bottom_line - first_line < 5) {
			return;
		}
		if (cursor_line < middle_line) {
			vscode.commands.executeCommand('cursorMove', {to: "down",
														  by: "line",
														  value: middle_line - cursor_line,
														  select:select});
//				vscode.commands.executeCommand('cursorMove', {to: 'viewPortCenter'});
			console.log('Executou2', cursor_line, middle_line);
		}
		else if (cursor_line < bottom_line - 1) {
			vscode.commands.executeCommand('cursorMove', {to: "down",
														  by: "line",
														  value: bottom_line - cursor_line - 1,
														  select:select});
//				vscode.commands.executeCommand('cursorMove', {to: 'viewPortTop'});
			console.log('Executou4', bottom_line, cursor_line);
		}
	}
}


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
