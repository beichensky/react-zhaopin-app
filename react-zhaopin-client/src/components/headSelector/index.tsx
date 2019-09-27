/*
 * filename: HeaderSelector
 * overview: 选择用户头像的UI组件
 */

import React, { FC, useState } from 'react';
import { List, Grid } from 'antd-mobile';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';

interface Header {
   text: string;
   icon: string;
}

const HeaderSelector: FC<{ setHeader: (hader: string) => void }> = ({ setHeader }) => {
   const headerList: Header[] = [];

   for (let i = 0; i < 20; i++) {
       headerList.push({
            text: '头像'+(i+1),
            //  这里必须使用 require 动态引入
            icon: require(`assets/images/头像${i+1}.png`)
        })
   }

   const [icon, setIcon] = useState<string>('');

   const handleClick = (dataItem: DataItem | undefined, itemIndex: number) => {
       const { icon: clickIcon, text } = dataItem!;
       // 更新当前组件状态
       setIcon(clickIcon);
       // 调用函数更新父组件状态
       setHeader(text);
   };

   const listHeader = !icon ? '请选择头像' : (
       <div>
         <span style={{ verticalAlign: 'middle' }}>选择头像:</span>
         <img alt="头像" src={icon} style={{ verticalAlign: 'middle' }}/>
       </div>
   )

   return (
       <List renderHeader={() => listHeader}>
         <Grid
           data={ headerList }
           columnNum={5}
           onClick={ handleClick }/>
       </List>
   )
};

export default HeaderSelector;
