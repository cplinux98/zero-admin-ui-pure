import type { OptionsType } from "@/components/ReSegmented";

const apiMethodOptions: Array<OptionsType> = [
  {
    label: "GET",
    value: 0
  },
  {
    label: "POST",
    value: 1
  },
  {
    label: "PUT",
    value: 2
  },
  {
    label: "DELETE",
    value: 3
  },
  {
    label: "PATCH",
    value: 4
  }
];

export { apiMethodOptions };
export const ApiSupportMethod = ["GET", "POST", "PUT", "DELETE", "PATCH"];
