import{R as e,r as _}from"./index-C5e9SFkp.js";import{P as n}from"./index-Cv3U8xn7.js";import{I as t}from"./Icon-Ceknk8gb.js";import{L as q}from"./Logo-D8nzNtCT.js";const A="_navBar_b24gb_1",z="_navBar__header_b24gb_22",k="_navBar__logo_b24gb_38",w="_navBar__toggle_b24gb_64",L="_navBar__items_b24gb_90",R="_navBar__item_b24gb_90",D="_navBar__icon_b24gb_134",O="_navBar__label_b24gb_143",P="_navBar__badge_b24gb_154",j="_navBar__footer_b24gb_202",a={navBar:A,"navBar--expanded":"_navBar--expanded_b24gb_14","navBar--collapsed":"_navBar--collapsed_b24gb_18",navBar__header:z,navBar__logo:k,navBar__toggle:w,navBar__items:L,navBar__item:R,"navBar__item--active":"_navBar__item--active_b24gb_129",navBar__icon:D,navBar__label:O,navBar__badge:P,navBar__footer:j},c=({items:r,activeItem:i,onItemClick:l,className:v,logo:u,collapsed:o=!1,onToggleCollapse:b,...S})=>e.createElement("nav",{className:[a.navBar,o?a["navBar--collapsed"]:a["navBar--expanded"],v].filter(Boolean).join(" "),...S},e.createElement("div",{className:a.navBar__header},u?e.createElement("div",{className:a.navBar__logo},u):e.createElement("div",{className:a.navBar__logo},e.createElement(q,{variant:o?"icon":"default",color:"primary"}))),e.createElement("div",{className:a.navBar__items},r.map((s,T)=>e.createElement("button",{key:s.id||T,className:[a.navBar__item,i===s.id?a["navBar__item--active"]:""].filter(Boolean).join(" "),onClick:()=>l&&l(s.id),title:o?s.label:void 0,type:"button"},s.icon&&e.createElement("span",{className:a.navBar__icon},s.icon),!o&&e.createElement("span",{className:a.navBar__label},s.label),s.badge&&e.createElement("span",{className:a.navBar__badge},s.badge)))),e.createElement("div",{className:a.navBar__footer},b&&e.createElement("button",{className:a.navBar__toggle,onClick:b,"aria-label":o?"Expand sidebar":"Collapse sidebar",type:"button"},e.createElement(t,{name:o?"chevrons-right":"chevrons-left",size:16}))));c.propTypes={items:n.arrayOf(n.shape({id:n.string.isRequired,label:n.string.isRequired,icon:n.node,badge:n.node})).isRequired,activeItem:n.string,onItemClick:n.func,className:n.string,logo:n.node,collapsed:n.bool,onToggleCollapse:n.func};c.__docgenInfo={description:"",methods:[],displayName:"NavBar",props:{collapsed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},items:{description:"",type:{name:"arrayOf",value:{name:"shape",value:{id:{name:"string",required:!0},label:{name:"string",required:!0},icon:{name:"node",required:!1},badge:{name:"node",required:!1}}}},required:!0},activeItem:{description:"",type:{name:"string"},required:!1},onItemClick:{description:"",type:{name:"func"},required:!1},className:{description:"",type:{name:"string"},required:!1},logo:{description:"",type:{name:"node"},required:!1},onToggleCollapse:{description:"",type:{name:"func"},required:!1}}};const G={title:"Advanced components/NavBar",component:c,tags:["autodocs"]},g=[{id:"dashboard",label:"Dashboard",icon:e.createElement(t,{name:"chart-pie",size:20})},{id:"campaigns",label:"Campaigns",icon:e.createElement(t,{name:"megaphone",size:20})},{id:"users",label:"Users",icon:e.createElement(t,{name:"users",size:20})},{id:"offers",label:"Offers",icon:e.createElement(t,{name:"offer",size:20})},{id:"customizations",label:"Customizations",icon:e.createElement(t,{name:"brush",size:20})},{id:"payments",label:"Payments",icon:e.createElement(t,{name:"wallet",size:20})},{id:"partners",label:"Partners",icon:e.createElement(t,{name:"heart-handshake",size:20})},{id:"settings",label:"Settings",icon:e.createElement(t,{name:"configurations",size:20})},{id:"superAdmin",label:"Super Admin",icon:e.createElement(t,{name:"admin",size:20})}],d=()=>{const[r,i]=_.useState("home"),[l,v]=_.useState(!1);return e.createElement("div",{style:{marginLeft:l?"64px":"256px",padding:"20px",transition:"margin-left 0.3s ease"}},e.createElement(c,{items:g,activeItem:r,onItemClick:i,collapsed:l,onToggleCollapse:()=>v(!l)}),e.createElement("div",null,e.createElement("h1",null,"Main Content Area"),e.createElement("p",null,"This is where your main content would go. The sidebar is fixed on the left.")))},m=()=>{const[r,i]=_.useState("dashboard");return e.createElement("div",{style:{marginLeft:"256px",padding:"20px"}},e.createElement(c,{items:g,activeItem:r,onItemClick:i,collapsed:!1,onToggleCollapse:()=>{}}),e.createElement("div",null,e.createElement("h1",null,"Expanded Sidebar"),e.createElement("p",null,"The sidebar is always expanded in this example.")))},p=()=>{const[r,i]=_.useState("analytics");return e.createElement("div",{style:{marginLeft:"64px",padding:"20px"}},e.createElement(c,{items:g,activeItem:r,onItemClick:i,collapsed:!0,onToggleCollapse:()=>{}}),e.createElement("div",null,e.createElement("h1",null,"Collapsed Sidebar"),e.createElement("p",null,"The sidebar is always collapsed in this example, showing only icons.")))};d.__docgenInfo={description:"",methods:[],displayName:"Default"};m.__docgenInfo={description:"",methods:[],displayName:"Expanded"};p.__docgenInfo={description:"",methods:[],displayName:"Collapsed"};var f,B,h;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
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
}`,...(h=(B=d.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};var E,I,y;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
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
}`,...(y=(I=m.parameters)==null?void 0:I.docs)==null?void 0:y.source}}};var x,C,N;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
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
}`,...(N=(C=p.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};const H=["Default","Expanded","Collapsed"];export{p as Collapsed,d as Default,m as Expanded,H as __namedExportsOrder,G as default};
