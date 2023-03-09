<script setup lang="ts">
import { Day } from '@/model/TDay.model'

defineProps<{
  gym: Day['gyms'][number],
  courts: Day['gyms'][number]['courts'],
  currentCourtIndex: number,
  layout: string
}>()

const emit = defineEmits(['toggle-picker', 'select-court'])

function selectCourtAndClose(indexOfSelectedCourt: number) {
  emit('select-court', indexOfSelectedCourt)
  emit('toggle-picker')
}

</script>

<template>
  <div class="wrapper">

    <div class="court-picker blurry-background"
         @click="$emit('toggle-picker')"></div>

    <div class="wrapper court-picker content">

      <button class="wrapper closer"
              @click="$emit('togglePicker')">
        <div class="closer background"> </div>
        <div class="closer icon ascending"></div>
        <div class="closer icon descending"></div>
      </button>

      <div class="court-picker content"
           :class="gym.id">

        <button class="court wrapper"
                :class="`court-${court.id}`"
                v-for="court, i in courts"
                :key="court.id"
                @click="selectCourtAndClose(i)">
          <img class="court"
               src="/court.png"
               :id="`court-${court.courtName}`">
          <label :for="`court-${court.courtName}`">{{ court.courtName }}</label>
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

      &.antilopa {
        grid-template: repeat(3, 1fr) / repeat(4, 1fr);
        gap: .2rem;
        grid-template-areas:
          "....... court-2 court-5 ......."
          "court-1 court-3 court-6 court-8"
          "....... court-4 court-7 .......";

        @for $i from 1 through 8 {
          button.court.wrapper.court-#{$i} {
            grid-area: court-#{$i};
          }
        }

        @for $i from 2 through 7 {
          button.court.wrapper.court-#{$i}>img.court {
            transform: rotate(180deg);
          }
        }
      }

      button.court.wrapper {
        position: relative;

        background: none;
        border: none;
        padding: 0;

        &:hover {
          outline: .4rem solid var(--highlight-color);
          border-radius: .4rem;
        }

        $court-width: calc(90vw / 5);

        .court {
          // width: 8rem;
          width: $court-width;
          transform: rotate(90deg);
        }

        label {
          position: absolute;
          top: 2.2rem;
          left: 0;
          // width: 8rem;
          width: $court-width;

          color: var(--highlight-color);
          font-size: 2.8rem;
          font-weight: 900;

          cursor: pointer;
        }
      }
    }
  }
}
</style>