import{r as P,R as m}from"./index-C5e9SFkp.js";import{P as o}from"./Pagination-C6P2AsAU.js";import"./Icon-Ceknk8gb.js";import"./index-Cv3U8xn7.js";const h={title:"Navigation/Pagination",component:o,tags:["autodocs"]},e=()=>{const[t,s]=P.useState(1);return m.createElement(o,{totalPages:5,currentPage:t,onChange:s})},a=()=>{const[t,s]=P.useState(1);return m.createElement(o,{totalPages:15,currentPage:t,onChange:s})};e.__docgenInfo={description:"",methods:[],displayName:"FewPages"};a.__docgenInfo={description:"",methods:[],displayName:"ManyPages"};var r,n,g;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <Pagination totalPages={5} currentPage={page} onChange={setPage} />;
}`,...(g=(n=e.parameters)==null?void 0:n.docs)==null?void 0:g.source}}};var c,i,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <Pagination totalPages={15} currentPage={page} onChange={setPage} />;
}`,...(p=(i=a.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const S=["FewPages","ManyPages"];export{e as FewPages,a as ManyPages,S as __namedExportsOrder,h as default};
