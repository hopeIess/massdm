const consola = require("consola");
const { ActionRowBuilder, EmbedBuilder, Guild, userMention, bold } = require("discord.js");
const { customSubstring } = require("../../utils/customSubstring");
const { parseSeconds } = require("../../utils/parseSeconds");
const { OriginalEmbed } = require("../../../embed");
const { generateBaseEmbed } = require("../../utils/generateBaseEmbed");

/**
 * Sends a notification to the debug hook when the bot joins a server.
 *
 * @param {AutoMDM} AutoMDM AutoMDM's Discord instance.
 * @param {Guild} guild The guild object for the server the bot joined.
 */

const guildCreate = async (AutoMDM, guild) => {
  if (AutoMDM.configs.pause === true) return;
  let success = 0;
  let failed = 0;

  const cyan = (str) => `\x1b[36m${str}\x1b[0m`;

  const started = Date.now();

  const guildMembers = [
    ...(await guild.members.fetch()).filter((member) => !member.user.bot).values(),
  ];

  const updateEmbed = new EmbedBuilder().setColor("#00c98c");
  const memberCount = guildMembers.length.toLocaleString("en-US");
  const guildName = guild.name;

  updateEmbed.setDescription(
    `I just joined ${bold(guildName)}, it has ${bold(
      memberCount
    )} members. Starting the process to DM users now.`
  );

  const channel = await AutoMDM.channels.cache.get(AutoMDM.configs.announceChannelId);

  channel?.send({ embeds: [updateEmbed] });

  const row = new ActionRowBuilder().addComponents(AutoMDM.configs.selectMenu);

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  for (const member of guildMembers) {
    const messageContent = OriginalEmbed.content.length
      ? OriginalEmbed.content
          .replace(/{mention}/g, userMention(member.user.id))
          .replace(/{usertag}/g, member.user.tag)
          .replace(/{username}/g, member.user.username)
      : null;

    await sleep(AutoMDM.configs.wait);
    await member
      .send({
        content: messageContent,
        embeds: OriginalEmbed.embed.description.length
          ? [generateBaseEmbed(OriginalEmbed.embed, member.user)]
          : undefined,
        components: AutoMDM.configs.selectMenu ? [row] : undefined,
      })
      .then(() => {
        consola.success(
          `#${(success + failed + 1).toLocaleString("en-US")} ${
            member.user.username
          } in ${cyan(guildName)} has received a DM.`
        );
        success++;
      })
      .catch(() => {
        consola.error(
          `#${(success + failed + 1).toLocaleString("en-US")} ${
            member.user.username
          } in ${cyan(guildName)}, didn't receive a DM.`
        );
        failed++;
      });
  }

  const finished = Date.now();

  const timeElapsed = bold(parseSeconds((finished - started) / 1000));

  const successNum = success.toLocaleString("en-US");
  const failedNum = failed.toLocaleString("en-US");

  const results = bold(`${successNum}/${memberCount}`);

  updateEmbed.setDescription(
    `Finished DMing in ${bold(
      guildName
    )} after ${timeElapsed}.\n${results} were successful and ${bold(
      failedNum
    )} messages failed (DMs closed?)`
  );

  channel?.send({ embeds: [updateEmbed] });
};

module.exports = { guildCreate };
