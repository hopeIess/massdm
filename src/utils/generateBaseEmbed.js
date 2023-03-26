const { EmbedBuilder, userMention } = require("discord.js");

const generateBaseEmbed = (embed, user) => {
  const embedTitle = embed.title.length ? embed.title : null;
  const embedColor = embed.color.length ? embed.color : null;
  const embedImage = embed.image.url.length ? embed.image.url : null;
  const embedFooterText = embed.footer.text;
  const embedFooterUrl = embed.footer.iconUrl.length ? embed.footer.iconUrl : undefined;
  const embedDescription = embed.description.length
    ? embed.description
        .replace(/{mention}/g, userMention(user.id))
        .replace(/{usertag}/g, user.tag)
        .replace(/{username}/g, user.username)
    : null;

  return new EmbedBuilder()
    .setTitle(embedTitle)
    .setDescription(embedDescription)
    .setColor(embedColor)
    .setImage(embedImage)
    .setFooter(
      embed.footer.text.length
        ? {
            text: embedFooterText,
            iconURL: embedFooterUrl,
          }
        : null
    );
};

module.exports = { generateBaseEmbed };
