import{r as i,R as e}from"./index-C5e9SFkp.js";import{T as c}from"./TabsSecondary-309o6XxP.js";import{I as r}from"./Icon-Ceknk8gb.js";import"./index-Cv3U8xn7.js";const E={title:"Navigation/TabsSecondary",component:c,tags:["autodocs"]},t=()=>{const[a,o]=i.useState("settings"),n=[{label:"Settings",value:"settings",icon:e.createElement(r,{name:"cog"})},{label:"Profile",value:"profile",icon:e.createElement(r,{name:"user"})},{label:"Admin",value:"admin",icon:e.createElement(r,{name:"admin"})}];return e.createElement(c,{options:n,value:a,onChange:o})},s=()=>{const[a,o]=i.useState("tab1"),n=[{label:"Tab 1",value:"tab1"},{label:"Tab 2",value:"tab2"},{label:"Tab 3",value:"tab3"}];return e.createElement(c,{options:n,value:a,onChange:o})},l=()=>{const[a,o]=i.useState("desktop"),n=[{label:"",value:"desktop",icon:e.createElement(r,{name:"monitor"})},{label:"",value:"mobile",icon:e.createElement(r,{name:"phone"})}];return e.createElement(c,{options:n,value:a,onChange:o})};t.__docgenInfo={description:"",methods:[],displayName:"WithIcons"};s.__docgenInfo={description:"",methods:[],displayName:"WithoutIcons"};l.__docgenInfo={description:"",methods:[],displayName:"OnlyIcons"};var u,m,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('settings');
  const options = [{
    label: 'Settings',
    value: 'settings',
    icon: <Icon name="cog" />
  }, {
    label: 'Profile',
    value: 'profile',
    icon: <Icon name="user" />
  }, {
    label: 'Admin',
    value: 'admin',
    icon: <Icon name="admin" />
  }];
  return <TabsSecondary options={options} value={value} onChange={setValue} />;
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var d,b,v;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
  return <TabsSecondary options={options} value={value} onChange={setValue} />;
}`,...(v=(b=s.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var g,I,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('desktop');
  const options = [{
    label: '',
    value: 'desktop',
    icon: <Icon name="monitor" />
  }, {
    label: '',
    value: 'mobile',
    icon: <Icon name="phone" />
  }];
  return <TabsSecondary options={options} value={value} onChange={setValue} />;
}`,...(h=(I=l.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};const V=["WithIcons","WithoutIcons","OnlyIcons"];export{l as OnlyIcons,t as WithIcons,s as WithoutIcons,V as __namedExportsOrder,E as default};
