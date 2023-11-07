<template>
  <div class="todos-container">
    <div class="top-container">
      <div class="input-container">
        <div class="text-input">
          <el-input type="text" v-model="text" clearable :placeholder="$store.state.SentenceAbout.sentence"
            @keydown.native.enter="addtodo">
          </el-input>
        </div>
        <div class="add-btn">
          <!-- 侧边栏提示 需要plain 属性 -->
          <el-button plain type="success" @click="addtodo">添加到备忘录</el-button>
        </div>
      </div>
    </div>
    <div class="body-container">
      <div class="edit-area">
        <!-- @change checkBox 属性变化时函数执行 -->
        <!-- 全选按钮 -->
        <el-checkbox title="全部选中&全部取消" class="select-all" type="checkbox" v-model="checkedAll" @change="togglechecked"
          v-show="todos.length" />
        <!-- 全删按钮 -->
        <el-button title="删除所选" class="el-icon-delete del-selected" size="small" v-show="todos.length"
          @click="removeAll" />
      </div>
      <div class="todo-list">
        <ul>
          <transition-group name="actions" appear tag="li">
            <!-- 遍历数组 -->
            <li role="none" class="list" v-for="todo of todos" :key="todo.id" :title="todo.text"
              :class="{ finish: todo.done }">
              <div class="check-state">
                <el-checkbox type="checkbox" v-model="todo.done" title="done?" />
              </div>
              <div class="text-space" :class="{ active: todo.done }">
                <slot name="todos" :todo="todo">{{ todo.text }}</slot>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBack } from '../../utils/MessageBack'

export default {
  name: 'MyTodos',
  data () {
    return {
      id: '',
      text: '',
      checkedAll: false,
      selectState: [],
      todos: [],
      doneTodos: [],
      sentence: ''
    }
  },
  methods: {
    addtodo () {
      if (this.text.length < 2) {
        // 侧栏提示
        MessageBack.notificationBack("干什么呀", "太敷衍也不行哦", 'error', 80)
      } else {
        this.todos.push({ id: this.id++, text: this.text, done: false })
        this.text = ''
        MessageBack.notificationBack("添加成功", "欢迎新成员", 'success', 80)
      }
    },
    // 全选反选
    togglechecked () {
      this.todos.forEach(todo => {
        todo.done = this.checkedAll
      })
    },
    // 删除所选
    removeAll () {
      if (this.selectState.length) {
        this.$confirm('确定要删除所选吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 将所有选中的todo过滤掉
          this.todos = this.todos.filter(t => t.done == false)
          setTimeout(() => {
            MessageBack.notificationBack("往事", "随风而去吧", 'success', 80)
          }, 500);
        }).catch(() => {
          MessageBack.notificationBack("凡事", "三思而后行", 'info', 80)
        });
      } else {
        MessageBack.notificationBack("嗯?", "没决定好要放下什么吗", 'error', 80)
      }
    }
  },
  mounted () {
    // 获取本地todos列表
    if (this.todos) {
      this.todos = JSON.parse(localStorage.getItem('todos-save')) || []
    }
  },
  watch: {
    // 监听todos变化 及时保存
    todos: {
      // 开启deep 监听深层属性：这里是指checkbox的checked属性
      deep: true,
      // handeler 处理变化值
      handler (newvalue) {
        localStorage.setItem('todos-save', JSON.stringify(newvalue))
        this.selectState = this.todos.filter(todo => { return todo.done })
        this.checkedAll = (this.selectState.length === this.todos.length)
        this.id = this.todos.length
      },
    },
  }
}
</script>

<style scoped>
.todos-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.todos-container ::-webkit-scrollbar {
  width: 0;
}

.top-container {
  position: relative;
  width: 60%;
  height: 25%;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.input-container {
  position: relative;
  top: 10%;
  width: 40%;
}

.text-input {
  transition: all 0.3s;
  margin-bottom: 10px;
}

.text-input:hover {
  transform: scale(1.1);
}

.text-input ::placeholder {
  color: rgb(176, 173, 173);
}

.input-container .add-btn {
  display: flex;
  justify-content: center;
  width: 100%;
}

.add-btn .el-button {
  width: 50%;
  min-width: 170px;
  transition: all 0.6s ease-in-out;
}

.add-btn .el-button:hover {
  background: #1346ee;
}

.body-container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60%;
}

.edit-area {
  position: absolute;
  top: -18px;
  width: 46%;
  min-width: 425px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.select-all {
  width: 50px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.del-selected {
  font-size: 1.2em;
  color: aliceblue;
  border: none;
  background: transparent;
}

.todo-list {
  position: relative;
  top: 30px;
  width: 45%;
  min-width: 425px;
  text-align: left;
  overflow: auto;
  padding-right: 6px;
}

.todo-list::-webkit-scrollbar {
  width: 2px;
}

.text-space {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list {
  position: relative;
  display: flex;
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
  border: none;
  transition: all 0.6s ease-in-out;
  border-radius: 2px;
  color: rgb(150, 169, 168);
  background-color: rgb(58, 68, 86);
}

.list:hover {
  color: #fff;
  background-color: #1f74be;
}

.check-state {
  margin: 0 10px;
}

.actions-enter,
.actions-leave-to {
  opacity: 0;
}

.actions-enter-active,
.actions.leave-active {
  transition: all .6s ease-in-out;
}

.finish {
  background-color: #605f5f;
}

.finish:hover {
  background: #605f5f;
}

.active {
  text-decoration: line-through;
}
</style>