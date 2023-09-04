import { Button, Card, Form, FormInstance, message, Modal, Select, Table } from 'antd'
import React from 'react' // 在 React V15.5 版本之前，类型校验的能力，和 react 是在一起；
import { cityService } from './service';
import { common } from '../../common/public';

export default class City extends React.Component {


    state = {
        dataSource: [],
        curPage: 1,
        pageSize: 10,
        total: 30,
        pagination: null,
        isShowOpenCity: false,
    }

    ModalFormRef: OpenCityForm


    componentDidMount() {
        this.requestList();
    }
    /**
     * 默认请求
     */
    requestList = () => {
        const params = {
            page: this.state.curPage
        }
        cityService.getTableList(params).then(res => {
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
                        this.requestList();
                    })
                })
            } else {
                message.info(res.msg);
            }
        })
    }

    /**
     * 开通城市
     */
    handleOpenCity = () => {
        this.setState({ isShowOpenCity: true })
    }

    /**
     * 开通城市提交
     */
    handleSubmit = () => {
        console.log(this.ModalFormRef.formRef.current.getFieldsValue());
        const params = this.ModalFormRef.formRef.current.getFieldsValue()
        cityService.getTableList(params).then(res => {
            if (res.status === 0) {
                message.success('开通成功');
                this.setState({ isShowOpenCity: false })
                this.requestList();
            } else {
                message.warning(res.msg)
            }
        })


    }

    // 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode == 1 ? '停车点' : '禁停区';
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',

            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        const { dataSource, pagination } = this.state
        return (<div>
            <Card>
                <FilterForm />
            </Card>
            <Card style={{ marginTop: 10 }}>
                <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
            </Card>
            <div className="content-wrap">
                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
            <Modal
                title="开通城市"
                visible={this.state.isShowOpenCity}
                onCancel={() => {
                    this.setState({
                        isShowOpenCity: false
                    })
                }}
                onOk={this.handleSubmit}
            >
                <OpenCityForm ref={(node) => { this.ModalFormRef = node; }} />
            </Modal>
        </div>)
    }
}
/* 查询表单 */
class FilterForm extends React.Component {

    handleForm = (values: any) => {
        console.log(values);
    }

    render() {
        return (
            <Form layout="inline" onFinish={this.handleForm}>
                <Form.Item label="城市" name="city_id">
                    <Select placeholder="请选择" allowClear style={{ width: 100 }}>
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">北京市</Select.Option>
                        <Select.Option value="2">天津市</Select.Option>
                        <Select.Option value="3">深圳市</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式" name="mode">
                    <Select placeholder="请选择" allowClear style={{ width: 150 }}>
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">指定停车点模式</Select.Option>
                        <Select.Option value="2">禁停区模式</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="营运模式" name="op_mode">
                    <Select placeholder="请选择" allowClear style={{ width: 100 }}>
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">自营</Select.Option>
                        <Select.Option value="2">加盟</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="加盟商授权状态" name="auth_status">
                    <Select placeholder="请选择" allowClear style={{ width: 100 }}>
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">已授权</Select.Option>
                        <Select.Option value="2">未授权</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ margin: '0 20px' }} htmlType="submit">
                        查询
                    </Button>
                    <Button>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const FormItem = Form.Item;
const Option = Select.Option;
class OpenCityForm extends React.Component {



    formRef = React.createRef<FormInstance>();

    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }

        return (
            <Form layout="horizontal" ref={this.formRef}>
                <FormItem label="选择城市" name="city_id" initialValue="1" {...formItemLayout}>
                    <Select style={{ width: 100 }}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                </FormItem>
                <FormItem label="营运模式" name="op_mode" initialValue="1" {...formItemLayout}>
                    <Select style={{ width: 100 }}>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" name="use_mode" initialValue="1" {...formItemLayout}>
                    <Select style={{ width: 100 }}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        );
    }
}