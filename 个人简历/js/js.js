/**
 * Created by Administrator on 2016/1/29.
 */

function getEle(ele) {
    return document.querySelector(ele);
}
var box = getEle("#box");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if (winW / winH < desW / desH) {
    box.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    box.style.webkitTransform = "scale(" + winW / desW + ")";
}
var arr=["1--bg.jpg","1--footer.png","2--bg.jpg","2--LT.png","2--RT.png","3--LT.png","3--bg.jpg","5--bg.jpg"];
var progress=getEle(".progress");
var loading=getEle("#loading");
var fnLoad=function(){
    var num=0;
    for(var i=0;i<arr.length;i++){
        var oImg=new Image;
        oImg.src="images/"+arr[i];
        oImg.onload=function(){
            num++;
            progress.style.width=num/arr.length*100+"%";
            progress.addEventListener("webkitTransitionEnd",function(){
                if(num==arr.length&&loading){
                    box.removeChild(loading);
                    loading=null;
                    music.play();
                }
            },false);
        }
    }
};
fnLoad();

var list=getEle("#list");
var oLis=list.querySelectorAll("li");
/*var li1=getEle(".li1");
var n=0;
function fnFPage(n){
    oLis[n].style.className="zIndex";
    var cur =eval("li"+n);
    cur.id="li"+n;
}*/

[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
})
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;//move时的坐标
    var movePos = moveTouch-this.startY;//移动的距离
    var index = this.index;
    console.log(oLis);
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        console.log(arguments[0]);
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        console.log(arguments[0].firstElementChild);
        arguments[0].firstElementChild.firstElementChild.id="";
    })
    if(movePos>0){/*↓*/
        var pos = -winH+movePos;
        this.prevsIndex = (index ==0?oLis.length-1:index-1);//上一张索引
    }else if(movePos<0){/*↑*/
        var  pos = winH+movePos;
        this.prevsIndex = (index == oLis.length-1?0:index+1);//下一张的索引

    }
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+")  translate(0,"+movePos+"px)";


}
function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.firstElementChild.id="li"+(this.index+1);
        },false)
    }

}
document.addEventListener("touchmove",function(e){
    console.log(e.target.id);
},false)


var mus=getEle("#hed3");
var music=getEle("#music");
var hed3=getEle(".hed3");
var flagM=true;

mus.onclick=function(){
    if(flagM){
        music.pause();
        flagM=false;
        hed3.id="";
    }
    else{
        music.play();
        hed3.id="hed3";
        flagM=true;
    }

};