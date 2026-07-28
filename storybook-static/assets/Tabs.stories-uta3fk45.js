import{r as h,R as e}from"./index-C5e9SFkp.js";import{T as l}from"./Tabs-YPWmsCOa.js";import{I as r}from"./Icon-Ceknk8gb.js";import"./index-Cv3U8xn7.js";const f={title:"Navigation/Tabs",component:l,tags:["autodocs"]},a=()=>{const[t,n]=h.useState("home"),s=[{label:"Home",value:"home",icon:e.createElement(r,{name:"home"})},{label:"Search",value:"search",icon:e.createElement(r,{name:"search"})},{label:"Profile",value:"profile",icon:e.createElement(r,{name:"user"})}];return e.createElement(l,{options:s,value:t,onChange:n})},o=()=>{const[t,n]=h.useState("tab1"),s=[{label:"Tab 1",value:"tab1"},{label:"Tab 2",value:"tab2"},{label:"Tab 3",value:"tab3"}];return e.createElement(l,{options:s,value:t,onChange:n})};a.__docgenInfo={description:"",methods:[],displayName:"WithIcons"};o.__docgenInfo={description:"",methods:[],displayName:"WithoutIcons"};var c,u,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('home');
  const options = [{
    label: 'Home',
    value: 'home',
    icon: <Icon name="home" />
  }, {
    label: 'Search',
    value: 'search',
    icon: <Icon name="search" />
  }, {
    label: 'Profile',
    value: 'profile',
    icon: <Icon name="user" />
  }];
  return <Tabs options={options} value={value} onChange={setValue} />;
}`,...(i=(u=a.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var m,b,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('tab1');
  const options = [{
    label: 'Tab 1',
    value: 'tab1'
  }, {
    label: 'Tab 2',
    value: 'tab2'
  }, {
    label: 'Tab 3',
    value: 'tab3'
  }];
  return <Tabs options={options} value={value} onChange={setValue} />;
}`,...(p=(b=o.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};const g=["WithIcons","WithoutIcons"];export{a as WithIcons,o as WithoutIcons,g as __namedExportsOrder,f as default};
