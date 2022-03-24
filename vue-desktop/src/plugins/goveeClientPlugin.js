import GoveeClient from "@/api/goveeClient"

export default {
    install: (app, options) => {
        app.config.globalProperties.$govee = new GoveeClient(options.apiKey);
        app.provide('goveeClient', options);
    }
}