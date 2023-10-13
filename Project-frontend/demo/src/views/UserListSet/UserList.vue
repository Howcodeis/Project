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
        <!-- <el-button type="success" icon="el-icon-search" @click="searchBtn">搜索</el-button> -->
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
        <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
          layout="total, prev, pager, next" :total="this.filterUserlist.length">
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
      userlist: '',
      filterUserlist: [],
      ownPermission: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        allPermissions: '',
        rowUser: []
      },
      currentPage: 1,
      pageSize: 10,
      searchPermissionsName: '',
      searchName: '',
    }
  },
  methods: {
    // 当前页面变化时 跳转其他页面
    handleCurrentChange (value) {
      this.currentPage = value
    },
    searchBtn () {
      // 搜索 模糊查询 
      // 变量searchPermissionsName有值
      if (!this.searchPermissionsName == '') {
        this.filterUserlist = this.userlist.filter(item => item.permissionsName == this.searchPermissionsName)
        /**
         * 坑记录: 分类后有的类型页数有很多 简称A,有的类型页数很少 简称B,
         * 这时候的选A的页数大于B的话,再切换到B就会出现空数据,只有刷新才会显示,
         * 所以需要设置当前页为1
         */
        this.currentPage = 1
        // 两个变量都有值
        if (!this.searchName == '') {
          this.filterUserlist = this.userlist.filter(item => item.permissionsName == this.searchPermissionsName && item.username.includes(this.searchName))
        }
      }
      // 两个变量都没有值的时候
      else if (this.searchName == '' && this.searchPermissionsName == '') {
        this.filterUserlist = this.userlist
      }
      // 变量searchPermissionsName无值
      else {
        this.filterUserlist = this.userlist.filter(item => item.username.includes(this.searchName))
      }
    },
    // 编辑用户列表
    editRow (row) {
      this.form.rowUser = row
      this.dialogFormVisible = true
    },
    // 删除用户列表
    deleteRow (row) {
      this.NProgress.start()
      // 后台更新
      delData(row.userId).then((result) => {
        // 数组过滤
        /**
         * 坑记录:这是之前的写法
         *  this.filterUserlist = this.userlist.filter(user => user.userId != row.userId)
         * 当这里过滤数组更新后,原数组是没有变化的,所以删除一个单元后只是过滤数组删除了,
         * 到刷新页面了后发现,删除的单元又出现了,并且搞笑的是,在不分类的情况下连续删除会不断重复将删除的元素重新放到第一格,
         * 就像一个气球你放水里又浮上来,放水里又又浮上来..
         * 因此在这里 过滤数组删除的时候,原数组做相同操作就OK了
         */
        this.filterUserlist = this.filterUserlist.filter(user => user.userId != row.userId)
        this.userlist = this.userlist.filter(user => user.userId != row.userId)
        /**
         * 坑记录:element el-pagination分页最后一页数据清空了页码显示正确，但是列表为空
         * 造成原因:最后一页数据清空时,总页数发生变化,但是当前页(currentPage)还是之前页数,所以列表为空
         * 解决方法:查阅得以解决:1.计算总页数 2.判断当前页是否大于总页数,以及是否小于1页 3.赋值给当前页
         */
        const totalPage = Math.ceil(this.filterUserlist.length / this.pageSize)
        const currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
        this.currentPage = currentPage < 1 ? 1 : currentPage
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
    if (!this.userlist) {
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
        this.filterUserlist = this.userlist
        // 判断是否存在allPermissions 不存在就向后端发请求
        if (!this.form.allPermissions) {
          getPermissionsList().then((result) => {
            const { permissionsList } = result.data.data
            this.form.allPermissions = permissionsList
          }).catch((err) => {
            console.log(error);
          });
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: "服务器断开",
          duration: 2000,
          showClose: false
        })
      });
    }
  },
  watch: {
    // 监听 这两个变量值为空的时候就及时修改列表
    searchName () {
      this.searchBtn()
    },
    searchPermissionsName () {
      this.searchBtn()
    },

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