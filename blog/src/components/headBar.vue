<script setup lang='ts'>
import { onMounted, ref, Ref, setTransitionHooks, vModelCheckbox } from 'vue'
import { useRouter } from 'vue-router'
import { githubUrl } from '../utils/global'
const router = useRouter() //获取路由对象
//页面距离顶端的位置
let scrollY: number = 0
//判断是否需要改变头部导航栏的背景颜色
let changeHeadBgcColor: Ref<boolean> = ref(false)
//判断是否需要出现回到顶部
let backToHead: Ref<boolean> = ref(false)
//写一个监听导航栏变化的函数
window.addEventListener('scroll', () => {
    scrollY = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    if (scrollY < 130) {
        changeHeadBgcColor.value = false
        backToHead.value = false
    }
    else if (scrollY > 130 && scrollY < 800) {
        changeHeadBgcColor.value = true
        backToHead.value = false
    }
    else {
        changeHeadBgcColor.value = true
        backToHead.value = true
    }
}, true)
//回到顶部的动画
function backToHeadFun() {
    let timer = setInterval(function () {
        //减小的速度
        let speed: number = Math.floor(scrollY / 7) > 10 ? Math.floor(scrollY / 9) : 10
        document.documentElement.scrollTop = scrollY - speed
        scrollY = document.documentElement.scrollTop
        if (scrollY == 0) {
            clearInterval(timer)
        }
    }, 10)
}
//切换黑夜模式
const changeHtmlBgcColor = () => {
    if (document.documentElement.className == 'light') { //如果是光明模式改成黑夜
        document.documentElement.className = 'dark'
    }
    else {
        document.documentElement.className = 'light'
    }
}
//去github
const goGitHub = () => {
    // router.go()
}

</script>
<template>
    <div class="contentOutBox">
        <div class="contentBox" :class="{ sbgc: !changeHeadBgcColor, abgc: changeHeadBgcColor }">
            <el-tooltip content="Top center" placement="top">
                <div class="LOGO headBasicHead">
                    <RouterLink :to="{name:'home'}">HOME</RouterLink>
                </div>
            </el-tooltip>
            <div class="flex-grow"></div>
            <div class="Article headBasicHead">
                <RouterLink :to="{name:'Article'}">Article</RouterLink>
            </div>
            <div class="About headBasicHead">
                <RouterLink :to="{name:'About'}">About</RouterLink>
            </div>
            <!-- <div class="Project headBasicHead">
                <RouterLink to="Project">Project</RouterLink>
            </div> -->
            <div class="switchIndicatorLable ">
                <label for="cs">
                    <input type="checkbox" id="cs" placeholder="1" @click.stop="changeHtmlBgcColor">
                    <span></span>
                    <i class="indicator"></i>
                </label>
            </div>
            <div class="github">
                <a :href="githubUrl">

                </a>
            </div>
            <div class="changeLan">

            </div>
            <div class="vx">
                <!--TODO:能不能设置对话框的小三角？-->
                <img src="../../public/vx.svg" alt="#" width="100">
            </div>
        </div>
    </div>
    <div class="backToHead" @click="backToHeadFun" v-show="backToHead">
        <img src="../../public/jiantoutop.svg" alt="" width="40">
    </div>
</template>
<style scoped lang='less'>
.sbgc {
    //普通情况下头部导航栏的背景颜色
    background-color: var(--hd-s-bgc);
}

.abgc {
    //运动情况下头部导航栏的背景颜色
    background-color: var(--hd-a-bgc);
}

.contentOutBox {
    //消除 fixed的影响(对flex、对布局)
    // box-sizing: border-box;
    //如果使用了vw，会让底部有滚动条
    width: 100%;
    height: 60px;
    color: var(--com-t1-color) !important;

    .contentBox {
        position: fixed;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid green;
        display: flex;
        align-items: center;

        //router-link样式
        a {
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 40px;
        }

        //公共div样式
        .headBasicHead {
            width: 80px;
            height: 40px;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;

            &:hover {
                background-color: var(--hd-ah-bgc);
            }
        }

        .flex-grow {
            flex-grow: 1;
        }

        //开关的样式
        .switchIndicatorLable {
            //黑夜模式按钮的样式 
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 5px 15px;
            position: relative;

            & input {
                display: none;
            }

            & span {
                //span为开关的样式
                position: relative;
                display: block;
                cursor: pointer;
                width: var(--cs-l-width);
                height: var(--cs-l-height);
                border-radius: var(--cs-l-height);
                background-color: var(--cs-s-bgc);
            }

            .indicator {
                //i作为开关内的小球
                position: absolute;
                cursor: pointer;
                left: 5px;
                top: 5px;
                width: var(--cs-i-width);
                height: var(--cs-i-height);
                border-radius: 50%;
                background: var(--cs-i-bgc);
                transition: .5s;
            }

            & input:checked~.indicator {
                left: calc(7px + (var(--cs-l-width) - var(--cs-l-height)));
            }
        }

        .github {
            margin-right: 5px;
            display: flex;
            align-items: center;
            width: 20px;
            height: 20px;
            background-image: url("../../public/github.svg");
            background-size: cover;
        }

        .vx {
            width: 20px;
            height: 20px;
            position: relative;
            background-image: url('../../public/vx.svg');
            background-size: cover;

            &:hover>img {
                display: block;
            }

            img {
                margin-right: 0;
                display: block;
                position: absolute;
                top: 20px;
                right: -30px;
                pointer-events: none;
                display: none;
            }
        }

        //最后一个div设置margin-right
        &>div:nth-last-child(1) {
            margin-right: 20px;
        }
    }
}



.backToHead {
    width: 40px;
    height: 40px;
    // background-color: pink;
    position: fixed;
    bottom: 50px;
    right: 30px;

    img {
        //可以使用filter修改图片的颜色？
    }
}
</style>