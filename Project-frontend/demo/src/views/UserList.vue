<template>
  <div class="user-container">
    <div v-show="!ownPermission" class="no-permission">
      <h1>
        <p>抱歉!您当前权限无法查看，请联系管理员！</p>
      </h1>
    </div>
    <div v-show="ownPermission" class="data-container">
      <div class="search-input">
        <el-input v-model="searchName" placeholder="请输入查询名" clearable />
        <el-select v-model="searchPermissionsName" clearable placeholder="请选择权限名">
          <el-option v-for="p in form.allPermissions" :key="p.id" :value="p.permissionsName"></el-option>
        </el-select>
      </div>
      <!-- table -->
      <el-table :data="filterUserlist.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border
        highlight-current-row lazy>
        <el-table-column prop="date" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="avatar" label="头像" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="permissionsName" label="权限名称" align="center">
          <template slot-scope="scope">
            <el-tag :type="setColor(scope.row)">{{ scope.row.permissionsName
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

      <!-- 回到顶部 -->
      <el-backtop target=".data-container">
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        border-radius:25px;
        font-size:0.5em;
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        user-select:none;
      }">
          TOP
        </div>
      </el-backtop>
    </div>

    <!-- 弹出修改框 -->
    <el-dialog title="成员修改" :visible.sync="dialogFormVisible" center :append-to-body="true">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.rowUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.rowUser.permissionsName" placeholder="请选择更改权限">
            <el-option v-for=" p  in  form.allPermissions " :key="p.id" :value="p.permissionsName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 页脚 -->
    <div v-show="ownPermission" class="page">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pageSize" layout="sizes,total, prev, pager, next, jumper"
        :total="this.filterUserlist.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { AxiosBack } from '@/api/requestUser';
import { MessageBack } from '@/utils/MessageBack'
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
    // 设置权限颜色
    setColor (row) {
      if (row.permissionsName === 'admin') {
        return 'danger'
      } else {
        return row.permissionsName === 'visitor' ? 'info' : 'warning'
      }
    },
    // 当前页大小变化
    handleSizeChange (value) {
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
      // 后台更新
      AxiosBack.delDate(row.userId).then((result) => {
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
        MessageBack.normalBack('success', result.data.msg)
      }).catch((err) => {
        MessageBack.serverErrorBack()
      });
    },
    handlerSubmit () {
      //  选择权限后 this.form.rowUser.权限名 就变了
      const index = this.form.allPermissions.findIndex(item => item.permissionsName === this.form.rowUser.permissionsName)
      const permissionsId = this.form.allPermissions[index].id
      // 更新数据
      AxiosBack.setUpdate(permissionsId, this.form.rowUser.userId, this.form.rowUser.username).then((result) => {
        if (result.data.code == 200) {
          this.dialogFormVisible = false
          MessageBack.normalBack('success', result.data.msg)
        } else {
          MessageBack.normalBack('warning', result.data.msg)
        }
      }).catch((err) => {
        MessageBack.serverErrorBack()
      });
    }
  },
  mounted () {
    // 判断是否存在用户列表 不存在就向后端发请求
    if (!this.userlist) {
      // 获取权限id
      const { permissionsId } = JSON.parse(localStorage.getItem('userinfo-save'))
      AxiosBack.getUserList(permissionsId).then((result) => {
        const { isOwnPermission } = result.data.data
        // 后端判断是否拥有权限 返回true false
        this.ownPermission = isOwnPermission
        // 如果为false 就不执行下面代码，否则执行
        if (isOwnPermission) {
          const { userlist } = result.data.data
          // 获取用户列表 并赋值
          this.userlist = userlist
          // 过滤数组赋值
          this.filterUserlist = this.userlist
          // 判断是否存在allPermissions 不存在就向后端发请求
          if (!this.form.allPermissions) {
            AxiosBack.getPermissionsList().then((result) => {
              const { permissionsList } = result.data.data
              this.form.allPermissions = permissionsList
            }).catch((err) => {
              console.log(error);
            });
          }
        }
      }).catch((err) => {
        MessageBack.serverErrorBack()
      });
    }
  },
  watch: {
    // 监听 这两个变量值变化的时候就及时修改列表
    searchName () {
      this.searchBtn()
    },
    searchPermissionsName () {
      this.searchBtn()
    },
    /**
       * 坑记录:element el-pagination分页最后一页数据清空了页码显示正确，但是列表为空
       * 造成原因:最后一页数据清空时,总页数发生变化,但是当前页(currentPage)还是之前页数,所以列表为空
       * 解决方法:查阅得以解决:1.计算总页数 2.判断当前页是否大于总页数,以及是否小于1页 3.赋值给当前页
       */
    /**
       * 坑记录: 分类后有的类型页数有很多 简称A,有的类型页数很少 简称B,
       * 这时候的选A的页数大于B的话,再切换到B就会出现空数据,只有刷新才会显示,
       * 所以需要设置  以下代码已解决上述两个问题
       */
    filterUserlist () {
      const totalCount = Math.ceil(this.filterUserlist.length / this.pageSize)
      const currentPage = this.currentPage > totalCount ? totalCount : this.currentPage
      this.currentPage = currentPage < 1 ? 1 : currentPage
    }
  }
}
</script>

<style scoped>
.user-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  transform: translate(0, 0);
}

.user-container /deep/ .el-table,
.el-table__expanded-cell,
.user-container /deep/ .el-table tr,
.user-container /deep/ .el-table th,
.user-container /deep/ .el-dialog .el-input input {
  background-color: transparent;
}

div /deep/ .el-dialog {
  border-radius: 15px;
  box-shadow: 0 0 10px 5px;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  box-shadow: 0 5px 20px 3px #8ec5fc;
  transition: all 0.4s;

  .el-input input {
    color: #000;
  }

  &:hover {
    box-shadow: 0 5px 50px 3px #8ec5fc;
  }
}

div /deep/ .el-dialog__header span,
div /deep/ .el-dialog .el-input,
div /deep/ .el-dialog label,
.user-container /deep/ .el-form-item__label,
.user-container /deep/ .el-table__row .cell,
.user-container /deep/ .el-table__header .cell {
  font-size: 1.2em;
  font-weight: 500;
  color: #000000;
}

.user-container /deep/ .el-table__body tbody tr:hover td {
  background: #8fd3f4 !important;
}

.user-container /deep/ .el-table__body .current-row td {
  background: #8ec5fc !important;

}

.data-container {
  position: absolute;
  width: 100%;
  height: 85%;
  bottom: 5%;
  overflow: auto;
}

.search-input {
  position: fixed;
  top: 3%;
  width: 100%;
  text-align: right;
}

.search-input .el-input,
.search-input .el-select {
  width: 20%;
  margin: 5px 5px;
  right: 2%;
  box-shadow: 0 0 20px 2px #7db9f5;
  transition: all 0.4s;

  & input::placeholder {
    color: #000;
  }
}

.page {
  position: absolute;
  bottom: 0;
  text-align: center;
}

.user-container .page /deep/ .el-pager li,
.user-container .page /deep/ button {
  background: transparent;
}

.no-permission {
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