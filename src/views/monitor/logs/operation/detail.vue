<script setup lang="tsx">
import { ref } from "vue";
import "vue-json-pretty/lib/styles.css";
import VueJsonPretty from "vue-json-pretty";
import PureDescriptions from "@pureadmin/descriptions";
import dayjs from "dayjs";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const columns = [
  {
    label: "IP 地址",
    prop: "ip"
  },
  {
    label: "地点",
    prop: "location"
  },
  {
    label: "操作系统",
    prop: "system"
  },
  {
    label: "浏览器类型",
    prop: "browser"
  },
  {
    label: "所属模块",
    prop: "module"
  },
  {
    label: "请求时间",
    prop: "requestTime"
  },
  {
    label: "请求方法",
    prop: "method"
  },
  {
    label: "请求耗时",
    prop: "useTime"
  },
  {
    label: "请求接口",
    prop: "path",
    copy: true
  },
  {
    label: "TraceId",
    prop: "traceId",
    copy: true
  }
];

const parseJson = (jsonStr: string): object => {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return { error: e, raw: jsonStr };
  }
};
const dataList = ref([
  {
    title: "响应头",
    name: "responseHeaders",
    data: parseJson((props.data[0] as any).responseHeaders)
  },
  {
    title: "响应体",
    name: "httpResponse",
    data: parseJson((props.data[0] as any).httpResponse)
  },
  {
    title: "请求头",
    name: "requestHeaders",
    data: parseJson((props.data[0] as any).requestHeaders)
  },
  {
    title: "请求体",
    name: "body",
    data: parseJson((props.data[0] as any).body)
  }
]);
</script>

<template>
  <div>
    <el-scrollbar>
      <PureDescriptions
        border
        :data="props.data"
        :columns="columns"
        :column="3"
      >
        <template #requestTime="{ value }">
          <el-tag size="small">{{ value }}</el-tag>
          {{ dayjs.unix(value).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </PureDescriptions>
    </el-scrollbar>
    <el-tabs :modelValue="'httpResponse'" type="border-card" class="mt-4">
      <el-tab-pane
        v-for="(item, index) in dataList"
        :key="index"
        :name="item.name"
        :label="item.title"
      >
        <el-scrollbar max-height="calc(100vh - 240px)">
          <vue-json-pretty v-model:data="item.data" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
