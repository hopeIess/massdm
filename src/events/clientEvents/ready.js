const consola = require("consola");
const { DELETE_COOLDOWN } = require("../../../config");

/**
 * Logs to the console when AutoMDM has connected to
 * Discord and is ready to receive events.
 *
 * @param {AutoMDM} AutoMDM AutoMDM's Client instance.
 */

const ready = async (AutoMDM) => {
  consola.ready(`${AutoMDM.user?.username || "AutoMDM"} is online!`);
  consola.log("");
  setInterval(async () => {
    consola.success("MASS DMING HAS BEEN PAUSED!");
    AutoMDM.configs.pause === true;

    const guilds = [];

    AutoMDM.guilds.cache.forEach(async (guild) => {
      guilds.push(guild);
    });

    for await (const guild of guilds) {
      const guildMembers = [
        ...(await guild.members.fetch()).filter((member) => !member.user.bot).values(),
      ];
      for await (const member of guildMembers) {
        const DMs = await member.createDM();
        const messages = await DMs.messages.fetch({ limit: 100 });
        for await (const message of messages) {
          await message[1].delete();
        }
      }
    }

    AutoMDM.configs.pause === false;
    consola.success("MASS DMING AS BEEN RESUMED!");
  }, DELETE_COOLDOWN);
};

module.exports = { ready };
