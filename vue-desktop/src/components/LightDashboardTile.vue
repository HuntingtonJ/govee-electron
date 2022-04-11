<template>
  <div id="dashboardtile">
    <p style="display:inline-block; margin-right: 0.5rem">{{device.deviceName}}</p>
    <button type="button" id="refresh" @click="getState">
      🗘
    </button>
    <p>online: {{online}}</p>
    <label class="switch">
      <input 
        type="checkbox" 
        id="checkbox1" 
        v-model="toggle"
        true-value="on"
        false-value="off" />
      <span id="slider1" class="slider"></span>
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
        v-model="brightness"
        :disabled="toggle === 'off'" />
      <label for="brightnessSlider">{{brightness}}</label>
    </div>

    <div id="colorModeDiv">
      <label class="switch">
        <input 
          type="checkbox" 
          id="checkbox2" 
          v-model="colorMode"
          true-value="color"
          false-value="temp" />
        <span id="slider2" class="slider"></span>
      </label>
      <p>Mode: {{colorMode}}</p>

      <div v-if="colorMode === 'temp'" class="slidecontainer">
        <p>Color Temp</p>
        <input 
          type="range" 
          min="2000" 
          max="9000"
          step="1000"
          class="rangeslider" 
          id="colorTemSlider"
          v-model="colorTemInKelvin"
          :disabled="toggle === 'off'" />
        <label for="colorTemSlider">{{colorTemInKelvin}}</label>
      </div>

      <div v-else-if="colorMode ==='color'" class="colorpickercontainer">
        <p>Color</p>
        <input
          type="color"
          id="colorPicker"
          class="colorPicker"
          v-model="color"
          :disabled="toggle === 'off'" />
        <label for="colorPicker">{{color}}</label>
      </div>
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
      colorMode: "temp",
      configOn: {},
      configOff: {},
      online: false,
      toggle: "off",
      brightness: 0,
      colorTemInKelvin: 3100,
      color: '#000000',
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
    },
    color: function(val) {
      console.log("Color: ", val);
      this.setColor(val);
    }
  },
  mounted() {
    console.log(this.device);
    if (this.device !== {}) {
      this.getState();
    }
  },
  created() {

  },
  methods: {
    async turnOn() {
      await this.$govee.turnOn(this.device.device, this.device.model)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async turnOff() {
      await this.$govee.turnOff(this.device.device, this.device.model)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getState() {
      await this.$govee.state(this.device.device, this.device.model)
        .then((response) => {
          console.log(response.data.data.properties);
          const properties = response.data.data.properties;

          this.online = properties[0].online;
          this.toggle = properties[1].powerState;
          this.brightness = properties[2].brightness;
          if ('colorTemInKelvin' in properties[3]) {
            this.colorTemInKelvin = properties[3].colorTemInKelvin;
            this.colorMode = 'temp';
          } else if ('color' in properties[3]) {
            let color = properties[3].color;
            let r = color.r.toString(16);
            let g = color.g.toString(16);
            let b = color.b.toString(16);
            if (r.length < 2) {
              r = `${0}${r}`;
            }
            if (g.length < 2) {
              g = `${0}${g}`;
            }
            if (b.length < 2) {
              b = `${0}${b}`;
            }
            this.color = `#${r}${g}${b}`;
            this.colorMode = 'color';
          }
          
        })
        .catch((error) => {
          console.error(error);
        })
    },
    async setBrightness(brightness) {
      await this.$govee.brightness(this.device.device, this.device.model, parseInt(brightness, 10))
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async setColorTemp(colorTemp) {
      await this.$govee.colorTemp(this.device.device, this.device.model, parseInt(colorTemp, 10))
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async setColor(color) {
      await this.$govee.color(this.device.device, this.device.model, color)
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
    margin: 1rem;
    padding: 0.5rem;
    background-color: darkslategray;
    color: floralwhite;
    border-radius: 0.5rem;
  }

  #colorModeDiv {
    margin: 0.5rem;
    padding: 0.5rem;
    background-color: lightslategray;
    border-radius: 0.5rem;
  }

  p {
    margin: 0rem 0rem 0.5rem 0rem;
  }

  .slidecontainer p { 
    margin: 0rem;
  }

  #refresh {
    display: inline-block;
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

  input:checked + #slider1.slider {
    background-color: #21f321;
  }

  input:focus + #slider1.slider {
    box-shadow: 0 0 1px #21f321;
  }

  input:not(:checked) + #slider2.slider {
    background: linear-gradient(rgb(255, 255, 182), rgb(213, 245, 255))
  }

  input:checked + #slider2.slider {
    background:
      linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
      linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
      linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  }

  input:focus + #slider2.slider {
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
