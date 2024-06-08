import dayjs from "dayjs";
import { message } from "@/utils/message";
import { reactive, ref, onMounted } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import {
  forceLogoutOnlineUser,
  getOnlineUserList
} from "@/api/monitor/loginLog";
import type { OnlineUserQuery } from "@/api/monitor/loginLog/type";
import { pageConfigDefault } from "@/utils/pageConfigDefault";

export function useRole() {
  const form = reactive<OnlineUserQuery>({
    page: 1,
    pageSize: pageConfigDefault.pageSize,
    username: undefined
  });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "会话id",
      prop: "sessionUUID",
      minWidth: 200
    },
    {
      label: "用户名",
      prop: "username",
      minWidth: 100
    },
    {
      label: "登录 IP",
      prop: "ip",
      minWidth: 140
    },
    {
      label: "登录地点",
      prop: "location",
      minWidth: 140
    },
    {
      label: "操作系统",
      prop: "system",
      minWidth: 150
    },
    {
      label: "浏览器类型",
      prop: "browser",
      minWidth: 100
    },
    {
      label: "登录时间",
      prop: "loginTime",
      minWidth: 180,
      formatter: ({ loginTime }) =>
        dayjs.unix(loginTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];

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

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function handleOffline(row) {
    if (row.sessionUUID) {
      forceLogoutOnlineUser({ sessionUUID: row.sessionUUID }).then(() => {
        message(`会话${row.sessionUUID}已被强制下线`, { type: "success" });
        onSearch();
      });
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getOnlineUserList(form);
    dataList.value = data.list;
    pagination.total = data.total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleOffline,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
