import{R as e}from"./index-C5e9SFkp.js";const g="_body_s40op_1",y="_bodyLarge_s40op_7",m="_bodySmall_s40op_13",c="_bodyLight_s40op_19",h="_bodyLargeLight_s40op_25",x="_bodySmallLight_s40op_31",a={body:g,bodyLarge:y,bodySmall:m,bodyLight:c,bodyLargeLight:h,bodySmallLight:x},L={default:a.body,large:a.bodyLarge,small:a.bodySmall,light:a.bodyLight,largeLight:a.bodyLargeLight,smallLight:a.bodySmallLight},t=({variant:i="default",children:n,...s})=>e.createElement("p",{className:L[i],...s},n);t.__docgenInfo={description:"",methods:[],displayName:"BodyText",props:{variant:{required:!1,tsType:{name:"union",raw:`| 'default'
| 'large'
| 'small'
| 'light'
| 'largeLight'
| 'smallLight'`,elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'large'"},{name:"literal",value:"'small'"},{name:"literal",value:"'light'"},{name:"literal",value:"'largeLight'"},{name:"literal",value:"'smallLight'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const u={title:"Typography/BodyText",component:t,tags:["autodocs"]},l=()=>e.createElement("div",null,e.createElement(t,null,"Body text (default)"),e.createElement(t,{variant:"large"},"Body text large"),e.createElement(t,{variant:"small"},"Body text small"),e.createElement(t,{variant:"light"},"Body text light"),e.createElement(t,{variant:"largeLight"},"Body text large light"),e.createElement(t,{variant:"smallLight"},"Body text small light"));l.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var o,d,r;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:`() => <div>
    <BodyText>Body text (default)</BodyText>
    <BodyText variant="large">Body text large</BodyText>
    <BodyText variant="small">Body text small</BodyText>
    <BodyText variant="light">Body text light</BodyText>
    <BodyText variant="largeLight">Body text large light</BodyText>
    <BodyText variant="smallLight">Body text small light</BodyText>
  </div>`,...(r=(d=l.parameters)==null?void 0:d.docs)==null?void 0:r.source}}};const B=["AllVariants"];export{l as AllVariants,B as __namedExportsOrder,u as default};
