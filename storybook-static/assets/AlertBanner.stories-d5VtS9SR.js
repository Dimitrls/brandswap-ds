import{R as e,r as z}from"./index-C5e9SFkp.js";import{P as s}from"./index-Cv3U8xn7.js";import{I as b}from"./Icon-Ceknk8gb.js";const M="_alertBanner_od8kb_1",Y="_alertBanner__icon_od8kb_16",$="_alertBanner__body_od8kb_31",F="_alertBanner__title_od8kb_39",G="_alertBanner__message_od8kb_45",H="_alertBanner__actions_od8kb_51",J="_alertBanner__button_od8kb_60",K="_alertBanner__dismiss_od8kb_77",n={alertBanner:M,alertBanner__icon:Y,alertBanner__body:$,alertBanner__title:F,alertBanner__message:G,alertBanner__actions:H,alertBanner__button:J,alertBanner__dismiss:K,"alertBanner--success":"_alertBanner--success_od8kb_103","alertBanner--info":"_alertBanner--info_od8kb_112","alertBanner--warning":"_alertBanner--warning_od8kb_121","alertBanner--error":"_alertBanner--error_od8kb_130"},Q={success:"check-circle",info:"info-circle",warning:"alert-octagon",error:"alert-triangle"},_=({title:t,message:u,variant:i="info",dismissible:L=!1,onDismiss:p,actionLabel:g,onAction:f,icon:V,className:O,...P})=>{const U=n[`alertBanner--${i}`]||"",j=V||Q[i]||"info-circle";return e.createElement("div",{className:[n.alertBanner,U,O].filter(Boolean).join(" "),role:"alert",...P},e.createElement("span",{className:n.alertBanner__icon,"aria-hidden":"true"},e.createElement(b,{name:j,size:20})),e.createElement("div",{className:n.alertBanner__body},t?e.createElement("div",{className:n.alertBanner__title},t):null,u?e.createElement("div",{className:n.alertBanner__message},u):null),g&&f?e.createElement("div",{className:n.alertBanner__actions},e.createElement("button",{type:"button",className:n.alertBanner__button,onClick:f},g)):null,L&&p?e.createElement("button",{type:"button",onClick:p,"aria-label":"Dismiss alert",className:n.alertBanner__dismiss},e.createElement(b,{name:"close",size:16})):null)};_.propTypes={title:s.string,message:s.string.isRequired,variant:s.oneOf(["success","info","warning","error"]),dismissible:s.bool,onDismiss:s.func,actionLabel:s.string,onAction:s.func,icon:s.string,className:s.string};_.__docgenInfo={description:"",methods:[],displayName:"AlertBanner",props:{variant:{defaultValue:{value:"'info'",computed:!1},description:"",type:{name:"enum",value:[{value:"'success'",computed:!1},{value:"'info'",computed:!1},{value:"'warning'",computed:!1},{value:"'error'",computed:!1}]},required:!1},dismissible:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},title:{description:"",type:{name:"string"},required:!1},message:{description:"",type:{name:"string"},required:!0},onDismiss:{description:"",type:{name:"func"},required:!1},actionLabel:{description:"",type:{name:"string"},required:!1},onAction:{description:"",type:{name:"func"},required:!1},icon:{description:"",type:{name:"string"},required:!1},className:{description:"",type:{name:"string"},required:!1}}};const se={title:"Info Elements/AlertBanner",component:_,tags:["autodocs"],args:{title:"Announcement",message:"This is an important announcement that requires your attention.",variant:"info",dismissible:!0},argTypes:{onDismiss:{action:"dismissed"},onAction:{action:"action clicked"}}},a=t=>{const[u,i]=z.useState(!1);return u?e.createElement("div",null,"Alert dismissed. ",e.createElement("button",{onClick:()=>i(!1)},"Reset")):e.createElement("div",{style:{maxWidth:"800px",width:"100%"}},e.createElement(_,{...t,onDismiss:t.dismissible?()=>i(!0):t.onDismiss}))},r=a.bind({});r.args={variant:"success",title:"Success!",message:"Your changes have been saved successfully.",dismissible:!1};const o=a.bind({});o.args={variant:"info",title:"New feature available",message:"We just launched a new feature that might interest you. Check it out!",actionLabel:"Learn more"};const l=a.bind({});l.args={variant:"warning",title:"Scheduled maintenance",message:"System maintenance is scheduled for tonight at 2 AM. Some features may be unavailable.",actionLabel:"View details"};const d=a.bind({});d.args={variant:"error",title:"Connection error",message:"Unable to connect to the server. Please check your internet connection and try again.",dismissible:!1,actionLabel:"Retry"};const c=a.bind({});c.args={title:void 0,message:"This alert banner only has a message without a title.",variant:"info"};const m=a.bind({});m.args={variant:"info",title:"Update available",message:"A new version of the app is available with important security updates.",actionLabel:"Update now",dismissible:!0};var v,B,h;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
}`,...(h=(B=r.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};var y,D,A;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
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
}`,...(A=(D=o.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var k,w,E;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
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
}`,...(E=(w=l.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var S,x,N;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
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
}`,...(N=(x=d.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var W,C,R;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`args => {
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
}`,...(R=(C=c.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var q,T,I;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
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
}`,...(I=(T=m.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};const ne=["Success","Info","Warning","Error","WithoutTitle","WithAction"];export{d as Error,o as Info,r as Success,l as Warning,m as WithAction,c as WithoutTitle,ne as __namedExportsOrder,se as default};
