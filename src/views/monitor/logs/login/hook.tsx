import dayjs from "dayjs";

import { usePublicHooks } from "@/views/system/hooks";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, watch } from "vue";
import { getLoginLogList } from "@/api/monitor/loginLog";
import type { LoginLogQuery } from "@/api/monitor/loginLog/type";
import { pageConfigDefault } from "@/utils/pageConfigDefault";

export function useLoginLog() {
  const form = reactive<LoginLogQuery>({
    page: 0,
    pageSize: pageConfigDefault.pageSize,
    username: undefined,
    status: undefined,
    startTime: undefined,
    endTime: undefined
  });
  const dateTimeRange = ref("");
  watch(dateTimeRange, newVal => {
    if (newVal) {
      form.startTime = newVal[0];
      form.endTime = newVal[1];
    }
  });
  const dataList = ref([]);
  const loading = ref(true);
  const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const getActionType = (type, text = false) => {
    switch (type) {
      case 1:
        return text ? "用户名密码" : "primary";
    }
  };

  const columns: TableColumnList = [
    {
      label: "序号",
      prop: "id",
      minWidth: 90
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
      minWidth: 100
    },
    {
      label: "浏览器类型",
      prop: "browser",
      minWidth: 100
    },
    {
      label: "登录状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status ? "成功" : "失败"}
        </el-tag>
      )
    },
    {
      label: "登录行为",
      prop: "action",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={getActionType(row.action)}
          effect="plain"
        >
          {getActionType(row.action, true)}
        </el-tag>
      )
    },
    {
      label: "登录时间",
      prop: "loginTime",
      minWidth: 180,
      formatter: ({ loginTime }) =>
        dayjs.unix(loginTime).format("YYYY-MM-DD HH:mm:ss")
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

  async function onSearch() {
    loading.value = true;
    const { data } = await getLoginLogList(form);
    dataList.value = data.list;
    pagination.total = data.total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    dateTimeRange.value = "";
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    dateTimeRange,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleSizeChange,
    handleCurrentChange
  };
}
