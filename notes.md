# PRACTICES:
## Import Order: 
Note:
1) The paths picked use the absolute filepath (@/*), which basically calls (/src/*). Unless the file is
directly in the same folder, then use relative (./*). Always define the filetype (*.js or *.vue).
Exceptions are the files directly on the (src/*) folder.
2) The order of each group is in alphabetical order (of the file), or longest to the shorter path ("/core
state" is before imports "/core").
3) Each group "idea" is together, seperated by one (1) line; exceptions are index.*. If a file has
enough imports it makes more sense to section each of them, make every other segregation spaced by
three (3).

Import APIs (Component)
Import Component (Doesn't need to follow Note 2 if it's a list with a "Sort by Importance")
...Leave three (3) line gap for differentation. Leave five (5) if the latter case above applies
Import player object ('@/core/player.js')
Import Currencies (Seed, Spectre, etc.), not ('@/core/state/mechanic/currency.js'.)
Import States (state/mechanic/*) is before (state/*)
Import Utilities


# TODO:
[Good] Create SVG Connectors for Studies
[Ok-ish] Add handler for grandderivatives (Study-twice derivative) obfuscation, and great-grandderivative (Study-thrice derivative) and other descendants as hidden. Goddarnit.
Figure out how to make the design mobile-friendly
Do a lot of stuff. Cry.

Add

[Good] Create intervals (gameloop)
Create effect caculations
Create Storage System
Add handler for duplicate IDs (Game State)
Add handler for confirming derivative and imperative accuracy (Study State)
Create a lotta stuff you gotta cry