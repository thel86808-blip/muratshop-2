import { Client, GatewayIntentBits, Partials, EmbedBuilder } from "discord.js";

// Maak de client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Config
const roleId = "1453764683667345499";
const emoji = "👋";
const channelId = "1453776383204393052";

let reactionMessageId;

client.once("ready", async () => {
    console.log(`Logged in als ${client.user.tag}`);

    const guild = client.guilds.cache.first();
    if (!guild) return console.log("Geen guild gevonden");

    const channel = guild.channels.cache.get(channelId);
    if (!channel) return console.log("Kanaal niet gevonden!");

    const embed = new EmbedBuilder()
        .setTitle("Claim je rol!")
        .setDescription(`Klik op ${emoji} om de inwoner rol te krijgen!`)
        .setColor("Blue");

    const sentMessage = await channel.send({ embeds: [embed] });
    await sentMessage.react(emoji);

    reactionMessageId = sentMessage.id;
});

// Rol toevoegen
client.on("messageReactionAdd", async (reaction, user) => {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();

    if (
        reaction.message.id === reactionMessageId &&
        reaction.emoji.name === emoji
    ) {
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.add(roleId);
    }
});

// Rol verwijderen
client.on("messageReactionRemove", async (reaction, user) => {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();

    if (
        reaction.message.id === reactionMessageId &&
        reaction.emoji.name === emoji
    ) {
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.remove(roleId);
    }
});

import http from "http";

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot is running ✅");
}).listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});


// Login
client.login(process.env.TOKEN);
