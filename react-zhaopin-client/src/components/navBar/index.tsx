/*
 * filename: NavBar
 * overview: 自定义 NavBar
 */
import React, { FC, CSSProperties } from 'react';
import { NavBar as AntdNavBar } from 'antd-mobile';

const style: CSSProperties = {
    height: 50,
    wordSpacing: '8px',
    fontSize: '18px',
    lineHeight: '50px',
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    zIndex: 10
}

const NavBar: FC<any> = (props: any) => {
    const { children, ...restProps } = props;
    return (
        <AntdNavBar style={ style } { ...restProps }>{props.children}</AntdNavBar>
    )
}

export default NavBar;
