<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { dataScopeOptions } from "@/views/system/role/utils/enums";
import ReCol from "@/components/ReCol";
import { usePublicHooks } from "@/views/system/hooks";
import { useRole } from "@/views/system/role/utils/hook";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    name: "",
    sort: 0,
    status: true,
    description: "",
    dataScope: 0,
    customDataScope: []
  })
});
const { switchStyle } = usePublicHooks();
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}
const { getCustomDataScopeOptions } = useRole(null);

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="100px"
    ><el-row :gutter="30">
      <re-col>
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="1"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="启用"
            inactive-text="停用"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="数据权限" prop="dataScope">
          <el-select v-model="newFormInline.dataScope">
            <el-option
              v-for="option in dataScopeOptions"
              :key="option.value"
              :label="option.label as string"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          v-if="newFormInline.dataScope === 5"
          label="自定义部门"
          prop="customDataScope"
        >
          <el-cascader
            v-model="newFormInline.customDataScope"
            class="w-full"
            :options="getCustomDataScopeOptions()"
            :props="{
              value: 'id',
              label: 'name',
              emitPath: false,
              checkStrictly: true,
              multiple: true
            }"
            clearable
            filterable
            placeholder="请选择部门"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="描述信息" prop="description">
          <el-input
            v-model="newFormInline.description"
            placeholder="请输入角色的描述信息"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
