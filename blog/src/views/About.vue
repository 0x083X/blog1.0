<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import headBar from '../components/headBar.vue'
import comment from '../components/comment.vue'
let loading = ref<boolean>(false)
const currentDate = new Date().toDateString()
const activities = [
  {
    content: '版本1',
    timestamp: '2018-04-15',
  },
  {
    content: '版本2',
    timestamp: '2018-04-15',
  },
]

</script>
<template>
    <headBar></headBar>
    <!--
        分成左右两个部分,左边是自由的留言区,右边是个人的信息
    -->
    <div class="contentBox">
        <comment></comment>
        <div class="userInfo">
            <!-- <button @click="loading = !loading">change</button> -->
            <!--使用骨屏架？-->
            <main class="main">
                <el-skeleton :loading="loading" animated>
                    <template #template>
                        <el-skeleton-item variant="h1"
                            style="margin-top: 40px; width: 10vw; margin-left: 20vw; height: 60px;" />
                        <div style="padding: 14px">
                            <el-skeleton-item variant="h3" style="width: 50%" />
                            <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
                                v-for="item in 40" :key="item">
                                <el-skeleton-item variant="text" style="margin-right: 16px" />
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>
                        </div>
                    </template>
                    <template #default>
                        <!--骨屏架显示的内容-->
                        <el-card>
                            <div class="defaultSkeletonOutBox">
                                <h1
                                    style="width:10vw; height: 60px; margin-left: 18vw; margin-top: 30px; text-align: center; line-height: 60px;">
                                    欢迎!</h1>
                                <div class="defaultSkeletonContentBox" style="display:flex; flex-direction: column; ">
                                    <span style="margin-bottom:15px;">welcome to my blog</span>
                                    <el-timeline>
                                        <el-timeline-item v-for="(activity, index) in activities" :key="index"
                                            :timestamp="activity.timestamp">
                                            {{ activity.content }}
                                        </el-timeline-item>
                                    </el-timeline>

                                </div>
                            </div>
                        </el-card>
                    </template>
                </el-skeleton>
            </main>
        </div>
    </div>
</template>
<style scoped lang='less'>
.contentBox {
    display: flex;
    height: calc(100% - 60px); //=>100%是父元素的高度的100%,需要减去headerBar的高度才能撑满页面，不然会出现纵向滚动条

    .userInfo {
        width: 50%;
        height: 100%;
        background-color: #A3A6AD;
        overflow: hidden;

        .main {
            height: 100%;
            overflow: auto;

            .el-card {
                // .defaultSkeletonOutBox {}
            }
        }
    }
}
</style>