const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.user.setPresence({
        activities: [{
            name: `Realite・by (r.vu)`,
            type: ActivityType.Streaming,
            url: "https://www.twitch.tv/discord"
        }],
        status: 'online',
    });

    console.clear();

    const P = '\x1b[38;5;213m', C = '\x1b[36m', G = '\x1b[32m', Y = '\x1b[33m', B = '\x1b[34m', W = '\x1b[37m';
    const bold = '\x1b[1m', dim = '\x1b[2m', reset = '\x1b[0m';

    console.log(`
${bold}${G}BOT IS ONLINE${reset}

${C}◉${reset} ${bold}User${reset}     ${C}${client.user.tag}${reset}
${C}◉${reset} ${bold}ID${reset}       ${Y}${client.user.id}${reset}
${C}◉${reset} ${bold}Servers${reset}  ${client.guilds.cache.size}

${P}◈${reset} ${bold}GitHub${reset}    ${P}https://github.com/ar5594${reset}

${dim}────────────────────────────────────${reset}
${Y}⚡${reset} ${bold}Customize:${reset}
${Y}  index.js${reset}  ${dim}text (73-87) | title (90) | image (28)${reset}
${Y}  config.js${reset} ${dim}games (6-33) | self (35-69) | colors (72-84)${reset}
${Y}  ready.js${reset}  ${dim}name (6) | type (7) | url (8) | status (10)${reset}
${dim}────────────────────────────────────${reset}
`);
};
