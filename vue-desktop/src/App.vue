<template>
  <div id="main-container">
    <LightDashboardTile
      v-for="(device, index) in devices"
      :key="index"
      :device="device"
    />
  </div>
</template>

<script>
import LightDashboardTile from './components/LightDashboardTile.vue'

export default {
  name: 'App',
  data() {
    return {
      devices: [],
    }
  },
  components: {
    LightDashboardTile
  },
  async created() {
    await this.$govee.devices()
      .then((response) => {
        this.devices = response.data.data.devices;
        console.log(this.devices);
      })
      .catch((error) => {
        console.error(error);
      })
  },
  methods: {

  }
}
</script>

<style>
body {
  margin: 0;
  background-color: rgb(67, 67, 67);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main-container {
  background-color: rgb(67, 67, 67);
  padding: 0.5rem;
  margin: 0;
}
</style>
