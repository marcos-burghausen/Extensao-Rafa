import { type QuickPickItem, window as codeWindow } from 'vscode';
import {
  capitalizeFirstLetter,
  getMaterialIconsJSON,
  setThemeConfig,
} from '../helpers';
import { translate } from '../i18n';
import { folderIcons } from '../icons';

/** Command to toggle the folder icons. */
export const changeFolderTheme = async () => {
  try {
    const status = getFolderIconTheme();
    const response = await showQuickPickItems(status);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    console.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the folder icons. */
const showQuickPickItems = (activeTheme: string) => {
  const options = folderIcons.map(
    (theme): QuickPickItem => ({
      label: `${theme.name === activeTheme ? '\u2714' : '    '} ${capitalizeFirstLetter(theme.name)}    ${theme.name === 'none' ? translate('folders.disabled') : translate('folders.theme.description', capitalizeFirstLetter(theme.name))}`,
    })
  );

  return codeWindow.showQuickPick(options, {
    placeHolder: translate('folders.toggleIcons'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: QuickPickItem) => {
  if (!value?.label) return;
  const labelContent = value.label.trim();
  const selectedTheme = folderIcons.find((theme) =>
    labelContent.includes(capitalizeFirstLetter(theme.name))
  );

  if (selectedTheme) {
    return setThemeConfig(
      'folders.theme',
      selectedTheme.name.toLowerCase(),
      true
    );
  }
};

/** Get the current folder theme. */
export const getFolderIconTheme = (): string => {
  return getMaterialIconsJSON()?.options?.folders?.theme ?? '';
};
