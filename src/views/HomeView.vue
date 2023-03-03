<template>
  <div class="home">
    <el-container style="height: 100%">
      <el-header>
        <el-row :gutter="20">
          <el-col :span="2" class="logo">
            <!-- <img src="~assets/logo.png" alt=""> -->
          </el-col>
          <el-col :span="20" class="title">
            <strong>后台管理系统</strong>
          </el-col>
          <el-col :span="2" class="menu">
            <el-dropdown :popper-append-to-body="false" popper-class="popper-menu" trigger="click"
              @command="handleCommand">
              <el-icon class="menu-icon">
                <Menu />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu class="menu-list">
                  <el-link type="danger" @click="logOut">退出登录</el-link>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
          <!--router开启路由模式，通过el-menu-item index来进行跳转-->
          <el-menu-item :index="item.path" v-for=" item in list" :key="item.path">
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    let data = reactive({
      isCollapse: true
    })
    const router = useRouter()
    // console.log(router.getRoutes());
    let list = router.getRoutes().filter(v => v.meta.isShow)

    //登出
    function logOut() {
      localStorage.removeItem('token')
      router.push('/login')
    }
    const handleCommand = (command: string | number | object) => {
      console.log(command);

    }
    return { ...toRefs(data), logOut, list, handleCommand }
  }
})
</script>

<style lang="less">
.popper-menu {
  padding: 0 .8rem !important;
  text-align: center;
}
</style>
<style lang="less" scoped>
.home {
  height: 100%;

  .el-header {
    text-align: center;
    background-color: #409EFF;
    color: #fff;

    .el-row {
      height: 100%;
      align-items: center;

      .logo {
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        font-size: 20px;
      }

      .menu {
        .menu-icon {
          font-size: 1.5rem;
          color: #fff;

          :hover {
            cursor: pointer;

          }
        }

        .menu-list {}
      }
    }

  }



}
</style>