<template>
  <div class='control-box'>
    <div class="cel" @click="changePlayModel('search')" :class="{ active: isActive }">
      <div class="img">
        <i></i>
      </div>
      <div class="text">
        <span>搜索列表</span>
      </div>
    </div>
    <div class="cel" @click="changePlayModel('collection')" :class="{ active: !isActive }">
      <div class="img">
        <i></i>
      </div>
      <div class="text">
        <span>我的收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'
import musicPlayStore from '@/store/musicSetting'


export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapWritableState(musicPlayStore, {
      isActive: 'isActive'
    })
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapActions(musicPlayStore, {
      changePlayModel: 'changePlayModel'
    })
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
.control-box {
  position: absolute;
  top: 0;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;

  .cel {
    position: relative;
    margin-top: 10px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    transition: all .4s;


    & text,
    i {
      width: 100%;
      height: 100%;

    }


    &::after {
      content: "";
      position: absolute;
      width: 2px;
      height: 100%;
      right: 0;
      bottom: 0;
      border-radius: 5px;
      transition: transform .5s;
      transform: scaleY(0);
      transform-origin: bottom;
      background: var(--deep-blue);
    }

    &:hover::after {
      transform-origin: top;
      transform: scaleY(1);
    }
  }

  .active::after {
    transform: scaleX(1);
    background: var(--deep-blue);
  }

}
</style>