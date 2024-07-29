
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "rafa-oficial" is now active!');

	const disposable = vscode.commands.registerCommand('rafa-oficial.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Rafa-Oficial!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
