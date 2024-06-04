import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
  description: [
    { required: true, message: "角色描述为必填项", trigger: "blur" }
  ],
  dataScope: [
    { required: true, message: "数据权限范围为必填项", trigger: "blur" }
  ],
  customDataScope: [
    { required: true, message: "自定义数据权限范围为必填项", trigger: "blur" }
  ]
});
