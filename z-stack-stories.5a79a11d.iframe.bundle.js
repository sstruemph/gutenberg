"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[463],{"./packages/components/src/ui/utils/get-valid-children.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>getValidChildren});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function getValidChildren(children){return"string"==typeof children?[children]:_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children).filter((child=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)))}},"./packages/components/src/ui/utils/space.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>space});const GRID_BASE="4px";function space(value){if(void 0===value)return;if(!value)return"0";const asInt="number"==typeof value?value:Number(value);return"undefined"!=typeof window&&window.CSS?.supports?.("margin",value.toString())||Number.isNaN(asInt)?value.toString():`calc(${GRID_BASE} * ${value})`}},"./packages/components/src/utils/config-values.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _ui_utils_space__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/ui/utils/space.ts"),_colors_values__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/components/src/utils/colors-values.js");const CONTROL_PROPS={controlSurfaceColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,controlTextActiveColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.ui.theme,controlPaddingX:"12px",controlPaddingXLarge:"calc(12px * 1.3334)",controlPaddingXSmall:"calc(12px / 1.3334)",controlBackgroundColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,controlBorderRadius:"2px",controlBoxShadow:"transparent",controlBoxShadowFocus:`0 0 0 0.5px ${_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.ui.theme}`,controlDestructiveBorderColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.alert.red,controlHeight:"36px",controlHeightXSmall:"calc( 36px * 0.6 )",controlHeightSmall:"calc( 36px * 0.8 )",controlHeightLarge:"calc( 36px * 1.2 )",controlHeightXLarge:"calc( 36px * 1.4 )"},TOGGLE_GROUP_CONTROL_PROPS={toggleGroupControlBackgroundColor:CONTROL_PROPS.controlBackgroundColor,toggleGroupControlBorderColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.ui.border,toggleGroupControlBackdropBackgroundColor:CONTROL_PROPS.controlSurfaceColor,toggleGroupControlBackdropBorderColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.ui.border,toggleGroupControlButtonColorActive:CONTROL_PROPS.controlBackgroundColor},__WEBPACK_DEFAULT_EXPORT__=Object.assign({},CONTROL_PROPS,TOGGLE_GROUP_CONTROL_PROPS,{colorDivider:"rgba(0, 0, 0, 0.1)",colorScrollbarThumb:"rgba(0, 0, 0, 0.2)",colorScrollbarThumbHover:"rgba(0, 0, 0, 0.5)",colorScrollbarTrack:"rgba(0, 0, 0, 0.04)",elevationIntensity:1,radiusBlockUi:"2px",borderWidth:"1px",borderWidthFocus:"1.5px",borderWidthTab:"4px",spinnerSize:16,fontSize:"13px",fontSizeH1:"calc(2.44 * 13px)",fontSizeH2:"calc(1.95 * 13px)",fontSizeH3:"calc(1.56 * 13px)",fontSizeH4:"calc(1.25 * 13px)",fontSizeH5:"13px",fontSizeH6:"calc(0.8 * 13px)",fontSizeInputMobile:"16px",fontSizeMobile:"15px",fontSizeSmall:"calc(0.92 * 13px)",fontSizeXSmall:"calc(0.75 * 13px)",fontLineHeightBase:"1.2",fontWeight:"normal",fontWeightHeading:"600",gridBase:"4px",cardBorderRadius:"2px",cardPaddingXSmall:`${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_1__.D)(2)}`,cardPaddingSmall:`${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_1__.D)(4)}`,cardPaddingMedium:`${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_1__.D)(4)} ${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_1__.D)(6)}`,cardPaddingLarge:`${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_1__.D)(6)} ${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_1__.D)(8)}`,popoverShadow:"0 0.7px 1px rgba(0, 0, 0, 0.1), 0 1.2px 1.7px -0.2px rgba(0, 0, 0, 0.1), 0 2.3px 3.3px -0.5px rgba(0, 0, 0, 0.1)",surfaceBackgroundColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,surfaceBackgroundSubtleColor:"#F3F3F3",surfaceBackgroundTintColor:"#F5F5F5",surfaceBorderColor:"rgba(0, 0, 0, 0.1)",surfaceBorderBoldColor:"rgba(0, 0, 0, 0.15)",surfaceBorderSubtleColor:"rgba(0, 0, 0, 0.05)",surfaceBackgroundTertiaryColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,surfaceColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,transitionDuration:"200ms",transitionDurationFast:"160ms",transitionDurationFaster:"120ms",transitionDurationFastest:"100ms",transitionTimingFunction:"cubic-bezier(0.08, 0.52, 0.52, 1)",transitionTimingFunctionControl:"cubic-bezier(0.12, 0.8, 0.32, 1)"})},"./packages/components/src/z-stack/stories/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>stories});var component=__webpack_require__("./packages/components/src/elevation/component.tsx"),view_component=__webpack_require__("./packages/components/src/view/component.tsx"),react=__webpack_require__("./node_modules/react/index.js"),get_valid_children=__webpack_require__("./packages/components/src/ui/utils/get-valid-children.ts"),use_context_system=__webpack_require__("./packages/components/src/ui/context/use-context-system.js"),context_connect=__webpack_require__("./packages/components/src/ui/context/context-connect.ts"),emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");const ZStackChildView=(0,emotion_styled_base_browser_esm.Z)("div",{target:"ebn2ljm1"})("&:not( :first-of-type ){",(({offsetAmount})=>(0,emotion_react_browser_esm.iv)({marginInlineStart:offsetAmount},"","")),";}",(({zIndex})=>(0,emotion_react_browser_esm.iv)({zIndex},"","")),";");var _ref={name:"rs0gp6",styles:"grid-row-start:1;grid-column-start:1"};const ZStackView=(0,emotion_styled_base_browser_esm.Z)("div",{target:"ebn2ljm0"})("display:inline-grid;grid-auto-flow:column;position:relative;&>",ZStackChildView,"{position:relative;justify-self:start;",(({isLayered})=>isLayered?_ref:void 0),";}");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedZStack(props,forwardedRef){const{children,className,isLayered=!0,isReversed=!1,offset=0,...otherProps}=(0,use_context_system.y)(props,"ZStack"),validChildren=(0,get_valid_children.W)(children),childrenLastIndex=validChildren.length-1,clonedChildren=validChildren.map(((child,index)=>{const zIndex=isReversed?childrenLastIndex-index:index,offsetAmount=isLayered?offset*index:offset,key=(0,react.isValidElement)(child)?child.key:index;return(0,jsx_runtime.jsx)(ZStackChildView,{offsetAmount,zIndex,children:child},key)}));return(0,jsx_runtime.jsx)(ZStackView,{...otherProps,className,isLayered,ref:forwardedRef,children:clonedChildren})}UnconnectedZStack.displayName="UnconnectedZStack";const ZStack=(0,context_connect.Iq)(UnconnectedZStack,"ZStack"),z_stack_component=ZStack;try{ZStack.displayName="ZStack",ZStack.__docgenInfo={description:"`ZStack` allows you to stack things along the Z-axis.\n\n```jsx\nimport { __experimentalZStack as ZStack } from '@wordpress/components';\n\nfunction Example() {\n  return (\n    <ZStack offset={ 20 } isLayered>\n      <ExampleImage />\n      <ExampleImage />\n      <ExampleImage />\n    </ZStack>\n  );\n}\n```",displayName:"ZStack",props:{isLayered:{defaultValue:{value:"true"},description:"Layers children elements on top of each other (first: highest z-index,\nlast: lowest z-index).",name:"isLayered",required:!1,type:{name:"boolean"}},isReversed:{defaultValue:{value:"false"},description:"Reverse the layer ordering (first: lowest z-index, last: highest\nz-index).",name:"isReversed",required:!1,type:{name:"boolean"}},offset:{defaultValue:{value:"0"},description:"The amount of space between each child element. Its value is\nautomatically inverted (i.e. from positive to negative, and viceversa)\nwhen switching from LTR to RTL.",name:"offset",required:!1,type:{name:"number"}},children:{defaultValue:null,description:"The children to stack.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 507 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/z-stack/component.tsx#ZStack"]={docgenInfo:ZStack.__docgenInfo,name:"ZStack",path:"packages/components/src/z-stack/component.tsx#ZStack"})}catch(__react_docgen_typescript_loader_error){}const stories={component:z_stack_component,title:"Components (Experimental)/ZStack",argTypes:{as:{control:{type:"text"}},children:{control:{type:null}}},parameters:{sourceLink:"packages/components/src/z-stack",controls:{expanded:!0},docs:{source:{state:"open"}}}},Avatar=({backgroundColor})=>(0,jsx_runtime.jsxs)(view_component.Z,{children:[(0,jsx_runtime.jsx)(view_component.Z,{style:{border:"3px solid black",borderRadius:"9999px",height:"48px",width:"48px",backgroundColor}}),(0,jsx_runtime.jsx)(component.Z,{borderRadius:9999,isInteractive:!1,value:3})]});Avatar.displayName="Avatar";const Template=args=>(0,jsx_runtime.jsxs)(z_stack_component,{...args,children:[(0,jsx_runtime.jsx)(Avatar,{backgroundColor:"#444"}),(0,jsx_runtime.jsx)(Avatar,{backgroundColor:"#777"}),(0,jsx_runtime.jsx)(Avatar,{backgroundColor:"#aaa"}),(0,jsx_runtime.jsx)(Avatar,{backgroundColor:"#fff"})]});Template.displayName="Template";const Default=Template.bind({});Default.args={offset:20};try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/z-stack/stories/index.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"packages/components/src/z-stack/stories/index.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}}}]);