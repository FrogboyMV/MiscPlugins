//=============================================================================
// Frogboy RMMV Plugin
// PrettyPluginParams.js
//=============================================================================

var Imported = Imported || {};
Imported.PrettyPluginParams = true;

/*:
 * @plugindesc v1.0 Converts plugin parameters into an easy to use JSON object.
 * @author Frogboy
 *
 * @help
 * v1.0 Converts plugin parameters into an easy to use JSON object
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Note: You do not need this plugin for any FROG plugins.  This functionality
 * has been baked into FROG_Core from the beginning.  This is for you to use in
 * your own plugins.
 *
 * The new MV 1.5 plugin parameters are awesome!  They really make things easy
 * on developers.  No more learning how each and every plugin maker designs
 * their note tags.  No more learning a bunch of note tag commands for every
 * plugin in order just to use it.  No more typos which cause things not to
 * work or perhaps even crash your game.  You just tell the plugin what values
 * it needs and what types of data they collect.
 *
 * It's much cleaner too.  Asking a game dev to enter in complex data into note
 * tags is just asking them to make mistakes and creates a lot of frustration.
 * They might end up not even using your plugin if they can't get it to work.
 * You also get the advantage of being able to supply a default configuration
 * which makes it easy for devs to play around with your plugin without having
 * to invest a lot of time and energy trying to set things up just to test.
 *
 * But the designers of RMMV dropped the ball on one thing.  As great as the
 * new plugin parameters are, they didn't give plugin developers an easy way to
 * get the data out in a usable fashion.  When you read the data, you do get an
 * object but only for the first layer.  Everything contained within the this
 * single layer of object properties is a big mess of strings that need to be
 * run through JSON.parse constantly.  It really gets in your way and largely
 * becomes more trouble than it's worth.  Because of this, most plugin
 * developers have stuck with using note tags and all of the problems they
 * bring.  It's just too much work.
 *
 * Not any longer, though!  This plugin completely corrects the major problem
 * with using the MV 1.5 plugin parameter format by converting them from a
 * gnarly mess of string data into a nice, easy to use JSON object like they
 * were intended to be.  With this plugin and one line of code, you'll get a
 * cleanly formatted object with all of the data properly typed.  Strings
 * remain strings, numbers remain numbers, arrays stay arrays, objects are
 * still objects and arrays of objects come out as arrays of objects.  It's a
 * beautiful thing, really. Brings a tear of joy to your eye.
 *
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Place this plugin above any other plugins that use it.
 *
 * Just define a variable to store the plugin parameters and then pass it and
 * the plugin parameters to the convert function.
 *
 * var variable = {};
 * convertPluginParams(paramerters, variable);
 *
 * Example:
 * var $pluginParams = {};
 * convertPluginParams(PluginManager.parameters('Filename'), $pluginParams);
 *
 * That's it!  All of your plugin parameters, no matter how complex, can now be
 * accessed in the variable you provided.  Couldn't get much easier than that!
 *
 * In addition to easily reading in plugin parameters, there's a couple of other
 * things you can do with this.  Now that your plugin parameters are all neatly
 * tucked away in a JSON object, they are super simple to change in-game now.
 * Say you have a parameter that sorts Quests either ascending or decending.
 * You can give your players the option to change this to their liking in the
 * game.  If you allow these parameters to be changed in-game, though, you
 * probably want to save these changes so that they aren't lost when the player
 * closes the game, comes back later and the reloads their game.  That's really
 * easy to do now.
 *
 * The example below assumes that there is a plugin parameter named
 * saveParamObject (or Save Param Object if camel-case is turned on).  It
 * aliases setupNewGame, makeSaveContents and extractSaveContents to handle
 * resetting parameters on new game, saving them and loading them so that any
 * changes can be preserved.  I now include these options by default in every
 * plugin I make.
 *
 * // Refresh plugin parameters on new game
 * var alias_DataManager_setupNewGame = DataManager.setupNewGame;
 * DataManager.setupNewGame = function () {
 *   alias_DataManager_setupNewGame.call(this);
 *   convertPluginParams(PluginManager.parameters('Filename'), $pluginParams);
 * }
 *
 * // Save File
 * var alias_DataManager_MakeSaveContents = DataManager.makeSaveContents;
 * DataManager.makeSaveContents = function() {
 *   var contents = alias_DataManager_MakeSaveContents.call(this);
 *   if ($pluginParams.saveParamObject === true) {
 *       contents.pluginParams = $pluginParams;
 *   }
 *   return contents;
 * }
 *
 * // Load File
 * var alias_DataManager_ExtractSaveContents = DataManager.extractSaveContents;
 * DataManager.extractSaveContents = function(contents) {
 *   alias_DataManager_ExtractSaveContents.call(this, contents);
 *   if ($pluginParams.saveParamObject === true) {
 *       $pluginParams = contents.pluginParams;
 *   }
 * }
 *
 *
 * Camel-case Properties - This option will convert your plugin's paramter
 * names into more usable property names.  By default, the property names come
 * over as the ATparam used in the plugin editor and will often contain
 * white space so you'll end up with something like Class Id.  This forces you
 * to use these property names with the less desirable bracket notation,
 * something like $params['Class Id'].  Who wants to do that?  This option will
 * ditch the spaces and lowercase the first letter so that you can refereence
 * the property as $params.classId which is much cleaner.
 *
 * There is an option to define your parameter labels with ATtext and then
 * use ATparam to make your property name anything you want (like classId). This
 * is actually a better option and if you set up your plugin this way, leave
 * this option off.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * MIT License
 *
 * Copyright (c) 2018 Stephen Sandford (Frogboy) <https://frogboymv.github.io/>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
 *
 * ============================================================================
 *
 * @param Parameters
 *
 * @param camelCaseProperties
 * @text Camel-case Properties
 * @parent Parameters
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 */

/** Converts RPG Maker MV plugin parameters to an easy to use JSON object
 * @param {object} objRead - Plugin Parameters Parameters  (required)
 * @param {object} objWrite - Object that you want to store the converted parameters into (required)
 * @param {number} level - Makes sure that recursion ends. Not required.
 * @returns {object} Returns object with properly formatted plugin parameters.
 */
function convertPluginParams (objRead, objWrite, level) {
    var self = this;
    objWrite = objWrite || {};
    level = level || 1;
    if (level >= 100) return [];

    // Arrays
    if (Array.isArray(objRead)) {
        for (var i=0; i<objRead.length; i++) {
            var value = formatValue(objRead[i]);

            if (typeof value != "object") {
                objWrite.push(value);
            }
            else {
                objWrite.push((Array.isArray(value)) ? [] : {})
                self.convertPluginParams(value, objWrite[objWrite.length - 1], level + 1);
            }
        }
    }
    else {
        // Objects
        Object.keys(objRead).forEach(function(key, index) {
            var value = formatValue(objRead[key]);

            if (typeof value != "object") {
                objWrite[makeKey(key)] = value;
            }
            else {
                objWrite[makeKey(key)] = (Array.isArray(value)) ? [] : {};
                self.convertPluginParams(value, objWrite[makeKey(key)], level + 1);
            }
        });
    }

    // Formats and types parameter data
    function formatValue(value) {
        if (value !== "") {
            if (!isNaN(value)) value = parseFloat(value);
            else if (value == "true") value = true;
            else if (value == "false") value = false;
            else {
                try {
                    value = JSON.parse(value);
                }
                catch (e) {
                    value = value;
                }
            }
        }
        return value;
    }

    // Converts parameter names into camel case
    function makeKey(param) {
        if (PluginManager.parameters("PrettyPluginParams").camelCaseProperties == "true") {
            return param.slice(0, 1).toLowerCase() + param.slice(1).replace(/[^\w]/gi, "");
        }
        return param;
    }
}
