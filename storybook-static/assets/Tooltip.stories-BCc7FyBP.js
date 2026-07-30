import{r,R as a}from"./index-C5e9SFkp.js";import{B as L}from"./Button-DJqcGpnH.js";/* empty css                    */import"./Icon-CwFeAjnA.js";const p={tooltip:"bs-tooltip--tooltip",tooltip__bubble:"bs-tooltip--tooltip__bubble","tooltip--top":"bs-tooltip--tooltip--top","tooltip--bottom":"bs-tooltip--tooltip--bottom","tooltip--left":"bs-tooltip--tooltip--left","tooltip--right":"bs-tooltip--tooltip--right"},c=({content:n,placement:S="top",delay:m=100,children:H,...q})=>{const[I,d]=r.useState(!1),[l,x]=r.useState(null),u=r.useCallback(()=>{const A=window.setTimeout(()=>d(!0),m);x(A)},[m]),b=r.useCallback(()=>{l!==null&&window.clearTimeout(l),d(!1)},[l]);return a.createElement("span",{className:[p.tooltip,p[`tooltip--${S}`]].join(" "),onMouseEnter:u,onMouseLeave:b,onFocus:u,onBlur:b,...q},H,a.createElement("span",{className:p.tooltip__bubble,"data-visible":I},n))};c.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'top'",computed:!1}},delay:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["Omit"]};const O={title:"Info Elements/Tooltip",component:c,tags:["autodocs"],args:{content:"Use this action to archive the record.",placement:"top"}},i=n=>a.createElement("div",{style:{padding:48}},a.createElement(c,{...n},a.createElement(L,{label:"Hover me",variant:"outline"}))),s=i.bind({}),t=i.bind({});t.args={placement:"bottom",content:"Appears below the trigger"};const e=i.bind({});e.args={placement:"left",content:"Appears to the left"};const o=i.bind({});o.args={placement:"right",content:"Appears to the right"};var g,v,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(f=(v=s.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var T,h,R;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(R=(h=t.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};var y,_,w;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(w=(_=e.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var B,E,N;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(N=(E=o.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};const j=["Top","Bottom","Left","Right"];export{t as Bottom,e as Left,o as Right,s as Top,j as __namedExportsOrder,O as default};
