import{R as r,r as d}from"./index-C5e9SFkp.js";const y="_switchNonBinary_15tji_1",_="_tab_15tji_12",N="_selected_15tji_26",o={switchNonBinary:y,tab:_,selected:N},c=({options:e,value:t,onChange:m})=>r.createElement("div",{className:o.switchNonBinary},e.map(s=>r.createElement("button",{key:s,type:"button",className:t===s?`${o.tab} ${o.selected}`:o.tab,onClick:()=>m(s)},s)));c.__docgenInfo={description:`@typedef {Object} SwitchNonBinaryProps
@property {string[]} options - The labels for each state/tab
@property {string} value - The currently selected value
@property {function} onChange - Callback when selection changes`,methods:[],displayName:"SwitchNonBinary"};const w={title:"Form elements/SwitchNonBinary",component:c,tags:["autodocs"]},a=()=>{const[e,t]=d.useState("State 1");return r.createElement(c,{options:["State 1","State 2"],value:e,onChange:t})},n=()=>{const[e,t]=d.useState("State 1");return r.createElement(c,{options:["State 1","State 2","State 3"],value:e,onChange:t})};a.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"WithThreeStates"};var i,l,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('State 1');
  return <SwitchNonBinary options={['State 1', 'State 2']} value={value} onChange={setValue} />;
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var p,h,S;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('State 1');
  return <SwitchNonBinary options={['State 1', 'State 2', 'State 3']} value={value} onChange={setValue} />;
}`,...(S=(h=n.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};const b=["Default","WithThreeStates"];export{a as Default,n as WithThreeStates,b as __namedExportsOrder,w as default};
