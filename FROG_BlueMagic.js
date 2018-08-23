//=============================================================================
// Frogboy RMMV Plugin
// FROG_BlueMagic.js
//=============================================================================

/*:
 * @plugindesc v1.0 Blue Magic ability which allows characters to learn monster's skills when used in battle
 * @author Frogboy
 *
 * @help
 * BlueMagic v1.00
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plug-in enables a Blue Mage type ability where certain classes can
 * learn skills from monsters they fight.  Unlike the normal implementation
 * of Blue Magic, this version doesn't require that the learner be targeted
 * with the skill in question.  All they have to do is be present when the
 * skill is used in battle and they will learn it.  This allows your Blue Mage
 * to learn passive skills like heals and buffs.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * There are two methods.  If you want one or more classes to learn all monster
 * skills tagged as Blue Magic, just include them in the Blue Magic Classes
 * parameter box.  The other method is to include the class ids when you tag
 * the skill itself.
 *
 * To tag a skill, place the text <BlueLearn> in the note box of the skill you
 * want to be learnable.  If you want to specify which classes can learn a
 * specific skill, type in <BlueLearn: 5, 6> where 5 and 6 are the class ids
 * that can learn this skill.  Typically, you only want to specify in this way
 * if a class can't learn all of the tagged skills.

 * For instance, my game has a Druid class that can learn all Blue Magic skills
 * while the Ranger class can only learn a subset of them.  The Druid is listed
 * in the parameters of the plugin while the Ranger is not.  The Ranger's class
 * id is only listed on the skills that I want him or her to learn.  The Druid
 * gets all Blue Skills so their class id does not need to be specified in the
 * <BlueLearn> tags.
 *
 * Make sure that the learner has the appropriate "Add Skill Type" trait for
 * or they won't be able to use their learned skill.
 *
 * There are also parameters to format a message box to let your players know
 * that they learned a new skill.  This can be disabled if you wish.
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
 *
 * @param Parameters
 *
 * @param Blue Magic Classes
 * @parent Parameters
 * @desc List of classes that learn every skill marked as Blue Magic
 * @type class[]
 * @default []
 *
 * @param Message when Learned
 * @parent Parameters
 * @desc Show a message when a new Blue Magic skill is learned
 * @type boolean
 * @default true
 * @on Yes
 * @off No
 *
 * @param Window Position
 * @parent Parameters
 * @desc Window Position of the message box
 * @type select
 * @default Bottom
 * @option Top
 * @value Top
 * @option Middle
 * @value Middle
 * @option Bottom
 * @value Bottom
 *
 * @param Background Type
 * @parent Parameters
 * @desc Background Type of the message box
 * @type select
 * @default Window
 * @option Window
 * @value Window
 * @option Dim
 * @value Dim
 * @option Transparent
 * @value Transparent
 *
*/

(function() {
    var parameters = PluginManager.parameters('FROG_BlueMagic');
    var paramBlueIds = JSON.parse(parameters['Blue Magic Classes']).map(Number) || [];
    var paramShowMessage = (parameters['Message when Learned'] === "true");
    var paramWindowPosition = parameters['Window Position'];
    var paramBackgroundType = parameters['Background Type'];

    switch (paramWindowPosition) {
        case 'Top': paramWindowPosition = 0; break;
        case 'Middle': paramWindowPosition = 1; break;
        case 'Bottom': paramWindowPosition = 2; break;
        default: paramWindowPosition = 2; break;
    }

    switch (paramBackgroundType) {
        case 'Window': paramBackgroundType = 0; break;
        case 'Dim': paramBackgroundType = 1; break;
        case 'Transparent': paramBackgroundType = 2; break;
        default: paramBackgroundType = 0; break;
    }

	var alias_BattleManagerStartAction = BattleManager.startAction;
	BattleManager.startAction = function() {
		alias_BattleManagerStartAction.call(this);
		var subject = this._subject;
		var action = subject.currentAction();
		var message = "";

		if (action._item._dataClass == "skill") {
			var skill_id = action._item._itemId;
			var skill = $dataSkills[skill_id];
			if (!skill.meta || !skill.meta.hasOwnProperty("BlueLearn")) return;
			var blue_ids = skill.meta.BlueLearn;
			blue_ids = (typeof blue_ids === "string") ? blue_ids.split(",").map(Number) : [];
			if (paramBlueIds.length > 0) blue_ids = blue_ids.concat(paramBlueIds);

			// Check Party for Blue Mages
			for (i=0; i<$gameParty._actors.length; i++) {
				var actor_id = $gameParty._actors[i];
				var actor = $gameActors._data[actor_id];
				var class_id = actor._classId;

				// This actor's class is marked to learn this skill and hasn't yet
				if (blue_ids.indexOf(class_id) > -1 && actor._skills.indexOf(skill_id) == -1) {
					actor._skills.push(skill_id);
					message += actor._name + " has learned " + skill.name + "\n";
				}
			}
		}

		if (message != "" && paramShowMessage) {
            $gameMessage.setBackground(paramBackgroundType);
            $gameMessage.setPositionType(paramWindowPosition);
			$gameMessage.add(message + "\\| \\^");
		}
	};
})();
