import type { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'cj-request' {
  export function CJRequest(
    instance: AxiosInstance,
    interceptors?: MYRequestInterceptors,
    config: MYRequestConfig
  ): Promise<T>;
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

