// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** get frps config GET /api/frps/config */
export async function getFrpsConfig(options?: { [key: string]: any }) {
  return request<API.FrpsConfig>('/api/frps/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** save frps config POST /api/frps/config */
export async function postFrpsConfig(options?: { [key: string]: any }) {
  return request<any>('/api/frps/config', {
    method: 'POST',
    ...(options || {}),
  });
}

/** get frps info GET /api/frps/info */
export async function getFrpsInfo(options?: { [key: string]: any }) {
  return request<API.serverInfoResp>('/api/frps/info', {
    method: 'GET',
    ...(options || {}),
  });
}
