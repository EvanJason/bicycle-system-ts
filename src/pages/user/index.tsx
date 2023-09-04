import { Button, Card, DatePicker, Form, FormInstance, Input, message, Modal, Radio, Select, Spin } from 'antd'
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react'
import { common } from '../../common/public';
import BaseForm from '../../components/BaseForm';
import LTable from '../../components/LTable';
import { userService } from './service';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea
export default class User extends React.Component {

    state = {
        dataSource: [],
        curPage: 1,
        pageSize: 10,
        total: 30,
        pagination: null,
        // 单选
        selectedRowKeys: [],
        selectedItem: null,
        type: null,
        isVisible: false,
        title: null,
        userInfo: null,
    }

    userFormRef: UserForm

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名称',
            width: 130,
        }, {
            type: 'INPUT',
            label: '用户手机号',
            field: 'user_mobile',
            placeholder: '请输入用户手机号',
            width: 140,
        }, {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'user_date',
            placeholder: '请输入日期',
        }
    ]

    handleFilter = (params) => {
        console.log(params);
        if (!params['user_date']) {
            message.warn('请选择入职时间！！！')
            return;
        }
        this.request();
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        const params = {
            page: this.state.curPage
        }
        userService.getTableList(params).then(res => {
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
                    }),
                    selectedRowKeys: [],
                    selectedItem: null,
                })
            } else {
                message.info(res.msg);
            }
        })
    }

    add = (type: string) => {
        this.setState({
            type,
            isVisible: true,
            title: '创建员工',
            selectedRowKeys: [],
            selectedItem: null,
        });
    }

    edit = (type: string, item) => {
        if (!item) {
            Modal.warn({
                title: "提示",
                content: '请选择一个用户'
            });
            return;
        }
        this.setState({
            type,
            isVisible: true,
            title: '编辑员工',
            userInfo: item,
        });
        /* 需要设置延迟,不然会出现不存在form字段 */
        setTimeout(() => {
            this.userFormRef.form.current.resetFields();
        }, 100);
    }

    detail = (type: string, item) => {
        if (!item) {
            Modal.warn({
                title: "提示",
                content: '请选择一个用户'
            });
            return;
        }
        this.setState({
            type,
            isVisible: true,
            title: '员工详情',
            userInfo: item,
        });
    }

    del = (type: string, item) => {
        if (!item) {
            Modal.warn({
                title: "提示",
                content: '请选择一个用户'
            });
            return;
        }
        let _this = this;
        Modal.confirm({
            title: '确认删除',
            content: '是否要删除当前选中的员工',
            onOk() {
                const params = {
                    id: item.id
                }
                userService.oprateUser(type, params).then((res) => {
                    if (res.status === 0) {
                        message.success(res.msg);
                        _this.request();
                    } else {
                        message.warn(res.msg);
                    }
                })
            }
        });
    }

    /**
     * 功能区操作
     * @param type 
     */
    hanleOperate = (type) => {
        let item = this.state.selectedItem;
        const targetMaps = {
            add: () => { this.add(type) },
            edit: () => { this.edit(type, item) },
            detail: () => { this.detail(type, item) },
            del: () => { this.del(type, item) },
        }
        let action = targetMaps[type];
        action();
    };

    /**
     * 添加/编辑对话框提交
     */
    handleSubmit = () => {
        let type = this.state.type;
        /* 
        多表单联动
        通过 Form.Provider 在表单间处理数据。本例子中，Modal 的确认按钮在 Form 之外，
        通过 form.submit 方法调用表单提交功能。反之，则推荐使用 <Button htmlType="submit" /> 调用 web 原生提交逻辑。 
        */
        // this.userFormRef.form.current.submit();
        this.userFormRef.form.current.validateFields().then(values => {
            userService.oprateUser(type, values).then(res => {
                if (res.status === 0) {
                    message.success(res.msg);
                    this.userFormRef.form.current.resetFields();
                    this.setState({
                        isVisible: false
                    })
                    this.request();
                } else {
                    message.warn(res.msg);
                }
            })
        }).catch(info => {
            console.log('校验失败', info);
        });
    }

    handleCancel = () => {
        this.userFormRef.form.current.resetFields();
        this.setState({
            isVisible: false,
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女';
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子一枚',
                        '4': '百度FE',
                        '5': '创业者'
                    }[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }[interest];
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            },
        ];
        /* 当为详情时，没有对话框底部 */
        let footer = {};
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            };
        }
        const { dataSource, pagination, selectedRowKeys, selectedItem, title, isVisible, type, userInfo } = this.state;
        // 单选
        const rowSelection: any = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys,
        };
        return (<div>
            <Card>
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
            </Card>
            <Card style={{ marginTop: 10 }} className="operate-wrap">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => this.hanleOperate('add')}>创建员工</Button>
                <Button type="primary" icon={<EditOutlined />} onClick={() => this.hanleOperate('edit')}>编辑员工</Button>
                <Button type="primary" icon={<InfoCircleOutlined />} onClick={() => this.hanleOperate('detail')}>员工详情</Button>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => this.hanleOperate('del')}>删除员工</Button>
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
            </div>
            <Modal
                title={title}
                visible={isVisible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                width={600}
                {...footer}
            >
                <UserForm type={type} userInfo={userInfo} ref={(inst) => { this.userFormRef = inst; }} />
            </Modal>
        </div>)
    }
}

interface Props {
    type: string
    userInfo: any
}
class UserForm extends React.Component<Props> {

    form = React.createRef<FormInstance>();

    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
        }[state]
    }

    render() {
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal" ref={this.form}>
                <FormItem label="用户名" {...formItemLayout} name="username" initialValue={userInfo.username} rules={[
                    { message: '请输入用户名', required: type === 'detail' ? false : true }
                ]}>
                    {
                        type === 'detail' ? userInfo.username : (
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout} name="sex" initialValue={userInfo.sex} rules={[
                    { message: '请选择性别', required: type === 'detail' ? false : true }
                ]}>
                    {
                        type === 'detail' ? userInfo.sex == 1 ? '男' : '女' : (
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout} name="state" initialValue={userInfo.state} rules={[
                    { message: '请选择状态', required: type === 'detail' ? false : true }
                ]}>
                    {
                        type === 'detail' ? this.getState(userInfo.state) : (
                            <Select placeholder="请选择状态">
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout} name="birthday" initialValue={moment(userInfo.birthday)} rules={[
                    { message: '请选择生日', required: type === 'detail' ? false : true }
                ]}>
                    {
                        type === 'detail' ? userInfo.birthday : (
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout} name="address" initialValue={userInfo.address} >
                    {
                        type === 'detail' ? userInfo.address : (
                            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="请输入联系地址" />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}