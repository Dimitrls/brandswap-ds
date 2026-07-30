import{r as p,R as m}from"./index-C5e9SFkp.js";import{P as n}from"./Pagination-DjC8Uxzo.js";import"./Icon-CwFeAjnA.js";const _={title:"Navigation/Pagination",component:n,tags:["autodocs"]},e=()=>{const[t,s]=p.useState(1);return m.createElement(n,{totalPages:5,currentPage:t,onChange:s})},a=()=>{const[t,s]=p.useState(1);return m.createElement(n,{totalPages:15,currentPage:t,onChange:s})};e.__docgenInfo={description:"",methods:[],displayName:"FewPages"};a.__docgenInfo={description:"",methods:[],displayName:"ManyPages"};var o,r,g;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <Pagination totalPages={5} currentPage={page} onChange={setPage} />;
}`,...(g=(r=e.parameters)==null?void 0:r.docs)==null?void 0:g.source}}};var c,i,P;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <Pagination totalPages={15} currentPage={page} onChange={setPage} />;
}`,...(P=(i=a.parameters)==null?void 0:i.docs)==null?void 0:P.source}}};const h=["FewPages","ManyPages"];export{e as FewPages,a as ManyPages,h as __namedExportsOrder,_ as default};
