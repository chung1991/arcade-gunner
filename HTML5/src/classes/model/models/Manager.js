var Manager = cc.Class.extend({
    _level: null,
    _gameModel: null,
    _manager: null,
    
    ctor: function(level) {
        this._level = level;
        this._gameModel = level._gameModel;
        this._manager = level._manager;
    }
});