/*
 * Map
 */

var MapInfo = cc.Class.extend({
    _id: -1,
    _fullName: null,
    _foreground: null,
    _background: null,
    _bottomLeftX: -1,
    _bottomLeftY: -1,
    _topRightX: -1,
    _topRightY: -1,
    _numberParts: -1,
    _startPoints: [],

    ctor: function() {
    }
});

var MapData = cc.Class.extend({
    _mapPixels: null,
    _landTextures: [],
    _bgTextureFile: null,
    _landTextureFile: null,

    ctor: function() {
    }
});

var Map = cc.Class.extend({
    _lands: [],
    _landWidth: -1,
    _landHeight: -1,
    _background: null,
    _mapData: null,

    ctor: function() {
    },

    update: function(dt) {
        this._background.update(dt);

        for (var i = 0; i < this._lands.length; i++) {
            var land = this._lands[i];
            land.update(dt);
        }
    },

    setLandPosition: function (position) {
        for (var i = 0; i < this._lands.length; i++) {
            var land = this._lands[i];
            land.setPosition(cc.p(position.x, position.y));
        }
    },

    loadLand: function () {
        for (var i = 0; i < this._mapData._landTextures.length; i++) {
            var textureFileName =  this._mapData._landTextures[i];
            var foreground = new Face();
            foreground.setFaceName(gameConst.FACE_MAIN);
            foreground.initWithSpriteFrameName(textureFileName);

            if (i != 0){
                foreground.setOOVector(cc.p(-foreground.getContentSize().width  * 3 / 2 + i * foreground.getContentSize().width - i, 0));
            } else {
                foreground.setOOVector(cc.p(-foreground.getContentSize().width * 3 / 2 + i * foreground.getContentSize().width, 0));
            }

            var land = new ImageObject();
            land.initBody(foreground);
            this._lands.push(land);
        }
    },

    loadBackground: function () {
        var winSize = cc.director.getWinSize();
        var backgroundFace = new Face();
        backgroundFace.setFaceName(gameConst.FACE_MAIN);
        backgroundFace.initWithSpriteFrameName(this._mapData._bgTextureFile);
        backgroundFace.setScale(gameConst.FAKED_BG_SCALE);

        this._background = new ImageObject();
        this._background.initBody(backgroundFace);
    },


    loadLandPixels: function () {
        this._landWidth = 2858;
        this._landHeight = 782;
    }
});

