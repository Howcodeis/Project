<template>
  <div class="tipsbox">
    <div class="toparea">
      <div class="putin">
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
    <div class="record">
      <div class="stats1">
        <span>已完成:{{ doneTodos.length }}</span>
      </div>
      <div class="stats2">
        <span>{{ todos.length-doneTodos.length }}:未完成</span>
      </div>
    </div>
    <div class="contentbox">
      <div class="notfinish">
        <ul>
          <!-- 遍历数组 -->
          <li
            v-for="todo,index in todos"
            :key="index"
            :title="todo.text"
            :class="{complete: todo.done , notcomplete:!todo.done}"
          >
            <!-- @change checkbox 属性变化时函数执行 -->
            <el-checkbox class="checkbox" type="checkbox" v-model="todo.done" title="done?" />
            <!-- <span class="space" :class="{ active: todo.done }">
              {{
              todo.text
              }}
            </span>-->
            <el-button plain class="del" @click="deltodo(todo)" round size="small">
              <i class="el-icon-delete" title="delete"></i>
            </el-button>
            <slot name="todos" :todo="todo">{{ todo.text }}</slot>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'MyTodos',
  data () {
    return {
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
        this.todos.push({ text: this.text, done: false })
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
.complete {
  position: relative;
}
.complete:hover {
  background: #a2e97f;
}

.notcomplete {
  background: #929591;
}
.notcomplete:hover {
  background: #515350;
}

li {
  display: flex;
  align-items: center;
  position: relative;
  list-style: none;
  line-height: 30px;
  overflow: hidden;
  border: none;
  border-bottom: 1px #fff solid;
  transition: all 0.6s ease-in-out;
  border-radius: 2px;
  color: #fff;
  background-color: gray;
}
li:hover .del {
  display: inline-block;
  color: #fff;
}

.del {
  display: none;
  position: absolute;
  right: 2%;
  cursor: pointer;
  user-select: none;
  background: transparent;
  border: none;
}
.del:hover {
  background: transparent;
}
.active {
  text-decoration: line-through;
}
.tipsbox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  text-align: center;
}
.toparea {
  position: absolute;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.putin {
  position: relative;
  top: 10%;
  width: 45%;
}
.putin .el-input {
  margin-bottom: 10px;
}
.putin .el-input ::placeholder {
  color: rgb(127, 127, 127);
}
.putin .el-button {
  width: 25%;
  min-width: 170px;
  transition: all 0.6s ease-in-out;
}
.putin .el-button:hover {
  background: #1346ee;
}

.record {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  top: 25%;
  width: 100%;
  height: 5%;
  color: #000;
}
.stats1 ::before {
  font-family: element-icons;
  content: "\e79c";
}
.stats2 ::after {
  font-family: element-icons;
  content: "\e79d";
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

.notfinish {
  position: relative;
  width: 45%;
  min-width: 425px;
  text-align: left;
}
.finish {
  position: relative;
  width: 45%;
  text-align: left;
  line-height: 50px;
}
.space {
  height: 30px;
  margin-left: 15px;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footer {
  background: #7b7979;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3%;
  user-select: none;
}
.checkbox {
  margin-left: 5px;
}
</style>