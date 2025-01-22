import { create } from 'apisauce';
import type { ApisauceInstance } from 'apisauce';
import type { Brand, DataResponse, BrandSearchResponse } from './types';
import { getGeneralApiProblem, type GeneralApiProblem } from './apiProblem';

const BASE_URL = 'https://admin.thetoyfair.eu/api/';

class Api {
    apisauce: ApisauceInstance
  
    constructor () {
      this.apisauce = create({
        baseURL: BASE_URL,
        headers: {
          Accept: 'application/json'
        }
      })

      this.getBrands = this.getBrands.bind(this);
      this.getExhibitors = this.getExhibitors.bind(this);
  
    }
  
  async getBrands(): Promise<{ kind: 'ok'; brands: Brand[] } | GeneralApiProblem> {
    const response: DataResponse<Brand[]> = await this.apisauce.get('/brands');
  
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
  
      if (response.data === undefined) return { kind: 'bad-data' }

      const brands = response.data.data
  
      return { kind: 'ok', brands }
  }

  async searchBrand(
    brand_name: string,
    location: string,
    product_tag: string,
    hall: string
  ): Promise<{ kind: 'ok'; brands: Brand[] } | GeneralApiProblem> {
    const response: BrandSearchResponse = await this.apisauce.get(
      `/brands/search?name=${brand_name}&location=${location}`//&product_tag=${product_tag}&hall=${hall}`
      );
  
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
  
      if (response.data === undefined) return { kind: 'bad-data' }

      const brands = response.data.brands
  
      return { kind: 'ok', brands }
  }

  async getExhibitors() {
    return this.apisauce.get('/brands/exhibitor/display');
  }
 /*
  async addBrand(brandData) {
    return this.api.post('/brands/add', brandData);
  }

  async searchBrands(queryParams) {
    return this.api.get('/brands/search', queryParams);
  }

  async addExhibitor(exhibitorData) {
    return this.api.post('/brands/exhibitor/add', exhibitorData);
  }

  async getExhibitors() {
    return this.api.get('/brands/exhibitor/display');
  }

  /async editBrand(brandId, brandData) {
    return this.api.post(`/brands/edit/${brandId}`, brandData);
  }*/
}

export const api = new Api()