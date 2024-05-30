<script setup lang="tsx">
import { nextTick, onMounted, ref, watch } from "vue";
import ReCropper from "@/components/ReCropper";
import { formatBytes } from "@pureadmin/utils";
// import type { ImageProps } from "element-plus";
defineOptions({
  name: "ReCropperPreview"
});

const props = defineProps({
  imgSrc: String
});

const emit = defineEmits(["cropper"]);

const infos = ref();
const popoverRef = ref();
const refCropper = ref();
const showPopover = ref(false);
const cropperImg = ref<string>("");
const popoverStyle = ref({});
const referenceRef = ref();

function onCropper({ base64, blob, info }) {
  infos.value = info;
  cropperImg.value = base64;
  emit("cropper", { base64, blob, info });
}

function hidePopover() {
  popoverRef.value.hide();
}
// 获取左侧剪裁窗口的距离上下边框的高度，设置预览窗口的距离上下边框的高度
function updatePopoverStyle() {
  nextTick(() => {
    const referenceElement = referenceRef.value;
    if (referenceElement) {
      const rect = referenceElement.getBoundingClientRect();
      const distanceFromTop = rect.top;
      const distanceFromBottom = window.innerHeight - rect.bottom;

      popoverStyle.value = {
        top: `${Math.max(distanceFromTop, 10)}px`, // 距离上边框至少10px
        bottom: `${Math.max(distanceFromBottom, 10)}px` // 距离下边框至少10px
      };
    }
  });
}

onMounted(() => {
  watch(showPopover, newVal => {
    if (newVal) {
      updatePopoverStyle();
    }
  });
});

defineExpose({ hidePopover });
</script>

<template>
  <div v-loading="!showPopover" element-loading-background="transparent">
    <el-popover
      ref="popoverRef"
      :visible="showPopover"
      placement="right"
      width="18vw"
      :popper-style="popoverStyle"
    >
      <template #reference>
        <div ref="referenceRef" class="w-[18vw]">
          <ReCropper
            ref="refCropper"
            :src="props.imgSrc"
            circled
            @cropper="onCropper"
            @readied="showPopover = true"
          />
          <p v-show="showPopover" class="mt-1 text-center">
            温馨提示：右键上方裁剪区可开启功能菜单
          </p>
        </div>
      </template>
      <div class="flex flex-wrap justify-center items-center text-center">
        <el-image
          v-if="cropperImg"
          :src="cropperImg"
          :preview-src-list="Array.of(cropperImg)"
          fit="cover"
        />
        <div v-if="infos" class="mt-1">
          <p>
            图像大小：{{ parseInt(infos.width) }} ×
            {{ parseInt(infos.height) }}像素
          </p>
          <p>
            文件大小：{{ formatBytes(infos.size) }}（{{ infos.size }} 字节）
          </p>
        </div>
      </div>
    </el-popover>
  </div>
</template>
