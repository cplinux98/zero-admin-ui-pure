import { h, onMounted, reactive, ref, watch } from "vue";
import {
  getSelfUserInfo,
  resetUserPassword,
  uploadUserAvatar
} from "@/api/system/user";
import type {
  SelfUserInfo,
  UploadAvatarForm,
  UserResetPasswordForm
} from "@/api/system/user/type";
import { addDialog } from "@/components/ReDialog/index";
import { deviceDetection, isAllEmpty } from "@pureadmin/utils";
import ReCropperPreview from "@/components/ReCropperPreview";
import userAvatar from "@/assets/user.jpg";
import { ElForm, ElFormItem, ElInput, ElProgress } from "element-plus";
import { message } from "@/utils/message";
import { zxcvbn } from "@zxcvbn-ts/core";

export const useUserInfo = () => {
  let currentUserInfo = reactive<SelfUserInfo>({
    avatar: "",
    createTime: 0,
    deptName: "",
    description: "",
    email: "",
    mobile: "",
    nickname: "",
    roleNames: [],
    updateTime: 0,
    username: ""
  });

  // 获取当前用户信息
  function getInfo() {
    // loading.value = true
    getSelfUserInfo().then(res => {
      Object.assign(currentUserInfo, res.data);
      // currentUserInfo = res.data;
    });
  }

  const cropRef = ref();
  const avatarInfo = ref();
  /** 上传头像 */
  function handleUploadAvatar() {
    addDialog({
      title: "裁剪、上传头像",
      width: "40%",
      closeOnClickModal: false,
      fullscreen: deviceDetection(),
      contentRenderer: () =>
        h(ReCropperPreview, {
          ref: cropRef,
          imgSrc: currentUserInfo.avatar || userAvatar,
          onCropper: info => (avatarInfo.value = info)
          // circled: true,
          // quality: 1,
          // canvasOption: { width: 512, height: 512 }
        }),
      beforeSure: done => {
        // 这里的fileName无所谓，后端会使用uuid重置头像名称
        const avatarFile = new File([avatarInfo.value.blob], "avatar.png", {
          type: avatarInfo.value.blob.type,
          lastModified: Date.now()
        });

        const req: UploadAvatarForm = {
          file: avatarFile
        };

        uploadUserAvatar(req).then(() => {
          done(); // 关闭弹框
          getInfo(); // 刷新数据
        });

        // console.log("裁剪后的图片信息：", avatarInfo.value);
        // 根据实际业务使用avatarInfo.value和row里的某些字段去调用上传头像接口即可
      },
      closeCallBack: () => cropRef.value.hidePopover()
    });
  }

  /** 重置密码 */
  const ruleFormRef = ref();
  // 重置的新密码
  const pwdForm = reactive<UserResetPasswordForm>({
    id: 0,
    oldPassword: "",
    password: ""
  });

  const pwdProgress = [
    { color: "#e74242", text: "非常弱" },
    { color: "#EFBD47", text: "弱" },
    { color: "#ffa500", text: "一般" },
    { color: "#1bbf1b", text: "强" },
    { color: "#008000", text: "非常强" }
  ];
  // 当前密码强度（0-4）
  const curScore = ref();
  function handleResetPassword() {
    addDialog({
      title: "修改密码",
      width: "30%",
      draggable: true,
      closeOnClickModal: false,
      fullscreen: deviceDetection(),
      contentRenderer: () => (
        <>
          <ElForm ref={ruleFormRef} model={pwdForm}>
            <ElFormItem
              prop="oldPassword"
              rules={[
                {
                  required: true,
                  message: "请输入旧密码",
                  trigger: "blur"
                }
              ]}
            >
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.oldPassword}
                placeholder="请输入旧密码"
              />
            </ElFormItem>
            <ElFormItem
              prop="password"
              rules={[
                {
                  required: true,
                  message: "请输入新密码",
                  trigger: "blur"
                }
              ]}
            >
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.password}
                placeholder="请输入新密码"
              />
            </ElFormItem>
          </ElForm>
          <div class="mt-4 flex">
            {pwdProgress.map(({ color, text }, idx) => (
              <div
                class="w-[19vw]"
                style={{ marginLeft: idx !== 0 ? "4px" : 0 }}
              >
                <ElProgress
                  striped
                  striped-flow
                  duration={curScore.value === idx ? 6 : 0}
                  percentage={curScore.value >= idx ? 100 : 0}
                  color={color}
                  stroke-width={10}
                  show-text={false}
                />
                <p
                  class="text-center"
                  style={{ color: curScore.value === idx ? color : "" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </>
      ),
      closeCallBack: () => {
        pwdForm.password = "";
        pwdForm.oldPassword = "";
        pwdForm.id = 0;
      },
      beforeSure: done => {
        ruleFormRef.value.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            resetUserPassword(pwdForm).then(() => {
              message(`已成功修改了密码`, {
                type: "success"
              });
              // console.log(pwdForm.newPwd);
              // 根据实际业务使用pwdForm.newPwd和row里的某些字段去调用重置用户密码接口即可
              done(); // 关闭弹框
              getInfo(); // 刷新表格数据
            });
          }
        });
      }
    });
  }

  /** 监听密码修改 */
  watch(
    pwdForm,
    ({ password }) =>
      (curScore.value = isAllEmpty(password) ? -1 : zxcvbn(password).score)
  );

  onMounted(() => {
    getInfo();
  });

  return {
    currentUserInfo,
    handleUploadAvatar,
    handleResetPassword
  };
};
