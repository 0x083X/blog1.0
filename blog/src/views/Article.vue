<script setup lang='ts'>
import headBar from '../components/headBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from '../service/axios'
type ArticleData = {
    article_id: string,
    sort_id: number,
    sort: string,
    title: string,
    content: string,
    status: string,
    update_time: Date,
    create_time: Date,
    bgcImg: string
}
const router = useRouter()
const loading = ref(true) // => 控制骨屏架
const articleData = ref<ArticleData[]>([]) // => 文章数据
const GetArticle = async () => { // => 向后台接口获取文章数据函数
    return await axios.get('/api/article', { params: { keyWord: '' } }).then(res => {
        return res?.data?.data?.data
    })
}
const init = async () => { // =>初始化函数
    articleData.value = await GetArticle() // => 阻塞,当获取到值的时候在进行下面的赋值操作
    loading.value = !loading.value
}
init() // => 页面一加载就重新申请文章数据
const getArticleDetail = (article_id:string) => { //看文章数据
    router.push(`/Article/${article_id}`)
    // const articleDetail:ArticleData =  await axios.get(`/api/article/${article_id}`).then(res=>res.data.data)
}
</script>
<template>
    <headBar></headBar>
    <!-- <button @click="loading = !loading">点击</button> -->
    <div class="wrap">
        <el-skeleton style="width: 50vw" :loading="loading" animated :throttle="500" :count="2">
            <template #template>
                <el-skeleton-item variant="image" style="width: 50vw; height: 35vh" />
                <div style="padding: 14px">
                    <el-skeleton-item variant="h3" style="width: 50%" />
                    <div
                        style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height:16px;">
                        <el-skeleton-item variant="text" style="margin-right: 16px" />
                        <el-skeleton-item variant="text" style="width: 30%" />
                    </div>
                </div>
                <!-- </div> -->
            </template>
            <template #default>
                <div v-for="item in articleData" :key="item.article_id"
                    style="width: 40%; border: 1px solid #aaa; margin: 20px 0; z-index: 1; display: flex;"
                    class="article-contentBox" @click="getArticleDetail(item.article_id)">
                    <div style="width:100%;">
                        <img :src="item.bgcImg" class="image" style="width: 100%; height: 50vh" />
                        <h3 style="width:fit-content; margin-top:15px;" class="title">{{ item.title }}</h3>
                        <div
                            style="width: 30%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; height: 20px;">
                            {{ item.content }}</div>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
<style scoped lang='less'>
/**
    * 使用骨屏架
    */
.wrap {
    display: flex;
    margin: 10px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    .article-contentBox {
        cursor: pointer;
        &:hover .title {
            color: blue;
            &:after {
                width: 100%;
                left: 0;
            }
        }

    }

    .title {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background-color: blue;
            transition: all 0.5s;
        }
    }
}</style>