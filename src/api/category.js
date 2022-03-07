import request from '../axios'

export const getList = (params) => request({
    url: '/api/blade-visual/category/list',
    method: 'get',
    params: params
});


export const getObj = (id) => request({
    url: '/api/blade-visual/category/detail',
    method: 'get',
    params: {
        id
    }
});

export const addObj = (data) => request({
    url: '/api/blade-visual/category/save',
    method: 'post',
    data: data
});
export const updateObj = (data) => request({
    url:'/api/blade-visual/category/update',
    method: 'post',
    data: data
});


export const delObj = (id) => request({
    url: '/api/blade-visual/category/remove',
    method: 'post',
    params: {
        ids: id
    }
});
