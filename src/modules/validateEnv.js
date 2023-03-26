const consola = require("consola");
const { ButtonBuilder } = require("discord.js");
const { ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const { TOKEN, WAIT_TIME, ANNOUNCE_CHANNEL_ID } = require("../../config");
const { OriginalEmbed, EmbedOptionOne, EmbedOptionTwo } = require("../../embed");

/**
 * Validates that all expected environment variables are set with *some* value.
 * Does not validate that the values are valid. Constructs a config object and
 * attaches it to AutoMDM's instance. Also constructs the colors and responses objects
 * and attaches them.
 *
 * @param {AutoMDM} AutoMDM AutoMDM's Discord instance.
 * @returns {object} Object containing a valid property as boolean, and a message as string.
 */

const validateEnv = async (AutoMDM) => {
  try {
    if (!TOKEN) {
      return { valid: false, message: "Missing Bot Token!" };
    }

    if (!WAIT_TIME) {
      return {
        valid: false,
        message: "You're missing the wait time in milliseconds in the config.",
      };
    }

    if (!EmbedOptionOne.buttons) {
      return {
        valid: false,
        message: "You're missing the buttons for the first embed options.",
      };
    }

    if (!EmbedOptionTwo.buttons) {
      return {
        valid: false,
        message: "You're missing the buttons for the second embed options.",
      };
    }

    if (!OriginalEmbed.selectMenu.length) {
      return { valid: false, message: "You're missing the selections for the main embed." };
    }

    if (!ANNOUNCE_CHANNEL_ID) {
      return {
        valid: false,
        message: "I have no channel id for where to announce my progress.",
      };
    }

    const validUrl = (str) => {
      let url;
      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    };

    const embedButtonsOne = [];
    const embedButtonsTwo = [];

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("select-prize")
      .setPlaceholder("Pick your prize")
      .addOptions(...OriginalEmbed.selectMenu);

    EmbedOptionOne.buttons.forEach((button) => {
      if (validUrl(button.url)) {
        const btn = new ButtonBuilder()
          .setLabel(button.label)
          .setURL(button.url)
          .setStyle(ButtonStyle.Link);

        if (button.emoji.name) {
          btn.setEmoji({ id: button.emoji.id || undefined, name: button.emoji.name });
        }

        embedButtonsOne.push(btn);
      } else {
        return {
          valid: false,
          message: `The button with label: ${button.label} does not have a valid URL.`,
        };
      }
    });
    EmbedOptionTwo.buttons.forEach((button) => {
      if (validUrl(button.url)) {
        const btn = new ButtonBuilder()
          .setLabel(button.label)
          .setURL(button.url)
          .setStyle(ButtonStyle.Link);

        if (button.emoji.name) {
          btn.setEmoji({ id: button.emoji.id || undefined, name: button.emoji.name });
        }

        embedButtonsTwo.push(btn);
      } else {
        return {
          valid: false,
          message: `The button with label: ${button.label} does not have a valid URL.`,
        };
      }
    });

    const configs = {
      token: TOKEN,
      selectMenu,
      buttonsOne: embedButtonsOne,
      buttonsTwo: embedButtonsTwo,
      wait: Math.floor(WAIT_TIME),
      announceChannelId: ANNOUNCE_CHANNEL_ID,
      pause: false,
    };

    AutoMDM.configs = configs;

    return { valid: true, message: "Environment variables validated!" };
  } catch (err) {
    consola.error(err);
    return {
      valid: false,
      message: "Unknown error when validating environment",
    };
  }
};

module.exports = { validateEnv };
