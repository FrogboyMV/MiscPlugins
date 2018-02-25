//=============================================================================
// Frogboy RMMV Plugin
// FROG_Min1Dmg4YepCore.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0 Sets minimum damage to 1 HP on a hit. Works with YEP Core.
 * @author Frogboy
 *
 * @help
 * FROG_Min1Dmg4YepCore v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin sets the minimum amount of damage that a hit can do to 1 HP
 * instead of 0.  This version is for those using Yanfly's Core Engine v1.25.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Just install this plugin below YEP_CoreEngine and it should work.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.
 * No credit necessary but if you'd like to, credit Frogboy.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
*/
//=============================================================================

Game_Action.prototype.evalDamageFormula = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var v = $gameVariables._data;
    var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
    try {
        var value = Math.max(eval(item.damage.formula), 1) * sign;
        if (isNaN(value)) value = 1;
        return value;
    }
    catch (e) {
        Yanfly.Util.displayError(e, item.damage.formula, 'DAMAGE FORMULA ERROR');
        return 1;
    }
};
