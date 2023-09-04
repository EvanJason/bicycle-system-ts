import React from 'react';
import { Card, Button, Radio } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import '../index.less'
export default class Buttons extends React.Component {

    state: any = {
        loading: true,
        size: 'large',
    }

    handleCloseLoading = () => {
        this.setState({
            loading: false
        });
    }

    handleChange = (e) => {
        this.setState({ size: e.target.value });
    }


    render() {
        const { size } = this.state;
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                    <Button danger>Danger Default</Button>
                    <Button danger type="primary">Danger Default</Button>
                    <Button type="primary" disabled>
                        disabled
                    </Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button shape="circle" icon={<SearchOutlined />}></Button>
                    <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading} >点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{ marginBottom: 10 }}>
                    <Button.Group>
                        <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                        <Button type="primary" icon={<RightOutlined />}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={size} onChange={this.handleChange}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <br />
                    <br />
                    <Button type="primary" size={size}>
                        Primary
                    </Button>
                    <Button size={size}>Imooc</Button>
                    <Button type="dashed" size={size}>Imooc</Button>
                    <Button danger size={size}>Imooc</Button>
                </Card>
                <Card title="幽灵按钮" className="card-wrap">
                    <div style={{ background: 'rgb(190, 200, 200)', padding: 10 }}>
                        <Button type="primary" ghost>
                            Primary
                        </Button>
                        <Button ghost>Default</Button>
                        <Button type="dashed" ghost>
                            Dashed
                        </Button>
                        <Button type="primary" danger ghost>
                            Danger
                        </Button>
                    </div>

                </Card>
            </div>
        );
    }
}