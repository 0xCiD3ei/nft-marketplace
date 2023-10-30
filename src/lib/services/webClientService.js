import axios from "axios";

class WebClientService {
  apiBase = process.env.NEXT_PUBLIC_API_BASE || '/api/v1';

  
  async getCategories() {
    const {data} = await this.api('categories', {}, {
      method: 'GET'
    })
    return data;
  }
  
  async getCategoryById(payload) {
    const {data} = await this.api(`categories/${payload.categoryId}`, {}, {
      method: "GET"
    })
    return data;
  }
  
  async createNFT(payload) {
    const {data} = await this.api('nfts/create', payload, {
      method: 'POST'
    })
    return data;
  }
  
  async getAllNFTs() {
    const {data} = await this.api('nfts', {}, {
      method: 'GET'
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
  
  async getAccountByAddress(address) {
    const {data} = await this.api(`account/${address}`, {}, {
      method: 'GET'
    })
    return data;
  }
  
  async updateProfile(payload) {
    const {data} = await this.api(`account/update`, payload, {
      method: 'PATCH'
    })
    return data;
  }
  
  async followingUser(payload) {
    const {data} = await this.api(`account/follow/${payload.accountId}/${payload.followerId}`, {}, {
      method: 'POST'
    });
    
    return data;
  }
  
  async getFollowerAccounts(payload) {
    const {data} = await this.api(`account/follow/${payload.accountId}`, {}, {
      method: 'GET'
    })
    
    return data;
  }
  
  async getFollowingAccounts(payload) {
    const {data} = await this.api(`account/follow/${payload.accountId}/following`, {}, {
      method: 'GET'
    })
    
    return data;
  }
  
  async favouritesNFT(payload) {
    const {data} = await this.api(`nfts/favourites/${payload.accountId}/${payload.nftId}`, {}, {
      method: "POST"
    })
    
    return data;
  }
  
  async getNFTById(nftId) {
    const {data} = await this.api(`nfts/nft/${nftId}`, {}, {
      method: "GET"
    })
    return data;
  }
  
  async getFavouritesAccount(payload) {
    const {data} = await this.api(`nfts/favourites/${payload.accountId}`, {}, {
      method: "GET"
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