"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[1515],{"./packages/components/src/notice/stories/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NoticeListSubcomponent:()=>NoticeListSubcomponent,WithActions:()=>WithActions,WithCustomSpokenMessage:()=>WithCustomSpokenMessage,WithJSXChildren:()=>WithJSXChildren,default:()=>stories});var react=__webpack_require__("./node_modules/react/index.js"),src_notice=__webpack_require__("./packages/components/src/notice/index.tsx"),src_button=__webpack_require__("./packages/components/src/button/index.tsx"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const noop=()=>{};function NoticeList({notices,onRemove=noop,className,children}){return className=classnames_default()("components-notice-list",className),(0,jsx_runtime.jsxs)("div",{className,children:[children,[...notices].reverse().map((notice=>{const{content,...restNotice}=notice;return(0,react.createElement)(src_notice.Z,{...restNotice,key:notice.id,onRemove:(id=notice.id,()=>onRemove(id))},notice.content);var id}))]})}NoticeList.displayName="NoticeList";const list=NoticeList;try{NoticeList.displayName="NoticeList",NoticeList.__docgenInfo={description:"`NoticeList` is a component used to render a collection of notices.\n\n```jsx\nimport { Notice, NoticeList } from `@wordpress/components`;\n\nconst MyNoticeList = () => {\nconst [ notices, setNotices ] = useState( [\n\t{\n\t\tid: 'second-notice',\n\t\tcontent: 'second notice content',\n\t},\n\t{\n\t\tid: 'fist-notice',\n\t\tcontent: 'first notice content',\n\t},\n] );\n\nconst removeNotice = ( id ) => {\n\tsetNotices( notices.filter( ( notice ) => notice.id !== id ) );\n};\n\nreturn <NoticeList notices={ notices } onRemove={ removeNotice } />;\n};\n```",displayName:"NoticeList",props:{notices:{defaultValue:null,description:"Array of notices to render.",name:"notices",required:!0,type:{name:'(Omit<NoticeProps, "children"> & { id: string; content: string; })[]'}},onRemove:{defaultValue:{value:"() => {}"},description:"Function called when a notice should be removed / dismissed.",name:"onRemove",required:!1,type:{name:"(id: string) => void"}},children:{defaultValue:null,description:"Children to be rendered inside the notice list.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/notice/list.tsx#NoticeList"]={docgenInfo:NoticeList.__docgenInfo,name:"NoticeList",path:"packages/components/src/notice/list.tsx#NoticeList"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Components/Notice",component:src_notice.Z,subcomponents:{NoticeList:list},parameters:{sourceLink:"packages/components/src/notice",actions:{argTypesRegex:"^on.*"},controls:{expanded:!0},docs:{source:{state:"open"}}}},Template=props=>(0,jsx_runtime.jsx)(src_notice.Z,{...props});Template.displayName="Template";const Default=Template.bind({});Default.args={children:"This is a notice."};const WithCustomSpokenMessage=Template.bind({});WithCustomSpokenMessage.args={...Default.args,politeness:"assertive",spokenMessage:"This is a notice with a custom spoken message"};const WithJSXChildren=Template.bind({});WithJSXChildren.args={...Default.args,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("p",{children:["JSX elements can be helpful",(0,jsx_runtime.jsx)("strong",{children:" if you need to format"})," the notice output."]}),(0,jsx_runtime.jsx)("code",{children:"note: in the interest of consistency, this should not be overused!"})]})};const WithActions=Template.bind({});WithActions.args={...Default.args,actions:[{label:"Click me!",onClick:()=>{},variant:"primary"},{label:"Or click me instead!",onClick:()=>{}},{label:"Or visit a link for more info",url:"https://wordpress.org",variant:"link"}]};const NoticeListSubcomponent=()=>{const exampleNotices=[{id:"second-notice",content:"second notice content"},{id:"first-notice",content:"first notice content"}],[notices,setNotices]=(0,react.useState)(exampleNotices);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(list,{notices,onRemove:id=>{setNotices(notices.filter((notice=>notice.id!==id)))}}),(0,jsx_runtime.jsx)(src_button.ZP,{variant:"primary",onClick:()=>{setNotices(exampleNotices)},children:"Reset Notices"})]})};NoticeListSubcomponent.storyName="NoticeList Subcomponent";try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/notice/stories/index.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"packages/components/src/notice/stories/index.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}}}]);