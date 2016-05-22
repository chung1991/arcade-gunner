/*
 * GameScene
 * All of UI, objects will be presented here
 */
var GameScene = BaseScene.extend({
    _backgroundLayer: null, // layer in game
    _mainLayer: null, // layer in game

	ctor: function() {
		this._sceneName = gameConst.SCENE_GAME;
    	this._super();
    	this.createLayers();
    	this.createLayerContents();

		this.registerEvents();
    },
	/***
	 * Register event for game
	 */
	registerEvents: function() {
		this.registerGameModelEvent();
		this.registerTouchEvent();
		this.registerSchedule();
		this.registerKeyBoardEvent();
	},

	onScreenKeyPressed: function (keyCode) {
		if (this._gameModel.isPaused()) {

		}
	},
	onScreenKeyReleased: function (keyCode) {
		if (this._gameModel.isPaused()) {

		}
	},


	update: function (dt) {


	},



	onScreenTouchBegan: function (point) {
		if (this._gameModel.isPaused()) {

		}

		var gameEvent = new GameEvent();
		gameEvent._eventCode = gameConst.EVT_TOUCH;
		gameEvent._dataPoint = point;
		this.fireEvent(gameEvent);
	},
	onScreenTouchMoved: function (point) {
		if (this._gameModel.isPaused()) {

		}

		var gameEvent = new GameEvent();
		gameEvent._eventCode = gameConst.EVT_TOUCH;
		gameEvent._dataPoint = point;
		this.fireEvent(gameEvent);
	},
	onScreenTouchEnded: function (point) {
		if (this._gameModel.isPaused()) {

		}

		var gameEvent = new GameEvent();
		gameEvent._eventCode = gameConst.EVT_UN_TOUCH;
		gameEvent._dataPoint = point;
		this.fireEvent(gameEvent);
	},


	/*
	 * Callback is triggered when has a notification from GameModel
	 */
	processGameModelEvent: function(gameEvent) {
    	var winSize = cc.director.getWinSize();
    	var eventCode = gameEvent._eventCode;

    	// listen behavior from model
    	if (eventCode == gameConst.EVT_MAP_CREATED) {
			this.createGameScene();
    	}
	},

	/*
	 * A common callback to remove face when finish an action
	 * @face: (cc.Node) face will be deleted from its parent
	 */
	onFaceShowDone: function(face) {
		face.removeFromParent();
	},

	/*
	 * Create empty layers, menus
	 */
    createLayers: function() {
    	this._backgroundLayer = new cc.Layer();
    	this._backgroundLayer.bake();
    	this.addChild(this._backgroundLayer);

    	this._mainLayer = new cc.Layer();
    	this.addChild(this._mainLayer);


    },
	/*
	 * Create initial contents for every layer
	 */
    createLayerContents: function() {

    },

	createGameScene: function () {
		var winSize = cc.director.getWinSize();
		var currentLevel = this._gameModel._currentLevel;

		// add background
		var backgroundSprite = cc.Sprite.create(currentLevel._backgroundName);
		backgroundSprite.x = winSize.width / 2;
		backgroundSprite.y = winSize.height / 2;
		this._backgroundLayer.addChild(backgroundSprite);

		// add player
		this.addFacesToLayer(currentLevel._player, this._mainLayer, gameConst.INDEX_OBJECT);
	}
});