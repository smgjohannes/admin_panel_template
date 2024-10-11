import i18n from '../i18n';

export const fullName = (first, last) => `${first} ${last}`;

export const normalizeLanguageCode = (code) => {
  if (code.startsWith('en')) {
    return 'en';
  }
  return code;
};

/**
 * Custom translation function to be used outside of React components.
 *
 * @param {string} key - The translation key.
 * @param {object} [options] - Optional interpolation values.
 * @return {string} - The translated string.
 */
export const ctrans = (key, options = {}) => {
  return i18n.t(key, options);
};
