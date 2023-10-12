<template>
  <div class='mainContent'>
    <div class="headContent">
      <h1>瞎搞的项目</h1>
    </div>
    <div class="bodyContent">
      <!-- 列表图片 鼠标放上去会出现详细信息 同时也能点击 定位到特定位置 -->
      <h1>这部分介绍项目过程和心得</h1>
      <div class="imgbox">
        <ul>
          <li v-for="(img, index) in  imgdata " :key="index" class="imglist">
            <div class="image">
              <img :src="img.src" alt="err">
            </div>

            <div class="details">
              <h3>{{ img.text }}</h3>
              <p>{{ img.describe }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footerContent">
      <!-- 图标啥的加上美观 -->
      <h1>这部分介绍github地址 微信 qq等</h1>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import imageurl from '@/assets/image/wallpaper.jpg'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      imgdata: [
        { id: 1, src: imageurl, text: '这是一幅图', describe: '感谢大家能够来参观我的网站!', address: 'todolist' },
        { id: 1, src: imageurl, text: '这是一幅图', describe: '感谢大家能够来参观我的网站!', address: 'todolist' },
        { id: 1, src: imageurl, text: '这是一幅图', describe: '感谢大家能够来参观我的网站!', address: 'todolist' },
        { id: 1, src: imageurl, text: '这是一幅图', describe: '感谢大家能够来参观我的网站!', address: 'todolist' },
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created () {

  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能,这个函数会触发
}
</script>

<style scoped>
h1,
h3 {
  text-align: center;
  color: aliceblue;
}

p {
  color: azure;
  font-size: 1.1em;
  font-weight: 400;
}

.mainContent {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.headContent {
  width: 100%;
  position: relative;
  flex: 1;
}

.bodyContent {
  position: relative;
  width: 100%;
  flex: 2;
}

.imgbox {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  white-space: nowrap;
}

.imglist {
  position: relative;
  width: 220px;
  height: 220px;
  display: inline-block;
  margin: 10px;
  list-style: none;
  border-radius: 30px;
  overflow: hidden;
  transition: all .4s;
}

.imglist:hover{
  transform: translateY(-5px);
}
.imglist:hover::after {
  backdrop-filter: blur(1px);
}

.imglist::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: linear 0.3s;
}

.image {
  position: relative;
  width: 100%;
  height: 100%;
}

.image img {
  position: relative;
  width: 100%;
  height: 100%;
}

.details {
  position: absolute;
  z-index: 44;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: all 0.5s;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(200px);
}

.imglist:hover .details {
  transform: translateY(0);
  opacity: 1;
}

.footerContent {
  flex: 1;
  position: relative;
  width: 100%;
}
</style>