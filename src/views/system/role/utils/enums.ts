import type { OptionsType } from "@/components/ReSegmented";

const dataScopeOptions: Array<OptionsType> = [
  {
    label: "全部数据",
    value: 1
  },
  {
    label: "当前部门",
    value: 2
  },
  {
    label: "部门及子部门",
    value: 3
  },
  {
    label: "当前用户",
    value: 4
  },
  {
    label: "自定义部门",
    value: 5
  }
];

export { dataScopeOptions };
