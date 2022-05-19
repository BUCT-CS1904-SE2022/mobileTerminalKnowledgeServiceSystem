import http from '@ohos.net.http';
import router from '@system.router';
import storage from '@system.storage';
export default {
    data:{
        list1:[],
        list2:[],
        list3:[],
        url:'https://www.yiip.xyz/proxy-api/homePage',
        url2:"https://www.yiip.xyz/proxy-api/hotSearch",
        url3:"https://www.yiip.xyz/proxy-api/findLike",
        userid:3
    },
    onInit(){
        var that=this;
        this.storageGet();
        let httpRequest = http.createHttp();
        httpRequest.request(
            that.url,
            {
                method: 'GET',
                readTimeout: 60000, // 可选，默认为60000ms
                connectTimeout: 60000 // 可选，默认为60000ms
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.list1=a;
                //                that.ress=a[0].discoverTime
                console.info(a[0].imageUrl)
                console.info(a[0].discoverTime)
                console.info(a[0].name)
                console.info(a[0].artist)
            } else {
                console.info('error:' + err.data);
            }
        }
        );
        let httpRequest2 = http.createHttp();
        httpRequest2.request(
            that.url2,
            {
                method: 'GET',
                readTimeout: 60000, // 可选，默认为60000ms
                connectTimeout: 60000 // 可选，默认为60000ms
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.list2=a;
                //                that.ress=a[0].discoverTime
                console.info(a[0].imageUrl)
                console.info(a[0].discoverTime)
                console.info(a[0].name)
                console.info(a[0].artist)
            } else {
                console.info('error:' + err.data);
            }
        }
        );
        let httpRequest3 = http.createHttp();
        var url3=that.url3+"?uid="+that.userid;
        httpRequest3.request(
            url3,
            {
                method: 'GET',
                readTimeout: 60000, // 可选，默认为60000ms
                connectTimeout: 60000 // 可选，默认为60000ms
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.list3=a;
            } else {
                console.info('error:' + err.data);
            }
        }
        );
    },
    storageGet() {
        var that=this;
        storage.set({
            key: 'userid',
            value: that.userid,
            success: function() {
                console.info('call storage.set success.');
                storage.get({
                    key: 'userid',
                    success: function(data) {
                        console.info('call storage.get success: ' + data);
                        that.userid=data;
                    },
                    fail: function(data, code) {
                        console.info('call storage.get fail, code: ' + code + ', data: ' + data);
                    },
                    complete: function() {
                        console.info('call complete');
                    },
                });
            },
            fail: function(data, code) {
                console.info('call storage.set fail, code: ' + code + ', data: ' + data);
            },
        });

    },
    change: function(e) {
        console.log("Tab index: " + e.index);
    },
    todetail:function(e){
        console.info("id:"+e)
        var that=this;
        router.push({
            uri:'pages/detail/detail',
            params:{
                id:e,
                userid:that.userid
            }
        })
    },
    tosearch:function(e){
        var that=this
        router.push(({
            uri:'pages/SearcH/SearcH',
            params:{
                userid:that.userid
            }
        }))
    },
    totest:function(e){
        router.push(({
            uri:'pages/teSt/teSt'
        }))
    },
}