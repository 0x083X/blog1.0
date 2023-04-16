<script setup lang='ts'>
import leftSaber from '../components/leftSaber.vue'
import headerBar from '../components/headerBar.vue';

</script>
<template>
    <div class="FR wrap">
        <leftSaber></leftSaber>
        <div class="FC box">
            <!--TODO:头部区域(工作台?)用keep-alive缓存？-->
            <headerBar></headerBar>
            <RouterView v-slot="{route,Component}">
                <KeepAlive include="Article">
                    <component :is="Component"></component>
                </KeepAlive>
            </RouterView>
        </div>
    </div>
</template>
<style scoped lang='less'>
.wrap {
    height: 100vh;

    .box {
        margin-left: 100px; //消除fixed造成的影响
        width: 100%; //FC的话纵轴拉伸了，横轴也要拉伸
    }
}
</style>