<script setup lang="ts">
import { ref, watch } from "vue";
import {
  selectedUserIds,
  useUser
} from "@/components/ZeroAdminSelectUser/utils/hook";
defineOptions({
  name: "ZeroAdminSelectUser"
});

// 接收参数
const props = defineProps<{
  modelValue: number[];
}>();

const { selectedUserData, handleRemoveUser, openDialog, selectedIds } =
  useUser();

const emit = defineEmits(["update:modelValue"]);
// 把传进来的值，赋值到本地属性上
selectedUserIds.value = props.modelValue;

// const localSelectedUserIds = ref<number[]>(props.modelValue);

// 监听外部变化，同步内部值
// watch(
//   () => props.modelValue,
//   newValue => {
//     console.log(newValue);
//     selectedIds.value = newValue;
//   }
// );

// 监听selectedIds，同步到prop.modelValue
// watch(
//   () => selectedIds.value,
//   newValue => {
//     emit("update:modelValue", newValue);
//   }
// );

// const handleRemoveTag = (id: any) => {
//   console.log(id);
// };
</script>

<template>
  <div>
    <!--    显示已选择的用户-->
    <el-space spacer="|">
      <el-select
        v-model="selectedIds"
        multiple
        placeholder="请点击右侧按钮选择用户"
        style="width: 400px"
        @remove-tag="handleRemoveUser"
      >
        <el-option
          v-for="item in selectedUserData"
          :key="item.id"
          :label="item.nickname"
          :value="item.id"
        />
      </el-select>
      <!--    弹出选择用户弹窗-->
      <el-button @click="openDialog">选择用户</el-button>
    </el-space>
  </div>
</template>

<!--<style scoped lang="scss">-->
<!--:deep(.el-dropdown-menu__item i) {-->
<!--  margin: 0;-->
<!--}-->

<!--:deep(.el-button:focus-visible) {-->
<!--  outline: none;-->
<!--}-->

<!--.main-content {-->
<!--  margin: 24px 24px 0 !important;-->
<!--}-->

<!--.search-form {-->
<!--  :deep(.el-form-item) {-->
<!--    margin-bottom: 12px;-->
<!--  }-->
<!--}-->
<!--</style>-->
