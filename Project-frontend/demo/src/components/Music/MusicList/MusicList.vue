<template>
  <!-- <div class="nothing" v-if="isNothing">
    <div>
      空空如也
    </div>
  </div> -->
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
        <tr v-for="(song, index) in songList" @click="handlerPlaySong(song)" :key="index">
          <td>
            <i class="iconfont icon-aixin1" v-if="song.active" @click.stop="setCollectList('del', song)" />
            <i class="iconfont icon-aixin" v-else @click.stop="setCollectList('add', song)" />
            {{ song.name }}
          </td>
          <td>
            {{ song.artists[0].name }}
          </td>
          <td>
            {{ song.album.name }}
          </td>
          <td>
            {{ timeFormat(song.duration / 1000) }}
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
import musicPlayStore from '@/store/musicSetting'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: { handlerPlaySong: Function },
  data () {
    //这里存放数据
    return {
      isNothing: ''
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapWritableState(musicPlayStore, {
      songList: 'songList',
      collectionList: 'getcollectionList'
    })
  },
  //监控data中的数据变化
  watch: {
    'collectionList': {
      immediate: true,
      handler () {
        this.setCollectStaus(this.songList)
      }
    },
  },
  //方法集合
  methods: {
    ...mapActions(musicPlayStore, {
      timeFormat: 'timeFormat',
      setCollectList: 'setCollectList',
      setCollectStaus: 'setCollectStaus',
      isActive: 'isActive'

    }),
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted () {
  },
}
</script>

<style scoped>
.nothing {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

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
      transition: all .2S;
      user-select: none;

      &:hover {
        background: whitesmoke;
      }
    }

    & tbody td {
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;

      & i {
        color: red;
      }
    }
  }
}
</style>