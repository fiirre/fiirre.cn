<template>
  <div>fiirre.a={{ fiirre.a }}</div>
  <div>fiirre.b={{ fiirre.b }}</div>
  <div>fiirre.c.e={{ fiirre.c.e }}</div>
  <div @click="a">aCLick</div>
</template>
<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    let fiirre = reactive({
      a: 1,
      b: 2,
      c: {
        e: 3,
      },
    })
    console.log(fiirre)
    console.log(fiirre.c)
    return { fiirre }
  },
  methods: {
    async a() {
      const b = await new Promise((resolve, reject) => {
        resolve(2)
      })
      console.log(b)
    },
  },
}
</script>
<style lang="less"></style>
