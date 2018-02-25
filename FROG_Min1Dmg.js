//=============================================================================
// Frogboy RMMV Plugin
// FROG_Min1Dmg.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0 Sets minimum damage to 1 HP on a hit.
 * @author Frogboy
 *
 * @help
 * FROG_Min1Dmg v1.00
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin sets the minimum amount of damage that a hit can do to 1 HP
 * instead of 0.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Just install this plugin near the top of your list and it will do the rest
 * as long as none of your other plugins overwrite its functionality.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.
 * Credit Frogboy in your work
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00 - Initial release
*/
//=============================================================================

Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var value = Math.max(eval(item.damage.formula), 1) * sign;
		if (isNaN(value)) value = 1;
		return value;
    }
    catch (e) {
        return 1;
    }
};
