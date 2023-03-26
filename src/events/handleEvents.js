const { guildCreate } = require("./guildEvents/guildCreate");
const { disconnect } = require("./clientEvents/disconnect");
const { ready } = require("./clientEvents/ready");
const { interactionCreate } = require("./interactionEvents/interactionCreate");
const { shardReady } = require("./shardEvents/shardReady");
const { shardError } = require("./shardEvents/shardError");

/**
 * Root level function for loading all of the event listeners. Attaches
 * all of the Discord.js event listeners to AutoMDM's custom handlers.
 *
 * @param {AutoMDM} AutoMDM AutoMDM's Client instance.
 */
const handleEvents = (AutoMDM) => {
  AutoMDM.on("shardReady", async (shard) => {
    await shardReady(AutoMDM, shard);
  });
  AutoMDM.on("shardError", async (error, shard) => {
    await shardError(AutoMDM, error, shard);
  });
  AutoMDM.on("guildCreate", async (guild) => {
    await guildCreate(AutoMDM, guild);
  });
  AutoMDM.on("disconnect", async () => {
    await disconnect(AutoMDM);
  });
  AutoMDM.on("ready", async () => {
    await ready(AutoMDM);
  });
  AutoMDM.on("interactionCreate", async (interaction) => {
    await interactionCreate(AutoMDM, interaction);
  });
};

module.exports = { handleEvents };
