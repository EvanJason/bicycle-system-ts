import React from 'react';
import { Badge, Button, Card, message, Modal, Table } from 'antd';
import { tableServices } from './service';

export default class HighTable extends React.Component {
    state = {
        dataSource: [],
        mockData: [],
        dataSource2: [],
    };

    componentDidMount() {
        this.getTablePageList();
        this.getTableList();
        this.getTablePageList2();
    }

    /**
     * 获取表格数据-固定
     */
    getTablePageList = () => {
        tableServices.getHighTableList().then((res) => {
            if (res.status === 0) {
                let data = res.list;
                data.map((item: any, index) => {
                    item.key = index;
                });
                this.setState({
                    dataSource: data,
                });
            }
        });
    };

    /**
     * 获取表格mock数据-排序
     */
    getTableList = () => {
        tableServices.getHighTableList2().then((res) => {
            // console.log(res);
            if (res.status === 0) {
                let data = res.list;
                data.map((item: any, index) => {
                    item.key = index;
                });
                this.setState({
                    mockData: data,
                });
            } else {
                message.info(res.msg);
            }
        });
    };

    /**
     * 获取表格数据-操作按钮
     */
    getTablePageList2 = () => {
        tableServices.getHighTableList3().then((res) => {
            // console.log(res);
            if (res.status === 0) {
                let data = res.list;
                data.map((item: any, index) => {
                    item.key = index;
                });
                this.setState({
                    dataSource2: data,
                });
            } else {
                message.info(res.msg);
            }
        });
    };

    // 监听改变
    handleChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
    };

    /* 监听删除 */
    handleDelete = (item) => {
        // console.log(item);
        let id = item.id;
        Modal.confirm({
            title: '确认',
            content: `您确认要删除此条数据嘛？`,
            onOk: () => {
                message.success('删除成功');
                this.getTablePageList2();
            }
        })
    }

    render() {
        const { dataSource, mockData, dataSource2 } = this.state;
        const columns1 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (sex: number) => {
                    return sex == 1 ? '男' : '女';
                },
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
                        '5': '创业者',
                    };
                    return config[state];
                },
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
                        '8': '麦霸',
                    };
                    return config[abc];
                },
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time',
            },
        ];
        const columns2: any = [
            {
                title: 'id',
                key: 'id',
                width: 150,
                dataIndex: 'id',
                fixed: 'left',
                align: 'center',
            },
            {
                title: '性别',
                key: 'sex',
                width: 150,
                dataIndex: 'sex',
                render: (sex: number) => {
                    return sex == 1 ? '男' : '女';
                },
                fixed: 'left',
                align: 'center',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
            },
            {
                title: '用户名',
                key: 'userName',
                width: 150,
                dataIndex: 'userName',
                fixed: 'right',
                align: 'center',
            },
            {
                title: '地址',
                key: 'address',
                width: 150,
                dataIndex: 'address',
                fixed: 'right',
                align: 'center',
            },
        ];
        const columns3: any = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (sex: number) => {
                    return sex == 1 ? '男' : '女';
                },
            },
            {
                title: '年龄',
                key: 'age',
                dataIndex: 'age',
                sorter: (a, b) => a.age - b.age,
                // sortDirections: ['descend'],
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
                        '5': '创业者',
                    };
                    return config[state];
                },
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
                        '8': '麦霸',
                    };
                    return config[abc];
                },
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time',
            },
        ];
        const columns4: any = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (sex: number) => {
                    return sex == 1 ? '男' : '女';
                },
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
                        '5': '创业者',
                    };
                    return config[state];
                },
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render: (abc: number) => {
                    let config = {
                        '1': <Badge status="success" text="游泳" />,
                        '2': <Badge status="error" text="打篮球" />,
                        '3': <Badge status="default" text="踢足球" />,
                        '4': <Badge status="processing" text="跑步" />,
                        '5': <Badge status="warning" text="爬山" />,
                        '6': <Badge status="error" text="骑行" />,
                        '7': <Badge status="success" text="桌球" />,
                        '8': <Badge status="processing" text="麦霸" />,
                    };
                    return config[abc];
                },
            },
            {
                title: '描述',
                key: 'desc',
                dataIndex: 'desc',
                ellipsis: true,
            },
            {
                title: '操作',
                render: (text, data) => {
                    return <Button type="link" onClick={() => { this.handleDelete(data) }}>删除</Button>
                },
                align: 'center',
            }
        ];
        return (
            <div>
                <Card title='头部固定' className='card-wrap'>
                    <Table bordered dataSource={dataSource} columns={columns1} pagination={false} scroll={{ y: 240 }} />
                </Card>
                <Card title='左侧固定' className='card-wrap'>
                    <Table bordered dataSource={dataSource} columns={columns2} pagination={false} scroll={{ x: 1800, y: 400 }} />
                </Card>
                <Card title='排序' className='card-wrap'>
                    <Table bordered dataSource={mockData} columns={columns3} pagination={false} onChange={this.handleChange} />
                </Card>
                <Card title='操作按钮' className='card-wrap'>
                    <Table bordered dataSource={dataSource2} columns={columns4} pagination={false} />
                </Card>
            </div>
        );
    }
}
