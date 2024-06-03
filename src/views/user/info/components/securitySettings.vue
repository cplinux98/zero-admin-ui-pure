<script setup lang="ts">
// 假设从API获取当前用户的安全信息
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useUserInfo } from "@/views/user/info/utils/hook";

const securityInfo = ref({
  loginPassword:
    "已设置。密码至少6位字符，支持数字、字母和空格外的特殊字符，且必须同时包含数字和大小写字母。",
  securityQuestion: "您暂未设置密保问题，密保问题可以有效的保护账号的安全。",
  securityMobile: "已绑定：150******50",
  securityEmail: "您暂未设置邮箱，绑定邮箱可以用来找回密码，接收通知等。"
});

const handleChange = (type: string) => {
  ElMessage.success(`${type}修改功能`);
};

const { handleResetPassword } = useUserInfo();
</script>

<template>
  <div>
    <div class="security-item">
      <div class="label">登录密码</div>
      <div class="info">{{ securityInfo.loginPassword }}</div>
      <el-button type="text" @click="handleResetPassword">修改</el-button>
    </div>
    <div class="security-item">
      <div class="label">密保问题</div>
      <div class="info">{{ securityInfo.securityQuestion }}</div>
      <el-button type="text" @click="handleChange('密保问题')">设置</el-button>
    </div>
    <div class="security-item">
      <div class="label">安全手机</div>
      <div class="info">{{ securityInfo.securityMobile }}</div>
      <el-button type="text" @click="handleChange('安全手机')">修改</el-button>
    </div>
    <div class="security-item">
      <div class="label">安全邮箱</div>
      <div class="info">{{ securityInfo.securityEmail }}</div>
      <el-button type="text" @click="handleChange('安全邮箱')">修改</el-button>
    </div>
  </div>
</template>
<style scoped>
.security-settings {
  padding: 20px;
}

.security-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ebebeb;
}

.security-item .label {
  font-weight: bold;
}

.security-item .info {
  flex: 1;
  margin: 0 10px;
  color: #666;
}

.security-item el-button {
  color: #409eff;
}
</style>
