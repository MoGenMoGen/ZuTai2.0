//基础公共url
var baseUrl = '.'
//基础组件库
export default [{
    "label": '基础组件',
    "icon": 'icon-jichuzujian',
    "children": [{
        label: '横线',
        option: {
            "name": "横线",
            "title": "横线",
            "icon": 'icon-hengxian',
            "img": require('@/assets/base/xline.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 5,
                "name": "baseXline",
                "prop": "baseXline",
            },
            "option": {
                "color": '#f00',
                "opacity": 100,
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
                "radius": 0,
            }
        }
    }, {
        label: '竖线',
        option: {
            "name": "竖线",
            "title": "竖线",
            "icon": 'icon-zhixian',
            "img": require('@/assets/base/yline.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 5,
                "height": 200,
                "name": "baseYline",
                "prop": "baseYline",
            },
            "option": {
                "color": '#f00',
                "opacity": 100,
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
                "radius": 0,
            }
        }
    }, {
        label: '圆形',
        option: {
            "name": "圆形",
            "title": "圆形",
            "icon": 'icon-yuan',
            "img": require('@/assets/base/circle.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseCircle",
                "prop": "baseCircle",
            },
            "option": {
                "color": '#f00',
                "opacity": 100,
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
            }
        }
    }, {
        label: '矩形',
        option: {
            "name": "矩形",
            "title": "矩形",
            "icon": 'icon-juxing',
            "img": require('@/assets/base/rectangle.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseRectangle",
                "prop": "baseRectangle",
            },
            "option": {
                "color": '#f00',
                "opacity": 100,
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
            }
        }
    }, {
        "label": '文本框',
        "option": {
            "title": "文本框",
            "name": "文本框",
            "icon": 'icon-text',
            "img": require('@/assets/text.png'),
            "dataType": 0,
            "dataFormatter": "",
            "stylesFormatter": "",
            "data": {
                value: '文本框'
            },
            "component": {
                "width": 100,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "lineHeight":40,
                "textAlign": "center",
                "fontSize": 26,
                "fontWeight": "normal",
                "color": "#fff",
            },
        },
    }, {
        label: '文本域',
        option: {
            "name": "文本域",
            "title": "文本域",
            "icon": 'icon-wenziyu',
            "img": require('@/assets/base/text.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseText",
                "prop": "baseText",
            },
            "option": {
                "color": '#fff',
                "lineHeight": 24,
                'fontWeight': 'normal',
                "opacity": 100,
                "fontSize": '18',
                "textarea": '',
                "fontFamily": '微软雅黑',
				"textAlign": 'left'
				
            }
        }
    }, {
        label: '按钮',
        option: {
            "name": "按钮",
            "title": "按钮",
            "icon": 'icon-anniu',
            "img": require('@/assets/base/button.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 50,
                "name": "baseButton",
                "prop": "baseButton",
            },
            "option": {
                "color": '#fff',
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
                "bgColor": '#f00',
                "lineHeight": 24,
                'fontWeight': 'normal',
                "opacity": 100,
                "fontSize": '18',
                "textarea": '',
                "fontFamily": '微软雅黑',
                "radius": 20,
                "bgImg":'',
                "color2": '#fff',
                "bgColor2": '#f00',
                "bgImg2":''
            }
        }
    }, {
        label: '多边形',
        option: {
            "name": "多边形",
            "title": "多边形",
            "icon": 'icon-duobianxing',
            "img": require('@/assets/base/polygon.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 500,
                "height": 500,
                "name": "basePolygon",
                "prop": "basePolygon",
            },
            "option": {
                left: 0,
                top: 0,
                optionArr: [],
                bgColor: '',
                borderColor: '#fff',
                borderWidth: 1,
                width: 1,
                scaleX: 1,
                scaleY: 1,
                setUp: false,
                ifEdit:false,
                pointShow:true,
                pointWidth:15,
                pointOpacity:0.5,
                pointBgColor:'#f00'
            }
        }
    }, {
        label: '折线',
        option: {
            "name": "折线",
            "title": "折线",
            "icon": 'icon-zhexiantu',
            "img": require('@/assets/base/brokenLine.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 500,
                "height": 500,
                "name": "baseBrokenLine",
                "prop": "baseBrokenLine",
            },
            "option": {
                left: 0,
                top: 0,
                optionArr: [],
                bgColor: '',
                borderColor: '#fff',
                borderWidth: 1,
                width: 1,
                scaleX: 1,
                scaleY: 1,
                setUp: false,
                ifEdit: false,
                pointShow:true,
                pointWidth:15,
                pointOpacity:0.5,
                pointBgColor:'#f00'
            }
        }
    }, {
        label: '二维码',
        option: {
            "name": "二维码",
            "title": "二维码",
            "icon": 'icon-erweima',
            "img": require('@/assets/base/QRcode.png'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseQrcode",
                "prop": "baseQrcode",
            },
            "option": {
                "margin": 20,
                "colorDark": '#000',
                "colorLight": '#fff',
                "bgColor": '#fff',
                "bgUrl": '',
                "logoUrl": '',
                "text": '123',
                "opacity": 100,
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
            }
        }
    }, {
        label: '单选组',
        option: {
            "name": "单选组",
            "title": "单选组",
            "icon": 'icon-fuxuankuang',
            "img": require('@/assets/base/radio.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseRadio",
                "prop": "baseRadio",
            },
            "option": {
                "color": "#fff",
                "selectColor": "#409EFF",
                "fontSize": 14,
                "scale": 1,
                // "borderWidth": 14,
                // "innerWidth": 4,
                "list": [{
                    "name": "选项一",
                    "value": 1
                }]
            }
        }
    }, {
        label: '输入框',
        option: {
            "name": "输入框",
            "title": "输入框",
            "icon": 'icon-shurukuang',
            "img": require('@/assets/base/input.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 300,
                "height": 40,
                "name": "baseInput",
                "prop": "baseInput",
            },
            "option": {
                "radius": 20,
                "borderColor": '#DCDFE6',
                "borderWidth": 1,
                "borderType": 'solid',
                "bgColor": '#fff',
                "color": '#000',
                "lineHeight": 40,
                'fontWeight': 'normal',
                "opacity": 100,
                "fontSize": '18',
                "input": '',
                "fontFamily": '微软雅黑'
            }
        }
    }, {
        label: '下拉框',
        option: {
            "name": "下拉框",
            "title": "下拉框",
            "icon": 'icon-xialakuang',
            "img": require('@/assets/base/select.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 300,
                "height": 40,
                "name": "baseSelect",
                "prop": "baseSelect",
            },
            "option": {
                "List": [{input: ''}],
                "radius": 0,
                "borderColor": '#DCDFE6',
                "borderWidth": 1,
                "borderType": 'solid',
                "bgColor": '#FFFFFF',
                "color": '#000000',
                "lineHeight": 40,
                'fontWeight': 'normal',
                "opacity": 100,
                "fontSize": '18',
                "input": '',
                "placeholder":'请选择',
                "fontFamily": '微软雅黑',
            },
        }
    }, {
        label: '开关',
        option: {
            "name": "开关",
            "title": "开关",
            "icon": 'icon-kaiguan',
            "img": require('@/assets/base/switch.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",

            "component": {
                "width": 100,
                "height": 100,
                "name": "baseSwitch",
                "prop": "baseSwitch",
            },
            "option": {
                "valueName":'', //变量名称
                "openValue":'',//开启变量值
                "openText":'',//开启文字
                "openUrl":'',//开启状态图片
                "closeValue":"",//关闭变量值
                "closeText":'',//关闭文字
                "closeUrl":'',//关闭状态图片
                 "openColor":'#ffffff',//开启字体颜色
                "closeColor":'#ffffff',//关闭字体颜色
                "fontSize":'14',//字体大小
				"openBorderColor": '',
				"openBorderWidth": 1,
				"openBorderType": 'solid',
				"openBgColor": '#f00',
				"openBgColor2": '#f00',
				"openRadius": '10',
				"closeBorderColor": '',
				"closeBorderWidth": 1,
				"closeBorderType": 'solid',
				"closeBgColor": '#f00',
				"closeBgColor2": '#f00',
				"closeRadius": '10',
            },
        }
    }, {
        label: '滑块',
        option: {
            "name": "滑块",
            "title": "滑块",
            "icon": 'icon-huakuai',
            "img": require('@/assets/base/slider.png'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 100,
                "height": 100,
                "name": "baseSlider",
                "prop": "baseSlider",
            },
            "option": {
                "range": false,
                "disabled": false,
                "showStop": false,
                "step": 1,
                "min":0,
                "max":100,
                "valNm":''
            },

        }
    }, {
        label: '多选组',
        option: {
            "name": "多选组",
            "title": "多选组",
            "icon": 'icon-fuxuankuang',
            "img": require('@/assets/base/checkbox.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseCheckbox",
                "prop": "baseCheckbox",
            },
            "option": {
                "color": "#fff",
                "selectColor": "#409EFF",
                "fontSize": 14,
                "scale": 1,
                "showAll": false,
                // "borderWidth": 14,
                // "innerWidth": 4,
                "list": [{
                    "name": "选项一",
                    "value": 1
                }]
            }
        }
    }, {
        label: '链接区域',
        option: {
            "name": "链接区域",
            "title": "链接区域",
            "icon": 'icon-juxing',
            "img": require('@/assets/base/linkarea.png'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseLinkarea",
                "prop": "baseLinkarea",
            },
            "option": {
                'linkTarget': '_self',
				'selectIndex': 0,
            }
        }
    }, {
        label: '模板',
        option: {
            "name": "模板",
            "title": "模板",
            "icon": 'icon-moban',
            "img": require('@/assets/base/model.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseModel",
                "prop": "baseModel",
            },
            "option": {
                linkHref:'',
				'selectIndex':0,
            }
        }
    }, {
        label: '导航',
        option: {
            "name": "导航",
            "title": "导航",
            "icon": 'icon-daohang',
            "img": require('@/assets/base/nav.jpg'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 200,
                "name": "baseNav",
                "prop": "baseNav",
            },
            "option": {
                navList:[],
                linkTarget:'_self',
                textAlign:'center',
                "color": '#fff',
                "lineHeight": 24,
                'fontWeight': 'normal',
                "opacity": 100,
                "fontSize": '18',
                "textarea": '',
                "fontFamily": '微软雅黑',
                "borderColor":'',
                "borderWidth":0,
                 "borderType":'',
                "itemWidth":150,
                "itemHeight":30,
                "itemSpace":0,
                "itemRadius":0,
                "bgColor":'',
                "bgColorActive":'',
                "colorActive":'',
                "navStyle":'horizontal'
            }
        }
    },{
        label: '箭头',
        option: {
            "name": "箭头",
            "title": "箭头",
            "icon": 'icon-hengxian',
            "img": require('@/assets/base/arrow.png'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 200,
                "height": 5,
                "name": "baseArrow",
                "prop": "baseArrow",
            },
            "option": {
                "color": '#f00',
                "opacity": 100,
                "borderColor": '',
                "borderWidth": 1,
                "borderType": 'solid',
                "radius": 0,
				"height": 10
            }
        }
    }, {
        "label": '实时时间',
        "option": {
            "name": "实时时间",
            "title": "实时时间",
            "icon": 'icon-datetime',
            "img": require('@/assets/datetime.png'),
            "top": 78,
            "left": 1604,
            "component": {
                "width": 250,
                "height": 50,
                "name": "datetime",
                "prop": "datetime",
            },
            "option": {
                "format": 'yyyy-MM-dd hh:mm:ss',
                "color": "#fff",
                'textAlign': 'left',
                "fontSize": 24,
                "fontWeight": "normal"
            }
        },
    }, {
        "label": '三角形',
        "option": {
            "name": "三角形",
            "title": "三角形",
            "icon": 'icon-juxing',
            "img": require('@/assets/base/triangle.png'),
            "component": {
                "width": 250,
                "height": 250,
                "name": "baseTriangle",
                "prop": "baseTriangle",
            },
            "option": {
                
            }
        },
    }]
}, {
    "label": '图表',
    "icon": 'icon-bar',
    "children": [{
        "label": '通用型',
        "option": {
            "name": "通用型",
            "title": "通用型",
            "icon": 'icon-bar',
            "img": require('@/assets/text5.png'),
            "dataType": 1,
            "dataMethod": 'get',
            "data": {
                "categories": [
                    "苹果",
                    "三星",
                    "小米",
                    "oppo",
                    "vivo"
                ],
                "series": [{
                    "name": "手机品牌",
                    "data": [
                        1000879,
                        3400879,
                        2300879,
                        5400879,
                        3400879
                    ]
                }]
            },
            "echartFormatter": "(data)=>{\nconsole.log(data);\nreturn {\n            title: {\n\t\t\t\t textStyle: {\n\t\t\t\t\tfontWeight: 'normal',      \n\t\t\t\t\tcolor: '#fff'\n\t\t\t\t},\n                text: 'ECharts 入门示例'\n            },\n            tooltip: {},\n            legend: {\n                data:['销量'],\n\t\t\t\ttextStyle: {\n\t\t\t\t\tfontWeight: 'normal',      \n\t\t\t\t\tcolor: '#fff'\n\t\t\t\t},\n            },\n            xAxis: {\n                data: [\"衬衫\",\"羊毛衫\",\"雪纺衫\",\"裤子\",\"高跟鞋\",\"袜子\"]\n            },\n            yAxis: {},\n            series: [{\n                name: '销量',\n                type: 'bar',\n                data: [5, 20, 36, 10, 10, 20]\n            }]\n        };\n}",
            "dataFormatter": "",
            "stylesFormatter": "",
            "url": baseUrl + "/bar",
            "time": 5000,
            "component": {
                "width": 600,
                "height": 300,
                "name": "common",
                "prop": "common",
            },
			"option": {
			    
			}
        }
    }, {
        label: '自定义',
        option: {
            "name": "自定义",
            "title": "自定义",
            "icon": 'icon-bar',
            "img": require('@/assets/icon/自定义.png'),
            "data": [],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 800,
                "height": 500,
                "name": "test",
                "prop": "test",
            },
            "option": {
                "fontSize": 20,
            }
        }
    },
        {
            label: '状态指示',
            option: {
                "name": "状态指示",
                "title": "状态指示",
                "icon": 'icon-zhuangtaideng',
                "img": require('@/assets/icon/指示状态.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 80,
                    "height": 80,
                    "name": "state",
                    "prop": "state",
                },
                "option": {
                    "fontSize": 20,
                }
            }
        },
        {
            label: '指示灯',
            option: {
                "name": "指示灯",
                "title": "指示灯",
                "icon": 'icon-bar',
                "img": require('@/assets/icon/指示状态.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 80,
                    "height": 80,
                    "name": "light",
                    "prop": "light",
                },
                "option": {
					"rotateDuration": 1000,
					"flashDuration": 1000,
					"jumpDuration": 1000,
					"rotate": false,
					"flash": false,
					"jump": false
				}
            }
        },
        {
            label: '弹窗趋势',
            option: {
                "name": "弹窗趋势",
                "title": "弹窗趋势",
                "icon": 'icon-bar',
                "img": require('@/assets/line.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 80,
                    "height": 80,
                    "name": "trend",
                    "prop": "trend",
                },
                "option": {
                    "url":'',
                    "points":'',
                    "pointNm":'',
                    "unit":''
                }
            }
        },
        {
            label: '流动线',
            option: {
                "name": "流动线",
                "title": "流动线",
                "icon": 'icon-bar',
                "img": require('@/assets/icon/线条.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 500,
                    "height": 40,
                    "name": "xline",
                    "prop": "xline",
                },
                "option": {
                    "fontSize": 20,
					"color": '#FF0000',
					"width": 3,
					"dasharray": 10,
					"opacity": 1,
					"speed": 10,
					"setUp": false,
					"points":null,
                }
            }
        },

        {
            label: '能耗',
            option: {
                "name": "能耗",
                "title": "能耗",
                "icon": 'icon-bar',
                "img": require('@/assets/icon/能耗.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 800,
                    "height": 500,
                    "name": "energy",
                    "prop": "energy",
                },
                "option": {}
            }
        },

        {
            label: '液位',
            option: {
                "name": "液位",
                "title": "液位",
                "icon": 'icon-yewei',
                "img": require('@/assets/icon/液位.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 100,
                    "height": 100,
                    "name": "level",
                    "prop": "level",
                },
                "option": {
					"type": 'rect'
				}
            }
        },
        {
            label: '移动',
            option: {
                "name": "移动",
                "title": "移动",
                "icon": 'icon-bar',
                "img": require('@/assets/icon/移动小车.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 400,
                    "height": 400,
                    "name": "moveCar",
                    "prop": "moveCar",
                },
                "option": {}
            }
        },
        {
            label: '游标',
            option: {
                "name": "游标",
                "title": "游标",
                "icon": 'icon-youbiao',
                "img": require('@/assets/base/游标.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 400,
                    "height": 400,
                    "name": "cursor",
                    "prop": "cursor",
                },
                "option": {}
            }
        },

        {
            "label": 'datav',
            "option": {
                "name": "datav",
                "title": "datav",
                "icon": 'icon-bar',
                "img": require('@/assets/text6.png'),
                "dataType": 1,
                "dataMethod": 'get',
                "data": {
                    "categories": [
                        "苹果",
                        "三星",
                        "小米",
                        "oppo",
                        "vivo"
                    ],
                    "series": [{
                        "name": "手机品牌",
                        "data": [
                            1000879,
                            3400879,
                            2300879,
                            5400879,
                            3400879
                        ]
                    }]
                },
                "echartFormatter": "(data)=>{\n  console.log(data);\n  return {\n    config:{\n\t  data: [66] \n\t}\n  }\n}",
                "url": baseUrl + "/bar",
                "time": 5000,
                "component": {
                    "width": 150,
                    "height": 200,
                    "name": "datav",
                    "prop": "datav",
                },
                "option": {
                    "is": 'dv-water-level-pond'
                }
            }
        }, {
            "label": '柱形图',
            "option": {
                "name": "柱状图",
                "title": "柱状图",
                "icon": 'icon-zhuzhuangtu',
                "img": require('@/assets/bar.png'),
                "dataType": 1,
                "dataMethod": 'get',
                "data": {
                    "categories": [
                        "苹果",
                        "三星",
                        "小米",
                        "oppo",
                        "vivo"
                    ],
                    "series": [{
                        "name": "手机品牌",
                        "data": [
                            1000879,
                            3400879,
                            2300879,
                            5400879,
                            3400879
                        ]
                    }]
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "url": baseUrl + "/bar",
                "time": 5000,
                "component": {
                    "width": 600,
                    "height": 300,
                    "name": "bar",
                    "prop": "bar",
                },
                "option": {
                    "gridX": 90,
                    "gridY": 0,
                    "gridX2": 0,
                    "gridY2": 0,
                    "legend": true,
                    "nameColor": "#eee",
                    "lineColor": "#eee",
                    "xNameFontSize": 16,
                    "yNameFontSize": 16,
                    "labelShow": true,
                    "labelShowColor": '#fff',
                    "labelShowFontSize": 14,
                    "labelShowFontWeight": 300,
                    "yAxisInverse": false,
                    "xAxisInverse": false,
                    "xAxisShow": true,
                    "yAxisShow": true,
                    "xAxisSplitLineShow": false,
                    "yAxisSplitLineShow": false,
                    "barWidth": 30,
                    "barRadius": 8,
                    "barColor": [{
                        "color1": "#83bff6",
                        "color2": "#188df0",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    }, {
                        "color1": "#23B7E5",
                        "color2": "#564AA3",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }],
                    "barMinHeight": 2
                }
            }
        }, {
            "label": '折线图',
            "option": {
                "name": "折线图",
                "title": "折线图",
                "icon": 'icon-zhexiantu1',
                "img": require('@/assets/line.png'),
                "dataType": 1,
                "dataMethod": 'get',
                "data": {
                    "categories": [
                        "苹果",
                        "三星",
                        "小米",
                        "oppo",
                        "vivo"
                    ],
                    "series": [{
                        "name": "手机品牌",
                        "data": [
                            1000879,
                            3400879,
                            2300879,
                            5400879,
                            3400879
                        ]
                    }]
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "url": baseUrl + "/bar",
                "time": 5000,
                "component": {
                    "width": 600,
                    "height": 300,
                    "name": "line",
                    "prop": "line",
                },
                "option": {
                    "gridX": 90,
                    "gridY": 0,
                    "gridX2": 0,
                    "gridY2": 0,
                    "nameColor": "#eee",
                    "lineColor": "#eee",
                    "lineWidth": 5,
                    "xNameFontSize": 16,
                    "yNameFontSize": 16,
                    "labelShow": false,
                    "labelShowFontSize": 14,
                    "labelShowFontWeight": 300,
                    "yAxisInverse": false,
                    "xAxisInverse": false,
                    "xAxisShow": true,
                    "yAxisShow": true,
                    "xAxisSplitLineShow": false,
                    "yAxisSplitLineShow": false,
                    "barWidth": 30,
                    "barRadius": 8,
                    "barColor": [{
                        "color1": "#83bff6",
                        "color2": "#188df0",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    }, {
                        "color1": "#23B7E5",
                        "color2": "#564AA3",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }],
                    "symbolSize": 6,
                    "smooth": true,
                    "barMinHeight": 2
                }
            }
        }, {
            label: '饼图',
            option: {
                "name": "饼图",
                "title": "饼图",
                "icon": 'icon-pie',
                "img": require('@/assets/pie.png'),
                "dataType": 1,
                "dataMethod": 'get',
                "time": 5000,
                "url": baseUrl + "/pie",
                "data": [{
                    "name": "苹果",
                    "value": 1000879,
                    "url": "http://www.baidu.com"
                }, {
                    "name": "三星",
                    "value": 3400879,
                    "url": "http://www.baidu.com"
                }, {
                    "name": "小米",
                    "value": 2300879,
                    "url": "http://www.baidu.com"
                }, {
                    "name": "oppo",
                    "value": 5400879,
                    "url": "http://www.baidu.com"
                }, {
                    "name": "大疆",
                    "value": 3000,
                    "url": "http://www.baidu.com"
                }, {
                    "name": "抖音",
                    "value": 2000,
                    "url": "http://www.baidu.com"
                }],
                "dataFormatter": "",
                "stylesFormatter": "",
                "resize": false,
                "component": {
                    "width": 600,
                    "height": 300,
                    "name": "pie",
                    "prop": "pie",
                },
                "option": {
                    "legend": true,
                    "labelShow": true,
                    "barColor": [{
                        "color1": "#83bff6"
                    },
                        {
                            "color1": "#23B7E5"
                        },
                        {
                            "color1": "rgba(154, 168, 212, 1)"
                        },
                        {
                            "color1": "#188df0"
                        },
                        {
                            "color1": "#564AA3"
                        }
                    ]
                }
            }
        }, {
            label: '象形图',
            option: {
                "title": "象形图",
                "name": "象形图",
                "icon": "icon-pictorialBar",
                "img": require('@/assets/bar2.png'),
                "dataType": 1,
                "dataMethod": 'get',
                "time": 5000,
                "url": baseUrl + "/pie",
                "data": [{
                    "name": "苹果",
                    "value": 1000879,
                }, {
                    "name": "三星",
                    "value": 3400879,
                }, {
                    "name": "小米",
                    "value": 2300879,
                }, {
                    "name": "oppo",
                    "value": 5400879,
                }, {
                    "name": "大疆",
                    "value": 3000,
                }, {
                    "name": "抖音",
                    "value": 2000,
                }],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 600,
                    "height": 300,
                    "name": "pictorialbar",
                    "prop": "pictorialbar",
                },
                "option": {
                    symbolSize: 30,
                    split: 30,
                    symbol: '/img/source/source256.png',
                    fontSize: '24',
                    xAxisShow: false,
                    yAxisShow: true,
                    color: '#4dffff',
                    nameColor: '#564AA3',
                    xNameFontSize: '24',
                    yNameFontSize: '24',
                }
            }
        }, {
            label: '雷达图',
            option: {
                "title": "雷达图",
                "name": "雷达图",
                "icon": "icon-radar",
                "img": require('@/assets/radar.png'),
                "dataType": 1,
                "dataMethod": 'get',
                "time": 5000,
                "url": baseUrl + "/radar",
                "data": {
                    indicator: [{
                        name: '销售',
                        max: 6500
                    },
                        {
                            name: '管理',
                            max: 16000
                        },
                        {
                            name: '信息技术',
                            max: 30000
                        },
                        {
                            name: '客服',
                            max: 38000
                        },
                        {
                            name: '研发',
                            max: 52000
                        },
                        {
                            name: '市场',
                            max: 25000
                        }
                    ],
                    series: [{
                        data: [{
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '预算分配（Allocated Budget）'
                        },
                            {
                                value: [5000, 14000, 28000, 31000, 42000, 21000],
                                name: '实际开销（Actual Spending）'
                            }
                        ]
                    }]
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 970,
                    "height": 400,
                    "name": "radar",
                    "prop": "radar",
                },
                "option": {
                    width: '100%',
                    height: 600,
                    titleShow: true,
                    title: '各部门开销',
                    subtext: '最近一个月',
                    titleColor: '#666',
                    tipBackgroundColor: 'rgba(50,50,50,0.7)',
                    tipColor: "#fff",
                    shape: 'polygon',
                    radius: "75%",
                    splitNumber: 4,
                    radarNameColor: '#fff',
                    radarNameSize: 18,
                    titleFontSize: 18,
                    areaOpacity: 0.3,
                    legend: true,
                    // labelShow: true,
                    "barColor": [{
                        "color1": "#564AA3",
                    },
                        {
                            "color1": "#188df0",
                        }
                    ]
                },
            }
        },
        {
            label: '趋势(新)',
            option: {
                "name": "趋势(新)",
                "title": "趋势(新)",
                "icon": 'icon-bar',
                "img": require('@/assets/line.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 850,
                    "height": 300,
                    "name": "trendNew",
                    "prop": "trendNew",
                },
                "option": {}
            }
        },

        // {
        //     label: '散点图',
        //     option: {
        //         "title": "散点图",
        //         "name": "散点图",
        //         "icon": "icon-scatter",
        //         "img": require('@/assets/scatter.png'),
        //         "dataType": 1,
        //         "dataMethod": 'get',
        //         "time": 5000,
        //         "url": baseUrl + "/scatter",
        //         "data": [{
        //             "data": [
        //                 [1, 8.04],
        //                 [2, 6.95]
        //             ]
        //         },
        //             {
        //                 "data": [
        //                     [1, 4.04],
        //                     [2, 3.95]
        //                 ]
        //             }],
        //         "dataFormatter": "",
        //         "stylesFormatter": "",
        //         "component": {
        //             "width": 600,
        //             "height": 300,
        //             "name": "scatter",
        //             "prop": "scatter",
        //         },
        //         "option": {
        //             lineSize: 25,
        //             barColor: [{
        //                 postion: 0.2,
        //                 color1: '#91c7ae'
        //             },
        //                 {
        //                     postion: 0.8,
        //                     color1: '#63869e'
        //                 },
        //                 {
        //                     postion: 1,
        //                     color1: '#c23531'
        //                 }]
        //         }
        //     }
        // },
        // {
        //     label: '漏斗图',
        //     option: {
        //         "title": "漏斗图",
        //         "name": "漏斗图",
        //         "icon": "icon-funnel",
        //         "img": require('@/assets/funnel.png'),
        //         "dataType": 1,
        //         "dataMethod": 'get',
        //         "time": 5000,
        //         "url": baseUrl + "/funnel",
        //         "data": [{
        //             value: 335,
        //             name: '直接访问'
        //         },
        //             {
        //                 value: 310,
        //                 name: '邮件营销'
        //             },
        //             {
        //                 value: 234,
        //                 name: '联盟广告'
        //             }],
        //         "dataFormatter": "",
        //         "stylesFormatter": "",
        //         "component": {
        //             "width": 400,
        //             "height": 300,
        //             "name": "funnel",
        //             "prop": "funnel",
        //         },
        //         "option": {
        //             radius: true,
        //             "barColor": [{
        //                 "color1": "#83bff6",
        //             },
        //                 {
        //                     "color1": "#23B7E5",
        //                 },
        //                 {
        //                     "color1": "rgba(154, 168, 212, 1)",
        //                 },
        //                 {
        //                     "color1": "#188df0",
        //                 },
        //                 {
        //                     "color1": "#564AA3",
        //                 }
        //             ]
        //         }
        //     }
        // },
        // {
        //     label: '地图',
        //     option: {
        //         "name": "地图",
        //         "title": "地图",
        //         "icon": "icon-map",
        //         "img": require('@/assets/map.png'),
        //         "data": [],
        //         "dataFormatter": "",
        //         "stylesFormatter": "",
        //         "component": {
        //             "width": 800,
        //             "height": 500,
        //             "name": "map",
        //             "prop": "map",
        //         },
        //         "option": {
        //             "borderWidth": 1,
        //             "scale": 87,
        //             "type": 0,
        //             "borderColor": "#0dffff",
        //             "areaColor": "#061d33",
        //             "banner": true,
        //             "bannerTime": 3000,
        //             "fontSize": 14,
        //             "zoom": 0.5,
        //             "empAreaColor": "rgba(35, 183, 229, 0.42)",
        //             "empColor": "#fff",
        //             "index": "894edc1d-d2f0-4616-962c-8e61083ada71",
        //             "mapData": "https://data.bladex.vip/blade-visual/map/data?id=1235103352843448322",
        //             "color": "rgba(13, 255, 255, 1)",
        //         }
        //     },
        // }
    ]
}, 
// {
//     "label": '文字',
//     "icon": 'icon-text',
//     "children": [{
//         "label": '跑马灯',
//         "option": {
//             "title": "跑马灯",
//             "name": "跑马灯",
//             "icon": 'icon-scroll',
//             "img": require('@/assets/text2.png'),
//             "top": 0,
//             "left": 0,
//             "dataType": 0,
//             "data": {
//                 value: "跑马灯"
//             },
//             "dataFormatter": "",
//             "stylesFormatter": "",
//             "component": {
//                 "width": 100,
//                 "height": 50,
//                 "name": "text",
//                 "prop": "text"
//             },
//             "option": {
//                 scroll: true,
//                 speed: 70,
//                 "textAlign": "center",
//                 "fontSize": 26,
//                 "fontWeight": "normal",
//                 "color": "#fff"
//             },
//         },
//     }, {
//         "label": '超链接',
//         "option": {
//             "title": "超链接",
//             "name": "超链接",
//             "icon": 'icon-link',
//             "img": require('@/assets/text3.png'),
//             "top": 0,
//             "left": 0,
//             "data": {
//                 "value": "超链接"
//             },
//             "dataFormatter": "",
//             "stylesFormatter": "",
//             "component": {
//                 "width": 100,
//                 "height": 50,
//                 "name": "text",
//                 "prop": "text"
//             },
//             "option": {
//                 link: true,
//                 linkHref: 'http://avue.top',
//                 linkTarget: '_self',
//                 "textAlign": "center",
//                 "fontSize": 26,
//                 "fontWeight": "normal",
//                 "color": "#fff"
//             },
//         },
//     }, ]
// }, 
{
    "label": '媒体',
    "icon": 'icon-meiti',
    "children": [{
        "label": '图片',
        "option": {
            "title": "图片",
            "name": "图片",
            "icon": 'icon-tupianshangchuan',
            "img": require('@/assets/img.png'),
            "top": 0,
            "left": 0,
            "dataType": 0,
            "data": {
                value: ''
            },
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 140,
                "height": 140,
                "name": "img",
                "prop": "img",
            },
            "option": {
                rotate2: 0,
                duration: '1000',
            }
        }
    }, {
        "label": '图片框',
        "option": {
            "title": "图片框",
            "name": "图片框",
            "icon": 'icon-tupiankuang',
            "img": require('@/assets/imgborder.png'),
            "top": 0,
            "left": 0,
            "component": {
                "width": 140,
                "height": 140,
                "name": "imgborder",
                "prop": "imgborder",
            },
            "option": {
                backgroundColor: 'rgba(180, 181, 198, 0.1)',
            }
        }
    }, {
        label: '轮播图',
        option: {
            "title": "轮播图",
            "name": "轮播图",
            "icon": 'icon-lunbotu',
            "img": require('@/assets/swiper.png'),
            "top": 0,
            "left": 0,
            "dataType": 1,
            "dataMethod": 'get',
            "time": 5000,
            "url": baseUrl + "/swiper",
            "data": [{
                value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
            }, {
                value: 'https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg',
            }],
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 670,
                "height": 370,
                "name": "swiper",
                "prop": "swiper"
            },
            "option": {
                type: '',
                interval: 5000,
                opacity: 100,
                indicator: 'none'
            },
        }
    }, {
        label: 'iframe',
        option: {
            "title": "iframe",
            "name": "iframe",
            "icon": 'icon-iframe',
            "img": require('@/assets/iframe.png'),
            "top": 0,
            "left": 0,
            "component": {
                "width": 670,
                "height": 370,
                "option": {},
                "name": "iframe",
                "prop": "iframe"
            },
            "option": {},
            "dataType": 0,
            "data": {
                value: 'https://avuejs.com'
            },
            "dataFormatter": "",
            "stylesFormatter": ""
        }
    }, {
        label: 'video',
        option: {
            "title": "video",
            "name": "video",
            "icon": 'icon-shipin',
            "img": require('@/assets/video.png'),
            "top": 0,
            "left": 0,
            "dataType": 0,
            "data": {
                value: 'http://www.w3school.com.cn/i/movie.ogg'
            },
            "option": {},
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 670,
                "height": 370,
                "option": {},
                "name": "video",
                "prop": "video"
            },
        },
    }, {
        label: '监控',
        option: {
            "title": "监控",
            "name": "监控",
            "icon": 'icon-shipin',
            "img": require('@/assets/video.png'),
            "top": 0,
            "left": 0,
            "dataType": 0,
            "option": {
                "url":'',
                "title":''

            },
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 300,
                "height": 300,
                "name": "camera",
                "prop": "camera"
            },

        },
    }]
}, {
    "label": '指标',
    "icon": 'icon-a-lujing47',
    "children": [{
        "label": '翻牌器',
        "option": {
            "title": "翻牌器",
            "name": "翻牌器",
            "icon": 'icon-flop',
            "img": require('@/assets/flop.png'),
            "top": 0,
            "left": 0,
            "dataType": 0,
            "data": {
                value: '12345'
            },
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 300,
                "height": 100,
                "name": "flop",
                "prop": "flop",
            },
            "option": {
                "type": "img",
                "suffixText": "",
                "suffixTextAlign": "",
                "suffixSplit": '',
                "suffixColor": "",
                "suffixFontSize": '',
                "borderColor": "#fff",
                "borderWidth": 3,
                "backgroundBorder": "/img/border/border1.png",
                "fontSize": 32,
                "fontWeight": "normal",
                "splitx": 0,
                "splity": 0,
                "backgroundColor": "",
                "color": "#fff"
            },
        }
    },
        {
            label: '报警数',
            option: {
                "name": "报警数",
                "title": "报警数",
                "icon": 'icon-bar',
                "img": require('@/assets/text4.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 100,
                    "height": 100,
                    "name": "alert",
                    "prop": "alert",
                },
                "option": {
                    "fontSize": 20,
                }
            }
        }, {
            "label": '颜色块',
            "option": {
                "title": "颜色块",
                "name": "颜色块",
                "icon": 'icon-flop',
                "img": require('@/assets/flop2.png'),
                "top": 0,
                "left": 0,
                "dataType": 0,
                "data": [{
                    "backgroundColor": '#67C23A',
                    "prefixText": "某某某总人数",
                    "value": '12345',
                    "suffixText": '人',
                }, {
                    "backgroundColor": '#409EFF',
                    "prefixText": "某某某总人数",
                    "value": '12345',
                    "suffixText": '人',
                }, {
                    "backgroundColor": '#E6A23C',
                    "prefixText": "某某某总人数",
                    "value": '12345',
                    "suffixText": '人',
                }, {
                    "backgroundColor": '#F56C6C',
                    "prefixText": "某某某总人数",
                    "value": '12345',
                    "suffixText": '人',
                }, {
                    "backgroundColor": '#7232dd',
                    "prefixText": "某某某总人数",
                    "value": '12345',
                    "suffixText": '人',
                }, {
                    "backgroundColor": 'blue',
                    "prefixText": "某某某总人数",
                    "value": '12345',
                    "suffixText": '人',
                }],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 888,
                    "height": 203,
                    "name": "flop",
                    "prop": "flop",
                },
                "option": {
                    "span": 3,
                    "decimals": 2,
                    "whole": true,
                    "padding": 12,
                    "textAlign": 'left',
                    "splity": 23,
                    "splitx": 17,
                    "fontSize": 28,
                    "prefixSplity": 4,
                    "prefixFontSize": 13,
                    "backgroundColor": "#F56C6C",
                    "suffixText": '人',
                    "suffixInline": true,
                    "suffixSplitx": 10,
                    "suffixFontSize": 18,
                },
            }
        }, {
            "label": '环形图',
            "option": {
                "title": "环形图",
                "name": "环形图",
                "icon": 'icon-huanxingtu',
                "img": require('@/assets/progress.png'),
                "top": 0,
                "left": 0,
                "dataType": 0,
                "data": {
                    "label": "人数增涨",
                    "value": 40,
                    "data": 80
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 300,
                    "height": 300,
                    "name": "progress",
                    "prop": "progress"
                },
                "option": {
                    "type": "circle",
                    "strokeWidth": 25,
                    "color": "rgba(154, 168, 212, 1)",
                    "fontSize": 40,
                    "fontWeight": "normal",
                    "suffixColor": "rgba(154, 168, 212, 1)",
                    "suffixFontSize": 40,
                    "suffixFontWeight": "normal",
                    "borderColor": "#564AA3",
                    "split": 20,
                    "width": 400,
                    "height": 80
                },
            }
        }, {
            "label": '进度条',
            "option": {
                "title": "进度条",
                "name": "进度条",
                "icon": 'icon-jindutiao',
                "img": require('@/assets/progress2.png'),
                "top": 0,
                "left": 0,
                "data": {
                    "label": "人数增涨",
                    "value": 40,
                    "data": 80
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 400,
                    "height": 100,
                    "name": "progress",
                    "prop": "progress"
                },
                "option": {
                    "type": "line",
                    "color": "#fff",
                    "fontSize": 24,
                    "suffixColor": "#fff",
                    "strokeWidth": 13,
                    "fontWeight": "normal",
                    "borderColor": "#564AA3"
                },
            }
        }, {
            label: '仪表盘',
            option: {
                "title": "仪表盘",
                "icon": 'icon-yibiaopan1',
                "img": require('@/assets/gauge.png'),
                "name": "仪表盘",
                "dataType": 1,
                "dataMethod": 'get',
                "time": 5000,
                "url": baseUrl + "/gauge",
                "data": {
                    min: 1,
                    max: 10,
                    label: '名称',
                    value: 4,
                    unit: '%'
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 390,
                    "height": 314,
                    "name": "gauge",
                    "prop": "gauge"
                },
                "option": {
                    "lineSize": 15,
                    "axisLabelShow": false,
                    "axisLabelFontSize": 25,
                    "nameFontSize": 20,
                    "valueFontSize": 30,
                    "nameColor": "",
                    "lineColor": "#eee",
					"min": 1,
					"max": 10,
					"unit": '',
                    "barColor": [{
                        "color1": "rgba(154, 168, 212, 1)",
                        "postion": "0.2",
                    },
                        {
                            "color1": "#23B7E5",
                            "postion": "0.8",
                        },
                        {
                            "color1": "#564AA3",
                            "postion": "1",
                        }
                    ]
                },
            },
        }, {
            label: '字符云',
            option: {
                "title": "字符云",
                "name": "字符云",
                "icon": "icon-wordCloud",
                "img": require('@/assets/wordcloud.png'),
                "top": 725,
                "left": 3780,
                "dataType": 1,
                "dataMethod": 'get',
                "data": [{
                    name: '三星',
                    value: '1234'
                }, {
                    name: '小米',
                    value: '1234'
                }, {
                    name: '华为',
                    value: '1234'
                }, {
                    name: 'oppo',
                    value: '1234'
                }, {
                    name: '抖音',
                    value: '1234'
                }, {
                    name: '快手',
                    value: '1234'
                }, {
                    name: '淘宝',
                    value: '1234'
                }, {
                    name: '百度',
                    value: '1234'
                }, {
                    name: '京东',
                    value: '1234'
                }, {
                    name: '天猫',
                    value: '1234'
                }, {
                    name: '字符1',
                    value: '1234'
                }, {
                    name: '字符1',
                    value: '1234'
                }],
                "dataFormatter": "",
                "stylesFormatter": "",
                "url": baseUrl + "/wordCloud",
                "time": 5000,
                "component": {
                    "name": "wordcloud",
                    "prop": "wordcloud",
                    "width": 600,
                    "height": 300,
                },
                option: {
                    minFontSize: 30,
                    maxFontSize: 80,
                    split: 30,
                    rotate: true,
                }
            }
        }
    ]
}, {
    "label": '表格',
    "icon": 'icon-table',
    "children": [{
        label: '表格',
        "option": {
            "title": "表格",
            "name": "表格",
            "icon": 'icon-table',
            "img": require('@/assets/table.png'),
            "top": 0,
            "left": 0,
            "dataType": 0,

            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 500,
                "height": 200,
                "name": "myTable",
                "prop": "myTable",
            },
            "option": {
                "config":['border'],
                "bgColor":'#fff',
                "data": [],
                "columnShow": true,
                "columnViews": true,
                "headerBackground": "rgba(30, 144, 255, 1)",
                "headerColor": "rgba(241, 242, 245, 1)",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "rgba(0, 0, 0, 1)",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "dataList":[],
                "column": [{
                    "title": "车牌号",
                    "key": "type1",
                    "slot": "type1",
                    "width":0,
                    "fixed": 'no',
                    "align":"left",
                    "ellipsis":false, //开启后，文本将不换行，超出部分显示为省略号
                    "tooltip":false, //开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
                    "hide":false
                }, {
                    "title": "驾驶员",
                    "key": "type2",
                    "slot": "type2",
                    "width":0,
                    "fixed": 'no',
                    "align":"left",
                    "ellipsis":false, //开启后，文本将不换行，超出部分显示为省略号
                    "tooltip":false, //开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
                    "hide":false
                }, {
                    "title": "里程",
                    "key": "type3",
                    "slot": "type3",
                    "width":0,
                    "fixed": 'no',
                    "align":"left",
                    "ellipsis":false, //开启后，文本将不换行，超出部分显示为省略号
                    "tooltip":false, //开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
                    "hide":false
                }, {
                    "title": "油耗",
                    "key": "type4",
                    "slot": "type4",
                    "width":0,
                    "fixed": 'no',
                    "align":"left",
                    "ellipsis":false, //开启后，文本将不换行，超出部分显示为省略号
                    "tooltip":false, //开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
                    "hide":false
                }],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 10000,
                "fontSize": 15,
                "count": 4,
                "nthColor": "rgba(127, 185, 242, 1)",
                "othColor": "rgba(164, 205, 244, 1)",
                "index": true,
                "scrollCount": 1,
                "showHeader": true
            }
        }
    },
    //     {
    //     "label": '表格',
    //     "option": {
    //         "title": "表格",
    //         "name": "表格",
    //         "icon": 'icon-table',
    //         "img": require('@/assets/table.png'),
    //         "top": 0,
    //         "left": 0,
    //         "dataType": 0,
    //         "data": [{
    //             "type1": '数据1',
    //             "type2": '数据1'
    //         }, {
    //             "type1": '数据2',
    //             "type2": '数据2'
    //         }, {
    //             "type1": '数据3',
    //             "type2": '数据3'
    //         }, {
    //             "type1": '数据4',
    //             "type2": '数据4'
    //         }],
    //         "dataFormatter": "",
    //         "stylesFormatter": "",
    //         "component": {
    //             "width": 500,
    //             "height": 200,
    //             "name": "table",
    //             "prop": "table",
    //         },
    //         "option": {
    //             "columnShow": true,
    //             "columnViews": true,
    //             "headerBackground": "rgba(30, 144, 255, 1)",
    //             "headerColor": "rgba(241, 242, 245, 1)",
    //             "headerTextAlign": "center",
    //             "bodyBackground": "rgba(0, 0, 0, 0.01)",
    //             "bodyColor": "rgba(0, 0, 0, 1)",
    //             "borderColor": "rgba(51, 65, 107, 1)",
    //             "bodyTextAlign": "center",
    //             "column": [{
    //                 "label": "车牌号",
    //                 "prop": "type1"
    //             }, {
    //                 "label": "驾驶员",
    //                 "prop": "type2"
    //             }, {
    //                 "label": "里程",
    //                 "prop": "type3"
    //             }, {
    //                 "label": "油耗",
    //                 "prop": "type4"
    //             }],
    //             "align": "center",
    //             "headerAlign": "center",
    //             "header": false,
    //             "scroll": true,
    //             "scrollTime": 10000,
    //             "fontSize": 15,
    //             "count": 4,
    //             "nthColor": "rgba(127, 185, 242, 1)",
    //             "othColor": "rgba(164, 205, 244, 1)",
    //             "index": true,
    //             "scrollCount": 1
    //         }
    //     }
    // },
        {
            label: '报警列表',
            option: {
                "name": "报警列表",
                "title": "报警列表",
                "icon": 'icon-liebiao',
                "img": require('@/assets/text4.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 1800,
                    "height": 900,
                    "name": "alertList",
                    "prop": "alertList",
                },
                "option": {
                    "fontSize": 20,
                }
            }
        },
        {
            label: '选项卡',
            option: {
                "title": "选项卡",
                "name": "选项卡",
                "icon": "icon-xuanxiangka",
                "img": require('@/assets/tabs.png'),
                "child": {
                    "index": [],
                    "paramName": ""
                },
                "dataFormatter": "",
                "stylesFormatter": "",
                "dataType": 0,
                "data": [{
                    "label": "选项卡1",
                    "value": "1"
                },
                    {
                        "label": "选项卡2",
                        "value": "2"
                    }
                ],
                "component": {
                    "width": 356.9128919860628,
                    "height": 46.209059233449096,
                    "name": "tabs",
                    "prop": "tabs"
                },
                "option": {
                    "type": 'tabs',
                    "color": "#eee",
                    "empColor": "#4dffff",
                    "fontSize": 20,
                    "split": 8,
                    "empBackgroundImage": "/img/banner/banner5.png",
                    "backgroundImage": "/img/banner/banner4.png"
                },
            },
        },
        {
            label: '趋势页面',
            option: {
                "name": "趋势页面",
                "title": "趋势页面",
                "icon": 'icon-liebiao',
                "img": require('@/assets/text4.png'),
                "data": [],
                "dataFormatter": "",
                "stylesFormatter": "",
                "component": {
                    "width": 1800,
                    "height": 750,
                    "name": "trendPage",
                    "prop": "trendPage",
                },
                "option": {
                }
            }
        },
    ]
}]
