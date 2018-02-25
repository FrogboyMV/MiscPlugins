//=============================================================================
// Frogboy RMMV Plugin
// FROG_SkillTypeDupeFix.js
//=============================================================================

/*:
 * @plugindesc v1.0 Removes duplicate skill types in command list
 * @author Frogboy
 *
 * @help
 * Removes duplicate skill types in command list v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default in RPG Maker MV, if a Skill Type is added to an actor more than
 * once, it'll show up in the command list for Skills multiple times.  This
 * plugin corrects that.
 *
 * This became an issue for me when using my various Level-based Traits and
 * Talent-based Traits plugins.  Maybe a player chooses the Gnome race which
 * grants a few low-level illusion spells.  They may choose a class that has
 * magical ability which means that they also have to receive the proper Skill
 * Type in order to use it.  But then again, they may choose a class that
 * already receives this Skill Type so they will end up having it listed twice.
 * I don't know why RPG Maker MV lists duplicate Skill Types but it doesn't so
 * that's why this plugin exists.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Just install this plugin.  It'll do the rest.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.
 * No need to credit for this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
 *
 * ============================================================================
 */
(function() {
	// Main Menu Skills Window
	Window_SkillType.prototype.makeCommandList = function() {
	    if (this._actor) {
			var arrStypeId = [];
	        var skillTypes = this._actor.addedSkillTypes();
	        skillTypes.sort(function(a, b) {
	            return a - b;
	        });
	        skillTypes.forEach(function(stypeId) {
	            var name = $dataSystem.skillTypes[stypeId];
				if (arrStypeId.indexOf(stypeId) === -1) {
					this.addCommand(name, 'skill', true, stypeId);
					arrStypeId.push(stypeId);
				}
	        }, this);
	    }
	}
	
	// Battle Menu Skills Window
	Window_ActorCommand.prototype.addSkillCommands = function() {
		var arrStypeId = [];
	    var skillTypes = this._actor.addedSkillTypes();
	    skillTypes.sort(function(a, b) {
	        return a - b;
	    });
	    skillTypes.forEach(function(stypeId) {
			var name = $dataSystem.skillTypes[stypeId];
			if (arrStypeId.indexOf(stypeId) === -1) {
		        this.addCommand(name, 'skill', true, stypeId);
				arrStypeId.push(stypeId);
			}
	    }, this);
	}
})();
