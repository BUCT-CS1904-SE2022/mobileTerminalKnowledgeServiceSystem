import router from '@system.router';
import storage from '@system.storage';
import http from '@ohos.net.http';
export default {
    data: {
        account:"test1",
        password:"test1",
        ress:[],
        url:"https://www.yiip.xyz/proxy-api/doLogin",
        responseData:"NA",
        userid:''
    },
    onInit() {

    },

    Account(e){
        this.account=e.text;
        //this.account="test";
    },
    topassword(e){
        this.password=e.text;
        //this.password="test";
    },
    homePage(){
        var that = this;
        this.fE();
    },
    fE: function () {
        let httpRequest = http.createHttp();
        var that=this;
        let url=that.url+"?username="+that.account+"&password="+that.password;
        httpRequest.request(
            url,
            {
                method:'GET', // 可选，默认为“GET”
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.ress=a;
                that.userid=''+a[0].id;
                router.push({
                    uri:'pages/homePage/homePage',
                    params:{
                        userid:that.userid
                    }
                })
            } else {
                console.info('error:' + err.data);
            }
        }
        );
    }
}