//=============================================================================
// Frogboy RMMV Plugin
// FROG_Min1Dmg4YepDmgCore.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0 Sets minimum damage to 1 HP on a hit. Works with YEP Damage Core.
 * @author Frogboy
 *
 * @help
 * FROG_Min1Dmg4YepDmgCore v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin sets the minimum amount of damage that a hit can do to 1 HP
 * instead of 0.  This version is for those using Yanfly's Core Engine v1.25
 * and Yanfly's Damage Core v1.07.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Just install this plugin below YEP_CoreEngine and YEP_DamageCore and it
 * should work.
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
  try {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
    var value = 0;
    if (item.damage.custom) {
      eval(item.damage.formula);
      value = Math.max(value, 1) * sign;
    } else {
      value = Math.max(eval(item.damage.formula), 1) * sign;
    }
    return value;
  } catch (e) {
    if (item.damage.custom) {
      Yanfly.Util.displayError(e, item.damage.custom, 'DAMAGE FORMULA ERROR');
    } else {
      Yanfly.Util.displayError(e, item.damage.formula, 'DAMAGE FORMULA ERROR');
    }
    return 1;
  }
};
