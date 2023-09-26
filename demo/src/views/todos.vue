<template>
  <div class="box">
    <div class="topcontent">
      <div class="inputcontent">
        <el-input
          type="text"
          v-model="text"
          clearable
          placeholder="写下你想做的事吧!!!"
          @keydown.native.enter="addtodo"
        ></el-input>
        <!-- 侧边栏提示 需要plain 属性 -->
        <el-button plain type="success" @click="addtodo">添加到备忘录</el-button>
      </div>
    </div>
    <div class="contentbox">
      <div class="todobox">
        <ul>
          <transition-group name="animateforli" appear tag="ul">
            <!-- 遍历数组 -->
            <li
              class="list"
              v-for="todo in todos"
              :key="todo.id"
              :title="todo.text"
              :class="{finish: todo.done}"
            >
              <!-- @change checkbox 属性变化时函数执行 -->
              <el-checkbox class="checkbox" type="checkbox" v-model="todo.done" title="done?" />
              <el-button
                plain
                class="del el-icon-delete"
                @click.prevent="deltodo(todo)"
                round
                size="small"
                title="删除"
              >
                <!-- <i class="" title="delete"></i> -->
              </el-button>
              <div class="textspace" :class="{active : todo.done}">
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
export default {
  name: 'MyTodos',
  data () {
    return {
      id: 0,
      text: '',
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
  },
  mounted () {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  },
  watch: {
    todos: {
      deep: true,
      handler (newvalue) {
        localStorage.setItem('todos', JSON.stringify(newvalue))
        this.doneTodos = this.todos.filter(t => t.done)
      }
    },
  }
}
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  text-align: center;
}
.topcontent {
  position: absolute;
  width: 100%;
  height: 25%;
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
  position: absolute;
  display: flex;
  justify-content: center;
  top: 30%;
  width: 100%;
  height: 60%;
  overflow: scroll;
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
  display: flex;
  align-items: center;
  position: relative;
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
  background-color: transparent;
  transform: scale(1);
}
.del {
  position: absolute;
  right: 2%;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  color: #fff;
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