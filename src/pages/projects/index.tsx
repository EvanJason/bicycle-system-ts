import React from 'react'
import { Card, Col, Row, Skeleton, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import ErrorBoundary from '../../components/ErrorBoundary';

export default class Projects extends React.Component {
    state = {
        loading: false,
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000);
    }


    render() {
        const { loading } = this.state
        const imgs = [
            { title: '新统计系统', desc: '新统计系统', link: 'http://192.168.13.123:4200/home' },
            { title: '客服系统', desc: '客服系统', link: 'http://192.168.13.123:4300/home' },
            { title: '客户关系管理系统', desc: '客户关系管理系统', link: 'https://www.baidu.com/' },
            { title: 'BI系统', desc: 'BI系统', link: 'http://192.168.13.123:4400/home' },
            { title: '用户系统', desc: '用户系统', link: 'https://www.baidu.com/' },
            { title: '开放平台系统', desc: '开放平台系统', link: 'https://www.baidu.com/' },
        ]
        const imgList = imgs.map((item, index) => {
            return (
                <Skeleton active loading={loading}>
                    <Card
                        hoverable
                        style={{ marginBottom: 10 }}
                        cover={<img style={{ height: 150 }} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        actions={[
                            <Tooltip title={`进入${item.title}`}><HomeOutlined key="enter" onClick={() => { window.open(item.link) }} /></Tooltip>,
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}

                    >
                        <Card.Meta
                            title={item.title}
                            description={item.desc}
                        />

                    </Card>
                </Skeleton>
            )
        })
        //测试错误边界用
        // const Test = () => {
        //     return <div>{(window as any).a.e}</div>
        // }
        return <ErrorBoundary>
            {/* <Test /> */}
            <div className="card-wrap">
                <Row gutter={16}>
                    {
                        imgList.map((item, index) => {
                            return (
                                <Col span={4} key={index}>
                                    {item}
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </ErrorBoundary>
    }
}