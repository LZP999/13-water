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
//查询历史战绩
function Found(){
    const table = document.getElementById('table');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const pages = document.getElementById('pages');  
    var record_data=($('#record-form').serializeJson());
    if(record_data.id==undefined){
        alert("玩家id不得为空!");
        return;
    }else if(record_data.limit==undefined){
        alert("每页条数不能为空！");
        return;
    }else if(record_data.page==undefined){
        alert("页码不能为空！");
        return;
    }
    //默认设定每页十人
    let num1 = record_data.limit;
    //定义一个变量保存每页真实应该展示的数量
    let num2;
    //默认展示第一页
    let page = 1; 
    $.ajax({
        type:"GET",
        url: "https://api.shisanshui.rtxux.xyz/history",
        dataType:"json",
        data:JSON.stringify(record_data),
        headers:{
            'X-Auth-Token':localStorage.token
        },
        success:function(result){
            document.getElementById("record1").style.display="none";
            document.getElementById("record3").style.display="inline";
            console.log(data);//打印服务端返回的数据
            const render = function () {
                //判断当前选择的页码对应的人数
                if (result.length - num1 * (page - 1) >= 10) {
                    num2 = 10;
                } else {
                    num2 = result.length - num1 * (page - 1);
                }
    
    　　　　　　　//渲染该页对应的数据
                for (let i = num1 * (page - 1); i < num2 + num1 * (page - 1); i++) {
                    table.innerHTML +=
                        `<tr>
                <th>${result[i].id}</th>
                <th>${result[i].card[0]}</th>
                <th>${result[i].card[1]}</th>
                <th>${result[i].card[2]}</th>
                <th>${result[i].score}</th>
                <th>${result[i].timestamp}</th>
            </tr>`;
                }
            }
            render();    
            const creatPages = function () {
                pages.innerHTML = '';
                for (let i = 0; i < Math.ceil(result.length / num1); i++) {
                    pages.innerHTML += ` <button data-page="${i+1}">${i+1}</button>`
                }
            }
            creatPages();
            //绑定向前翻页事件
            prev.onclick = function () {
                if (page > 1) {
                    page--;
                    render();
                } else {
                   alert('当前为第一页！')
                }
            }

        //绑定向后翻页事件
        next.onclick = function () {
            if (page < Math.ceil(result.length / num1)) {
                page++;
                render();
            } else {
                alert('当前为最后一页！')
            }
        }

        //绑定点击页码渲染相应的数据事件
        pages.addEventListener('click', function (e) {
            page = e.target.getAttribute('data-page');
            render();
        })
        },
        error:function(){
            alert("输入有误！");
        }
    });
}




// $(function(){ 
//     var currentPage=Number(20);
//     var pageNum=Number(50);

//     $("#page_btn2").text(currentPage-2);
//     $("#page_btn3").text(currentPage-1);
//     $("#page_btn4").text(currentPage);
//     $("#page_btn5").text(currentPage+1);
//     $("#page_btn6").text(currentPage+2);
//     $("#page_btn7").text(pageNum);
//     $("#page_btn4").css("background-color","#4f90fb");
//     $("#page_btn4").css("border","1px solid #ddd");
//     $("#page_btn4").css("color","#fff");

//     if(currentPage==1)  
//     {
//         $("#prePage").hide();  
//     }
//     if(currentPage==pageNum)    
//     {
//         $("#sufPage").hide();
//     }
//     if(currentPage<=3){
//         $("#prePoint").hide();
//         $("##page_btn1").hide();
//     }
//     else if(currentPage==4){
//         $("#prePoint").hide();
//     }
//     if(currentPage==1)
//     {
//         $("##page_btn2").hide();
//         $("##page_btn3").hide();
//     }
//     else if(currentPage==2)
//     {
//         $("##page_btn2").hide();
//     }
//     if(currentPage>=pageNum-2){
//         $("#sufPoint").hide();
//         $("##page_btn7").hide();
//     }
//     else if(currentPage==pageNum-3){
//         $("#sufPoint").hide();
//     }
//     if(currentPage==pageNum)
//     {
//         $("#page_btn5").hide();
//         $("#page_btn6").hide();
//     }
//     if(currentPage==pageNum-1)
//     {
//         $("#page_btn6").hide();
//     }
// });

