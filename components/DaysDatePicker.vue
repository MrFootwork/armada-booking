<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue';
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js';
import { useLanguage } from '@/store/language'

// language
const { preferred } = useLanguage()

const props = defineProps<{ dateString: string }>()
const initialDate = ref(props.dateString)

const inputDay = ref(initialDate)
</script>

<template>

  <div class="selector date-picker">

    <button>
      <SvgIcon class="icon left" type="mdi" :path="mdiMenuLeft"></SvgIcon>
    </button>

    <input type="date" name="" id="" v-model="inputDay" :lang="preferred">

    <button>
      <SvgIcon class="icon right" type="mdi" :path="mdiMenuRight"></SvgIcon>
    </button>

    <p>props: {{ props }}</p>
    <p>inputDay: {{ inputDay }}</p>
  </div>
</template>

<style scoped lang="scss">
.selector.date-picker {}
</style>