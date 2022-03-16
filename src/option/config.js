//基本配置
export const config = {
    width: 1920,
    height: 1080,
    scale: 1,
    mark: {
        show: false,
        text: 'avue数据大屏水印',
        fontSize: 20,
        textStyle: 'rgba(100,100,100,0.2)',
        degree: -20
    },
    backgroundImage: '/img/bg/bg1.png',
    query: {}
};
// 颜色的配置
export const colorOption = {
    menuWidth: 150,
    refreshBtn: false,
    columnBtn: false,
    labelWidth: 100,
    column: [{
        label: '颜色1',
        prop: 'color1',
        type: 'color',
    }, {
        label: '渐变色',
        prop: 'color2',
        type: 'color',
    }, {
        label: '位置',
        prop: 'postion',
        type: 'number'
    }]
}

// 表格的列配置
export const tableOption = {
    menuWidth: 150,
    refreshBtn: false,
    columnBtn: false,
    labelWidth: 100,
    menuFixed:'right',
    column: [{
        label: '名称',
        prop: 'title',
    }, {
        label: '宽度',
        prop: 'width',
        width:60
    }, {
        label: '固定方式',
        prop: 'fixed',
        type:'select',
        width:80,
        dicData: [{
            label: '无',
            value: 'no'
        }, {
            label: '左',
            value: 'left'
        }, {
            label: '右',
            value: 'right'
        }]
    }, {
        label: '排列方式',
        prop: 'align',
        type:'select',
        width:80,
        dicData: [{
            label: '左',
            value: 'left'
        }, {
            label: '中',
            value: 'center'
        }, {
            label: '右',
            value: 'right'
        }]
    }, {
        label: '状态',
        prop: 'hide',
        type: 'select',
        value: false,
        dicData: [{
            label: '显示',
            value: false
        }, {
            label: '隐藏',
            value: true
        }]
    }]
}
//一些字典的配置
export const dicOption = {
    line: [{label: '线条', value: 'line'}, {label: '圆环', value: 'circle'}],
    fontWeight: [{label: 'normal', value: 'normal'}, {label: 'bold', value: 'bold'}, {
        label: 'bolder',
        value: 'bolder'
    }, {label: 'ligter', value: 'ligter'}],
    border: [{label: '无边框', value: ''}, {label: '内置图片', value: 'img'}, {label: '内置边框', value: 'border'}],
    textAlign: [{label: '居中', value: 'center'}, {label: '左对齐', value: 'left'}, {label: '右对齐', value: 'right'}],
    dataType: [{label: '静态数据', value: 0}, {label: '动态数据', value: 1}, {label: 'SQL数据', value: 2}],
    orientList: [{label: '竖排', value: 'vertical'}, {label: '横排', value: 'horizontal'}],
    dataMethod: [{label: 'POST', value: 'post'}, {label: 'GET', value: 'get'}],
    eventList: ['tabs'],
    dataList: ['common', 'datav', 'text', 'wordcloud', 'img', 'tabs', 'map', 'video', 'pie', 'pictorialbar', 'iframe', 'swiper', 'flop', 'bar', 'line', 'progress', 'table', 'gauge', 'funnel', 'scatter', 'radar', 'test'],
    themeList: [{
        label: '默认配色',
        value: 'avue'
    }, {
        label: '紫色主题',
        value: 'macarons'
    }, {
        label: '绿色主题',
        value: 'wonderland'
    }],
    barList: ['bar', 'line'],
    titleList: ['bar', 'pie', 'line', 'radar', 'funnel'],
    labelList: ['bar', 'line', 'pie', 'radar', 'scatter'],
    legendList: ['bar', 'pie', 'line', 'radar', 'funnel'],
    colorList: ['bar', 'pie', 'line', 'gauge', 'funnel', 'scatter', 'radar'],
    tipList: ['bar', 'pie', 'line', 'gauge', 'funnel', 'scatter', 'radar'],
    postionList: ['bar', 'line', 'pictorialbar'],
    formatterList: ['bar', 'map', 'line', 'pie', 'gauge', 'funnel', 'scatter', 'radar', 'tabs'],
    clickFormatterList: ['map', 'tabs'],
    labelFormatterList: ['bar'],
    tabsTypeList: [{
        label: '选项卡',
        value: 'tabs',
    }, {
        label: '选择框',
        value: 'select',
    }],
    mapType: [{
        label: '原生',
        value: 0
    }],
    target: [{label: '本窗口', value: '_self'}, {label: '新窗口', value: '_blank',}],
    targetType: [{label: '本应用', value: 'self'}, {label: '外链', value: 'out',}],
    swiperType: [{label: '普通', value: ''}, {label: '立体', value: 'card'}],
    swiperIndicator: [{label: '外部', value: 'indicator'}, {label: '不显示', value: 'none'}],
    format: [{label: '日期', value: 'yyyy-MM-dd'}, {label: '日期+时分', value: 'yyyy-MM-dd hh:mm'}, {
        label: '日期+时分秒',
        value: 'yyyy-MM-dd hh:mm:ss'
    }, {label: '日期(无年)', value: 'MM-dd'}, {label: '时分', value: 'hh:mm'}, {
        label: '时分秒',
        value: 'hh:mm:ss'
    }, {label: '星期', value: 'day'}],
    interactList: [{label: '点击', value: "click"}, {label: '双击', value: "dbclick"}, {label: '移入', value: "over"}, {label: '移出', value: "out"}],
    eventTypeList: [{label: '打开弹窗', value: 'popup'}, {label: '打开浮窗', value: 'fc'},
      {label: '提示文字', value: 'title'}, {label: '打开链接', value: 'link'},
      {label: '关闭浮窗', value: 'fcClose'}, {label: '关闭提示文字', value: 'titleClose'}],
    linkOption: [{label: '外部链接', value: 1}, {label: '内部链接', value: 2}],
    interactEventList:['baseXline', 'baseYline', 'baseCircle', 'baseTriangle', 'baseRectangle', 'basePolygon', 'baseQrcode',
    'baseButton', 'baseArrow', 'img', 'swiper', 'alert', 'wordcloud', ''],
    fontFamily: [{label:'微软雅黑', value:'微软雅黑'},{label:'等线', value:'Deng'},{label:'仿宋', value:'simfang'},{label:'黑体', value:'simhei'},{label:'楷体', value:'simkai'}]
}


function concat(prop, count, type, extend = [], defaults) {

    let list = [];
    for (let i = 1; i <= count; i++) {
        list.push({
            label: prop + i,
            value: `/img/${prop}/${prop}${i}.${extend.includes(i) ? defaults : type}`
        })
    }
    return list;
}

//加载图片素材库
export const imgOption = [
    concat('bg', 10, 'jpg', [1, 2, 3], 'png'),
    concat('border', 16, 'png'),
    concat('source', 260, 'svg', [1, 15, 16, 20, 239.240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260], 'png'),
    concat('banner', 10, 'png'),
]


function setModel() {
    const files = require.context('../../public/img/model/', true)
    let fileArr = []
    // 遍历输出匹配结果
    files.keys().forEach(path => {
        fileArr.push({
            tab: path.split('/')[1],
            img: path.split('/')[2],
            value: '/img/model/' + path
        })

    })
    let myArr = []
    do {
        let title = fileArr[0].tab
        let index = fileArr.findIndex(item => {
            return item.tab !== title
        })
        myArr.push({
            title: title,
            children: index > -1 ? fileArr.splice(0, index) : fileArr.splice(0)
        })
    } while (fileArr.length > 0)

    return myArr
}

// function setModel2() {
//     const files = require.context('../../static/model/', true)
//     let fileArr=[]
//     // 遍历输出匹配结果
//     files.keys().forEach(path=> {
//         fileArr.push({
//           tab:path.split('/')[1],
//           img:path.split('/')[2],
//           value:'/img/model/'+path
//         })
//     })
//     console.log('11111111111111111')
//     console.log(fileArr)
//     // let myArr = []
//     // do{
//     //     let title = fileArr[0].tab
//     //     let index = fileArr.findIndex(item=>{return item.tab!==title})
//     //     myArr.push({
//     //         title:title,
//     //         children:index>-1 ? fileArr.splice(0,index): fileArr.splice(0)
//     //     })
//     // }while (fileArr.length>0)
//     // console.log(fileArr)
//     // return myArr
// }
// setModel2()
export const modelOption = setModel()

