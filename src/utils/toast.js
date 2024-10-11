import { t } from 'i18next';
import { toast as helper } from 'react-hot-toast';
import { trans } from './helpers';

class Toast {
  constructor() {
    this.currentId = '';
  }

  processing() {
    this.currentId = helper.loading(t('processing', {}), {
      id: this.currentId,
    });

    return this;
  }

  success(message = 'success', replaceable = {}) {
    this.currentId = helper.success(trans(message, replaceable), {
      id: this.currentId,
    });

    return this;
  }

  error(message = 'error_title') {
    this.currentId = helper.error(t(message), { id: this.currentId });

    return this;
  }

  dismiss() {
    helper.dismiss(this.currentId);

    return this;
  }
}

export const toast = new Toast();
