var Body = cc.Class.extend({
    _position : null,
    _velocity : null,
    _physical : false,
    _visible : false,
    _priority : 0,
    _rotation : 0,
    _scaleX : 1,
    _scaleY : 1,
    _anchorPoint: null,
    _flipX: false,

    ctor : function() {
        this.init();
    },
    
    init : function() {
        this._position = cc.p(0, 0);
        this._physical = false;
        this._rotation = 0;
        this._velocity = cc.p(0, 0);
        this._scaleX = 1;
        this._scaleY = 1;
        this._priority = 0;
        this._visible = true;
        this._anchorPoint = cc.p(0.5, 0.5);
        this._flipX = false;
    },

    setScale : function(scale) {
        this._scaleX = scale;
        this._scaleY = scale;
    },

    getScale : function() {
        return this._scaleX;
    },

    getNextPosition : function(dt) {
        var s = cc.pMult(this._velocity, dt);
        var nextPosition = cc.pAdd(this._position, this._velocity);
        return nextPosition;
    },

    update : function(dt) {
        this._position = this.getNextPosition(dt);
    },

    contains : function(point) {
        return false;
    },

    nearby : function(point) {
        return false;
    },

    getVelocity: function() {
        return this._velocity;
    },

    setVelocity: function(x, y) {
        this._velocity.x = x;
        this._velocity.y = y;
    },

    getPosition: function() {
        return this._position;
    },

    setPosition: function(x, y) {
        this._position.x = x;
        this._position.y = y;
    },

    getRotation: function () {
        return this._rotation;
    },

    setRotation: function (rotation) {
        this._rotation = rotation;
    },

    getAnchorPoint: function () {
        return this._anchorPoint;
    },

    setAnchorPoint: function (anchorPoint) {
        this._anchorPoint = anchorPoint;
    },

    isFlipX: function () {
        return this._flipX;
    },

    setFlipX: function (flipX) {
        this._flipX = flipX;
    }
});
