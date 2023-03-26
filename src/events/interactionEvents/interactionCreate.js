const consola = require("consola");
const { ActionRowBuilder, EmbedBuilder, Interaction, userMention } = require("discord.js");
const { EmbedOptionOne, EmbedOptionTwo } = require("../../../embed");

/**
 * Processes logic when a new interaction is created. Interactions come in various
 * forms, and represent some sort of user engagement with gambling-bot on Discord.
 *
 * @param {Bot} AutoMDM AutoMDM's Discord instance.
 * @param {Interaction} interaction The interaction payload received from Discord.
 */

const interactionCreate = async (AutoMDM, interaction) => {
  try {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === "select-prize") {
      const selected = interaction.values[0];

      if (selected === "select-one") {
        const row = new ActionRowBuilder().addComponents(AutoMDM.configs.buttonsOne);
        const embedTitle = EmbedOptionOne.title.length ? EmbedOptionOne.title : null;
        const embedColor = EmbedOptionOne.color.length ? EmbedOptionOne.color : null;
        const embedImage = EmbedOptionOne.image.url.length ? EmbedOptionOne.image.url : null;
        const embedFooterText = EmbedOptionOne.footer.text;
        const embedFooterUrl = EmbedOptionOne.footer.iconUrl.length
          ? EmbedOptionOne.footer.iconUrl
          : undefined;
        const embedDescription = EmbedOptionOne.description.length
          ? EmbedOptionOne.description
              .replace(/{mention}/g, userMention(interaction.user.id))
              .replace(/{usertag}/g, interaction.user.tag)
              .replace(/{username}/g, interaction.user.username)
          : null;

        const messageContent = EmbedOptionOne.content.length
          ? EmbedOptionOne.content
              .replace(/{mention}/g, userMention(interaction.user.id))
              .replace(/{usertag}/g, interaction.user.tag)
              .replace(/{username}/g, interaction.user.username)
          : null;

        const embed =
          embedDescription !== null
            ? new EmbedBuilder()
                .setTitle(embedTitle)
                .setDescription(embedDescription)
                .setColor(embedColor)
                .setImage(embedImage)
                .setFooter(
                  EmbedOptionOne.footer.text.length
                    ? { text: embedFooterText, iconURL: embedFooterUrl }
                    : null
                )
            : false;

        await interaction.reply({
          content: messageContent,
          embeds: embed ? [embed] : undefined,
          components: [row],
        });
      }

      if (selected === "select-two") {
        const row = new ActionRowBuilder().addComponents(AutoMDM.configs.buttonsTwo);
        const embedTitle = EmbedOptionTwo.title.length ? EmbedOptionTwo.title : null;
        const embedColor = EmbedOptionTwo.color.length ? EmbedOptionTwo.color : null;
        const embedImage = EmbedOptionTwo.image.url.length ? EmbedOptionTwo.image.url : null;
        const embedFooterText = EmbedOptionTwo.footer.text;
        const embedFooterUrl = EmbedOptionTwo.footer.iconUrl.length
          ? EmbedOptionTwo.footer.iconUrl
          : undefined;
        const embedDescription = EmbedOptionTwo.description.length
          ? EmbedOptionTwo.description
              .replace(/{mention}/g, userMention(interaction.user.id))
              .replace(/{usertag}/g, interaction.user.tag)
              .replace(/{username}/g, interaction.user.username)
          : null;

        const messageContent = EmbedOptionTwo.content.length
          ? EmbedOptionTwo.content
              .replace(/{mention}/g, userMention(interaction.user.id))
              .replace(/{usertag}/g, interaction.user.tag)
              .replace(/{username}/g, interaction.user.username)
          : null;

        const embed =
          embedDescription !== null
            ? new EmbedBuilder()
                .setTitle(embedTitle)
                .setDescription(embedDescription)
                .setColor(embedColor)
                .setImage(embedImage)
                .setFooter(
                  EmbedOptionTwo.footer.text.length
                    ? { text: embedFooterText, iconURL: embedFooterUrl }
                    : null
                )
            : false;

        await interaction.reply({
          content: messageContent,
          embeds: embed ? [embed] : undefined,
          components: [row],
        });
      }
    }
  } catch (err) {
    consola.error(err);
  }
};

module.exports = { interactionCreate };
