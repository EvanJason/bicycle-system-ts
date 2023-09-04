import React from 'react'
import { Card, Button, Form, Select, Modal, Input, Tree, Transfer, message, Switch, FormInstance } from 'antd'
import LTable from '../../components/LTable';
import { permissionService } from './service';
import { commonParams } from '../../common/params';
import ErrorBoundary from '../../components/ErrorBoundary';


const Option = Select.Option;
const FormItem = Form.Item;


export default class PermissionUser extends React.Component {

    state = {
        dataSource: [],
        isRoleVisible: false,
        isPermVisible: false,
        detailInfo: null,
        menuInfo: null,
    }

    componentWillMount() {
        this.request();
    }

    request = () => {
        const menuPerMaps = {
            1: ['/home', '/ui', '/ui/buttons', '/ui/modals', '/ui/loadings', '/ui/notification', '/ui/messages', '/ui/tabs', '/ui/gallery', '/ui/carousel', '/form', '/form/login', '/form/reg', '/table', '/table/basic', '/table/high'],
            2: ['/home', '/city', '/order', '/bikeMap', '/charts', '/charts/bar', '/charts/pie', '/charts/line'],
            3: ['/home', '/rich', '/city', '/order', '/user', '/bikeMap', '/charts', '/charts/bar', '/charts/pie', '/charts/line', '/permission'],
            4: ['/home', '/ui', '/form', '/table', '/rich', '/city', '/order', '/user', '/bikeMap', '/charts', '/permission', '/ui/buttons', '/ui/modals', '/ui/loadings', '/ui/notification', '/ui/messages', '/ui/tabs', '/ui/gallery', '/ui/carousel', '/form/login', '/form/reg', '/table/basic', '/table/high', '/charts/bar', '/charts/pie', '/charts/line',],
            5: ['/home', '/ui', '/form', '/table', '/rich', '/city', '/order', '/user', '/bikeMap', '/charts', '/permission', '/ui/buttons', '/ui/modals', '/ui/loadings', '/ui/notification', '/ui/messages', '/ui/tabs', '/ui/gallery', '/ui/carousel', '/form/login', '/form/reg', '/table/basic', '/table/high', '/charts/bar', '/charts/pie', '/charts/line',],
        }
        permissionService.getTableList().then(res => {
            if (res.status === 0) {
                this.setState({
                    dataSource: res.list.map((item, index) => {
                        item.key = index
                        item.menu = menuPerMaps[item.role_flag];
                        return item;
                    })
                })
            } else {
                message.warn(res.msg);
            }
        })
    }

    edit = (data) => {
        this.setState({
            isPermVisible: true,
            detailInfo: data,
            menuInfo: data.menu
        })
    }

    /**
     * 删除用户
     * @param data 
     */
    delete = (data) => {
        Modal.confirm({
            title: '删除',
            content: `是否要删除此用户：${data.username} ?`,
            onOk: () => {
                this.request();
                message.success('删除成功！')
            }
        })
    }

    RoleFormRef: RoleForm
    /**
     * 打开创建角色弹框
     */
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }

    /**
     * 创建角色提交
     */
    handleRoleSubmit = () => {
        this.RoleFormRef.form.current.validateFields().then(values => {
            // console.log(values);
            permissionService.addRole(values).then(res => {
                if (res.status === 0) {
                    message.success(res.msg)
                    this.setState({
                        isRoleVisible: false
                    })
                    this.RoleFormRef.form.current.resetFields();
                    this.request();
                } else {
                    message.warn(res.msg)
                }
            })
        }).catch(info => {
            console.log('校验失败', info);
        });
    }

    PermEditFormRef: PermEditForm

    /**
     * 设置权限提交
     */
    handlePermEditSubmit = () => {
        this.PermEditFormRef.form.current.validateFields().then(values => {
            values.menus = JSON.stringify(this.state.menuInfo);
            // console.log(values);
            permissionService.edit(values).then(res => {
                if (res.status === 0) {
                    message.success(res.msg)
                    this.setState({
                        isPermVisible: false
                    })
                    this.PermEditFormRef.form.current.resetFields();
                    this.request();
                } else {
                    message.warn(res.msg)
                }
            })
        }).catch(info => {
            console.log('校验失败', info);
        });
    }

    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_flag',
                render: (status) => {
                    let maps = {
                        1: '游客',
                        2: '员工',
                        3: '主管',
                        4: '老板',
                        5: '管理员',
                    }
                    return maps[status];
                }
            },
            {
                title: '姓名',
                dataIndex: 'username'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            },
            {
                title: '使用状态',
                dataIndex: "status",
                render: (status, data) => {
                    return <Switch disabled checkedChildren="开启" unCheckedChildren="关闭" checked={status === 1 ? true : false} />
                }
            },
            {
                title: '操作',
                render: (data) => {
                    return (
                        <div>
                            <Button type="primary" style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { this.edit(data) }}>设置权限</Button>
                            <Button type="primary" danger style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { this.delete(data) }}>删除</Button>
                        </div>
                    )
                }
            }
        ]
        const { dataSource, isRoleVisible, isPermVisible, detailInfo, menuInfo } = this.state;
        return (
            <ErrorBoundary>
                <div>
                    <Card>
                        <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    </Card>
                    <div className="content-wrap">
                        <LTable
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                        />
                    </div>
                    <Modal
                        title="创建角色"
                        visible={isRoleVisible}
                        onOk={this.handleRoleSubmit}
                        onCancel={() => {
                            this.RoleFormRef.form.current.resetFields();
                            this.setState({
                                isRoleVisible: false
                            })
                        }}
                    >
                        <RoleForm ref={(inst) => this.RoleFormRef = inst}></RoleForm>
                    </Modal>
                    <Modal
                        title="设置权限"
                        visible={isPermVisible}
                        width={600}
                        onOk={this.handlePermEditSubmit}
                        onCancel={() => {
                            this.PermEditFormRef.form.current.resetFields();
                            this.setState({
                                isPermVisible: false
                            })
                        }}
                    >
                        <PermEditForm
                            ref={(inst) => this.PermEditFormRef = inst}
                            detailInfo={detailInfo}
                            menuInfo={menuInfo}
                            patchMenuInfo={(checkedKeys) => {
                                this.setState({
                                    menuInfo: checkedKeys
                                })
                            }}
                        />
                    </Modal>
                </div>
            </ErrorBoundary>
        );
    }
}

class RoleForm extends React.Component {

    form = React.createRef<FormInstance>();

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal" ref={this.form}>
                <FormItem label="姓名" {...formItemLayout} name="username" rules={[
                    { message: '请输入姓名', required: true }
                ]}>
                    <Input type="text" placeholder="请输入姓名" />
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout} name="role_flag" rules={[
                    { message: '请选择角色名称', required: true }
                ]}>
                    <Select placeholder="请选择角色名称">
                        <Option value={1}>游客</Option>
                        <Option value={2}>员工</Option>
                        <Option value={3}>主管</Option>
                        <Option value={4}>老板</Option>
                        <Option value={5}>管理员</Option>
                    </Select>
                </FormItem>
                <FormItem label="状态" {...formItemLayout} name="state" rules={[
                    { message: '请选择状态', required: true }
                ]}>
                    <Select placeholder="请选择状态">
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </FormItem>
            </Form>
        );
    }
}
interface Props {
    detailInfo?: any,
    menuInfo?: any,
    patchMenuInfo?: any,
}
class PermEditForm extends React.Component<Props> {

    form = React.createRef<FormInstance>();

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }

    render() {
        const maps = {
            1: '游客',
            2: '员工',
            3: '主管',
            4: '老板',
            5: '管理员',
        }
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo, menuInfo } = this.props
        return (
            <Form layout="horizontal" ref={this.form}>
                <FormItem label="姓名" name="username" {...formItemLayout} initialValue={detailInfo.username}>
                    <Input disabled />
                </FormItem>
                <FormItem label="角色名称" name="role_flag" {...formItemLayout} initialValue={maps[detailInfo.role_flag]}>
                    <Input disabled />
                </FormItem>
                <FormItem label="状态" name="status" {...formItemLayout} initialValue={1}>
                    <Select>
                        <Option value={1}>启用</Option>
                        <Option value={0}>停用</Option>
                    </Select>
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                    treeData={[
                        {
                            title: "平台权限",
                            key: "platform_all",
                            children: commonParams.menuList
                        },
                    ]}
                />

            </Form>
        );
    }
}
