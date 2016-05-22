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
    _mapPixels: [],
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

            var oOVector = null;
            if (i != 0){
                oOVector = cc.p(-foreground.getContentSize().width  * 3 / 2 + i * foreground.getContentSize().width - i, 0);
            } else {
                oOVector = cc.p(-foreground.getContentSize().width * 3 / 2 + i * foreground.getContentSize().width, 0);
            }
            foreground.setOOVector(oOVector);

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
        // load map pixels
        var foregroundPixelFace = new Face();
        foregroundPixelFace.initWithFile(this._mapData._landTextureFile);

        // get pixel color using context
        var img = foregroundPixelFace.getTexture().getHtmlElementObj();
        if (img instanceof HTMLImageElement) {
            var canvas = $('<canvas/>')[0];
            // set land size
            this._landWidth = img.width;
            this._landHeight = img.height;

            this.setLandPosition(cc.p(this._landWidth / 2, this._landHeight / 2));
            this._background.setPosition(cc.p(this._landWidth / 2, this._landHeight / 2));

            // create context
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

            // get data from context and traverse
            var data = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data;
            for (var i = 0; i < this._landHeight; i++) {
                for (var j = 0; j < this._landWidth * 4; j += 4) {
                    var r = data[i * (this._landWidth * 4) + j];
                    var g = data[i * (this._landWidth * 4) + j + 1];
                    var b = data[i * (this._landWidth * 4) + j + 2];
                    var a = data[i * (this._landWidth * 4) + j + 3];

                    // check if image pixel is not transparent
                    if ((r + g + b + a) != 0) {
                        var x = j / 4;
                        var y = i;
                        var realPoint = cc.p(x, this._landHeight - y);
                        var h = realPoint.y;
                        var w = realPoint.x;

                        // 1 is land, undefined with others
                        if ((h >= 0 && h < this._landHeight) && (w >= 0 && w < this._landWidth)) {
                            this._mapData._mapPixels[(this._landHeight - h) * this._landWidth + w] = 1;
                        }
                    }
                }
            }
            // clear canvas context
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        } else {
            console.log("Can't parse pixel values")
        }


    }
});

