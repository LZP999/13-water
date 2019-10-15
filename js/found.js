//读取表单信息
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name]) && this.value != "") {
                    serializeObj[this.name].push(this.value);
                } else {
                    if (this.value != "") {
                        serializeObj[this.name] = [serializeObj[this.name], this.value];
                    }
                }
            } else {
                if (this.value != "") {
                    serializeObj[this.name] = this.value;
                }
            }
        });
        return serializeObj;
    };
})(jQuery);
//用于判断当前列表是否已经打开
var history_flag = {};
for (var i = 1; i < 300; i++) history_flag[i] = 0;
//查询战局详情
function found(obj){
    var str = obj.parentNode.id;
    str = str.substring(7, str.length) //得到当前的序号
    if (history_flag[parseInt(str)] == 0) {
        $.ajax({
            headers: {
                "X-Auth-Token": localStorage.token //此处放置请求到的用户token
            },
            type: "GET",
            url: "https://api.shisanshui.rtxux.xyz/history/" + 12479,//todo 
            contentType: "application/json;charset-UTF-8",
            success: function (result) {
                var arr = result.data.detail
                if (arr.length > 0) {
                    xxx = '<p>'
                    arr.forEach(element => {
                        xxx += "name:" + element.name + "	card:" + element.card + "	score:" +
                            element
                                .score + "<br>";
                    });
                    xxx += "</p>"
                }
                // document.getElementById("collapse5").childNodes[1].childNodes[1].innerText=JSON.stringify(result.data.detail);
                // console.log(obj.childNodes[1].innerText[8]);

                document.getElementById("collapse" + str).childNodes[1].innerHTML = xxx;
            },
            error: function (res) {
                console.log(res);
                alert("获取对战失败");
            }
        })
        history_flag[parseInt(str)] = 1;
    } else {
        history_flag[parseInt(str)] = 0;
    }
}

// var found_data=($('#found-form').serializeJson());
    // // if(found_data.id==undefined){
    // //     alert("战局ID不得为空!");
    // //     return;
    // // }
    // $.ajax({
    //     type:"GET",
    //     url: "https://api.shisanshui.rtxux.xyz/history/"+12479,
    //     dataType:"json",
    //     data:JSON.stringify(found_data),
    //     headers:{
    //         'X-Auth-Token':localStorage.token
    //     },
    //     contentType: "application/json;charset-UTF-8",
    //     success:function(result){
    //         console.log(result);//打印服务端返回的数据
    //         document.getElementById("th1").innerText="战局ID"+result.id;//将战局ID存在本地缓存中
    //         document.getElementById("th2").innerText="战局结算时间"+result.timestamp;//将结算时间存在本地缓存中
    //         for(var i=0;i<4;i++){
    //             document.getElementById("td"+i+"1").innerText=result[i].detail.name;
    //             document.getElementById("td"+i+"2").innerText=result[i].detail.card[0];
    //             document.getElementById("td"+i+"3").innerText=result[i].detail.card[1];
    //             document.getElementById("td"+i+"4").innerText=result[i].detail.card[2];
    //             document.getElementById("td"+i+"5").innerText=result[i].detail.score;
    //             document.getElementById("td"+i+"6").innerText=result[i].detail.player_id;
    //         }
    //         document.getElementById("input11").style.display="none";
    //         document.getElementById("button21").style.display="none";
    //         document.getElementById("found3").style.display="inline";
    //         alert("查询成功！");
    //     },
    //     error:function(res){
    //         alert("查询失败！");
    //     }
    // });

            // if(result.status==0){
            //     localStorage.setItem('id',result.data.id);//将战局ID存在本地缓存中
            //     localStorage.setItem('timestamp',result.data.timestamp);//将结算时间存在本地缓存中
            //     localStorage.setItem('name',JSON.stringify(result.data.detail.name));//将玩家名字存在本地缓存中
            //     localStorage.setItem('card',JSON.stringify(result.data.detail.card));//将玩家出牌情况存在本地缓存中
            //     localStorage.setItem('score',JSON.stringify(result.data.detail.score));//将玩家分数存在本地缓存中
            //     localStorage.setItem('play_id',JSON.stringify(result.data.detail.play_id));//将玩家ID存在本地缓存中
            //     window.location.href="./found2.html";
            // }