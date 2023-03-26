const consola = require("consola");
const { Client, GatewayIntentBits } = require("discord.js");
const { handleEvents } = require("./events/handleEvents");
const { validateEnv } = require("./modules/validateEnv");

/**
 * This is the entry point for AutoMDM's process. This will log the boot process,
 * call the necessary helpers to prepare AutoMDM, and then log in to Discord.
 */
(async () => {
  consola.start("Waking the bot up...");

  const AutoMDM = new Client({
    shards: "auto",
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  });

  consola.success("Validating environment variables...");
  const validatedEnvironment = await validateEnv(AutoMDM);
  if (validatedEnvironment.valid === false) return consola.error(validatedEnvironment.message);

  /**
   * Fallthrough error handlers. These fire in rare cases where something throws
   * in a way that our standard catch block cannot see it.
   */
  process.on("unhandledRejection", async (error) => {
    consola.error(error);
  });
  process.on("uncaughtException", async (error) => {
    consola.error(error);
  });

  consola.success("Attaching event listeners...");
  handleEvents(AutoMDM);

  consola.success("Connecting to Discord...");
  await AutoMDM.login(AutoMDM.configs.token);
})();
