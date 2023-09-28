<template>
  <div class="box">
    <div class="topcontent">
      <div class="inputcontent">
        <el-input type="text" v-model="text" clearable placeholder="写下你想做的事吧!!!"
          @keydown.native.enter="addtodo"></el-input>
        <!-- 侧边栏提示 需要plain 属性 -->
        <el-button plain type="success" @click="addtodo">添加到备忘录</el-button>
      </div>
    </div>
    <div class="contentbox">
      <div class="todobox">
        <ul>
          <li style="list-style: none; display: flex; justify-content: space-between;" v-show="todos.length">
            <!-- @change checkbox 属性变化时函数执行 -->
            <el-checkbox type="checkbox" v-model="checkedAll" @change="togglechecked" style="margin-bottom: 10px;" />
            <el-button class="el-icon-delete" size="small" v-show="todos.length" @click="removeAll"
              style="background: transparent; border:none; color:aliceblue"></el-button>
          </li>
          <transition-group name="animateforli" appear tag="ul">
            <!-- 遍历数组 -->
            <li class="list" v-for="todo in todos" :key="todo.id" :title="todo.text" :class="{ finish: todo.done }">
              <el-checkbox class="checkbox" @change="singlecheck" type="checkbox" v-model="todo.done" title="done?" />
              <el-button plain class="del el-icon-delete" @click.stop="deltodo(todo)" round size="small"
                title="删除"></el-button>
              <div class="textspace" :class="{ active: todo.done }">
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
import { Message } from 'element-ui'

export default {
  name: 'MyTodos',
  inject: ['reload'],
  data () {
    return {
      id: '',
      text: '',
      checkedAll: false,
      todos: [],
      doneTodos: []
    }
  },
  methods: {
    addtodo () {
      if (this.text.length < 2) {
        // 侧栏提示
        this.$notify({
          message: "做事绝不能敷衍",
          type: 'error',
          duration: 1000,
          showClose: false,
          offset: 80
        })
      } else {
        this.todos.push({ id: this.id++, text: this.text, done: false })
        this.text = ''
        Message.success('添加成功')
      }
    },
    deltodo (todo) {
      //弹框确认
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // filter 数组过滤
        this.todos = this.todos.filter(t => t != todo)
        this.$notify({
          type: 'success', message: '删除成功', duration: 1000, showClose: false,
          offset: 80
        })
      }).catch(() => {
        this.$notify({
          type: 'error', message: '已取消删除', duration: 1000, showClose: false,
          offset: 80
        })
      })

    },
    // 全选反选
    togglechecked () {
      this.todos.forEach(todo => {
        todo.done = this.checkedAll
      })
    },
    singlecheck () {
      const SelectState = this.todos.filter(todo => { return todo.done })
      this.checkedAll = (SelectState.length === this.todos.length)
    },
    // 删除所选
    removeAll () {
      const SelectState = this.todos.filter(todo => { return todo.done })
      if (SelectState.length) {
        this.$confirm('确定要删除所选吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 将所有选中的todo过滤掉
          this.todos = this.todos.filter(t => t.done != true)
          // 重置全选按钮
          this.checkedAll = false
          setTimeout(() => {
            Message.success('删除成功')
          }, 500);
        }).catch(() => {
          Message.info('取消删除')
        });
      } else {
        Message.warning('暂未选择')
      }
    }
  },
  mounted () {
    // 获取本地todos列表
    if (this.todos) {
      this.todos = JSON.parse(localStorage.getItem('todos')) || []
    }
    this.singlecheck()
  },
  watch: {
    // 监听todos变化 及时保存
    todos: {
      // 开启deep 监听深层属性：这里是指checkbox的checked属性
      deep: true,
      // handeler 处理变化值
      handler (newvalue) {
        localStorage.setItem('todos', JSON.stringify(newvalue))
      },
    },

  }
}
</script>

<style scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
}

.box ::-webkit-scrollbar {
  width: 0;
}

.topcontent {
  position: relative;
  width: 100%;
  height: 25%;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputcontent {
  position: relative;
  top: 10%;
  width: 45%;
}

.inputcontent .el-input {
  transition: all 0.3s;
  margin-bottom: 10px;
}

.inputcontent .el-input:hover {
  transform: scale(1.1);
}

.inputcontent .el-input ::placeholder {
  color: rgb(176, 173, 173);
}

.inputcontent .el-input :focus::placeholder {
  color: transparent;
}

.inputcontent .el-button {
  width: 25%;
  min-width: 170px;
  transition: all 0.6s ease-in-out;
}

.inputcontent .el-button:hover {
  background: #1346ee;
}

.contentbox {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60%;
}

.todobox {
  position: relative;
  width: 45%;
  min-width: 425px;
  text-align: left;
}

.textspace {
  width: 330px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.checkbox {
  margin: 0 10px;
}

.list {
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
  line-height: 40px;
  overflow: hidden;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px #fff solid;
  transition: all 0.6s ease-in-out;
  border-radius: 2px;
  color: #fff;
  background-color: rgb(58, 68, 86);
}

.list:hover {
  background-color: #1f74be;
}

.list:hover .del {
  background: transparent;
  transform: scale(1);
  color: black;
}

.del {
  position: absolute;
  right: 2%;
  cursor: pointer;
  user-select: none;
  border: none;
  transform: scale(0);
  transition: all 0.3s;
}

.animateforli-enter,
.animateforli.leave-to {
  transform: translateX(300px);
}

.animateforli-enter-active,
.animateforli.leave-active {
  transition: all 0.3s ease;
}

.finish {
  background-color: #605f5f;
}

.finish:hover {
  background: #a2e97f;
}

.active {
  text-decoration: line-through;
}
</style>