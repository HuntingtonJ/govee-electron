import axios from 'axios';

export default class GoveeClient {
  constructor(api_key) {
      this.api_key = api_key;
      this.baseURL = 'https://developer-api.govee.com'
      this.routes = {
        STATE: '/v1/devices/state',
        CONTROL: '/v1/devices/control'
      }
  }

  async state(device, model) {
    let response = null;
    let parameters = {
      device: device,
      model: model,
    }
    let config = this.createAxiosConfig('get', this.routes.STATE, parameters, {})

    try {
      response = await axios(config);
    } catch(error) {
      console.error("Govee state error: ", error);
    }

    return response;
  }

  async turnOn(device, model) {
    let response = null;
    let cmdOn = JSON.stringify({
      'device': device,
      'model': model,
      'cmd': {
        'name': 'turn',
        'value': 'on',
      }
    });
    let config = this.createAxiosConfig('put', this.routes.CONTROL, {}, cmdOn);

    try {
      response = await axios(config);
    } catch(error) {
      console.error("Govee control error: ", error);
    }

    return response;
  }

  async turnOff(device, model) {
    let response = null;
    let cmdOff = JSON.stringify({
      'device': device,
      'model': model,
      'cmd': {
        'name': 'turn',
        'value': 'off',
      }
    });
    let config = this.createAxiosConfig('put', this.routes.CONTROL, {}, cmdOff);

    try {
      response = await axios(config);
    } catch(error) {
      console.error("Govee control error: ", error);
    }

    return response;
  }

  async brightness(device, model, brightness) {
    let response = null;
    let cmdBrightness = JSON.stringify({
      'device': device,
      'model': model,
      'cmd': {
        'name': 'brightness',
        'value': brightness,
      }
    });
    let config = this.createAxiosConfig('put', this.routes.CONTROL, {}, cmdBrightness);

    try {
      response = await axios(config);
    } catch(error) {
      console.error("Govee control error: ", error);
    }

    return response;
  }

  async colorTemp(device, model, colorTemp) {
    let response = null;
    let cmdColorTemp = JSON.stringify({
      'device': device,
      'model': model,
      'cmd': {
        'name': 'colorTem',
        'value': colorTemp,
      }
    });
    let config = this.createAxiosConfig('put', this.routes.CONTROL, {}, cmdColorTemp);

    try {
      response = await axios(config);
    } catch(error) {
      console.error("Govee control error: ", error);
    }

    return response;
  }

  async color(device, model, color) {
    let response = null;
    let cmdColor = JSON.stringify({
      'device': device,
      'model': model,
      'cmd': {
        'name': 'color',
        'value': this.hexToRGB(color),
      }
    });
    let config = this.createAxiosConfig('put', this.routes.CONTROL, {}, cmdColor);

    try {
      response = await axios(config);
    } catch(error) {
      console.error("Govee control error: ", error);
    }

    return response;
  }

  createAxiosConfig(method, baseRoute, parameters, cmd) {
    let url = this.createAxiosRoute(baseRoute, parameters);
    let config = {
      method: method,
      url: url,
      headers: { 
        'Content-Type': 'application/json',
        'Govee-API-Key': '492bc24d-a091-45a2-ac1d-08c54ce97570',
        'Access-Control-Allow-Origin': '*',
      },
      data: cmd,
    }

    return config;
  }

  createAxiosRoute(baseRoute, parameters) {
    let route = this.baseURL + baseRoute;
    let params = this.createAxiosParameters(parameters);
    route += params;

    console.log(route);
    return route;
  }

  createAxiosParameters(parameters) {
    let parameterStr = '?';
    if (typeof parameters !== 'object') {
      console.error('Not type object');
      return parameterStr;
    }

    for (const property in parameters) {
      parameterStr += `${property}=${parameters[property]}&`;
      console.log(parameterStr);
    }

    return parameterStr.slice(0, parameterStr.length - 1);
  }

  hexToRGB(h) {
    let r = 0, g = 0, b = 0;

    r = parseInt(`${h[1]}${h[2]}`, 16);
    g = parseInt(`${h[3]}${h[4]}`, 16);
    b = parseInt(`${h[5]}${h[6]}`, 16);

    const color = {
      "r": r,
      "g": g,
      "b": b,
    }
    
    return color;
  }
}