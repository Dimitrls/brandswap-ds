import{R as a}from"./index-C5e9SFkp.js";const c="_wrapper_ad3mu_1",s="_input_ad3mu_7",l="_custom_ad3mu_13",m="_label_ad3mu_37",u="_wrapperInForm_ad3mu_41",e={wrapper:c,input:s,custom:l,label:m,wrapperInForm:u},h=({label:r,checked:t,onChange:o,inForm:n=!1})=>a.createElement("label",{className:n?e.wrapperInForm:e.wrapper},a.createElement("input",{type:"checkbox",className:e.input,checked:t,onChange:p=>o(p.target.checked)}),a.createElement("span",{className:e.custom}),a.createElement("span",{className:e.label},r));h.__docgenInfo={description:`@typedef {Object} CheckboxProps
@property {string} label - Label for the checkbox
@property {boolean} checked - Whether the checkbox is checked
@property {function} onChange - Change handler
@property {boolean} [inForm] - If true, use in-form wrapper styles`,methods:[],displayName:"Checkbox",props:{inForm:{defaultValue:{value:"false",computed:!1},required:!1}}};export{h as C};
