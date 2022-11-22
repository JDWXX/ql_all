# -*- coding:utf-8 -*-
"""
cron: 0 30 0 * * *
new Env('微信小程序-口味王');
"""
import time
import os

try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
'''
版本 v1.0.1
====================== Cookie 配置===========================
'''
mycookies = []
try:
    mycookies = os.environ["KWW_COOKIE"].split("&")
except:
    print("【提示】请先获取微信小程序[口味王]cookie,环境变量添加 KWW_COOKIE ,如有不懂加群：212796668、681030097、743744614")
    exit(3)
'''
#1|“口味王”是槟榔行业领先品牌吗？——正确
#2|“口味王”槟榔曾冠名过《这！就是灌篮3》吗？——正确
#3|“口味王”槟榔曾赞助过综艺《这！就是街舞4》吗？——正确
#4|“口味王”是槟榔行业领导品牌；——正确
#5|“以下哪些场景使用“口味王”槟榔可以秒回状态？——以上都是 '开车犯困||上网冲浪||熬夜加班||以上都是',
#6|口味王已连续4年举办“我要上大学”公益活动？——正确
#7|游戏上分时，使用“口味王”槟榔可以秒回状态？——正确
#8|开车犯困的时候，使用“口味王”槟榔可以秒回状态？——正确
#9|熬夜加班的时候，使用“口味王”槟榔可以秒回状态？——正确
#10|槟榔品牌中，“口味王”槟榔销量全国领先吗？——正确
#11|“口味王”槟榔曾赞助过电视剧《鬼吹灯之云南虫谷》吗？——正确
#12|“口味王”槟榔曾赞助过电视剧《将夜2》吗？——正确
#13|“口味王”槟榔曾赞助过电视剧《鬼吹灯之龙岭迷窟》吗？——正确
#14|“口味王“槟榔曾赞助过电视剧《怒晴湘西》吗？——正确
#15|“口味王”槟榔曾赞助过电视剧《巡回检察组》吗？——正确
#16|“口味王”槟榔曾赞助《欢乐喜剧人5》吗？——正确
#17|2019年“口味王”冠名虎牙英雄联盟S9全球总决赛直播吗？——正确
#18|口味王已连续6年开展“温暖回家”公益活动——正确
#19|“口味王”槟榔曾赞助过电视剧《巡警之海外行动》吗？——正确
#20|“口味王”槟榔是_____的槟榔品牌。——全国销量领先 "全国销量领先","全国高端销量领先","湖南销量领先","湖南高端销量领先"
#21|以下哪个是“和成天下”槟榔的特点？——以上全是 "10包高端槟榔，7包和成天下","全国高端销量领先","海南嫩青果，味美更耐嚼","以上全是"
#22|“和成天下”槟榔是全国高端销量领先的槟榔品牌吗？——正确
#23|10包高端槟榔，有几包是“和成天下”？——7 4,5,6,7
#24|10包高端槟榔，有7包是“和成天下”对吗？——正确
#25|“和成天下”采用的是哪个地方的槟榔果生产而成？——中国海南 中国台湾||印度尼西亚||中国海南||菲律宾
#26|“和成天下”槟榔采用的是海南槟榔果制作而成的吗？——正确
#27|“和成天下”槟榔生产需要多少道工艺？——22道
#28|“和成天下”槟榔生产需要22道工艺？——正确
#30|为什么“和成天下”坚持使用海南槟榔果生产？——以上都是 "海南槟榔果汁多肉厚","海南槟榔果果形匀称","海南槟榔果更耐嚼","以上都是"
#31|高端槟榔市场占有率最高的品牌是“和成天下”吗？——正确
#32|“和成天下”品牌采用海南原果的比例是多少？——100% "50%","80%","70%","100%"
#33|“和成天下”是哪一类槟榔的引领者和典型代表？——高端槟榔
#34|“和成天下”是高端槟榔槟榔的引领者和典型代表？——正确
#35|“和成天下”是湖南人更爱吃的槟榔吗？——正确
#36|“和成天下”曾赞助过芒果TV《野生厨房》吗？——正确
#38|“和成天下”采用的是_____槟榔？——海南嫩青果 海南嫩青果,湖南嫩青果,河南嫩青果,云南嫩青果
#39|“和成天下”品牌广告语：“海南_______，味美更耐嚼”——嫩青果 好果子,万宁果,嫩青果,秋前果
#41|“和成天下”品牌广告语：“_____嫩青果，味美更耐嚼”——海南
#42|“和成天下”槟榔原果来自全球槟榔黄金产区——海南吗？——正确
#43|“和成天下”槟榔是_____的槟榔品牌。——全国高端销量领先 "全国销量领先","全国高端销量领先","湖南销量领先","湖南高端销量领先"
#44|海南的槟榔果有什么特点——以上都是 "汁多肉厚","果形匀称","耐嚼","以上都是"
#45|全球槟榔的黄金产区在哪里——中国海南 "印度尼西亚","中国台湾","菲律宾","中国海南"
#46|海南的三大支柱产业是什么？——槟榔、椰子、橡胶   椰子、橡胶、芒果,槟榔、椰子、橡胶,槟榔、椰子、芒果,槟榔、橡胶、芒果
#48|与东南亚槟榔相比，海南槟榔更适合加工成干果进行咀嚼吗？——正确
#50|中国“四大南药”之首是什么？——槟榔 "益智仁","槟榔","砂仁","巴戟天"
#51|白居易的千古名句：“戴花红石竹，帔晕紫_____”——槟榔 "枸杞","黄芪","人参","槟榔"
#52|《本草纲目》中描述槟榔有哪些功效？——以上都是 解油,驱虫,除胀,以上都是
#53|邓丽君的歌曲：“高高的树上结_____，谁先爬上谁先尝”——槟榔 槟榔,椰子,榴莲,菠萝蜜
#55|“可疗饥怀香自吐，能消瘴疠暖如熏。”这句诗描写的是哪种植物？——槟榔树 "椰子树","橡胶树","槟榔树","橄榄树"
#56|西汉汉武帝曾制定_____作为皇室贡品进献——以上都是 "荔枝","槟榔","珍珠","以上都是"
#57|槟榔起源于哪里？——马来西亚 "菲律宾","越南","印度尼西亚","马来西亚"
#59|海南万宁被称为什么——槟榔之乡 槟榔之乡,芒果之乡,椰子之乡,凤梨之乡
#60|为什么海南是全球槟榔的黄金产区——以上都是 温差小,日照长,空气湿度高,以上都是
#61|海南万宁的槟榔果是槟榔中的黄金圣果吗？——正确
#62|国内嚼食槟榔以果肉为主，越南等东南亚国家则以带核槟榔为主——正确
#63|与东南亚槟榔相比，海南槟榔纤维细腻更适合咀嚼吗？——正确
#65|李白的千古名句：“何时黄金盘，一斛荐_____”——槟榔 "槟榔","黄芪","人参","枸杞"
#66|“若笋竹生竿，种之精硬，引茎直上，不生枝叶。”描写的是哪种植物？——槟榔树 "椰子树","橡胶树","槟榔树","橄榄树"
#67|“高高的树上结槟榔，谁先爬上谁先尝”是哪首歌的歌词？——《采槟榔》 "《采槟榔》","《摘槟榔》","《尝槟榔》","《品槟榔》"
#68|“开花树杪翻青箨，结子苞中皱锦纹。”这句诗描写的是哪种植物？——槟榔树 "槟榔树","橡胶树","椰子树","橄榄树"
#70|考古发现最早的槟榔遗骸是哪年？——公元前10,000年 "公元前1,000年","公元前3,000年","公元前7,000年","公元前10,000年"
#71|“朗是宾门篓似妾，结成一对好鸳鸯。”这句诗描写的是哪种植物？——槟榔树 椰子树,橡胶树,橄榄树,槟榔树
#72|槟榔果一般在什么时间采摘？——8~10月 8~10月,11~1月,2~4月,5~7月
====================== 题库 ===========================
'''

ktList = {'1': '正确',
          '2': '正确',
          '3': '正确',
          '4': '正确',
          '5': '以上都是',
          '6': '正确',
          '7': '正确',
          '8': '正确',
          '9': '正确',
          '10': '正确',
          '11': '正确',
          '12': '正确',
          '13': '正确',
          '14': '正确',
          '15': '正确',
          '16': '正确',
          '17': '正确',
          '18': '正确',
          '19': '正确',
          '20': '全国销量领先',
          '21': '以上全是',
          '22': '正确',
          '23': '7',
          '24': '正确',
          '25': '中国海南',
          '26': '正确',
          '27': '22道',
          '28': '正确',
          '29': '',  # 题目未知
          '30': '以上都是',
          '31': '正确',
          '32': '100%',
          '33': '高端槟榔',
          '34': '正确',
          '35': '正确',
          '36': '正确',
          '37': '',  #
          '38': '海南嫩青果',
          '39': '嫩青果',
          '40': '',  #
          '41': '海南',
          '42': '正确',
          '43': '全国高端销量领先',
          '44': '以上都是',
          '45': '中国海南',
          '46': '槟榔、椰子、橡胶',
          '47': '',  #
          '48': '正确',
          '49': '',  #
          '50': '槟榔',
          '51': '槟榔',
          '52': '以上都是',
          '53': '槟榔',
          '54': '',  #
          '55': '槟榔树',
          '56': '以上都是',
          '57': '马来西亚',
          '58': '',  #
          '59': '槟榔之乡',
          '60': '以上都是',
          '61': '正确',
          '62': '正确',
          '63': '正确',
          '64': '',  #
          '65': '槟榔',
          '66': '槟榔树',
          '67': '《采槟榔》',
          '68': '槟榔树',
          '69': '',  #
          '70': '公元前10,000年',
          '71': '槟榔树',
          '72': '8~10月'
          }

'''
====================== 请求 ===========================
'''


def getApiBody(url, json):
    headers = {
        'Content-Type': 'application/json',
    }
    return requests.post(url=url, headers=headers, json=json, timeout=300).json()


def getApi(url, headers):
    return requests.get(url=url, headers=headers, timeout=300).json()


def getApiR(url, headers):
    return requests.get(url=url, headers=headers, allow_redirects=False, timeout=300)


if __name__ == '__main__':
    for i in range(len(mycookies)):
        print("用户【" + mycookies[i] + "】")
        url = 'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=select-member-score&formName=searchForm&memberId=' + \
              mycookies[i]
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        res = getApi(url, headers)
        print("积分剩余 : " + str(res['rows'][0]))
        if int(res['rows'][0]) >= 888:
            print("积分大于 888 分，请去微信公众号【口味王】兑换红包")
        print("【每日签到】")
        res = getApi(
            'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=selectSignInfo&formName=searchForm&memberId=' +
            mycookies[i], headers)
        propList = res['rows']['data']
        for prop in range(len(propList)):
            if propList[prop]['flag'] == "1":
                print(propList[prop]['formulaDesc'] + " " + (
                    "未签到" if propList[prop]['flag'] == "0" else "已签到") + "签到奖励 " + propList[prop]['paramNo'])
            if propList[prop]['flag'] == "0":
                json = {
                    "pageName": "AddSignSvmInfo",
                    "formName": "addForm",
                    'orderNo': propList[prop]['orderNo'],
                    'paramNo': propList[prop]['paramNo'],
                    'cateId': propList[prop]['cateId'],
                    'memberId': mycookies[i],
                    'memberName': "JDWXX",
                }
                jf = getApiBody('https://member.kwwblcj.com/member/api/submit/?userKeys=v1.0', json)
                print(jf['msg'])
                break
        print("【任务】")
        res = getApi(
            'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=select-task-list&formName=searchForm&memberId=' +
            mycookies[i], headers)
        propList = res['rows']
        for prop in range(len(propList)):
            print(propList[prop]['taskTitle'] + "  " + "奖励积分:" + propList[prop]['rewardScore'] + " ->  " + (
                "待完成" if propList[prop]['complete'] == '0' else "已完成"))
            if propList[prop]['taskTitle'] == "开启签到提醒" and propList[prop]['complete'] == "0":
                print("【开启签到提醒】")
                jf = getApi(
                    'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSignTaskFlag&formName=addForm&memberId=' +
                    mycookies[i] + '&userCname=JDWXX&openId=o_V6_5Yo3mET81MVAQw4yYebL3zE', headers)
                print('完成' if jf['rows'][0] == 'T' else '失败，去手动完成任务')
                jf = getApi(
                    'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSignTaskFlag&formName=addForm&memberId=' +
                    mycookies[i] + '&userCname=JDWXX&openId=0', headers)
                print('完成' if jf['rows'][0] == 'T' else '失败，去手动完成任务')
            if propList[prop]['taskTitle'] == "订阅活动通知" and propList[prop]['complete'] == "0":
                print("【订阅活动通知】")
                jf = getApi(
                    'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSubscribeTaskFlag&formName=addForm&memberId=' +
                    mycookies[i] + '&userCname=JDWXX&openId=o_V6_5Yo3mET81MVAQw4yYebL3zE', headers)
                print('完成' if jf['rows'][0] == 'T' else '失败，去手动完成任务')
                jf = getApi(
                    'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setOpenSubscribeTaskFlag&formName=addForm&memberId=' +
                    mycookies[i] + '&userCname=JDWXX&openId=0', headers)
                print('完成' if jf['rows'][0] == 'T' else '失败，去手动完成任务')
        print("【每日阅读】")
        jf = getApi(
            'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=setNewsReadTaskFlag&formName=addForm&memberId=' +
            mycookies[i] + '&userCname=JDWXX&articleTitle=undefined', headers)
        print("阅读日期：" + jf['rows'][0])
        print("【收青果】")
        jf = getApi(
            'https://member.kwwblcj.com/member/api/list/?userKeys=v1.0&pageName=activeTaskFlag&formName=editForm&memberId=' +
            mycookies[i] + '&userCname=JDWXX', headers)
        print("收青果日期：" + jf['rows'][0])
        print("【答题任务】")
        url = 'https://member.kwwblcj.com/member/api/info/?userKeys=v1.0&pageName=loginFreePlugin&formName=searchForm&uid=' + \
              mycookies[
                  i] + '&levelCode=K1&redirect=https%3A%2F%2F89420.activity-20.m.duiba.com.cn%2Fprojectx%2Fp129446ea%2Findex.html%3FappID%3D89420'
        res = getApi(url, headers)
        cookie = getApiR(res['result'], headers).headers.get('Set-Cookie')
        cookieList = cookie.split(";")
        cookie_wdata4 = ''
        cookie_w_ts = ''
        cookie__ac = ''
        for ii in range(len(cookieList)):
            if cookieList[ii].find('wdata4') != -1:
                cookie_wdata4 = cookieList[ii]
            if cookieList[ii].find('w_ts') != -1:
                cookie_w_ts = cookieList[ii]
            if cookieList[ii].find('_ac') != -1:
                cookie__ac = cookieList[ii]
        Cookie = cookie_wdata4 + ";" + cookie_w_ts + ";" + cookie__ac
        Cookie = Cookie.replace("HttpOnly,", "")
        headers = {
            'Cookie': Cookie,
        }
        res = getApi(
            'https://89420.activity-20.m.duiba.com.cn/projectx/p129446ea/answer/start.do?user_type=0&is_from_share=1&_t=' + str(
                time.time()), headers)
        startId = str(res['data'])
        if startId == 'None':
            print("今日已答题")
            continue
        i = 1
        while i < 6:
            i += 1
            url = 'https://89420.activity-20.m.duiba.com.cn/projectx/p129446ea/answer/getQuestion.do?startId=' + startId + '&user_type=0&is_from_share=1&_t=' + str(
                time.time())
            res = getApi(url, headers)
            print("题目ID：" + res['data']['id'] + " > " + res['data']['content'])
            answerList = res['data']['answerList']
            print(str(answerList))
            dt = False
            for jj in range(len(answerList)):
                if answerList[jj].find(ktList.get(res['data']['id'])) != -1:
                    print('找到答案 >' + ktList.get(res['data']['id']))
                    print('提交答案 > 提交值 >' + str(jj + 1))
                    url = 'https://89420.activity-20.m.duiba.com.cn/projectx/p129446ea/answer/submit.do?answer=' + str(
                        jj + 1) + '&startId=' + startId + '&user_type=0&is_from_share=1&_t=' + str(time.time())
                    res = getApi(url, headers)
                    if res['data']['correct']:
                        print("回答正确" if res['data']['correct'] else "回答错误")
                    elif res['message'] == '重复提交':
                        print("已全部答完")
                    dt = True
                    break
            if not dt:
                for jj in range(len(answerList)):
                    print(answerList[jj])
                    print(ktList.get(res['data']['id']))
                    if answerList[jj].find("正确") != -1 \
                            or answerList[jj].find("槟榔") != -1 \
                            or answerList[jj].find("海南") != -1 \
                            or answerList[jj].find("100%") != -1 \
                            or answerList[jj].find("中国") != -1 \
                            or answerList[jj].find("全国") != -1 \
                            or answerList[jj].find("领先") != -1:
                        print('未找到答案 找到默认配置规则')
                        print('提交答案 > 提交值 >' + str(jj + 1))
                        url = 'https://89420.activity-20.m.duiba.com.cn/projectx/p129446ea/answer/submit.do?answer=' + str(
                            jj + 1) + '&startId=' + startId + '&user_type=0&is_from_share=1&_t=' + str(time.time())
                        res = getApi(url, headers)
                        if res['data']['correct']:
                            print("回答正确" if res['data']['correct'] else "回答错误")
                        elif res['message'] == '重复提交':
                            print("已全部答完")
                            break
                        dt = True
                        break
            if not dt:
                print('未找到配置')
                print('提交答案 > 提交默认值 1')
                url = 'https://89420.activity-20.m.duiba.com.cn/projectx/p129446ea/answer/submit.do?answer=1&startId=' + startId + '&user_type=0&is_from_share=1&_t=' + str(
                    time.time())
                res = getApi(url, headers)
                if res['data']['correct']:
                    print("回答正确" if res['data']['correct'] else "回答错误")
                elif res['message'] == '重复提交':
                    print("已全部答完")
                    break
        # 领取奖励
        url = 'https://89420.activity-20.m.duiba.com.cn/projectx/p129446ea/answer/complete.do?startId=' + startId + '&user_type=0&is_from_share=1&_t=' + str(
            time.time())
        res = getApi(url, headers)
        print("领取答题奖励")
        print(res)
