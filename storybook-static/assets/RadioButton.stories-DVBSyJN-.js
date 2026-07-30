import{r as u,R as e}from"./index-C5e9SFkp.js";import{R as l,a as m}from"./RadioButton-DM2Hq58a.js";const S={title:"Form elements/RadioButton",component:l,tags:["autodocs"]},a=()=>{const[t,o]=u.useState("option1");return e.createElement(m,{horizontal:!0},e.createElement(l,{label:"Option 1",name:"example",value:"option1",checked:t==="option1",onChange:o}),e.createElement(l,{label:"Option 2",name:"example",value:"option2",checked:t==="option2",onChange:o}))},n=()=>{const[t,o]=u.useState("option1");return e.createElement(m,null,e.createElement(l,{label:"Option 1",name:"vertical-example",value:"option1",checked:t==="option1",onChange:o}),e.createElement(l,{label:"Option 2",name:"vertical-example",value:"option2",checked:t==="option2",onChange:o}))};a.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"Vertical"};var c,r,s;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState('option1');
  return <RadioButtonGroup horizontal>
      <RadioButton label="Option 1" name="example" value="option1" checked={selected === 'option1'} onChange={setSelected} />
      <RadioButton label="Option 2" name="example" value="option2" checked={selected === 'option2'} onChange={setSelected} />
    </RadioButtonGroup>;
}`,...(s=(r=a.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var i,p,d;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState('option1');
  return <RadioButtonGroup>
      <RadioButton label="Option 1" name="vertical-example" value="option1" checked={selected === 'option1'} onChange={setSelected} />
      <RadioButton label="Option 2" name="vertical-example" value="option2" checked={selected === 'option2'} onChange={setSelected} />
    </RadioButtonGroup>;
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const g=["Default","Vertical"];export{a as Default,n as Vertical,g as __namedExportsOrder,S as default};
