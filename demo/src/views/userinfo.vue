<template>
  <div class="infobox">
    <el-skeleton :loading="loading" animated :count="count">
      <template slot="template">
        <div class="skeleton">
          <el-skeleton-item class="item" variant="p"></el-skeleton-item>
        </div>
      </template>
      <!-- <el-table :data="userList">
        <el-table-column label="姓名" width="100%">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="80%">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.permissionsName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="controlbutton">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>-->
    </el-skeleton>
  </div>
</template>

<script>
export default {
  name: "MyUserinfo",
  inject: ['reload'],
  data () {
    return {
      userList: [],
      loading: true,
      count: 0,
      currentPage: 1,
      pageUserList: []
    }
  },
  methods: {
    handleDelete (row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/delete',
          params: {
            userId: row.userId
          }
        }).then(res => {
          const { msg, code } = res.data
          if (code == 20000) {
            this.$notify({
              message: msg,
              type: 'success',
              duration: 2000,
              offset: 80,
              showClose: false
            })
            this.reload()
          }
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除',
          duration: 1000,
          offset: 80,
          showClose: false
        })
      })
    }
  },
  mounted () {
    this.$http({
      method: 'get',
      url: '/user',
    }).then(res => {
      console.log(res.data);
      this.userList = res.data
      this.count = this.userList.length

    }).catch(err => {
      console.log(err);
    })
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  // // 获取当前页信息
  // getPageInfo () {
  //   // 清空pageUserList里面的数据
  //   this.pageUserList = [];
  //   // 获取当前页信息
  //   for (let i = (this.currentPage - 1) * this.pagesize; i < this.count; i++) {
  //     // 把遍历的数据添加到pageUserList里面
  //     this.pageUserList.push(this.userList[i]);
  //     // 判断是否达到一页的要求
  //     if (this.pageUserList.length === this.pageSize) break;
  //   }
  // },
  // // 分页时修改每页的行数，这里会自动传入一个size
  // handleSizeChange (size) {
  //   // 修改当前每页的数据行数
  //   this.pageSize = size;
  //   // 数据重新分页
  //   this.getPageInfo();
  // },
  // // 调整当前的页码
  // handleCurrentChange (pagenumber) {
  //   // 修改当前页码
  //   this.currentPage = pagenumber;
  //   // 数据重新分页
  //   this.getPageInfo();
  // }
}
</script>

<style scoped>
.skeleton {
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-top: 10px;
}
.skeleton .item {
  width: 100%;
  height: 47px;
}

.controlbutton {
  display: flex;
}

.infobox {
  position: relative;
  width: 60%;
  left: 20%;
}
</style>