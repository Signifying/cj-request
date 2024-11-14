import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'cj-request' {
  export class CJRequest {
    instance: AxiosInstance
    config: MYRequestConfig
    interceptors?: MYRequestInterceptors
  }
  export interface MYRequestInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?: (error: any) => any
  }
  export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: MYRequestInterceptors<T>
    showLoading?: boolean
  }
}

