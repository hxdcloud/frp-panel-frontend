// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** get frps http proxies GET /api/proxy/http */
export async function getProxyHttp(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/http', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get frps https proxies GET /api/proxy/https */
export async function getProxyHttps(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/https', {
    method: 'GET',
    ...(options || {}),
  });
}

/** validate frp proxy name unique GET /api/proxy/name/validate */
export async function getProxyNameValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProxyNameValidateParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/proxy/name/validate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** validate frp tcp port usable GET /api/proxy/port/tcp/validate */
export async function getProxyPortTcpValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProxyPortTcpValidateParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/proxy/port/tcp/validate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** get frps stcp proxies GET /api/proxy/stcp */
export async function getProxyStcp(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/stcp', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get frps sudp proxies GET /api/proxy/sudp */
export async function getProxySudp(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/sudp', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get frps tcp proxies GET /api/proxy/tcp */
export async function getProxyTcp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProxyTcpParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/proxy/tcp', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add frp tcp proxy POST /api/proxy/tcp */
export async function postProxyTcp(body: API.NewProxyIni, options?: { [key: string]: any }) {
  return request<any>('/api/proxy/tcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete frp proxy DELETE /api/proxy/tcp */
export async function deleteProxyTcp(body: API.DeleteProxy, options?: { [key: string]: any }) {
  return request<any>('/api/proxy/tcp', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get frps tcpmux proxies GET /api/proxy/tcpmux */
export async function getProxyTcpmux(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/tcpmux', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get frps udp proxies GET /api/proxy/udp */
export async function getProxyUdp(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/udp', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get frps xtcp proxies GET /api/proxy/xtcp */
export async function getProxyXtcp(options?: { [key: string]: any }) {
  return request<any>('/api/proxy/xtcp', {
    method: 'GET',
    ...(options || {}),
  });
}
