// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ImageMin from './ImageMin';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.imagemin',
    async (node, nodes) => {
      if (!node && (!nodes || nodes.length === 0)) {
        return;
      }
      let inputs = [];
      if (nodes && nodes.length) {
        // multi select
        inputs = nodes.map((_node: any) => _node.path);
      } else {
        inputs = [node.path];
      }
      const outputChannel = vscode.window.createOutputChannel('imagemin');
      const replaceOriginImage = vscode.workspace
        .getConfiguration()
        .get<boolean>('imagemin.replaceOriginImage');

      const imagemin = new ImageMin(inputs, outputChannel, {
        replaceOriginImage
      });
      await imagemin.process();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
