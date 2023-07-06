"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[1721],{"./packages/components/src/navigable-container/container.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/dom/build-module/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const noop=()=>{},MENU_ITEM_ROLES=["menuitem","menuitemradio","menuitemcheckbox"];class NavigableContainer extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component{constructor(args){super(args),this.onKeyDown=this.onKeyDown.bind(this),this.bindContainer=this.bindContainer.bind(this),this.getFocusableContext=this.getFocusableContext.bind(this),this.getFocusableIndex=this.getFocusableIndex.bind(this)}componentDidMount(){this.container&&this.container.addEventListener("keydown",this.onKeyDown)}componentWillUnmount(){this.container&&this.container.removeEventListener("keydown",this.onKeyDown)}bindContainer(ref){const{forwardedRef}=this.props;this.container=ref,"function"==typeof forwardedRef?forwardedRef(ref):forwardedRef&&"current"in forwardedRef&&(forwardedRef.current=ref)}getFocusableContext(target){if(!this.container)return null;const{onlyBrowserTabstops}=this.props,focusables=(onlyBrowserTabstops?_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__.T_.tabbable:_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__.T_.focusable).find(this.container),index=this.getFocusableIndex(focusables,target);return index>-1&&target?{index,target,focusables}:null}getFocusableIndex(focusables,target){return focusables.indexOf(target)}onKeyDown(event){this.props.onKeyDown&&this.props.onKeyDown(event);const{getFocusableContext}=this,{cycle=!0,eventToOffset,onNavigate=noop,stopNavigationEvents}=this.props,offset=eventToOffset(event);if(void 0!==offset&&stopNavigationEvents){event.stopImmediatePropagation();const targetRole=event.target?.getAttribute("role");!!targetRole&&MENU_ITEM_ROLES.includes(targetRole)&&event.preventDefault()}if(!offset)return;const activeElement=event.target?.ownerDocument?.activeElement;if(!activeElement)return;const context=getFocusableContext(activeElement);if(!context)return;const{index,focusables}=context,nextIndex=cycle?function cycleValue(value,total,offset){const nextValue=value+offset;return nextValue<0?total+nextValue:nextValue>=total?nextValue-total:nextValue}(index,focusables.length,offset):index+offset;nextIndex>=0&&nextIndex<focusables.length&&(focusables[nextIndex].focus(),onNavigate(nextIndex,focusables[nextIndex]),"Tab"===event.code&&event.preventDefault())}render(){const{children,stopNavigationEvents,eventToOffset,onNavigate,onKeyDown,cycle,onlyBrowserTabstops,forwardedRef,...restProps}=this.props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{ref:this.bindContainer,...restProps,children})}}NavigableContainer.displayName="NavigableContainer";const forwardedNavigableContainer=(props,ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NavigableContainer,{...props,forwardedRef:ref});forwardedNavigableContainer.displayName="forwardedNavigableContainer",forwardedNavigableContainer.displayName="NavigableContainer";const __WEBPACK_DEFAULT_EXPORT__=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(forwardedNavigableContainer);try{NavigableContainer.displayName="NavigableContainer",NavigableContainer.__docgenInfo={description:"",displayName:"NavigableContainer",props:{children:{defaultValue:null,description:"The component children.",name:"children",required:!1,type:{name:"ReactNode"}},cycle:{defaultValue:{value:"true"},description:"A boolean which tells the component whether or not to cycle from the end back to the beginning and vice versa.",name:"cycle",required:!1,type:{name:"boolean"}},onKeyDown:{defaultValue:null,description:"A callback invoked on the keydown event.",name:"onKeyDown",required:!1,type:{name:"(event: KeyboardEvent) => void"}},onNavigate:{defaultValue:null,description:"A callback invoked when the menu navigates to one of its children passing the index and child as an argument",name:"onNavigate",required:!1,type:{name:"(index: number, focusable: HTMLElement) => void"}},eventToOffset:{defaultValue:null,description:"Gets an offset, given an event.",name:"eventToOffset",required:!0,type:{name:"(event: KeyboardEvent) => 0 | 1 | -1"}},forwardedRef:{defaultValue:null,description:"The forwarded ref.",name:"forwardedRef",required:!1,type:{name:"ForwardedRef<any>"}},onlyBrowserTabstops:{defaultValue:{value:"false"},description:"Whether to only consider browser tab stops.",name:"onlyBrowserTabstops",required:!0,type:{name:"boolean"}},stopNavigationEvents:{defaultValue:{value:"false"},description:"Whether to stop navigation events.",name:"stopNavigationEvents",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/navigable-container/container.tsx#NavigableContainer"]={docgenInfo:NavigableContainer.__docgenInfo,name:"NavigableContainer",path:"packages/components/src/navigable-container/container.tsx#NavigableContainer"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/navigable-container/menu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_container__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/navigable-container/container.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnforwardedNavigableMenu({role="menu",orientation="vertical",...rest},ref){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_container__WEBPACK_IMPORTED_MODULE_1__.Z,{ref,stopNavigationEvents:!0,onlyBrowserTabstops:!1,role,"aria-orientation":"presentation"===role||"vertical"!==orientation&&"horizontal"!==orientation?void 0:orientation,eventToOffset:evt=>{const{code}=evt;let next=["ArrowDown"],previous=["ArrowUp"];return"horizontal"===orientation&&(next=["ArrowRight"],previous=["ArrowLeft"]),"both"===orientation&&(next=["ArrowRight","ArrowDown"],previous=["ArrowLeft","ArrowUp"]),next.includes(code)?1:previous.includes(code)?-1:["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(code)?0:void 0},...rest})}UnforwardedNavigableMenu.displayName="UnforwardedNavigableMenu";const NavigableMenu=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(UnforwardedNavigableMenu),__WEBPACK_DEFAULT_EXPORT__=NavigableMenu;try{NavigableMenu.displayName="NavigableMenu",NavigableMenu.__docgenInfo={description:'A container for a navigable menu.\n\n ```jsx\n import {\n   NavigableMenu,\n   Button,\n } from \'@wordpress/components\';\n\n function onNavigate( index, target ) {\n   console.log( `Navigates to ${ index }`, target );\n }\n\n const MyNavigableContainer = () => (\n   <div>\n     <span>Navigable Menu:</span>\n     <NavigableMenu onNavigate={ onNavigate } orientation="horizontal">\n       <Button variant="secondary">Item 1</Button>\n       <Button variant="secondary">Item 2</Button>\n       <Button variant="secondary">Item 3</Button>\n     </NavigableMenu>\n   </div>\n );\n ```',displayName:"NavigableMenu",props:{children:{defaultValue:null,description:"The component children.",name:"children",required:!1,type:{name:"ReactNode"}},cycle:{defaultValue:{value:"true"},description:"A boolean which tells the component whether or not to cycle from the end back to the beginning and vice versa.",name:"cycle",required:!1,type:{name:"boolean"}},onKeyDown:{defaultValue:null,description:"A callback invoked on the keydown event.",name:"onKeyDown",required:!1,type:{name:"(event: KeyboardEvent) => void"}},onNavigate:{defaultValue:null,description:"A callback invoked when the menu navigates to one of its children passing the index and child as an argument",name:"onNavigate",required:!1,type:{name:"(index: number, focusable: HTMLElement) => void"}},orientation:{defaultValue:{value:"'vertical'"},description:"The orientation of the menu.",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'},{value:'"both"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/navigable-container/menu.tsx#NavigableMenu"]={docgenInfo:NavigableMenu.__docgenInfo,name:"NavigableMenu",path:"packages/components/src/navigable-container/menu.tsx#NavigableMenu"})}catch(__react_docgen_typescript_loader_error){}try{menu.displayName="menu",menu.__docgenInfo={description:'A container for a navigable menu.\n\n ```jsx\n import {\n   NavigableMenu,\n   Button,\n } from \'@wordpress/components\';\n\n function onNavigate( index, target ) {\n   console.log( `Navigates to ${ index }`, target );\n }\n\n const MyNavigableContainer = () => (\n   <div>\n     <span>Navigable Menu:</span>\n     <NavigableMenu onNavigate={ onNavigate } orientation="horizontal">\n       <Button variant="secondary">Item 1</Button>\n       <Button variant="secondary">Item 2</Button>\n       <Button variant="secondary">Item 3</Button>\n     </NavigableMenu>\n   </div>\n );\n ```',displayName:"menu",props:{children:{defaultValue:null,description:"The component children.",name:"children",required:!1,type:{name:"ReactNode"}},cycle:{defaultValue:{value:"true"},description:"A boolean which tells the component whether or not to cycle from the end back to the beginning and vice versa.",name:"cycle",required:!1,type:{name:"boolean"}},onKeyDown:{defaultValue:null,description:"A callback invoked on the keydown event.",name:"onKeyDown",required:!1,type:{name:"(event: KeyboardEvent) => void"}},onNavigate:{defaultValue:null,description:"A callback invoked when the menu navigates to one of its children passing the index and child as an argument",name:"onNavigate",required:!1,type:{name:"(index: number, focusable: HTMLElement) => void"}},orientation:{defaultValue:{value:"'vertical'"},description:"The orientation of the menu.",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'},{value:'"both"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/navigable-container/menu.tsx#menu"]={docgenInfo:menu.__docgenInfo,name:"menu",path:"packages/components/src/navigable-container/menu.tsx#menu"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/ui/context/constants.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cT:()=>COMPONENT_NAMESPACE,_3:()=>CONNECTED_NAMESPACE,rE:()=>CONNECT_STATIC_NAMESPACE});const COMPONENT_NAMESPACE="data-wp-component",CONNECTED_NAMESPACE="data-wp-c16t",CONNECT_STATIC_NAMESPACE="__contextSystemKey__"},"./packages/components/src/ui/context/context-connect.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Iq:()=>contextConnect,Kc:()=>contextConnectWithoutRef,H:()=>hasConnectNamespace});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/ui/context/constants.js"),_get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/ui/context/get-styled-class-name-from-key.ts"),process=__webpack_require__("./node_modules/process/browser.js");function contextConnect(Component,namespace){return _contextConnect(Component,namespace,{forwardsRef:!0})}function contextConnectWithoutRef(Component,namespace){return _contextConnect(Component,namespace)}function _contextConnect(Component,namespace,options){const WrappedComponent=options?.forwardsRef?(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Component):Component;void 0===namespace&&void 0!==process&&process.env;let mergedNamespace=WrappedComponent[_constants__WEBPACK_IMPORTED_MODULE_1__.rE]||[namespace];return Array.isArray(namespace)&&(mergedNamespace=[...mergedNamespace,...namespace]),"string"==typeof namespace&&(mergedNamespace=[...mergedNamespace,namespace]),Object.assign(WrappedComponent,{[_constants__WEBPACK_IMPORTED_MODULE_1__.rE]:[...new Set(mergedNamespace)],displayName:namespace,selector:`.${(0,_get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_2__.l)(namespace)}`})}function getConnectNamespace(Component){if(!Component)return[];let namespaces=[];return Component[_constants__WEBPACK_IMPORTED_MODULE_1__.rE]&&(namespaces=Component[_constants__WEBPACK_IMPORTED_MODULE_1__.rE]),Component.type&&Component.type[_constants__WEBPACK_IMPORTED_MODULE_1__.rE]&&(namespaces=Component.type[_constants__WEBPACK_IMPORTED_MODULE_1__.rE]),namespaces}function hasConnectNamespace(Component,match){return!!Component&&("string"==typeof match?getConnectNamespace(Component).includes(match):!!Array.isArray(match)&&match.some((result=>getConnectNamespace(Component).includes(result))))}},"./packages/components/src/ui/context/context-system-provider.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{eb:()=>useComponentsContext,G8:()=>ContextSystemProvider});var deepmerge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/deepmerge/dist/cjs.js"),deepmerge__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__),fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/fast-deep-equal/es6/index.js"),fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_1__),is_plain_object__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/is-plain-object/dist/is-plain-object.mjs"),_wordpress_element__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/src/utils/hooks/use-update-effect.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),process=__webpack_require__("./node_modules/process/browser.js");const ComponentsContext=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createContext)({}),useComponentsContext=()=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(ComponentsContext);const BaseContextSystemProvider=({children,value})=>{const contextValue=function useContextSystemBridge({value}){const parentContext=useComponentsContext(),valueRef=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(value);return(0,_utils__WEBPACK_IMPORTED_MODULE_4__.Z)((()=>{fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_1___default()(valueRef.current,value)&&valueRef.current!==value&&void 0!==process&&process.env}),[value]),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)((()=>deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(null!=parentContext?parentContext:{},null!=value?value:{},{isMergeableObject:is_plain_object__WEBPACK_IMPORTED_MODULE_5__.P})),[parentContext,value])}({value});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ComponentsContext.Provider,{value:contextValue,children})};BaseContextSystemProvider.displayName="BaseContextSystemProvider";const ContextSystemProvider=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.memo)(BaseContextSystemProvider);BaseContextSystemProvider.__docgenInfo={description:"A Provider component that can modify props for connected components within\nthe Context system.\n\n@example\n```jsx\n<ContextSystemProvider value={{ Button: { size: 'small' }}}>\n  <Button>...</Button>\n</ContextSystemProvider>\n```\n\n@template {Record<string, any>} T\n@param {Object}                    options\n@param {import('react').ReactNode} options.children Children to render.\n@param {T}                         options.value    Props to render into connected components.\n@return {JSX.Element} A Provider wrapped component.",methods:[],displayName:"BaseContextSystemProvider"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/ui/context/context-system-provider.js"]={name:"BaseContextSystemProvider",docgenInfo:BaseContextSystemProvider.__docgenInfo,path:"packages/components/src/ui/context/context-system-provider.js"})},"./packages/components/src/ui/context/get-styled-class-name-from-key.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>getStyledClassNameFromKey});var change_case__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/param-case/dist.es2015/index.js");const getStyledClassNameFromKey=(0,__webpack_require__("./node_modules/memize/dist/index.js").Z)((function getStyledClassName(namespace){return`components-${(0,change_case__WEBPACK_IMPORTED_MODULE_0__.o)(namespace)}`}))},"./packages/components/src/ui/context/use-context-system.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>useContextSystem});var context_system_provider=__webpack_require__("./packages/components/src/ui/context/context-system-provider.js"),constants=__webpack_require__("./packages/components/src/ui/context/constants.js");var get_styled_class_name_from_key=__webpack_require__("./packages/components/src/ui/context/get-styled-class-name-from-key.ts"),use_cx=__webpack_require__("./packages/components/src/utils/hooks/use-cx.ts"),process=__webpack_require__("./node_modules/process/browser.js");function useContextSystem(props,namespace){const contextSystemProps=(0,context_system_provider.eb)();void 0===namespace&&void 0!==process&&process.env;const contextProps=contextSystemProps?.[namespace]||{},finalComponentProps={[constants._3]:!0,...(componentName=namespace,{[constants.cT]:componentName})};var componentName;const{_overrides:overrideProps,...otherContextProps}=contextProps,initialMergedProps=Object.entries(otherContextProps).length?Object.assign({},otherContextProps,props):props,classes=(0,use_cx.I)()((0,get_styled_class_name_from_key.l)(namespace),props.className),rendered="function"==typeof initialMergedProps.renderChildren?initialMergedProps.renderChildren(initialMergedProps):initialMergedProps.children;for(const key in initialMergedProps)finalComponentProps[key]=initialMergedProps[key];for(const key in overrideProps)finalComponentProps[key]=overrideProps[key];return void 0!==rendered&&(finalComponentProps.children=rendered),finalComponentProps.className=classes,finalComponentProps}},"./packages/components/src/utils/hooks/use-update-effect.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=function useUpdateEffect(effect,deps){const mounted=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(mounted.current)return effect();mounted.current=!0}),deps)}},"./packages/components/src/view/component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const View=(0,__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js").Z)("div",{target:"e19lxcc00"})("");View.selector=".components-view",View.displayName="View";const __WEBPACK_DEFAULT_EXPORT__=View;try{View.displayName="View",View.__docgenInfo={description:"`View` is a core component that renders everything in the library.\nIt is the principle component in the entire library.",displayName:"View",props:{as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 507 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/view/component.tsx#View"]={docgenInfo:View.__docgenInfo,name:"View",path:"packages/components/src/view/component.tsx#View"})}catch(__react_docgen_typescript_loader_error){}},"./packages/icons/build-module/library/link.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"}))},"./packages/icons/build-module/library/more.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"}))},"./packages/icons/build-module/library/wordpress.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"}))},"./packages/components/src/tab-panel/stories/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,DisabledTab:()=>DisabledTab,WithTabIconsAndTooltips:()=>WithTabIconsAndTooltips,default:()=>stories});var wordpress=__webpack_require__("./packages/icons/build-module/library/wordpress.js"),library_link=__webpack_require__("./packages/icons/build-module/library/link.js"),more=__webpack_require__("./packages/icons/build-module/library/more.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/react/index.js"),use_instance_id=__webpack_require__("./packages/compose/build-module/hooks/use-instance-id/index.js"),menu=__webpack_require__("./packages/components/src/navigable-container/menu.tsx"),src_button=__webpack_require__("./packages/components/src/button/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TabButton=({tabId,children,selected,...rest})=>(0,jsx_runtime.jsx)(src_button.ZP,{role:"tab",tabIndex:selected?void 0:-1,"aria-selected":selected,id:tabId,__experimentalIsFocusable:!0,...rest,children});TabButton.displayName="TabButton";const UnforwardedTabPanel=({className,children,tabs,selectOnMove=!0,initialTabName,orientation="horizontal",activeClass="is-active",onSelect},ref)=>{var _selectedTab$name;const instanceId=(0,use_instance_id.Z)(TabPanel,"tab-panel"),[selected,setSelected]=(0,react.useState)(),handleTabSelection=(0,react.useCallback)((tabKey=>{setSelected(tabKey),onSelect?.(tabKey)}),[onSelect]),selectedTab=tabs.find((({name})=>name===selected)),selectedId=`${instanceId}-${null!==(_selectedTab$name=selectedTab?.name)&&void 0!==_selectedTab$name?_selectedTab$name:"none"}`;return(0,react.useLayoutEffect)((()=>{if(selectedTab)return;const initialTab=tabs.find((tab=>tab.name===initialTabName));if(!initialTabName||initialTab)if(initialTab&&!initialTab.disabled)handleTabSelection(initialTab.name);else{const firstEnabledTab=tabs.find((tab=>!tab.disabled));firstEnabledTab&&handleTabSelection(firstEnabledTab.name)}}),[tabs,selectedTab,initialTabName,handleTabSelection]),(0,react.useEffect)((()=>{if(!selectedTab?.disabled)return;const firstEnabledTab=tabs.find((tab=>!tab.disabled));firstEnabledTab&&handleTabSelection(firstEnabledTab.name)}),[tabs,selectedTab?.disabled,handleTabSelection]),(0,jsx_runtime.jsxs)("div",{className,ref,children:[(0,jsx_runtime.jsx)(menu.ZP,{role:"tablist",orientation,onNavigate:selectOnMove?(_childIndex,child)=>{child.click()}:void 0,className:"components-tab-panel__tabs",children:tabs.map((tab=>(0,jsx_runtime.jsx)(TabButton,{className:classnames_default()("components-tab-panel__tabs-item",tab.className,{[activeClass]:tab.name===selected}),tabId:`${instanceId}-${tab.name}`,"aria-controls":`${instanceId}-${tab.name}-view`,selected:tab.name===selected,onClick:()=>handleTabSelection(tab.name),disabled:tab.disabled,label:tab.icon&&tab.title,icon:tab.icon,showTooltip:!!tab.icon,children:!tab.icon&&tab.title},tab.name)))}),selectedTab&&(0,jsx_runtime.jsx)("div",{"aria-labelledby":selectedId,role:"tabpanel",id:`${selectedId}-view`,className:"components-tab-panel__tab-content",children:children(selectedTab)},selectedId)]})};UnforwardedTabPanel.displayName="UnforwardedTabPanel";const TabPanel=(0,react.forwardRef)(UnforwardedTabPanel),tab_panel=TabPanel;try{TabPanel.displayName="TabPanel",TabPanel.__docgenInfo={description:"",displayName:"TabPanel",props:{activeClass:{defaultValue:{value:"is-active"},description:"The class name to add to the active tab.",name:"activeClass",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"A function which renders the tabviews given the selected tab.\nThe function is passed the active tab object as an argument as defined by the tabs prop.",name:"children",required:!0,type:{name:"(tab: Tab) => ReactNode"}},className:{defaultValue:null,description:"The class name to give to the outer container for the TabPanel.",name:"className",required:!1,type:{name:"string"}},initialTabName:{defaultValue:null,description:"The name of the tab to be selected upon mounting of component.\nIf this prop is not set, the first tab will be selected by default.",name:"initialTabName",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"The function called when a tab has been selected.\nIt is passed the `tabName` as an argument.",name:"onSelect",required:!1,type:{name:"(tabName: string) => void"}},orientation:{defaultValue:{value:"horizontal"},description:"The orientation of the tablist.",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},tabs:{defaultValue:null,description:"Array of tab objects. Each tab object should contain at least a `name` and a `title`.",name:"tabs",required:!0,type:{name:"Tab[]"}},selectOnMove:{defaultValue:{value:"true"},description:"When `true`, the tab will be selected when receiving focus (automatic tab\nactivation). When `false`, the tab will be selected only when clicked\n(manual tab activation). See the official W3C docs for more info.\n.\n@see https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/",name:"selectOnMove",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/tab-panel/index.tsx#TabPanel"]={docgenInfo:TabPanel.__docgenInfo,name:"TabPanel",path:"packages/components/src/tab-panel/index.tsx#TabPanel"})}catch(__react_docgen_typescript_loader_error){}try{tabpanel.displayName="tabpanel",tabpanel.__docgenInfo={description:"",displayName:"tabpanel",props:{activeClass:{defaultValue:{value:"is-active"},description:"The class name to add to the active tab.",name:"activeClass",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"A function which renders the tabviews given the selected tab.\nThe function is passed the active tab object as an argument as defined by the tabs prop.",name:"children",required:!0,type:{name:"(tab: Tab) => ReactNode"}},className:{defaultValue:null,description:"The class name to give to the outer container for the TabPanel.",name:"className",required:!1,type:{name:"string"}},initialTabName:{defaultValue:null,description:"The name of the tab to be selected upon mounting of component.\nIf this prop is not set, the first tab will be selected by default.",name:"initialTabName",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"The function called when a tab has been selected.\nIt is passed the `tabName` as an argument.",name:"onSelect",required:!1,type:{name:"(tabName: string) => void"}},orientation:{defaultValue:{value:"horizontal"},description:"The orientation of the tablist.",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},tabs:{defaultValue:null,description:"Array of tab objects. Each tab object should contain at least a `name` and a `title`.",name:"tabs",required:!0,type:{name:"Tab[]"}},selectOnMove:{defaultValue:{value:"true"},description:"When `true`, the tab will be selected when receiving focus (automatic tab\nactivation). When `false`, the tab will be selected only when clicked\n(manual tab activation). See the official W3C docs for more info.\n.\n@see https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/",name:"selectOnMove",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/tab-panel/index.tsx#tabpanel"]={docgenInfo:tabpanel.__docgenInfo,name:"tabpanel",path:"packages/components/src/tab-panel/index.tsx#tabpanel"})}catch(__react_docgen_typescript_loader_error){}var popover=__webpack_require__("./packages/components/src/popover/index.tsx"),slot_fill=__webpack_require__("./packages/components/src/slot-fill/index.js");const stories={title:"Components/TabPanel",component:tab_panel,parameters:{sourceLink:"packages/components/src/tab-panel",actions:{argTypesRegex:"^on.*"},controls:{expanded:!0},docs:{source:{state:"open"}}}},Template=props=>(0,jsx_runtime.jsx)(tab_panel,{...props});Template.displayName="Template";const Default=Template.bind({});Default.args={children:tab=>(0,jsx_runtime.jsxs)("p",{children:["Selected tab: ",tab.title]}),tabs:[{name:"tab1",title:"Tab 1"},{name:"tab2",title:"Tab 2"}]};const DisabledTab=Template.bind({});DisabledTab.args={children:tab=>(0,jsx_runtime.jsxs)("p",{children:["Selected tab: ",tab.title]}),tabs:[{name:"tab1",title:"Tab 1",disabled:!0},{name:"tab2",title:"Tab 2"},{name:"tab3",title:"Tab 3"}]};const SlotFillTemplate=props=>(0,jsx_runtime.jsxs)(slot_fill.zt,{children:[(0,jsx_runtime.jsx)(tab_panel,{...props}),(0,jsx_runtime.jsx)(popover.ZP.Slot,{})]});SlotFillTemplate.displayName="SlotFillTemplate";const WithTabIconsAndTooltips=SlotFillTemplate.bind({});WithTabIconsAndTooltips.args={children:tab=>(0,jsx_runtime.jsxs)("p",{children:["Selected tab: ",tab.title]}),tabs:[{name:"tab1",title:"Tab 1",icon:wordpress.Z},{name:"tab2",title:"Tab 2",icon:library_link.Z},{name:"tab3",title:"Tab 3",icon:more.Z}]};try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/tab-panel/stories/index.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"packages/components/src/tab-panel/stories/index.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}}}]);