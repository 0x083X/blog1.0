<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
const router = useRouter()
const route = useRoute()
const t = ref<number>()
t.value = new Date().getTime()
const ArticleURL = reactive({
    addArticle : '/home/Article' , 
    articleDetail : '/redirect?path=/home/Article'
}) // => 写文章的routerlink的指向问题
</script>
<template>
    <!--route.query.article_id == undefined ? ArticleURL.addArticle : ArticleURL.articleDetail-->
    <div class="FC wrap"> <!--/redirect?path=/home/Article-->
        <div class="FR ArticleButton findArticle">
            <RouterLink :to="route.query.article_id == undefined ? ArticleURL.addArticle : ArticleURL.articleDetail">写文章</RouterLink>
        </div>
        <div class="FR ArticleButton updateArticle">
            <RouterLink to="/home/updateArticle">修改文章</RouterLink>
        </div>
    </div>
</template>
<style scoped lang='less'>
.wrap {
    height: 100vh;
    width: 100px;
    border-right: 1px solid #aaa;
    justify-content: space-around;
    align-items: center;
    position: fixed;

    //按钮的公共样式
    .ArticleButton {
        //内容撑开宽度，高度自定义
        height: 35px;
        justify-content: center;
        align-items: center;
        //为下划线服务
        position: relative;

        &::after {
            transition: all 0.5s ease;
            position: absolute;
            content: '';
            background-color: #4285f4;
            bottom: -2px;
            width: 0;
            height: 2px;
        }

        //鼠标移上去出现下划线有transition的效果
        &:hover:after {
            width: 100%;
            left: 0;
            right: 0;
        }
    }
}
</style>