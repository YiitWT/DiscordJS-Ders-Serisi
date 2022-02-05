const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });
const {kubitdb} = require('kubitdb')


client.on("ready", () =>{
console.log("--------------------------------------------")
console.log("Giriş Yapılan Botun Hesabı: "+client.user.tag)
console.log("--------------------------------------------")
});

const mesajdb = new kubitdb("kubitdb")
client.on("messageCreate", mesaj =>{
    //Selam veya sa derse cevap olarak as hg
    if(mesaj.content == "sa" || mesaj.content == "selam") {mesaj.reply("as hg") }
    //Ekle Yazarsa Dataya 1 sayı eklesin
    if(mesaj.content == "ekle"){
        mesajdb.ekle("eklemsj", 1)
        mesaj.reply("Eklendi Şuanki Sayı: " +mesajdb.bak("eklemsj"))
    }
    //Çıkar Yazarsa Dataya -1 sayı eklesin
    if(mesaj.content == "çıkar") {
        mesajdb.ekle("eklemsj", -1)
        mesaj.reply("Çıkarıldı Şuanki Sayı: " +mesajdb.bak("eklemsj"))
    }
});

client.login("token buraya")