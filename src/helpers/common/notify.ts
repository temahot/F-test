import { toast } from 'react-toastify';
import { type TypeOptions } from 'react-toastify/dist/types';

export const notify = (type: TypeOptions, message: string): void => {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
