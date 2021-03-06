# OddRealmModPatcher

OddRealmModPatcher (or ORMP) is a game-data patcher for the game [Odd Realm](https://oddrealmgame.com), allowing users to easily create their own "gde_data_mod.txt" documents to load custom items and furniture into the game.

This is NOT a mod _loader_ - the game loads mods on it's own, as long as you're on version 10+ (as of Feb. 12th, 2022 that's the beta branch)

# FAQ

Q: How do I make it work?

A:  
    1) Download [NodeJS](https://nodejs.org) and [The current release](https://github.com/kd8lvt/oddrealmmodpatcher/releases)  
    2) Install NodeJS.  
    3) Extract the release Zip to it's own folder  
    4) Open your Shell of choice in the source folder  
    5) Run `npm install`  
    6) Create two folders in the folder where you extracted ORMP - one named "mods" and another named "original_game_data"  
    7) Copy the gde_data.txt file from OddRealm into "original_game_data"  
    8) Copy your mods into "mods" - they should be in their own folders, and not in zip files.  
    9) Run `node index`  
    10) Copy the newly-generated "gde_data_mod.txt" to your OddRealm folder. Do NOT rename it  

Q: The game is getting stuck when I try to load mods!

A: Don't panic! Get your Player.log (stored in one of the below locations, depending on your OS) and report a bug HERE first.  
    Location on Windows: C:\users\you\appdata\locallow\Unknown Origin Games\OddRealm  
    Location on Mac: ~/Library/Application Support/Unknown Origin Games/OddRealm  
    Location on Linux: ~/.config/unity3d/Unknown Origin Games/OddRealm  

Q: How do I make a mod?

A: Check out the example mods in the examples directory. There isn't much by way of documentation just yet, you'll have to figure it out. Some things to keep in mind:  
    1) ORMP already adds in the vanilla data - start with a clean json file.  
    2) Removal of data is not supported, and probably never will be due to how fast-json-patcher works. If you absolutely must remove a value, try to replace it with `null`  

Q: What is currently moddable?

A: As of Feb 12th, 2022 Odd Realm supports modding everything except UI Button Icons and Character Sprites. However, ORMP itself doesn't support patching the texture atlas at all currently - you'll have to edit it manually. Slepnir is planning on switching to a dynamically-stitched atlas at some point, so we will be able to easily implement texture patching when that happens.
