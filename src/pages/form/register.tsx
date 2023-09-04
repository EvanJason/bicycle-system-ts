import React from 'react'
import { Button, Card, DatePicker, Form, InputNumber, message, Radio, Select, Switch, Input, TimePicker, Checkbox, Upload, Modal } from 'antd'
import { UserOutlined, LockOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { common } from '../../common/public';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
export default class FormReg extends React.Component {

    state: any = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-3',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-4',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-xxx',
                percent: 50,
                name: 'image.png',
                status: 'uploading',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-5',
                name: 'image.png',
                status: 'error',
            },
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    /**
     * 点击文件链接或预览图标时的回调
     * @param file 
     */
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await common.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    /**
     * 上传文件改变时的状态，详见
     * @param param0 
     * @returns 
     */
    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const onFinish = (values: any) => {
            console.log('成功:', values);
            message.success(`${values.username} 恭喜你，您通过本次表单组件学习，当前密码为：${values.password}`)
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('失败:', errorInfo);
        };
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }

        const normFile = (e: any) => {
            console.log('上传事件:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };


        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <div>
                <Card title="注册表单">
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <FormItem
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!'
                                }
                            ]}
                            {...formItemLayout}
                        >
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                            {...formItemLayout}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                        </FormItem>

                        <FormItem label="性别" name="sex" initialValue="1" required {...formItemLayout}>
                            <RadioGroup>
                                <Radio value="0">女</Radio>
                                <Radio value="1">男</Radio>
                            </RadioGroup>
                        </FormItem>

                        <FormItem label="年龄" name="age" initialValue={18} rules={[
                            { required: true, message: '请输入年龄！' }
                        ]} {...formItemLayout}>
                            <InputNumber max={100} />
                        </FormItem>


                        <FormItem label="当前状态" name="state" initialValue="2" required {...formItemLayout}>
                            <Select>
                                <Option value="1">咸鱼一条</Option>
                                <Option value="2">风华浪子</Option>
                                <Option value="3">北大才子一枚</Option>
                                <Option value="4">百度FE</Option>
                                <Option value="5">创业者</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="爱好" name="interest" initialValue={['2', '5']} required {...formItemLayout}>

                            <Select mode="multiple">
                                <Option value="1">游泳</Option>
                                <Option value="2">打篮球</Option>
                                <Option value="3">踢足球</Option>
                                <Option value="4">跑步</Option>
                                <Option value="5">爬山</Option>
                                <Option value="6">骑行</Option>
                                <Option value="7">桌球</Option>
                                <Option value="8">麦霸</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="是否已婚" name="isMarried" initialValue={true} valuePropName="checked" required {...formItemLayout}>
                            <Switch style={{ width: 100 }} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={true} />
                        </FormItem>

                        <FormItem label="生日" name="birthday" initialValue={moment('2021-09-16')} required {...formItemLayout} rules={[
                            { required: true, message: '请选择生日！' }
                        ]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </FormItem>

                        <FormItem label="联系地址" initialValue="厦门市湖里区万达广场" name="address" required {...formItemLayout} rules={[
                            { required: true, message: '请输入联系地址！' }
                        ]}>
                            <TextArea rows={4} autoSize={rowObject} />
                        </FormItem>


                        <FormItem label="早起时间" name="time" {...formItemLayout}>
                            <TimePicker />
                        </FormItem>

                        <Form.Item
                            name="userImg"
                            label="头像"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="请选择规范的文件格式"
                            {...formItemLayout}
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>上传文件</Button>
                            </Upload>
                        </Form.Item>

                        <FormItem name="cardImg" label="图片上传" {...formItemLayout}>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>


                        </FormItem>

                        <FormItem name="protocol" valuePropName="checked" {...offsetLayout} rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('请先阅读协议')),
                            },
                        ]}>
                            <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                        </FormItem>

                        <FormItem  {...offsetLayout}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                {/* 图片的弹框 */}
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}