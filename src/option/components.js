
// 底层组件库
import barOption from './components/bar'
import datetimeOption from './components/datetime'
import flopOption from './components/flop'
import funnelOption from './components/funnel'
import gaugeOption from './components/gauge'
import iframeOption from './components/iframe'
import imgOption from './components/img'
import imgborderOption from './components/imgborder'
import lineOption from './components/line'
import mapOption from './components/map'
import pictorialbarOption from './components/pictorialbar'
import pieOption from './components/pie'
import progressOption from './components/progress'
import radarOption from './components/radar'
import scatterOption from './components/scatter'
import swiperOption from './components/swiper'
import tableOption from './components/table'
import tabsOption from './components/tabs'
import textOption from './components/text'
import videoOption from './components/video'
import commonOption from './components/common'
import wordcloudOption from './components/wordcloud'
import datavOption from './components/datav'
//通用配置
import mainOption from './components/main'
//自定义组件库
import testOption from '@/components/test/option'
import stateOption from '@/components/state/option'
//线条
import xlineOption from '@/components/xline/option'
import alertOption from '@/components/alert/option'
import alertListOption from '@/components/alertList/option'
//能耗
import energyOption from '@/components/energy/option'
//液位
import levelOption from '@/components/level/option'
//移动
import moveCarOption from '@/components/moveCar/option'
//指示灯
import lightOption from '@/components/light/option'
//趋势
import trendOption from '@/components/trend/option'
//游标
import cursorOption from '@/components/cursor/option'
//趋势(新)
import trendNewOption from '@/components/trendNew/option'
//趋势页面
import trendPageOption from '@/components/trendPage/option'

//基础组件
//横线
import baseXlineOption from '@/components/base/xline/option'
//竖线
import baseYlineOption from '@/components/base/yline/option'
//圆形
import baseCircleOption from '@/components/base/circle/option'
//矩形
import baseRectangleOption from '@/components/base/rectangle/option'
//文本域
import baseTextOption from '@/components/base/text/option'
//输入框
import baseInputOption from '@/components/base/input/option'
//下拉框
import baseSelectOption from '@/components/base/select/option'
//按扭
import baseButtonOption from '@/components/base/button/option'
//多边形
import basePolygonOption from '@/components/base/polygon/option'
//二维码
import baseQrcodeOption from '@/components/base/qrcode/option'
// 仪表盘
import baseDashboardOption from '@/components/base/dashboard/option'
//开关
import baseSwitchOption from '@/components/base/switch/option'
//滑块
import baseSliderOption from '@/components/base/slider/option'
// 单选组
import baseRadioOption from '@/components/base/radio/option'
// 多选组
import baseCheckboxOption from '@/components/base/checkbox/option'
// 折线
import baseBrokenLineOption from '@/components/base/brokenLine/option'
//监控
import cameraOption from '@/components/camera/option'
// 链接区域
import baseLinkareaOption from '@/components/base/linkarea/option'

// 模板
import baseModelOption from '@/components/base/model/option'
// 导航
import baseNavOption from '@/components/base/nav/option'
// 箭头
import baseArrowOption from '@/components/base/arrow/option'
// 三角形
import baseTriangleOption from '@/components/base/triangle/option'

// 表格
import myTableOption from '@/components/table/option'

export default {
  components: {
    commonOption, cursorOption,cameraOption,
    mainOption,
    barOption,
    datetimeOption,
    flopOption,
    funnelOption,
    gaugeOption,
    iframeOption,
    imgOption,
    imgborderOption,
    lineOption,
    mapOption,
    pictorialbarOption,
    pieOption,
    progressOption,
    radarOption,
    scatterOption,
    swiperOption,
    tableOption,
    tabsOption,
    textOption,
    videoOption,
    wordcloudOption,
    datavOption,
    testOption,
    stateOption,
    xlineOption,
    alertOption,
    alertListOption,
    energyOption,
    levelOption, moveCarOption, lightOption, trendOption,
    baseXlineOption, baseYlineOption, baseCircleOption, baseRectangleOption, baseTextOption, baseButtonOption, baseInputOption, baseSelectOption,
    basePolygonOption, baseQrcodeOption, baseDashboardOption,
	baseSwitchOption,
	baseSliderOption,
	baseRadioOption,
	baseCheckboxOption,
	trendNewOption,
    baseBrokenLineOption,
	baseLinkareaOption,
    baseModelOption,
    baseNavOption,
	baseArrowOption,
    baseTriangleOption,
    myTableOption,
    trendPageOption
  }
}
