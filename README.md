# Discord Role Management Bot

A Discord bot built with **discord.js v14** that allows server members to self-assign roles through an interactive panel with buttons and select menus.

## Features

- **Gaming Roles** — Choose from 23+ gaming roles (Minecraft, Fortnite, Valorant, etc.)
- **Identity Roles** — Self-assign roles grouped by category (Notifications, Skills, Age)
- **Color Roles** — Boosters-only name color picker (replaces on new selection)
- **Role Removal** — Remove any assigned roles from the same panel
- **DM Notifications** — Receive a private message when roles are added or removed
- **Admin Setup** — Type `!setup` to deploy the role management panel

## Commands

| Command | Permission | Description |
|---|---|---|
| `!setup` | Administrator | Sends the Role Management Center embed with 4 buttons |

## Getting Started

There are two ways to run the bot:

---

### 🖥️ 1. Run on your PC (Local)

#### Prerequisites

- [Node.js](https://nodejs.org/) v16.9.0 or higher
- A Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))

#### Installation

1. Download or clone the project:
   ```bash
   git clone https://github.com/your-username/discord-role-bot.git
   cd discord-role-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open `config.js` and set your bot `token`

4. Start the bot:
   ```bash
   npm start
   ```

---

### ☁️ 2. Run on a Host (Free/Paid hosting)

Hosting examples: **DisCloud**, **PebbleHost**, **OxideHost**, **VPS**, or any Node.js host.

#### Steps:

1. **Compress the project folder** (without `node_modules`) into a `.zip` file

2. **Upload the `.zip` file** to your hosting dashboard

3. **Set the start command** to:
   ```
   npm install && npm start
   ```
   *(The host will automatically install dependencies and run the bot)*

4. **Make sure** `config.js` has your token before uploading

> **Note:** Some hosts require you to set the token as an **Environment Variable** instead of putting it in `config.js`. Check your host's documentation.

## Configuration

كل الإعدادات في ملف `config.js`  
All settings are in the `config.js` file.

| الخاصية | النوع | الشرح |
|---------|------|-------|
| `token` | نص `string` | توكن البوت حقك من Discord Developer Portal |
| `channelId` | نص `string` | آيدي القناة اللي حترسل فيها لوحة `!setup` |
| `gamingRoles` | كائن `object` | رتب الألعاب (`max: 0` = اختيار غير محدود) |
| `selfRolesGroups` | مصفوفة `array` | رتب الهوية مقسمة لمجموعات (اسم، حد أقصى، ورتب) |
| `colorRoles` | كائن `object` | رتب الألوان للـ Boosters (`max: 1` = اختيار واحد فقط) |

كل رتبة فيها:
- `label` — اسم الرتبة اللي يظهر في القائمة
- `emoji` — إيموجي الرتبة (كود السيرفر)
- `value` — آيدي الرتبة في سيرفر ديسكورد

## Customization

### Changing the Embed Text (Description)
**File:** `index.js` — Lines `73`–`87`

Each string between quotes `'...'` is a line in the embed. Edit them to change what appears in the Role Management Center.

```js
const descriptionText = [
    'Personalize your profile experience using the options below.',  // Line 74
    '',
    '<a:purple:1500913133781520394> **|** __**Identity Roles**__',  // Line 76
    'Define your personality.',
    '',
    '<a:purple:1500913133781520394> **|** __**Gaming Roles**__',    // Line 79
    'Connect with gamers.',
    '',
    '<a:purple:1500913133781520394> **|** __**Color Roles**__ (Boosters Only)', // Line 82
    'Change name color.',
    '',
    '<a:purple:1500913133781520394> **|** __**Management**__',      // Line 85
    'Remove active roles.'
].join('\n');
```

### Changing the Title
**File:** `index.js` — Line `90`
```js
.setTitle('Role Management Center')
```
Change `'Role Management Center'` to your desired title.

### Changing the Banner Image
**File:** `index.js` — Line `28`
```js
const bannerImage = "https://i.postimg.cc/vTK73Ycw/Picsart-26-04-02-11-42-23-984.png";
```
Replace the URL with your own image link.

### Changing Button Labels
**File:** `index.js` — Lines `96`–`99`
```js
.setLabel('Self Roles')      // Identity button
.setLabel('Gaming Roles')    // Gaming button
.setLabel('Colors')          // Colors button
.setLabel('Remove Roles')    // Remove button
```

### Changing Embed Colors
**File:** `index.js` — Lines `20`–`26`
```js
const colors = {
    main: '#71368a',     // Purple
    success: '#6AF08A',  // Green
    error: '#F06A6A',    // Red
    info: '#6ABBF0',     // Blue
    warning: '#FFE084'   // Yellow
};
```

### Changing Game Roles
**File:** `config.js` — Lines `6`–`33`
Each entry: `{ label: "Game Name", emoji: "<emoji>", value: "role_id" }`

### Changing Identity (Self) Roles
**File:** `config.js` — Lines `35`–`69`
Three groups: Notification, Skills, Year. Edit labels, emojis, and role IDs.

### Changing Color Roles
**File:** `config.js` — Lines `72`–`84`
Edit color labels, emojis, and role IDs. (Boosters only, single select.)

### Changing CMD Startup Banner
**File:** `ready.js` — Lines `10`–`17`
```js
name: `Realite・by (r.vu)`,   // Streaming status text
url: "https://www.twitch.tv/discord"  // Stream URL
```

## Project Structure

```
├── buttons/
│   ├── buttonsselfRoles.js
│   ├── colorRoles.js
│   ├── gamingRoles.js
│   └── removeRoles.js
├── config.js          # Configuration and role definitions
├── index.js           # Main bot logic and interaction handling
├── ready.js           # Bot startup presence and logging
├── package.json       # Project metadata and dependencies
├── README.md          # This file
```

## Potential Problems

| # | Problem | Fix |
|---|---------|-----|
| 1 | **Token is exposed/shared** | Anyone can control your bot. Go to [Developer Portal](https://discord.com/developers/applications) → Reset Token immediately |
| 2 | **Missing `npm install`** | Run `npm install` before starting the bot |
| 3 | **Bot lacks "Manage Roles" permission** | Add `Manage Roles` in OAuth2 URL Generator when inviting the bot |
| 4 | **Role higher than bot's top role** | The bot cannot assign roles above its own highest role. Move the bot's role higher in server settings |
| 5 | **Wrong role IDs in config.js** | Role IDs must exist in your server. Copy the correct ID from Discord (Server Settings → Roles → right-click role → Copy ID) |
| 6 | **More than 25 roles in one menu** | Discord limits select menus to 25 options. The code handles this with `.slice(0, 25)`, but ensure your role groups don't exceed this |
| 7 | **More than 5 action rows** | Discord limits to 5 rows. The code uses `.slice(0, 5)` to stay safe |
| 8 | **No `node_modules` folder** | This folder is created by `npm install`. Do NOT upload it to GitHub — add `node_modules/` to `.gitignore` |
| 9 | **User has DMs disabled** | The bot will skip DM notifications silently (no crash) |

## Built With

- [discord.js](https://discord.js.org/) v14.14.1
- [Node.js](https://nodejs.org/) v16.9.0+

## Author

**r.vu**
