export const constants = {
  ROLES: {
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
    KITCHEN_STAFF: 'KITCHEN_STAFF',
  },

  ORDER_STATUSES: {
    DRAFT: 'DRAFT',
    PAID: 'PAID',
    CANCELLED: 'CANCELLED',
  },

  TICKET_STAGES: {
    TO_COOK: 'TO_COOK',
    PREPARING: 'PREPARING',
    COMPLETED: 'COMPLETED',
  },

  PAYMENT_METHODS: {
    CASH: 'CASH',
    CARD: 'CARD',
    UPI: 'UPI',
  },

  DISCOUNT_TYPES: {
    PERCENTAGE: 'PERCENTAGE',
    FLAT: 'FLAT',
  },

  PROMOTION_TYPES: {
    PRODUCT: 'PRODUCT',
    ORDER: 'ORDER',
  },

  PERIODS: {
    TODAY: 'today',
    WEEK: 'week',
    MONTH: 'month',
    ALL: 'all',
  },

  DEFAULT_PAGE_SIZE: 10,

  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB

  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
};

export const messages = {
  ERROR: {
    NETWORK: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please fix the validation errors.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  },

  SUCCESS: {
    CREATED: 'Created successfully.',
    UPDATED: 'Updated successfully.',
    DELETED: 'Deleted successfully.',
    SENT: 'Sent successfully.',
    EXPORTED: 'Exported successfully.',
  },

  CONFIRM: {
    DELETE: 'Are you sure you want to delete this item?',
    LOGOUT: 'Are you sure you want to log out?',
    CLOSE_SESSION: 'Are you sure you want to close the session?',
  },
};