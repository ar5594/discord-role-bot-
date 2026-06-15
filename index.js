const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('./config.js');
const setupReady = require('./ready.js');

function log(text, color = '\x1b[37m') {
    const d = new Date();
    const t = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    console.log(`\x1b[2m[${t}]\x1b[0m ${color}${text}\x1b[0m`);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const colors = {
    main: '#71368a',
    success: '#6AF08A',
    error: '#F06A6A',
    info: '#6ABBF0',
    warning: '#FFE084'
};

const bannerImage = "https://i.postimg.cc/vTK73Ycw/Picsart-26-04-02-11-42-23-984.png";

client.once('clientReady', () => {
    setupReady(client);
    log(`${'\x1b[35m'}■${'\x1b[0m'} ${'\x1b[1m'}${client.user.tag}${'\x1b[0m'} is now ${'\x1b[32m'}online${'\x1b[0m'}`, '\x1b[32m');
});

function getRoleDetails(guild, roleId) {
    const groupRoles = (config.selfRolesGroups || []).flatMap(g => g.roles);
    const allConfigRoles = [
        ...(config.gamingRoles?.roles || []),
        ...groupRoles,
        ...(config.colorRoles?.roles || [])
    ];
    const role = guild.roles.cache.get(roleId);
    const roleConfig = allConfigRoles.find(r => r.value === roleId);
    const emoji = roleConfig?.emoji ? `${roleConfig.emoji} ` : '';
    return role ? `${emoji}**${role.name}**` : `**@unknown-role**`;
}

function getUserRolesInCategory(member, categoryRoles) {
    if (!categoryRoles || !categoryRoles.length) return 'None';
    const owned = categoryRoles
        .filter(r => member.roles.cache.has(r.value))
        .map(r => `${r.emoji || ''} **${r.label}**`);
    return owned.length > 0 ? owned.join(', ') : 'None';
}

async function sendDirectMessage(member, type, roleIds) {
    if (!member || !roleIds.length) return;
    const roleStrings = roleIds.map(id => getRoleDetails(member.guild, id)).join(', ');
    const dmEmbed = new EmbedBuilder()
        .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
        .setColor(type === 'add' ? colors.success : colors.error)
        .setDescription(`<@!${member.id}>: ${type === 'add' ? 'Gave you' : 'Removed you'} the ${roleStrings} role.`);
    try { await member.send({ embeds: [dmEmbed] }); } catch (e) {}
}

client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return;

    if (message.content === '!setup' && message.member.permissions.has('Administrator')) {
        try { await message.delete(); } catch (e) {}
        log(`${'\x1b[33m'}⚡${'\x1b[0m'} Setup panel sent by ${'\x1b[1m'}${message.author.tag}${'\x1b[0m'} in #${message.channel.name}`, '\x1b[33m');

        const descriptionText = [
            'Personalize your profile experience using the options below.',
            '',
            '<a:purple:1500913133781520394> **|** __**Identity Roles**__',
            'Define your personality.',
            '',
            '<a:purple:1500913133781520394> **|** __**Gaming Roles**__',
            'Connect with gamers.',
            '',
            '<a:purple:1500913133781520394> **|** __**Color Roles**__ (Boosters Only)',
            'Change name color.',
            '',
            '<a:purple:1500913133781520394> **|** __**Management**__',
            'Remove active roles.'
        ].join('\n');

        const mainEmbed = new EmbedBuilder()
            .setTitle('Role Management Center')
            .setDescription(descriptionText)
            .setColor(colors.main)
            .setImage(bannerImage);

        const buttonsRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('btn_self').setLabel('Self Roles').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('btn_gaming').setLabel('Gaming Roles').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('btn_colors').setLabel('Colors').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('btn_remove').setLabel('Remove Roles').setStyle(ButtonStyle.Danger)
        );

        await message.channel.send({ embeds: [mainEmbed], components: [buttonsRow] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.guild) return;
    const safeGroups = config.selfRolesGroups || [];
    const isBooster = interaction.member.premiumSince !== null;

    if (interaction.isButton()) {
        const embed = new EmbedBuilder().setColor(colors.main);
        const btnNames = { btn_self: 'Self Roles', btn_gaming: 'Gaming Roles', btn_colors: 'Colors', btn_remove: 'Remove Roles' };
        log(`${'\x1b[34m'}◈${'\x1b[0m'} ${'\x1b[1m'}${interaction.user.tag}${'\x1b[0m'} pressed ${'\x1b[33m'}${btnNames[interaction.customId] || interaction.customId}${'\x1b[0m'}`, '\x1b[36m');

        if (interaction.customId === 'btn_colors') {
            if (!isBooster) {
                embed.setColor(colors.error)
                    .setTitle('💎 Booster Exclusive')
                    .setDescription('This feature is only available for **Server Boosters**.');
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const group = config.colorRoles;
            const available = group.roles.filter(r => !interaction.member.roles.cache.has(r.value));
            const owned = getUserRolesInCategory(interaction.member, group.roles);

            if (!available.length) {
                embed.setColor(colors.warning).setTitle('🎨 Color Selection').setDescription(`You already have all available colors!\n\n**Current:** ${owned}`);
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const options = available.slice(0, 25);

            const menu = new StringSelectMenuBuilder()
                .setCustomId('select_colors')
                .setPlaceholder('Choose a new color...')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(options.map(r => ({ label: r.label, emoji: r.emoji, value: r.value })));

            embed.setTitle('🎨 Color Selection').setDescription(`**Active:** ${owned}\n*Selecting a new color will replace the current one.*`);
            await interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
        }

        else if (interaction.customId === 'btn_gaming') {
            const group = config.gamingRoles;
            const available = group.roles.filter(r => !interaction.member.roles.cache.has(r.value));
            const owned = getUserRolesInCategory(interaction.member, group.roles);

            if (!available.length) {
                embed.setColor(colors.warning).setTitle('🎮 Selection Complete').setDescription(`You already have all available Gaming roles!\n\n**Current:** ${owned}`);
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const options = available.slice(0, 25);
            const maxSelect = group.max === 0 ? options.length : Math.min(group.max, options.length, 25);

            const menu = new StringSelectMenuBuilder()
                .setCustomId('select_gaming')
                .setPlaceholder('Choose your games...')
                .setMinValues(1)
                .setMaxValues(maxSelect)
                .addOptions(options.map(r => ({ label: r.label, emoji: r.emoji, value: r.value })));

            embed.setTitle('🎮 Gaming Selection').setDescription(`**Your Roles:** ${owned}`);
            await interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
        }

        else if (interaction.customId === 'btn_self') {
            let description = '🛡️ **Identity Management**\n\n';
            const rows = [];
            let canSelectMore = false;

            safeGroups.forEach((group, index) => {
                const current = getUserRolesInCategory(interaction.member, group.roles);
                const ownedCount = group.roles.filter(r => interaction.member.roles.cache.has(r.value)).length;
                description += `**${group.name}:** ${current}\n`;

                const availableInGroup = group.roles.filter(r => !interaction.member.roles.cache.has(r.value));
                if (availableInGroup.length > 0 && (group.max === 0 || group.max === 1 || ownedCount < group.max)) {
                    canSelectMore = true;
                    const options = availableInGroup.slice(0, 25);
                    const groupMax = group.max === 0 ? options.length : Math.min(group.max, options.length, 25);

                    rows.push(new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`select_self_${index}`)
                            .setPlaceholder(`Select from ${group.name}...`)
                            .setMinValues(1)
                            .setMaxValues(groupMax)
                            .addOptions(options.map(r => ({ label: r.label, emoji: r.emoji, value: r.value })))
                    ));
                }
            });

            if (!canSelectMore) {
                embed.setColor(colors.success).setTitle('🛡️ Identity Complete').setDescription(`You have all available identity roles!\n\n${description}`);
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            embed.setDescription(description);
            await interaction.reply({ embeds: [embed], components: rows.slice(0, 5), ephemeral: true });
        }

        else if (interaction.customId === 'btn_remove') {
            const allRoles = [...(config.gamingRoles?.roles || []), ...(config.colorRoles?.roles || []), ...safeGroups.flatMap(g => g.roles)];
            const ownedList = allRoles.filter(r => interaction.member.roles.cache.has(r.value));

            if (ownedList.length === 0) {
                embed.setColor(colors.error).setTitle('⚙️ Management').setDescription('You don\'t have any roles to remove.');
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const limitedOwnedList = ownedList.slice(0, 25);

            let fullDescription = 'Select the roles you want to remove:\n';
            if (ownedList.length > 25) fullDescription += `*(Showing first 25 roles only)*\n\n`;

            const menu = new StringSelectMenuBuilder()
                .setCustomId('select_remove')
                .setPlaceholder('Select roles to detach...')
                .setMinValues(1)
                .setMaxValues(limitedOwnedList.length)
                .addOptions(limitedOwnedList.map(r => ({ label: r.label, emoji: r.emoji, value: r.value })));

            embed.setTitle('⚙️ Remove Roles').setDescription(fullDescription);
            await interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
        }
    }

    if (interaction.isStringSelectMenu()) {
        try {
            const successEmbed = new EmbedBuilder().setColor(colors.success);
            log(`${'\x1b[32m'}◆${'\x1b[0m'} ${'\x1b[1m'}${interaction.user.tag}${'\x1b[0m'} selected roles in ${'\x1b[35m'}${interaction.customId}${'\x1b[0m'}`, '\x1b[32m');

            if (interaction.customId === 'select_colors') {
                if (!isBooster) return interaction.reply({ content: 'Only boosters can do this.', ephemeral: true });
                const group = config.colorRoles;
                const colorIds = group.roles.map(r => r.value);
                const currentOwned = interaction.member.roles.cache.filter(r => colorIds.includes(r.id));
                if (currentOwned.size > 0) await interaction.member.roles.remove(currentOwned);
                await interaction.member.roles.add(interaction.values);
                log(`${'\x1b[35m'}★${'\x1b[0m'} Color role assigned to ${'\x1b[1m'}${interaction.user.tag}${'\x1b[0m'}`, '\x1b[35m');
                successEmbed.setDescription(`✅ **Color Updated:**\n${interaction.values.map(id => getRoleDetails(interaction.guild, id)).join('\n')}`);
                await interaction.update({ embeds: [successEmbed], components: [] });
                await sendDirectMessage(interaction.member, 'add', interaction.values);
            }
            else if (interaction.customId === 'select_remove') {
                await interaction.member.roles.remove(interaction.values);
                log(`${'\x1b[31m'}✪${'\x1b[0m'} Roles removed from ${'\x1b[1m'}${interaction.user.tag}${'\x1b[0m'}`, '\x1b[31m');
                successEmbed.setColor(colors.error).setDescription(`✅ **Successfully Removed:**\n${interaction.values.map(id => getRoleDetails(interaction.guild, id)).join('\n')}`);
                await interaction.update({ embeds: [successEmbed], components: [] });
                await sendDirectMessage(interaction.member, 'remove', interaction.values);
            }
            else if (interaction.customId.startsWith('select_self_')) {
                const groupIndex = parseInt(interaction.customId.split('_')[2]);
                const group = safeGroups[groupIndex];
                if (group.max === 1) {
                    const groupRoleIds = group.roles.map(r => r.value);
                    const currentInGroup = interaction.member.roles.cache.filter(r => groupRoleIds.includes(r.id));
                    if (currentInGroup.size > 0) await interaction.member.roles.remove(currentInGroup);
                }
                await interaction.member.roles.add(interaction.values);
                log(`${'\x1b[36m'}●${'\x1b[0m'} Self role assigned to ${'\x1b[1m'}${interaction.user.tag}${'\x1b[0m'} [${group?.name || 'unknown'}]`, '\x1b[36m');
                successEmbed.setDescription(`✅ **Role Updated:**\n${interaction.values.map(id => getRoleDetails(interaction.guild, id)).join('\n')}`);
                const updatedComponents = interaction.message.components.filter(row => row.components[0].customId !== interaction.customId);
                await interaction.update({ embeds: [successEmbed], components: updatedComponents });
                await sendDirectMessage(interaction.member, 'add', interaction.values);
            }
            else if (interaction.customId === 'select_gaming') {
                const group = config.gamingRoles;
                if (group.max === 1) {
                    const ids = group.roles.map(r => r.value);
                    const current = interaction.member.roles.cache.filter(r => ids.includes(r.id));
                    if (current.size > 0) await interaction.member.roles.remove(current);
                }
                await interaction.member.roles.add(interaction.values);
                log(`${'\x1b[33m'}♦${'\x1b[0m'} Gaming role assigned to ${'\x1b[1m'}${interaction.user.tag}${'\x1b[0m'}`, '\x1b[33m');
                successEmbed.setDescription(`✅ **Gaming Roles Updated:**\n${interaction.values.map(id => getRoleDetails(interaction.guild, id)).join('\n')}`);
                await interaction.update({ embeds: [successEmbed], components: [] });
                await sendDirectMessage(interaction.member, 'add', interaction.values);
            }
        } catch (e) { console.error(e); }
    }
});

process.on('unhandledRejection', error => {
    log(`${'\x1b[31m'}✖ ${error.message}${'\x1b[0m'}`, '\x1b[31m');
    console.error(error);
});
client.login(config.token).catch(() => {
    console.clear();
    const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', C = '\x1b[36m', B = '\x1b[34m', P = '\x1b[38;5;213m', bold = '\x1b[1m', reset = '\x1b[0m';
    console.log(`
${R}${bold}TOKEN ERROR${reset}

${R}✖${reset} Token is missing or invalid

${Y}${bold}How to fix:${reset}
${C}  1.${reset} Go to ${B}https://discord.com/developers/applications${reset}
${C}  2.${reset} Select your bot → Bot → Reset Token
${C}  3.${reset} Copy the new token
${C}  4.${reset} Open ${P}config.js${reset} and replace ${R}"TOKEN_HERE"${reset}
${C}  5.${reset} Run ${G}node index${reset} again

${bold}${P}https://github.com/ar5594${reset}
`);
});
