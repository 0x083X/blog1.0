<!--update文章的骨屏架-->
<script setup lang='ts'>

</script>
<template>
    <div class="FC wrap">
        <div class="FC contentBox">
            <div class="pic"></div>
            <div class="title"></div>
            <div class="content"></div>
        </div>
        <div class="FC contentBox">
            <div class="pic"></div>
            <div class="title"></div>
            <div class="content"></div>
        </div>
    </div>
</template>
<style scoped lang='less'>
    .wrap {
        width: 100%;
        height: 100%;
        justify-content: space-around;
        align-items: center;
        .contentBox {
            width: 80%;
            height: 45%;
            border: 1px solid #aaa;
            .pic {
                width: 100%;
                height: 70%;
                background-color: #aaa;
            }
            .title {
                margin: 20px 10px;
                width: 50%;
                height: 8%;
                background: #aaa;
            }
            .content {
                width: 80%;
                height: 8%;
                background-color: #aaa;
            }
        }
    }
</style>