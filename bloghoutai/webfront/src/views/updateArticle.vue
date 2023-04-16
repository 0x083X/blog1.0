<script setup lang='ts'>
import { defineAsyncComponent, ref, onActivated} from 'vue'
import skeleton from '../components/skeleton.vue';
const SyncVue = defineAsyncComponent({
    // 加载函数
    loader: () => import('../components/sync.vue'),
    // 加载异步组件时使用的组件
    loadingComponent: skeleton,
    // 展示加载组件前的延迟时间，默认为 200ms
    delay: 20000,
    // 加载失败后展示的组件
    // errorComponent: ErrorComponent,
    // 如果提供了一个 timeout 时间限制，并超时了
    // 也会显示这里配置的报错组件，默认值是：Infinity
    timeout: 3000
}) //导入异步组件
</script>
<template>
    <!--TODO:使用骨屏架展示数据-->
    <!-- <skeleton></skeleton> -->
    <Suspense>
        <template #default>
            <SyncVue></SyncVue>
        </template>
        <template #fallback>
            <skeleton></skeleton>
        </template>
    </Suspense>
</template>
<style scoped lang='less'></style>