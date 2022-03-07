
import crypto from '@/utils/crypto'
import request from '../axios';
export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-visual/db/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-visual/db/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-visual/db/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-visual/db/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-visual/db/submit',
    method: 'post',
    data: row
  })
}
export const dynamicSql = (data) => {
  return request({
    url: '/api/blade-visual/db/dynamic-query',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}
export const dbTest = (data) => {
  return request({
    url: '/api/blade-visual/db/db-test',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: crypto.encrypt(JSON.stringify(data))
  })
}
