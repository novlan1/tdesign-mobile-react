import React, { useState } from 'react';
import { List, Cell } from 'tdesign-mobile-react';

import './style/index.less';

// 模拟异步请求
async function getData(throwError?) {
  return new Promise<number[]>((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        reject(new Error('error'));
      }
      resolve(Array.from({ length: 10 }, (_, i) => i));
    }, 2000);
  });
}

export default function Base() {
  const [list, setList] = useState<Array<number>>([]);
  const [finished, setFinished] = useState<boolean>(false);

  const onLoad = async () => {
    const data = await getData();
    setList((v) => [...v, ...data]);
    if (list.length >= 30) {
      setFinished(true);
    }
  };

  return (
    <div className="demo-content">
      <List finished={finished} onLoad={onLoad}>
        {list.map((_, i) => (
          <Cell key={i} title={i + 1} />
        ))}
      </List>
    </div>
  );
}
