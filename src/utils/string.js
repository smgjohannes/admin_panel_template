export const truncate = (str, length = 100) => {
  return str.substring(0, length) + '...';
};

/**
 * Truncate a string to a specified length and append ellipsis if needed.
 *
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - The maximum length of the truncated text.
 * @param {string} [ellipsis='...'] - The ellipsis to append to the truncated text.
 * @return {string} - The truncated text.
 */
export const truncateText = (text, maxLength, ellipsis = '...') => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + ellipsis;
};
