import{r,R as a}from"./index-C5e9SFkp.js";import{B as L}from"./Button-DJqcGpnH.js";/* empty css                    */import"./Icon-CwFeAjnA.js";const V="_tooltip_6ccov_1",k="_tooltip__bubble_6ccov_6",c={tooltip:V,tooltip__bubble:k,"tooltip--top":"_tooltip--top_6ccov_28","tooltip--bottom":"_tooltip--bottom_6ccov_38","tooltip--left":"_tooltip--left_6ccov_48","tooltip--right":"_tooltip--right_6ccov_59"},p=({content:i,placement:S="top",delay:m=100,children:H,...q})=>{const[I,d]=r.useState(!1),[l,x]=r.useState(null),u=r.useCallback(()=>{const A=window.setTimeout(()=>d(!0),m);x(A)},[m]),v=r.useCallback(()=>{l!==null&&window.clearTimeout(l),d(!1)},[l]);return a.createElement("span",{className:[c.tooltip,c[`tooltip--${S}`]].join(" "),onMouseEnter:u,onMouseLeave:v,onFocus:u,onBlur:v,...q},H,a.createElement("span",{className:c.tooltip__bubble,"data-visible":I},i))};p.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'top'",computed:!1}},delay:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["Omit"]};const F={title:"Info Elements/Tooltip",component:p,tags:["autodocs"],args:{content:"Use this action to archive the record.",placement:"top"}},n=i=>a.createElement("div",{style:{padding:48}},a.createElement(p,{...i},a.createElement(L,{label:"Hover me",variant:"outline"}))),s=n.bind({}),t=n.bind({});t.args={placement:"bottom",content:"Appears below the trigger"};const e=n.bind({});e.args={placement:"left",content:"Appears to the left"};const o=n.bind({});o.args={placement:"right",content:"Appears to the right"};var b,g,_;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(_=(g=s.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};var f,T,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(h=(T=t.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var R,y,w;e.parameters={...e.parameters,docs:{...(R=e.parameters)==null?void 0:R.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(w=(y=e.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var B,E,N;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(N=(E=o.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};const U=["Top","Bottom","Left","Right"];export{t as Bottom,e as Left,o as Right,s as Top,U as __namedExportsOrder,F as default};
