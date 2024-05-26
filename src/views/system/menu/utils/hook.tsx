import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenuList,
  updateMenu
} from "@/api/system/menu";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h } from "vue";
import type { FormItemProps } from "../utils/types";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { cloneDeep, isAllEmpty, deviceDetection } from "@pureadmin/utils";

export function useMenu() {
  const form = reactive({
    title: ""
  });

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  const getMenuType = (type, text = false) => {
    switch (type) {
      case 0:
        return text ? "菜单" : "primary";
      case 1:
        return text ? "iframe" : "warning";
      case 2:
        return text ? "外链" : "danger";
      case 3:
        return text ? "按钮" : "info";
    }
  };

  const columns: TableColumnList = [
    {
      label: "菜单编号",
      prop: "id",
      align: "left"
    },
    {
      label: "菜单名称",
      prop: "title",
      // align: "left",
      cellRenderer: ({ row }) => (
        <>
          <span class="inline-block mr-1">
            {h(useRenderIcon(row.icon), {
              style: { paddingTop: "1px" }
            })}
          </span>
          <span>{row.title}</span>
        </>
      )
    },
    {
      label: "菜单类型",
      prop: "menuType",
      width: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={getMenuType(row.menuType)}
          effect="plain"
        >
          {getMenuType(row.menuType, true)}
        </el-tag>
      )
    },
    {
      label: "路由路径",
      prop: "path"
    },
    {
      label: "组件路径",
      prop: "component",
      formatter: ({ path, component }) =>
        isAllEmpty(component) ? path : component
    },
    {
      label: "权限标识",
      prop: "auths"
    },
    {
      label: "排序",
      prop: "rank",
      width: 100
    },
    {
      label: "隐藏",
      prop: "showLink",
      formatter: ({ showLink }) => (showLink ? "否" : "是"),
      width: 100
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getMenuList(); // 这里是返回一维数组结构，前端自行处理成树结构，返回格式要求：唯一id加父节点parentId，parentId取父节点id
    let newData = data;
    if (!isAllEmpty(form.title)) {
      // 前端搜索菜单名称
      newData = newData.filter(item => item.title.includes(form.title));
    }
    dataList.value = handleTree(newData); // 处理成树结构
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function formatHigherMenuOptions(treeList) {
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      // 菜单按钮不应该为上级菜单
      if (treeList[i].menuType === 3) {
        continue;
      }
      formatHigherMenuOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  // 获取上级菜单选项
  function getHigherMenuOptions() {
    return formatHigherMenuOptions(cloneDeep(dataList.value));
  }

  async function openDialog(title = "新增", id?: number, parentId?: number) {
    let row = ref<FormItemProps>({
      // higherMenuOptions: formatHigherMenuOptions(cloneDeep(dataList.value)),
      id: 0,
      menuType: 0,
      parentId: 0,
      title: "",
      name: "",
      path: "",
      component: "",
      rank: 99,
      redirect: "",
      icon: "",
      extraIcon: "",
      // enterTransition: "",
      // leaveTransition: "",
      activePath: "",
      perm: "",
      frameSrc: "",
      frameLoading: true,
      keepAlive: false,
      hiddenTag: false,
      fixedTag: false,
      showLink: true,
      showParent: false
    });
    if (id) {
      try {
        const { data } = await getMenu(id);
        // console.log(data);
        row.value = data;
      } catch (error) {
        console.log(error);
      }
    }

    if (parentId) {
      row.value.parentId = parentId;
    }

    // console.log(row.value);
    addDialog({
      title: `${title}菜单`,
      props: {
        formInline: row.value
      },
      width: "45%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了菜单名称为${curData.title}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            // curData.higherMenuOptions = [];
            // console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              // onSave(0, curData);
              try {
                loading.value = true;
                await createMenu(curData);
                chores();
              } catch (e) {
                // you can report use errorHandler or other
              } finally {
                loading.value = false;
              }
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              try {
                loading.value = true;
                await updateMenu(id, curData);
                chores();
              } catch (e) {
                // you can report use errorHandler or other
              } finally {
                loading.value = false;
              }
            }
          }
        });
      }
    });
  }

  async function handleDelete(row) {
    try {
      await deleteMenu(row.id);
      message(`您删除了菜单名称为${row.title}的这条数据`, {
        type: "success"
      });
      onSearch();
    } catch (e) {}
  }

  onMounted(() => {
    onSearch();
  });

  return {
    // /** 默认值 **/
    // defaultRow,
    getHigherMenuOptions,
    form,
    loading,
    columns,
    dataList,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、修改菜单 */
    openDialog,
    /** 删除菜单 */
    handleDelete,
    handleSelectionChange
  };
}
