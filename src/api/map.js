
import request from '../axios'
export const getList = (params) => request({
  url: '/api/blade-visual/map/list',
  method: 'get',
  params: params
});



export const getObj = (id) => request({
  url: '/api/blade-visual/map/detail',
  method: 'get',
  params: {
    id
  }
});

export const addObj = (data) => request({
  url: '/api/blade-visual/map/save',
  method: 'post',
  data: data
});
export const updateObj = (data) => request({
  url: '/api/blade-visual/map/update',
  method: 'post',
  data: data
});



export const delObj = (id) => request({
  url: '/api/blade-visual/map/remove',
  method: 'post',
  params: {
    ids: id
  }
});
