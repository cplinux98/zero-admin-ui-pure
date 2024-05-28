<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { IconSelect } from "@/components/ReIcon";
import Segmented from "@/components/ReSegmented";
import { menuTypeOptions } from "./utils/enums";
import { useMenu } from "@/views/system/menu/utils/hook";
import { usePublicHooks } from "@/views/system/hooks";
const { switchStyle } = usePublicHooks();
const { getHigherMenuOptions } = useMenu();
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: 0,
    menuType: 0,
    higherMenuOptions: [],
    parentId: 0,
    title: "",
    name: "",
    path: "",
    component: "",
    rank: 99,
    redirect: "",
    icon: "",
    extraIcon: "",
    // enterTransition: "",
    // leaveTransition: "",
    activePath: "",
    perm: "",
    frameSrc: "",
    frameLoading: true,
    keepAlive: false,
    hiddenTag: false,
    fixedTag: false,
    showLink: true,
    showParent: false
  })
});

const ruleFormRef = ref();
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
        <el-form-item label="菜单类型">
          <Segmented
            v-model="newFormInline.menuType"
            :options="menuTypeOptions"
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="newFormInline.parentId"
            class="w-full"
            :options="getHigherMenuOptions()"
            :props="{
              value: 'id',
              label: 'title',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择上级菜单"
          >
            <template #default="{ node, data }">
              <span>{{ data.title }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="菜单名称" prop="title">
          <el-input
            v-model="newFormInline.title"
            clearable
            placeholder="请输入菜单名称"
          />
        </el-form-item>
      </re-col>
      <re-col v-if="newFormInline.menuType !== 3" :value="12" :xs="24" :sm="24">
        <el-form-item label="路由名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入路由名称"
          />
        </el-form-item>
      </re-col>

      <re-col v-if="newFormInline.menuType !== 3" :value="12" :xs="24" :sm="24">
        <el-form-item label="路由路径" prop="path">
          <el-input
            v-model="newFormInline.path"
            clearable
            placeholder="请输入路由路径"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType === 0"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="组件路径">
          <el-input
            v-model="newFormInline.component"
            clearable
            placeholder="请输入组件路径"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="菜单排序">
          <el-input-number
            v-model="newFormInline.rank"
            class="!w-full"
            :min="1"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType === 0"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="路由重定向">
          <el-input
            v-model="newFormInline.redirect"
            clearable
            placeholder="请输入默认跳转地址"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType !== 3"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="菜单图标">
          <IconSelect v-model="newFormInline.icon" class="w-full" />
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType !== 3"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="右侧图标">
          <el-input
            v-model="newFormInline.extraIcon"
            clearable
            placeholder="菜单名称右侧的额外图标"
          />
        </el-form-item>
      </re-col>

      <!--      <re-col v-show="newFormInline.menuType < 2" :value="12" :xs="24" :sm="24">-->
      <!--        <el-form-item label="进场动画">-->
      <!--          <ReAnimateSelector-->
      <!--            v-model="newFormInline.enterTransition"-->
      <!--            placeholder="请选择页面进场加载动画"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--      </re-col>-->
      <!--      <re-col v-show="newFormInline.menuType < 2" :value="12" :xs="24" :sm="24">-->
      <!--        <el-form-item label="离场动画">-->
      <!--          <ReAnimateSelector-->
      <!--            v-model="newFormInline.leaveTransition"-->
      <!--            placeholder="请选择页面离场加载动画"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--      </re-col>-->

      <re-col
        v-show="newFormInline.menuType === 0"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="菜单激活">
          <el-input
            v-model="newFormInline.activePath"
            clearable
            placeholder="请输入需要激活的菜单"
          />
        </el-form-item>
      </re-col>
      <re-col v-if="newFormInline.menuType === 3" :value="12" :xs="24" :sm="24">
        <!-- 按钮级别权限设置 -->
        <el-form-item label="权限标识" prop="perm">
          <el-input
            v-model="newFormInline.perm"
            clearable
            placeholder="请输入权限标识"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType === 1"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <!-- iframe -->
        <el-form-item label="链接地址">
          <el-input
            v-model="newFormInline.frameSrc"
            clearable
            placeholder="请输入 iframe 链接地址"
          />
        </el-form-item>
      </re-col>
      <re-col v-if="newFormInline.menuType === 1" :value="12" :xs="24" :sm="24">
        <el-form-item label="加载蒙版">
          <el-switch
            v-model="newFormInline.frameLoading"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="开启"
            inactive-text="关闭"
            :style="switchStyle"
          />

          <!--          <Segmented-->
          <!--            :modelValue="newFormInline.frameLoading ? 0 : 1"-->
          <!--            :options="frameLoadingOptions"-->
          <!--            @change="-->
          <!--              ({ option: { value } }) => {-->
          <!--                newFormInline.frameLoading = value;-->
          <!--              }-->
          <!--            "-->
          <!--          />-->
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType !== 3"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="显示菜单">
          <el-switch
            v-model="newFormInline.showLink"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="显示"
            inactive-text="隐藏"
            :style="switchStyle"
          />
          <!--          <Segmented-->
          <!--            :modelValue="newFormInline.showLink ? 0 : 1"-->
          <!--            :options="showLinkOptions"-->
          <!--            @change="-->
          <!--              ({ option: { value } }) => {-->
          <!--                newFormInline.showLink = value;-->
          <!--              }-->
          <!--            "-->
          <!--          />-->
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType !== 3"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="父级菜单">
          <el-switch
            v-model="newFormInline.showParent"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="显示"
            inactive-text="不显示"
            :style="switchStyle"
          />
          <!--          <Segmented-->
          <!--            :modelValue="newFormInline.showParent ? 0 : 1"-->
          <!--            :options="showParentOptions"-->
          <!--            @change="-->
          <!--              ({ option: { value } }) => {-->
          <!--                newFormInline.showParent = value;-->
          <!--              }-->
          <!--            "-->
          <!--          />-->
        </el-form-item>
      </re-col>

      <re-col v-show="newFormInline.menuType < 2" :value="12" :xs="24" :sm="24">
        <el-form-item label="缓存页面">
          <el-switch
            v-model="newFormInline.keepAlive"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="缓存"
            inactive-text="不缓存"
            :style="switchStyle"
          />

          <!--          <Segmented-->
          <!--            :modelValue="newFormInline.keepAlive ? 0 : 1"-->
          <!--            :options="keepAliveOptions"-->
          <!--            @change="-->
          <!--              ({ option: { value } }) => {-->
          <!--                newFormInline.keepAlive = value;-->
          <!--              }-->
          <!--            "-->
          <!--          />-->
        </el-form-item>
      </re-col>

      <re-col v-show="newFormInline.menuType < 2" :value="12" :xs="24" :sm="24">
        <el-form-item label="标签页">
          <el-switch
            v-model="newFormInline.hiddenTag"
            inline-prompt
            :active-value="false"
            :inactive-value="true"
            active-text="显示"
            inactive-text="不显示"
            :style="switchStyle"
          />

          <!--          <Segmented-->
          <!--            :modelValue="newFormInline.hiddenTag ? 1 : 0"-->
          <!--            :options="hiddenTagOptions"-->
          <!--            @change="-->
          <!--              ({ option: { value } }) => {-->
          <!--                newFormInline.hiddenTag = value;-->
          <!--              }-->
          <!--            "-->
          <!--          />-->
        </el-form-item>
      </re-col>
      <re-col v-show="newFormInline.menuType < 2" :value="12" :xs="24" :sm="24">
        <el-form-item label="固定标签页">
          <el-switch
            v-model="newFormInline.fixedTag"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="固定"
            inactive-text="不固定"
            :style="switchStyle"
          />
          <!--          <Segmented-->
          <!--            :modelValue="newFormInline.fixedTag ? 0 : 1"-->
          <!--            :options="fixedTagOptions"-->
          <!--            @change="-->
          <!--              ({ option: { value } }) => {-->
          <!--                newFormInline.fixedTag = value;-->
          <!--              }-->
          <!--            "-->
          <!--          />-->
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
