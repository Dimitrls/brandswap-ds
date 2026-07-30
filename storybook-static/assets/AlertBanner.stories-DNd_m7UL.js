import{R as e,r as j}from"./index-C5e9SFkp.js";import{I as f}from"./Icon-CwFeAjnA.js";const a={alertBanner:"bs-alert-banner--alertBanner",alertBanner__icon:"bs-alert-banner--alertBanner__icon",alertBanner__body:"bs-alert-banner--alertBanner__body",alertBanner__title:"bs-alert-banner--alertBanner__title",alertBanner__message:"bs-alert-banner--alertBanner__message",alertBanner__actions:"bs-alert-banner--alertBanner__actions",alertBanner__button:"bs-alert-banner--alertBanner__button",alertBanner__dismiss:"bs-alert-banner--alertBanner__dismiss","alertBanner--success":"bs-alert-banner--alertBanner--success","alertBanner--info":"bs-alert-banner--alertBanner--info","alertBanner--warning":"bs-alert-banner--alertBanner--warning","alertBanner--error":"bs-alert-banner--alertBanner--error"},M={success:"check-circle",info:"info-circle",warning:"alert-octagon",error:"alert-triangle"},d=({title:n,message:c,variant:t="info",dismissible:I=!1,onDismiss:v,actionLabel:p,onAction:b,icon:z,className:L,...V})=>{const O=a[`alertBanner--${t}`]||"",U=z||M[t]||"info-circle";return e.createElement("div",{className:[a.alertBanner,O,L].filter(Boolean).join(" "),role:"alert",...V},e.createElement("span",{className:a.alertBanner__icon,"aria-hidden":"true"},e.createElement(f,{name:U,size:20})),e.createElement("div",{className:a.alertBanner__body},n?e.createElement("div",{className:a.alertBanner__title},n):null,c?e.createElement("div",{className:a.alertBanner__message},c):null),p&&b?e.createElement("div",{className:a.alertBanner__actions},e.createElement("button",{type:"button",className:a.alertBanner__button,onClick:b},p)):null,I&&v?e.createElement("button",{type:"button",onClick:v,"aria-label":"Dismiss alert",className:a.alertBanner__dismiss},e.createElement(f,{name:"close",size:16})):null)};d.__docgenInfo={description:"",methods:[],displayName:"AlertBanner",props:{title:{required:!1,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'success' | 'info' | 'warning' | 'error'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'info'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:"'info'",computed:!1}},dismissible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},actionLabel:{required:!1,tsType:{name:"string"},description:""},onAction:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"union",raw:"keyof typeof icons",elements:[{name:"literal",value:"'chevron-left'"},{name:"literal",value:"'chevron-right'"},{name:"literal",value:"'chevron-down'"},{name:"literal",value:"'chevron-up'"},{name:"literal",value:"'chevrons-left'"},{name:"literal",value:"'chevrons-right'"},{name:"literal",value:"'arrow-left'"},{name:"literal",value:"'arrow-right'"},{name:"literal",value:"'arrow-down'"},{name:"literal",value:"'arrow-up'"},{name:"literal",value:"'minimize'"},{name:"literal",value:"'maximize'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'redo'"},{name:"literal",value:"'reload'"},{name:"literal",value:"'play'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'plus'"},{name:"literal",value:"'close'"},{name:"literal",value:"'check'"},{name:"literal",value:"'forbid'"},{name:"literal",value:"'info-circle'"},{name:"literal",value:"'alert-triangle'"},{name:"literal",value:"'alert-octagon'"},{name:"literal",value:"'check-circle'"},{name:"literal",value:"'search'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'download'"},{name:"literal",value:"'file-export'"},{name:"literal",value:"'file-import'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'share'"},{name:"literal",value:"'share-ios'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'trash'"},{name:"literal",value:"'backspace'"},{name:"literal",value:"'remove'"},{name:"literal",value:"'cog'"},{name:"literal",value:"'wrench'"},{name:"literal",value:"'configurations'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'lock-off'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'mail'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'eye-off'"},{name:"literal",value:"'dots'"},{name:"literal",value:"'dots-vertical'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'home'"},{name:"literal",value:"'monitor'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendar-plus'"},{name:"literal",value:"'note'"},{name:"literal",value:"'code'"},{name:"literal",value:"'curly-braces'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'heart-handshake'"},{name:"literal",value:"'offer'"},{name:"literal",value:"'featured-offer'"},{name:"literal",value:"'brush'"},{name:"literal",value:"'design-tools'"},{name:"literal",value:"'chart-pie'"},{name:"literal",value:"'webpage'"},{name:"literal",value:"'table'"},{name:"literal",value:"'table-pencil'"},{name:"literal",value:"'web-ad'"},{name:"literal",value:"'store'"},{name:"literal",value:"'test-tube'"},{name:"literal",value:"'click'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'coffee'"},{name:"literal",value:"'map'"},{name:"literal",value:"'circle-square'"},{name:"literal",value:"'gift'"},{name:"literal",value:"'package'"},{name:"literal",value:"'package-search'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'font-family'"},{name:"literal",value:"'font-size'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'italic'"},{name:"literal",value:"'list'"},{name:"literal",value:"'list-numbers'"},{name:"literal",value:"'radius'"},{name:"literal",value:"'padding-vertical'"},{name:"literal",value:"'padding-horizontal'"},{name:"literal",value:"'width'"},{name:"literal",value:"'height'"},{name:"literal",value:"'line-solid'"},{name:"literal",value:"'money'"},{name:"literal",value:"'money-off'"},{name:"literal",value:"'money-in'"},{name:"literal",value:"'money-out'"},{name:"literal",value:"'money-hand'"},{name:"literal",value:"'coins'"},{name:"literal",value:"'paycheck-arrow'"},{name:"literal",value:"'transaction'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'shopping-cart'"},{name:"literal",value:"'basket'"},{name:"literal",value:"'basket-arrows'"},{name:"literal",value:"'user'"},{name:"literal",value:"'users'"},{name:"literal",value:"'admin'"},{name:"literal",value:"'suspend'"},{name:"literal",value:"'ranking'"}]},description:""}},composes:["Omit"]};const $={title:"Info Elements/AlertBanner",component:d,tags:["autodocs"],args:{title:"Announcement",message:"This is an important announcement that requires your attention.",variant:"info",dismissible:!0},argTypes:{onDismiss:{action:"dismissed"},onAction:{action:"action clicked"}}},l=n=>{const[c,t]=j.useState(!1);return c?e.createElement("div",null,"Alert dismissed. ",e.createElement("button",{onClick:()=>t(!1)},"Reset")):e.createElement("div",{style:{maxWidth:"800px",width:"100%"}},e.createElement(d,{...n,onDismiss:n.dismissible?()=>t(!0):n.onDismiss}))},r=l.bind({});r.args={variant:"success",title:"Success!",message:"Your changes have been saved successfully.",dismissible:!1};const s=l.bind({});s.args={variant:"info",title:"New feature available",message:"We just launched a new feature that might interest you. Check it out!",actionLabel:"Learn more"};const i=l.bind({});i.args={variant:"warning",title:"Scheduled maintenance",message:"System maintenance is scheduled for tonight at 2 AM. Some features may be unavailable.",actionLabel:"View details"};const m=l.bind({});m.args={variant:"error",title:"Connection error",message:"Unable to connect to the server. Please check your internet connection and try again.",dismissible:!1,actionLabel:"Retry"};const o=l.bind({});o.args={title:void 0,message:"This alert banner only has a message without a title.",variant:"info"};const u=l.bind({});u.args={variant:"info",title:"Update available",message:"A new version of the app is available with important security updates.",actionLabel:"Update now",dismissible:!0};var g,h,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  return <div style={{
    maxWidth: '800px',
    width: '100%'
  }}>
      <AlertBanner {...args} onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss} />
    </div>;
}`,...(y=(h=r.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var _,B,w;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  return <div style={{
    maxWidth: '800px',
    width: '100%'
  }}>
      <AlertBanner {...args} onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss} />
    </div>;
}`,...(w=(B=s.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var D,k,A;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  return <div style={{
    maxWidth: '800px',
    width: '100%'
  }}>
      <AlertBanner {...args} onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss} />
    </div>;
}`,...(A=(k=i.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var x,E,S;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  return <div style={{
    maxWidth: '800px',
    width: '100%'
  }}>
      <AlertBanner {...args} onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss} />
    </div>;
}`,...(S=(E=m.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var T,W,C;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  return <div style={{
    maxWidth: '800px',
    width: '100%'
  }}>
      <AlertBanner {...args} onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss} />
    </div>;
}`,...(C=(W=o.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var N,R,q;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  return <div style={{
    maxWidth: '800px',
    width: '100%'
  }}>
      <AlertBanner {...args} onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss} />
    </div>;
}`,...(q=(R=u.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};const F=["Success","Info","Warning","Error","WithoutTitle","WithAction"];export{m as Error,s as Info,r as Success,i as Warning,u as WithAction,o as WithoutTitle,F as __namedExportsOrder,$ as default};
