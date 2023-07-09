import axios from "axios";

class WebClientService {
  apiBase = process.env.NEXT_PUBLIC_API_BASE || '/api/v1';
  
  async login(payload) {
    const {data} = await this.api('auth/login', {
      payload
    }, {
      method: 'POST'
    })
    
    return data;
  }
  
  async register(payload) {
    const {data} = await this.api('auth/register', {
      payload
    }, {
      method: 'POST'
    })
    
    return data;
  }
  
  api(endPoint, data, options) {
    return axios({
      url: `${this.apiBase}/${endPoint}`,
      data: data,
      ...options
    })
  }
}

export default new WebClientService();