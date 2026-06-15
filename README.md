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

All settings are in the `config.js` file.

| Property | Type | Description |
|----------|------|-------------|
| `token` | `string` | Your Discord bot token |
| `gamingRoles` | `object` | Gaming roles list (`max: 0` = unlimited) |
| `selfRolesGroups` | `array` | Self-role groups with name, max, and roles |
| `colorRoles` | `object` | Color roles for Boosters (`max: 1` = single select) |

Each role entry has:
- `label` — Display name shown in the menu
- `emoji` — Custom emoji for the role
- `value` — Discord role ID

## Customization

| What | File | Lines |
|------|------|-------|
| Embed text (description) | `index.js` | 73–87 |
| Embed title | `index.js` | 90 |
| Banner image URL | `index.js` | 28 |
| Button labels | `index.js` | 96–99 |
| Embed colors | `index.js` | 20–26 |
| Gaming roles | `config.js` | 6–33 |
| Self roles (identity) | `config.js` | 35–69 |
| Color roles | `config.js` | 72–84 |
| Bot status name & URL | `ready.js` | 6–8 |

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

- **Token exposed** → Reset it immediately at [Developer Portal](https://discord.com/developers/applications)
- **`npm install` not run** → Run `npm install` before starting
- **Bot needs "Manage Roles" permission** → Add it when inviting the bot
- **Role is higher than bot's top role** → Move bot's role higher in server settings
- **Wrong role IDs** → Role IDs must exist in your server
- **Max 25 options per menu** → Already handled with `.slice(0, 25)`
- **Max 5 action rows** → Already handled with `.slice(0, 5)`
- **User DMs disabled** → Bot skips DM silently (no crash)

## Built With

- [discord.js](https://discord.js.org/) v14.14.1
- [Node.js](https://nodejs.org/) v16.9.0+

## Author

**r.vu**

---

## 📞 Support

💬 **Discord Server (Support):** https://discord.gg/wxkxHmR9GT  
👤 **My Discord:** r.vu  

⚡ If you find any issue in the code or have any questions, feel free to contact me for support or inquiries.
