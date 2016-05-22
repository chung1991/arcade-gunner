var SkeletonFace = sp.SkeletonAnimation.extend({
    _allowUpdate : true,
    _name : "",
    _oOVector : null,
    _animationName : "",

    ctor: function (jsonFile, atlasFile, scale) {
        this._super(jsonFile, atlasFile, scale);

        this._animationName = "";
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

    getAnimationName : function() {
        return this._animationName;
    },

    runAnimation : function(animationName, loop) {
        if (this._animationName !== animationName) {
            this._animationName = animationName;
            this.setAnimation(0, animationName, loop);
        }
    },

    setFlippedX: function (flipX) {
        this._skeleton.flipX = flipX;
    },

    setFlippedY: function (flipY) {
        this._skeleton.flipY = flipY;
    }

});