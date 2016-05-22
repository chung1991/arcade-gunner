var Player = Obj.extend({
    initBody: function () {
        // init faces
        var flagFace = new SkeletonFace(res.player_flag_json, res.player_flag_atlas, 1);
        flagFace.setOOVector(cc.p(0, 0));
        this._faces.push(flagFace);

        var mobileFace = new SkeletonFace(res.player_mobile_json, res.player_mobile_atlas, 1);
        mobileFace.setOOVector(cc.p(0, 0));
        this._faces.push(mobileFace);

        var bodyFace = new SkeletonFace(res.player_body_json, res.player_body_atlas, 1);
        bodyFace._name = gameConst.FACE_MAIN;
        bodyFace.setOOVector(cc.p(0, 0));
        this._faces.push(bodyFace);

        var headFace = new SkeletonFace(res.player_head_json, res.player_head_atlas, 1);
        headFace.setOOVector(cc.p(0, 0));
        this._faces.push(headFace);

        // create body
        var face = this.getFace(gameConst.FACE_MAIN);
        var bonePosition = face.getPosition();
        var body = new RectBody();
        body.setWidth(gameConst.PLAYER_BODY_WIDTH);
        body.setHeight(gameConst.PLAYER_BODY_HEIGHT);

        this._body = body;
    },

    getBody: function () {
        return this._body;
    }
});
