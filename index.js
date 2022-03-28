const { Client, Intents, Message, Collection } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const { kubitdb } = require("kubitdb");
const fs = require("fs")

client.on("ready", () => {
  console.log("--------------------------------------------");
  console.log("Giriş Yapılan Botun Hesabı: " + client.user.tag);
  console.log("--------------------------------------------");
});

const mesajdb = new kubitdb("kubitdb");
client.on("messageCreate", (mesaj) => {
  //Selam veya sa derse cevap olarak as hg
  if (mesaj.content == "sa" || mesaj.content == "selam") {
    mesaj.reply("as hg");
  }
  //Ekle Yazarsa Dataya 1 sayı eklesin
  if (mesaj.content == "ekle") {
    mesajdb.ekle("eklemsj", 1);
    mesaj.reply("Eklendi Şuanki Sayı: " + mesajdb.bak("eklemsj"));
  }
  //Çıkar Yazarsa Dataya -1 sayı eklesin
  if (mesaj.content == "çıkar") {
    mesajdb.ekle("eklemsj", -1);
    mesaj.reply("Çıkarıldı Şuanki Sayı: " + mesajdb.bak("eklemsj"));
  }
});

//slash komutlar
const synchronizeSlashCommands = require("discord-sync-commands");
client.slashcommands = new Collection();
fs.readdir("./commands/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.slashcommands.set(commandName, { name: commandName, ...props });
    console.log(`Slash Yüklenen komutu: ${commandName}`);
  });
  synchronizeSlashCommands(
    client,
    client.slashcommands.map((c) => ({
      name: c.name,
      description: c.description,
      options: c.options,
      type: "CHAT_INPUT",
    })),
    { debug: true, guildId: "939252403964874883" }
  );  
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.type == "GUILD_TEXT")
    return interaction.reply({
      content: "Üzgünüm (/) Komutlarını Dm Üzerinde Kullanamazsın!",
    });
  const command = client.slashcommands.get(interaction.commandName);
  if (!command)
    return void interaction.reply({
      content: `\`${interaction.commandName}\` Komutunda bir hata oluştu.`,
      ephemeral: true,
    });
  command.run(client, interaction);
});

client.login("OTM5NDY5MTg3NTk0NzE1MTY2.Yf5S3A.NCKfpjZtSVbdguvFRSeLCCZSL-I");
