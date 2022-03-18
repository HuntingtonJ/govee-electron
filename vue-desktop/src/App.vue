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
    let config = {
      method: 'get',
      url: 'https://developer-api.govee.com/v1/devices/',
      headers: {
        'Content-Type': 'application/json',
        'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
    };
    await this.axios(config)
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#main-container {
  background-color: rgb(67, 67, 67);
  padding: 0.5rem;
}
</style>
