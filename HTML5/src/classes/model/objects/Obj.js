var Obj = cc.Class.extend({
    _id: null,
    _body: null,
    _faces: null,

    getBody: function() {
        return this._body;
    },

    setBody: function(body) {
        this._body = body;
    },

    getFaces: function() {
        return this._faces;
    },

    getVelocity: function() {
        return this._body.getVelocity();
    },

    setVelocity: function(x, y) {
        this._body.setVelocity(x, y);
    },

    setPosition: function(position) {
        this._body._position = position;
    },

    getPosition: function() {
        return this._body._position;
    },

    ctor: function() {
        this._faces = [];
    },
    update: function(dt) {
        if (this._body !== null) {
            this._body.update(dt);
        }

        if (this._faces !== null) {
            for (var i = 0; i < this._faces.length; i++) {
                var face = this._faces[i];
                if (face !== null) {
                    if (this._body !== null) {
                        if (face._name === gameConst.FACE_DRAW_NODE) {
                            continue;
                        }
                        if (face._name === gameConst.FACE_MAIN) {
                            face.setVisible(this._body._visible);
                        }
                        if (face._name !== gameConst.FACE_FIX_ANCHOR) {
                        	face.setAnchorPoint(this._body._anchorPoint);
                        }
                        if (face._name !== gameConst.FACE_FIX_ROTATION) {
                        	face.setRotation(this._body._rotation);
                        }
                        face.setPosition(cc.pAdd(this._body._position, face._oOVector));
                        face.setScale(this._body.getScale());
                        face.setFlippedX(this._body._flipX);
                    }
                }
            }
        }
    },
    getFace: function(faceName) {
        for (var i = 0; i < this._faces.length; i++) {
            if (this._faces[i]._name === faceName) {
                return this._faces[i];
            }
        }
        return null;
    },
    removeFace: function(faceName) {
        for (var i = 0; i < this._faces.length; i++) {
            if (this._faces[i]._name === faceName) {
                this._faces.splice(i, 1);
                break;
            }
        }
        return null;
    },
    setState: function(stateName, faceName) {
        var theFace = this.getFace(faceName);
        theFace.setState(theFace.getState(stateName));
    }
});