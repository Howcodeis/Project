//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // 模块化
    somethingAbout: {
      // 开启命名空间
      namespaced: true,
      state: {
        data: ''
      },
      actions: {
        setdata (context, value) {
          // 对userinfo进行操作
          // 传递给mutations处理
          context.commit('savesomething', value)
        }
      },
      mutations: {
        savesomething (state, value) {
          // mutations 处理完给state保管
          state.data = value
        }
      },
      getters: {
        // 返回处理过后的数据
      }
    },
    // 名句管理
    SentenceAbout: {
      namespaced: true,
      state: {
        sentence: '',
      },
      mutations: {
        setSentence (state, value) {
          state.sentence = value
        }
      },
    }
  }
})


// 暴露store
export default store
