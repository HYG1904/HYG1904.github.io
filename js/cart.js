function alter_info (){
    var str=decodeURI(location.search)
    console.log(str)
    var array=str.slice(1).split("&")
    console.log(array)
    var obj={}
    for(var i=0;i<array.length;i++){
        obj[i]=array[i].slice(array[i].indexOf("=")+1);
    }
    // 数量下标0  名字下标1 价格下标2
    console.log(obj)
    $("[data-click=num]").html(obj[0])
    $("[data-click=dname]").html(obj[1])
    $("[data-click=price]").html(obj[2])
    $("[data-click=color]").html(obj[3])
    $("[data-click=memory]").html(obj[4])
    var price=obj[2].slice(1)
    var total="￥"+obj[0]*price
    // 修改商品表格中的总价
    $("[data-click=total]").html(total)
    // 修改支付总价
    $("[data-click=p_total]").html("总金额"+total)
    $("[data-click=p_total1]").html("应付"+total)
    $("[data-click=toPay]").click(function(){
        // 支付点击事件
    })
     // 获取购买商品的图片
     var url="http://localhost:3000/product/pid";
     data="pid="+obj[5];
     $.ajax({data,url}).then((result)=>{
         var src=result[0].img_lg
         console.log(src)
         $("[data-click=p_src]").attr("src",src)
     })
}
alter_info()