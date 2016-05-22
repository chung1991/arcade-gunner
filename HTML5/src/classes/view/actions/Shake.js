var Shake = cc.ActionInterval.extend({
    _strength: 0,
    _initialPosition: null,
    _target: null,

    createAction: function(duration, strength) {
        var ret = new Shake();
        ret.initWithDuration(dt, strength);
        return ret;
    },
    initWithDuration: function(duration, strength) {
        if (this._super(duration)) {
            this._strength = strength;
            return true;
        }
        return false;
    },
    startWithTarget: function(target) {
        this._super(target);
        this._initialPosition = target.getPosition();
        this._target = target;
    },
    randomInRange: function(min, max) {
        return cc.random0To1() * (max - min) + min;
    },
    step: function(time) {
        this._super(time);
        var randomX = this.randomInRange(-this._strength, this._strength);

        // Move the target to a shaked position
        this._target.setPosition(cc.pAdd(this._initialPosition, cc.p(randomX, 0)));
    },
    update: function (dt) {
    },
    stop: function() {
        // Action is done, reset clip position
        this._target.setPosition(this._initialPosition);
        this._super();
    }
});