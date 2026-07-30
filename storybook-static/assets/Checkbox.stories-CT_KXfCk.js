import{r as l,R as i}from"./index-C5e9SFkp.js";import{C as r}from"./Checkbox-Cw7Sm_Vu.js";const k={title:"Form elements/Checkbox",component:r,tags:["autodocs"]},e=()=>{const[c,o]=l.useState(!1);return i.createElement(r,{label:"Accept terms and conditions",checked:c,onChange:o})},t=()=>{const[c,o]=l.useState(!1);return i.createElement(r,{label:"I agree to the privacy policy",checked:c,onChange:o,inForm:!0})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"InForm"};var s,a,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="Accept terms and conditions" checked={checked} onChange={setChecked} />;
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var d,m,h;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="I agree to the privacy policy" checked={checked} onChange={setChecked} inForm />;
}`,...(h=(m=t.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};const C=["Default","InForm"];export{e as Default,t as InForm,C as __namedExportsOrder,k as default};
