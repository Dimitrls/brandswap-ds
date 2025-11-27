import React, { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export const FewPages = () => {
  const [page, setPage] = useState(1);
  return <Pagination totalPages={5} currentPage={page} onChange={setPage} />;
};

export const ManyPages = () => {
  const [page, setPage] = useState(1);
  return <Pagination totalPages={15} currentPage={page} onChange={setPage} />;
};

