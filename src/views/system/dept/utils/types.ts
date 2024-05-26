import type { DeptForm } from "@/api/system/dept/type";

interface FormItemProps {
  // higherDeptOptions: Record<string, unknown>[];
  id: number;
  parentId: number; // 上级部门
  name: string; // 部门名称
  leader: number[]; // 管理人
  sort: number; // 显示排序
  status: number; // 状态
  description: string; // 描述
}
interface FormProps {
  formInline: DeptForm;
}

export type { FormItemProps, FormProps };
