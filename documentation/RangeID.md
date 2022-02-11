# RangeID

RangeID is a system devised by Mantic Marksman.\
Here's how it works:\

Example Title of a mod:\
Darkwood Table Mod : 00001\

Example Range ID: (which goes in the ormpmeta file)\
"00001"\

Example Item/Block Index Value:\
1337000011\

Broken down into it's component parts, that's:\
1337 | 00001 | x\

1337

```txt

The mod heading section. Ensures that the mod will not interfere with regular game assets in future versions and enables debuggers to recognize mod entries at a glance.

Example value is derived from the word “Leet” as a joke.

Could also be changed if all 99999 mod range id’s are filled.
```

00001

```txt
Range ID of “1” shown above.

The 5 digit Range ID allows modders to make mods that are compatible by not utilizing the same Index id’s.

Ideally the Range ID would be appended to the end of mod names so that new mod creators could check the current repository to know what ID is available for their mod. 
```

x

```txt
The actual Index of the element in the mod, in the case of the above example, it's 1.
```
