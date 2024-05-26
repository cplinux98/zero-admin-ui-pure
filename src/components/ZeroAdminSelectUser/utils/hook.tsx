import { h, onMounted, reactive, type Ref, ref, toRaw } from "vue";
import { addDialog } from "@/components/ReDialog/index";
import { getDeptList, getUserByIds, getUserList } from "@/api/system";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import selectUserView from "@/components/ZeroAdminSelectUser/selectUserView.vue";
import { handleTree } from "@/utils/tree";

export const selectedUserIds = ref([]);

export function useUser(
  tableRef?: Ref,
  treeRef?: Ref,
  selectUserViewRef?: Ref
) {
  const form = reactive({
    // 左侧部门树的id
    deptId: "",
    username: "",
    phone: "",
    status: ""
  });
  const columns: TableColumnList = [
    {
      label: "用户编号",
      prop: "id",
      width: 90
    },
    {
      label: "用户名称",
      prop: "username",
      minWidth: 130
    },
    {
      label: "用户昵称",
      prop: "nickname",
      minWidth: 130
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  const selectedUser = ref([]);
  const treeData = ref([]);
  const treeLoading = ref(true);
  const loading = ref(true);
  const dataList = ref([]);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  // **** 已被选中的
  const selectedIds = ref<number[]>([]);
  const selectedUserData = ref<any[]>([]); // 所有被选中的数据
  const selectedUserPageData = ref([]); // 被选中的数据
  // const selectUserQueryFormRef = ref(ElForm);
  const selectedPagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  function handleSelectedUserPage() {
    const startIndex: number =
      (selectedPagination.currentPage - 1) * selectedPagination.pageSize;
    const endIndex: number = startIndex + selectedPagination.pageSize;
    selectedUserPageData.value = selectedUserData.value.slice(
      startIndex,
      endIndex
    );
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getUserList(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function onTreeSelect({ id, selected }) {
    form.deptId = selected ? id : "";
    onSearch();
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    form.deptId = "";
    treeRef.value.onTreeReset();
    onSearch();
  };

  function openDialog() {
    addDialog({
      title: "选择用户",
      width: "90%",
      contentRenderer: () => h(selectUserView, { ref: selectUserViewRef })
    });
  }
  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectUser(row: { [key: string]: any }) {
    if (!selectedUserData.value.includes(row)) {
      selectedIds.value.push(row.id);
      selectedUserData.value.push(row);
      selectedPagination.total = selectedUserData.value.length;
    }
    handleSelectedUserPage();
  }
  function handleRemoveUser(id: number) {
    selectedIds.value = selectedIds.value.filter((item: number) => item !== id);
    selectedUserData.value = selectedUserData.value.filter(
      (item: { [key: string]: any }) => item.id !== id
    );
    selectedPagination.total = selectedUserData.value.length;
    handleSelectedUserPage();
  }

  function handleSelectedSizeChange(val: number) {
    selectedPagination.pageSize = val;
    handleSelectedUserPage();
    // console.log(`${val} items per page`);
  }

  function handleSelectedCurrentChange(val: number) {
    selectedPagination.currentPage = val;
    handleSelectedUserPage();
    // console.log(`current page: ${val}`);
  }

  /** 判断是否为选中状态 **/
  function getSelectStatus(id: number) {
    return selectedIds.value.includes(id);
  }

  /** 根据selectedIds 获取选中用户信息 **/
  async function getSelectedUserData() {
    loading.value = true;
    const { data } = await getUserByIds(selectedIds.value);
    console.log(data);
    selectedUserData.value = data.list;

    selectedPagination.total = selectedUserData.value.length;

    handleSelectedUserPage();
    loading.value = false;
  }

  onMounted(async () => {
    treeLoading.value = true;
    onSearch();

    // 归属部门
    const { data } = await getDeptList();
    treeData.value = handleTree(data);
    treeLoading.value = false;

    // 查找已选用户的信息
    selectedIds.value = selectedUserIds.value;
    if (selectedIds.value.length > 0) {
      getSelectedUserData();
    }

    // debug
    console.log(selectedIds.value);
  });

  return {
    handleSizeChange,
    handleCurrentChange,
    selectedUser,
    openDialog,
    treeData,
    treeLoading,
    onTreeSelect,
    resetForm,
    loading,
    dataList,
    pagination,
    onSearch,
    deviceDetection,
    form,
    columns,
    handleSelectUser,
    handleRemoveUser,
    selectedIds,
    selectedUserData,
    selectedUserPageData,
    selectedPagination,
    handleSelectedUserPage,
    handleSelectedSizeChange,
    handleSelectedCurrentChange,
    getSelectStatus
  };
}
