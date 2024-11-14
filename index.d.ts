import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'cj_request' {
  export default class CJRequest {
    instance: AxiosInstance
    interceptors?: MYRequestInterceptors
    constructor(config: MYRequestConfig)
    request<T>(config: MYRequestConfig<T>): Promise<T>
    get<T>(config: MYRequestConfig<T>): Promise<T>
    post<T>(config: MYRequestConfig<T>): Promise<T>
    delete<T>(config: MYRequestConfig<T>): Promise<T>
    patch<T>(config: MYRequestConfig<T>): Promise<T>
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

