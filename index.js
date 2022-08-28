const { MessageEmbed, Client, Collection } = require('discord.js')
const client = new Client()
const { token } = require('./config')
const snipes = new Collection()

client.on('ready', () => {
    console.log(`${client.user.username} is Ready!`)
    client.user.setActivity("Logging", { type: "WATCHING" })
})

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;

    if (oldMessage.author.bot) return;
    if (newMessage.author.bot) return;

    const embed = new MessageEmbed()
    .setDescription("아래에서 내용을 확인하세요")
    .setColor(0xffff61)
    .addFields(
        {
            name: "User",
            value: `${oldMessage.author.tag}`
        },
        {
            name: "Channel",
            value: `<#${oldMessage.channel.id}>`
        },
        {
            name: "Before",
            value: `> ${oldMessage.content}`
        },
        {
            name: "After",
            value: `> ${newMessage.content}`
        },
    )
    .setTimestamp()

    let loggingChannel = newMessage.guild.channels.cache.find(ch => ch.name === "📃ㅣ로그")
    if (!loggingChannel) {
        const errorembed = new MessageEmbed()
        .setDescription("❔ㅣ이런! 등록된 채널을 찾을 수 없어요!")
        .setTimestamp()

        return message.channel.send(errorembed)
    }
    loggingChannel.send(embed)
})

client.on('messageDelete', async (message) => {

    if (!message.author.bot) return;

    snipes.set(message.channel.id, message);

    const embed = new MessageEmbed()
    .setColor(0xadffde)
    .setDescription(`Delete Message\n\nUser: ${message.author}\n\nDelete Channel: ${message.channel}\nmessage URL: ${message.url}\n\nmessage\n> ${message.content}`)

    if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL);

    let loggingChannel = message.guild.channels.cache.find(ch => ch.name === "📃ㅣ로그")
    if (!loggingChannel) {
        const errorembed = new MessageEmbed()
        .setDescription("❔ㅣ이런! 등록된 채널을 찾을 수 없어요!")
        .setTimestamp()

        return message.channel.send(errorembed)
    }
    loggingChannel.send(embed)
})

client.on('guildMemberAdd', (member) => {
    
    const rulechannel = member.guild.channels.cache.get("903272784820572233")

    const user = member.id;

    const embed = new MessageEmbed()
    .setTitle("👋ㅣ입장하셨습니다.")
    .setDescription(`<@${user}>님 ${member.guild.name}에 오신것을 환영합니다!\n${rulechannel} 읽어주시고 활동해주세요!`)
    .setColor(0x3ec5f1)
    .setTimestamp()

    let loggingChannel = member.guild.channels.cache.find(ch => ch.name === "🚪ㅣ입퇴장")
    if (!loggingChannel) return;

    loggingChannel.send(embed)
})

client.on('guildMemberRemove', (member) => {
    const user = member.user.username

    const embed = new MessageEmbed()
    .setTitle("🌧️ㅣ퇴장하셨습니다.")
    .setDescription(`${user}님이 ${member.guild.name}에서 나가셨습니다...\n나중에 다시 돌아오길 바랄께요...ㅠㅠ`)
    .setColor(0x106393)
    .setTimestamp()

    let loggingChannel = member.guild.channels.cache.find(ch => ch.name === "🚪ㅣ입퇴장")
    if (!loggingChannel) return;

    loggingChannel.send(embed)
})

client.login(token)