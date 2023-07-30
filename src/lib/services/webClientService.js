import axios from "axios";

class WebClientService {
  apiBase = process.env.NEXT_PUBLIC_API_BASE || '/api/v1';

  
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
  
  async checkWalletAddress(payload) {
    const {data} = await this.api(`address/${payload.address}`, {}, {
      method: 'POST'
    })
    return data;
  }
  
  async disconnectWallet() {
    const {data} = await this.api('address/disconnect', {}, {
      method: 'POST'
    })
    return data;
  }
  
  async getAccount() {
    const {data} = await this.api('account', {}, {
      method: 'GET'
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