import{R as e,r as a}from"./index-C5e9SFkp.js";import{I as M}from"./InputField-bUraAG8j.js";import{B as V}from"./Button-DJqcGpnH.js";import{S as C}from"./Selectbox-C7FEA7ON.js";import{M as P}from"./MultiSelectbox-DoRavF1K.js";import"./Icon-CwFeAjnA.js";/* empty css                    */import"./Selectbox.module-UWgCY90z.js";import"./Checkbox-BN_RgShq.js";import"./Tag-DiBXsDFN.js";const z="_filtersBar_1pwrq_1",H="_filtersBar__searchbox_1pwrq_12",j="_filtersBar__filters_1pwrq_16",O="_filtersBar__button_1pwrq_22",G="_filtersBarWithLabels_1pwrq_41",d={filtersBar:z,filtersBar__searchbox:H,filtersBar__filters:j,filtersBar__button:O,filtersBarWithLabels:G},y=({children:n,filters:l,className:s,searchbox:i=!1,searchValue:r,onSearchChange:u,searchPlaceholder:o="Search...",onApply:c,applyLabel:p="Apply",labels:t=!0,...D})=>{const I=(f,_)=>{if(f.type==="multiselectbox"){const{type:Q,selected:L,label:b,onChange:W,...w}=f;return e.createElement("div",{key:_,"data-filter-with-label":t&&b?"true":void 0},e.createElement(P,{selected:L||[],onChange:W??(()=>{}),...t&&b?{label:b,labelInside:!0}:{},...w,size:t?"large":"medium"}))}const{type:J,value:K,label:S,onChange:q,...F}=f;return e.createElement("div",{key:_,"data-filter-with-label":t&&S?"true":void 0},e.createElement(C,{onChange:q,...t&&S?{label:S,labelInside:!0}:{},...F,size:t?"large":"medium"}))};return e.createElement("div",{className:[d.filtersBar,t&&d.filtersBarWithLabels,s].filter(Boolean).join(" "),"data-labels-enabled":t?"true":void 0,...D},i&&e.createElement("div",{className:d.filtersBar__searchbox},e.createElement(M,{type:"text",placeholder:o,value:r,onChange:u??(()=>{}),size:t?"large":"medium",icon:!0,iconName:"search",style:{width:"200px"}})),e.createElement("div",{className:d.filtersBar__filters},l?l.map(I):n),c&&e.createElement("div",{className:d.filtersBar__button},e.createElement(V,{variant:"outline",size:t?"large":"medium",label:p,onClick:c})))};y.__docgenInfo={description:"",methods:[],displayName:"FiltersBar",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},filters:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SelectboxFilter | MultiSelectboxFilter",elements:[{name:"SelectboxFilter"},{name:"MultiSelectboxFilter"}]}],raw:"FilterItem[]"},description:""},className:{required:!1,tsType:{name:"string"},description:""},searchbox:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},searchValue:{required:!1,tsType:{name:"string"},description:""},onSearchChange:{required:!1,tsType:{name:"ReactChangeEventHandler",raw:"React.ChangeEventHandler<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},description:""},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Search...'",computed:!1}},onApply:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},applyLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Apply'",computed:!1}},labels:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const oe={title:"Advanced components/FiltersBar",component:y,tags:["autodocs"]},h=()=>{const[n,l]=a.useState(""),[s,i]=a.useState("All Status"),[r,u]=a.useState([]),[o,c]=a.useState("All Dates"),p=[{type:"selectbox",options:["All Status","Active","Inactive"],value:s,onChange:i,icon:!0,iconName:"check"},{type:"multiselectbox",options:["Category 1","Category 2","Category 3","Category 4"],selected:r,onChange:u,placeholder:"Select categories...",icon:!0,iconName:"coffee"},{type:"selectbox",options:["All Dates","Today","This Week","This Month"],value:o,onChange:c,icon:!0,iconName:"calendar"}];return e.createElement(y,{labels:!1,searchbox:!0,searchValue:n,onSearchChange:t=>l(t.target.value),searchPlaceholder:"Search...",filters:p,onApply:()=>console.log("Apply clicked",{status:s,categories:r,dateRange:o}),applyLabel:"Apply"})},m=()=>e.createElement(y,{labels:!1,onApply:()=>console.log("Apply clicked")},e.createElement(C,{options:["All Status","Active","Inactive"],icon:!0,iconName:"check"}),e.createElement(C,{options:["All Categories","Category 1","Category 2"],icon:!0,iconName:"coffee"})),g=()=>{const[n,l]=a.useState(""),[s,i]=a.useState("All Status"),[r,u]=a.useState([]),[o,c]=a.useState("All Dates"),p=[{type:"selectbox",label:"Status",options:["All Status","Active","Inactive"],value:s,onChange:i,icon:!0,iconName:"check"},{type:"multiselectbox",label:"Categories",options:["Category 1","Category 2","Category 3","Category 4"],selected:r,onChange:u,placeholder:"Select categories...",icon:!0,iconName:"coffee"},{type:"selectbox",label:"Date Range",options:["All Dates","Today","This Week","This Month"],value:o,onChange:c,icon:!0,iconName:"calendar"}];return e.createElement(y,{labels:!0,searchbox:!0,searchValue:n,onSearchChange:t=>l(t.target.value),searchPlaceholder:"Search...",filters:p,onApply:()=>console.log("Apply clicked",{status:s,categories:r,dateRange:o}),applyLabel:"Apply"})};h.__docgenInfo={description:"",methods:[],displayName:"Default"};m.__docgenInfo={description:"",methods:[],displayName:"WithoutSearchbox"};g.__docgenInfo={description:"",methods:[],displayName:"WithLabels"};var v,A,x;h.parameters={...h.parameters,docs:{...(v=h.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
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
}`,...(x=(A=h.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var B,N,R;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  return <FiltersBar labels={false} onApply={() => console.log('Apply clicked')}>
      <Selectbox options={['All Status', 'Active', 'Inactive']} icon={true} iconName="check" />
      <Selectbox options={['All Categories', 'Category 1', 'Category 2']} icon={true} iconName="coffee" />
    </FiltersBar>;
}`,...(R=(N=m.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var T,E,k;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
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
}`,...(k=(E=g.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};const le=["Default","WithoutSearchbox","WithLabels"];export{h as Default,g as WithLabels,m as WithoutSearchbox,le as __namedExportsOrder,oe as default};
