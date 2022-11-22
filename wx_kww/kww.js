/*
微信小程序-口味王
群文件有抓取口味王ck工具
不会用加群：212796668、681030097、743744614
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#微信小程序-口味王
0 40 0 * * * https://github.com/JDWXX/jd_job.git, tag=微信小程序-口味王, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "0 40 0 * * *" script-path=https://github.com/JDWXX/jd_job.git,tag=微信小程序-口味王
===================================Surge================================
微信小程序-口味王 = type=cron,cronexp="0 40 0 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job.git
====================================小火箭=============================
微信小程序-口味王 = type=cron,script-path=https://github.com/JDWXX/jd_job.git, cronexpr="0 40 0 * * *", timeout=3600, enable=true
 */
const $ = new Env('微信小程序-口味王');
//此处填写口味王账号cookie。
let cookiesKwwArr = [
]
// 判断环境变量里面是否有口味王ck
if (process.env.KWW_COOKIE) {
    if (process.env.KWW_COOKIE.indexOf('&') > -1) {
        cookiesKwwArr = process.env.KWW_COOKIE.split('&');
    } else if (process.env.KWW_COOKIE.indexOf('\n') > -1) {
        cookiesKwwArr = process.env.KWW_COOKIE.split('\n');
    } else {
        cookiesKwwArr = [process.env.KWW_COOKIE];
    }
}
const notify = $.isNode() ? require('./sendNotify') : '';
let UA = '';
function taskUrl(url) {
    return {
        url: `${url}`,
        headers: {
            "Host": "member.kwwblcj.com",
            "Connection": "keep-alive",
            'User-Agent': UA,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
}
function taskUrlBy(url,body) {
    return {
        url: url,
        body: `${JSON.stringify(body)}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }
}

function tx(url) {
    return new Promise(async (resolve) => {
        $.get(taskUrl(url), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(JSON.parse(data))
            }
        })
    })
}

function txBy(url,body) {
    return new Promise(async (resolve) => {
        $.post(taskUrlBy(url,body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(JSON.parse(data))
            }
        })
    })
}
!(async () => {
    if (!cookiesKwwArr[0]) {
        console.log("【提示】请先获取微信小程序[口味王]cookie,环境变量添加 KWW_COOKIE ,如有不懂加群：212796668、681030097、743744614")
        return;
    }
    for (let i = 0; i < cookiesKwwArr.length; i++) {
        if (cookiesKwwArr[i]) {
            cookie = cookiesKwwArr[i];
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            UA = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36`;
            message = '';
            console.log(`\n******开始【账号${cookie}】*********\n`);

            try {
                let propList;
                let jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=select-member-score&formName=searchForm&memberId=' + cookie)
                console.log("剩余积分：" + jf.rows)
                if(jf.rows > 888){
                    console.log("积分大于 888 分，请去微信公众号【口味王】兑换红包")
                }
                console.log("【每日签到】")
                jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=selectSignInfo&formName=searchForm&memberId=' + cookie)
                propList = jf.rows.data
                for (var prop in propList) {
                    if(propList[prop].flag == "1"){
                        console.log(propList[prop].formulaDesc + " " + (propList[prop].flag == "0" ? "未签到" : "已签到") + "  签到奖励 " + propList[prop].paramNo)
                    }
                    if(propList[prop].flag == "0"){
                        let body = {
                            "pageName": "AddSignSvmInfo",
                            "formName": "addForm",
                            'orderNo': propList[prop].orderNo ,
                            'paramNo': propList[prop].paramNo ,
                            'cateId': propList[prop].cateId ,
                            'memberId': cookie ,
                            'memberName': "JDWXX" ,
                        }
                        jf = await txBy("https://member.kwwblcj.com/member/api/submit/?userKeys=v1.0", body)
                        console.log(jf.msg)
                        break;
                    }
                }
                console.log("【任务】")
                jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=select-task-list&formName=searchForm&memberId=' + cookie)
                propList = jf.rows
                for (var prop in propList) {
                    console.log(propList[prop].taskTitle +  "  " + "奖励积分:" +propList[prop].rewardScore + " ->  " + (propList[prop].complete == '0' ? "待完成" : "已完成"))
                    if(propList[prop].taskTitle == "开启签到提醒" && propList[prop].complete == "0"){
                        console.log("【开启签到提醒】")
                        jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSignTaskFlag&formName=addForm&memberId=' + cookie
                            +'&userCname=JDWXX&openId=o_V6_5Yo3mET81MVAQw4yYebL3zE')
                        console.log(jf.rows[0] == 'T' ? '完成': '失败，去手动完成任务')
                        jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSignTaskFlag&formName=addForm&memberId=' + cookie
                            +'&userCname=JDWXX&openId=0')
                        console.log(jf.rows[0] == 'T' ? '完成': '失败，去手动完成任务')
                    }
                    if(propList[prop].taskTitle == "订阅活动通知" && propList[prop].complete == "0"){
                        console.log("【订阅活动通知】")
                        jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSubscribeTaskFlag&formName=addForm&memberId=' + cookie
                            + '&userCname=JDWXX&openId=o_V6_5Yo3mET81MVAQw4yYebL3zE')
                        console.log(jf.rows[0] == 'T' ? '完成': '失败，去手动完成任务')
                        jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSubscribeTaskFlag&formName=addForm&memberId=' + cookie
                            +'&userCname=JDWXX&openId=0')
                        console.log(jf.rows[0] == 'T' ? '完成': '失败，去手动完成任务')
                    }
                }
                console.log("【每日阅读】")
                jf = await tx('https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setNewsReadTaskFlag&formName=addForm&memberId=' + cookie + '&userCname=JDWXX&articleTitle=undefined')
                console.log("阅读日期：" + jf.rows)

            }catch (e){

            }
            await $.wait(50);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}