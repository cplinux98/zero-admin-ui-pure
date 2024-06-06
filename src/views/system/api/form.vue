<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { usePublicHooks } from "../hooks";
import { useApi } from "@/views/system/api/utils/hook";
import { apiMethodOptions } from "@/views/system/api/utils/enums";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    description: "",
    group: 0,
    id: undefined,
    isRequired: false,
    method: 0,
    name: "",
    path: ""
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const { getHigherGroupOptions } = useApi(null, null);
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
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="分组" prop="group">
          <el-cascader
            v-model="newFormInline.group"
            class="w-full"
            :options="getHigherGroupOptions()"
            :props="{
              value: 'value',
              label: 'label',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择归属分组"
          >
            <template #default="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="接口名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入接口名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="接口路径" prop="path">
          <el-input
            v-model="newFormInline.path"
            clearable
            placeholder="请输入接口路径"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="接口方法" prop="method">
          <el-select v-model="newFormInline.method">
            <el-option
              v-for="option in apiMethodOptions"
              :key="option.value"
              :label="option.label as string"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否必须">
          <el-switch
            v-model="newFormInline.isRequired"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="是"
            inactive-text="否"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="接口描述" prop="description">
          <el-input
            v-model="newFormInline.description"
            placeholder="请输入接口描述"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
