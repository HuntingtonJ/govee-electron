<template>
    <div id="dashboardtile">
        <p>{{device.deviceName}}</p>
        <button @click="turnOn">On</button>
        <button @click="turnOff">Off</button>
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
    }
}
</script>

<style scoped>
    #dashboardtile {
        border-style: solid;
        margin: 1rem;
        padding: 1rem;
    }
</style>
