import React from 'react';
import { Button, Card, message, Modal, Table } from 'antd';
import { tableServices } from './service';
import { common } from '../../common/public';


export default class BasicTable extends React.Component {

    state = {
        dataSource: [],
        mockData: [],
        // 单选
        selectedRowKeys: [],
        // 多选
        selectedRowKeyCheck: [],
        selectedItem: [],
        loading: false,
        // 表格分页
        pageData: [],
        curPage: 1,
        pageSize: 10,
        total: 30,
        pagination: null,
    }


    componentDidMount() {
        const data = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '3',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '2',
                state: '2',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item: any, index) => {
            item.key = index;
        })
        this.setState({
            dataSource: data
        })
        this.getTableList();
        this.getTablePageList();
    }

    /**
     * 获取表格mock数据
     */
    getTableList = () => {
        tableServices.getTableList().then(res => {
            // console.log(res);
            if (res.status === 0) {
                let data = res.list;
                data.map((item: any, index) => {
                    item.key = index;
                })
                this.setState({
                    mockData: data,
                })
            } else {
                message.info(res.msg);
            }
        })
    }

    /**
     * 获取分页表格mock数据
     */
    getTablePageList = () => {
        const params = {
            page: this.state.curPage
        }
        tableServices.getTablePageList(params).then(res => {
            if (res.status === 0) {
                let data = res.list;
                data.map((item: any, index) => {
                    item.key = index;
                })
                this.setState({
                    pageData: data,
                    curPage: res.page,
                    pageSize: res.pageSize,
                    total: res.total,
                    pagination: common.pagination(res, (current) => {
                        /* TODO 实现点击下一页(因为为mock数据，所以点击后分页不会改变，但请求已经改变了。) */
                        this.state.curPage = current;
                        this.getTablePageList();
                    })
                })
            }
        })
    }

    // 单选表格行事件
    onRowClick = (record, list) => {
        let selectKey = [list];
        message.info(`用户名：${record.userName},用户爱好：${record.interest}`)

        this.setState({
            selectedRowKeys: selectKey,
        })
    }

    // 多选执行删除动作
    handleDelete = () => {
        this.setState({ loading: true });
        const { selectedRowKeyCheck, selectedItem } = this.state;
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？${selectedRowKeyCheck.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                setTimeout(() => {
                    this.setState({
                        selectedRowKeyCheck: [],
                        loading: false,
                    });
                    console.log('删除的数据：', selectedItem);
                }, 500);
            }
        })

    }

    // 多选改变
    onSelectChange = (selectedRowKeyCheck, item) => {
        console.log('选中改变', selectedRowKeyCheck, item);
        this.setState({ selectedRowKeyCheck, selectedItem: item });
    };

    render() {
        const { dataSource, mockData, selectedRowKeys, selectedRowKeyCheck, loading, pageData, pagination } = this.state
        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (sex: number) => {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render: (state: number) => {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render: (abc: number) => {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        // 单选
        const rowSelection: any = {
            type: 'radio',
            selectedRowKeys,
        };
        // 多选
        const rowSelections = {
            selectedRowKeys: selectedRowKeyCheck,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeyCheck.length > 0;
        return (
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
                </Card>
                <Card title="动态数据渲染表格-Mock数据" className="card-wrap">
                    <Table bordered dataSource={mockData} columns={columns} pagination={false} />
                </Card>
                <Card title="Mock-单选" className="card-wrap">
                    <Table rowSelection={rowSelection} bordered dataSource={mockData} columns={columns} pagination={false} onRow={(record, list) => {
                        return {
                            onClick: () => { this.onRowClick(record, list) }
                        }
                    }} />
                </Card>
                <Card title="Mock-多选" className="card-wrap">
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.handleDelete} disabled={!hasSelected} loading={loading}>
                            删除
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `选中 ${selectedRowKeyCheck.length} 项` : ''}
                        </span>
                    </div>
                    <Table rowSelection={rowSelections} bordered dataSource={mockData} columns={columns} pagination={false} />
                </Card>
                <Card title="Mock-表格分页" className="card-wrap">
                    <Table bordered dataSource={pageData} columns={columns} pagination={pagination} />
                </Card>
            </div>
        );
    }
}