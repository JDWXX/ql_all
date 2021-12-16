/*
九章头条
下载地址：APP商店 九章头条
使用方法
获取数据打开APP即可获取
一天预算2块的样子
邀请的别邀请多了容易封号
========青龙===========
ql raw http://nm66.top/jzread.js
变量为jzreadurl多账号用@隔开
export jzreadurl='https://api.st615.com/v1/user/info?token=抓包的token'
自行抓包替换 关键字为token 抓包的token
提现变量为cashtx
面额为0.3 2 5 30 50 100
新账号提现改为export cashtx='0.3'
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#九章头条
0 15 5,15,21 * * * https://github.com/JDWXX/ql_all/blob/master/qt/jztt/jd_jzread.js, tag=九章头条, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxcfd.png, enabled=true

================Loon==============
[Script]
cron "0 15 5,15,21 * * *" script-path=https://github.com/JDWXX/ql_all/blob/master/qt/jztt/jd_jzread.js,tag=九章头条

===============Surge=================
九章头条 = type=cron,cronexp="0 15 5,15,21 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/ql_all/blob/master/qt/jztt/jd_jzread.js

============小火箭=========
九章头条 = type=cron,script-path=https://github.com/JDWXX/ql_all/blob/master/qt/jztt/jd_jzread.js, cronexpr="0 15 5,15,21 * * *", timeout=3600, enable=true
*/
const $ = new Env('九章头条');
let status;
status = (status = ($.getval("jzreadstatus") || "1")) > 1 ? `${status}` : "";
// 账号扩展字符
let jzreadurlArr = []
    , jzreadcount = ''
let jzreadurl = $.isNode() ? (process.env.jzreadurl ? process.env.jzreadurl : "") : ($.getdata('jzreadurl') ? $.getdata('jzreadurl') : "")
let cashtx = $.isNode() ? (process.env.cashtx ? process.env.cashtx : "") : ($.getdata('cashtx') ? $.getdata('cashtx') : "")
let jzreadurls = ""
const logs = 0;

var hours = new Date().getHours();
var s = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime() / 1000).toString();
!(async()=>{
        if (typeof $request !== "undefined") {
            await jzreadck()
        } else {
            if (!$.isNode()) {
                jzreadurlArr.push($.getdata('jzreadurl'))
                let jzreadcount = ($.getval('jzreadcount') || '1');
                for (let i = 2; i <= jzreadcount; i++) {
                    jzreadurlArr.push($.getdata(`jzreadurl${i}`))
                }
                console.log(`------------- 共${jzreadurlArr.length}个账号-------------\n`)
                for (let i = 0; i < jzreadurlArr.length; i++) {
                    if (jzreadurlArr[i]) {
                        jzreadurl = jzreadurlArr[i];
                        $.index = i + 1;

                        console.log(`\n开始【九章头条${$.index}】`)

                        await benefit()
                        await clock()
                        await share()
                        await share()
                        await share()
                        await cashads()
                        await info()
                        await doublesign()
                        await sign1()
                        await doads(94)
                        //8 9 10 11 sign1/94
                        await doads(8)
                        await doads(9)
                        await doads(10)
                        await doads(11)
                        await doads(77)
                        await getbenefit()

                        //await info()

                    }
                }
            } else {
                if (process.env.jzreadurl && process.env.jzreadurl.indexOf('@') > -1) {
                    jzreadurlArr = process.env.jzreadurl.split('@');
                    console.log(`您选择的是用"@"隔开\n`)
                } else {
                    jzreadurls = [process.env.jzreadurl]
                }
                ;Object.keys(jzreadurls).forEach((item)=>{
                        if (jzreadurls[item]) {
                            jzreadurlArr.push(jzreadurls[item])
                        }
                    }
                )
                console.log(`共${jzreadurlArr.length}个cookie`)
                for (let k = 0; k < jzreadurlArr.length; k++) {
                    $.message = ""
                    jzreadurl = jzreadurlArr[k]
                    $.index = k + 1;
                    console.log(`\n开始【九章头条${$.index}】`)

                    await benefit()
                    await clock()
                    await share()
                    await share()
                    await share()
                    await cashads()
                    await info()
                    await doublesign()
                    await sign1()
                    await doads(94)
                    //8 9 10 11 sign1/94
                    await doads(8)
                    await doads(9)
                    await doads(10)
                    await doads(11)
                    await doads(77)
                    await getbenefit()

                    // await info()
                }
            }
        }
    }
)().catch((e)=>$.logErr(e)).finally(()=>$.done())

function jzreadck() {
    if ($request.url.indexOf("info") > -1) {
        const jzreadurl = JSON.stringify($request.url)
        if (jzreadurl)
            $.setdata(jzreadurl, `jzreadurl${status}`)

        $.log(jzreadurl)

        $.msg($.name, "", '九章头条' + `${status}` + '数据获取成功！')

    }
}

async function benefit() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/index/benefit?token=${token}`,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }

            }
            $.get(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("can_receive：" + result.data['can_receive'] + "\nis_receive：" + result.data['is_receive'] + "\nis_video：" + result.data['is_video'] + "\nseconds：" + result.data.seconds)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}

async function clock() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/task/clock`,
                body: `is_double=0&token=${token}`,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    //console.log(`${JSON.stringify(nm)}`)
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("is_sign：" + result.data['is_sign'] + "\ncoin：" + result.data.coin)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function doublesign() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]
            let nm = {
                url: `https://api.st615.com/v1/task/continue`,
                body: `token=` + token,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("coin：" + result.data.coin)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function info() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/user/info?token=` + token,
                // body:  `token=`+token,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.get(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("invite_code：" + result.data['invite_code'] + "\nmy coin：" + result.data.integral + "\nwork_money：" + result.data['work_money'] + "\nmoney：" + result.data.money)
                        if (result.data.money > cashtx) {
                            $.log('现在时间为：' + hours + ":" + s)
                            if (hours >= 9) {
                                await cash(cashtx)

                            } else {
                                $.log("现在没到9点不能提现\n每日自动0.3")
                            }
                        }
                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}

async function doads(id) {
    return new Promise((resolve)=>{
            token = jzreadurl.match(/token=(\S{32})/)[1]
            let nm = {
                url: `https://api.st615.com/v1/task/ads`,
                body: `token=` + token + `&id=${id}`,
                //id 8 9 10 11 sign1/94
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("coin：" + result.data.coin + "\nad_interval：" + result.data['ad_interval'])

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function getreadlist(id) {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/article/list?cid=0&page=1&limit=10&type=0&terminal=Apple&version=1.2.3&token=${token}`,
                //body:  `token=`+token,
                headers: {
                    'Host': 'api.st615.com',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
                    'Accept': '*/*',
                    'Connection': ' keep-alive',
                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Encoding': ' gzip, deflate',

                }
            }
            $.get(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        //$.log(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            readlist = result.data.list
                        for (let i = 0; i < readlist.length; i++) {

                            readid = readlist[i].id
                            title = readlist[i].title
                            $.log("ready read：" + title)
                            await read(readid)
                            await $.wait(30000)
                            await finish(readid)

                        }

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function read(id) {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/comment/list?&article_id=${id}&page=1&limit=10&token=` + token,
                //body:  `token=`+token,
                headers: {
                    'Host': 'api.st615.com',
                    //'Content-Type':' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.get(nm, async(error,response,data)=>{
                    //$.log(data)
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)

                            //$.log("ready read："+title)

                            if (result.code != 0)

                                $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}

async function finish(id) {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/article/finish`,
                body: `id=${id}&token=${token}`,
                headers: {
                    'Host': 'api.st615.com',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Accept': '*/*',
                    'Connection': ' keep-alive',
                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Encoding': ' gzip, deflate',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    //$.log(data)
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("success add coin：" + result.data.coin)

                        if (result.code != 0)

                            $.log('error this id have read')

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function sign1() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/sign/sign`,
                body: `token=` + token,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log(result.msg)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function getvideo() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/article/list?type=2&cid=35&page=1&terminal=Apple&version=1.2.3&token=` + token,
                //body:  `token=`+token,
                headers: {
                    'Host': 'api.st615.com',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
                    'Accept': '*/*',
                    'Connection': ' keep-alive',
                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Encoding': ' gzip, deflate',

                }
            }
            $.get(nm, async(error,response,data)=>{
                    // $.log(data)
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            a = result.data.list
                        for (let i = 0; i < a.length; i++) {

                            const videoid = a[i].id
                            $.log('ready play：' + a[i].title)
                            await $.wait(60000)
                            await finish(videoid)
                        }
                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}

async function share() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/article/share`,
                body: `device=iPhone%208%20Plus&id=&os=14.4&source=article&token=` + token,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log(result.msg)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function cashads() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/cash/ads?token=${token}&source=cash`,
                //body:  `device=iPhone%208%20Plus&id=${id}&os=14.4&source=article&token=`+token,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log(result.msg)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
async function cash() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/cash/withdraw-new`,
                body: `token=${token}&type=1&money=0.3`,
                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.post(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log(result.msg)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}

async function getvideo() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/article/list?type=2&cid=35&page=1&terminal=Apple&version=1.2.3&token=` + token,
                //body:  `token=`+token,
                headers: {
                    'Host': 'api.st615.com',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
                    'Accept': '*/*',
                    'Connection': ' keep-alive',
                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Encoding': ' gzip, deflate',

                }
            }
            $.get(nm, async(error,response,data)=>{
                    // $.log(data)
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            a = result.data.list
                        for (let i = 0; i < a.length; i++) {

                            const videoid = a[i].id
                            $.log('ready play：' + a[i].title)
                            await $.wait(30000)
                            await finish(videoid)
                        }
                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}

async function getbenefit() {
    return new Promise((resolve)=>{

            token = jzreadurl.match(/token=(\S{32})/)[1]

            let nm = {
                url: `https://api.st615.com/v1/index/get-benefit?token=${token}`,

                headers: {
                    'Host': 'api.st615.com',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',

                    'User-Agent': 'ChapterNine/1.2.3 (com.ass.jiuzhang; build:1120; iOS 14.3.0) Alamofire/5.4.2',
                    'Accept-Language': 'zh-Hans-CN;q=1.0, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',

                }
            }
            $.get(nm, async(error,response,data)=>{
                    try {
                        const result = JSON.parse(data)
                        if (logs)
                            $.log(data)
                        if (result.code == 0)
                            $.log("get coin：" + result.data.coin + "\nnext time：" + result.data.seconds)

                        if (result.code != 0)

                            $.log(result.msg)

                    } catch (e) {
                        $.logErr(e, response);
                    } finally {
                        resolve();
                    }
                }
            )
        }
    )
}
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e="GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post),
                new Promise((e,i)=>{
                        s.call(this, t, (t,s,r)=>{
                                t ? i(t) : e(s)
                            }
                        )
                    }
                )
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t,
                this.http = new s(this),
                this.data = null,
                this.dataFile = "box.dat",
                this.logs = [],
                this.isMute = !1,
                this.isNeedRewrite = !1,
                this.logSeparator = "\n",
                this.startTime = (new Date).getTime(),
                Object.assign(this, e),
                this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e=null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e=null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t))
                } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e=>{
                    this.get({
                        url: t
                    }, (t,s,i)=>e(i))
                }
            )
        }
        runScript(t, e) {
            return new Promise(s=>{
                    let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                    i = i ? i.replace(/\n/g, "").trim() : i;
                    let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                    r = r ? 1 * r : 20,
                        r = e && e.timeout ? e.timeout : r;
                    const [o,h] = i.split("@")
                        , a = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: "cron",
                            timeout: r
                        },
                        headers: {
                            "X-Key": o,
                            Accept: "*/*"
                        }
                    };
                    this.post(a, (t,e,i)=>s(i))
                }
            ).catch(t=>this.logErr(t))
        }
        loaddata() {
            if (!this.isNode())
                return {};
            {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile)
                    , e = this.path.resolve(process.cwd(), this.dataFile)
                    , s = this.fs.existsSync(t)
                    , i = !s && this.fs.existsSync(e);
                if (!s && !i)
                    return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile)
                    , e = this.path.resolve(process.cwd(), this.dataFile)
                    , s = this.fs.existsSync(t)
                    , i = !s && this.fs.existsSync(e)
                    , r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t],
                void 0 === r)
                    return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
                e.slice(0, -1).reduce((t,s,i)=>Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s,
                t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [,s,i] = /^@(.*?)\.(.*?)$/.exec(t)
                    , r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [,i,r] = /^@(.*?)\.(.*?)$/.exec(e)
                    , o = this.getval(i)
                    , h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            } else
                s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(),
                this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(),
                this.data[e] = t,
                this.writedata(),
                !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"),
                this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
                this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
            t && (t.headers = t.headers ? t.headers : {},
            void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e=(()=>{}
        )) {
            t.headers && (delete t.headers["Content-Type"],
                delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {},
                    Object.assign(t.headers, {
                        "X-Surge-Skip-Scripting": !1
                    })),
                    $httpClient.get(t, (t,s,i)=>{
                            !t && s && (s.body = i,
                                s.statusCode = s.status),
                                e(t, s, i)
                        }
                    )) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {},
                    Object.assign(t.opts, {
                        hints: !1
                    })),
                    $task.fetch(t).then(t=>{
                            const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                            e(null, {
                                status: s,
                                statusCode: i,
                                headers: r,
                                body: o
                            }, o)
                        }
                        , t=>e(t))) : this.isNode() && (this.initGotEnv(t),
                    this.got(t).on("redirect", (t,e)=>{
                            try {
                                if (t.headers["set-cookie"]) {
                                    const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                                    s && this.ckjar.setCookieSync(s, null),
                                        e.cookieJar = this.ckjar
                                }
                            } catch (t) {
                                this.logErr(t)
                            }
                        }
                    ).then(t=>{
                            const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                            e(null, {
                                status: s,
                                statusCode: i,
                                headers: r,
                                body: o
                            }, o)
                        }
                        , t=>{
                            const {message: s, response: i} = t;
                            e(s, i, i && i.body)
                        }
                    ))
        }
        post(t, e=(()=>{}
        )) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"),
            t.headers && delete t.headers["Content-Length"],
            this.isSurge() || this.isLoon())
                this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {},
                    Object.assign(t.headers, {
                        "X-Surge-Skip-Scripting": !1
                    })),
                    $httpClient.post(t, (t,s,i)=>{
                            !t && s && (s.body = i,
                                s.statusCode = s.status),
                                e(t, s, i)
                        }
                    );
            else if (this.isQuanX())
                t.method = "POST",
                this.isNeedRewrite && (t.opts = t.opts || {},
                    Object.assign(t.opts, {
                        hints: !1
                    })),
                    $task.fetch(t).then(t=>{
                            const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                            e(null, {
                                status: s,
                                statusCode: i,
                                headers: r,
                                body: o
                            }, o)
                        }
                        , t=>e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t=>{
                        const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                        e(null, {
                            status: s,
                            statusCode: i,
                            headers: r,
                            body: o
                        }, o)
                    }
                    , t=>{
                        const {message: s, response: i} = t;
                        e(s, i, i && i.body)
                    }
                )
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        msg(e=t, s="", i="", r) {
            const o = t=>{
                    if (!t)
                        return t;
                    if ("string" == typeof t)
                        return this.isLoon() ? t : this.isQuanX() ? {
                            "open-url": t
                        } : this.isSurge() ? {
                            url: t
                        } : void 0;
                    if ("object" == typeof t) {
                        if (this.isLoon()) {
                            let e = t.openUrl || t.url || t["open-url"]
                                , s = t.mediaUrl || t["media-url"];
                            return {
                                openUrl: e,
                                mediaUrl: s
                            }
                        }
                        if (this.isQuanX()) {
                            let e = t["open-url"] || t.url || t.openUrl
                                , s = t["media-url"] || t.mediaUrl;
                            return {
                                "open-url": e,
                                "media-url": s
                            }
                        }
                        if (this.isSurge()) {
                            let e = t.url || t.openUrl || t["open-url"];
                            return {
                                url: e
                            }
                        }
                    }
                }
            ;
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))),
                !this.isMuteLog) {
                let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
                t.push(e),
                s && t.push(s),
                i && t.push(i),
                    console.log(t.join("\n")),
                    this.logs = this.logs.concat(t)
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e=>setTimeout(e, t))
        }
        done(t={}) {
            const e = (new Date).getTime()
                , s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),
                this.log(),
            (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }
    (t,e)
}
