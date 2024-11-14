// 首先引入axios的类型定义，因为CJRequest内部依赖了axios
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors<T>
  showLoading?: boolean
}
// 使用declare关键字声明CJRequest类，让TypeScript知晓这个类的存在及结构
declare class CJRequest {
  [key: string]: any
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors
  constructor(config: MYRequestConfig)
  request<T>(config: MYRequestConfig<T>): Promise<T>
  get<T>(config: MYRequestConfig<T>): Promise<T>
  post<T>(config: MYRequestConfig<T>): Promise<T>
  delete<T>(config: MYRequestConfig<T>): Promise<T>
  patch<T>(config: MYRequestConfig<T>): Promise<T>
}

// 将CJRequest类作为默认导出，方便外部导入使用
export default CJRequest;
