# Miscellaneous Plugins

A series of small, miscellaneous plugins for RPG Maker MV.  These plugins are typically just installed and change a single aspect of a game.

## Pretty Plugin Params

This plugin completely corrects the major problem with using the MV 1.5 plugin parameter format by converting them from a gnarly mess of string data into a nice, easy to use JSON object like they were intended to be.  With this plugin and one line of code, you'll get a cleanly formatted object with all of the data properly typed.  Strings remain strings, numbers remain numbers, arrays stay arrays, objects are still objects and arrays of objects come out as arrays of objects.  It's a beautiful thing, really. Brings a tear of joy to your eye.

## Skill Type Dupe Fix

By default in RPG Maker MV, if a Skill Type is added to an actor more than once, it'll show up in the command list for Skills multiple times.  This plugin corrects that.

This became an issue for me when using my various Level-based Traits and Talent-based Traits plugins.  Maybe a player chooses the Gnome race which grants a few low-level illusion spells.  They may choose a class that has magical ability which means that they also have to receive the proper Skill Type in order to use it.  But then again, they may choose a class that already receives this Skill Type so they will end up having it listed twice.  I don't know why RPG Maker MV lists duplicate Skill Types but it doesn't so that's why this plugin exists.

## Minimum 1 HP Damage

Many developers have asked how to make it so that the minumum amount of damage that can be infliced on a hit is 1 instead of 0.  These plugins do just that.  Make sure you use the one that coresponds with the other plugins you are using.

## Disable Smooth Targeting

The original Final Fantasy had a unique quirk.  While it used the default battle system, your characters would attack whatever you told them to and the game wouldn't adjust the target if they were attacking a dead opponent.  Most games since then have implemented target smoothing which handles this adjustment.  While this is pretty standard now, it comes with a side effect.  Now most battles can be won by just spamming the attack button and killing one enemy at a time and that is often times the best strategy to win fights.  If you want to return to the days of making your players more carefully plan out their attacks by removing target smoothing, install this plugin.

## Terms of Use

This plugin can be used in commercial or non-commercial projects.
Credit Frogboy in your work.
