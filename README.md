# OddRealmModPatcher

OddRealmModPatcher (or ORMP) is a game-data patcher for the game [https://oddrealmgame.com](Odd Realm), allowing users to easily create their own gde_data.txt documents to load custom items and furniture into the game.

This is NOT a mod _loader_ - the game loads mods on it's own, as long as you're on version 11 (as of Feb. 10th, 2022 that's the beta branch)

# FAQ

Q: How do I make it work?
A:
    1) Download [NodeJS](https://nodejs.org) and [The current release](https://github.com/kd8lvt/oddrealmmodpatcher/releases) (keep in mind, if I'm actively working on it, the current commit may be broken.)
    2) Install NodeJS.
    3) Extract the release Zip to it's own folder
    4) Open your Shell of choice in the source folder
    5) Run `npm install`
    6) Copy the gde_data.txt file from OddRealm into "original_game_data"
    7) Copy your mods into "mods" - they should be in their own folders, and not in zip files.
    8) Run `node index`
    9) Copy the newly-generated "gde_data_mod.txt" to your OddRealm folder.

Q: The game is getting stuck when I try to load mods!
A: Don't panic! Get your Player.log (stored in one of the below locations, depending on your OS) and report a bug HERE first.
    Location on Windows: C:\users\you\appdata\locallow\Unknown Origin Games\OddRealm
    Location on Mac: ~/Library/Application Support/Unknown Origin Games/OddRealm
    Location on Linux: ~/.config/unity3d/Unknown Origin Games/OddRealm

Q: How do I make a mod?
A: Check out the example mods in the examples directory. There isn't much by way of documentation just yet, you'll have to figure it out. Some things to keep in mind:
    1) ORMP already adds in the vanilla data - start with a clean json file.
    2) Removal of data is not supported, and probably never will be. If you absolutely must remove a value, replace it with `null`
    3) Items are added in arrays that correspond to their category - you have to adhere to this or your data will NOT be loaded by the game.
