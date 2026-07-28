import{R as t,r as s}from"./index-C5e9SFkp.js";import{P as e}from"./index-Cv3U8xn7.js";import{I as F}from"./InputField-Do69hcJH.js";import{B as V}from"./Button-BG-4nCXg.js";import{S as v}from"./Selectbox-C84GCyxE.js";import{M as w}from"./MultiSelectbox-Bj8w3H-s.js";import"./Icon-Ceknk8gb.js";import"./Selectbox.module-UWgCY90z.js";import"./Checkbox-B4Z7kouj.js";import"./Tag-BWaS_yOb.js";const z="_filtersBar_1pwrq_1",M="_filtersBar__searchbox_1pwrq_12",j="_filtersBar__filters_1pwrq_16",G="_filtersBar__button_1pwrq_22",H="_filtersBarWithLabels_1pwrq_41",h={filtersBar:z,filtersBar__searchbox:M,filtersBar__filters:j,filtersBar__button:G,filtersBarWithLabels:H},i=({children:u,filters:c,className:r,searchbox:p=!1,searchValue:l,onSearchChange:d,searchPlaceholder:o="Search...",onApply:n,applyLabel:m="Apply",labels:a=!0,...I})=>{const W=(L,C)=>{const{type:O,value:J,..._}=L;if(O==="multiselectbox"){const{selected:A,size:S,label:g,...P}=_;return t.createElement("div",{"data-filter-with-label":a&&g?"true":void 0},t.createElement(w,{key:C,selected:A||[],...a&&g?{label:g,labelInside:!0}:{},...P,size:a?"large":"medium"}))}else{const{size:A,label:S,...g}=_;return t.createElement("div",{"data-filter-with-label":a&&S?"true":void 0},t.createElement(v,{key:C,...a&&S?{label:S,labelInside:!0}:{},...g,size:a?"large":"medium"}))}};return t.createElement("div",{className:[h.filtersBar,a&&h.filtersBarWithLabels,r].filter(Boolean).join(" "),"data-labels-enabled":a?"true":void 0,...I},p&&t.createElement("div",{className:h.filtersBar__searchbox},t.createElement(F,{type:"text",placeholder:o,value:l,onChange:d,size:a?"large":"medium",icon:!0,iconName:"search",style:{width:"200px"}})),t.createElement("div",{className:h.filtersBar__filters},c?c.map(W):u),n&&t.createElement("div",{className:h.filtersBar__button},t.createElement(V,{variant:"outline",size:a?"large":"medium",label:m,onClick:n})))};i.propTypes={children:e.node,filters:e.arrayOf(e.shape({type:e.oneOf(["selectbox","multiselectbox"]),label:e.string,options:e.arrayOf(e.string).isRequired,value:e.oneOfType([e.string,e.arrayOf(e.string)]),onChange:e.func,placeholder:e.string,size:e.oneOf(["small","medium","large"]),selected:e.arrayOf(e.string)})),className:e.string,searchbox:e.bool,searchValue:e.string,onSearchChange:e.func,searchPlaceholder:e.string,onApply:e.func,applyLabel:e.string,labels:e.bool};i.__docgenInfo={description:"",methods:[],displayName:"FiltersBar",props:{searchbox:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},searchPlaceholder:{defaultValue:{value:"'Search...'",computed:!1},description:"",type:{name:"string"},required:!1},applyLabel:{defaultValue:{value:"'Apply'",computed:!1},description:"",type:{name:"string"},required:!1},labels:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},children:{description:"",type:{name:"node"},required:!1},filters:{description:"",type:{name:"arrayOf",value:{name:"shape",value:{type:{name:"enum",value:[{value:"'selectbox'",computed:!1},{value:"'multiselectbox'",computed:!1}],required:!1},label:{name:"string",required:!1},options:{name:"arrayOf",value:{name:"string"},required:!0},value:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"string"}}],required:!1},onChange:{name:"func",required:!1},placeholder:{name:"string",required:!1},size:{name:"enum",value:[{value:"'small'",computed:!1},{value:"'medium'",computed:!1},{value:"'large'",computed:!1}],required:!1},selected:{name:"arrayOf",value:{name:"string"},required:!1}}}},required:!1},className:{description:"",type:{name:"string"},required:!1},searchValue:{description:"",type:{name:"string"},required:!1},onSearchChange:{description:"",type:{name:"func"},required:!1},onApply:{description:"",type:{name:"func"},required:!1}}};const se={title:"Advanced components/FiltersBar",component:i,tags:["autodocs"]},f=()=>{const[u,c]=s.useState(""),[r,p]=s.useState("All Status"),[l,d]=s.useState([]),[o,n]=s.useState("All Dates"),m=[{type:"selectbox",options:["All Status","Active","Inactive"],value:r,onChange:p,icon:!0,iconName:"check"},{type:"multiselectbox",options:["Category 1","Category 2","Category 3","Category 4"],selected:l,onChange:d,placeholder:"Select categories...",icon:!0,iconName:"coffee"},{type:"selectbox",options:["All Dates","Today","This Week","This Month"],value:o,onChange:n,icon:!0,iconName:"calendar"}];return t.createElement(i,{labels:!1,searchbox:!0,searchValue:u,onSearchChange:a=>c(a.target.value),searchPlaceholder:"Search...",filters:m,onApply:()=>console.log("Apply clicked",{status:r,categories:l,dateRange:o}),applyLabel:"Apply"})},y=()=>t.createElement(i,{labels:!1,onApply:()=>console.log("Apply clicked")},t.createElement(v,{options:["All Status","Active","Inactive"],icon:!0,iconName:"check"}),t.createElement(v,{options:["All Categories","Category 1","Category 2"],icon:!0,iconName:"coffee"})),b=()=>{const[u,c]=s.useState(""),[r,p]=s.useState("All Status"),[l,d]=s.useState([]),[o,n]=s.useState("All Dates"),m=[{type:"selectbox",label:"Status",options:["All Status","Active","Inactive"],value:r,onChange:p,icon:!0,iconName:"check"},{type:"multiselectbox",label:"Categories",options:["Category 1","Category 2","Category 3","Category 4"],selected:l,onChange:d,placeholder:"Select categories...",icon:!0,iconName:"coffee"},{type:"selectbox",label:"Date Range",options:["All Dates","Today","This Week","This Month"],value:o,onChange:n,icon:!0,iconName:"calendar"}];return t.createElement(i,{labels:!0,searchbox:!0,searchValue:u,onSearchChange:a=>c(a.target.value),searchPlaceholder:"Search...",filters:m,onApply:()=>console.log("Apply clicked",{status:r,categories:l,dateRange:o}),applyLabel:"Apply"})};f.__docgenInfo={description:"",methods:[],displayName:"Default"};y.__docgenInfo={description:"",methods:[],displayName:"WithoutSearchbox"};b.__docgenInfo={description:"",methods:[],displayName:"WithLabels"};var x,B,N;f.parameters={...f.parameters,docs:{...(x=f.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState('All Dates');
  const filters = [{
    type: 'selectbox',
    options: ['All Status', 'Active', 'Inactive'],
    value: status,
    onChange: setStatus,
    icon: true,
    iconName: 'check'
  }, {
    type: 'multiselectbox',
    options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    selected: categories,
    onChange: setCategories,
    placeholder: 'Select categories...',
    icon: true,
    iconName: 'coffee'
  }, {
    type: 'selectbox',
    options: ['All Dates', 'Today', 'This Week', 'This Month'],
    value: dateRange,
    onChange: setDateRange,
    icon: true,
    iconName: 'calendar'
  }];
  return <FiltersBar labels={false} searchbox={true} searchValue={search} onSearchChange={e => setSearch(e.target.value)} searchPlaceholder="Search..." filters={filters} onApply={() => console.log('Apply clicked', {
    status,
    categories,
    dateRange
  })} applyLabel="Apply" />;
}`,...(N=(B=f.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var q,k,D;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  return <FiltersBar labels={false} onApply={() => console.log('Apply clicked')}>
      <Selectbox options={['All Status', 'Active', 'Inactive']} icon={true} iconName="check" />
      <Selectbox options={['All Categories', 'Category 1', 'Category 2']} icon={true} iconName="coffee" />
    </FiltersBar>;
}`,...(D=(k=y.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var R,E,T;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState('All Dates');
  const filters = [{
    type: 'selectbox',
    label: 'Status',
    options: ['All Status', 'Active', 'Inactive'],
    value: status,
    onChange: setStatus,
    icon: true,
    iconName: 'check'
  }, {
    type: 'multiselectbox',
    label: 'Categories',
    options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    selected: categories,
    onChange: setCategories,
    placeholder: 'Select categories...',
    icon: true,
    iconName: 'coffee'
  }, {
    type: 'selectbox',
    label: 'Date Range',
    options: ['All Dates', 'Today', 'This Week', 'This Month'],
    value: dateRange,
    onChange: setDateRange,
    icon: true,
    iconName: 'calendar'
  }];
  return <FiltersBar labels={true} searchbox={true} searchValue={search} onSearchChange={e => setSearch(e.target.value)} searchPlaceholder="Search..." filters={filters} onApply={() => console.log('Apply clicked', {
    status,
    categories,
    dateRange
  })} applyLabel="Apply" />;
}`,...(T=(E=b.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};const re=["Default","WithoutSearchbox","WithLabels"];export{f as Default,b as WithLabels,y as WithoutSearchbox,re as __namedExportsOrder,se as default};
