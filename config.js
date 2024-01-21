import Discord from "discord.js";
const { ButtonStyle, TextInputStyle } = Discord;

const config = {
  PREFIX: "!",
  TOKEN: "MTE3MDQ3MjE2MTQ1OTMyMjk2Mg.GUCSts.HVj2BRcj8P1JJ9kXFYwDjv8e-QBcAxXUEeYhRw",
  ACTIVITY: { NAME: "MohyBeatz", TYPE: "WATCHING" },
  GUILD_ID: "1190558845966241802",
  TICKET: {
    CHANNEL: "1190615866056921098",
    MESSAGE: `
    
    # __Dark Horse 🐎__ سلام خوش اومدید به سرور 
    **برای وریفای شدن روی گزینه __𝗩𝗲𝗿𝗶𝗳𝘆__ کلیک کنید و مشخصات خودتون رو پر کنید**

    
    
    `,
    STAFF_ROLES: ["1190565886160015421","1190566141995798539","1190565765938688000","1190564780071718952"], //رول هایی که اجازه تایید دارند کپی ایدی قرار دهید
    BUTTONS: [
      {
        STYLE: ButtonStyle.Success,
        LABEL: "𝐕𝐞𝐫𝐢𝐟𝐲 𝐌𝐞𝐌𝐛𝐞𝐫",
        EMOTE: "<:fix:1197222321660903424>",
        ID: "successTicket",
        DISABLED: false,
      },
      {
        STYLE: ButtonStyle.Danger,
        LABEL: "𝐑𝐞𝐣𝐞𝐜𝐭𝐞𝐝 𝐌𝐞𝐌𝐛𝐞𝐫",
        EMOTE: "<:reject:1197222326194946188>",
        ID: "deleteTicket",
        DISABLED: false,
      },
      {
        STYLE: ButtonStyle.Secondary,
        LABEL: "𝐌𝐨𝐫𝐞",
        EMOTE: "<a:more:1197222260168196146>",
        ID: "archiveTicket",
        DISABLED: false,
      },
    ],
    QUESTIONS: [
      {
        ID: "name",
        LABEL: "𝗗𝗶𝘀𝗽𝗹𝗮𝘆 𝗡𝗮𝗺𝗲",
        STYLE: TextInputStyle.Short,
        MIN_LENGTH: 0,
        MAX_LENGTH: 16,
        PLACE_HOLDER: "MohyBeatz : مثلا",
        REQUIRED: true,
      },
      {
        ID: "age",
        LABEL: "𝗔𝗴𝗲",
        STYLE: TextInputStyle.Short,
        MIN_LENGTH: 0,
        MAX_LENGTH: 2,
        PLACE_HOLDER: "20 : مثلا",
        REQUIRED: true,
      },
      {
        ID: "shahr",
        LABEL: "𝗖𝗶𝘁𝘆",
        STYLE: TextInputStyle.Short,
        MIN_LENGTH: 0,
        MAX_LENGTH: 16,
        PLACE_HOLDER: "Gorgan : مثلا",
        REQUIRED: true,
      },
    ],
  },
  getTicketEmbed: (user, form) => {
    const emojiQuestion = form.QUESTIONS.find((question) => question.ID === 'emoji');
    const nameQuestion = form.QUESTIONS.find((question) => question.ID === 'name');
  
    const emoji = emojiQuestion ? emojiQuestion.VALUE : 'emoji';
    const name = nameQuestion ? nameQuestion.VALUE : 'name';
  
    const jsonData = {
      title: 'برای وریفای شدن روی درخواست وریفای کلیک کنید ✔',
      description: `${emoji} نام: ${name}\n\nفرم پر شده توسط ${user}.`,
      color: '#00ff22',
      thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/994666410015993866/1166157404644331600/Discord_Logo_MohyBeatz.gif?ex=654977b7&is=653702b7&hm=83d55b9b7c55461bdfb5b690a17e9970623d13b06dd46bf1241342655106e9f1&',
      },
      image: {
        url: 'https://cdn.discordapp.com/attachments/994666410015993866/1166157404644331600/Discord_Logo_MohyBeatz.gif?ex=654977b7&is=653702b7&hm=83d55b9b7c55461bdfb5b690a17e9970623d13b06dd46bf1241342655106e9f1&',
      },
    };
    const ticketEmbed = new Discord.MessageEmbed(jsonData);

    // تغییر نیک نیم کاربر در سرور
    const member = guild.members.cache.get(user.id);
    const newNickname = `${emoji} ${name}`;
    member
      .setNickname(newNickname)
      .then(() => console.log('نیک نیم با موفقیت تغییر کرد'))
      .catch((error) => console.error('خطا در تغییر نیک نیم', error));
    return ticketEmbed;
  },
};

export default config; 