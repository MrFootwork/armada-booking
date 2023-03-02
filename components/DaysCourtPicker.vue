<script setup lang="ts">
import { Day } from '@/model/TDay.model'

const props = defineProps<{
  courts: Day['gyms'][number]['courts'],
  layout: string
}>()

</script>

<template>
  <div class="wrapper">

    <div class="court-picker blurry-background"
         @click="$emit('togglePicker')"></div>

    <div class="wrapper court-picker content">

      <button class="wrapper closer"
              @click="$emit('togglePicker')">
        <div class="closer background"> </div>
        <div class="closer icon ascending"></div>
        <div class="closer icon descending"></div>
      </button>

      <div class="court-picker content">

        <button class="court wrapper">
          <img class="court"
               src="/court.png"
               id="court-1"
               alt="">
          <label for="court-1">1</label>
        </button>

        <button class="court wrapper">
          <img class="court"
               src="/court.png"
               id="court-2"
               alt="">
          <label for="court-2">2</label>

        </button>

      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;

  .court-picker.blurry-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(1px);
    z-index: -1;
  }

  .wrapper.court-picker.content {
    position: relative;
    padding: 1.2rem;
    padding-top: 2.4rem;
    z-index: 1;

    background-color: var(--card-color-secondary);
    border-radius: .8rem;
    @include buttonShadow();

    .wrapper.closer {
      position: absolute;
      top: 1rem;
      right: 2rem;
      z-index: 10;

      border: none;
      padding: 0;
      cursor: pointer;

      display: grid;
      align-items: center;
      justify-content: center;

      filter: drop-shadow(3px 3px 2px var(--ui-shadow-dark));

      .closer.background {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;

        transform: translateX(-.9rem);
      }

      .icon.closer {
        position: absolute;
        width: .2rem;
        height: 2rem;
        background-color: var(--font-color);

        &.ascending {
          transform: rotate(45deg);
        }

        &.descending {
          transform: rotate(-45deg);
        }
      }
    }

    .court-picker.content {
      display: grid;
      grid-template-columns: 1fr 1fr;

      button.court.wrapper {
        position: relative;

        background: none;
        border: none;
        padding: 0;

        &:hover {
          outline: .4rem solid var(--highlight-color);
          border-radius: .4rem;
        }

        .court {
          width: 8rem;
          aspect-ratio: 1/1;
          transform: rotate(90deg);
        }

        label {
          position: absolute;
          top: 0;
          left: 0;
          width: 8rem;
          aspect-ratio: 1/1;
          height: 100%;
          text-align: center;

          color: var(--highlight-color);
          font-size: 2.2rem;
          font-weight: 900;

          cursor: pointer;
        }
      }
    }
  }
}
</style>