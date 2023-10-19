<script setup>
import {
  useUserStore
} from '@/store/modules/user.js';


onMounted(() => {
  // 清空本地数据
  useUserStore().initToken('tttttttt', {name: 'iu'})

  const {
    Authorization,
    USER_MSG
  } = toRefs(useUserStore())
  console.log("💙💛初始化本地数据", Authorization, USER_MSG)
})
</script>

<template>
  <view class='container'>
    <!--  pa left-100 top-100  -->
    <button w-200 h-80 bg-blue f-c m-0 text="40 red" b="2 solid green rd-20">11</button>
  </view>
</template>
