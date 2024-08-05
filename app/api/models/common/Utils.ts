import { format } from 'date-fns';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
class Utils {
  static getFechaString(fecha: Date | null | undefined): string {
    return fecha ? format(new Date(fecha), 'dd/MM/yyyy') : 'N/A';
  }
  static async showLoadingNotification(t) {
    await NotificationSweet({
      title: t.notification.loading.title,
      text: '',
      type: t.notification.loading.type,
      showLoading: true,
    });
  }

  static handleSuccessNotification(t) {
    NotificationSweet({
      title: t.notification.success.title,
      text: t.notification.success.text,
      type: t.notification.success.type,
    });
  }

  static handleErrorNotification(t) {
    NotificationSweet({
      title: t.notification.error.title,
      text: t.notification.error.text,
      type: t.notification.error.type,
    });
  }

  static async handleOnSubmit(
    t: any,
    changeFunction: Function,
    ...args: any[]
  ) {
    try {
      await changeFunction(...args);
      await Utils.handleSuccessNotification(t);
    } catch {
      await Utils.handleErrorNotification(t);
    }
  }
}

export default Utils;
