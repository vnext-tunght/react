import toast from 'react-hot-toast'

/**
 * Notification utilities using react-hot-toast
 */

interface ToastOptions {
  duration?: number
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
}

export const notifications = {
  /**
   * Show success notification
   */
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      duration: 4000,
      position: 'top-right',
      ...options,
    })
  },

  /**
   * Show error notification
   */
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      duration: 5000,
      position: 'top-right',
      ...options,
    })
  },

  /**
   * Show info notification
   */
  info: (message: string, options?: ToastOptions) => {
    return toast(message, {
      icon: 'ℹ️',
      duration: 4000,
      position: 'top-right',
      ...options,
    })
  },

  /**
   * Show warning notification
   */
  warning: (message: string, options?: ToastOptions) => {
    return toast(message, {
      icon: '⚠️',
      duration: 4000,
      position: 'top-right',
      ...options,
    })
  },

  /**
   * Show loading notification
   */
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      position: 'top-right',
      ...options,
    })
  },

  /**
   * Dismiss specific toast
   */
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId)
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss()
  },

  /**
   * Promise toast - shows loading, then success/error
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, messages, {
      position: 'top-right',
      ...options,
    })
  },
}

// Export default for convenience
export default notifications
