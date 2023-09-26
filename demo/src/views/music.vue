<template>
  <div class="musicbox">
    <h1 style="color: black;">HOT MUSIC</h1>
    <div>
      <ul>
        <li>
          <audio controls src="../assets/music/Self Love伴奏.wav">Self Love</audio>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMusic'
}
</script>

<style scoped>
li {
  list-style: none;
}
.musicbox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>