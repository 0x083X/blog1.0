<!--增加文章和修改文章用一个组件-->
<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref, Directive, DirectiveBinding, onActivated } from 'vue'
import axios from '../server/axios'
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
const router = useRouter()
const route = useRoute()
const query = route.query //查看是否有article_id，用来判断是增加还是修改
const mode: string = query.article_id == undefined ? 'add' : 'edit' //增加还是修改
const buttonValue = ref<string>("上传文章")
const deleteButtonDis = ref<boolean>(false)
const articleTF = ref<boolean>(false) //文章标题是否为空的提示语句
const data = ref<ListData>({ //文章的内容(背景图片、标题、内容等) 默认值
  title: '',
  content: 'Hello World!',
  bgcImg: "http://localhost:3000/1679924159726.png",
  article_id: '0',
  create_time: new Date(),
  update_time: new Date(),
  sort: 'null',
  sort_id: 0,
  status: 0
})
const bgcPic = ref('http://localhost:3000/1679924159726.png') //文章背景图片
//md-editor的函数(增改共用)
const onUploadImg = async (files: Array<File>, callback: Function) => {
  console.log(files)
  const res:any = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);
        axios
          .post('/pic/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );
  console.log(res[0].data.data.path)
  callback(res.map((item:any) => item.data.data.path));
};
const Pic = (e:any) => { //文章背景图片(增改共用)
  const files = Array.from(Object.values(e.srcElement.files), x => x) //将上传图片file从对象转为数组
  onUploadImg(files as Array<File>, (res:any) => {
    bgcPic.value = res[0] //修改文章的背景图片
    data.value.bgcImg = res[0] //修改上传的数据
  })
}
//TODO:类型报错修正
//TODO:error,浏览器路由回退的时候(比如增加文章回退到修改文章的时候，不显示md中不显示修改文章的文章的数据)
const reset = () => { //点击增加文章使用reset重置函数
  console.log("重置------》")
  bgcPic.value = "http://localhost:3000/1679924159726.png" //默认的图片
  data.value.title = ''
  data.value.content = "Hello World!"
  data.value.bgcImg = bgcPic.value
}
const sendOrUpdateArticle = () => { //上传文章(或者修改文章)
  if (mode == 'add') {
    axios.post('/article', data).then(res => {
      //上传成功后重新加载数据
      if (res.data.status == 200) {
        router.replace({
          path: '/redirect',
          query: {
            path: '/home/Article'
          }
        })
      }
    }).catch(err => console.log(err))
  }
  else if (mode == 'edit') {
    const newData = ref({
      bgcImg: bgcPic.value, //图片
      title: data.value.title,
      content: data.value.content,
      sort: data.value.sort
    })
    axios.patch(`/article/${query.article_id}`, newData).then(res => {
      console.log(res.data)
    })
  }
}
const deleteArticle = () => { //删除文章
  const flag: boolean = window.confirm("确定删除吗")
  if (flag == true) { //如果点击确定删除
    axios.delete(`/article/${query.article_id}`).then(res => {
      if (res.data.status == 200) { //如果成功删除
        window.alert("成功删除")
        //跳转到修改页面
        router.replace({
          path: '/home/updateArticle'
        })
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
if (mode == 'edit') { //如果query不是undefined或者null的话
  buttonValue.value = "修改文章"
  deleteButtonDis.value = true
  articleTF.value = false
  axios.get(`/article/${query.article_id}`).then((res) => { //获取文章数据
    data.value.title = res.data.data.title
    data.value.bgcImg = res.data.data.bgcImg
    bgcPic.value = data.value.bgcImg as string
    data.value.content = res.data.data.content
    data.value.sort = res.data.data.sort
    data.value.sort_id = res.data.data.sort_id
    const Tags = data.value.sort.split(' ')
    if (Tags.length != 1 || Tags[0] != 'null') { 
      const main = document.querySelector('.main')
      for (const item of Tags) { // => 创建相应的tags
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'checkBox'
        checkbox.checked = true
        const span = document.createElement('span')
        span.innerText = item
        span.className = 'tag'
        main?.appendChild(checkbox)
        main?.appendChild(span)
      }
    }
  })
}
else if (mode == 'add') { //如果query为undefined或者为null的话，就是写文章的话
  buttonValue.value = "增加文章"
  deleteButtonDis.value = false
  articleTF.value = true
  reset()
}

//判断标题是否为空(防抖)
let timer: ReturnType<typeof setTimeout> | null = null
const vCheckIsEmpty: Directive = (el: HTMLInputElement, binding: DirectiveBinding) => { //自定义指令
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (el.value) {
      articleTF.value = false
    }
    else {
      articleTF.value = true
    }
  }, 500)
}


/**
 * dialog对话框，选择文章的tag
 */
const tagdata = ref<string[] | null | undefined>([]) // => 页面上展示的tags
const dialogTF = ref<boolean>(false)
const addTag = () => {  // => 增加tag的方法
  const main = document.querySelector('.main')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.className = 'checkBox'
  const input = document.createElement('input')
  input.type = 'text'
  input.setAttribute('placeholder', "请在这输入数据")
  input.maxLength = 10 // =>设置input[type='text']的最大长度
  input.className = 'tag'
  main?.appendChild(checkbox)
  main?.appendChild(input)
  const tags = document.querySelectorAll('input[type="text"].tag') // =>收集所有tag
  const checkBoxs = document.querySelectorAll('input[type="checkbox"].checkBox'); // => 收集所有的checkBox
  (tags[tags.length - 1] as HTMLInputElement).focus() // => 聚焦新建的input[type='text']
  function addOrDelete(this: any) {
    if (this.value == '') { // => 如果没有填写tag的名字  
      tags[tags.length - 1].remove() // => 删除对应的tags和checkbox
      checkBoxs[checkBoxs.length - 1].remove()
    }
    else if (this.value != '') { // => 如果填写的tag名称
      const span = document.createElement('span')
      span.innerText = this.value // => 赋值
      span.className = 'tag'
      this.remove() // => 删除input[type='text']
      main?.appendChild(span) // => 将input[type='text']换成span
    }
  }
  input.addEventListener('blur', addOrDelete)
  input.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') { // => 如果按下了回车键 
      this.blur() // => 手动触发失去焦点事件
    }
  })
}
const confirmTags = () => { // => 点击确认按钮
  const tags = document.querySelectorAll('span.tag')
  const checkBoxs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"].checkBox')
  let Tags = Array.from(checkBoxs).map((item, index) => {
    // TODO: tip 不知道为什么item.checked永真
    if (item.checked == true) {
      return (tags[index] as HTMLInputElement).innerText // => 返回对应的tags
    }
  }) // => 筛选所有checked为true的
  Tags = Tags.filter(item => item != undefined) // 剔除Tags中为undefined的数据
  data.value.sort = Tags.join(' ')
  tagdata.value = Tags as string[]
  dialogTF.value = !dialogTF.value
}
</script>
<template>
  <div class="title">
    <span>请输入文章标题*</span>
    <input type="text" v-model="data.title" v-checkIsEmpty>
    <span v-show="articleTF">文章不能为空</span>
  </div>
  <div class="FC bgcImg">
    <!--TODO:label可以被选择,input的选择区域太大-->
    <label for="bgcPic">请选择你要上传的图片</label>
    <input type="file" id="bgcPic" accept="image/png, image/jpeg" @input="Pic">
    <img :src="bgcPic" alt="" width="400">
  </div>
  <div>
    <span>选择文章的标签</span>
    <button style="margin-left:10px;" @click="dialogTF = !dialogTF">点我</button>
  </div>
  <div>tag:{{ data.sort }}</div>
  <md-editor language="zh-CN" v-model="data.content" @onUploadImg="onUploadImg" />
  <button @click="sendOrUpdateArticle" :disabled="articleTF">{{ buttonValue }}</button>
  <button @click="deleteArticle" v-show="deleteButtonDis">删除文章</button>
  <teleport to="body">
    <!--TODO: add 移动dialog-->
    <div class="dialog" v-show="dialogTF">
      <div class="hidden"></div>
      <div class="FC content">
        <header class="header">
          <span>选择文章的tag,tag长度不超过10</span>
        </header>
        <main class="main">
          <div class="addTag" @click="addTag">点我增加tag</div>
          <!-- <input type="checkbox" id="_1">1
            <label for="_1"></label> -->
          <!-- <div v-for="item in 20">点我增加tag</div> -->
        </main>
        <footer class="FR footer">
          <div @click="confirmTags">确定</div>
          <div @click="dialogTF = !dialogTF">取消</div>
        </footer>
      </div>
    </div>
  </teleport>
</template>
<style scoped lang='less'>
//TODO: 设置标题最多不超过多少，上传背景图片最大的大小

.dialog {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  .hidden {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1)
  }

  .content {
    position: absolute;
    width: 35vw;
    height: 50vh;
    background-color: rgba(101, 101, 200, 1);
    border: 1px solid #000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;

    .header {
      text-align: center;
      border-bottom: 1px solid #000;
    }

    .main {
      overflow: auto;
      flex: 1;

      .addTag {
        cursor: pointer;

        &:hover {
          color: red;
        }
      }

    }

    .footer {
      width: 100%;
      border-top: 1px solid #000;

      &>div {
        cursor: pointer;
        text-align: center;
        width: 50%;

        &:hover {
          background-color: rgb(101, 101, 101);
        }
      }

      &>div:nth-child(1) {
        border-right: 1px solid #000;
      }
    }

  }
}
</style>

