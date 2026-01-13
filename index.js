const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// CONFIG
const welcomeChannelId = '1453760790506242110';

// Bot online
client.once('ready', () => {
    console.log(`✅ Welkom bot online als ${client.user.tag}`);
});

// Event: lid joint
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle('Welkom! 🎉')
        .setDescription(`
Welkom **${member.user.username}** in **${member.guild.name}**! 🎉  
Je bent onze **${member.guild.memberCount}e** <@&1453764683667345499>!

We zijn blij dat je er bent!

📌 **Lees even de [Regels](https://discord.com/channels/1453743674486685940/1453760810223538390)**
👀 **Bekijk de [Mededelingen](https://discord.com/channels/1453743674486685940/1453761361539498138)**
💬 **Zeg hallo in de [Chat](https://discord.com/channels/1453743674486685940/1453761576338198641)**
`)
        .setColor('#FF0000')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Murat Shop' })
        .setTimestamp();

    channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
