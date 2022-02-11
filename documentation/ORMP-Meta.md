# ORMP Meta Files

The ormpmeta file is the file which tells ORMP what to load, and in what order.\
It also defines the following attributes:\

```txt
    (string) id: The ID of your mod. Must be unique, and preferrably in a format similar to "author.mod_family.mod_name"
    (string) name: I think this should be self explanatory.
    (string) rangeId: The Range ID of your mod - see the RangeID documentation for more information.
    (string) version: The version of the mod. Should be in sem-ver format, but doesn't have to be.
    (array[string]) authors: The list of contributors. Should contain at least one value, but can be empty.
    (array[string]) filesToLoad: The list of files that should be loaded, which get loaded in the order they are listed. Should contain at least one value. Use relative paths.
    (array[string]) loadAfter: A list of mod ids that your mod should be loaded after. Can be empty, but must be present.
```
