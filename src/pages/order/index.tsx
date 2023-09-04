import { Button, Card, DatePicker, Form, FormInstance, message, Modal, Progress, Select, Table } from 'antd'
import moment from 'moment'
import React from 'react' // 在 React V15.5 版本之前，类型校验的能力，和 react 是在一起；
import { common } from '../../common/public'
import BaseForm from '../../components/BaseForm'
import LTable from '../../components/LTable'
import { Config } from '../../config/public'
import { orderService } from './service'

const FormItem = Form.Item
export default class Order extends React.Component {

    state = {
        dataSource: [],
        curPage: 1,
        pageSize: 10,
        total: 30,
        pagination: null,
        // 单选
        selectedRowKeys: [],
        selectedItem: null,
        selectedIds: null,
        orderConfirmVisble: false,
        orderInfo: null,
    }

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询',
            field: 'range_picker',
            placeholder: ['请选择开始日期', '请选择结束日期'],
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]

    componentDidMount() {
        this.request();
    }

    request = () => {
        const params = {
            page: this.state.curPage
        }
        // 第一种
        // requestAjax.requestList(this, '/order/list', params, true);

        // 第二种
        orderService.getTableList(params).then(res => {
            if (res.status === 0) {
                this.setState({
                    dataSource: res.list.map((item, index) => {
                        item.key = index
                        return item;
                    }),
                    curPage: res.page,
                    pageSize: res.pageSize,
                    total: res.total,
                    pagination: common.pagination(res, (current) => {
                        /* TODO 实现点击下一页(因为为mock数据，所以点击后分页不会改变，但请求已经改变了。) */
                        this.state.curPage = current;
                        this.request();
                    })
                })
            } else {
                message.info(res.msg);
            }
        })
    }

    /**
     * 打开详情页面
     */
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`./#/common/order/detail/${item.id}`, '_blank')
    }

    /**
     * 获取订单的详情
     */
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        orderService.getDetail().then((res) => {
            if (res.status === 0) {
                this.setState({
                    orderInfo: res.data,
                    orderConfirmVisble: true
                })
            }
        })
    }

    /**
     * 结束订单
     */
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        const params = {
            orderId: item.id
        }
        orderService.endOrder(params).then(res => {
            if (res.status == 0) {
                message.success(res.msg)
                this.setState({
                    orderConfirmVisble: false
                })
                this.request();
            }
        })
    }

    onRowClick = (record, item) => {
        let selectKey = [item];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    handleFilter = (params) => {
        // console.log(params);
        if (!params['range_picker']) {
            message.warn('请选择订单时间！！！')
            return;
        }
        const start = moment(params['range_picker'][0]).format('YYYY-MM-DD HH:mm:ss');
        const end = moment(params['range_picker'][1]).format('YYYY-MM-DD HH:mm:ss')
        console.log(params, start, end);
        this.request();
    }

    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return `${(distance / 1000).toFixed(2)}Km`;
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                render: (time) => {
                    return `${time}分钟`
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    let tags = {
                        '1': '进行中',
                        '2': '行程结束',
                    }
                    return tags[status];
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const { dataSource, pagination, orderInfo, selectedRowKeys, selectedItem } = this.state;
        // 单选
        const rowSelection: any = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys,
        };
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <LTable
                        updateSelectedItem={common.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        selectedRowKeys={selectedRowKeys}
                        selectedItem={selectedItem}
                        pagination={pagination}
                    />
                    {/* <Table
                        bordered columns={columns} dataSource={dataSource} pagination={pagination} rowSelection={rowSelection} onRow={(record, item) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, item);
                                }
                            };
                        }}
                    /> */}
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...Config.getFormLayout}>
                            {orderInfo?.bike_sn || '-'}
                        </FormItem>
                        <FormItem label="剩余电量" {...Config.getFormLayout}>
                            <Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                percent={orderInfo?.battery | 0}
                            />
                        </FormItem>
                        <FormItem label="行程开始时间" {...Config.getFormLayout}>
                            {orderInfo?.start_time || '-'}
                        </FormItem>
                        <FormItem label="当前位置" {...Config.getFormLayout}>
                            {orderInfo?.location || '-'}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}