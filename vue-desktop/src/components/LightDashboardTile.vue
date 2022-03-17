<template>
    <div id="dashboardtile">
        <p>{{device.deviceName}}</p>
        <label class="switch">
            <input 
              type="checkbox" 
              id="checkbox" 
              v-model="toggle"
              true-value="on"
              false-value="off" />
            <span class="slider"></span>
        </label>
        <p>{{toggle}}</p>
    </div>
</template>

<script>
export default {
  props: {
    device: Object,
  },
  data() {
    return {
      state: 0,
      configOn: {},
      configOff: {},
      toggle: "off",
    }
  },
  watch: {
    toggle: function(val) {
      switch(val) {
        case 'on':
          this.turnOn();
          break;
        case 'off':
          this.turnOff();
          break;
        default:
          console.log('Invalid switch state: ', val);
      }
    }
  },
  mounted() {
    console.log(this.device);
    if (this.device !== {}) {
      let dataOn = JSON.stringify({
        'device': this.device.device,
        'model': this.device.model,
        'cmd': {
          'name': 'turn',
          'value': 'on',
        }
      });
      let dataOff = JSON.stringify({
        'device': this.device.device,
        'model': this.device.model,
        'cmd': {
          'name': 'turn',
          'value': 'off',
        }
      })
      this.configOn = {
        method: 'put',
        url: 'https://developer-api.govee.com/v1/devices/control',
        headers: {
          'Content-Type': 'application/json',
          'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
        data: dataOn,
      };
      this.configOff = {
        method: 'put',
        url: 'https://developer-api.govee.com/v1/devices/control',
        headers: {
          'Content-Type': 'application/json',
          'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
        data: dataOff,
      }; 
    }
      
  },
  methods: {
    async turnOn() {
      console.log(this.configOn)
      await this.axios(this.configOn)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async turnOff() {
      await this.axios(this.configOff)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changeOn() {

    },
  }
}
</script>

<style scoped>
  #dashboardtile {
    border-style: solid;
    margin: 1rem;
    padding: 1rem;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
