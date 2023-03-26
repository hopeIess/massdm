// Your own bot token.
const TOKEN = "";
// The channel where it sends the progress messages.
const ANNOUNCE_CHANNEL_ID = "";
// The wait time between each DM.
// NOTE: Has to be in milliseconds!
const WAIT_TIME = 10;
// The cooldown for how much time should pass before it pauses DMing
// and starts deleting DMs of users.
// NOTE: Has to be in milliseconds!
const DELETE_COOLDOWN = 259200000;

module.exports = { TOKEN, WAIT_TIME, DELETE_COOLDOWN, ANNOUNCE_CHANNEL_ID };
