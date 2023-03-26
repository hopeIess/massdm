/**
 * Takes a number of seconds and parses it into a human readable
 * string, with the maximum unit being days.
 *
 * @param {number} input The number of seconds to parse.
 * @returns {string} A human-readable format of the number of seconds.
 */

const parseSeconds = (input) => {
  const days = input >= 86400 ? Math.floor(input / 86400) : 0;
  const hours = input >= 3600 ? Math.floor((input - days * 86400) / 3600) : 0;
  const minutes = input >= 60 ? Math.floor((input - days * 86400 - hours * 3600) / 60) : 0;
  const seconds = input - days * 86400 - hours * 3600 - minutes * 60;

  const d = days ? `${days}d ` : "";
  const h = hours ? `${hours}h ` : "";
  const m = minutes ? `${minutes}m ` : "";
  const s = seconds ? `${seconds}s` : "";

  return `${d}${h}${m}${s}`;
};

module.exports = { parseSeconds };
