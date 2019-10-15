var token="";

function disappear(p)
{
    document.getElementById(p).value="";
}
function judge(id,text)
{
    var x=document.getElementById(id).value;
    if(x=="")
        document.getElementById(id).value=text;
}
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
//登录的数据传输
function login(){
    var login_data=($('#login-form').serializeJson());
    if(login_data.username==""||login_data.username=="请输入账号"){
        alert("账号不得为空!");
        return;
    }else if(login_data.password==""||login_data.password=="请输入密码"){
        alert("密码不得为空！");
        return;
    }
    $.ajax({
        type:"POST",
        url: "https://api.shisanshui.rtxux.xyz/auth/login",
        dataType:"json",
        data:JSON.stringify(login_data),
        contentType: "application/json;charset-UTF-8",
        success:function(result){
            console.log(result);//打印服务端返回的数据
            if(result.status==0){
                token=result.data.token;
                localStorage.setItem('token',result.data.token);//将token的值存入本地缓存中
                localStorage.setItem('user_id',result.data.user_id);//将user_id的值存入本地缓存中
                console.log(window.localStorage);
                alert("登录成功");
                window.location.href="./result.html";
            }
        },
        error:function(res){
            alert("账号/密码错误，请重新登录！");
        }
    });
}
//注册的数据传输
function register(){
    var register_data=($('#register-form').serializeJson());
    if(register_data.username==""||register_data.username=="请输入账号"){
        alert("账号不得为空!");
        return;
    }else if(register_data.password==""||register_data.password=="请输入密码"){
        alert("密码不得为空！");
        return;
    }else if(register_data.password2==""||register_data.password2=="请再次输入密码"){
        alert("再次密码不得为空！");
        return;
    }else if(register_data.password2!=register_data.password){
        alert("两次密码不一致，请重新设置密码！");
        return;
    }
    $.ajax({
        type:"post",
        url: "https://api.shisanshui.rtxux.xyz/auth/register",
        dataType:"json",
        data:JSON.stringify(register_data),
        contentType: "application/json;charset-UTF-8",
        success:function(result){
            console.log(result);//打印服务端返回的数据
            if(result.status==0){
                alert("注册成功");
                window.location.href="./login.html";
            }
        },
        error:function(res){
            console.log(result);//打印服务端返回的数据

            alert("注册失败！")
        }
    });
}
