/*
快手极速版-IP代理
抓包教程地址：http://cxgc.top/archives/ksjsb
IP代理：http://cxgc.top/archives/xiequdaili
欢迎填我邀请码：791642607
交流群：212796668、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#快手极速版-IP代理
20 1,8,12,17 * * * https://github.com/JDWXX/jd_all/blob/master/ks/ks_jsb_dl.js, tag=快手极速版-IP代理, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "20 1,8,12,17 * * * script-path=https://github.com/JDWXX/jd_all/blob/master/ks/ks_jsb_dl.js,tag=快手极速版-IP代理
===================================Surge================================
快手极速版-IP代理 = type=cron,cronexp="20 1,8,12,17 * * *,wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_all/blob/master/ks/ks_jsb_dl.js
====================================小火箭=============================
快手极速版-IP代理 = type=cron,script-path=https://github.com/JDWXX/jd_all/blob/master/ks/ks_jsb_dl.js, cronexpr="20 1,8,12,17 * * *, timeout=3600, enable=true
 */
const $ = new Env('快手极速版-IP代理');
let res,
    ksjsbCookie = $.isNode() ? (process.env.ksjsbCookie ? process.env.ksjsbCookie : "") : ($.getdata('ksjsbCookie') ? $.getdata('ksjsbCookie') : "")//快手ck
Users = [],
    ksjsbCash = process.env.ksjsbCash || '',
    ksjsbWithdrawTime = process.env.ksjsbWithdrawTime || 15,
    ksjsbAggressive = process.env.ksjsbAggressive || 0,
    ksjsbNotify = process.env.ksjsbNotify || 1,
    index = 0,
    count = 0,
    StageCount = 12,
    helpList = [];
const AdName = {
    ad1: { id: 0, name: '广告视频' },
    ad2: { id: 49, name: '广告视频' },
    box: { id: 77, name: '宝箱翻倍视频' },
    sign: { id: 136, name: '签到翻倍视频1' },
    unknown1: { id: 151, name: '未知视频' },
};
const taskIds = {
    ad: 49,
    live: 75,
    luckydraw: 161,
    gj: 217,
    invite: 2008,
};
const AdSign = {
    luckdrawNum_161: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fb03493544e59e2b2a726006e2852ec1040cd969d4748c460ecf574cc487214a91f70592aa8b2225630027c39ca2c544027efa65815d1acea23cb503034b12641c',
        businessId: 161,
        pageId: 11101,
        posId: 4683,
        subPageId: 100013628,
        name: '获取抽奖次数视频',
    },
    luckdrawVideo_161_213: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fbf89856abafca7f90fab063cf60935d6faedb05b76646dc3ece57cd4898d412d86e985a2b510216ad4853603d2992501cea0a08182731fcbf023467cf30ecda80',
        businessId: 161,
        pageId: 11101,
        posId: 4685,
        subPageId: 100013630,
        name: '抽奖视频161-213',
    },
    luckdrawVideo_161_100: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4',
        businessId: 161,
        pageId: 11101,
        posId: 4684,
        subPageId: 100013629,
        name: '抽奖视频161-100',
    },
    luckdrawVideo_11_213: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fbf89856abafca7f90fab063cf60935d6faedb05b76646dc3ece57cd4898d412d86e985a2b510216ad4853603d2992501cea0a08182731fcbf023467cf30ecda80',
        businessId: 11,
        pageId: 11101,
        posId: 4684,
        subPageId: 100013629,
        name: '抽奖视频11-100',
    },
    luckdrawVideo_11_100: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4',
        businessId: 11,
        pageId: 11101,
        posId: 4684,
        subPageId: 100013629,
        name: '抽奖视频11-100',
    },
    inviteVideo_2008: {
        extParams:
            '60869a9fd2ab63f5e0b1725d059da31f7d3ed3046658438ee204a153c3bc47189ccf268b22e603b6750780c9647e7a12b3027381e11da27b234311bccfd4a67bb892f889a4020ceae4f4e102cc50c327',
        businessId: 2008,
        pageId: 100012068,
        posId: 6766,
        subPageId: 100015089,
        name: '邀请页视频(实际是100金币)',
    },
    liveVideo_75: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092',
        businessId: 75,
        pageId: 100012068,
        posId: 6766,
        subPageId: 100015089,
        name: '直播任务',
    },
    signVideo_168: {
        extParams:
            '56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092',
        businessId: 168,
        pageId: 100012068,
        posId: 6766,
        subPageId: 100015089,
        name: '签到翻倍视频2',
    },
};


let curHours = new Date().getHours();
class ksUser {
    constructor(cookie) {
        let api_st = cookie.match(/(kuaishou.api_st=[\w\-]+)/)[1] + ';';

        this.index = ++index;
        this.cookie =
            'kpn=NEBULA; kpf=ANDROID_PHONE; did=ANDROID_' +
            randomString(16) +
            '; ver=9.10; appver=9.10.40.2474; language=zh-cn; countryCode=CN; sys=ANDROID_5.1; client_key=2ac2a76d; ' +
            api_st;
        this.name = this.index;
        this.valid = false;
        this.bindAlipay = false;
        this.alipay = '';
        this.bindWechat = false;
        this.wechat = '';
        this.needSms = false;
        this.hasLuckydraw = true;
        this.task = {
            49: { num: 2, needRun: true },
            75: { num: 1, needRun: true },
            161: { num: 5, needRun: true },
            217: { num: 1, needRun: true },
            2008: { num: 5, needRun: true },
        };
    }
    async getUserInfo() {
        let url =
            'https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo';
        let body = '';
        let options = getOptions(url, this.cookie, body);
        await doRequest('get', options);

        if (!res) {
            return;
        }
        if (res.result == 1) {
            this.valid = true;
            this.name = res.data.userData.nickname;
            this.cashBalance = res.data.totalCash;
            this.coinBalance = res.data.totalCoin;
            this.allCash = res.data.allCash;
            console.log(
                `账号[${this.name}]账户余额${this.cashBalance}元，${
                    this.coinBalance
                }金币，未审核余额${Math.floor(
                    parseFloat(this.allCash) - parseFloat(this.cashBalance)
                )}元`
            );
        } else {
            console.log(`账号[${this.name}]查询账户信息失败：${res.error_msg}`);
        }
    }
    async setShare() {
        let url =
            'https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare';
        let body = '';
        let options = getOptions(url, this.cookie, body);
        await doRequest('post', options);

        if (!res) {
            return;
        }
        if (res.result == 1) {
            console.log(`账号[${this.name}]准备分享得金币`);
            await $.wait(200);
            await this.taskReward(122);
        } else {
            console.log(`账号[${this.name}]分享失败：${res.error_msg}`);
        }
    }
    async taskReward(taskId) {
        let url = `https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=${taskId}`;
        let body = '';
        let options = getOptions(url, this.cookie, body);
        await doRequest('get', options);

        if (!res) {
            return;
        }
        if (res.result == 1) {
            console.log(
                `账号[${this.name}]完成任务[${taskId}]成功，获得${res.data.amount}金币`
            );
        } else {
            console.log(
                `账号[${this.name}]完成任务[${taskId}]失败：${res.error_msg}`
            );
        }
    }
    async getSignInfo() {
        let url = 'https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup';
        let body = '';
        let options = getOptions(url, this.cookie, body);
        await doRequest('get', options);
        await $.wait(1500);
        if (!res) {
            return;
        }
        if(!res.result || !res.data || !res.data.nebulaSignInPopup || !res.data.nebulaSignInPopup.todaySigned){
            if(xiequ == "True") {
                await superagent()
            }
            await doRequest('get', options);
            await $.wait(1500);
        }
        if (res.result == 1) {
            let todaySigned = res.data.nebulaSignInPopup.todaySigned;
            console.log(`账号[${this.name}]今天${todaySigned ? '已' : '未'}签到`);
            if (!todaySigned) {
                await $.wait(200);
                await this.doSign();
                await $.wait(200);
                await this.setShare();
            }
        } else {
            console.log(`账号[${this.name}]查询签到信息失败：${res.error_msg}`);
        }
    }
    async doSign() {
        let url =
            'https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity';
        let body = '';
        let options = getOptions(url, this.cookie, body);
        await doRequest('get', options);

        if (!res) {
            return;
        }
        if (res.result == 1) {
            console.log(`账号[${this.name}]签到成功：${res.data.toast}`);
            await $.wait(200);
            await this.ksAdParam(AdName.sign);
            await $.wait(200);
            await this.ksNeoAdParam(AdSign.signVideo_168);
        } else {
            console.log(`账号[${this.name}]签到失败：${res.error_msg}`);
        }
    }
    async taskList() {
        let url =
            'https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/tasks?addressBookAccessStatus=true&pushNotificationStatus=false';
        let body = '';
        let options = getOptions(url, this.cookie, body);
        await doRequest('get', options);
        await $.wait(1500);
        if (!res) {
            return;
        }

        if(!res.result || !res.data || !res.data.dailyTasks){
            if(xiequ == "True") {
                await superagent()
            }
            await doRequest('get', options);
            await $.wait(1500);
        }
        if (res.result == 1) {
            console.log(`账号[${this.name}]任务完成情况：`);
            for (let task of res.data.dailyTasks) {
                for (let taskId in taskIds) {
                    if (task.taskId == taskIds[taskId]) {
                        let completedStages = parseInt(task.completedStages),
                            stages = parseInt(task.stages),
                            num = Math.ceil(stages / StageCount),
                            needRun = completedStages < stages;
                        this.task[task.taskId] = {
                            num: num,
                            needRun: needRun,
                        };
                        console.log(
                            `【${task.name}】 ${completedStages}/${stages}，${
                                needRun ? '未完成' : '已完成'
                            }，每次运行完成${num}次任务`
                        );
                        continue;
                    }
                }
            }
        } else {
            console.log(`账号[${this.name}]查询任务列表失败：${res.error_msg}`);
        }
    }
    async ksgj() {
        let url = 'https://api.e.kuaishou.com/rest/r/reward/task/getActivityReward';
        let body = 'activityId=148&client_key=ksgjbody';
        let options = getOptions(url, this.cookie, body);
        await doRequest('post', options);

        if (!res) {
            return;
        }
        if (res.result == 1) {
            console.log(`账号[${this.name}]逛街获得${res.data.amount}金币`);
        } else {
            console.log(`账号[${this.name}]逛街失败：${res.error_msg}`);
        }
    }
    async ksAdParam(ad) {
        let url =
            'https://api.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA';
        let body =
            'encData=WlTuzeTU6mGT9525bjJUVnltdwoARHBjgjAw%2BtDz1mbw97x9ZHdJY0pKd7s5mx8%2BXMRRi7MCE3BSy1NNxI6bywhQueJl4YV8QDNsCONuMI7m59XX7rycrXz5ZPbObMBFLp23dqIF86Do53AbF3u4Dd2Vsk%2B1BzkhUIjucpA2gZ6g837f5Wz19RFfZ9m0pIuu8qg0EFbwOhyvbnybXJXFHahBNDH%2BfHB3V63CQuUJV6MSpBlFU6%2BDiPwORLmSR81ZkexYHIeTr2KW8%2Bu6Z6vIIgz5lkRBGfhfPc4QdkeGeYHBmJnsMwUIfjP3nvTSfiX3xr17R8CyeKnt6EeJEI1WztBIQyCFnJkMsniZlxdBeiUmCPptMR6ugr08p68B9g1oYzYHE6ahs08el783y%2Bc5I%2FQjUXdnBcdZ%2BJaDUN2KAV8dSgAg%2BvPxlW6DO%2FIqNGagmGL5AGWc4hX0YakMFamuVsSZ6vZFUO%2Fg8Q0Hux%2BZH34hK%2F2CLd%2Btx8hMl7eQk%2FjFWmsOm%2FP0wLunJaYHFRFzRafP4LYE5ku8Gzjq5oLOAWlX3ZVFnvHuv7gwdfbPelQiurVGMDgU6tg2z%2FlkYgFwuqU%2B4XTyvwNYgADP08Wv3IOxx0o3x4hTgBpfsPxtYvBL%2ByZqF4jbiTGVQx%2B6spcru82c%2B4XFqi4VVYI7jTk7%2Bp3liE%2BWtFRcbnNWfoCX8Au0JRmWFgXE2BrZ9wcxbR14b4WY7BHOagTlWJdJJy0%2B66EdpXSb53MbVkcmD4JvNAW6chJURPJXVEQOF%2BOYkJPXTntS6phEwOpYySzWThfS0hD0BnNAhbeR%2F5RJ1FcYQdQlfxDN9zKh6bk%3D&sign=5a54eecde4d4ea617a114612510f485b0a273d4e803c4bf7abc433602d5c0712';
        let options = getOptions(url, this.cookie, body);
        await doRequest('post', options);

        if (!res) {
            return;
        }
        if (res.result == 1) {
            if (
                res.impAdInfo &&
                res.impAdInfo.length > 0 &&
                res.impAdInfo[0].adInfo &&
                res.impAdInfo[0].adInfo.length > 0 &&
                res.impAdInfo[0].adInfo[0].adBaseInfo
            ) {
                await $.wait(200);
                await this.ksAdReward(
                    res.llsid,
                    res.impAdInfo[0].adInfo[0].adBaseInfo.creativeId,
                    ad
                );
            }
        } else {
            console.log(`账号[${this.name}]获取${ad.name}参数失败：${res.error_msg}`);
        }
    }

    async ksAdReward(_0x573177, _0x463190, _0x2b3321) {
        let _0x1031fe = new Date().getTime(),
            _0x43c0da = Math.floor(Math.random() * 30000) + 45000,
            _0x431123 = _0x1031fe - _0x43c0da,
            _0x59e30c = 'https://api.e.kuaishou.com/rest/r/ad/nebula/reward',
            _0x2615ac =
                'bizStr={"endTime":' +
                _0x1031fe +
                ',"eventValue":-1,"rewardList":[{"creativeId":' +
                _0x463190 +
                ',"extInfo":"","llsid":' +
                _0x573177 +
                ',"taskType":1}],"startTime":' +
                _0x431123 +
                ',"taskId":' +
                _0x2b3321.id +
                '}',
            _0x1090a7 = getOptions(_0x59e30c, this.cookie, _0x2615ac);

        await doRequest('post', _0x1090a7);

        let _0x7fdef7 = res;

        if (!_0x7fdef7) {
            return;
        }

        _0x7fdef7.result == 1
            ? console.log(
            '账号[' +
            this.name +
            ']看' +
            _0x2b3321.name +
            '获得' +
            _0x7fdef7.data.awardAmount +
            '金币'
            )
            : console.log(
            '账号[' +
            this.name +
            ']看' +
            _0x2b3321.name +
            '失败：' +
            _0x7fdef7.error_msg
            );
    }

    async openBox(_0x412555) {
        let _0x513362 =
            'https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=' +
            _0x412555 +
            '&isReadyOfAdPlay=true',
            _0x3ef8d9 = '',
            _0x48334f = getOptions(_0x513362, this.cookie, _0x3ef8d9);

        await doRequest('get', _0x48334f);

        let _0x15220b = res;

        if (!_0x15220b) {
            return;
        }

        _0x15220b.result == 1
            ? _0x412555 == true
            ? _0x15220b.data.commonAwardPopup &&
            _0x15220b.data.commonAwardPopup.awardAmount
                ? (console.log(
                    '账号[' +
                    this.name +
                    ']开宝箱获得' +
                    _0x15220b.data.commonAwardPopup.awardAmount +
                    '金币'
                ),
                    await $.wait(200),
                    await this.ksAdParam(AdName.box))
                : console.log('账号[' + this.name + ']开宝箱没有获得金币')
            : _0x15220b.data.openTime > -1
                ? (console.log(
                    '账号[' +
                    this.name +
                    ']开宝箱冷却时间还有' +
                    Math.floor(_0x15220b.data.openTime / 1000) +
                    '秒'
                ),
                _0x15220b.data.openTime == 0 &&
                (await $.wait(200), await this.openBox(true)))
                : console.log('账号[' + this.name + ']开宝箱次数已用完')
            : _0x412555 == true
            ? console.log('账号[' + this.name + ']开宝箱失败：' + _0x15220b.error_msg)
            : console.log(
                '账号[' + this.name + ']查询宝箱状态失败：' + _0x15220b.error_msg
            );
    }

    async withdraw(_0x543a47) {
        if (!this.bindAlipay && !this.bindWechat) {
            console.log('账号[' + this.name + ']未绑定提现账号，不执行提现');

            return;
        }

        let _0x11aa57 = parseInt(_0x543a47 * 100),
            _0x551907 = this.bindAlipay ? 'ALIPAY' : 'WECHAT',
            _0x4281dd = _0x551907 == 'ALIPAY' ? '支付宝' : '微信',
            _0x45b85a = _0x551907 == 'ALIPAY' ? this.alipay : this.wechat,
            _0x5540cb = 'https://www.kuaishoupay.com/pay/account/h5/withdraw/apply',
            _0x36e14a =
                'account_group_key=NEBULA_CASH_ACCOUNT&mobile_code=&fen=' +
                _0x11aa57 +
                '&provider=' +
                _0x551907 +
                '&total_fen=' +
                _0x11aa57 +
                '&commission_fen=0&third_account=' +
                _0x551907 +
                '&attach=&biz_content=&session_id=',
            _0x2afd84 = getOptions(_0x5540cb, this.cookie, _0x36e14a);

        await doRequest('post', _0x2afd84);

        let _0x550f3b = res;

        if (!_0x550f3b) {
            return;
        }

        _0x550f3b.result == 'SUCCESS'
            ? console.log(
            '账号' +
            this.index +
            '[' +
            this.name +
            ']提现' +
            _0x543a47 +
            '元到' +
            _0x4281dd +
            '[' +
            _0x45b85a +
            ']成功'
            )
            : console.log(
            '账号' +
            this.index +
            '[' +
            this.name +
            ']提现' +
            _0x543a47 +
            '元到' +
            _0x4281dd +
            '[' +
            _0x45b85a +
            ']失败：' +
            _0x550f3b.msg
            );
    }

    async withdrawOverview() {
        let _0x2236be =
                'https://nebula.kuaishou.com/rest/n/nebula/outside/withdraw/overview?appver=10.2.20.2021',
            _0x564ca9 = '',
            _0x418fbc = getOptions(_0x2236be, this.cookie, _0x564ca9);

        await doRequest('get', _0x418fbc);

        let _0x2edb23 = res;

        if (!_0x2edb23) {
            return;
        }

        if (_0x2edb23.result == 1) {
            if (_0x2edb23.data.isLimit == true) {
                console.log('账号[' + this.name + ']今天已提现');
                return;
            }

            let _0x57539e = parseFloat(this.cashBalance);

            if (ksjsbAggressive == 1) {
                if (_0x57539e < 0.3) {
                    console.log('账号[' + this.name + ']余额不足0.3元，不提现');
                } else {
                    let _0xc81e7b = Math.floor(_0x57539e * 10) / 10;

                    _0xc81e7b = _0xc81e7b > 50 ? 50 : _0xc81e7b;

                    console.log(
                        '账号[' + this.name + ']准备最大化提现' + _0xc81e7b + '元'
                    );

                    await $.wait(200);
                    await this.withdraw(_0xc81e7b);
                }
            } else {
                if (!ksjsbCash) {
                    for (let _0x5da979 of _0x2edb23.data.enWithdrawList.sort(function (
                        _0x5357e2,
                        _0xc5d50f
                    ) {
                        return _0xc5d50f - _0x5357e2;
                    })) {
                        if (_0x57539e >= parseFloat(_0x5da979)) {
                            console.log('账号[' + this.name + ']准备提现' + _0x5da979 + '元');

                            await $.wait(200);
                            await this.withdraw(_0x5da979);
                            return;
                        }
                    }

                    console.log(
                        '账号[' +
                        this.name +
                        ']余额不足，可提现额度：' +
                        _0x2edb23.data.enWithdrawList.join(',')
                    );
                } else {
                    _0x57539e >= parseFloat(ksjsbCash)
                        ? (console.log(
                        '账号[' + this.name + ']准备提现' + ksjsbCash + '元'
                        ),
                            await $.wait(200),
                            await this.withdraw(ksjsbCash))
                        : console.log(
                        '账号[' + this.name + ']余额不足' + ksjsbCash + '元，不提现'
                        );
                }
            }
        } else {
            console.log(
                '账号[' + this.name + ']查询提现列表失败：' + _0x2edb23.error_msg
            );
        }
    }

    async accountOverview() {
        let _0x512fe7 =
                'https://nebula.kuaishou.com/rest/n/nebula/account/overview',
            _0x251847 = '',
            _0x39f16d = getOptions(_0x512fe7, this.cookie, _0x251847);

        await doRequest('get', _0x39f16d);

        let _0xa69994 = res;

        if (!_0xa69994) {
            return;
        }

        if (_0xa69994.result == 1) {
            this.coinBalance = _0xa69994.data.coinBalance;
            this.cashBalance = _0xa69994.data.cashBalance;
            let _0x54aac5 = _0xa69994.data.exchangeCoinState;

            console.log(
                '账号[' +
                this.name +
                ']账户余额' +
                this.cashBalance +
                '元，' +
                this.coinBalance +
                '金币'
            );

            _0x54aac5 == 2 && (await $.wait(200), await this.changeExchangeType(0));
        } else {
            console.log(
                '账号[' + this.name + ']查询账户信息失败：' + _0xa69994.error_msg
            );
        }
    }

    async changeExchangeType(_0x1bd22f) {
        let _0x4e7ea7 =
                'https://nebula.kuaishou.com/rest/n/nebula/exchange/changeExchangeType',
            _0x6250c8 = '{"type":' + _0x1bd22f + '}',
            _0x2c1c9f = getOptions(_0x4e7ea7, this.cookie, _0x6250c8);

        _0x2c1c9f.headers['Content-Type'] = 'application/json';
        await doRequest('post', _0x2c1c9f);

        let _0x4df55c = res;

        if (!_0x4df55c) {
            return;
        }

        let _0x1fdd87 = _0x1bd22f == 0 ? '自动兑换' : '手动兑换';

        _0x4df55c.result == 1
            ? console.log(
            '账号[' +
            this.name +
            ']兑换方式更改成功，目前兑换方式为：' +
            _0x1fdd87
            )
            : console.log(
            '账号[' + this.name + ']兑换方式更改失败：' + _0x4df55c.error_msg
            );
    }

    async exchangeCoin() {
        if (this.coinBalance < 100) {
            console.log('账号[' + this.name + ']金币余额不足100，不执行兑换');
            return;
        }

        let _0x54ee74 =
                'https://nebula.kuaishou.com/rest/n/nebula/exchange/coinToCash/submit',
            _0x365938 =
                '{"coinAmount":' +
                this.coinBalance +
                ',"token":"rE2zK-Cmc82uOzxMJW7LI2-wTGcKMqqAHE0PhfN0U4bJY4cAM5Inxw"}',
            _0x4650af = getOptions(_0x54ee74, this.cookie, _0x365938);

        _0x4650af.headers['Content-Type'] = 'application/json';
        await doRequest('post', _0x4650af);

        let _0x2ae7ad = res;

        if (!_0x2ae7ad) {
            return;
        }

        if (_0x2ae7ad.result == 1) {
            let _0x1e5bfa = Math.floor(this.coinBalance / 100) * 100,
                _0xd2629a = Math.floor(this.coinBalance / 100) / 100;

            console.log(
                '账号[' +
                this.name +
                ']兑换金币成功，将' +
                _0x1e5bfa +
                '金币兑换成' +
                _0xd2629a +
                '元'
            );
        } else {
            console.log(
                '账号[' + this.name + ']兑换金币失败：' + _0x2ae7ad.error_msg
            );
        }
    }

    async ksNeoAdParam(_0x3356fd) {
        let _0x35bd12 =
                'https://api.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA',
            _0x5f768f =
                'encData=WlTuzeTU6mGT9525bjJUVnltdwoARHBjgjAw%2BtDz1mbw97x9ZHdJY0pKd7s5mx8%2BXMRRi7MCE3BSy1NNxI6bywhQueJl4YV8QDNsCONuMI7m59XX7rycrXz5ZPbObMBFLp23dqIF86Do53AbF3u4Dd2Vsk%2B1BzkhUIjucpA2gZ6g837f5Wz19RFfZ9m0pIuu8qg0EFbwOhyvbnybXJXFHahBNDH%2BfHB3V63CQuUJV6MSpBlFU6%2BDiPwORLmSR81ZkexYHIeTr2KW8%2Bu6Z6vIIgz5lkRBGfhfPc4QdkeGeYHBmJnsMwUIfjP3nvTSfiX3xr17R8CyeKnt6EeJEI1WztBIQyCFnJkMsniZlxdBeiUmCPptMR6ugr08p68B9g1oYzYHE6ahs08el783y%2Bc5I%2FQjUXdnBcdZ%2BJaDUN2KAV8dSgAg%2BvPxlW6DO%2FIqNGagmGL5AGWc4hX0YakMFamuVsSZ6vZFUO%2Fg8Q0Hux%2BZH34hK%2F2CLd%2Btx8hMl7eQk%2FjFWmsOm%2FP0wLunJaYHFRFzRafP4LYE5ku8Gzjq5oLOAWlX3ZVFnvHuv7gwdfbPelQiurVGMDgU6tg2z%2FlkYgFwuqU%2B4XTyvwNYgADP08Wv3IOxx0o3x4hTgBpfsPxtYvBL%2ByZqF4jbiTGVQx%2B6spcru82c%2B4XFqi4VVYI7jTk7%2Bp3liE%2BWtFRcbnNWfoCX8Au0JRmWFgXE2BrZ9wcxbR14b4WY7BHOagTlWJdJJy0%2B66EdpXSb53MbVkcmD4JvNAW6chJURPJXVEQOF%2BOYkJPXTntS6phEwOpYySzWThfS0hD0BnNAhbeR%2F5RJ1FcYQdQlfxDN9zKh6bk%3D&sign=5a54eecde4d4ea617a114612510f485b0a273d4e803c4bf7abc433602d5c0712',
            _0x110b63 = getOptions(_0x35bd12, this.cookie, _0x5f768f);

        await doRequestDL('post', _0x110b63);
        // await doRequest('post', _0x110b63);
        await $.wait(3000);
        let _0x3db794 = res;

        if (!_0x3db794) {
            return;
        }

        _0x3db794.result == 1
            ? _0x3db794.impAdInfo &&
            _0x3db794.impAdInfo.length > 0 &&
            _0x3db794.impAdInfo[0].adInfo &&
            _0x3db794.impAdInfo[0].adInfo.length > 0 &&
            _0x3db794.impAdInfo[0].adInfo[0].adBaseInfo &&
            (await $.wait(200),
                await this.ksNeoAdReward(
                    _0x3db794.llsid,
                    _0x3db794.impAdInfo[0].adInfo[0].adBaseInfo.creativeId,
                    _0x3356fd
                ))
            : console.log(
            '账号[' +
            this.name +
            ']获取' +
            _0x3356fd.name +
            '参数失败：' +
            _0x3db794.error_msg
            );
    }

    async ksNeoAdReward(_0x3266aa, _0x371a4c, _0x3b68fe) {
        let _0x3f784e = new Date().getTime(),
            _0x1b95dd = Math.floor(Math.random() * 30000) + 45000,
            _0x4c41ee = _0x3f784e - _0x1b95dd,
            _0x3a97f5 = 'https://api2.e.kuaishou.com/rest/r/ad/task/report',
            _0x1cf324 =
                'bizStr={"businessId":' +
                _0x3b68fe.businessId +
                ',"endTime":' +
                _0x3f784e +
                ',"extParams":"' +
                _0x3b68fe.extParams +
                '","mediaScene":"video","neoInfos":[{"creativeId":' +
                _0x371a4c +
                ',"extInfo":"","llsid":' +
                _0x3266aa +
                ',"taskType":1}],"pageId":' +
                _0x3b68fe.pageId +
                ',"posId":' +
                _0x3b68fe.posId +
                ',"startTime":' +
                _0x4c41ee +
                ',"subPageId":' +
                _0x3b68fe.subPageId +
                '}',
            _0x134708 = getOptions(_0x3a97f5, this.cookie, _0x1cf324);

        await doRequest('post', _0x134708);
        let _0x598f87 = res;

        if(!_0x598f87.data.neoToH5Data || !_0x598f87.data.neoAmount){
            await doRequest('post', _0x134708);
            _0x598f87 = res;
        }
        if (!_0x598f87) {
            return;
        }

        if (_0x598f87.result == 1) {
            let _0x357de8 = _0x598f87.data.neoAmount + '金币';

            if (_0x598f87.data.neoToH5Data) {
                try {
                    let _0x3f61ec = JSON.parse(
                        Base64.decode(_0x598f87.data.neoToH5Data).replace(/\0/g, '')
                    );

                    if (_0x3f61ec.extraCoin) {
                        _0x357de8 += '+' + _0x3f61ec.extraCoin + '金币';
                    }
                } catch (_0x2045ba) {
                    console.log(_0x598f87.data.neoToH5Data);
                } finally {
                }
            }

            console.log(
                '账号[' + this.name + ']看' + _0x3b68fe.name + '获得' + _0x357de8
            );

            if (this.hasLuckydraw) {
                await this.luckdrawTasks();
            }
        } else {
            console.log(
                '账号[' +
                this.name +
                ']看' +
                _0x3b68fe.name +
                '失败：' +
                _0x598f87.error_msg
            );
        }
    }

    async luckdrawInfo() {
        let _0x2fda4d = 'https://activity.e.kuaishou.com/rest/r/game/user/info',
            _0x59d2d4 = '',
            _0x50c63f = getOptions(_0x2fda4d, this.cookie, _0x59d2d4);

        await doRequest('get', _0x50c63f);
        await $.wait(1500);
        let _0x1d97ad = res;
        if(!_0x1d97ad.data.userDiamondResult || !_0x1d97ad.data.userDiamondResult.diamondPercent || !_0x1d97ad.data.userDailyLotteryTimesResult.remainTimes){
            await doRequest('get', _0x50c63f);
            await $.wait(1500);
            _0x1d97ad = res;
        }
        if (!_0x1d97ad) {
            return;
        }

        if (_0x1d97ad.result == 1) {
            console.log(
                '账号[' +
                this.name +
                ']现有' +
                _0x1d97ad.data.userDiamondResult.diamondPercent +
                '钻石，剩余抽奖次数：' +
                _0x1d97ad.data.userDailyLotteryTimesResult.remainTimes
            );

            for (
                let _0x5387e7 = 0;
                _0x5387e7 < _0x1d97ad.data.userDailyLotteryTimesResult.remainTimes;
                _0x5387e7++
            ) {
                await $.wait(200);
                await this.luckydraw();
            }
        } else {
            console.log(
                '账号[' + this.name + ']查询抽奖次数失败：' + _0x1d97ad.error_msg
            );
        }
    }

    async luckydraw() {
        let _0x5aeb3b =
                'https://activity.e.kuaishou.com/rest/r/game/lottery?wheelVersion=1',
            _0x16fa83 = '',
            _0x5b3172 = getOptions(_0x5aeb3b, this.cookie, _0x16fa83);

        await doRequest('post', _0x5b3172);

        let _0x5099f1 = res;

        if (!_0x5099f1) {
            return;
        }

        if (_0x5099f1.result == 1) {
            let _0x355997 = _0x5099f1.data.coinCount
                ? _0x5099f1.data.coinCount + '金币'
                : _0x5099f1.data.diamondCount
                    ? _0x5099f1.data.diamondCount + '钻石'
                    : '空气';

            console.log('账号[' + this.name + ']抽奖获得' + _0x355997);

            if (_0x5099f1.data.videoCoinCount) {
                console.log('额外奖励：' + _0x5099f1.data.videoCoinCount);
            }

            if (_0x5099f1.data.schema) {
                try {
                    console.log(Base64.decode(_0x5099f1.data.schema));
                } catch (_0x2cd9ad) {
                    console.log(_0x5099f1.data.schema);
                } finally {
                }
            }

            if (this.hasLuckydraw) {
                await this.luckdrawTasks();
            }
        } else {
            console.log('账号[' + this.name + ']抽奖失败：' + _0x5099f1.error_msg);
        }
    }

    async luckydrawSign() {
        let _0x19e391 = 'https://activity.e.kuaishou.com/rest/r/game/sign-in',
            _0x364621 = '',
            _0x17553a = getOptions(_0x19e391, this.cookie, _0x364621);

        await doRequest('get', _0x17553a);

        let _0x3dc187 = res;

        if (!_0x3dc187) {
            return;
        }

        _0x3dc187.result == 1
            ? _0x3dc187.data.isShow &&
            console.log('账号[' + this.name + ']抽奖页签到成功')
            : (console.log(
            '账号[' + this.name + ']查询抽奖签到情况失败：' + _0x3dc187.error_msg
            ),
            _0x3dc187.error_msg.indexOf('激励游戏未在运营') > -1 &&
            (this.hasLuckydraw = false));
    }

    async luckdrawTimerInfo() {
        let _0x41f4dd =
                'https://activity.e.kuaishou.com/rest/r/game/timer-reward/info',
            _0x57d99c = '',
            _0x188ea7 = getOptions(_0x41f4dd, this.cookie, _0x57d99c);

        await doRequest('get', _0x188ea7);

        let _0x9de9b6 = res;

        if (!_0x9de9b6) {
            return;
        }

        if (_0x9de9b6.result == 1) {
            if (_0x9de9b6.data) {
                let _0x53217e = new Date().getTime(),
                    _0x2d8627 = _0x9de9b6.data.lastTimerTime,
                    _0x42feaa = _0x9de9b6.data.minutesInterval * 60 * 1000,
                    _0x25bdde = _0x2d8627 + _0x42feaa;

                _0x53217e < _0x25bdde
                    ? console.log(
                    '账号[' +
                    this.name +
                    ']抽奖页奖励冷却时间还有' +
                    (_0x25bdde - _0x53217e) / 1000 +
                    '秒'
                    )
                    : (await $.wait(200),
                        await this.luckdrawTimerReward(_0x9de9b6.data.goldNum));
            } else {
                console.log('账号[' + this.name + ']抽奖页定时奖励次数已用完');
            }
        } else {
            console.log(
                '账号[' +
                this.name +
                ']查询抽奖页定时奖励情况失败：' +
                _0x9de9b6.error_msg
            );
        }
    }

    async luckdrawTimerReward(_0x571114) {
        let _0xeaee4 = 'https://activity.e.kuaishou.com/rest/r/game/timer-reward',
            _0x4f1a45 = '',
            _0x44f25f = getOptions(_0xeaee4, this.cookie, _0x4f1a45);

        await doRequest('post', _0x44f25f);

        let _0x3a934e = res;

        if (!_0x3a934e) {
            return;
        }

        _0x3a934e.result == 1
            ? console.log(
            '账号[' + this.name + ']领取抽奖页定时奖励获得' + _0x571114 + '金币'
            )
            : console.log(
            '账号[' +
            this.name +
            ']领取抽奖页定时奖励失败：' +
            _0x3a934e.error_msg
            );
    }

    async luckdrawTasks() {
        let _0x464ad5 = 'https://activity.e.kuaishou.com/rest/r/game/tasks',
            _0x2bfcad = '',
            _0x15101f = getOptions(_0x464ad5, this.cookie, _0x2bfcad);

        await doRequest('get', _0x15101f);
        await $.wait(3000);
        let _0x4e8b19 = res;

        if (!_0x4e8b19) {
            return;
        }
        if(!_0x4e8b19.data.growthTasks || !_0x4e8b19.data.dailyTasks){
            await doRequest('get', _0x15101f);
            await $.wait(3000);
            let _0x4e8b19 = res;
        }

        if (_0x4e8b19.result == 1) {
            for (let _0x2e65d8 of _0x4e8b19.data.dailyTasks) {
                // _0x2e65d8.taskState == 1 &&
                //   (await $.wait(200), await this.luckdrawTasksReward(_0x2e65d8));
            }

            for (let _0x4e5c51 of _0x4e8b19.data.growthTasks) {
                // _0x4e5c51.taskState == 1 &&
                //   (await $.wait(200), await this.luckdrawTasksReward(_0x4e5c51));
            }
        } else {
            console.log(
                '账号[' + this.name + ']查询抽奖页任务失败：' + _0x4e8b19.error_msg
            );
        }
    }

    async luckdrawTasksReward(_0x548292) {
        let _0x452703 =
            'https://activity.e.kuaishou.com/rest/r/game/task/reward-receive?taskName=' +
            _0x548292.taskName,
            _0x4038c0 = '',
            _0x2242b2 = getOptions(_0x452703, this.cookie, _0x4038c0);

        await doRequest('get', _0x2242b2);

        let _0x3417ed = res;

        if (!_0x3417ed) {
            return;
        }

        _0x3417ed.result == 1
            ? console.log(
            '账号[' +
            this.name +
            ']领取抽奖任务[' +
            _0x548292.taskTitle +
            ']奖励获得' +
            _0x3417ed.data.popUp.taskRewardName
            )
            : console.log(
            '账号[' +
            this.name +
            ']领取抽奖任务[' +
            _0x548292.taskTitle +
            ']奖励失败：' +
            _0x3417ed.error_msg
            );
    }

    async getUserid() {
        let _0x579d90 =
                'https://nebula.kuaishou.com/rest/n/nebula/activity/invitation/relationLink?version=1.2.0',
            _0xb20aec = '',
            _0x5a5910 = getOptions(_0x579d90, this.cookie, _0xb20aec);

        await doRequest('get', _0x5a5910);

        let _0x450eae = res;

        if (!_0x450eae) {
            return;
        }

        _0x450eae.result == 1
            ? (this.userId = _0x450eae.data.userId)
            : console.log(
            '账号[' + this.name + ']获取userId失败：' + _0x450eae.error_msg
            );
    }

    async getInviteParam() {
        let _0x2b31d9 =
                'https://nebula.kuaishou.com/rest/n/nebula/qrcode?version=1.2.0',
            _0x46a7aa = '',
            _0x3dcfad = getOptions(_0x2b31d9, this.cookie, _0x46a7aa);

        await doRequest('get', _0x3dcfad);

        let _0x399079 = res;

        if (!_0x399079) {
            return;
        }

        if (_0x399079.result == 1) {
            let _0x55ca9d = _0x399079.data.code,
                _0x14bba2 = _0x399079.data.backFlowPopupConfig,
                _0x502092 = _0x399079.data.siteUrl;

            if (
                !_0x55ca9d ||
                !_0x502092 ||
                !_0x14bba2.picUrl ||
                !_0x14bba2.actionText ||
                !_0x14bba2.userName ||
                !_0x14bba2.userHead ||
                !_0x14bba2.title
            ) {
                console.log('账号[' + this.name + ']获取邀请参数失败');
                return;
            }

            await $.wait(200);
            await this.getInviteCode(_0x55ca9d, _0x14bba2, _0x502092);
        } else {
            console.log(
                '账号[' + this.name + ']获取邀请参数失败：' + _0x399079.error_msg
            );
        }
    }

    async getInviteCode(_0x5f2c5a, _0x2cbcab, _0x71c334) {
        let _0x492855 =
                'https://nebula.kuaishou.com/rest/zt/share/w/any?kpn=NEBULA&subBiz=INVITE_CODE&kpf=ANDROID_PHONE_H5&version=1.2.0',
            _0x417abc =
                '{"shareObjectId":"' +
                _0x5f2c5a +
                '","shareChannel":"WECHAT","shareMethod":"PICTURE","sdkVersion":"1.1.0.0","extTokenStoreParams":{"picUrl":"' +
                _0x2cbcab.picUrl +
                '","actionText":"' +
                _0x2cbcab.actionText +
                '","nickname":"' +
                _0x2cbcab.userName +
                '","avatar":"' +
                _0x2cbcab.userHead +
                '","title":"' +
                _0x2cbcab.title +
                '","platform":"qrcode","InvitationCode":"' +
                _0x5f2c5a +
                '","bizUrl":"' +
                _0x71c334 +
                '&ccFrom=f2f","resourceTag":"NORMAL_USER"}}',
            _0x11498a = getOptions(_0x492855, this.cookie, _0x417abc);

        _0x11498a.headers['Content-Type'] = 'application/json;charset=UTF-8';
        await doRequest('post', _0x11498a);

        let _0x1d1e86 = res;

        if (!_0x1d1e86) {
            return;
        }

        if (_0x1d1e86.result == 1) {
            this.shareToken =
                _0x1d1e86.share.shareObject.shareUrl.match(/\/(\w+)$/)[1];
            let _0x18c839 = true;

            for (let _0x146a68 of helpList) {
                if (_0x146a68.indexOf(this.userId) > -1) {
                    _0x18c839 = false;
                    break;
                }
            }

            if (_0x18c839) {
                helpList.push(this.userId + '&' + this.shareToken);
            }
        } else {
            console.log(
                '账号[' + this.name + ']获取邀请码失败：' + _0x1d1e86.error_msg
            );
        }
    }

    async helpInvite(code) {
        let [fid, shareToken] = code.split('&');
        let url = 'https://nebula.kuaishou.com/rest/n/nebula/qrcode?version=1.2.0';
        let body = '';
        let options = getOptions(url, this.cookie, body);
        options.headers.Referer = `https://nebula.kuaishou.com/fission/face-qrcode?fid=${fid}&shareToken=${shareToken}&source=qrcode`;
        await doRequest('get', options);

        if (!res) {
            return;
        }
        if (res.result != 1) {
            console.log(`账号[${this.name}]邀请失败：${res.error_msg}`);
        }
    }

    async helpScan(_0x113f42) {
        let _0x2a16c0 = _0x113f42.split('&'),
            _0x32df07 = _0x2a16c0[0],
            _0x5d1fe4 = _0x2a16c0[1];

        if (_0x32df07 == this.userId) {
            return;
        }

        let _0x5cb6ed = 'https://api.kuaishouzt.com/rest/zt/share/show/any',
            _0x1e3729 =
                'theme=light&sdkVersion=1.14.0.4&kpf=ANDROID_PHONE&shareMessage=https%3A%2F%2Fnicdd.get666bjrqu985xvp14v.com%2Ff%2F' +
                _0x5d1fe4 +
                '%3FlayoutType%3D4&kpn=NEBULA&launchState=hotLaunch&sessionId=ac165e40-48bd-42de-9fc5-b250d7eb983c&extTransientParams=%7B%22source%22%3A%22userScanCamera%22%7D',
            _0x147092 = getOptions(_0x5cb6ed, this.cookie, _0x1e3729);

        await doRequest('post', _0x147092);

        let _0x5649a8 = res;

        if (!_0x5649a8) {
            return;
        }

        _0x5649a8.result == 1
            ? (await $.wait(100), await this.helpInvite(_0x113f42))
            : console.log(
            '账号[' +
            this.name +
            ']模拟邀请二维码扫描失败：' +
            _0x5649a8.error_msg
            );
    }

    async bindInfo() {
        let _0x328bd6 =
                'https://www.kuaishoupay.com/pay/account/h5/provider/bind_info',
            _0x2f2b1b = 'account_group_key=NEBULA_CASH_ACCOUNT&bind_page_type=3',
            _0x32746d = getOptions(_0x328bd6, this.cookie, _0x2f2b1b);

        await doRequest('post', _0x32746d);

        let _0x4d5493 = res;

        if (!_0x4d5493) {
            return;
        }

        if (_0x4d5493.result == 'SUCCESS') {
            let _0x4015b0 = '未绑定支付宝',
                _0x3840b8 = '未绑定微信';
            _0x4d5493.alipay_bind == true &&
            ((this.bindAlipay = true),
                (this.alipay = _0x4d5493.alipay_nick_name),
                (_0x4015b0 = '已绑定支付宝[' + _0x4d5493.alipay_nick_name + ']'));
            _0x4d5493.wechat_bind == true &&
            ((this.bindWechat = true),
                (this.wechat = _0x4d5493.wechat_nick_name),
                (_0x3840b8 = '已绑定微信[' + _0x4d5493.wechat_nick_name + ']'));
            console.log('账号[' + this.name + ']' + _0x3840b8 + '，' + _0x4015b0);
        } else {
            console.log(
                '账号[' +
                this.name +
                ']查询提现账号绑定情况失败：' +
                _0x4d5493.error_msg
            );
        }
    }

    async accountInfo() {
        let _0x308f69 =
                'https://www.kuaishoupay.com/pay/account/h5/withdraw/account_info',
            _0xfe05d = 'account_group_key=NEBULA_CASH_ACCOUNT&providers=',
            _0x52286e = getOptions(_0x308f69, this.cookie, _0xfe05d);

        await doRequest('post', _0x52286e);

        let _0x25e462 = res;

        if (!_0x25e462) {
            return;
        }

        _0x25e462.result == 'SUCCESS'
            ? (this.needSms = _0x25e462.need_mobile_code)
            : console.log(
            '账号[' + this.name + ']查询账号提现情况失败：' + _0x25e462.error_msg
            );
    }
}
!(async () => {
    if (!(await formatCookie())) {
        return;
    }

    console.log('\n============== 登录 ==============');
    for (let user of Users) {
        await user.getUserInfo();
        await $.wait(500);
    }
    let CurrentUser = Users.filter((u) => u.valid == true);
    if (CurrentUser.length == 0) {
        return;
    }
    for (let u of CurrentUser) {
        console.log('\n=========== ' + u.name + ' ===========');
        await u.getSignInfo();
        await $.wait(200);
        await u.openBox(false);
        await $.wait(200);
        await u.taskList();
        await $.wait(200);
        await u.luckydrawSign();
        await $.wait(200);
        if (u.hasLuckydraw == true) {
            await u.luckdrawTimerInfo();
            await $.wait(200);
            await u.luckdrawTasks();
            await $.wait(200);
            await u.luckdrawInfo();
            await $.wait(200);
        }
        if (u.task[taskIds.luckydraw].needRun) {
            if(xiequ == "True") {
                await superagent()
            }
            for (let i = 0; i < u.task[taskIds.luckydraw].num; i++) {
                if (curHours < 13) {
                    await u.ksNeoAdParam(AdSign.luckdrawVideo_161_213);
                    await $.wait(200);
                    await u.ksNeoAdParam(AdSign.luckdrawVideo_11_213);
                    await $.wait(200);
                } else {
                    await u.ksNeoAdParam(AdSign.luckdrawVideo_161_100);
                    await $.wait(200);
                    await u.ksNeoAdParam(AdSign.luckdrawVideo_11_100);
                    await $.wait(200);
                }
            }
        }
        if (u.task[taskIds.ad].needRun) {
            for (let i = 0; i < u.task[taskIds.ad].num; i++) {
                await u.ksAdParam(AdName.ad1);
                await $.wait(200);
                if (i != u.task[taskIds.ad].num - 1) {

                }
            }
        }
        if (u.task[taskIds.gj].needRun) {
            for (let i = 0; i < u.task[taskIds.gj].num; i++) {
                await u.ksgj();
                await $.wait(200);
            }
        }
        if (u.task[taskIds.live].needRun) {
            for (let i = 0; i < u.task[taskIds.live].num; i++) {
                await u.ksNeoAdParam(AdSign.liveVideo_75);
                await $.wait(200);
            }
        }
        if (u.task[taskIds.invite].needRun) {
            for (let i = 0; i < u.task[taskIds.invite].num; i++) {
                await u.ksNeoAdParam(AdSign.inviteVideo_2008);
                await $.wait(200);
            }
        }
    }
    console.log('\n============== 账户情况 ==============');
    for (let u of CurrentUser) {
        await u.accountOverview();
        await $.wait(200);
        await u.bindInfo();
        await $.wait(200);
        await u.accountInfo();
        await $.wait(200);
    }
    console.log('\n============== 自动提现 ==============');
    let tips = '按提现列表自动提现';
    if (ksjsbCash) {
        tips = `自动提现${ksjsbCash}元`;
    }
    if (ksjsbAggressive) {
        tips = '最大化提现';
    }
    if (curHours == ksjsbWithdrawTime) {
        console.log(`提现时间，现在设置为${tips}`);
        for (let u of CurrentUser) {
            await u.withdrawOverview();
            await $.wait(200);
        }
    } else {
        console.log(`非提现时间，现在设置为${ksjsbWithdrawTime}点${tips}`);
    }
    if (helpList.length > 0) {
        for (let u of CurrentUser) {
            for (let code of helpList) {
                await u.helpScan(code);
                await $.wait(200);
            }
        }
    }
})()
    .catch((error) => $.logErr(error))
    .finally(() => $.done());
async function formatCookie() {
    if (ksjsbCookie) {
        let CookieKss = []
        if (ksjsbCookie.indexOf('@') > -1) {
            CookieKss = ksjsbCookie.split('@');
        } else if (ksjsbCookie.indexOf('&') > -1) {
            CookieKss = ksjsbCookie.split('&');
        } else if (ksjsbCookie.indexOf('\n') > -1) {
            CookieKss = ksjsbCookie.split('\n');
        } else {
            CookieKss = [ksjsbCookie];
        }
        for (let ck of CookieKss) {
            if (ck) {
                Users.push(new ksUser(ck));
            }
        }
        count = Users.length;
    } else {
        console.log('未找到CK');
        return;
    }
    console.log('共找到' + count + '个账号');
    return true;
}
function getOptions(url, cookie, body = '') {
    const options = {
        url: url,
        headers: {
            Cookie: cookie,
        },
    };
    if (body) {
        options.body = body;
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return options;
}
function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == 'object') {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}
function randomString(e = 12) {
    let t = 'abcdef0123456789',
        a = t.length,
        n = '';
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}
var Base64 = {
    encode: function encode(input) {
        var _keyStr =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = $.util.Charset.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output =
                output +
                _keyStr.charAt(enc1) +
                _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) +
                _keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var _keyStr =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = $.util.Charset.utf8_decode(output);
        return output;
    },
};
var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxdee62=["","\u643A\u8DA3\u4EE3\u7406\u7528\u6237\u540D","\u643A\u8DA3\u4EE3\u7406\u5BC6\u7801","\u4EE3\u7406\x49\x50","\u4EE3\u7406\u7AEF\u53E3","\x3A","\x69\x73\x4E\x6F\x64\x65","\x78\x69\x65\x71\x75","\x65\x6E\x76","\x54\x72\x75\x65","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74\x2D\x70\x72\x6F\x78\x79","\x70\x72\x6F\x78\x79\x55","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x70\x72\x6F\x78\x79\x55\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u7528\u6237\u540D\u3011\x70\x72\x6F\x78\x79\x55","\x6C\x6F\x67","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u7528\u6237\u540D\u3011\uFF1A\x20","\x70\x72\x6F\x78\x79\x50","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x70\x72\x6F\x78\x79\x50\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u5BC6\u7801\u3011\x70\x72\x6F\x78\x79\x50","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u5BC6\u7801\u3011\uFF1A\x20","\x69\x70\x55\x72\x6C","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x69\x70\x55\x72\x6C\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\x49\x50\u63D0\u53D6\u5730\u5740\u3011\x69\x70\x55\x72\x6C\x20","\x20\u8BBF\u95EE\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x65\x71\x75\x2E\x63\x6E\x2F\x72\x65\x64\x69\x72\x65\x63\x74\x2E\x61\x73\x70\x78\x20\x20\x3E\x3E\x20\u5DF2\u8D2D\u4EA7\u54C1\x20\x3E\x3E\x20\x41\x50\x49\u63D0\u53D6\x20\x3E\x3E\x20\u9009\u62E9\u63D0\u53D6\u6570\u91CF\x3A\x20\x31\u3001\u9009\u62E9\x49\x50\u534F\u8BAE\uFF1A\x48\x54\x54\x50\x2F\x48\x54\x54\x50\x53\u3001\u9009\u62E9\u8FD4\u56DE\u683C\u5F0F\uFF1A\x4A\x53\x4F\x4E\u3001\u5176\u4ED6\u968F\u610F\x20\x3E\x3E\x20\u751F\u6210\u94FE\u63A5","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\x49\x50\u63D0\u53D6\u5730\u5740\u3011\uFF1A\x20","\u643A\u8DA3\u4EE3\u7406\u6CE8\u518C\u5730\u5740\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x65\x71\x75\x2E\x63\x6E\x2F\x69\x6E\x64\x65\x78\x2E\x68\x74\x6D\x6C\x3F\x32\x66\x34\x66\x66\x36\x39\x30","\u5982\u9700\u5F00\u542F\u4EE3\u7406\uFF0C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\x20\x78\x69\x65\x71\x75\x20\u503C\x20\x54\x72\x75\x65","\u4EE3\u7406\u4F7F\u7528\u6559\u7A0B\uFF1A\x68\x74\x74\x70\x3A\x2F\x2F\x63\x78\x67\x63\x2E\x74\x6F\x70\x2F\x61\x72\x63\x68\x69\x76\x65\x73\x2F\x78\x69\x65\x71\x75\x64\x61\x69\x6C\x69","\x6E\x6F\x64\x65\x2D\x66\x65\x74\x63\x68","\x63\x6F\x64\x65","\u643A\u8DA3\u4EE3\u7406\uFF1A","\x6D\x73\x67","\x64\x61\x74\x61","\x49\x50","\x50\x6F\x72\x74","\x70\x72\x6F\x78\x79\x55\x72\x6C","\x68\x74\x74\x70\x3A\x2F\x2F","\x40","\u4F7F\u7528\u4EE3\u7406\x49\x50\x3A","\x74\x68\x65\x6E","\x6A\x73\x6F\x6E","\x22\x20\x4E\x6F\x74\x20\x41\x3B\x42\x72\x61\x6E\x64\x22\x3B\x76\x3D\x22\x39\x39\x22\x2C\x20\x22\x43\x68\x72\x6F\x6D\x69\x75\x6D\x22\x3B\x76\x3D\x22\x39\x38\x22\x2C\x20\x22\x47\x6F\x6F\x67\x6C\x65\x20\x43\x68\x72\x6F\x6D\x65\x22\x3B\x76\x3D\x22\x39\x38\x22","\x3F\x30","\x22\x57\x69\x6E\x64\x6F\x77\x73\x22","\x31","\x73\x74\x72\x69\x63\x74\x2D\x6F\x72\x69\x67\x69\x6E\x2D\x77\x68\x65\x6E\x2D\x63\x72\x6F\x73\x73\x2D\x6F\x72\x69\x67\x69\x6E","\x47\x45\x54","\x77\x61\x69\x74","\u8BF7\u6C42\u5931\u8D25","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x6C\x6F\x67\x45\x72\x72","\x70\x61\x72\x73\x65","\x70\x6F\x73\x74","\x62\x6F\x64\x79","\x68\x65\x61\x64\x65\x72\x73","\x63\x61\x74\x63\x68","\x74\x65\x78\x74","\x70\x72\x6F\x78\x79","\x73\x65\x74","\x74\x69\x6D\x65\x6F\x75\x74","\x73\x65\x6E\x64","\x75\x72\x6C","\x67\x65\x74","\u4EE3\u7406\u4E0D\u80FD\u8DD1\x20\u8BD5\u8BD5\u5B89\u88C5\u4F9D\u8D56\x20\x20\x64\x6F\x63\x6B\x65\x72\x20\x65\x78\x65\x63\x20\x2D\x69\x74\x20\x51\x4C\x20\x62\x61\x73\x68\x20\x2D\x63\x20\x22\x79\x61\x72\x6E\x20\x61\x64\x64\x20\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74\x22\x20\x20","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];let requestSup=__Oxdee62[0x0];let ipUrl=__Oxdee62[0x0];let proxyU=__Oxdee62[0x1];let proxyP=__Oxdee62[0x2];let proxyHost=__Oxdee62[0x3];let proxyPort=__Oxdee62[0x4];let proxyServer=proxyHost+ __Oxdee62[0x5]+ proxyPort;let xiequ=$[__Oxdee62[0x6]]()?(process[__Oxdee62[0x8]][__Oxdee62[0x7]]?process[__Oxdee62[0x8]][__Oxdee62[0x7]]:__Oxdee62[0x0]):__Oxdee62[0x0];if(xiequ== __Oxdee62[0x9]){requestSup= require(__Oxdee62[0xa]);require(__Oxdee62[0xb])(requestSup);proxyU= $[__Oxdee62[0x6]]()?(process[__Oxdee62[0x8]][__Oxdee62[0xc]]?process[__Oxdee62[0x8]][__Oxdee62[0xc]]:__Oxdee62[0x0]):__Oxdee62[0x0];if(proxyU== __Oxdee62[0x0]){console[__Oxdee62[0xe]](__Oxdee62[0xd]);return}else {console[__Oxdee62[0xe]](__Oxdee62[0xf]+ proxyU)};proxyP= $[__Oxdee62[0x6]]()?(process[__Oxdee62[0x8]][__Oxdee62[0x10]]?process[__Oxdee62[0x8]][__Oxdee62[0x10]]:__Oxdee62[0x0]):__Oxdee62[0x0];if(proxyP== __Oxdee62[0x0]){console[__Oxdee62[0xe]](__Oxdee62[0x11]);return}else {console[__Oxdee62[0xe]](__Oxdee62[0x12]+ proxyP)};ipUrl= $[__Oxdee62[0x6]]()?(process[__Oxdee62[0x8]][__Oxdee62[0x13]]?process[__Oxdee62[0x8]][__Oxdee62[0x13]]:__Oxdee62[0x0]):__Oxdee62[0x0];if(ipUrl== __Oxdee62[0x0]){console[__Oxdee62[0xe]](__Oxdee62[0x14]);console[__Oxdee62[0xe]](__Oxdee62[0x15]);return}else {console[__Oxdee62[0xe]](__Oxdee62[0x16]+ ipUrl)}}else {console[__Oxdee62[0xe]](__Oxdee62[0x17]);console[__Oxdee62[0xe]](__Oxdee62[0x18]);console[__Oxdee62[0xe]](__Oxdee62[0x19])};console[__Oxdee62[0xe]]();async function superagent(){const _0xe5c5xa=require(__Oxdee62[0x1a]); await _0xe5c5xa(ipUrl,{"\x68\x65\x61\x64\x65\x72\x73":{"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61":__Oxdee62[0x27],"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61\x2D\x6D\x6F\x62\x69\x6C\x65":__Oxdee62[0x28],"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61\x2D\x70\x6C\x61\x74\x66\x6F\x72\x6D":__Oxdee62[0x29],"\x75\x70\x67\x72\x61\x64\x65\x2D\x69\x6E\x73\x65\x63\x75\x72\x65\x2D\x72\x65\x71\x75\x65\x73\x74\x73":__Oxdee62[0x2a]},"\x72\x65\x66\x65\x72\x72\x65\x72\x50\x6F\x6C\x69\x63\x79":__Oxdee62[0x2b],"\x62\x6F\x64\x79":null,"\x6D\x65\x74\x68\x6F\x64":__Oxdee62[0x2c]})[__Oxdee62[0x25]]((_0xe5c5xd)=>{return _0xe5c5xd[__Oxdee62[0x26]]()})[__Oxdee62[0x25]]((_0xe5c5xb)=>{if(_0xe5c5xb[__Oxdee62[0x1b]]!= 0){console[__Oxdee62[0xe]](__Oxdee62[0x1c]+ _0xe5c5xb[__Oxdee62[0x1d]])}else {let _0xe5c5xc=_0xe5c5xb[__Oxdee62[0x1e]];proxyHost= _0xe5c5xc[0x0][__Oxdee62[0x1f]];proxyPort= _0xe5c5xc[0x0][__Oxdee62[0x20]];proxyServer= proxyHost+ __Oxdee62[0x5]+ proxyPort;$[__Oxdee62[0x21]]= __Oxdee62[0x22]+ proxyU+ __Oxdee62[0x5]+ proxyP+ __Oxdee62[0x23]+ proxyServer;console[__Oxdee62[0xe]](__Oxdee62[0x24]+ proxyHost+ __Oxdee62[0x5]+ proxyPort)}}); await $[__Oxdee62[0x2d]](200)}async function doRequest(_0xe5c5xf,_0xe5c5x10){ await $[__Oxdee62[0x2d]](1000);return  new Promise((_0xe5c5x11)=>{$[_0xe5c5xf](_0xe5c5x10,async (_0xe5c5x12,_0xe5c5x13,_0xe5c5x14)=>{try{if(_0xe5c5x12){console[__Oxdee62[0xe]](_0xe5c5xf+ __Oxdee62[0x2e]);console[__Oxdee62[0xe]](JSON[__Oxdee62[0x2f]](_0xe5c5x12));$[__Oxdee62[0x30]](_0xe5c5x12)}else {if(safeGet(_0xe5c5x14)){res= JSON[__Oxdee62[0x31]](_0xe5c5x14)}}}catch(error){$[__Oxdee62[0x30]](error,_0xe5c5x13)}finally{_0xe5c5x11()}})})}async function doRequestDL(_0xe5c5xf,_0xe5c5x10){if(xiequ== __Oxdee62[0x9]){try{let requestSup=require(__Oxdee62[0xa]);if(_0xe5c5xf== __Oxdee62[0x32]){let _0xe5c5x16=_0xe5c5x10[__Oxdee62[0x33]];let _0xe5c5x17=_0xe5c5x10[__Oxdee62[0x34]]; await requestSup[__Oxdee62[0x32]](_0xe5c5x10[__Oxdee62[0x3b]])[__Oxdee62[0x3a]](_0xe5c5x16)[__Oxdee62[0x39]](3000)[__Oxdee62[0x38]](_0xe5c5x17)[__Oxdee62[0x37]]($[__Oxdee62[0x21]])[__Oxdee62[0x25]]((_0xe5c5xb)=>{return _0xe5c5xb[__Oxdee62[0x36]]})[__Oxdee62[0x25]]((_0xe5c5xb)=>{if(safeGet(_0xe5c5xb)){res= JSON[__Oxdee62[0x31]](_0xe5c5xb)}})[__Oxdee62[0x35]]((_0xe5c5x12)=>{}); await $[__Oxdee62[0x2d]](1500);return  await  new Promise((_0xe5c5x11)=>{try{res= res}catch(error){$[__Oxdee62[0x30]](error,resp)}finally{_0xe5c5x11()}})};if(_0xe5c5xf== __Oxdee62[0x3c]){let _0xe5c5x16=_0xe5c5x10[__Oxdee62[0x33]];let _0xe5c5x17=_0xe5c5x10[__Oxdee62[0x34]]; await requestSup[__Oxdee62[0x3c]](_0xe5c5x10[__Oxdee62[0x3b]])[__Oxdee62[0x3a]](_0xe5c5x16)[__Oxdee62[0x38]](_0xe5c5x17)[__Oxdee62[0x39]](3000)[__Oxdee62[0x37]]($[__Oxdee62[0x21]])[__Oxdee62[0x25]]((_0xe5c5xb)=>{return _0xe5c5xb[__Oxdee62[0x36]]})[__Oxdee62[0x25]]((_0xe5c5xb)=>{if(safeGet(_0xe5c5xb)){res= JSON[__Oxdee62[0x31]](_0xe5c5xb)}})[__Oxdee62[0x35]]((_0xe5c5x12)=>{}); await $[__Oxdee62[0x2d]](1500);return  new Promise((_0xe5c5x11)=>{try{res= res}catch(error){$[__Oxdee62[0x30]](error,resp)}finally{_0xe5c5x11()}})}}catch(e){console[__Oxdee62[0xe]](__Oxdee62[0x3d])}}else {res= null;return  new Promise((_0xe5c5x11)=>{$[_0xe5c5xf](_0xe5c5x10,async (_0xe5c5x12,_0xe5c5x13,_0xe5c5x14)=>{try{if(_0xe5c5x12){console[__Oxdee62[0xe]](_0xe5c5xf+ __Oxdee62[0x2e]);console[__Oxdee62[0xe]](JSON[__Oxdee62[0x2f]](_0xe5c5x12));$[__Oxdee62[0x30]](_0xe5c5x12)}else {if(safeGet(_0xe5c5x14)){res= JSON[__Oxdee62[0x31]](_0xe5c5x14)}}}catch(error){$[__Oxdee62[0x30]](error,_0xe5c5x13)}finally{_0xe5c5x11()}})})}}(function(_0xe5c5x18,_0xe5c5x19,_0xe5c5x1a,_0xe5c5x1b,_0xe5c5x1c,_0xe5c5x1d){_0xe5c5x1d= __Oxdee62[0x3e];_0xe5c5x1b= function(_0xe5c5x1e){if( typeof alert!== _0xe5c5x1d){alert(_0xe5c5x1e)};if( typeof console!== _0xe5c5x1d){console[__Oxdee62[0xe]](_0xe5c5x1e)}};_0xe5c5x1a= function(_0xe5c5x1f,_0xe5c5x18){return _0xe5c5x1f+ _0xe5c5x18};_0xe5c5x1c= _0xe5c5x1a(__Oxdee62[0x3f],_0xe5c5x1a(_0xe5c5x1a(__Oxdee62[0x40],__Oxdee62[0x41]),__Oxdee62[0x42]));try{_0xe5c5x18= __encode;if(!( typeof _0xe5c5x18!== _0xe5c5x1d&& _0xe5c5x18=== _0xe5c5x1a(__Oxdee62[0x43],__Oxdee62[0x44]))){_0xe5c5x1b(_0xe5c5x1c)}}catch(e){_0xe5c5x1b(_0xe5c5x1c)}})({})
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t;
        }
        send(t, e = 'GET') {
            t = 'string' == typeof t ? { url: t } : t;
            let s = this.get;
            return (
                'POST' === e && (s = this.post),
                    new Promise((e, i) => {
                        s.call(this, t, (t, s, r) => {
                            t ? i(t) : e(s);
                        });
                    })
            );
        }
        get(t) {
            return this.send.call(this.env, t);
        }
        post(t) {
            return this.send.call(this.env, t, 'POST');
        }
    }
    return new (class {
        constructor(t, e) {
            (this.name = t),
                (this.http = new s(this)),
                (this.data = null),
                (this.dataFile = 'box.dat'),
                (this.logs = []),
                (this.isMute = !1),
                (this.isNeedRewrite = !1),
                (this.logSeparator = '\n'),
                (this.startTime = new Date().getTime()),
                Object.assign(this, e),
                this.log('', `\ud83d\udd14${this.name}, \u5f00\u59cb!`);
        }
        isNode() {
            return 'undefined' != typeof module && !!module.exports;
        }
        isQuanX() {
            return 'undefined' != typeof $task;
        }
        isSurge() {
            return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon;
        }
        isLoon() {
            return 'undefined' != typeof $loon;
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t);
            } catch {
                return e;
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t);
            } catch {
                return e;
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t));
                } catch {}
            return s;
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e);
            } catch {
                return !1;
            }
        }
        getScript(t) {
            return new Promise((e) => {
                this.get({ url: t }, (t, s, i) => e(i));
            });
        }
        runScript(t, e) {
            return new Promise((s) => {
                let i = this.getdata('@chavy_boxjs_userCfgs.httpapi');
                i = i ? i.replace(/\n/g, '').trim() : i;
                let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout');
                (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
                const [o, h] = i.split('@'),
                    a = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: { script_text: t, mock_type: 'cron', timeout: r },
                        headers: { 'X-Key': o, Accept: '*/*' },
                    };
                this.post(a, (t, e, i) => s(i));
            }).catch((t) => this.logErr(t));
        }
        loaddata() {
            if (!this.isNode()) return {};
            {
                (this.fs = this.fs ? this.fs : require('fs')),
                    (this.path = this.path ? this.path : require('path'));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i));
                    } catch (t) {
                        return {};
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                (this.fs = this.fs ? this.fs : require('fs')),
                    (this.path = this.path ? this.path : require('path'));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s
                    ? this.fs.writeFileSync(t, r)
                    : i
                    ? this.fs.writeFileSync(e, r)
                    : this.fs.writeFileSync(t, r);
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, '.$1').split('.');
            let r = t;
            for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s;
            return r;
        }
        lodash_set(t, e, s) {
            return Object(t) !== t
                ? t
                : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
                    (e
                        .slice(0, -1)
                        .reduce(
                            (t, s, i) =>
                                Object(t[s]) === t[s]
                                    ? t[s]
                                    : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}),
                            t
                        )[e[e.length - 1]] = s),
                    t);
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : '';
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, '') : e;
                    } catch (t) {
                        e = '';
                    }
            }
            return e;
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? ('null' === o ? null : o || '{}') : '{}';
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i));
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i));
                }
            } else s = this.setval(t, e);
            return s;
        }
        getval(t) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.read(t)
                : this.isQuanX()
                    ? $prefs.valueForKey(t)
                    : this.isNode()
                        ? ((this.data = this.loaddata()), this.data[t])
                        : (this.data && this.data[t]) || null;
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.write(t, e)
                : this.isQuanX()
                    ? $prefs.setValueForKey(t, e)
                    : this.isNode()
                        ? ((this.data = this.loaddata()),
                            (this.data[e] = t),
                            this.writedata(),
                            !0)
                        : (this.data && this.data[e]) || null;
        }
        initGotEnv(t) {
            (this.got = this.got ? this.got : require('got')),
                (this.cktough = this.cktough ? this.cktough : require('tough-cookie')),
                (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
            t &&
            ((t.headers = t.headers ? t.headers : {}),
            void 0 === t.headers.Cookie &&
            void 0 === t.cookieJar &&
            (t.cookieJar = this.ckjar));
        }
        get(t, e = () => {}) {
            t.headers &&
            (delete t.headers['Content-Type'], delete t.headers['Content-Length']),
                this.isSurge() || this.isLoon()
                    ? (this.isSurge() &&
                    this.isNeedRewrite &&
                    ((t.headers = t.headers || {}),
                        Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
                        $httpClient.get(t, (t, s, i) => {
                            !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                        }))
                    : this.isQuanX()
                    ? (this.isNeedRewrite &&
                    ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                        $task.fetch(t).then(
                            (t) => {
                                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                                e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                            },
                            (t) => e(t)
                        ))
                    : this.isNode() &&
                    (this.initGotEnv(t),
                        this.got(t)
                            .on('redirect', (t, e) => {
                                try {
                                    if (t.headers['set-cookie']) {
                                        const s = t.headers['set-cookie']
                                            .map(this.cktough.Cookie.parse)
                                            .toString();
                                        this.ckjar.setCookieSync(s, null),
                                            (e.cookieJar = this.ckjar);
                                    }
                                } catch (t) {
                                    this.logErr(t);
                                }
                            })
                            .then(
                                (t) => {
                                    const {
                                        statusCode: s,
                                        statusCode: i,
                                        headers: r,
                                        body: o,
                                    } = t;
                                    e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                                },
                                (t) => {
                                    const { message: s, response: i } = t;
                                    e(s, i, i && i.body);
                                }
                            ));
        }
        post(t, e = () => {}) {
            if (
                (t.body &&
                t.headers &&
                !t.headers['Content-Type'] &&
                (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'),
                t.headers && delete t.headers['Content-Length'],
                this.isSurge() || this.isLoon())
            )
                this.isSurge() &&
                this.isNeedRewrite &&
                ((t.headers = t.headers || {}),
                    Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
                    $httpClient.post(t, (t, s, i) => {
                        !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                    });
            else if (this.isQuanX())
                (t.method = 'POST'),
                this.isNeedRewrite &&
                ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                    $task.fetch(t).then(
                        (t) => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                            e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                        },
                        (t) => e(t)
                    );
            else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(
                    (t) => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                    },
                    (t) => {
                        const { message: s, response: i } = t;
                        e(s, i, i && i.body);
                    }
                );
            }
        }
        time(t) {
            let e = {
                'M+': new Date().getMonth() + 1,
                'd+': new Date().getDate(),
                'H+': new Date().getHours(),
                'm+': new Date().getMinutes(),
                's+': new Date().getSeconds(),
                'q+': Math.floor((new Date().getMonth() + 3) / 3),
                S: new Date().getMilliseconds(),
            };
            /(y+)/.test(t) &&
            (t = t.replace(
                RegExp.$1,
                (new Date().getFullYear() + '').substr(4 - RegExp.$1.length)
            ));
            for (let s in e)
                new RegExp('(' + s + ')').test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    1 == RegExp.$1.length
                        ? e[s]
                        : ('00' + e[s]).substr(('' + e[s]).length)
                ));
            return t;
        }
        msg(e = t, s = '', i = '', r) {
            const o = (t) => {
                if (!t) return t;
                if ('string' == typeof t)
                    return this.isLoon()
                        ? t
                        : this.isQuanX()
                            ? { 'open-url': t }
                            : this.isSurge()
                                ? { url: t }
                                : void 0;
                if ('object' == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t['open-url'],
                            s = t.mediaUrl || t['media-url'];
                        return { openUrl: e, mediaUrl: s };
                    }
                    if (this.isQuanX()) {
                        let e = t['open-url'] || t.url || t.openUrl,
                            s = t['media-url'] || t.mediaUrl;
                        return { 'open-url': e, 'media-url': s };
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t['open-url'];
                        return { url: e };
                    }
                }
            };
            this.isMute ||
            (this.isSurge() || this.isLoon()
                ? $notification.post(e, s, i, o(r))
                : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = [
                '',
                '==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3==============',
            ];
            h.push(e),
            s && h.push(s),
            i && h.push(i),
                console.log(h.join('\n')),
                (this.logs = this.logs.concat(h));
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator));
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s
                ? this.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack)
                : this.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t);
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t));
        }
        done(t = {}) {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            this.log(
                '',
                `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`
            ),
                this.log(),
            (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
        }
    })(t, e);
}