import{r,R as a}from"./index-C5e9SFkp.js";import{P as n}from"./index-Cv3U8xn7.js";import{B as V}from"./Button-BG-4nCXg.js";import"./Icon-Ceknk8gb.js";const k="_tooltip_6ccov_1",C="_tooltip__bubble_6ccov_6",c={tooltip:k,tooltip__bubble:C,"tooltip--top":"_tooltip--top_6ccov_28","tooltip--bottom":"_tooltip--bottom_6ccov_38","tooltip--left":"_tooltip--left_6ccov_48","tooltip--right":"_tooltip--right_6ccov_59"},i=({content:p,placement:H="top",delay:d=100,children:I,...x})=>{const[A,m]=r.useState(!1),[u,L]=r.useState(null),v=r.useCallback(()=>{const N=window.setTimeout(()=>m(!0),d);L(N)},[d]),b=r.useCallback(()=>{window.clearTimeout(u),m(!1)},[u]);return a.createElement("span",{className:[c.tooltip,c[`tooltip--${H}`]].join(" "),onMouseEnter:v,onMouseLeave:b,onFocus:v,onBlur:b,...x},I,a.createElement("span",{className:c.tooltip__bubble,"data-visible":A},p))};i.propTypes={content:n.node.isRequired,placement:n.oneOf(["top","bottom","left","right"]),delay:n.number,children:n.node.isRequired};i.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{placement:{defaultValue:{value:"'top'",computed:!1},description:"",type:{name:"enum",value:[{value:"'top'",computed:!1},{value:"'bottom'",computed:!1},{value:"'left'",computed:!1},{value:"'right'",computed:!1}]},required:!1},delay:{defaultValue:{value:"100",computed:!1},description:"",type:{name:"number"},required:!1},content:{description:"",type:{name:"node"},required:!0},children:{description:"",type:{name:"node"},required:!0}}};const F={title:"Info Elements/Tooltip",component:i,tags:["autodocs"],args:{content:"Use this action to archive the record.",placement:"top"}},l=p=>a.createElement("div",{style:{padding:48}},a.createElement(i,{...p},a.createElement(V,{label:"Hover me",variant:"outline"}))),s=l.bind({}),e=l.bind({});e.args={placement:"bottom",content:"Appears below the trigger"};const t=l.bind({});t.args={placement:"left",content:"Appears to the left"};const o=l.bind({});o.args={placement:"right",content:"Appears to the right"};var g,_,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(f=(_=s.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var T,h,y;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(y=(h=e.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var B,E,q;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(q=(E=t.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var w,R,S;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`args => <div style={{
  padding: 48
}}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>`,...(S=(R=o.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};const U=["Top","Bottom","Left","Right"];export{e as Bottom,t as Left,o as Right,s as Top,U as __namedExportsOrder,F as default};
