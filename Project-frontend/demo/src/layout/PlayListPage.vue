<template>
  <div class="song-table">
    <table>
      <thead>
        <tr>
          <th style="width: 20vw;">歌曲名</th>
          <th style="width: 20vw;">歌手</th>
          <th style="width: 30vw;">专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="single in musicList" @dblclick="handlerPlaySong(single)" :key="single.id">
          <td>
            {{ single.name }}
          </td>
          <td>
            {{ single.artists[0].name }}
          </td>
          <td>
            {{ single.album.name }}
          </td>
          <td>
            {{ timeFormat(single.duration / 1000) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'
import musicPlayStore from '../store/musicSetting'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: { handlerPlaySong: Function },
  data () {
    //这里存放数据
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapWritableState(musicPlayStore, {
      musicList: 'musicList'
    })
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapActions(musicPlayStore, {
      timeFormat: 'timeFormat'
    })
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted () {

  },
}
</script>

<style scoped>
.song-table {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90%;
  overflow-y: scroll;

  & table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;

    & thead th:not(:nth-child(1)) {
      text-align: left;
    }

    & tbody tr {
      line-height: 30px;

      &:hover {
        background: gray;
      }
    }

    & tbody td {
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
    }
  }
}
</style>