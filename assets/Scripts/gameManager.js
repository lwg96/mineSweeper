cc.Class({
    extends: cc.Component,

    properties: {

        itemPrefab:{
            default: null,
            type: cc.Prefab,
        },

        layoutNode:{
            default: null,
            type: cc.Node
        },

        _time : 0,
        
    },

    onLoad:function(){
        // this.init(10,10);
        this.allItemArr = [];
    },
        
    init:function(ilen,jlen){
        let allItemArr = []
        for (let i = 0 ; i < ilen; i++){//第几列
            allItemArr[i] = [];
            for (let j = 0; j < jlen; j++){//第几行
                let index = Math.ceil(Math.random()*10);
                let item = cc.instantiate(this.itemPrefab);
                this.layoutNode.addChild(item);
                item.getComponent("sweeperItemCtrl").init(this, i, j, index);

                item.setPosition( -ilen/2*item.width + i*(item.width + 5), -jlen/2*item.height +j*(item.height + 5)  );

                cc.log(" position: ");
                allItemArr[i][j] = item;
            }
        }
        this.allItemArr = allItemArr;

        this.setChildArr();
    },

    update:function(){
        if(this.pauseUpdate){
            return;
        }
        this._time++;
        if(this._time%5 == 0){
            this.allItemArr[Math.floor(this._time/5) -1] = [];
            for (let i = 0; i < 10; i++){
                this.createItem(Math.floor(this._time/5),i);
            }
        }
    },


    createItem:function(a,b){

        let index = Math.ceil(Math.random()*10);
        let item = cc.instantiate(this.itemPrefab);
        this.layoutNode.addChild(item);
        item.getComponent("sweeperItemCtrl").init(this, a-1, b , index);

        item.setPosition( -10/2*item.width + (a-1)*(item.width + 5), -10/2*item.height +b*(item.height + 5)  );

        this.allItemArr[a-1][b] = item;


        if (a == 10){
            this.pauseUpdate = true;
            this.setChildArr();
        }
    },




    setChildArr:function(){
        let allItemArr = this.allItemArr;

        let ilen = allItemArr.length;
        for (let i = 0 ; i < ilen; i++){
            let jlen = allItemArr[i].length;
            for (let j = 0; j < jlen; j++){
                if (allItemArr[i][j]){
                    let comp = allItemArr[i][j].getComponent("sweeperItemCtrl");
                    comp.resetChild();
                    if (allItemArr[i-1] && allItemArr[i-1][j]){
                        comp.pushChild(allItemArr[i-1][j]);
                    }
                
                    if (allItemArr[i] && allItemArr[i][j-1]){
                        comp.pushChild(allItemArr[i][j-1]);
                    }
                
                    if (allItemArr[i+1] && allItemArr[i+1][j]){
                        comp.pushChild(allItemArr[i+1][j]);
                    }
                
                    if (allItemArr[i] && allItemArr[i][j + 1]){
                        comp.pushChild(allItemArr[i][j + 1]);
                    }
                }
            }
        }
    },

    check:function(i,j){
        cc.log("check item: ", i , j);
        let arr = this.allItemArr;
        let itemChild = arr[i][j].getComponent("sweeperItemCtrl").getChild();

        for (let k = 0; k < itemChild.length; k++){

            if (!itemChild[k].getComponent("sweeperItemCtrl").getEliminateFlag() && 
            itemChild[k].getComponent("sweeperItemCtrl").getIndex() == arr[i][j].getComponent("sweeperItemCtrl").getIndex()){
                itemChild[k].getComponent("sweeperItemCtrl").setEliminateFlag(true);
                this.check(itemChild[k].getComponent("sweeperItemCtrl").getPosX(), itemChild[k].getComponent("sweeperItemCtrl").getPosY());
            }
        }
    },

    getScore:function(a,b){
    
        this.check(a,b);
        this.eliminateNode();
        this.setChildArr();
        
    },

    moveNode:function(){
        let itemArr = this.allItemArr;
        
        // let a =
    },


    eliminateNode:function(){
        let itemArr = this.allItemArr;
        for (let i = 0; i < itemArr.length; i++){
            for(let j = 0; j< itemArr[i].length; j++){
                if (itemArr[i][j] && itemArr[i][j].getComponent("sweeperItemCtrl").getEliminateFlag()){
                    this.allItemArr[i][j].getComponent("sweeperItemCtrl").resetChild();
                    this.allItemArr[i][j].destroy();
                    this.allItemArr[i][j] = null;
                    
                }
            }
        }
    },




});
