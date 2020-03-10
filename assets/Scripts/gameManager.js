// var GameState = cc.Enum({
//     waitting: 0,
//     gameStart: 1,
//     gamePlaying: 2,
//     gameOver: 3,
// });

let arr = [
    {
        child:[],
        eliminateFlag: false,
        x:0,
        y:0,
        index: 0
    },
]

cc.Class({
    extends: cc.Component,

    properties: {
        // gameStatus: {
        //     default: -1,
        //     visible: false
        // }

        itemPrefab:{
            default: null,
            type: cc.Prefab,
        },

        layoutNode:{
            default: null,
            type: cc.Node
        }
    },



    // changeGameState:function(){
        
    // },


    onLoad:function(){
        this.init(10,10);
    },


    initData:function(arr,i,j, index){
        arr[i][j].child = [];
        arr[i][j].eliminateFlag = false;
        arr[i][j].index = index;
        arr[i][j].x = i;
        arr[i][j].y = j;
    
        
    },
        
    init:function(ilen,jlen){
        let arr = [];
        let allItemArr = []
        for (let i = 0 ; i < ilen; i++){
            allItemArr[i] = [];
            arr[i] = [];
            for (let j = 0; j < jlen; j++){
                arr[i][j] = {};

                // cc.log("index : ", i , j );

                let index = Math.ceil(Math.random()*10);
                let item = cc.instantiate(this.itemPrefab);
                this.layoutNode.addChild(item);
                item.getChildByName("lab").getComponent(cc.Label).string = index;

                item.getComponent("sweeperItemCtrl").init(this,index, i, j);

                allItemArr[i][j] = item;
                this.initData(arr, i , j, index);
            }
        }

        for (let i = 0 ; i < ilen; i++){
            for (let j = 0; j < jlen; j++){
                if (arr[i-1] && arr[i-1][j]){
                    arr[i][j].child.push(arr[i-1][j])
                }
            
                if (arr[i] && arr[i][j-1]){
                    arr[i][j].child.push(arr[i][j-1])
                }
            
                if (arr[i+1] && arr[i+1][j]){
                    arr[i][j].child.push(arr[i+1][j])
                }
            
                if (arr[i] && arr[i][j + 1]){
                    arr[i][j].child.push(arr[i][j + 1])
                }
            }
        }

        this.allItemArr = allItemArr;
        this.allDataArr = arr;
        
    },

    check:function(i,j){

        let arr = this.allDataArr;

        for (let k = 0; k < arr[i][j].child.length; k++){
            if (!arr[i][j].child[k].eliminateFlag && arr[i][j].child[k].index == arr[i][j].index){
                cc.log("true-----------------");
                arr[i][j].child[k].eliminateFlag = true;
                this.check(arr[i][j].child[k].x, arr[i][j].child[k].y);
            }
        }
    },

    getScore:function(a,b){
        
        let arr = this.allDataArr;
        for (let k = 0; k < arr[a][b].child.length; k++){
            cc.log("index ===== :", arr[a][b].child[k].index  , arr[a][b].index );
        }


        this.check(a,b);
        // let arr = this.allDataArr;
        let itemArr = this.allItemArr;
        for (let i = 0; i < arr.length; i++){
            for(let j = 0; j< arr[i].length; j++){
                if (arr[i][j].eliminateFlag == true && itemArr[i][j] ){
                    itemArr[i][j].destroy();
                    itemArr[i][j] = null;
                }
            }
        }
    }




});
