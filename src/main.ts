import "./shim.js";
import "./game.ts";
import "./vue.ts";

// This should only be enabled for testing — it allows to easily access otherwise hidden modules such as
// the player object or gamestates such as Study()
// A real build should generally comment out this file
import "./merge-global.ts";