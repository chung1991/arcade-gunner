var ArcBody = Body.extend({
    _radius : 0,
    _angle : 0,

    getRadius: function() {
        return this._radius;
    },
    
    ctor : function(r, a) {
        this._super();
        
        if (r != null) {
            this._radius = r;
        } else {
            this._radius = gameConst.DEFAULT_ARC_BODY_RADIUS;
        }
        
        if (a != null) {
            this._angle = a;
        } else {
            this._angle = gameConst.DEFAULT_ARC_BODY_ANGLE;
        }
    },
    
    contains : function(point) {
        return this.containsInDistance(point, 1);
    },
    
    containsInDistance : function(point, distanceRate) {
        var offX = point.x - this._position.x;
        var offY = point.y - this._position.y;
        
        var distance = Math.sqrt(offX * offX + offY * offY);
        
        if (distance < radius * this._scaleX * distanceRate) {
            if (this._angle < 360) {
                var targetAngle = offX != 0 ? Math.atan (offY / offX) * 180 / Math.PI : 90;
                var angle1 = offX >= 0 ? targetAngle : targetAngle + 180;
                
                var limitAngle1 = this._rotation + this._angle / 2 * this._scaleY;
                var limitAngle2 = this._rotation - this._angle / 2 * this._scaleY;
                
                if (angle1 > limitAngle2 && angle1 < limitAngle1) {
                    return true;
                }
            } else {
                return true;
            }
        }
        return false;
    },
 
    nearby : function(point) {
        var offX = point.x - this._position.x;
        var offY =  point.y - this._position.y;	

        var distance = Math.sqrt(offX * offX + offY * offY);

        if (distance < (this._radius * 120 / 100) * this._scaleX) {
            if (this._angle == 360) {
                return true;
            }
        }
        return false;
    }
});
