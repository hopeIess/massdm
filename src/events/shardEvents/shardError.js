const consola = require("consola");

/**
 * Passes the shardError event to AutoMDM's error handler.
 *
 * @param {AutoMDM} AutoMDM AutoMDM's Discord instance.
 * @param {Error} error Standard error object.
 * @param {number} shard The number of the shard that had an error.
 */

const shardError = async (AutoMDM, error, shard) => {
  consola.error(`Shard Error: ${shard}\n${error}`);
};

module.exports = { shardError };
