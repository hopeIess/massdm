/**
 * Determines if a string is longer than the given length, and if so
 * substrings it and appends an ellipsis.
 *
 * @param {string} str The string to shorten.
 * @param {number} len The maximum allowed length for the string.
 * @returns {string} The potentially shortened string.
 */

const customSubstring = (str, len) => {
  return str.length > len ? str.substring(0, len - 3) + "..." : str;
};

module.exports = { customSubstring };
