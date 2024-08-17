import { type QuickPickItem, window as codeWindow } from 'vscode';
import { getMaterialIconsJSON, setThemeConfig } from '../helpers';
import { translate } from '../i18n';

/** Command to toggle grayscale. */
export const toggleGrayscale = async () => {
  try {
    const status = checkGrayscaleStatus();
    const response = await showQuickPickItems(status);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    console.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for grayscale icons. */
const showQuickPickItems = (status: boolean) => {
  const on: QuickPickItem = {
    label: `${status ? '\u2714 ' : '     '}${translate('toggleSwitch.on')} - ${translate('grayscale.enable')}`,
  };
  const off: QuickPickItem = {
    label: `${!status ? '\u2714 ' : '     '}${translate('toggleSwitch.off')} - ${translate('grayscale.disable')}`,
  };
  return codeWindow.showQuickPick([on, off], {
    placeHolder: translate('grayscale.toggle'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: QuickPickItem) => {
  if (!value?.label) return;
  const labelContent = value.label.trim();
  if (labelContent.includes(translate('toggleSwitch.on'))) {
    return setThemeConfig('saturation', 0, true);
  } else if (labelContent.includes(translate('toggleSwitch.off'))) {
    return setThemeConfig('saturation', 1, true);
  }
};

/** Is grayscale icons enabled? */
export const checkGrayscaleStatus = (): boolean => {
  return getMaterialIconsJSON()?.options?.saturation === 0;
};
