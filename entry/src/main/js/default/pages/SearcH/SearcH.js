import http from '@ohos.net.http';
import router from '@system.router';
export default {
    data: {
        url:"https://www.yiip.xyz/proxy-api/search",
        list1:[],
        userid:3
    },
    search:function(e){
        console.info(e)
    },
    sub:function(e){
        var searchvalue=e.text;
        var that=this;
        var url=this.url+"?name="+searchvalue;
        let httpRequest = http.createHttp();
        httpRequest.request(
            url,
            {
                method: 'GET',
            },(err, data) => {
            if (!err) {
                let a=JSON.parse(data.result)
                that.list1=a
                console.info(a[0].image_url)
                console.info(a[0].discover_time)
                console.info(a[0].name)
                console.info(a[0].artist)
            } else {
                console.info('error:' + err.data);
            }
        }
        );
    },
    todetail:function(e){
        console.info("id:"+e)
        var that=this
        router.push({
            uri:'pages/detail/detail',
            params:{
                id:e,
                userid:that.userid
            }
        })
    },
}
