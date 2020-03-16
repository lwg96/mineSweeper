// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _childArr:{
            default: [],
            type: cc.Node
        },

        _eliminateFlag:{
            default: false,
        },

        _posX:{
            default: -1,
            type: cc.Integer
        },

        _posY:{
            default: -1,
            type: cc.Integer
        },

        _index:{
            default: -1,
            type: cc.Integer
        }
    },

    init:function(gameManager, x ,y, index ){
        this.gameManager = gameManager;
        this._index = index;
        this._posX = x;
        this._posY = y;

        this._childArr = [];
        this._eliminateFlag = false;

        this.node.getChildByName("lab").getComponent(cc.Label).string = index;
    },

    onClick:function(){
        this.gameManager.getScore(this._posX, this._posY);
    },

    pushChild:function(node){
        this._childArr.push(node);
    },

    getChild:function(){
        return this._childArr;
    },

    resetChild:function(){
        this._childArr = [];
    },


    setEliminateFlag:function(eliminateFlag){
        this._eliminateFlag = eliminateFlag;
    },

    getEliminateFlag:function(){
        return this._eliminateFlag;
    },


    getIndex:function(){
        return this._index;
    },

    getPosX:function(){
        return this._posX;
    },

    getPosY:function(){
        return this._posY;
    },

    // update (dt) {},
});
