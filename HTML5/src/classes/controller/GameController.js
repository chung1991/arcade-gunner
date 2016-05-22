/*
 * GameController
 * Manipulate models, play sounds
 */

var GameController = cc.Class.extend({
	_oldSceneName: gameConst.SCENE_NONE,
	_gameModel: null, // use for managing game

	ctor: function() {
		this._gameModel = cc.game.gameModel;
	},

	startGame: function() {
		var scene = new GameScene();
		this.listen(scene);

		cc.director.runScene(scene);
		this._gameModel.play(10);
		scene.changeSceneFromScene(this._oldSceneName);
	},

	/*
	 * Register listening event from view
	 * @view: (GameScene) which scene will accept new listener
	 */
	listen: function(view) {
		var gameEventListener = new GameEventListener();
		gameEventListener._obj = this;
		gameEventListener._func = this.processEvent;
		view.addEventListener(gameEventListener);
	},

	/*
	 * Callback when has an event from scene
	 * @gameEvent: (GameEvent) brings data along with it to manipulate
	 */
	processEvent: function(gameEvent) {
		var eventCode = gameEvent._eventCode;
		var level = this._gameModel._currentLevel;

		if (eventCode == gameConst.EVT_TOUCH) {
		}
		/*
		 * Pass GameEvent to handle sound at another processing
		 */
		this.processSoundEvent(gameEvent);
	},

	/*
	 * Process all sound in game
	 * @gameEvent: (GameEvent) based on game event,
	 * the system will play corresponding music/effect
	 */
	processSoundEvent: function(gameEvent) {
		var eventCode = gameEvent._eventCode;
	}
});