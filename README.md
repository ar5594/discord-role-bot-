# Discord Role Management Bot

A Discord bot that lets members pick their own roles using buttons and menus.

![Bot Interface](https://i.postimg.cc/pL0yJbbW/Screenshot-2026-06-16-004734.png)

## Features

- 🎮 **Gaming Roles** — Pick your games (Minecraft, Fortnite, Valorant, etc.)
- 🛡️ **Identity Roles** — Choose roles that describe you (Notifications, Skills, Age)
- 🎨 **Color Roles** — Change name color (Boosters only)
- ❌ **Remove Roles** — Remove any roles you have
- 📬 **DM Notifications** — Get a DM when roles change
- 🔧 **Admin Setup** — Type `!setup` to show the panel

## Commands

| Command | Who can use | What it does |
|---------|-------------|--------------|
| `!setup` | Admin only | Sends the role panel with 4 buttons |

## How to Run

### 🖥️ On your PC

1. **Install** [Node.js](https://nodejs.org/) v16.9.0+
2. **Get a bot token** from [Discord Developer Portal](https://discord.com/developers/applications)
3. **Download** the project:
   ```bash
   git clone https://github.com/ar5594/discord-role-bot.git
   cd discord-role-bot
   ```
4. **Install packages**:
   ```bash
   npm install
   ```
5. **Set your token** in `config.js`
6. **Run**:
   ```bash
   npm start
   ```

### ☁️ On a Host (DisCloud, PebbleHost, etc.)

1. **Zip** the project folder (without `node_modules`)
2. **Upload** to your host
3. **Set start command** to: `npm install && npm start`
4. **Make sure** your token is in `config.js` before uploading

## Configuration

Everything is in `config.js`:

| Setting | What it is |
|---------|------------|
| `token` | Your bot token |
| `gamingRoles` | List of game roles |
| `selfRolesGroups` | Identity role groups |
| `colorRoles` | Color roles (Boosters only) |

Each role has: `label` (name), `emoji`, `value` (role ID).

## How to Get Role IDs & Emojis

### Getting a Role ID

1. Open Discord → **User Settings** → **Advanced**
2. Turn on **Developer Mode**
3. Go to your server → **Server Settings** → **Roles**
4. Right-click the role you want → **Copy ID**
5. Paste it in `config.js` as the `value`

### Getting an Emoji ID

1. Type the emoji in chat with a backslash `\` before it
   ```
   \:emoji_name:
   ```
2. Discord will show the emoji code like:
   ```
   <:emoji_name:123456789>
   ```
3. Copy that whole code and paste it as the `emoji` in `config.js`

### Role Entry Example

```js
{ label: "Minecraft", emoji: "<:minecraft:1500707245934116914>", value: "1460786983386353798" }
```

| Part | What it means |
|------|---------------|
| `label` | Name shown in the menu |
| `emoji` | Emoji code from Discord |
| `value` | Role ID from Discord |

## Customization

| What to change | File | Lines |
|---------------|------|-------|
| Panel text | `index.js` | 73–87 |
| Panel title | `index.js` | 90 |
| Banner image | `index.js` | 28 |
| Button names | `index.js` | 96–99 |
| Colors | `index.js` | 20–26 |
| Game roles | `config.js` | 6–33 |
| Identity roles | `config.js` | 35–69 |
| Color roles | `config.js` | 72–84 |
| Bot status text | `ready.js` | 6–8 |

## Project Files

```
├── buttons/          # Button helper files
├── config.js         # Token & role settings
├── index.js          # Main bot code
├── ready.js          # Startup display
├── package.json      # Dependencies
└── README.md         # This file
```

## Common Problems

- **Token is shared** → Reset it at [Developer Portal](https://discord.com/developers/applications)
- **Missing packages** → Run `npm install`
- **Bot can't assign roles** → Give it "Manage Roles" permission
- **Role IDs wrong** → Use the correct IDs from your server
- **User DMs off** → Bot skips DM (no crash)

## Built With

- [discord.js](https://discord.js.org/) v14
- [Node.js](https://nodejs.org/)

## Author

**r.vu**

## 📞 Support

💬 **Discord Server:** https://discord.gg/wxkxHmR9GT  
👤 **My Discord:** r.vu  

⚡ Any issues or questions? Contact me.