   //    用户登录页面
   $("[data-log=user]").mouseenter(function(){
    $("[data-log=login]").show()
});
$("[data-log=login]").mouseleave(function(){
    $("[data-log=login]").hide()
});
//        选中参数后，边框变红
function reRed(li){
    $(li).click(function(){
        console.log($(this));
        $(li).removeClass("red");
        $(this).addClass("red")
    });
}
reRed(".version>ul:first-child li")
reRed(".version>ul:nth-child(2) li")
reRed(".version>ul:nth-child(3) li")
reRed(".version>ul:nth-child(4) li")
//        修改购买商品数量 pn
var pn=1;
$("[data-click=increase]").click(function(){
    pn++;
    console.log(pn)
    $(".version input").val(pn);
});
    $("[data-click=reduce]").click(function(){
        if(pn>0){
            pn--;
            $(".version input").val(pn);
        }
    });
    //        修改商品大图,pid为传入的id值
    var pid=location.search;
    var id=pid.split("=")[1];
    var url="http://localhost:3000/product/pid";
    var data="pid="+id;
    $.ajax({url:url,data:data,type:"get"}).then(function(result){
        console.log(result);
        var img_lg=result[0].img_lg;
        var title=result[0].title;
        var title_desc=result[0].title_desc;
        var price=result[0].price;
        var price_desc=result[0].price_desc;
        var discount=result[0].discount;
//            修改大图
        $("[data-click=img_lg]").attr("src",img_lg);
        //            删除小图，
        $(".dt_ride>div>ul>li").remove();
        var img_sm=result[0].img_sm.split(",");
        for(var i of img_sm){
            var li="<li><img src="+`"${i}"`+"/></li>";
//                修改小图
            $(".dt_ride>div>ul").append(li)
        }
        // 修改购物列表中的文字
        $(".version>ul:first-child>li:last-child").html(title)
        // console.log($(".version>ul:first-child>li:last-child"))
//            修改商品名字
        $(".dt_title h3").html(title);
        $(".model h3").html(title);
//            修改商品价格
        $(".model h1").html(`￥${price}`);
//              修改商品描述
        $(".model h3+p").html(title_desc);
//            修改优惠券
        $(".discount>li").remove();
        if(discount!=null){
            var discount=result[0].discount.split(",");
            for(var j of discount){
                var li="<li class='font_red'>"+j+"</li>";
                $(".discount").append(li)
            }
        }
        // 修改底部图片
        $(".pm_list+img").attr("src",img_lg)
//            价格描述
        $(".purchased>li:nth-child(2)").html(price_desc);
        //        点击小图片，显示大图片
        $(".dt_ride>div img").click(function(){
            var src=$(this).attr("src");
            $("[data-click=img_lg]").attr("src",src)
        })
        // 服务器调用数据后，将名字和购买列表中的匹配上
        var lis=$(".version li")
        // console.log(lis)
        // console.log(title)
        for(var li of lis){
            // console.log($(li).html())        
            if($(li).html()==title){
                $(li).addClass("red")
            }
        }
        //        小图片点击移动
        var a=$(".dt_ride>div>ul>li").length;
        var prev=$("[data-click=prev]");
        var next=$("[data-click=next]");
        console.log(a)
        var n=0;
        if(a>4){
            prev.click(function(){
                n++;
                if(n+4<=a){
                    $(".dt_ride>div>ul").css("margin-left",`${-4.2*n}rem`);
                }else{
                    $(this).attr("disabled",true)
                    n-=1
                }
                console.log(n)
            })
        }
        next.click(function(){
            prev.attr("disabled",false)
            var b=$(".dt_ride>div>ul").css("margin-left");
            var c= b.split("p")[0];
            if(c<0){
                n--;
                $(".dt_ride>div>ul").css("margin-left",`${-4.2*n}rem`);
            }
        })

    });
// 点击加入购物车
function addCart(){
    // 如果没有点击加入购物车，则隐藏购物车上的数量
    if($("[data-click=num_val]").html()==0){
        $("[data-click=num_val]").hide()
    }
    // 点击加入购物车，修改购物车上的数量，并显示
    $("[data-click=addCart]").click(function(){
        var num=$("[data-click=value]").val();
        $("[data-click=num_val]").html(num);
        $("[data-click=num_val]").show();
    })
    // 点击立即购买，先服务器发送数据，插入数据库，并跳转到订单页
    $("[data-click=buy]").click(function(){
        // 先判定购物车上的数字，入果小于0，则提示用户加入购物车
        if($("[data-click=num_val]").html()==0){
            alert("您还没有添加到购物车呢")
        }else{
            var num=$("[data-click=value]").val();
            var model= $(".version>ul:first-child>li:last-child").html()
            console.log(model)
            var price=$("[data-click=price]").html()
            var color=$(".version>ul:nth-child(2) .red").html()
            var memory=$(".version>ul:nth-child(3) .red").html()
             location.href="cart.html?unum="+num+"&umodel="+model+"&price="+price+"&color="+color+"&memory="+memory+"&pid="+id;
        }
        
    })
}
addCart()