
import request from '../axios'
export const getList = (params) => request({
  url: '/api/blade-visual/visual/list',
  method: 'get',
  params: params
});
export const copyObj = (id) => request({
  url: '/api/blade-visual/visual/copy',
  method: 'post',
  params: {
    id: id
  }
});

export const getCategory = (params) => request({
  url: '/api/blade-visual/category/list',
  method: 'get',
  params: params
});

export const getCategoryAll = (params) => request({
  url: '/api/blade-visual/category/listV2',
  method: 'get',
  params: params
});

export const getListH = (params) => request({
  url: '/api/blade-mh/data/getListH',
  method: 'get',
  params: params
});



export const getObj = (id) => request({
  url: '/api/blade-visual/visual/detail',
  method: 'get',
  params: {
    id
  }
});
export const uploadImg = (file) => request({
  url: '/api/blade-resource/oss/endpoint/put-file2',
  method: 'post',
  data: 'file=' + file,
  headers: {
    "Content-Type": "multipart/form-data",
    "Blade-Auth" : 'bearer ' + JSON.parse(localStorage.getItem('zt-token'))
  }
});

export const addObj = (data) => request({
  url: '/api/blade-visual/visual/save',
  method: 'post',
  data: {
    visual: {
      password: data.password,
      category: data.category,
      status: data.status,
      title: data.title,
	  navSelect: data.navSelect,
      app: data.pid,
      type: data.type
    },
    config: {
      detail: JSON.stringify({
        name: data.title,
        width: data.width,
        height: data.height,
        scale: 1,
        backgroundImage: '/img/bg/bg1.png',
        url: '',
        mark: {},
        gradeShow: false,
        gradeLen: 30,
      }),
      component: '[]'
    },
  }
});

export const updateComponent = (data) => request({
  url: '/api/blade-visual/visual/update',
  method: 'post',
  data: data
});

export const updateObj = (data) => request({
  url: '/api/blade-visual/visual/update',
  method: 'post',
  data: {
    "visual": {
      "id": data.id,
      "password": data.password,
      "category": data.category,
      "status": data.status,
      "title": data.title,
	  "navSelect": data.navSelect
    }
  }
});

//登录
export const login = (data) => request({
  url: '/api/blade-auth/oauth/token',
  method: 'post',
  headers: {
	'Tenant-Id': '000000'
  },
  data: `tenantId=000000&username=${data.username}&password=${data.password}&grant_type=password&scope=all&type=account`
});
export const login2 = (data) => request({
  url: '/api/blade-visual/visualappaccount/login',
  method: 'get',
  params: {
      name: data.username,
      password: data.password,
      appId: data.appId
  }
});
//验证token是否有效
export const verToken = (account,token) => request({
  url: '/api/blade-mh/data/verToken',
  method: 'get',
  params: {
    account,token
  }
});


export const delObj = (id) => request({
  url: '/api/blade-visual/visual/remove',
  method: 'post',
  params: {
    ids: id
  }
});
export const getVal = (mqtt) => request({
  url: '/api/blade-mh/site/valByMqtt',
  method: 'get',
  params: {
    mqtt
  }
});
export const getVal2 = (mqtt) => request({
  url: '/api/blade-mh/site/valByMqtt2',
  method: 'get',
  params: {
    mqtt
  }
});
export const getAllData = () => request({
  url: '/api/blade-mh/site/allData',
  method: 'get',
});


//获取报警数量
export const getAlertNum = (addr) => request({
  url: '/api/blade-mh/errlog/alertNum',
  method: 'get',
  params: {
    addr
  }
});

//报警列表
export const getAlertList = (current, size, params) => {
  return request({
    url: '/api/blade-mh/errlog/alertList',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//消除报警
export const updAlert = (id,siteId) => {
  return request({
    url: '/api/blade-mh/errlog/updAlert',
    method: 'get',
    params: {
      id,siteId
    }
  })
}
//修改上下限的值
export const updAlertVal = (id,val,type) => {
  return request({
    url: '/api/blade-mh/site/updVal',
    method: 'get',
    params: {
      id,val,type
    }
  })
}
//获取能耗
export const energy = (totalName,names,time) => {
  return request({
    url: '/api/blade-mh/data/energy',
    method: 'get',
    params: {
      totalName, names,time
    }
  })
}
//获取素材分类
export const getDict = (code) => {
  return request({
    url: '/api/blade-system/dict/dictionary',
    method: 'get',
    params: {
      code
    }
  })
}
//获取文件路径
export const getFilePath = () => {
  return request({
    url: '/api/blade-visual/visual/filePath',
    method: 'get',
  })
}

//获取素材列表
export const getSourceList = (type) => {
  return request({
    url: '/api/blade-mh/material/listByType',
    method: 'get',
    params: {
      type
    }
  })
}

//设备列表
export const getSiteList = (current, size, name) => {
  return request({
    url: '/api/blade-mh/site/apiList',
    method: 'get',
    params: {
      name,
      current,
      size,
    }
  })
}
//车间设备树
export const getDictTree = () => {
  return request({
    url: '/api/blade-system/dict-biz/tree?code=DICT',
    method: 'get'
  })
}

//修改变量
export const getCommonVal = (valNm,val) => {
  return request({
    url: '/api/blade-mh/plc/writePlcData?valNm='+valNm+'&val='+val,
    method: 'get'
  })
}
//修改变量
export const writePlcData = (valNm,val) => {
  return request({
    url: '/api/blade-mh/plc/writePlcData?valNm='+valNm+'&val='+val,
    method: 'get'
  })
}

export const listForZt = (app) => {
    return request({
      url: '/api/blade-mh/trend/listForZt',
      method: 'get',
      params: {
        app:app,
      }
    });
}

export const subListForZt = (pid,type,dataType,app) => {
    return request({
      url: '/api/blade-mh/trend/subListForZt',
      method: 'get',
      params: {
        pid:pid,
        type:type,
        dataType:dataType,
        app:app
      }
    });
}

export const siteHistory = (addr,st,et) => {
    return request({
      url: '/api/blade-mh/site/siteHistory',
      method: 'get',
      params: {
        addr: addr,
        st:st,
        et:et
      }
    });
}

export const getVisualApp = (id) => request({
  url: '/api/blade-visual/visualapp/appDtl',
  method: 'get',
  params: {
    id: id
  }
});

export const getVisualAppView = (id) => request({
  url: '/api/blade-visual/visualapp/appDtlView',
  method: 'get',
  params: {
    id: id,
    token: JSON.parse(localStorage.getItem('zt-token'))
  }
});

export const updateVisualApp = (data) => request({
  url: '/api/blade-visual/visualapp/update',
  method: 'post',
  data: data
});

// 获取设备列表
export const getDeviceList = () => request({
  url: '/api/blade-zt/device/apiList',
  method: 'get'
});

// 通过设备id查询采集点信息
export const getPoint = (id) => request({
  url: '/api/blade-zt/point/listByDeviceId?deviceId='+id,
  method: 'get'
});