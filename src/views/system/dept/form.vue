<script setup lang="ts">
import { ref, withDefaults } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { usePublicHooks } from "../hooks";

import { useDept } from "@/views/system/dept/utils/hook";
import ZeroAdminSelectUser from "@/components/ZeroAdminSelectUser/index.vue";
import Segmented from "@/components/ReSegmented";
import { statusOptions } from "@/views/system/dept/utils/enums";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    parentId: 0,
    leader: [],
    name: "",
    sort: 0,
    status: true,
    description: ""
  })
});
const { getHigherDeptOptions } = useDept();

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col>
        <el-form-item label="上级部门">
          <el-cascader
            v-model="newFormInline.parentId"
            class="w-full"
            :options="getHigherDeptOptions()"
            :props="{
              value: 'id',
              label: 'name',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择上级部门"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入部门名称"
          />
        </el-form-item>
      </re-col>
      <!--      选择部门负责人-->
      <re-col>
        <el-form-item label="部门负责人">
          <ZeroAdminSelectUser v-model="newFormInline.leader" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="部门状态">
          <Segmented
            :modelValue="newFormInline.status ? 0 : 1"
            :options="statusOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.status = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="描述信息" prop="description">
          <el-input
            v-model="newFormInline.description"
            placeholder="请输入描述信息"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
