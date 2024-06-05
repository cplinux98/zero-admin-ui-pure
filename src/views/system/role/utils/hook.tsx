import dayjs from "dayjs";
import editForm from "../form.vue";
import { handleTree, handleTreeWithSort } from "@/utils/tree";
import { message } from "@/utils/message";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { getKeyList, deviceDetection } from "@pureadmin/utils";
import { getDeptList } from "@/api/system/dept";
import {
  createRole,
  deleteRole,
  getRole,
  getRoleApiAuthData,
  getRoleList,
  getRoleViewAuthData,
  updateRole,
  updateRoleApiAuthData,
  updateRoleViewAuthData
} from "@/api/system/role";
import {
  type Ref,
  reactive,
  ref,
  onMounted,
  h,
  toRaw,
  watch,
  computed
} from "vue";
import type {
  RoleApiAuthDataSubmitObject,
  RoleForm,
  RoleQuery,
  RoleViewAuthDataSubmitObject,
  RoleVO
} from "@/api/system/role/type";
import { pageConfigDefault } from "@/utils/pageConfigDefault";
import { getMenuList } from "@/api/system/menu";
import { getApiTreeData } from "@/api/system/api";

export function useRole(treeRef: Ref) {
  const form = reactive<RoleQuery>({
    page: 1,
    pageSize: pageConfigDefault.pageSize,
    name: undefined,
    status: undefined
  });
  const deptList = ref();
  const curRow = ref();
  const formRef = ref();
  const dataList = ref<RoleVO[]>([]);
  const treeIds = ref([]);
  const treeData = ref([]);
  const apiAuthDataTreeIds = ref([]);
  const apiAuthDataTreeData = ref([]);
  const viewAuthDataTreeIds = ref([]);
  const viewAuthDataTreeData = ref([]);

  const isShowAuth = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const treeSearchValue = ref();
  const isExpandAll = ref(false);
  const isSelectAll = ref(false);
  const { tagStyle } = usePublicHooks();
  const currentAuthType = ref("");

  const treeProps = reactive({
    value: "id",
    label: "title",
    children: "children"
  });
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色编号",
      prop: "id"
    },
    {
      label: "角色名称",
      prop: "name"
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status ? "启用" : "停用"}
        </el-tag>
      )
    },
    {
      label: "描述",
      prop: "description",
      minWidth: 160
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs.unix(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
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

  // function onChange({ row, index }) {
  //   ElMessageBox.confirm(
  //     `确认要<strong>${
  //       row.status === 0 ? "停用" : "启用"
  //     }</strong><strong style='color:var(--el-color-primary)'>${
  //       row.name
  //     }</strong>吗?`,
  //     "系统提示",
  //     {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //       dangerouslyUseHTMLString: true,
  //       draggable: true
  //     }
  //   )
  //     .then(() => {
  //       switchLoadMap.value[index] = Object.assign(
  //         {},
  //         switchLoadMap.value[index],
  //         {
  //           loading: true
  //         }
  //       );
  //       setTimeout(() => {
  //         switchLoadMap.value[index] = Object.assign(
  //           {},
  //           switchLoadMap.value[index],
  //           {
  //             loading: false
  //           }
  //         );
  //         message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
  //           type: "success"
  //         });
  //       }, 300);
  //     })
  //     .catch(() => {
  //       row.status === 0 ? (row.status = 1) : (row.status = 0);
  //     });
  // }

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    deleteRole(row.id).then(() => {
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
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function formatCustomDataScopeOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === false;
      formatCustomDataScopeOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    // console.log(newTreeList);
    return newTreeList;
  }

  function getCustomDataScopeOptions() {
    return formatCustomDataScopeOptions(deptList.value);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getRoleList(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.list.length;
    // pagination.pageSize = data.pageSize;
    // pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  async function openDialog(title = "新增", id?: number) {
    let row = ref<RoleForm>({
      // higherMenuOptions: formatHigherMenuOptions(cloneDeep(dataList.value)),
      id: undefined,
      name: "",
      sort: 1,
      status: true,
      description: "",
      dataScope: 4,
      customDataScope: []
    });
    if (id) {
      try {
        const { data } = await getRole(id);
        // console.log(data);
        row.value = data;
      } catch (error) {
        console.log(error);
      }
    }

    addDialog({
      title: `${title}角色`,
      props: {
        formInline: row
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        function chores() {
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              // chores();
              createRole(curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              // chores();
              updateRole(id, curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  /** 关闭弹窗 */
  async function handleClose() {
    isExpandAll.value = false;
    isSelectAll.value = false;
    curRow.value = null;
    isShowAuth.value = false;
    currentAuthType.value = "";
    treeIds.value = [];
    treeData.value = [];
    treeProps.label = "title";
  }

  /** 菜单权限 */
  async function handleMenu(row?: any) {
    const { id } = row;
    if (id) {
      treeIds.value = viewAuthDataTreeIds.value;
      treeData.value = viewAuthDataTreeData.value;
      treeProps.label = "title";
      currentAuthType.value = "view";
      curRow.value = row;
      isShowAuth.value = true;
      const { data } = await getRoleViewAuthData(id);
      treeRef.value.setCheckedKeys(data);
    } else {
      handleClose();
    }
  }

  /** 接口权限 */
  async function handleApi(row?: any) {
    const { id } = row;
    if (id) {
      treeIds.value = apiAuthDataTreeIds.value;
      treeData.value = apiAuthDataTreeData.value;
      treeProps.label = "label";
      currentAuthType.value = "api";
      curRow.value = row;
      isShowAuth.value = true;
      const { data } = await getRoleApiAuthData(id);
      treeRef.value.setCheckedKeys(data);
    } else {
      handleClose();
    }
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  /** 菜单权限-保存 */
  function handleSave() {
    const { id, name } = curRow.value;
    if (currentAuthType.value === "view") {
      // 根据用户 id 调用实际项目中菜单权限修改接口
      const req: RoleViewAuthDataSubmitObject = {
        menuIds: treeRef.value.getCheckedKeys()
      };
      updateRoleViewAuthData(id, req).then(() => {
        console.log(id, treeRef.value.getCheckedKeys());
        message(`角色名称为${name}的菜单权限修改成功`, {
          type: "success"
        });
      });
    } else if (currentAuthType.value === "api") {
      // 根据用户 id 调用实际项目中菜单权限修改接口
      const req: RoleApiAuthDataSubmitObject = {
        apiIds: treeRef.value.getCheckedKeys()
      };
      updateRoleApiAuthData(id, req).then(() => {
        console.log(id, treeRef.value.getCheckedKeys());
        message(`角色名称为${name}的接口权限修改成功`, {
          type: "success"
        });
      });
    } else {
      message(`未知权限类型`, {
        type: "error"
      });
    }
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };

  const filterMethod = (query: string, node) => {
    return node.title!.includes(query);
  };

  onMounted(async () => {
    onSearch();

    // 获取所有部门数据
    const deptResponse = await getDeptList();
    deptList.value = handleTreeWithSort(deptResponse.data);

    // 获取所有菜单数据
    const menuResponse = await getMenuList();
    viewAuthDataTreeIds.value = getKeyList(menuResponse.data, "id");
    viewAuthDataTreeData.value = handleTree(menuResponse.data);
    console.log(viewAuthDataTreeData.value);
    // 获取API树形数据
    const apiResponse = await getApiTreeData();
    apiAuthDataTreeIds.value = apiResponse.data.allIds;
    apiAuthDataTreeData.value = apiResponse.data.treeData;
  });

  watch(isExpandAll, val => {
    val
      ? treeRef.value.setExpandedKeys(treeIds.value)
      : treeRef.value.setExpandedKeys([]);
  });

  watch(isSelectAll, val => {
    val
      ? treeRef.value.setCheckedKeys(treeIds.value)
      : treeRef.value.setCheckedKeys([]);
  });

  return {
    form,
    isShowAuth,
    curRow,
    loading,
    columns,
    rowStyle,
    dataList,
    treeData,
    treeProps,
    isLinkage,
    pagination,
    isExpandAll,
    isSelectAll,
    treeSearchValue,
    buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleSave,
    handleDelete,
    filterMethod,
    onQueryChanged,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    getCustomDataScopeOptions,
    handleApi,
    handleClose
  };
}
