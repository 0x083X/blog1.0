<!--作为About Me页面左侧的自由评论区-->
<script setup lang='ts'>
import { ref } from 'vue'
import axios from 'axios'
type sendMsgDATA = {
    browser: string,
    OS: string,
    textarea: string
}
type getMsgDATA = {
    comment_id: string,
    OS: string,
    browser: string,
    content: string,
    create_time: Date,
    ip_address: string,
    pic: string,
    address: string
}
const commentData = ref<getMsgDATA[]>([])
const textarea = ref('')
const loading = ref<boolean>(true)
const getBrowser = (): string | null => { // => 获取浏览器信息
    let ua = navigator.userAgent.toLocaleLowerCase()
    let browserType: string | null = null
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = 'IE'
    } else if (ua.match(/firefox/) != null) {
        browserType = 'firefox'
    } else if (ua.match(/ucbrowser/) != null) {
        browserType = 'UC'
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
        browserType = 'opera'
    } else if (ua.match(/bidubrowser/) != null) {
        browserType = 'baidu'
    } else if (ua.match(/metasr/) != null) {
        browserType = 'sougou'
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browserType = 'QQ'
    } else if (ua.match(/maxthon/) != null) {
        browserType = 'maxthon'
    } else if (ua.match(/chrome/) != null) {
        browserType = 'chrome'
    } else if (ua.match(/safari/) != null) {
        browserType = 'Safari'
    } else {
        browserType = 'others'
    }
    return browserType
}
const getOS = async (): Promise<string> => { // =>获取操作系统
    let OS: any = "null"
    return await window.navigator.userAgentData.getHighEntropyValues(["platformVersion"]).then(ua => {
        if (window.navigator.userAgentData.platform === "Windows") {
            const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
            if (majorPlatformVersion >= 13) {
                return "Windows 11"
            }
            else if (majorPlatformVersion > 0) {
                return "Windows 10"
            }
            else {
                return "Before Windows 10"
            }
        }
        else {
            return "Not running on Windows";
        }
    });
}
const getIpAddress = async  () => { //=>获取ip地址和陆地地址
    const data:string =  await axios.get('/aaaa/ipJson.jsp').then(res => {
        return res.data
    })
    const regexp1 = /ip\"\:\"\d+\.\d+\.\d+\.\d+\"/g
    const mid1 = [...data.matchAll(regexp1)][0][0]
    let ip = mid1.split(':')[1].split('').filter(item => item != '"').join('')
    const regexp2 = /city\"\:\"[\u4e00-\u9fa5]+\"/g
    const mid2 = [...data.matchAll(regexp2)][0][0]
    const city = mid2.split(":")[1].split('').filter(item => item != '"').join('')
    return {ip,city}
}
// getIpAddress()
// axios.get('/ipss').then(res => {
//         console.log(res.data.ip)
//     })
// axios.get('/aaaa/ipJson.jsp', {
//     params: {
//         ip: "183.63.159.60",
//         json: true,
//     }
// }).then(res => {
//     console.log(res)
// })
const encapsulateDate = async (textarea: string) => { // => 格式化数据
    const browser: string = getBrowser()
    const OS: string = await getOS()
    // const {ip,city:address} =  await getIpAddress()
    return {
        browser,
        OS,
        textarea ,
        // ip ,
        // address
    }
}
const addComment = async () => {
    const data: sendMsgDATA = await encapsulateDate(textarea.value)
    console.log(data)
    const res = await axios.post('/api/comment', data).then(res => res)
    if (res) {
        // TODO:点击发表评论后在页面上显示消息提示框(用absolute或者跳转组件来写)
        alert("成功发布")
        reset()
        init()
    }
}
const getComment = async () => { //获取comment
    commentData.value = await axios.get('/api/comment').then(res => res.data.data)
}
const init = () => { //初始化函数
    getComment()
    loading.value = false
}
const reset = () => { // => 重置
    textarea.value = ""
}
init()
</script>
<template>
    <div class="commentContentBox">
        <div class="commentWrap">
            <div class="commentArea">
                <el-input resize='none' v-model="textarea" maxlength="80" placeholder="请输入,最大长度为80" show-word-limit
                    type="textarea" />
                <button class="addCommentBtn" @click="addComment">发表评论</button>
            </div>
            <!-- <button @click="loading = !loading">change</button> -->
            <el-skeleton style="width: 100%; display: flex; flex-direction: column; align-items: center;" :loading="loading"
                animated :count="3">
                <template #template>
                    <el-skeleton-item variant="text" style="width:400px; height:150px; margin: 30px 0;">
                    </el-skeleton-item>
                </template>
                <template #default>
                    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                        <div style="width: 400px; margin: 30px 0;" v-for="item in commentData" :key="item.comment_id">
                            <div style="display:flex; align-items: center; width: 100%;">
                                <div style="width:40px; height:40px; border-radius: 40px; background-color: pink;"></div>
                                <div style="padding-left:10px; word-wrap:break-word; width: 80%;">
                                    {{ item.content }}
                                </div>
                            </div>
                            <div style="margin-top:10px; font-size:14px;">
                                <!-- <span>ip地址:{{ item.ip_address }} </span> -->
                                <span> 浏览器:{{ item.browser }} </span>
                                <!-- <span> 地址:{{ item.address }} </span> -->
                            </div>
                            <div style="font-size:14px; margin-top:4px">
                                <span> 操作系统:{{ item.OS }}</span>
                                <span> 发布时间:{{ item.create_time }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </div>
    </div>
</template>
<style scoped lang='less'>
.commentContentBox {
    //宽度每个各占50%,高度的话用内容拉开
    width: 50%;
    height: 100%;
    overflow: hidden;
    background-color: #E5EAF3;
    border-right: 1px solid #4C4D4F;

    .commentWrap {
        height: 100%;
        overflow: auto;

        .commentArea {
            position: relative;

            .addCommentBtn {
                position: absolute;
                right: 0;
                bottom: -25px;
            }
        }

    }
}
</style>