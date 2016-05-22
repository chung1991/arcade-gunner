/* 
 * Level
 * Store info about level
 */

var Level = cc.Class.extend({
	_backgroundName: null, // store background frame name of this level
	_manager: null, // store all managers of this level
	_gameModel: null, // use for quick call
	_level: -1, // store level index
	_player: null,

    ctor: function(mode, level, gameModel) {
    	this._level = level;
    	this._gameModel = gameModel;

		this._manager = {
			game: null
		};

		// Initialize all managers
		// var gameManager = new GameManager(this);

		// this._manager.game = gameManager;
    },

	/*
	 * Load data of level
	 */
    loadMap: function() {
		var winSize = cc.director.getWinSize();
		this._backgroundName = res.bg;
		this._player = new Player();
		this._player.initBody();
		this._player.setPosition(cc.p(500, 500));
    },

	/*
	 * Handle object's update
	 * dt: (float) the delta time to execute this frame
	 */
    update: function(dt) {
		// this._manager.game.update(dt);
    },

	getLevel: function() {
		return this._level;
	}
});

