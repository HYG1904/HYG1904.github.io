/**
 * Created by web on 2019/4/13.
 */
//轮播图-->
function rrun(){
    var run=setInterval(function(){
        $(".show").next().addClass("show").siblings().removeClass("show").addClass("hidden");
        var i=$(".show").index();
        if(i==6){
            i=0;
            $($("#carousel img")[i]).addClass("show").siblings().removeClass("show").addClass("hidden")
        }
    },2000);
    $("#carousel").mouseenter(function(){
        clearInterval(run)
    });
    $("#carousel").mouseleave(function(){
        rrun()
    });
}
rrun();
//  小屏点击显示列表
$("[data-click=btn]").mouseenter(function(){
        $("[data-click=show]").removeClass("bar")
    }
);
$("[data-click=show]").mouseleave( function(){
    $("[data-click=show]").addClass(("bar"))
});
//    用户登录页面
$("[data-log=user]").mouseenter(function(){
    $("[data-log=login]").show()
});
$("[data-log=login]").mouseleave(function(){
    $("[data-log=login]").hide()
});

//    视频播放事件
$("div").on("click","video",function(){
    var v=this;
    if(v.paused==true){
        v.play();
        v.attr("controls",true)

    }else{
        v.pause()
    }
})
// 获取web storage 修改用户头像
var session=sessionStorage.getItem("uname");
var img=$("[data-log=user]").attr("src")
if(!session){
    $("[data-log=user]").attr("src","img/header/icon-user-white@2x_e5c6494.png")
}else{
    console.log(session)
    // 移除立即注册和立即登录，显示注销
    $("li").remove(".first");
    $("li").remove(".second");
    $("[data-log=login] .hidden").removeClass("hidden")
    var url="http://localhost:3000/user/img";
    var data="uname="+session;
    $.ajax({url:url,data:data}).then(function(result){
        console.log(result[0])
        if(result[0].img.length>0){
            $("[data-log=user]").attr("src",result[0].img);
        }else{
            $("[data-log=user]").attr("src","img/header/icon-user-white@2x_e5c6494.png");
        }
    })
}
// 注销用户
$("[data-click=lgout]").click(function(){
    sessionStorage.removeItem("uname");
    location.reload(true)
})