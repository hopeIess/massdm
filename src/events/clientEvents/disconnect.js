const consola = require("consola");

/**
 * Log to the console when AutoMDM disconnects.
 * @param {AutoMDM} AutoMDM AutoMDM's Discord instance.
 */

const disconnect = async (AutoMDM) => {
  consola.fatal(`${AutoMDM.user?.username || "AutoMDM"} is offline!`);
};

module.exports = { disconnect };
