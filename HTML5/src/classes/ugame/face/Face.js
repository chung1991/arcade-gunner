String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            if (args === "") {
                replace = "";
            } else {
                replace = args;
            }
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

var Face = cc.Sprite.extend({
    _allowUpdate : true,
    _name : "",
    _oOVector : null,
    _states : null,
    _state : null,
            
    ctor : function() {
        this._super();
        this._states = [];
        this._state = null;
        this._name = null;
        this._oOVector = cc.p(0, 0);
        this._allowUpdate = true;   
    },

    setOOVector: function (oOVector) {
        this._oOVector = oOVector;
    },

    getFaceName: function () {
        return this._name;
    },

    setFaceName: function (name) {
        this._name = name;
    },

    getOOVector: function () {
        return this._oOVector;
    },
   
    getState : function(stateName) {
        return this._states[stateName];
    },
    
    setState : function(s) {
        if (this._state != s) {
            if(this._state != null){
                this.stopAction(this._state);
            }
            if (s != null) {
                this._state = s;
                this.runAction(this._state);
            } else {
                this._state = null;
            }
        }
    },
    
    registerState : function(stateName, action) {
        if (action) {
            this._states[stateName] = action;
        }
    },
    
    createState : function(patternName, startFrame, endFrame, frameDuration, forever, reverse) {
        var frames = this.createFrameArray(patternName, startFrame, endFrame);
        if (reverse) {
            var framesSize = frames.length;
            for(i = framesSize - 1; i >= 0; i--) {
                frames.push(frames[i]);
            }
        }
        var delay = frameDuration / frames.length;
        var animation = cc.Animation.create(frames, delay);
        var animate = cc.Animate.create(animation);
        var action = null;
        if (forever) {
            action = cc.repeatForever(animate);
        } else {
            action = animate;
        }
        return action;
    },

    createStateFromFile: function(patternName, startFrame, endFrame, frameDuration, forever, reverse) {
        var frames = this.createFrameArrayFromFile(patternName, startFrame, endFrame);
        if (reverse) {
            var framesSize = frames.length;
            for(i = framesSize - 1; i >= 0; i--) {
                frames.push(frames[i]);
            }
        }
        var delay = frameDuration / frames.length;
        var animation = cc.Animation.create(frames, delay);
        var animate = cc.Animate.create(animation);
        var action = null;
        if (forever) {
            action = cc.repeatForever(animate);
        } else {
            action = animate;
        }
        return action;
    },

    createFrameArray : function (patternName, startFrame, endFrame){
        var spriteFrameCache = cc.spriteFrameCache;
        var arrayFrame = [];
        var frameName;
        for (var i = startFrame; i <= endFrame; i++) {
            frameName = patternName.format([i]);
            var frame = spriteFrameCache.getSpriteFrame(frameName);
            arrayFrame.push(frame);
        }
        return arrayFrame;
    },
    createStateFromFrame: function(frameName, forever) {
        var spriteFrameCache = cc.spriteFrameCache;
        var arrayFrame = [];
        arrayFrame.push(spriteFrameCache.getSpriteFrame(frameName));
        var animation = cc.Animation.create(arrayFrame, 1);
        var animate = cc.Animate.create(animation);
        var action = null;
        if (forever) {
            action = cc.repeatForever(animate);
        } else {
            action = animate;
        }
        return action;
    },

    createFrameArrayFromFile: function (patternName, startFrame, endFrame){
        var arrayFrame = [];
        var frameName;
        for (var i = startFrame; i <= endFrame; i++) {
            frameName = patternName.format([i]);
            var frame = new cc.SpriteFrame();
            var fileCache = cc.textureCache.getTextureForKey(frameName);
            frame.setTexture(fileCache);
            frame.setRect(cc.rect(0, 0, fileCache._contentSize.width, fileCache._contentSize.height));
            arrayFrame.push(frame);
        }
        return arrayFrame;
    }
});
