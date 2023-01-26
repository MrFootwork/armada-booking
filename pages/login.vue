<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="card">
      <input type="password" name="password" id="password" placeholder="Enter password here!">
      <button>Login</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  div.card {
    @include cardStyle;

    width: clamp(10rem, 50vw, 20rem);
    translate: 0 -16.5vh;

    input {
      border: none;
      padding: .5rem;
      border-radius: $round-corner;
      box-sizing: border-box;

      width: 100%;

      color: $font-color;
      text-align: center;

      background-color: $card-color;
      box-shadow:
        inset 2px 2px 5px 1px #222,
        inset -2px -2px 5px -3px #777;
    }

    button {
      border: none;
      padding: .5rem;
      border-radius: 5px;
      margin-top: 3rem;

      width: 100%;
      cursor: pointer;

      color: $font-color;
      text-align: center;

      background-color: $card-color;
      box-shadow:
        2px 2px 5px 1px #222,
        -2px -2px 5px -3px #777;

      &:hover,
      &:focus {
        background-color: $button-color;
      }

      &:active {
        background-color: $button-color;
        transform: translateY(2px);
      }
    }
  }
}
</style>