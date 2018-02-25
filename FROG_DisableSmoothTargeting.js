/*:
 * @plugindesc v1.0 Prevents shifting to new target if the intended target dies.
 * @author Frogboy
 *
 * @help
 * DisableSmoothTargeting v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The original Final Fantasy had a unique quirk.  While it used the default 
 * battle system, your characters would attack whatever you told them to and the 
 * game wouldn't adjust the target if they were attacking a dead opponent.  Most
 * games since then have implemented target smoothing which handles this 
 * adjustment.  While this is pretty standard now, it comes with a side effect.
 * Now most battles can be won by just spamming the attack button and killing
 * one enemy at a time and that is often times the best strategy to win fights.
 * If you want to return to the days of making your players more carefully plan
 * out their attacks by removing target smoothing, install this plugin.
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
*/

(function() {
	Game_Unit.prototype.smoothTarget = function(index) {
		if (index < 0) {
			index = 0;
		}
		var member = this.members()[index];
		return member;
	};
})();
