import { type QuickPickItem, window as codeWindow } from 'vscode';
import { getMaterialIconsJSON, setThemeConfig } from '../helpers';
import { translate } from '../i18n';

/** Command to toggle the explorer arrows. */
export const toggleExplorerArrows = async () => {
  try {
    const status = checkArrowStatus();
    const response = await showQuickPickItems(status);
    return handleQuickPickActions(response);
  } catch (error) {
    console.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the explorer arrows. */
const showQuickPickItems = (
  status: boolean
): Thenable<QuickPickItem | undefined> => {
  const on: QuickPickItem = {
    label: `${!status ? '\u2714 ' : '    '} ${translate('toggleSwitch.on')} - ${translate('explorerArrows.enable')}`,
  };

  const off: QuickPickItem = {
    label: `${status ? '\u2714 ' : '    '} ${translate('toggleSwitch.off')} - ${translate('explorerArrows.disable')}`,
  };

  return codeWindow.showQuickPick([on, off], {
    placeHolder: translate('explorerArrows.toggle'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: QuickPickItem | undefined) => {
  if (!value?.label) return;
  const labelContent = value.label.trim();
  if (labelContent.includes(translate('toggleSwitch.on'))) {
    return setThemeConfig('hidesExplorerArrows', false, true);
  } else if (labelContent.includes(translate('toggleSwitch.off'))) {
    return setThemeConfig('hidesExplorerArrows', true, true);
  }
};

/** Check if arrows are enabled. */
export const checkArrowStatus = (): boolean => {
  return !!getMaterialIconsJSON()?.hidesExplorerArrows;
};
