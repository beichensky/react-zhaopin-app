/*
 * filename：LoadAndRefresh
 * overview：具备上拉加载、下拉刷新功能的公共组件
 */

import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { ActivityIndicator, Result, ListView, PullToRefresh } from 'antd-mobile';
import styles from './index.module.less';
import LoadAndRefreshModel from './model';
import Pagination from 'interface/Pagination';

// 渲染 Result 组件中的图片
const renderImg = (src: string) => <img src={src} style={{ width: 60, height: 60 }} alt="" />;

// 渲染 ListView 中的分隔符
const separator = (sectionID: React.ReactText, rowID: React.ReactText) => (
    <div
        key={`${sectionID}-${rowID}`}
        style={{
            backgroundColor: '#F5F5F9',
            height: 8,
        }}
    />
);

type Props<T> = {
    resultTitle?: string;
    fetchListData: (pagination: Pagination) => void;
    row: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => React.ReactElement<any>;
    refreshModel: LoadAndRefreshModel<T>;
}

function LoadAndRefresh<T = any>({ row, resultTitle, fetchListData, refreshModel }: Props<T>) {

    const lv = useRef<ListView>(null!);

    const { listData, height, isLoading, refreshing, hasMore, showEmptyResult } = refreshModel;

    useEffect(() => {
        refreshModel.initListData(fetchListData);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const hei = document.documentElement.clientHeight - (ReactDOM.findDOMNode(lv.current)!.parentNode! as any).offsetTop;
        refreshModel.height = hei;
        // eslint-disable-next-line
    }, []);

    const footerProps = {
        renderFooter: () => (
            <div style={{ padding: 12, textAlign: 'center' }}>
                {
                    isLoading ? 
                        <span style={{ textAlign: 'center', height: 32 }}><ActivityIndicator size="large" text="加载中。。。"/></span>
                        : <span style={{ height: 32 }}>上拉加载</span>}
            </div>
        )
    }

    if (!hasMore) {
        delete footerProps.renderFooter
    }

    /**
     * 刷新时上方展示状态
     */
    const indicator = {
        activate: <div>松开立即刷新</div>,
        release: <ActivityIndicator size="small" text="拼命刷新中。。" />,
        finish: <div>刷新完成</div>
    }

    /**
     * 上拉加载事件时触发
     */
    const onEndReached = () => {
        if (refreshModel.isLoading || !refreshModel.hasMore) {
            return;
        }
        refreshModel.getListData(fetchListData);
    }

    /**
     * 下拉刷新事件时触发
     */
    const onRefresh = () => {
        if (refreshModel.refreshing) {
            return;
        }
        refreshModel.initListData(fetchListData, true);
    };

    // 定义 ListView.DataSource 数据源类型
    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    })

    return (
        <>
            <ActivityIndicator
                animating={ listData.length <= 0 && !refreshing && isLoading }
                toast
                size="large"
                text="拼命加载中。。。"
            />
            <Result
                style={{ display: showEmptyResult ? 'block' : "none" }}
                img={renderImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                title={ resultTitle || '暂无数据' }
            />
            <div className={ styles.list }>
                <ListView
                    ref={ lv }
                    style={{
                        height: height - 50,
                        overflow: 'auto',
                        display: showEmptyResult ? 'none' : 'block'
                    }}
                    dataSource={ dataSource.cloneWithRows(listData) }
                    renderRow={ row }
                    renderSeparator={ separator }
                    className="am-list"
                    pageSize={ 5 }
                    scrollRenderAheadDistance={500}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={100}
                    pullToRefresh={
                        <PullToRefresh
                            direction="down"
                            getScrollContainer={ () => window.document.body }
                            refreshing={ refreshing }
                            onRefresh={ onRefresh }
                            indicator={ indicator }
                            distanceToRefresh={ 32 }
                            damping={ 100 }
                        />
                    }
                    {...footerProps}
                />
            </div>
        </>
    )
}

export default observer(LoadAndRefresh);
