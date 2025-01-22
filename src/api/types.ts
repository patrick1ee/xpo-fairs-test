import type { ApiResponse } from 'apisauce'

export type DataResponse<T> = ApiResponse<{
    data: T
  }>

export interface Brand {
    BrandID: string;
    brand_name: string;
    description: string;
    exhibitor: {
      ExhibitorID: string;
      company: string;
      name: string;
      position: string;
      profile_picture: string;
    };
    exhibitor_id: string;
    hall: string;
    image_url: string;
    location: string;
    product_tag: string;
    stand_number: string;
  }

export type BrandSearchResponse = ApiResponse<{
  message: string;
  brands: Brand[]
}>
