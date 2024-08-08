import * as vscode from 'vscode';
import { getConfig } from '../helpers';
import { translate } from '../i18n';

/** Activate the icon theme by changing the settings for the iconTheme. */
export const activateIcons = () => {
  return setIconTheme();
};

/** Set the icon theme in the config. */
const setIconTheme = async () => {
  console.log('Rafa Theme: Activating icons');
  try {
    await vscode.workspace
      .getConfiguration()
      .update('workbench.iconTheme', 'rafa-icon-theme', true);
    console.log('Rafa Theme: Icon theme set globally');
    if (
      vscode.workspace.getConfiguration().inspect('workbench.iconTheme')
        ?.workspaceValue
    ) {
      console.log('Rafa Theme: Updating workspace icon theme');
      vscode.workspace
        .getConfiguration()
        .update('workbench.iconTheme', 'rafa-theme');
      console.log('Rafa Theme: Workspace icon theme updated');
    }
    vscode.window.showInformationMessage(translate('activated'));
  } catch (error) {
    console.error(error);
  }
};
