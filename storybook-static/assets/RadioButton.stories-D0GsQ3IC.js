import{R as e,r as g}from"./index-C5e9SFkp.js";const b="_wrapper_jay1v_1",y="_input_jay1v_7",R="_custom_jay1v_13",B="_label_jay1v_40",s={wrapper:b,input:y,custom:R,label:B},a=({label:t,checked:o,onChange:c,name:r,value:_})=>e.createElement("label",{className:s.wrapper},e.createElement("input",{type:"radio",className:s.input,checked:o,onChange:v=>c(v.target.value),name:r,value:_}),e.createElement("span",{className:s.custom}),e.createElement("span",{className:s.label},t)),p=({children:t,horizontal:o=!1,className:c="",...r})=>e.createElement("div",{className:c,style:{display:"flex",flexDirection:o?"row":"column",gap:"12px",...r.style},...r},t);p.__docgenInfo={description:"",methods:[],displayName:"RadioButtonGroup",props:{horizontal:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};a.__docgenInfo={description:`@typedef {Object} RadioButtonProps
@property {string} label - Label for the radio button
@property {boolean} checked - Whether the radio button is selected
@property {function} onChange - Change handler
@property {string} name - Name for the radio group
@property {string} value - Value for the radio button`,methods:[],displayName:"RadioButton"};const S={title:"Form elements/RadioButton",component:a,tags:["autodocs"]},n=()=>{const[t,o]=g.useState("option1");return e.createElement(p,{horizontal:!0},e.createElement(a,{label:"Option 1",name:"example",value:"option1",checked:t==="option1",onChange:o}),e.createElement(a,{label:"Option 2",name:"example",value:"option2",checked:t==="option2",onChange:o}))},l=()=>{const[t,o]=g.useState("option1");return e.createElement(p,null,e.createElement(a,{label:"Option 1",name:"vertical-example",value:"option1",checked:t==="option1",onChange:o}),e.createElement(a,{label:"Option 2",name:"vertical-example",value:"option2",checked:t==="option2",onChange:o}))};n.__docgenInfo={description:"",methods:[],displayName:"Default"};l.__docgenInfo={description:"",methods:[],displayName:"Vertical"};var i,d,u;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState('option1');
  return <RadioButtonGroup horizontal>
      <RadioButton label="Option 1" name="example" value="option1" checked={selected === 'option1'} onChange={setSelected} />
      <RadioButton label="Option 2" name="example" value="option2" checked={selected === 'option2'} onChange={setSelected} />
    </RadioButtonGroup>;
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,h,f;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState('option1');
  return <RadioButtonGroup>
      <RadioButton label="Option 1" name="vertical-example" value="option1" checked={selected === 'option1'} onChange={setSelected} />
      <RadioButton label="Option 2" name="vertical-example" value="option2" checked={selected === 'option2'} onChange={setSelected} />
    </RadioButtonGroup>;
}`,...(f=(h=l.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const E=["Default","Vertical"];export{n as Default,l as Vertical,E as __namedExportsOrder,S as default};
