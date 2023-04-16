<script setup lang='ts'>
import { ref } from 'vue'
import axios from '../service/axios'
import {startSakura,stopp} from '../assets/yinghua.js'
//导入头部导航栏
import headBar from '../components/headBar.vue'
// import leftBar from '../components/homeLeftBar.vue'
// import Article from '../components/homeArticle.vue'
// import rightBar from '../components/homeRightBar.vue'
const loading = ref<boolean>(true)
const init = () => {
    axios.get('/api/comment').then(res => { // => 假装模拟一个axios请求来模拟loading
            loading.value = false 
            startSakura()
    }).catch(err => console.log(err))
}
init()
</script>
<template>
    <div class="FC homeWrap">
        <!--头部来个固定布局-->
        <headBar></headBar>

        <!--
                    内容部分包括 
                    1. 侧边栏(粘性布局)
                        2. 主题内容(居中)
                        3. 右边内容(个性化(访客信息、人数等))
                    -->
        <!-- <button @click="loading = !loading">change</button> -->
        <div class="FC mainBodyBox">
            <div class="FC bgcContent">
                <header class="header">
                    <img src="https://xusssyyy.github.io/blog/live.jpg" alt="" width="280" style="border-radius:19% 81% 23% 77% / 44% 57% 43% 56%;">
                </header>
                <main class="main" style="padding-top:20px;">
                    <h1 style="font-size: 70px; font-weight: 600;">WELCOME!</h1>
                </main>
                <footer class="footer" style="margin: 20px 0;">
                    <span style="font-size: 30px; font-weight: 500;">nihao</span>
                </footer>
            </div>
            <!-- <leftBar></leftBar>
                        <Article></Article> 
                        <rightBar></rightBar> -->
            <Teleport to="body">
                <Transition name="ss">
                    <div v-if="loading" class="FR welcome">
                        <span>Welcome!!!</span>
                    </div>
                </Transition>
            </Teleport>
        </div>

    </div>
</template>
<style scoped lang='less'>
.homeWrap {
    height: 100%;
}

.mainBodyBox {
    flex: 1; // => 主轴上自适应
    display: flex;
    justify-content: center;
    align-items: center;
    .bgcContent {
        text-align: center;
        width: 800px;
        height: 380px;
        .main {
            flex: 1;
        }
    }
}

.ss-leave-active {
    transition: opacity 0.5s ease;
}

.ss-leave-to {
    opacity: 0;
}

.welcome {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(101, 101, 101, 1);
    justify-content: center;
    align-items: center;
}
</style>