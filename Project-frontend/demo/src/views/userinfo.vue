<template>
  <div class="infobox">

  </div>
</template>

<script>
export default {
  name: "MyUserinfo",
  inject: ['reload'],
  data () {
    return {
      userList: JSON.parse(localStorage.getItem('userlist')) || [],
      loading: true,
      currentPage: 1,
      pageUserList: '',
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
      this.userList = res.data
      localStorage.setItem('userlist', JSON.stringify(this.userList))
    }).catch(err => {
      console.log(err);
    })
  },
  watch: {
    userList: {
      handler (newvalue) {
        localStorage.setItem('userlist', JSON.stringify(newvalue))
      }
    }
  }
}
</script>

<style scoped>
.infobox {
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>