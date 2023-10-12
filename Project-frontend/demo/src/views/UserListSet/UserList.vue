<template>
  <div class="box">
    <div v-if="ownPermission" class="noPermiss">
      <h1>
        <p>抱歉!您当前权限无法查看，请联系管理员！</p>
      </h1>
    </div>
    <div v-else class="dataBox">
      <div class="searchBox">
        <el-input v-model="searchName" placeholder="请输入查询名" clearable />
        <el-select v-model="searchPermissionsName" clearable placeholder="请选择权限名">
          <el-option :value="form.allPermissions[0].permissionsName"></el-option>
          <el-option :value="form.allPermissions[1].permissionsName"></el-option>
          <el-option :value="form.allPermissions[2].permissionsName"></el-option>
        </el-select>
        <el-button type="success" icon="el-icon-search" @keydown.native.enter="searchBtn"
          @click="searchBtn">搜索</el-button>
      </div>
      <el-table :data="filterUserlist.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border
        highlight-current-row lazy>
        <el-table-column prop="date" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="permissionsName" label="权限名称" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.permissionsName === 'admin' ? 'danger' : 'warning'">{{ scope.row.permissionsName
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editRow(scope.row)" type="primary" size="small" circle
              icon="el-icon-edit" />
            <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" size="small" circle
              icon="el-icon-delete" />
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="成员修改" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.rowUser.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <el-select v-model="form.rowUser.permissionsName" placeholder="请选择更改权限">
              <el-option :value="form.allPermissions[0].permissionsName"></el-option>
              <el-option :value="form.allPermissions[1].permissionsName"></el-option>
              <el-option :value="form.allPermissions[2].permissionsName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlerSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, getPermissionsList, setUpdata, delData } from '../../utils/AxiosBack';
export default {
  name: "MyUserinfo",
  inject: ['childrenRouterRefresh'],
  data () {
    return {
      userlist: [],
      filterUserlist: [],
      ownPermission: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        allPermissions: [],
        rowUser: []
      },
      currentPage: 1,
      pageSize: 10,
      total: null,
      searchPermissionsName: '',
      searchName: '',
    }
  },
  methods: {
    // 每一页条数改变时触发 选择一页多少条数据
    handleSizeChange (value) {
      this.currentPage = 1;
      this.pageSize = value
    },
    // 当前页面变化时 跳转其他页面
    handleCurrentChange (value) {
      this.currentPage = value
    },
    searchBtn () {
      // 搜索 模糊查询 
      // 变量searchPermissionsName有值
      if (!this.searchPermissionsName == '') {
        this.filterUserlist = this.userlist.filter(item => item.permissionsName == this.searchPermissionsName)
        // 两个变量都有值
        if (!this.searchName == '') {
          this.filterUserlist = this.userlist.filter(item => item.permissionsName == this.searchPermissionsName && item.username.includes(this.searchName))
        }
      }
      // 变量searchPermissionsName无值
      else {
        this.filterUserlist = this.userlist.filter(item => item.username.includes(this.searchName))
      }
      // 两个变量都没有值的时候 watch 做了
    },
    // 编辑用户列表
    editRow (row) {
      this.form.rowUser = row
      this.dialogFormVisible = true
    },
    // 删除用户列表
    deleteRow (row) {
      this.NProgress.start()
      // 数组过滤
      this.userlist = this.userlist.filter(info => info.userId != row.userId)
      // 后台更新
      delData(row.userId).then((result) => {
        this.$message({
          type: 'success',
          message: result.data.msg,
          duration: 2000,
          showClose: false
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: "服务器断开",
          duration: 2000,
          showClose: false
        })
      });
      this.NProgress.done()
    },
    handlerSubmit () {
      //  选择权限后 this.form.rowUser.权限名 就变了
      const index = this.form.allPermissions.findIndex(item => item.permissionsName === this.form.rowUser.permissionsName)
      const permissionsId = this.form.allPermissions[index].id
      // 动画开始
      this.NProgress.start()
      // 更新数据
      setUpdata(permissionsId, this.form.rowUser.userId, this.form.rowUser.username).then((result) => {
        if (result.data.code == 200) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: result.data.msg,
            showClose: false,
            duration: 2000
          })
        } else {
          this.$message({
            type: 'warning',
            message: result.data.msg,
            showClose: false,
            duration: 2000
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: "服务器断开",
          duration: 2000,
          showClose: false
        })
        // 动画结束
        this.NProgress.done()
      });
    }
  },
  mounted () {
    // 判断是否存在用户列表 不存在就向后端发请求
    if (!this.userlist.length) {
      // 获取权限id
      const { permissionsId } = JSON.parse(localStorage.getItem('userinfo-save'))
      getUserList(permissionsId).then((result) => {
        const { isOwnPermission } = result.data
        // 后端判断是否拥有权限 返回true false
        this.ownPermission = isOwnPermission
        const { userlist } = result.data.data
        // 获取用户列表 并赋值
        this.userlist = userlist
        // 过滤数组赋值
        this.filterUserlist = userlist
        // 总页数赋值
        this.total = userlist.length
      }).catch((err) => {
        console.log(err);
      });
    }
    // 判断是否存在allPermissions 不存在就向后端发请求
    if (!this.form.allPermissions.length) {
      getPermissionsList().then((result) => {
        const { permissionsList } = result.data.data
        this.form.allPermissions = permissionsList
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  watch: {
    // 监听过滤数组,一旦变化就修改页脚数据
    filterUserlist: {
      immediate: true,
      handler () {
        this.total = this.filterUserlist.length
        this.currentPage = 1
      }
    },
    // 监听 这两个变量值为空的时候就及时修改列表
    searchName () {
      if (this.searchName == '' && this.searchPermissionsName == '') {
        this.filterUserlist = this.userlist
      }
    },
    searchPermissionsName () {
      if (this.searchName == '' && this.searchPermissionsName == '') {
        this.filterUserlist = this.userlist
      }
    }
  }
}
</script>

<style scoped>
.box {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.box /deep/ .el-table,
.el-table__expanded-cell,
.box /deep/ .el-table tr,
.box /deep/ .el-table th,
.box /deep/ .el-dialog .el-input input {
  background-color: transparent;
}

.box /deep/ .el-dialog {
  border-radius: 15px;
  box-shadow: 0 0 10px 5px;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  box-shadow: 0 5px 20px 3px #8ec5fc;
  transition: all 0.4s;
}

.box /deep/ .el-dialog:hover {
  box-shadow: 0 5px 50px 3px #8ec5fc;
}

.box /deep/ .el-dialog__header span,
.box /deep/ .el-form-item__label,
.box /deep/ .el-table__row .cell,
.box /deep/ .el-table__header .cell {
  font-size: 1.1em;
  font-weight: 500;
  color: #000000;
}

.box /deep/ .el-table__body tbody tr:hover td {
  background: #8fd3f4 !important;
}

.box /deep/ .el-table__body .current-row td {
  background: #8ec5fc !important;

}

.dataBox {
  position: absolute;
  width: 100%;
  height: 80%;
  top: 5%;
}

.searchBox {
  position: relative;
  width: 100%;
  text-align: right;
}

.searchBox .el-input,
.searchBox .el-select {
  width: 20%;
  margin: 5px 5px;
  right: 2%;
  box-shadow: 0 0 20px 2px #7db9f5;
  transition: all 0.4s;
}

.page {
  position: relative;
  text-align: center;
}

.box .page /deep/ .el-pager li,
.box .page /deep/ button {
  background: transparent;
}

.noPermiss {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: black;
}
</style>