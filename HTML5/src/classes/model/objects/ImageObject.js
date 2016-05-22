var ImageObject = Obj.extend({
    initBody: function (face) {
        var body = new RectBody();
        body.setWidth(face.getContentSize().width);
        body.setHeight(face.getContentSize().height);
        body.setScale(face.getScale());

        this._faces.push(face);

        this._body = body;
    },

    getBody: function () {
        return this._body;
    }
});
