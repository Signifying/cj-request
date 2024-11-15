## Example
```js
// servise统一出口
import localCache from '@/utils/cache'
import CJRequest from "cj-request";
import { message, } from 'antd';

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://XXX:5000'
} else {
  BASE_URL = 'http://XXX:5000'
}

// 每个实例都能设置自己拦截器
const myRequest = new CJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config) => {
      if (config.returnCode === '-1001') {
        message.warning('请求失败',)

        console.log('请求失败~, 错误信息')
      } else {
        return config
      }
    },
    responseInterceptorCatch: (err) => {
      if (err.response.status === 404) {
        message.warning(err.response.data)
      }
      if (err.response.status === 400) {
        message.warning(err.response.data)
      }
      return err
    }
  }
})
export default myRequest
```

```ts
import { BASE_URL, TIME_OUT } from './config'
import CJRequest from 'cj-request'
import localCache from '@/utils/cache'
import { ElMessage, ElLoading } from 'element-plus'
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
const DEAFULT_LOADING = true
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://XXX:5000'
} else {
  BASE_URL = 'http://XXX:5000'
}
let loading: LoadingInstance
// 每个实例都能设置自己拦截器
const myRequest = new CJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: DEAFULT_LOADING,
  interceptors: {
    requestInterceptor: (config: any) => {
      const token = localCache.getCache('token')
      if (config.showLoading) {
        loading = ElLoading.service({
          lock: true,
          text: '正在请求数据....',
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config: any) => {
      loading?.close()
      if (config.returnCode === '-1001') {
        ElMessage.warning('请求失败',)
      } else {
        return config.data
      }
    },
    responseInterceptorCatch: (err) => {
      loading?.close()
      if (err.response.status === 404) {
        console.log('请求失败~, 404')
        ElMessage.warning(err.response.data)
      }
      if (err.response.status === 400) {
        console.log('请求失败~, 404')
        ElMessage.warning(err.response.data)
      }
      return err
    }
  }
})
export default myRequest
```