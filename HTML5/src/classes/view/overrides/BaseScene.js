/**
 * BaseScene
 * Parent scene
 */
var BaseScene = cc.Scene.extend({
    _sceneName: "defaultName",
    _gameModel: null, // use for fast access to model
    _gameEventListener: null, // use for unsubcribe from game model later
    _eventListeners: null, // list of all listener from controller which register as subcribers
    _isTouching: false, // for touch only
    _firstTouchPoint: cc.p(0, 0), // use for touch only

    ctor: function() {
        this._gameModel = cc.game.gameModel;
        this._super();
        this._eventListeners = [];
    },
    changeSceneFromScene: function(oldScene, reload) {
        var gameEvent = new GameEvent();
        gameEvent._eventCode = gameConst.EVT_PLAY_BACKGROUND_MUSIC;
        gameEvent._dataObject = oldScene;
        gameEvent._dataObject2 = this._sceneName;
        gameEvent._dataBoolean = reload;
        this.fireEvent(gameEvent);
    },
    /***
     * Basic function to notify to subcribers
     * @param gameEvent
     */
    fireEvent: function(gameEvent) {
        for (var i = 0; i < this._eventListeners.length; i++) {
            var listener = this._eventListeners[i];
            listener._func.call(listener._obj, gameEvent);
        }
    },
    /***
     * Basic function for subcriber register listening
     * @param gameEventListener
     */
    addEventListener: function(gameEventListener) {
        if($.inArray(gameEventListener, this._eventListeners) == -1) {
            this._eventListeners.push(gameEventListener);
        }
    },
    /***
     * Basic function for subcriber who don't want to listen anymore leave
     * @param gameEventListener
     */
    removeEventListener: function(gameEventListener) {
        if($.inArray(gameEventListener, this._eventListeners) == 0) {
            this._eventListeners.splice(gameEventListener);
        }
    },
    /***
     * Register game model event
     */
    registerGameModelEvent: function () {
        if (this._gameModel != null) {
            this._gameEventListener = new GameEventListener();
            this._gameEventListener._obj = this;
            this._gameEventListener._func = this.processGameModelEvent;
            this._gameModel.addEventListener(this._gameEventListener);
        }
    },
    /***
     * Game Model event callback
     * @param gameEvent
     */
    processGameModelEvent: function (gameEvent) {
        // This line will remind coder override this function
        console.log("Override processGameModelEvent function");
    },
    /***
     * Register touch event
     */
    registerTouchEvent: function() {
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
            cc.eventManager.addListener({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches : true,
                onTouchBegan : function(touch, event) {
                    var touchPoint = cc.p(touch.getLocationX(), touch.getLocationY());
                    event.getCurrentTarget()._isTouching = true;
                    this._firstTouchPoint = touchPoint;

                    event.getCurrentTarget().onScreenTouchBegan(touchPoint);
                    return true;
                },
                onTouchMoved : function(touch, event) {
                    if (event.getCurrentTarget()._isTouching) {
                        var delta = touch.getDelta();
                        this._firstTouchPoint.x += delta.x;
                        this._firstTouchPoint.y += delta.y;
                        var touchPoint = this._firstTouchPoint;

                        event.getCurrentTarget().onScreenTouchMoved(touchPoint);
                    }
                },
                onTouchEnded : function(touch, event) {
                    if (event.getCurrentTarget()._isTouching) {
                        event.getCurrentTarget()._isTouching = false;
                        var delta = touch.getDelta();
                        this._firstTouchPoint.x += delta.x;
                        this._firstTouchPoint.y += delta.y;
                        var touchPoint = this._firstTouchPoint;

                        event.getCurrentTarget().onScreenTouchEnded(touchPoint);
                    }
                }
            }, this);
        } else if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event : cc.EventListener.MOUSE,
                onMouseMove : function(event) {
                    if (event.getCurrentTarget()._isTouching) {
                        var point = cc.p(event.getLocationX(), event.getLocationY());

                        event.getCurrentTarget().onScreenTouchMoved(point);
                    }
                },
                onMouseUp : function(event) {
                    if (event.getCurrentTarget()._isTouching) {
                        var point = cc.p(event.getLocationX(), event.getLocationY());
                        event.getCurrentTarget()._isTouching = false;

                        event.getCurrentTarget().onScreenTouchEnded(point);
                    }
                },
                onMouseDown : function(event) {
                    var point = cc.p(event.getLocationX(), event.getLocationY());
                    event.getCurrentTarget()._isTouching = true;

                    event.getCurrentTarget().onScreenTouchBegan(point);
                },
                onMouseScroll : function(event) {
                }
            }, this);
        }
    },
    /***
     * Touch event callbacks
     * @param point
     */
    onScreenTouchBegan: function (point) {
        // This line will remind coder override this function
        console.log("Override onScreenTouchBegan function");
    },
    onScreenTouchMoved: function (point) {
        // This line will remind coder override this function
        console.log("Override onScreenTouchMoved function");
    },
    onScreenTouchEnded: function (point) {
        // This line will remind coder override this function
        console.log("Override onScreenTouchEnded function");
    },
    /***
     * Register schedule update
     */
    registerSchedule: function () {
        cc.director.getScheduler().scheduleUpdateForTarget(this, gameConst.SCHEDULE_SCENE, false); // register schedule update for scene
    },
    /***
     * Schedule update callback
     * @param dt
     */
    update: function(dt) {
        // This line will remind coder override this function
        //console.log("Override update function");
    },
    /***
     * Register keyboard event
     */
    registerKeyBoardEvent: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                event.getCurrentTarget().onScreenKeyPressed(keyCode);
            },
            onKeyReleased: function(keyCode, event){
                event.getCurrentTarget().onScreenKeyReleased(keyCode);
            }
        }, this);
    },
    /***
     * Keyboard callback
     * @param point
     */
    onScreenKeyPressed: function (keyCode) {
        // This line will remind coder override this function
        console.log("Override onScreenKeyPressed function");
    },
    onScreenKeyReleased: function (keyCode) {
        // This line will remind coder override this function
        console.log("Override onScreenKeyReleased function");
    },

    /***
     * Dispose all components
     */
    disposeComponents: function () {
        this.unscheduleUpdate();
        this._eventListeners = [];

        this._gameModel.removeEventListener(this._gameEventListener);
        //cc.eventManager.removeAllListeners();
    },
    /***
     * Add all faces to specific layer, index
     * @param object: (Obj) faces in this object will be added
     * @param layer: (cc.Layer) layer you want to add face
     * @param index: (int) zIndex you want to add face
     */
    addFacesToLayer: function(object, layer, index) {
        for (var i = 0; i < object.getFaces().length; i++) {
            var face = object.getFaces()[i];
            face.setLocalZOrder(index);
            if (face._name === gameConst.FACE_DRAW_NODE) {
                layer.addChild(face);
                continue;
            }
            if (!face._name === gameConst.FACE_FIX_ANCHOR) {
                face.setAnchorPoint(object.getBody().getAnchorPoint());
            }
            face.setPosition(object.getPosition());
            face.setFlippedX(object.getBody().isFlipX());
            face.setScale(object.getBody().getScale());
            layer.addChild(face);
        }
    },
    /***
     * Remove all face of object
     * @object: (Obj) faces of this object will be removed from its parent
     * @param object
     */
    removeFaces: function(object) {
        for (var i = 0; i < object.getFaces().length; i++) {
            var face = object.getFaces()[i];
            face.removeFromParent();
        }
    }
});