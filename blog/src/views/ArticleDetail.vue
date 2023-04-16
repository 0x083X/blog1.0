<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import headBar from '../components/headBar.vue';
import axios from '../service/axios'
import {marked} from 'marked'
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
const route = useRoute()
const content = ref<string>("")
const articleDetail = ref<ArticleData>()
const getArticleDetail = async () => { // =>获取文章信息   
    articleDetail.value = await axios.get(`/api/article/${route.params.id}`).then(res => res.data.data)
    content.value = marked.parse(articleDetail.value.content); // => 第三方库来将md转换成html
}
const init = () => { // => 初始化函数
    getArticleDetail()
}
init()

</script>
<!--TODO:ERROR!-->
<!--TODO:图片太大了用canvas压缩-->
<template>
    <headBar></headBar>
    <span class="back" @click="router.go(-1)">返回</span>   
    <div class="title">标题: {{ articleDetail?.title }}</div>
    <div class="tags">Tags: {{ articleDetail.sort }}</div>
    <div>文章内容:</div>
    <div class="content" v-html="content"></div>
</template>

<style scoped lang="less">
.back {
    cursor: pointer;

    &:hover {
        color: red;
    }
}
.title,
.tags  {
    margin: 15px 0 ;
}
</style>