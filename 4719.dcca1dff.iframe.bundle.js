"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[4719],{"./packages/components/build-module/range-control/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>range_control});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),build_module=__webpack_require__("./packages/i18n/build-module/index.js"),use_instance_id=__webpack_require__("./packages/compose/build-module/hooks/use-instance-id/index.js"),use_merge_refs=__webpack_require__("./packages/compose/build-module/hooks/use-merge-refs/index.js"),base_control=__webpack_require__("./packages/components/build-module/base-control/index.js"),build_module_button=__webpack_require__("./packages/components/build-module/button/index.js"),icon=__webpack_require__("./packages/components/build-module/icon/index.js"),colors_values=__webpack_require__("./packages/components/build-module/utils/colors-values.js"),use_controlled_state=__webpack_require__("./packages/components/build-module/utils/hooks/use-controlled-state.js"),math=__webpack_require__("./packages/components/build-module/utils/math.js");function floatClamp(value,min,max){return"number"!=typeof value?null:parseFloat(`${(0,math.uZ)(value,min,max)}`)}var emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),number_control=__webpack_require__("./packages/components/build-module/number-control/index.js"),rtl=__webpack_require__("./packages/components/build-module/utils/rtl.js"),reduce_motion=__webpack_require__("./packages/components/build-module/utils/reduce-motion.js"),space=__webpack_require__("./packages/components/build-module/ui/utils/space.js");const rangeHeight=()=>(0,emotion_react_browser_esm.iv)({height:30,minHeight:30},"","","",""),Root=(0,emotion_styled_base_browser_esm.Z)("div",{target:"e1epgpqk14"})("-webkit-tap-highlight-color:transparent;align-items:center;display:flex;justify-content:flex-start;padding:0;position:relative;touch-action:none;width:100%;min-height:40px;",(({__next40pxDefaultSize})=>!__next40pxDefaultSize&&(0,emotion_react_browser_esm.iv)({minHeight:30},"","","","")),";"),Wrapper=(0,emotion_styled_base_browser_esm.Z)("div",{target:"e1epgpqk13"})("display:block;flex:1;position:relative;width:100%;",(({color=colors_values.D.ui.borderFocus})=>(0,emotion_react_browser_esm.iv)({color},"","","","")),";",rangeHeight,";",(({marks,__nextHasNoMarginBottom})=>__nextHasNoMarginBottom?"":(0,emotion_react_browser_esm.iv)({marginBottom:marks?16:void 0},"","","","")),";"),BeforeIconWrapper=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk12"})("display:flex;margin-top:",4,"px;",(0,rtl.b)({marginRight:6}),";"),AfterIconWrapper=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk11"})("display:flex;margin-top:",4,"px;",(0,rtl.b)({marginLeft:6}),";"),Rail=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk10"})("background-color:",colors_values.D.gray[300],";left:0;pointer-events:none;right:0;display:block;height:",4,"px;position:absolute;margin-top:",13,"px;top:0;border-radius:",4,"px;",(({disabled,railColor})=>{let background=railColor||"";return disabled&&(background=colors_values.D.ui.backgroundDisabled),(0,emotion_react_browser_esm.iv)({background},"","","","")}),";"),Track=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk9"})("background-color:currentColor;border-radius:",4,"px;height:",4,"px;pointer-events:none;display:block;position:absolute;margin-top:",13,"px;top:0;",(({disabled,trackColor})=>{let background=trackColor||"currentColor";return disabled&&(background=colors_values.D.gray[400]),(0,emotion_react_browser_esm.iv)({background},"","","","")}),";"),MarksWrapper=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk8"})({name:"l7tjj5",styles:"display:block;pointer-events:none;position:relative;width:100%;user-select:none"}),Mark=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk7"})("height:",12,"px;left:0;position:absolute;top:-4px;width:1px;",(({disabled,isFilled})=>{let backgroundColor=isFilled?"currentColor":colors_values.D.gray[300];return disabled&&(backgroundColor=colors_values.D.gray[400]),(0,emotion_react_browser_esm.iv)({backgroundColor},"","","","")}),";"),MarkLabel=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk6"})("color:",colors_values.D.gray[300],";left:0;font-size:11px;position:absolute;top:12px;transform:translateX( -50% );white-space:nowrap;",(({isFilled})=>(0,emotion_react_browser_esm.iv)({color:isFilled?colors_values.D.gray[700]:colors_values.D.gray[300]},"","","","")),";"),thumbColor=({disabled})=>disabled?(0,emotion_react_browser_esm.iv)("background-color:",colors_values.D.gray[400],";","","",""):(0,emotion_react_browser_esm.iv)("background-color:",colors_values.D.ui.theme,";","","",""),ThumbWrapper=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk5"})("align-items:center;display:flex;height:",12,"px;justify-content:center;margin-top:",9,"px;outline:0;pointer-events:none;position:absolute;top:0;user-select:none;width:",12,"px;border-radius:50%;",thumbColor,";",(0,rtl.b)({marginLeft:-10}),";",(0,rtl.b)({transform:"translateX( 4.5px )"},{transform:"translateX( -4.5px )"}),";"),Thumb=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk4"})("align-items:center;border-radius:50%;height:100%;outline:0;position:absolute;user-select:none;width:100%;",thumbColor,";",(({isFocused})=>isFocused?(0,emotion_react_browser_esm.iv)("&::before{content:' ';position:absolute;background-color:",colors_values.D.ui.theme,";opacity:0.4;border-radius:50%;height:",20,"px;width:",20,"px;top:-4px;left:-4px;}","","",""):""),";"),InputRange=(0,emotion_styled_base_browser_esm.Z)("input",{target:"e1epgpqk3"})("box-sizing:border-box;cursor:pointer;display:block;height:100%;left:0;margin:0 -",6,"px;opacity:0;outline:none;position:absolute;right:0;top:0;width:calc( 100% + ",12,"px );");var _ref={name:"1cypxip",styles:"top:-80%"},_ref2={name:"1lr98c4",styles:"bottom:-80%"};const Tooltip=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk2"})("background:rgba( 0, 0, 0, 0.8 );border-radius:2px;color:white;display:inline-block;font-size:12px;min-width:32px;opacity:0;padding:4px 8px;pointer-events:none;position:absolute;text-align:center;transition:opacity 120ms ease;user-select:none;line-height:1.4;",(({show})=>(0,emotion_react_browser_esm.iv)({opacity:show?1:0},"","","","")),";",(({position})=>"bottom"===position?_ref2:_ref),";",(0,reduce_motion.r)("transition"),";",(0,rtl.b)({transform:"translateX(-50%)"},{transform:"translateX(50%)"}),";"),InputNumber=(0,emotion_styled_base_browser_esm.Z)(number_control.Z,{target:"e1epgpqk1"})("display:inline-block;font-size:13px;margin-top:0;input[type='number']&{",rangeHeight,";}",(0,rtl.b)({marginLeft:`${(0,space.D)(4)} !important`}),";"),ActionRightWrapper=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e1epgpqk0"})("display:block;margin-top:0;button,button.is-small{margin-left:0;",rangeHeight,";}",(0,rtl.b)({marginLeft:8}),";");const input_range=(0,react.forwardRef)((function input_range_InputRange(props,ref){const{describedBy,label,value,...otherProps}=props;return(0,react.createElement)(InputRange,{...otherProps,"aria-describedby":describedBy,"aria-label":label,"aria-hidden":!1,ref,tabIndex:0,type:"range",value})}));function RangeMark(props){const{className,isFilled=!1,label,style={},...otherProps}=props,classes=classnames_default()("components-range-control__mark",isFilled&&"is-filled",className),labelClasses=classnames_default()("components-range-control__mark-label",isFilled&&"is-filled");return(0,react.createElement)(react.Fragment,null,(0,react.createElement)(Mark,{...otherProps,"aria-hidden":"true",className:classes,isFilled,style}),label&&(0,react.createElement)(MarkLabel,{"aria-hidden":"true",className:labelClasses,isFilled,style},label))}function RangeRail(props){const{disabled=!1,marks=!1,min=0,max=100,step=1,value=0,...restProps}=props;return(0,react.createElement)(react.Fragment,null,(0,react.createElement)(Rail,{disabled,...restProps}),marks&&(0,react.createElement)(Marks,{disabled,marks,min,max,step,value}))}function Marks(props){const{disabled=!1,marks=!1,min=0,max=100,step:stepProp=1,value=0}=props,marksData=function useMarks({marks,min=0,max=100,step=1,value=0}){if(!marks)return[];const range=max-min;if(!Array.isArray(marks)){marks=[];const count=1+Math.round(range/step);for(;count>marks.push({value:step*marks.length+min}););}const placedMarks=[];return marks.forEach(((mark,index)=>{if(mark.value<min||mark.value>max)return;const key=`mark-${index}`,isFilled=mark.value<=value,offset=(mark.value-min)/range*100+"%",offsetStyle={[(0,build_module.dZ)()?"right":"left"]:offset};placedMarks.push({...mark,isFilled,key,style:offsetStyle})})),placedMarks}({marks,min,max,step:"any"===stepProp?1:stepProp,value});return(0,react.createElement)(MarksWrapper,{"aria-hidden":"true",className:"components-range-control__marks"},marksData.map((mark=>(0,react.createElement)(RangeMark,{...mark,key:mark.key,"aria-hidden":"true",disabled}))))}function SimpleTooltip(props){const{className,inputRef,tooltipPosition,show=!1,style={},value=0,renderTooltipContent=v=>v,zIndex=100,...restProps}=props,position=function useTooltipPosition({inputRef,tooltipPosition}){const[position,setPosition]=(0,react.useState)(),setTooltipPosition=(0,react.useCallback)((()=>{inputRef&&inputRef.current&&setPosition(tooltipPosition)}),[tooltipPosition,inputRef]);return(0,react.useEffect)((()=>{setTooltipPosition()}),[setTooltipPosition]),(0,react.useEffect)((()=>(window.addEventListener("resize",setTooltipPosition),()=>{window.removeEventListener("resize",setTooltipPosition)}))),position}({inputRef,tooltipPosition}),classes=classnames_default()("components-simple-tooltip",className),styles={...style,zIndex};return(0,react.createElement)(Tooltip,{...restProps,"aria-hidden":show,className:classes,position,show,role:"tooltip",style:styles},renderTooltipContent(value))}const noop=()=>{};const RangeControl=(0,react.forwardRef)((function UnforwardedRangeControl(props,forwardedRef){const{__nextHasNoMarginBottom=!1,afterIcon,allowReset=!1,beforeIcon,className,color:colorProp=colors_values.D.ui.theme,currentInput,disabled=!1,help,hideLabelFromVision=!1,initialPosition,isShiftStepEnabled=!0,label,marks=!1,max=100,min=0,onBlur=noop,onChange=noop,onFocus=noop,onMouseLeave=noop,onMouseMove=noop,railColor,renderTooltipContent=v=>v,resetFallbackValue,__next40pxDefaultSize=!1,shiftStep=10,showTooltip:showTooltipProp,step=1,trackColor,value:valueProp,withInputField=!0,...otherProps}=props,[value,setValue]=function useControlledRangeValue(settings){const{min,max,value:valueProp,initial}=settings,[state,setInternalState]=(0,use_controlled_state.Z)(floatClamp(valueProp,min,max),{initial:floatClamp(null!=initial?initial:null,min,max),fallback:null});return[state,(0,react.useCallback)((nextValue=>{setInternalState(null===nextValue?null:floatClamp(nextValue,min,max))}),[min,max,setInternalState])]}({min,max,value:null!=valueProp?valueProp:null,initial:initialPosition}),isResetPendent=(0,react.useRef)(!1);let hasTooltip=showTooltipProp,hasInputField=withInputField;"any"===step&&(hasTooltip=!1,hasInputField=!1);const[showTooltip,setShowTooltip]=(0,react.useState)(hasTooltip),[isFocused,setIsFocused]=(0,react.useState)(!1),inputRef=(0,react.useRef)(),isCurrentlyFocused=inputRef.current?.matches(":focus"),isThumbFocused=!disabled&&isFocused,isValueReset=null===value,inputSliderValue=isValueReset?"":void 0!==value?value:currentInput,rangeFillValue=isValueReset?(max-min)/2+min:value,fillValue=isValueReset?50:(value-min)/(max-min)*100,fillValueOffset=`${(0,math.uZ)(fillValue,0,100)}%`,classes=classnames_default()("components-range-control",className),wrapperClasses=classnames_default()("components-range-control__wrapper",!!marks&&"is-marked"),id=(0,use_instance_id.Z)(UnforwardedRangeControl,"inspector-range-control"),describedBy=help?`${id}__help`:void 0,enableTooltip=!1!==hasTooltip&&Number.isFinite(value),handleOnReset=()=>{let resetValue=parseFloat(`${resetFallbackValue}`),onChangeResetValue=resetValue;isNaN(resetValue)&&(resetValue=null,onChangeResetValue=void 0),setValue(resetValue),onChange(onChangeResetValue)},offsetStyle={[(0,build_module.dZ)()?"right":"left"]:fillValueOffset};return(0,react.createElement)(base_control.ZP,{__nextHasNoMarginBottom,className:classes,label,hideLabelFromVision,id:`${id}`,help},(0,react.createElement)(Root,{className:"components-range-control__root",__next40pxDefaultSize},beforeIcon&&(0,react.createElement)(BeforeIconWrapper,null,(0,react.createElement)(icon.Z,{icon:beforeIcon})),(0,react.createElement)(Wrapper,{__nextHasNoMarginBottom,className:wrapperClasses,color:colorProp,marks:!!marks},(0,react.createElement)(input_range,{...otherProps,className:"components-range-control__slider",describedBy,disabled,id:`${id}`,label,max,min,onBlur:event=>{onBlur(event),setIsFocused(!1),setShowTooltip(!1)},onChange:event=>{const nextValue=parseFloat(event.target.value);setValue(nextValue),onChange(nextValue)},onFocus:event=>{onFocus(event),setIsFocused(!0),setShowTooltip(!0)},onMouseMove,onMouseLeave,ref:(0,use_merge_refs.Z)([inputRef,forwardedRef]),step,value:null!=inputSliderValue?inputSliderValue:void 0}),(0,react.createElement)(RangeRail,{"aria-hidden":!0,disabled,marks,max,min,railColor,step,value:rangeFillValue}),(0,react.createElement)(Track,{"aria-hidden":!0,className:"components-range-control__track",disabled,style:{width:fillValueOffset},trackColor}),(0,react.createElement)(ThumbWrapper,{className:"components-range-control__thumb-wrapper",style:offsetStyle,disabled},(0,react.createElement)(Thumb,{"aria-hidden":!0,isFocused:isThumbFocused,disabled})),enableTooltip&&(0,react.createElement)(SimpleTooltip,{className:"components-range-control__tooltip",inputRef,tooltipPosition:"bottom",renderTooltipContent,show:isCurrentlyFocused||showTooltip,style:offsetStyle,value})),afterIcon&&(0,react.createElement)(AfterIconWrapper,null,(0,react.createElement)(icon.Z,{icon:afterIcon})),hasInputField&&(0,react.createElement)(InputNumber,{"aria-label":label,className:"components-range-control__number",disabled,inputMode:"decimal",isShiftStepEnabled,max,min,onBlur:()=>{isResetPendent.current&&(handleOnReset(),isResetPendent.current=!1)},onChange:next=>{let nextValue=parseFloat(next);setValue(nextValue),isNaN(nextValue)?allowReset&&(isResetPendent.current=!0):((nextValue<min||nextValue>max)&&(nextValue=floatClamp(nextValue,min,max)),onChange(nextValue),isResetPendent.current=!1)},shiftStep,size:__next40pxDefaultSize?"__unstable-large":"default",__unstableInputWidth:__next40pxDefaultSize?(0,space.D)(20):(0,space.D)(16),step,value:inputSliderValue}),allowReset&&(0,react.createElement)(ActionRightWrapper,null,(0,react.createElement)(build_module_button.ZP,{className:"components-range-control__reset",disabled:disabled||void 0===value,variant:"secondary",isSmall:!0,onClick:handleOnReset},(0,build_module.__)("Reset")))))})),range_control=RangeControl}}]);