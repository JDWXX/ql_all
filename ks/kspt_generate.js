/*
快手CK转换-ksjsbCookie转换ksCookie
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#快手CK转换-ksjsbCookie转换ksCookie
0 55 7 * * * https://github.com/JDWXX/jd_job/blob/master/ks/kspt_generate.js, tag=快手CK转换-ksjsbCookie转换ksCookie, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "0 55 7 * * *" script-path=https://github.com/JDWXX/jd_job/blob/master/ks/kspt_generate.js,tag=快手CK转换-ksjsbCookie转换ksCookie
===================================Surge================================
快手CK转换-ksjsbCookie转换ksCookie = type=cron,cronexp="0 55 7 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job/blob/master/ks/kspt_generate.js
====================================小火箭=============================
快手CK转换-ksjsbCookie转换ksCookie = type=cron,script-path=https://github.com/JDWXX/jd_job/blob/master/ks/kspt_generate.js, cronexpr="0 55 7 * * *", timeout=3600, enable=true
 */
const $ = new Env('快手CK转换-ksjsbCookie转换ksCookie');
let CookieJDs = [
    '',//账号一ck,例:kuaishou.api_st=xxxxx;
    '',//账号二ck,例:kuaishou.api_st=xxxxx;
]
// 判断环境变量里面是否有快手ck
if (process.env.ksjsbCookie) {
    if (process.env.ksjsbCookie.indexOf('@') > -1) {
        CookieJDs = process.env.ksjsbCookie.split('@');
    } else if (process.env.ksjsbCookie.indexOf('&') > -1) {
        CookieJDs = process.env.ksjsbCookie.split('&');
    } else if (process.env.ksjsbCookie.indexOf('\n') > -1) {
        CookieJDs = process.env.ksjsbCookie.split('\n');
    } else {
        CookieJDs = [process.env.ksjsbCookie];
    }
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个快手账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
let cookiesArr = CookieJDs, cookie = '', message;
let Cookiee = '';
for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
        Cookiee += cookiesArr[i] + "kpn=NEBULA; kpf=ANDROID_PHONE;did=ANDROID_915d04d3e08b51be;@";
    }
}
console.log("\n普通版快手配置\n")
console.log("\n环境变量添加维护：ksjsbCookie\n")
Cookiee = Cookiee.substring(0,Cookiee.length-1)
console.log("值：\n" + Cookiee)