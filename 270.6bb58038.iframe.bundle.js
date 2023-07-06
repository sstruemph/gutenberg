"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[270],{"./packages/components/src/item-group/context.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>ItemGroupContext,X:()=>useItemGroupContext});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const ItemGroupContext=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({size:"medium"}),useItemGroupContext=()=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(ItemGroupContext)},"./packages/components/src/item-group/item-group/component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>ItemGroup,Z:()=>item_group_component});var context_connect=__webpack_require__("./packages/components/src/ui/context/context-connect.ts"),use_context_system=__webpack_require__("./packages/components/src/ui/context/use-context-system.js"),styles=__webpack_require__("./packages/components/src/item-group/styles.ts"),use_cx=__webpack_require__("./packages/components/src/utils/hooks/use-cx.ts");var context=__webpack_require__("./packages/components/src/item-group/context.ts"),component=__webpack_require__("./packages/components/src/view/component.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedItemGroup(props,forwardedRef){const{isBordered,isSeparated,size:sizeProp,...otherProps}=function useItemGroup(props){const{className,isBordered=!1,isRounded=!0,isSeparated=!1,role="list",...otherProps}=(0,use_context_system.y)(props,"ItemGroup");return{isBordered,className:(0,use_cx.I)()(isBordered&&styles.Dq,isSeparated&&styles.s4,isRounded&&styles.eP,className),role,isSeparated,...otherProps}}(props),{size:contextSize}=(0,context.X)(),contextValue={spacedAround:!isBordered&&!isSeparated,size:sizeProp||contextSize};return(0,jsx_runtime.jsx)(context.K.Provider,{value:contextValue,children:(0,jsx_runtime.jsx)(component.Z,{...otherProps,ref:forwardedRef})})}UnconnectedItemGroup.displayName="UnconnectedItemGroup";const ItemGroup=(0,context_connect.Iq)(UnconnectedItemGroup,"ItemGroup"),item_group_component=ItemGroup;try{ItemGroup.displayName="ItemGroup",ItemGroup.__docgenInfo={description:"`ItemGroup` displays a list of `Item`s grouped and styled together.",displayName:"ItemGroup",props:{isBordered:{defaultValue:{value:"false"},description:"Renders a border around the itemgroup.",name:"isBordered",required:!1,type:{name:"boolean"}},isRounded:{defaultValue:{value:"true"},description:"Renders with rounded corners.",name:"isRounded",required:!1,type:{name:"boolean"}},isSeparated:{defaultValue:{value:"false"},description:"Renders a separator between each item.",name:"isSeparated",required:!1,type:{name:"boolean"}},size:{defaultValue:{value:"'medium'"},description:"Determines the amount of padding within the component.",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},children:{defaultValue:null,description:"The children elements.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 507 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/item-group/item-group/component.tsx#ItemGroup"]={docgenInfo:ItemGroup.__docgenInfo,name:"ItemGroup",path:"packages/components/src/item-group/item-group/component.tsx#ItemGroup"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/item-group/styles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W6:()=>unstyledButton,g_:()=>itemWrapper,wc:()=>item,Dq:()=>bordered,s4:()=>separated,by:()=>spacedAround,eP:()=>rounded,KA:()=>itemSizes});var _emotion_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/utils/colors-values.js"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/utils/config-values.js");const unstyledButton=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("appearance:none;border:1px solid transparent;cursor:pointer;background:none;text-align:start;svg,path{fill:currentColor;}&:hover{color:",_utils__WEBPACK_IMPORTED_MODULE_1__.D.ui.theme,";}&:focus-visible{box-shadow:0 0 0 var( --wp-admin-border-width-focus ) var(\n\t\t\t\t--wp-components-color-accent,\n\t\t\t\tvar( --wp-admin-theme-color, ",_utils__WEBPACK_IMPORTED_MODULE_1__.D.ui.theme," )\n\t\t\t);outline:2px solid transparent;}",""),itemWrapper={name:"1bcj5ek",styles:"width:100%;display:block"},item={name:"150ruhm",styles:"box-sizing:border-box;width:100%;display:block;margin:0;color:inherit"},bordered=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("border:1px solid ",_utils__WEBPACK_IMPORTED_MODULE_2__.Z.surfaceBorderColor,";",""),separated=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(">*:not( marquee )>*{border-bottom:1px solid ",_utils__WEBPACK_IMPORTED_MODULE_2__.Z.surfaceBorderColor,";}>*:last-of-type>*:not( :focus ){border-bottom-color:transparent;}",""),borderRadius=_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlBorderRadius,spacedAround=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("border-radius:",borderRadius,";",""),rounded=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("border-radius:",borderRadius,";>*:first-of-type>*{border-top-left-radius:",borderRadius,";border-top-right-radius:",borderRadius,";}>*:last-of-type>*{border-bottom-left-radius:",borderRadius,";border-bottom-right-radius:",borderRadius,";}",""),baseFontHeight=`calc(${_utils__WEBPACK_IMPORTED_MODULE_2__.Z.fontSize} * ${_utils__WEBPACK_IMPORTED_MODULE_2__.Z.fontLineHeightBase})`,paddingY=`calc((${_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlHeight} - ${baseFontHeight} - 2px) / 2)`,paddingYSmall=`calc((${_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlHeightSmall} - ${baseFontHeight} - 2px) / 2)`,paddingYLarge=`calc((${_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlHeightLarge} - ${baseFontHeight} - 2px) / 2)`,itemSizes={small:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("padding:",paddingYSmall," ",_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlPaddingXSmall,";",""),medium:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("padding:",paddingY," ",_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlPaddingX,";",""),large:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)("padding:",paddingYLarge," ",_utils__WEBPACK_IMPORTED_MODULE_2__.Z.controlPaddingXLarge,";","")}}}]);