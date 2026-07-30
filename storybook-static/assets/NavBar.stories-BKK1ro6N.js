import{R as e,r as p}from"./index-C5e9SFkp.js";import{I as t}from"./Icon-CwFeAjnA.js";import{L as S}from"./Logo-5MeAx3Nj.js";const w="_navBar_b24gb_1",A="_navBar__header_b24gb_22",z="_navBar__logo_b24gb_38",L="_navBar__toggle_b24gb_64",k="_navBar__items_b24gb_90",q="_navBar__item_b24gb_90",R="_navBar__icon_b24gb_134",D="_navBar__label_b24gb_143",j="_navBar__badge_b24gb_154",M="_navBar__footer_b24gb_202",a={navBar:w,"navBar--expanded":"_navBar--expanded_b24gb_14","navBar--collapsed":"_navBar--collapsed_b24gb_18",navBar__header:A,navBar__logo:z,navBar__toggle:L,navBar__items:k,navBar__item:q,"navBar__item--active":"_navBar__item--active_b24gb_129",navBar__icon:R,navBar__label:D,navBar__badge:j,navBar__footer:M},m=({items:s,activeItem:r,onItemClick:i,className:_,logo:g,collapsed:l=!1,onToggleCollapse:u,...C})=>e.createElement("nav",{className:[a.navBar,l?a["navBar--collapsed"]:a["navBar--expanded"],_].filter(Boolean).join(" "),...C},e.createElement("div",{className:a.navBar__header},g?e.createElement("div",{className:a.navBar__logo},g):e.createElement("div",{className:a.navBar__logo},e.createElement(S,{variant:l?"icon":"default",color:"primary"}))),e.createElement("div",{className:a.navBar__items},s.map((n,T)=>e.createElement("button",{key:n.id||T,className:[a.navBar__item,r===n.id?a["navBar__item--active"]:""].filter(Boolean).join(" "),onClick:()=>i==null?void 0:i(n.id),title:l?n.label:void 0,type:"button"},n.icon&&e.createElement("span",{className:a.navBar__icon},n.icon),!l&&e.createElement("span",{className:a.navBar__label},n.label),n.badge&&e.createElement("span",{className:a.navBar__badge},n.badge)))),e.createElement("div",{className:a.navBar__footer},u&&e.createElement("button",{className:a.navBar__toggle,onClick:u,"aria-label":l?"Expand sidebar":"Collapse sidebar",type:"button"},e.createElement(t,{name:l?"chevrons-right":"chevrons-left",size:16}))));m.__docgenInfo={description:"",methods:[],displayName:"NavBar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavBarItem"}],raw:"NavBarItem[]"},description:""},activeItem:{required:!1,tsType:{name:"string"},description:""},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},logo:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},collapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onToggleCollapse:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const V={title:"Advanced components/NavBar",component:m,tags:["autodocs"]},v=[{id:"dashboard",label:"Dashboard",icon:e.createElement(t,{name:"chart-pie",size:20})},{id:"campaigns",label:"Campaigns",icon:e.createElement(t,{name:"megaphone",size:20})},{id:"users",label:"Users",icon:e.createElement(t,{name:"users",size:20})},{id:"offers",label:"Offers",icon:e.createElement(t,{name:"offer",size:20})},{id:"customizations",label:"Customizations",icon:e.createElement(t,{name:"brush",size:20})},{id:"payments",label:"Payments",icon:e.createElement(t,{name:"wallet",size:20})},{id:"partners",label:"Partners",icon:e.createElement(t,{name:"heart-handshake",size:20})},{id:"settings",label:"Settings",icon:e.createElement(t,{name:"configurations",size:20})},{id:"superAdmin",label:"Super Admin",icon:e.createElement(t,{name:"admin",size:20})}],o=()=>{const[s,r]=p.useState("home"),[i,_]=p.useState(!1);return e.createElement("div",{style:{marginLeft:i?"64px":"256px",padding:"20px",transition:"margin-left 0.3s ease"}},e.createElement(m,{items:v,activeItem:s,onItemClick:r,collapsed:i,onToggleCollapse:()=>_(!i)}),e.createElement("div",null,e.createElement("h1",null,"Main Content Area"),e.createElement("p",null,"This is where your main content would go. The sidebar is fixed on the left.")))},c=()=>{const[s,r]=p.useState("dashboard");return e.createElement("div",{style:{marginLeft:"256px",padding:"20px"}},e.createElement(m,{items:v,activeItem:s,onItemClick:r,collapsed:!1,onToggleCollapse:()=>{}}),e.createElement("div",null,e.createElement("h1",null,"Expanded Sidebar"),e.createElement("p",null,"The sidebar is always expanded in this example.")))},d=()=>{const[s,r]=p.useState("analytics");return e.createElement("div",{style:{marginLeft:"64px",padding:"20px"}},e.createElement(m,{items:v,activeItem:s,onItemClick:r,collapsed:!0,onToggleCollapse:()=>{}}),e.createElement("div",null,e.createElement("h1",null,"Collapsed Sidebar"),e.createElement("p",null,"The sidebar is always collapsed in this example, showing only icons.")))};o.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"Expanded"};d.__docgenInfo={description:"",methods:[],displayName:"Collapsed"};var b,B,f;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [activeItem, setActiveItem] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  return <div style={{
    marginLeft: collapsed ? '64px' : '256px',
    padding: '20px',
    transition: 'margin-left 0.3s ease'
  }}>
      <NavBar items={navItems} activeItem={activeItem} onItemClick={setActiveItem} collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
      <div>
        <h1>Main Content Area</h1>
        <p>This is where your main content would go. The sidebar is fixed on the left.</p>
      </div>
    </div>;
}`,...(f=(B=o.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var h,E,y;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [activeItem, setActiveItem] = useState('dashboard');
  return <div style={{
    marginLeft: '256px',
    padding: '20px'
  }}>
      <NavBar items={navItems} activeItem={activeItem} onItemClick={setActiveItem} collapsed={false} onToggleCollapse={() => {}} />
      <div>
        <h1>Expanded Sidebar</h1>
        <p>The sidebar is always expanded in this example.</p>
      </div>
    </div>;
}`,...(y=(E=c.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};var I,x,N;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [activeItem, setActiveItem] = useState('analytics');
  return <div style={{
    marginLeft: '64px',
    padding: '20px'
  }}>
      <NavBar items={navItems} activeItem={activeItem} onItemClick={setActiveItem} collapsed={true} onToggleCollapse={() => {}} />
      <div>
        <h1>Collapsed Sidebar</h1>
        <p>The sidebar is always collapsed in this example, showing only icons.</p>
      </div>
    </div>;
}`,...(N=(x=d.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};const F=["Default","Expanded","Collapsed"];export{d as Collapsed,o as Default,c as Expanded,F as __namedExportsOrder,V as default};
