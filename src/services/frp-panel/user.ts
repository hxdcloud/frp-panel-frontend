// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** user login POST /api/login/account */
export async function postLoginAccount(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<any>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
