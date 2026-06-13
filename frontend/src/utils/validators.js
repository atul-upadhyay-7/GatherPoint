// Validation utilities
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  numeric: (value) => {
    if (value && isNaN(parseFloat(value))) {
      return 'Must be a number';
    }
    return null;
  },

  positive: (value) => {
    if (value && parseFloat(value) <= 0) {
      return 'Must be a positive number';
    }
    return null;
  },

  date: (value) => {
    if (!value) {
      return 'Please select a date';
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    return null;
  },

  futureDate: (value) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return 'Date must be in the future';
    }
    return null;
  },

  guestCount: (value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 50) {
      return 'Guest count must be between 1 and 50';
    }
    return null;
  },

  amount: (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      return 'Amount must be a positive number';
    }
    return null;
  },
};

export const formUtils = {
  getErrors(formData, validators) {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      const validator = validators[key];
      if (validator) {
        const error = validator(value);
        if (error) {
          errors[key] = error;
        }
      }
    });
    return errors;
  },

  hasErrors(errors) {
    return Object.keys(errors).length > 0;
  },

  updateField(state, field, value) {
    return { ...state, [field]: value };
  },

  resetForm(initialValues) {
    return initialValues;
  },

  formatFormData(formData) {
    const formatted = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formatted[key] = formData[key];
      }
    });
    return formatted;
  },
};

export const uiUtils = {
  cn(...classes) {
    return classes.filter(Boolean).join(' ');
  },

  debounce(func, delay = 300) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  throttle(func, delay = 300) {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        func(...args);
        lastCall = now;
      }
    };
  },

  copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const mergedOptions = { ...defaultOptions, ...options };
    return new Date(date).toLocaleDateString('en-US', mergedOptions);
  },

  formatTime(date, options = {}) {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const mergedOptions = { ...defaultOptions, ...options };
    return new Date(date).toLocaleTimeString('en-US', mergedOptions);
  },

  getInitials(name) {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  },

  isMobile() {
    return window.innerWidth < 768;
  },

  isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  },

  isDesktop() {
    return window.innerWidth >= 1024;
  },

  scrollToElement(elementId, behavior = 'smooth') {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior });
    }
  },

  getContrastColor(backgroundColor) {
    // Calculate luminance
    const luminance = (
      parseInt(backgroundColor.slice(1, 3), 16) * 0.299 +
      parseInt(backgroundColor.slice(3, 5), 16) * 0.587 +
      parseInt(backgroundColor.slice(5, 7), 16) * 0.114
    );
    return luminance > 186 ? '#000000' : '#FFFFFF';
  },
};

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