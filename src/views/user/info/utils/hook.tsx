import { h, onMounted, reactive, ref } from "vue";
import { getSelfUserInfo, uploadUserAvatar } from "@/api/system/user";
import type { SelfUserInfo, UploadAvatarForm } from "@/api/system/user/type";
import { addDialog } from "@/components/ReDialog/index";
import { deviceDetection } from "@pureadmin/utils";
import ReCropperPreview from "@/components/ReCropperPreview";
import userAvatar from "@/assets/user.jpg";

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
  // 上传头像
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

  onMounted(() => {
    getInfo();
  });

  return {
    currentUserInfo,
    handleUploadAvatar
  };
};
