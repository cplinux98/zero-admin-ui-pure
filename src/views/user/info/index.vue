<script setup lang="ts">
import { useUserInfo } from "@/views/user/info/utils/hook";
import dayjs from "dayjs";
import BasicSettings from "@/views/user/info/components/basicSettings.vue";
import SecuritySettings from "@/views/user/info/components/securitySettings.vue";
import AccountBinding from "@/views/user/info/components/accountBinding.vue";
import Notifications from "@/views/user/info/components/notifications.vue";
import { ref } from "vue";

defineOptions({
  name: "SelfUserInfo"
});

const { currentUserInfo, handleUploadAvatar } = useUserInfo();
</script>

<template>
  <div class="main">
    <el-row :gutter="24">
      <el-col :lg="8" :md="8" :sm="24" :xl="8" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div class="flex justify-center items-center">
              <div
                class="avatar w-[150px] h-[150px] relative cursor-pointer"
                @click="handleUploadAvatar"
              >
                <ElImage
                  class="w-[150px] h-[150px] rounded-full"
                  :src="currentUserInfo.avatar"
                  fit="fill"
                />
              </div>
            </div>
            <el-divider />
            <div class="flex justify-between items-center">
              <div>用户名：</div>
              <div>{{ currentUserInfo.username }}</div>
            </div>
            <el-divider />
            <div class="flex justify-between items-center">
              <div>用户昵称：</div>
              <div>{{ currentUserInfo.nickname }}</div>
            </div>
            <el-divider />
            <div class="flex justify-between items-center">
              <div>所属部门：</div>
              <div>{{ currentUserInfo.deptName }}</div>
            </div>
            <el-divider />
            <div class="flex justify-between items-center">
              <div>手机号码：</div>
              <div>{{ currentUserInfo.mobile }}</div>
            </div>
            <el-divider />
            <div class="flex justify-between items-center">
              <div>邮箱地址：</div>
              <div>{{ currentUserInfo.email }}</div>
            </div>
            <el-divider />
            <div class="flex justify-between items-center">
              <div>注册时间：</div>
              <div>
                {{
                  dayjs
                    .unix(currentUserInfo.createTime)
                    .format("YYYY-MM-DD HH:mm:ss")
                }}
              </div>
            </div>
            <el-divider />
          </div>
        </el-card>
      </el-col>
      <el-col :lg="16" :md="16" :sm="24" :xl="16" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>信息设置</span>
            </div>
          </template>
          <el-tabs class="user-info-tabs">
            <el-tab-pane label="基本设置">
              <BasicSettings :default-info="currentUserInfo" />
            </el-tab-pane>
            <el-tab-pane label="安全设置">
              <SecuritySettings />
            </el-tab-pane>
            <el-tab-pane label="账户绑定">
              <AccountBinding />
            </el-tab-pane>
            <el-tab-pane label="新消息通知">
              <Notifications />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.avatar {
  position: relative;

  /* 鼠标放图片上，显示+号蒙版 */
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 50px;
    color: #fff;
    content: "+";
    background-color: rgb(0 0 0 / 40%);
    border-radius: 50%;
    opacity: 0;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}
</style>
