<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import { ElMessage } from "element-plus";
import { SelfUserInfoForm } from "@/api/system/user/type";
import { formRules } from "@/views/user/info/utils/rule";

const props = defineProps<{
  defaultInfo: SelfUserInfoForm;
}>();

const formRef = ref(null);
const form = ref<SelfUserInfoForm>({ ...props.defaultInfo });

const initialForm = ref<SelfUserInfoForm>({ ...props.defaultInfo });

watch(
  () => props.defaultInfo,
  newInfo => {
    if (newInfo) {
      form.value = { ...newInfo };
    }
  },
  { immediate: true, deep: true }
);

const onSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      // 提交表单，调用API
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("请检查表单输入");
      return false;
    }
  });
};

const onReset = () => {
  form.value = { ...initialForm.value };
};
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
