/*
 * filename: LoadAndRefreshModel
 * overview: 承载 Boss 或者求职者列表数据的 Model
 */
import { observable, action, runInAction, computed } from 'mobx';
import { errorCaptured } from 'utils';
import Response from 'interface/Response';
import Pagination from 'interface/Pagination';

export default class LoadAndRefreshModel<T> {

    // 数据列表
    @observable
    private _listData: T[] = [];

    // 是否处于上拉加载状态
    @observable
    isLoading = false;

    // 是否处于下拉刷新状态
    @observable
    refreshing = false;

    // ListView 高度，使用自定义容器时需要制定
    @observable
    height = document.documentElement.clientHeight * 3 / 4;

    // 是否展示空态页
    @observable
    showEmptyResult = false;

    // 分页数据
    @observable
    pagination: Pagination = {
        page: 1,
        pageSize: 6,
        total: 0
    };

    public set listData(listData: T[]) {
        this._listData = listData;
    }
    
    public get listData() {
        return this._listData;
    }

    // 是否可以加载更多
    @computed
    get hasMore() {
        return this.pagination.total && this.listData.length < this.pagination.total; 
    }

    /**
     * 初始化 listData
     */
    @action
    initListData = async (fetchListData: (pagination: Pagination) => void, refreshing: boolean = false) => {
        this.isLoading = true;
        this.refreshing = refreshing;
        const { pageSize } = this.pagination;
        const [, result]: [any, Response<T[]> | null] = await errorCaptured<T[]>(fetchListData, { page: 1, pageSize });
        runInAction(() => {
            this.isLoading = false;
            this.refreshing = false;
            if (result && result.code === 0) {
                const { page = 0, pageSize = this.pagination.pageSize, totalCount = 0, data = [] } = result;
                this.showEmptyResult = data.length <= 0;
                this.listData = data;
                this.pagination = {
                    page,
                    pageSize,
                    total: totalCount
                }
            } else {
                this.showEmptyResult = true;
            }
        })
    }

    /**
     * 获取 listData
     */
    @action
    getListData = async (fetchListData: (pagination: Pagination) => void) => {
        this.isLoading = true;
        const { page, pageSize } = this.pagination;
        const [, result]: [any, Response<T[]> | null] = await errorCaptured<T[]>(fetchListData, { page: 1 + Number(page), pageSize });
        runInAction(() => {
            this.isLoading = false;
            if (result && result.code === 0) {
                const { page = 0, pageSize = this.pagination.pageSize, totalCount = 0, data = [] } = result;
                this.listData = [...this.listData, ...data];
                this.pagination = {
                    page,
                    pageSize,
                    total: totalCount
                }
            }
        })
    }
}
