import{R as e,r as p}from"./index-C5e9SFkp.js";import{I as n}from"./Icon-CwFeAjnA.js";import{L as S}from"./Logo-5MeAx3Nj.js";const a={navBar:"bs-nav-bar--navBar","navBar--expanded":"bs-nav-bar--navBar--expanded","navBar--collapsed":"bs-nav-bar--navBar--collapsed",navBar__header:"bs-nav-bar--navBar__header",navBar__logo:"bs-nav-bar--navBar__logo",navBar__toggle:"bs-nav-bar--navBar__toggle",navBar__items:"bs-nav-bar--navBar__items",navBar__item:"bs-nav-bar--navBar__item","navBar__item--active":"bs-nav-bar--navBar__item--active",navBar__icon:"bs-nav-bar--navBar__icon",navBar__label:"bs-nav-bar--navBar__label",navBar__badge:"bs-nav-bar--navBar__badge",navBar__footer:"bs-nav-bar--navBar__footer"},m=({items:s,activeItem:r,onItemClick:i,className:v,logo:_,collapsed:l=!1,onToggleCollapse:g,...C})=>e.createElement("nav",{className:[a.navBar,l?a["navBar--collapsed"]:a["navBar--expanded"],v].filter(Boolean).join(" "),...C},e.createElement("div",{className:a.navBar__header},_?e.createElement("div",{className:a.navBar__logo},_):e.createElement("div",{className:a.navBar__logo},e.createElement(S,{variant:l?"icon":"default",color:"primary"}))),e.createElement("div",{className:a.navBar__items},s.map((t,T)=>e.createElement("button",{key:t.id||T,className:[a.navBar__item,r===t.id?a["navBar__item--active"]:""].filter(Boolean).join(" "),onClick:()=>i==null?void 0:i(t.id),title:l?t.label:void 0,type:"button"},t.icon&&e.createElement("span",{className:a.navBar__icon},t.icon),!l&&e.createElement("span",{className:a.navBar__label},t.label),t.badge&&e.createElement("span",{className:a.navBar__badge},t.badge)))),e.createElement("div",{className:a.navBar__footer},g&&e.createElement("button",{className:a.navBar__toggle,onClick:g,"aria-label":l?"Expand sidebar":"Collapse sidebar",type:"button"},e.createElement(n,{name:l?"chevrons-right":"chevrons-left",size:16}))));m.__docgenInfo={description:"",methods:[],displayName:"NavBar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavBarItem"}],raw:"NavBarItem[]"},description:""},activeItem:{required:!1,tsType:{name:"string"},description:""},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},logo:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},collapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onToggleCollapse:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const L={title:"Advanced components/NavBar",component:m,tags:["autodocs"]},u=[{id:"dashboard",label:"Dashboard",icon:e.createElement(n,{name:"chart-pie",size:20})},{id:"campaigns",label:"Campaigns",icon:e.createElement(n,{name:"megaphone",size:20})},{id:"users",label:"Users",icon:e.createElement(n,{name:"users",size:20})},{id:"offers",label:"Offers",icon:e.createElement(n,{name:"offer",size:20})},{id:"customizations",label:"Customizations",icon:e.createElement(n,{name:"brush",size:20})},{id:"payments",label:"Payments",icon:e.createElement(n,{name:"wallet",size:20})},{id:"partners",label:"Partners",icon:e.createElement(n,{name:"heart-handshake",size:20})},{id:"settings",label:"Settings",icon:e.createElement(n,{name:"configurations",size:20})},{id:"superAdmin",label:"Super Admin",icon:e.createElement(n,{name:"admin",size:20})}],o=()=>{const[s,r]=p.useState("home"),[i,v]=p.useState(!1);return e.createElement("div",{style:{marginLeft:i?"64px":"256px",padding:"20px",transition:"margin-left 0.3s ease"}},e.createElement(m,{items:u,activeItem:s,onItemClick:r,collapsed:i,onToggleCollapse:()=>v(!i)}),e.createElement("div",null,e.createElement("h1",null,"Main Content Area"),e.createElement("p",null,"This is where your main content would go. The sidebar is fixed on the left.")))},c=()=>{const[s,r]=p.useState("dashboard");return e.createElement("div",{style:{marginLeft:"256px",padding:"20px"}},e.createElement(m,{items:u,activeItem:s,onItemClick:r,collapsed:!1,onToggleCollapse:()=>{}}),e.createElement("div",null,e.createElement("h1",null,"Expanded Sidebar"),e.createElement("p",null,"The sidebar is always expanded in this example.")))},d=()=>{const[s,r]=p.useState("analytics");return e.createElement("div",{style:{marginLeft:"64px",padding:"20px"}},e.createElement(m,{items:u,activeItem:s,onItemClick:r,collapsed:!0,onToggleCollapse:()=>{}}),e.createElement("div",null,e.createElement("h1",null,"Collapsed Sidebar"),e.createElement("p",null,"The sidebar is always collapsed in this example, showing only icons.")))};o.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"Expanded"};d.__docgenInfo={description:"",methods:[],displayName:"Collapsed"};var b,f,B;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
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
}`,...(B=(f=o.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var h,E,y;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
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
}`,...(N=(x=d.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};const k=["Default","Expanded","Collapsed"];export{d as Collapsed,o as Default,c as Expanded,k as __namedExportsOrder,L as default};
