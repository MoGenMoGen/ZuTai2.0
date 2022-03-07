/**
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Test from './test/';
import State from './state/';
import Xline from './xline/';
import Alert from './alert/';
import alertList from './alertList/';
import energy from './energy/';
import level from './level/'
import moveCar from './moveCar/'
import light from './light/'
import trend from './trend/'
import cursor from './cursor'
import trendNew from './trendNew/'
import myTable from './table/'
import trendPage from './trendPage/'

//基础组件
import baseXline from './base/xline'
import baseYline from './base/yline'
import baseCircle from './base/circle'
import baseRectangle from './base/rectangle'
import baseText from './base/text'
import baseButton from './base/button'
import basePolygon from './base/polygon'
import baseDashboard from './base/dashboard'
import baseQrcode from './base/qrcode'
import baseInput from './base/input'
import baseSelect from './base/select'
import baseRadio from './base/radio'
import baseCheckbox from './base/checkbox'
import $Echart from '../echart/common';
import { KEY_COMPONENT_NAME } from '../echart/variable';
import baseSwitch from './base/switch'
import baseSlider from './base/slider'
import baseBrokenLine from './base/brokenLine'
import camera from './camera'
import baseLinkarea from './base/linkarea'
import baseModel from './base/model'
import baseNav from './base/nav'
import baseArrow from './base/arrow'
import baseTriangle from './base/triangle'

export default (() => {
  const list = [
    Test, State, Xline, Alert, alertList, energy, level, moveCar, light, trend, cursor,myTable,
    baseXline, baseYline, baseCircle, baseRectangle, baseText, baseButton, baseInput, baseSelect, basePolygon, baseQrcode, baseDashboard,baseBrokenLine,
	baseSwitch,
	baseSlider,
	baseRadio,
	baseCheckbox,
	trendNew,camera,
	baseLinkarea,
    baseModel,
    baseNav,
	baseArrow,
    baseTriangle,
    trendPage
  ]
  let result = {}
  //循环注册组件
  list.forEach(ele => {
    ele.mixins = [$Echart]
    result[`${KEY_COMPONENT_NAME}${ele.name}`] = ele
  })
  return result
})()
