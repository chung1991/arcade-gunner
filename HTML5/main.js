var gameConst = {
	DESIGN_WIDTH : 1920,
	DESIGN_HEIGHT : 1080,

	FACE_MAIN : "main",
	FACE_FIX_ROTATION: "rotation",
	FACE_FIX_ANCHOR: "anchor",
	FACE_DRAW_NODE: "drawnode",
	
	GS_WAIT: 1,
	GS_PLAY: 2,
	GS_PAUSE: 3,
	GS_ENDING: 4,

	EVT_MAP_CREATED: 0,
	EVT_TOUCH: 1,
	EVT_UN_TOUCH: 2,
	EVT_PLAY_BACKGROUND_MUSIC: 3,

	SCHEDULE_GAME_MODEL: 1,
	SCHEDULE_SCENE: 2,
	SCHEDULE_LAYER: 3,
	SCHEDULE_HOW_TO_PLAY: 4,
	
	INDEX_STATIC_OBJECT: 0,
	INDEX_HIGHER_STATIC_OBJECT: 1,
	INDEX_OBJECT: 3,

	STATE_IDLE: "idle",
	STATE_DEFAULT: "default",

	DEFAULT_ARC_BODY_RADIUS: 10,
	DEFAULT_ARC_BODY_ANGLE: 360,
	
	SCENE_NONE: "none",
	SCENE_GAME: "gamescene",

	PLAYER_BODY_WIDTH: 300,
	PLAYER_BODY_HEIGHT: 300,

    FAKED_BG_SCALE: 2.5
};

window.onload = function() {
	cc.game.onStart = function() {
		cc.view.setDesignResolutionSize(gameConst.DESIGN_WIDTH, gameConst.DESIGN_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);

		document.getElementById('gameCanvas').focus();

		// executing preload action along with its callback
		LoaderScene.preload(g_resources, function() {
			// create only none instance of GameModel for a lifetime
			this.gameModel = new GameModel();

            cc.spriteFrameCache.addSpriteFrames(res.cozy_plist);
            cc.spriteFrameCache.addSpriteFrames(res.cozy_bg_plist);

			// everything start from game controller
			this.gameController = new GameController();
			this.gameController.startGame();
		}, this);
	};
	cc.game.run("gameCanvas");
};