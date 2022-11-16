// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** get frpc GET /api/frpc */
export async function getFrpc(options?: { [key: string]: any }) {
  return request<any>('/api/frpc', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get frpc option GET /api/frpc/option */
export async function getFrpcOption(options?: { [key: string]: any }) {
  return request<any>('/api/frpc/option', {
    method: 'GET',
    ...(options || {}),
  });
}
