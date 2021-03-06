import * as jsonpatch from 'fast-json-patch/index.mjs';
import fs from 'fs';
import path from 'path';
import * as walkdir from 'walkdir'
const walk = walkdir.default;

let args = process.argv;
args.splice(0,2);
let debug = false;
let verbose = false;
if (args[0] && args[0].toLowerCase() == 'debug=true') debug = true;
if (args[0] && args[0].toLowerCase() == 'verbose=true') verbose = true;

//Load original data
let original_data = JSON.parse(fs.readFileSync('./original_game_data/gde_data.txt','utf-8'));
//Instatiate modded data
let modData = {};
//Get mod order list ready
let modOrder = [];

//List of known ID ranges to check new mods against
let knownIdRanges = [];

function loadMod(file,filePath) {
    let modMeta = JSON.parse(fs.readFileSync(file,'utf-8'));
    console.log(`Found ${modMeta.name}`)
    if (knownIdRanges.find((elem)=>{return elem.rangeId == modMeta.rangeId}) != undefined) {
        return console.log(`Mod "${modMeta.name}" has a duplicate idRange with "${knownIdRanges.find((elem)=>{return elem.idRange == modMeta.idRange}).name}" - please alert the mod authors so they can solve this! (Not loading "${modMeta.name}" to prevent errors.)`);
    }

    knownIdRanges.push({rangeId:modMeta.rangeId,name:modMeta.name});

    if (modMeta.filesToLoad.length == 1) {
        let fileData = {file:path.join(filePath,modMeta.filesToLoad[0]),id:modMeta.id,loadAfter:modMeta.loadAfter,fileNumber:0,name:modMeta.name};
        modOrder.push(fileData);
        return;
    }

    for (let i in modMeta.filesToLoad) {
        let modFile = modMeta.filesToLoad[i];
        let fileData = {file:path.join(filePath,modFile),id:modMeta.id,loadAfter:modMeta.loadAfter,fileNumber:i,name:modMeta.name};
        modOrder.push(fileData);
    }
}

function generateLoadOrder() {
    if (debug) console.log(modOrder.length)
    return new Promise(res => {
        for (let i in modOrder) {
            let file = modOrder[i];
            if (file.file.endsWith('.ormpmeta')) modOrder.splice(i,1);
        }
        modOrder.sort((a,b)=>{
            if (a.id == b.id) {
                //IDS are the same, keep internal mod file load order identical
    
                if (a.fileNumber > b.fileNumber) return -1; //Sort a before b
                return 1; //Sort a after b
            } else {
                //IDS are not the same - do loadAfters, but otherwise keep load order the way it was generated.
    
                if (a.loadAfter.includes(b.id)) {
                    if (debug || verbose) console.log(`Loading "${a.name}" after "${b.name}" on request.`)
                    return 1; //Sort a after b
                }
                if (b.loadAfter.includes(a.id)) {
                    if (debug || verbose) console.log(`Loading "${b.name}" after "${a.name}" on request.`)
                    return -1 //Sort a before b
                }
                return 0; //Keep original order
            }
        });

        res();
    })
}

function generateModdedFile() {
    console.log(`Found ${modOrder.length} mod files to load`)

    //Merge the mods into one document
    for (let modFileData of modOrder) {

        let modFile = JSON.parse(fs.readFileSync(modFileData.file,'utf-8'))
        //Generate diff patch
        let diff = jsonpatch.compare(modData,modFile);

        /*
            To make sure all removals are accounted for, we run the delet loop 10 times.
            Yes, for some reason this does need to happen.
        */

        for (let i=0;i<10;i++) for (let i in diff) {
            let oper = diff[i];
            //Remove all 'remove' operations, so we load more than just one mod.
            if (oper.op == 'remove') diff.splice(i,1);
        }

        //Apply the patch to internal data structure.
        jsonpatch.applyPatch(modData,diff);
    }
    
    //Now that all the mods are in one big happy family, merge them into the original game data
    let diff = jsonpatch.compare(modData,original_data);
    //Again - yes, running this loop 10 times is needed.
    for (let i=0;i<10;i++) for (let i in diff) {
        let oper = diff[i];
        //Remove all 'remove' operations, so we load more than just one mod.
        if (oper.op == 'remove') {
            diff.splice(i,1)
        }
    }


    jsonpatch.applyPatch(modData,diff);

    fs.writeFileSync('gde_data_mod.txt',JSON.stringify(modData));
    console.log(`Done generating modded file!`);
}

let files = walk.sync('./mods');

for (let file of files) {
    if (!file.endsWith('ormpmeta')) continue;

    let split = file.split('\\');
    delete split[split.length-1];
    let filePath = split.join('\\');

    loadMod(file,filePath);
}

generateLoadOrder().then(()=>{
    if (debug) console.log(`Load order: ${JSON.stringify(modOrder)}`)
    generateModdedFile();
});