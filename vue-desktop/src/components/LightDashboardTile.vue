<template>
    <div id="dashboardtile">
        <p>{{device.deviceName}}</p>
        <p>online: {{online}}</p>
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
        
        <div class="slidecontainer">
          <p>Brightness %</p>
          <input 
            type="range" 
            min="0" 
            max="100"
            step="10"
            class="rangeslider" 
            id="brightnessSlider"
            v-model="brightness" />
          <label for="brightnessSlider">{{brightness}}</label>
        </div>

        <div class="slidecontainer">
          <p>Color Temp</p>
          <input 
            type="range" 
            min="2000" 
            max="9000"
            step="1000"
            class="rangeslider" 
            id="colorTemSlider"
            v-model="colorTemInKelvin" />
          <label for="colorTemSlider">{{colorTemInKelvin}}</label>
        </div>
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
      online: false,
      toggle: "off",
      brightness: 0,
      colorTemInKelvin: 3100,
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
    },
    brightness: function(val) {
      console.log(val);
      if (this.toggle === 'on') {
        this.setBrightness(val);
      }
    },
    colorTemInKelvin: function(val) {
      console.log(val);
      if (this.toggle === 'on') {
        this.setColorTemp(val);
      }
    }
  },
  mounted() {
    console.log(this.device);
    if (this.device !== {}) {
      this.getState();
    }
  },
  methods: {
    async turnOn() {
      console.log(this.configOn)
      let dataOn = JSON.stringify({
        'device': this.device.device,
        'model': this.device.model,
        'cmd': {
          'name': 'turn',
          'value': 'on',
        }
      });
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
      await this.axios(this.configOn)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async turnOff() {
      let dataOff = JSON.stringify({
        'device': this.device.device,
        'model': this.device.model,
        'cmd': {
          'name': 'turn',
          'value': 'off',
        }
      })
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
      await this.axios(this.configOff)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getState() {
      let config = {
        method: 'get',
        url: `https://developer-api.govee.com/v1/devices/state?device=${this.device.device}&model=${this.device.model}`,
        headers: { 
          'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
          'Access-Control-Allow-Origin': '*',
        }
      }

      await this.axios(config)
        .then((response) => {
          console.log(response.data.data.properties);
          const properties = response.data.data.properties;

          this.online = properties[0].online;
          this.toggle = properties[1].powerState;
          this.brightness = properties[2].brightness;
          this.colorTemInKelvin = properties[3].colorTemInKelvin;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    async setBrightness(brightness) {
      let dataBrightness = JSON.stringify({
        'device': this.device.device,
        'model': this.device.model,
        'cmd': {
          'name': 'brightness',
          'value': parseInt(brightness, 10),
        }
      });
      let config = {
        method: 'put',
        url: 'https://developer-api.govee.com/v1/devices/control',
        headers: {
          'Content-Type': 'application/json',
          'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
        data: dataBrightness,  
      };
      await this.axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async setColorTemp(colorTemp) {
      let dataColorTemp = JSON.stringify({
        'device': this.device.device,
        'model': this.device.model,
        'cmd': {
          'name': 'colorTem',
          'value': parseInt(colorTemp, 10),
        }
      });
      let config = {
        method: 'put',
        url: 'https://developer-api.govee.com/v1/devices/control',
        headers: {
          'Content-Type': 'application/json',
          'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
        data: dataColorTemp,  
      };
      await this.axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }
}
</script>

<style scoped>
  #dashboardtile {
    border-style: solid;
    margin: 1rem;
    padding: 0.5rem;
  }

  .slider

  p {
    margin: 0rem 0rem 0.5rem 0rem;
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

  /* .brightnessSlider::-webkit-slider-thumb {
    background: url('contrasticon.png');
  } */
</style>
