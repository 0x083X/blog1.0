<!--文章的信息-->
<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../server/axios'
//TODO: 给页面的加载添加settimeout，让他加载的不要这么快
type DataKeyWord = {
    keyWord: string
}
type ListData = {
    article_id: string,
    bgcImg: string,
    content: string,
    create_time: Date,
    update_time: Date,
    sort: string,
    sort_id: number,
    status: number,
    title: string
}
const search = ref<DataKeyWord>({ //用keyWord搜索文章
    keyWord: ''
})
const listData = ref<ListData[]>([])
const init = async () => { //初始化函数,获取列表数据
    let data
    await axios.get('/article', { params: search.value }).then(res => {
        data = res.data.data.data //向服务器端获取数据
    })
    return data == undefined ? [] : data
}
listData.value = await init() 
const router = useRouter() //创造一个路由
const updateArticleDate = (item:ListData) => { //跳转到修改对应文章内容的页面的函数
    router.push({
        path : '/redirect',
        query : {
            path : '/home/Article',
            article_id : item.article_id
        }
    }) //跳转到对应的articleDetail组件
}
</script>
<template>
    <div class="FC wrap">
        <div class="FC contentBox" v-for="(item, index) in listData" :key="item.article_id" @click="updateArticleDate(item)">
            <div class="pic"><img :src="item.bgcImg" alt=""></div>
            <div class="title">{{ item.title }}</div>
            <div class="content">{{ item.content }}</div>
        </div>
    </div>
</template>
<style scoped lang='less'>
.wrap {
    width: 100%;
    justify-content: space-around;
    align-items: center;

    .contentBox {
        cursor: pointer;
        width: 80%;
        height: 400px;
        border: 1px solid #aaa;
        margin-bottom: 20px;

        .pic {
            width: 100%;
            height: 300px;

            & img {
                width: 100%;
                height: 100%;
            }
        }

        .title {
            margin: 20px 10px;
            width: 50%;
            height: 20px;
        }

        .content {
            width: 80%;
            height: 20px;
            overflow: hidden;
        }
    }
}
</style>