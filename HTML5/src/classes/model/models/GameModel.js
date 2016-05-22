/*
 * GameModel
 * Manage business objects, game state
 */

var GameModel = cc.Class.extend({
    _eventListeners: null, // view subcribers
	_level: -1, // current level index
    _gameState: -1, // control game with game state
    _currentLevel: null, // current level object
	_currentVolumeSfx: 1,
	_currentVolumeMusic: 1,
	_mute: false,

	setCurrentVolumeSfx: function (currentVolumeSfx) {
		this._currentVolumeSfx = currentVolumeSfx;
	},

	getCurrentVolumeSfx: function () {
		return this._currentVolumeSfx;
	},

	setCurrentVolumeMusic: function (currentVolumeMusic) {
		this._currentVolumeMusic = currentVolumeMusic;
	},

	getCurrentVolumeMusic: function () {
		return this._currentVolumeMusic;
	},

	setMute: function (mute) {
		this._mute = mute;
	},

	isMute: function () {
		return this._mute;
	},
    
    ctor: function() {
		/*
		 * Initialize variables and game state
		 */
    	this._eventListeners = [];
    	this._gameState = gameConst.GS_WAIT;

		/*
		 * Register scheduled update of game
		 */
    	cc.director.getScheduler().scheduleUpdateForTarget(this, gameConst.SCHEDULE_GAME_MODEL, false);
    },

	/*
	 * The most important function, you start looking from here
	 */
    update: function(dt) {
		if (this._mute) {
			cc.audioEngine.setEffectsVolume(0);
			cc.audioEngine.setMusicVolume(0);
		} else {
			// update music
			cc.audioEngine.setEffectsVolume(this._currentVolumeSfx);
			cc.audioEngine.setMusicVolume(this._currentVolumeMusic);
		}


    	if (this._gameState == gameConst.GS_PLAY) {
            this._currentLevel.update(dt);
    	}
    },

	/*
	 * Play with specific level, current implement now delicate for Story Mode
	 * @level: (int) level index
	 */
    play: function(level) {
		/*
		 * Initialize basic info and mark the state is now playable
		 */
    	this._level = level;

    	this._gameState = gameConst.GS_PAUSE;

		this._currentLevel = new Level(this);
    	this._currentLevel.loadMap();
		/*
		 * When everything has done, the view is needed to render,
		 * send to them a notification
		 */
    	var startGameEvent = new GameEvent();
    	startGameEvent._eventCode = gameConst.EVT_MAP_CREATED;
    	this.fireEvent(startGameEvent);
    },

	quit: function() {
		this.destroyLevel();
		this._gameState = gameConst.GS_WAIT;
	},
	pause: function() {
		this._gameState = gameConst.GS_PAUSE;
	},

	resume: function() {
		this._gameState = gameConst.GS_PLAY;
	},

	replay: function() {
		this.destroyLevel();
		this.play(this._level);
	},

	destroyLevel: function() {
		this._currentLevel = null;
	},

	/*
	 * Basic function to notify to subcribers
	 */
    fireEvent: function(gameEvent) {
    	for (var i = 0; i < this._eventListeners.length; i++) {
    		var listener = this._eventListeners[i];
    		listener._func.call(listener._obj, gameEvent);
    	}
    },

	/*
	 * Basic function for subcriber register listening
	 */
    addEventListener: function(gameEventListener) {
    	if($.inArray(gameEventListener, this._eventListeners) == -1) {
    		this._eventListeners.push(gameEventListener);
    	}
    },

	/*
	 * Basic function for subcriber who don't want to listen anymore leave
	 */
    removeEventListener: function(gameEventListener) {
    	if($.inArray(gameEventListener, this._eventListeners) == 0) {
    		this._eventListeners.splice(gameEventListener);
    	}
    },

	isPaused: function () {
		return this._gameState == gameConst.GS_PAUSE;
	}
});

