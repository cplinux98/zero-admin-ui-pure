import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  group: [{ required: true, message: "归属分组为必填项", trigger: "blur" }],
  name: [{ required: true, message: "接口名称为必填项", trigger: "blur" }],
  path: [{ required: true, message: "接口路径为必填项", trigger: "blur" }],
  method: [{ required: true, message: "接口方法为必填项", trigger: "blur" }],
  description: [
    { required: true, message: "接口描述为必填项", trigger: "blur" }
  ]
});
