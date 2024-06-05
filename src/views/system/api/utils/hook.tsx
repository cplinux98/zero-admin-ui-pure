import "./reset.css";
import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import type { FormItemProps } from "../utils/types";
import { getKeyList, deviceDetection } from "@pureadmin/utils";

import {
  createApi,
  deleteApi,
  getApi,
  getApiList,
  getApiTreeGroup,
  updateApi
} from "@/api/system/api";

import { type Ref, h, ref, computed, reactive, onMounted } from "vue";
import type { ApiForm, ApiQuery } from "@/api/system/api/type";
import { pageConfigDefault } from "@/utils/pageConfigDefault";
export const FormTitle = ref("新增");

export function useApi(tableRef: Ref, treeRef: Ref) {
  const form = reactive<ApiQuery>({
    page: 1,
    pageSize: pageConfigDefault.pageSize,
    // 左侧部门树的id
    deptId: undefined,
    keyword: undefined,
    status: undefined
  });
  const formRef = ref();

  const dataList = ref([]);
  const loading = ref(true);
  // 上传头像信息

  const higherDeptOptions = ref();
  const treeData = ref([]);
  const treeLoading = ref(true);
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "接口编号",
      prop: "id",
      width: 90
    },
    {
      label: "接口名称",
      prop: "name",
      minWidth: 130
    },
    {
      label: "接口路径",
      prop: "path",
      minWidth: 130
    },
    {
      label: "方法",
      prop: "method",
      minWidth: 90
    },
    {
      label: "所属分组",
      prop: "group",
      minWidth: 90
    },

    {
      label: "创建时间",
      width: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs.unix(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "描述信息",
      prop: "description",
      minWidth: 200
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    deleteApi(row.id).then(() => {
      message(`您删除了接口编号为${row.id}的这条数据`, { type: "success" });
      onSearch();
    });
  }

  function handleSizeChange(val: number) {
    form.pageSize = val;
    onSearch();
    // console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    form.page = val;
    onSearch();
    // console.log(`current page: ${val}`);
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空接口的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    message(`已删除接口编号为 ${getKeyList(curSelected, "id")} 的数据`, {
      type: "success"
    });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getApiList(form);
    dataList.value = data.list;
    pagination.total = data.total;
    // pagination.pageSize = data.list.length;
    // pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    form.deptId = undefined;
    treeRef.value.onTreeReset();
    onSearch();
  };

  function onTreeSelect({ id, selected }) {
    // console.log(id, selected);
    form.deptId = selected ? id : "";
    onSearch();
  }

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    // console.log(newTreeList);
    return newTreeList;
  }

  // 获取所属部门选项
  function getHigherDeptOptions() {
    return formatHigherDeptOptions(higherDeptOptions.value);
  }

  async function openDialog(id?: number) {
    let row = ref<ApiForm>({
      id: undefined,
      apiname: "",
      password: "",
      nickname: "",
      status: true,
      description: "",
      mobile: "",
      email: "",
      deptId: 0
    });
    if (id) {
      try {
        const { data } = await getApi(id);
        row.value = data;
      } catch (e) {
        // 错误处理
      }
      FormTitle.value = "修改";
    } else {
      FormTitle.value = "新增";
    }

    if (form.deptId) {
      row.value.deptId = form.deptId;
    }

    addDialog({
      title: `${FormTitle.value}接口`,
      props: {
        formInline: row.value
      },
      width: "46%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        function chores() {
          message(`您${FormTitle.value}了接口名称为${curData}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(valid => {
          if (valid) {
            // console.log("curData", curData);
            // 表单规则校验通过
            if (id) {
              // 实际开发先调用新增接口，再进行下面操作
              updateApi(id, curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              createApi(curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  onMounted(async () => {
    treeLoading.value = true;
    onSearch();

    // 获取分组数据
    const { data } = await getApiTreeGroup();
    // higherDeptOptions.value = handleTreeWithSort(data);
    treeData.value = data;
    // treeData.value = handleTreeWithSort(data);
    // // console.log(treeData.value);
    treeLoading.value = false;

    // 角色列表
    // roleOptions.value = (await getAllRoleList()).data;
  });

  return {
    form,
    loading,
    columns,
    dataList,
    treeData,
    treeLoading,
    selectedNum,
    pagination,
    buttonClass,
    deviceDetection,
    onSearch,
    resetForm,
    onbatchDel,
    openDialog,
    onTreeSelect,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange,
    getHigherDeptOptions
  };
}
