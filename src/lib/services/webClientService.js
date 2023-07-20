import axios from "axios";

class WebClientService {
  apiBase = process.env.NEXT_PUBLIC_API_BASE || '/api/v1';
  
  async login(payload) {
    const {data} = await this.api('auth/login', {
      email: payload.email,
      password: payload.password
    }, {
      method: 'POST'
    })
    
    return data;
  }
  
  async register(payload) {
    const {data} = await this.api('auth/register', {
      email: payload.email,
      password: payload.password
    }, {
      method: 'POST'
    })
    
    return data;
  }
  
  async logout() {
    const {data} = await this.api('auth/logout', {}, {
      method: 'POST'
    })
    
    return data;
  }
  
  async getCategories() {
    const {data} = await this.api('categories', {}, {
      method: 'GET'
    })
    return data;
  }
  
  async createNFT(payload) {
    const {data} = await this.api('nfts/create', payload, {
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

// eslint-disable-next-line import/no-anonymous-default-export
export default new WebClientService();