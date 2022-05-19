import http from '@ohos.net.http';
export default {
    data: {
        url:'https://www.yiip.xyz/proxy-api/detail',
        url2:'https://www.yiip.xyz/proxy-api/likeRelic',
        url3:'https://www.yiip.xyz/proxy-api/unLikeRelic',
        url4:'https://www.yiip.xyz/proxy-api/comment',
        url5:"https://www.yiip.xyz/proxy-api/doComment",
        comlist:[],
        detailUrl:"",
        imageUrl:"",
        name:"",
        discoverTime:"",
        detail:"",
        id:200,
        userid:5,
        praise:false,
        Show:false,
        text:""
    },
    onInit(e){
        var that=this;
        console.info("aaaaaaaaaaaaaaaaaaaaaaaa"+that.userid)
        var url=that.url+"?id="+this.id+"&uid="+that.userid;
        let httpRequest = http.createHttp();
        httpRequest.request(
            url,
            {
                method: 'GET',
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.detailUrl=a[0].detail.detailUrl
                that.imageUrl=a[0].detail.imageUrl
                that.name=a[0].detail.name
                that.discoverTime=a[0].detail.discoverTime
                that.detail=a[0].detail.detail;
                that.praise=a[0].isLike
            } else {
                console.info('error:' + err.data);
            }
        }
        );
        var url4=that.url4+"?id="+that.id+"&uid="+that.userid;
        let httpRequest4 = http.createHttp();
        httpRequest4.request(
            url4,
            {
                method: 'GET',
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.comlist=a;
                console.info(a[0].publish_user_name)
                console.info(a[0].content)
            } else {
                console.info('error:' + err.data);
            }
        }
        );
    },
    topraise:function(e){
        var that=this;
        console.info("1212121212")
        var url2=that.url2+"?id="+that.id+"&uid="+that.userid;
        let httpRequest = http.createHttp();
        httpRequest.request(
            url2,
            {
                method:'PUT',
//                extraData:{
//                    id:that.id,
//                    uid:that.uid
//                },
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                console.info(a[0])
                that.praise=a[0]
//                console.info('code:' + data.responseCode);
                //that.detailUrl=a[0].detail.detailUrl

            } else {
                console.info('error:' + err.data);
            }
        }
        );
    },
    deletepraise:function(e){
        var that=this;
        var url3=that.url3+"?id="+that.id+"&uid="+that.userid;
        let httpRequest = http.createHttp();
        httpRequest.request(
            url3,
            {
                method:'PUT',
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                console.info(a[0])
                that.praise=a[0]
                that.praise=!that.praise
                //                console.info('code:' + data.responseCode);
                //that.detailUrl=a[0].detail.detailUrl

            } else {
                console.info('error:' + err.data);
            }
        }
        );
    },
    tocomment:function(e){
        console.info("123321123321")
        this.Show=!this.Show;
    },
    topinglun:function(e){
        this.text=e.text
    },
    tosubmit:function(){
        var that=this;
        var url5=that.url5+"?id="+that.id+"&uid="+that.userid+"&content="+that.text;
        let httpRequest5 = http.createHttp();
        httpRequest5.request(
            url5,
            {
                method: 'GET',
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                console.info(a[0])
            } else {
                console.info('error:' + err.data);
            }
        }
        );
    }
}
