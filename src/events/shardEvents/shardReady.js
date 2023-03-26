const consola = require("consola");

/**
 * Handles the shardReady event - sends a message to the debug hook when
 * a shard comes online.
 *
 * @param {AutoMDM} AutoMDM AutoMDM's Discord instance.
 * @param {number} shard The number of the shard that has come online.
 */

const shardReady = async (AutoMDM, shard) => {
  consola.success(`Shard ${shard} Ready...`);
};

module.exports = { shardReady };
