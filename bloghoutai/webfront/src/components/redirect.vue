<script setup lang='ts'>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const query = route.query
const router = useRouter()
let path = query.path
let article_id = query.article_id
console.log("未进入函数------>", path, typeof path)
if (typeof path == 'string') { //如果path不为空
    if (article_id != undefined) {
        router.replace({ //跳转至增加页面的路由，触发reset方法
            path: path,
            query : {
                article_id 
            }
        })
    }
    else {
        router.replace({ //跳转至增加页面的路由，触发reset方法
            path,
        })
    }
}

</script>
<template></template>
