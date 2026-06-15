module.exports = {
    // Bot token (set this before running)
    token: "TOKEN_HERE",

    // Gaming role categories
    // max: 0 means unlimited selection
    gamingRoles: {
        max: 0,
        roles: [
            { label: "Among Us", emoji: "<:5346_DeadRedAmongUs:1500707235142308013>", value: "1460786981146722378" },
            { label: "Minecraft", emoji: "<:minecraft:1500707245934116914>", value: "1460786983386353798" },
            { label: "Stumble Guys", emoji: "<:Stumble_Guys:1500707256587780242>", value: "1460786991645069498" },
            { label: "Free Fire", emoji: "<:free_fire48:1500707267144843326>", value: "1460786993595420714" },
            { label: "GTA V", emoji: "<:GTAV:1500707926543695873>", value: "1460786995562418196" },
            { label: "Fortnite", emoji: "<:Fortnite:1500574518094200862>", value: "1460786996724236643" },
            { label: "PUBG", emoji: "<:pubg30:1500707937797017670>", value: "1460786998259482812" },
            { label: "Roblox", emoji: "<:roblox:1500707948245029045>", value: "1460786999504933026" },
            { label: "Rocket League", emoji: "<:zrocket_league_logo:1500707958332592242>", value: "1460787000784322752" },
            { label: "Loup Garou", emoji: "<:loupgarou:1500707969225064468>", value: "1460787003128938630" },
            { label: "Chess", emoji: "<:chess:1500708393596354570>", value: "1460787005112713308" },
            { label: "Codenames", emoji: "<:Codenames:1500708404149223485>", value: "1460787006589374648" },
            { label: "League of Legends", emoji: "<:LeagueofLegends:1500708414576136284>", value: "1460787008262635786" },
            { label: "Brawlhalla", emoji: "<:Brawlhalla:1500574506987815033>", value: "1460787009315537121" },
            { label: "BloodStrike", emoji: "<:BloodStrike:1500574496250138706>", value: "1460787012008415243" },
            { label: "FIFA", emoji: "<:fifa:1500708425225732157>", value: "1460787013321097371" },
            { label: "CSGO", emoji: "<:CSGO:1500708435203850342>", value: "1460787015367921779" },
            { label: "Valorant", emoji: "<:valorant:1500709196629545085>", value: "1460787020363468872" },
            { label: "Domino", emoji: "<:59047domino:1500709207639330967>", value: "1460787016982728726" },
            { label: "Criminal", emoji: "<:criminal:1500709218280411281>", value: "1460787018287284235" },
            { label: "Genshin Impact", emoji: "<:GenshinImpact:1500709239847649373>", value: "1500704868866723860" },
            { label: "Call of Duty", emoji: "<:call_of_duty:1500709250941583390>", value: "1500704784150298695" },
            { label: "Joker Takeoff", emoji: "<:joker_takeoff:1500709261435605062>", value: "1500703968215437352" }
        ]
    },

    // Self-assignable role groups (Identity)
    // Each group has a name, max limit, and array of roles
    selfRolesGroups: [
        {
            name: "Notification",
            max: 0,
            roles: [
                { label: "Movie's", emoji: "<:emoji_26:1500714960697954335>", value: "1460787033583652966" },
                { label: "Event's", emoji: "<:emoji_27:1500715027660017704>", value: "1460787035013910590" },
                { label: "Giveaways", emoji: "<:emoji_28:1500715082500542474>", value: "1460787036880371852" },
                { label: "Mini Games", emoji: "<:emoji_28:1500715120911974520>", value: "1460787039355142216" },
                { label: "Content Creators", emoji: "<:emoji_40:1500719456811225128>", value: "1460787040835604612" }
            ]
        },
        {
            name: "Skills",
            max: 0,
            roles: [
                { label: "Designer", emoji: "<:emoji_37:1500719296349999126>", value: "1460787047068602438" },
                { label: "Anime", emoji: "<:emoji_35:1500719259624407070>", value: "1460787049253834947" },
                { label: "Art", emoji: "<:emoji_40:1500719421092528249>", value: "1460787050646208698" },
                { label: "Eport & Fitness", emoji: "<:emoji_32:1500719103122342008>", value: "1460787052806279314" },
                { label: "Programmer", emoji: "<:emoji_33:1500719174362861639>", value: "1460787051732402448" },
                { label: "Music", emoji: "<:emoji_32:1500719138866200616>", value: "1460787053951455246" },
                { label: "Editor", emoji: "<:emoji_39:1500719380168835173>", value: "1460787056031694948" },
                { label: "Cooking", emoji: "<:emoji_34:1500719222962126928>", value: "1460787058271584377" }
            ]
        },
        {
            // max: 1 enforces single selection (replaces old one)
            name: "Year",
            max: 1,
            roles: [
                { label: "+18", emoji: "<:emoji_30:1500715242961895504>", value: "1460787066303414512" },
                { label: "-18", emoji: "<:emoji_31:1500715925291270316>", value: "1460787068212084736" }
            ]
        }
    ],

    // Color roles (Boosters only)
    // max: 1 forces replacement when a new color is selected
    colorRoles: {
        max: 1,
        roles: [
            { label: "Rosy", emoji: "<:emoji_49:1501171379037274212>", value: "1501158593142063175" },
            { label: "Red", emoji: "<:emoji_48:1501171331952283788>", value: "1501163591364251769" },
            { label: "Black", emoji: "<:emoji_47:1501171275433902181>", value: "1501158903864361120" },
            { label: "Snow", emoji: "<:emoji_46:1501171200892604497>", value: "1501159008051134505" },
            { label: "Sun", emoji: "<:emoji_43:1501170812110114856>", value: "1501159287936913489" },
            { label: "Sea", emoji: "<:emoji_45:1501171087222767646>", value: "1501159465385332736" },
            { label: "Land", emoji: "<:emoji_43:1501170310815285319>", value: "1501159648781139998" },
            { label: "Mint", emoji: "<:emoji_50:1501171420120486048>", value: "1501159792604086313" }
        ]
    }
};
