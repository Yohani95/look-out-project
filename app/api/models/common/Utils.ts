import { format } from 'date-fns';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
class Utils {
  static getFechaString(fecha: Date | null | undefined): string {
    return fecha ? format(new Date(fecha), 'dd/MM/yyyy') : 'N/A';
  }
  /**
   * Formatea una fecha y hora en una cadena.
   * @param fecha - La fecha a formatear.
   * @returns La fecha y hora formateadas como una cadena, o 'N/A' si la fecha es null o undefined.
   */
  static getFechaHoraString(fecha: Date | null | undefined): string {
    if (!fecha) return 'N/A';
    const formatString = 'dd/MM/yyyy HH:mm aa';
    return format(new Date(fecha), formatString);
  }
  static async showConfirmationDialogEdit(t) {
    return ConfirmationDialog(
      t.notification.edit.title,
      t.notification.edit.text,
      t.notification.edit.type,
      t.notification.edit.buttonOk,
      t.notification.edit.buttonCancel
    );
  }
  static async showConfirmationDialogDelete(t) {
    return ConfirmationDialog(
      t.notification.deleting.title,
      t.notification.deleting.text,
      t.notification.deleting.type,
      t.notification.deleting.buttonOk,
      t.notification.deleting.buttonCancel
    );
  }
  static async showConfirmationDialogCall(t) {
    return ConfirmationDialog(
      t.notification.call.title,
      t.notification.call.text,
      t.notification.call.type,
      t.notification.call.buttonOk,
      t.notification.call.buttonCancel
    );
  }
  static async showLoadingNotification(t) {
    await NotificationSweet({
      title: t.notification.loading.title,
      text: '',
      type: t.notification.loading.type,
      showLoading: true,
    });
  }

  static handleSuccessNotification(t, goBack = null) {
    NotificationSweet({
      title: t.notification.success.title,
      text: t.notification.success.text,
      type: t.notification.success.type,
      goBack: goBack,
    });
  }

  /**
   * Displays an error notification using the NotificationSweet component.
   *
   * @param t - The translation object containing the notification messages.
   * @remarks The function uses the NotificationSweet component to display an error notification.
   *          The notification title, text, and type are obtained from the translation object.
   * @returns {void}
   */
  static handleErrorNotification(t: any, goBack = null) {
    NotificationSweet({
      title: t.notification.error.title,
      text: t.notification.error.text,
      type: t.notification.error.type,
      goBack: goBack,
    });
  }

  static async handleOnSubmit(t: any, action: Function, ...args: any[]) {
    try {
      const result = await action(...args);
      console.log('RESULT API' + result);
      await Utils.handleSuccessNotification(t);
    } catch {
      await Utils.handleErrorNotification(t);
    }
  }
}

export default Utils;
