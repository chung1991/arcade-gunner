var RectBody = Body.extend({
    _width : 0,
    _height : 0,

    getWidth: function () {
        return this._width;
    },

    getHeight: function () {
        return this._height;
    },

    setWidth: function(width) {
        this._width = width;
    },

    setHeight: function(height) {
        this._height = height;
    },
    
    ctor : function() {
        this._super();
        this._width = 0;
        this._height = 0;
    },
    
    contains : function(point) {
	return this.containsInDistance(point, 1);
    },

    containsInDistance : function(point, distanceRate) {
        if (point.x >= this._position.x - this._width / 2 * distanceRate
            && point.x <= this._position.x + this._width / 2 * distanceRate
            && point.y >= this._position.y - this._height / 2 * distanceRate
            && point.y <= this._position.y + this.height / 2 * distanceRate) {
		return true;
	}
	return false;
    }
});

