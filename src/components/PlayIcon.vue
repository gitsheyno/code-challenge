<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width="50px"
    height="50px"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      :fill="`${data?.out}`"
      :stroke="`${data?.out}`"
      stroke-width="1.5"
    />
    <path
      d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z"
      :stroke="`${data?.in}`"
      stroke-width="0.1"
      :fill="`${data?.in}`"
    />
  </svg>
</template>
<script lang="ts" setup>
import { type IconStyle } from "../types/types";

defineProps<{ data: IconStyle }>();
</script>
