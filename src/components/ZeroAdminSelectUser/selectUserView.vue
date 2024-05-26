<script setup lang="ts">
import { ref } from "vue";
import tree from "./tree.vue";
import { useUser } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import PureTable from "@pureadmin/table";

// defineOptions({
//   name: "SystemUser"
// });

const treeRef = ref();
const formRef = ref();
const tableRef = ref();
const selectUserViewRef = ref();

function getRef() {
  return selectUserViewRef.value;
}

defineExpose({ getRef });

const {
  form,
  loading,
  columns,
  dataList,
  treeData,
  treeLoading,
  pagination,
  onSearch,
  resetForm,
  handleSelectUser,
  handleRemoveUser,
  onTreeSelect,
  handleSizeChange,
  handleCurrentChange,
  selectedIds,
  getSelectStatus,
  selectedUserData,
  selectedUserPageData,
  selectedPagination,
  handleSelectedUserPage,
  handleSelectedSizeChange,
  handleSelectedCurrentChange
} = useUser(tableRef, treeRef, selectUserViewRef);
</script>

<template>
  <div ref="selectUserViewRef">
    <el-row :gutter="24">
      <!--    :class="['flex', 'justify-between', deviceDetection() && 'flex-wrap']"-->
      <!--      组织树-->
      <el-col :lg="4" :xs="24" class="mb-[12px]">
        <tree
          ref="treeRef"
          :treeData="treeData"
          :treeLoading="treeLoading"
          @tree-select="onTreeSelect"
        />
      </el-col>
      <!--    :class="['mr-2', deviceDetection() ? 'w-full' : 'min-w-[200px]']"-->
      <!-- 用户列表 -->
      <el-col :lg="10" :xs="24">
        <div>
          <!--      :class="[deviceDetection() ? ['w-full', 'mt-2'] : 'w-[calc(100%-200px)]']"-->
          <el-form ref="formRef" :inline="true" :model="form">
            <!--                        class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"-->
            <el-form-item label="用户名称：" prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名称"
                clearable
                class="!w-[180px]"
              />
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入手机号码"
                clearable
                class="!w-[180px]"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :icon="useRenderIcon('ri:search-line')"
                :loading="loading"
                @click="onSearch"
              >
                搜索
              </el-button>
              <el-button
                :icon="useRenderIcon(Refresh)"
                @click="resetForm(formRef)"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <PureTableBar title="用户列表" :columns="columns" @refresh="onSearch">
            <template v-slot="{ size, dynamicColumns }">
              <pure-table
                ref="tableRef"
                row-key="id"
                adaptive
                :adaptiveConfig="{ offsetBottom: 108 }"
                align-whole="center"
                :loading="loading"
                :size="size"
                :data="dataList"
                :columns="dynamicColumns"
                :pagination="pagination"
                :paginationSmall="size === 'small' ? true : false"
                :header-cell-style="{
                  background: 'var(--el-fill-color-light)',
                  color: 'var(--el-text-color-primary)'
                }"
                @page-size-change="handleSizeChange"
                @page-current-change="handleCurrentChange"
              >
                <template #operation="{ row }">
                  <el-button
                    v-if="!getSelectStatus(row.id)"
                    link
                    type="primary"
                    :size="size"
                    @click="handleSelectUser(row)"
                  >
                    选择
                  </el-button>
                  <el-button
                    v-else
                    link
                    type="danger"
                    :size="size"
                    @click="handleRemoveUser(row.id)"
                  >
                    取消
                  </el-button>
                </template>
              </pure-table>
            </template>
          </PureTableBar>
        </div>
      </el-col>
      <!-- 已经选择的用户-->
      <el-col :lg="10" :xs="24">
        <!--        <el-card shadow="never" class="table-container">-->
        <PureTableBar title="选中的用户" :columns="columns" @refresh="onSearch">
          <template v-slot="{ size, dynamicColumns }">
            <pure-table
              ref="selectTableRef"
              row-key="id"
              adaptive
              :adaptiveConfig="{ offsetBottom: 108 }"
              layout="vertical"
              align-whole="center"
              :loading="loading"
              :size="size"
              :data="selectedUserPageData"
              :columns="dynamicColumns"
              :pagination="selectedPagination"
              :paginationSmall="size === 'small' ? true : false"
              :header-cell-style="{
                background: 'var(--el-fill-color-light)',
                color: 'var(--el-text-color-primary)'
              }"
              @page-size-change="handleSelectedSizeChange"
              @page-current-change="handleSelectedCurrentChange"
            >
              <template #operation="{ row }">
                <el-button
                  link
                  type="danger"
                  :size="size"
                  @click="handleRemoveUser(row.id)"
                >
                  移除
                </el-button>
              </template>
            </pure-table>
          </template>
        </PureTableBar>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

:deep(.el-button:focus-visible) {
  outline: none;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
