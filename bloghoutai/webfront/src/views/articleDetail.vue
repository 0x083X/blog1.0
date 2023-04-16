<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../server/axios'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const router = useRouter()
const route = useRoute()
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
const listdata = ref<ListData>() //文章数据
const text = ref('') //文章数据
const article_id = route.query.article_id
const init = async () => {
    await axios.get(`/article/${article_id}`).then(res=>{
        listdata.value = res.data.data
        text.value = res.data.data.content
    })
}
init()

</script>
<template>
    
     <MdEditor v-model="text" />
</template>
<style scoped lang='less'></style>