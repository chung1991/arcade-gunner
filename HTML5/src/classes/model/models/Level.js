/* 
 * Level
 * Store info about level
 */

var hackLevel;
var Level = cc.Class.extend({
	_backgroundName: null, // store background frame name of this level
	_manager: null, // store all managers of this level
	_gameModel: null, // use for quick call
	_level: -1, // store level index
	_player: null,
    _map: null,

    ctor: function(mode, level, gameModel) {
        hackLevel = this;
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

        this._map = new Map();
        var mapData = this.loadMapData();
        if (mapData != null) {
            this._map._mapData = mapData;
            this._map.loadLand();
            this._map.loadBackground();
            this._map.loadLandPixels();

            this._map.setLandPosition(cc.p(this._map._landWidth / 2, this._map._landHeight / 2));
            this._map._background.setPosition(cc.p(this._map._landWidth / 2, this._map._landHeight / 2));
        }
    },

    loadMapData: function () {
        // FIX: foreground map data
        var mapInfo = new MapInfo();
        mapInfo._id = 3;
        mapInfo._fullName = "COZY";
        mapInfo._foreground = "cozy";
        mapInfo._background = "cozy";
        mapInfo._bottomLeftX = 20;
        mapInfo._bottomLeftY = 80;
        mapInfo._topRightX = 2800;
        mapInfo._topRightY = 1800;
        mapInfo._numberParts = 4;
        mapInfo._startPoints.push(cc.p(685, 655));
        mapInfo._startPoints.push(cc.p(896, 614));
        mapInfo._startPoints.push(cc.p(1110, 509));
        mapInfo._startPoints.push(cc.p(1311, 545));
        mapInfo._startPoints.push(cc.p(1500, 508));
        mapInfo._startPoints.push(cc.p(1758, 622));
        mapInfo._startPoints.push(cc.p(1910, 574));
        mapInfo._startPoints.push(cc.p(2128, 688));

        // Store into MapData
        var mapData = new MapData();
        for (var i = 0; i < mapInfo._numberParts; i++) {
            // FIX: format string
            mapData._landTextures.push(cc.formatStr("column%d.png", i + 1));
        }

        // FIX: format string
        var landImage = cc.formatStr("resources/HD/foreground/%s.png", "cozy");
        mapData._landTextureFile = landImage;

        var bgImage = cc.formatStr("%s.png", "cozy");
        mapData._bgTextureFile = bgImage;

        return mapData;
    },

	/*
	 * Handle object's update
	 * dt: (float) the delta time to execute this frame
	 */
    update: function(dt) {
		// this._manager.game.update(dt);
        if (this._map != null) {
            this._map.update(dt);
        }
    },

	getLevel: function() {
		return this._level;
	}
});

