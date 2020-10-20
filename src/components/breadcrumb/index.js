import React, {useState, useMemo} from 'react';
import {Breadcrumb} from 'antd';
import {history} from 'umi';

export default () => {
  // console.log('breadprops', history);
  const breadcrumbNameMap = {
    '/admin/source': '数据源查询',
    '/admin/api': '接口查询',
  };
  const {
    location: {pathname},
  } = history;

  const pathSnippets = useMemo(() => pathname.split('/').filter(v => v), [
    pathname,
  ]);
  const itemsCre = () => {
    return pathSnippets.map((v, i) => {
      let url = `/${pathSnippets.slice(0, i + 1).join('/')}`;
      return (
        <Breadcrumb.Item
          onClick={() => history.push(url)}
          key={url}
          style={{cursor: 'pointer'}}
        >
          {breadcrumbNameMap[url]}
        </Breadcrumb.Item>
      );
    });
  };

  return <Breadcrumb>{itemsCre()}</Breadcrumb>;
};
