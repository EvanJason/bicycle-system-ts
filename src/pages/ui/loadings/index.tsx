import React from 'react';
import { Card, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../index.less'
export default class Loadings extends React.Component {

    render() {
        const icon = <LoadingOutlined style={{ fontSize: 24 }} />
        const iconLoading = <LoadingOutlined style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{ margin: '0 10px' }} />
                    <Spin size="large" />
                    <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="欢迎来到React高级实战课程"
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="success"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="error"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}