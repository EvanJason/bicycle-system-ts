import ArrowDownOutlined from '@ant-design/icons/lib/icons/ArrowDownOutlined';
import ArrowUpOutlined from '@ant-design/icons/lib/icons/ArrowUpOutlined';
import { Card, Col, message, Row, Spin, Statistic, Tabs } from 'antd';
import React from 'react';
import { echartsTheme } from '../../config/echartTheme';
import ReactECharts from 'echarts-for-react';
import './index.less'
const { TabPane } = Tabs;

export default class Home extends React.Component {

    getOption = () => {
        let option = {
            title: {
                text: '周付费趋势',
                x: 'left'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户付费数'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '付费数',
                    type: 'bar',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户乘车订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['小红订单量', '小蓝订单量']
            },
            xAxis: {
                data: [
                    '周一', '周二', '周三', '周四', '周五', '周六', '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '小红订单量',
                    type: 'line',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '小蓝订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户活跃率"
                                value={33.15}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户付费率"
                                value={30.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户留存率"
                                value={25.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户注册数"
                                value={45671}
                            // precision={2}
                            // valueStyle={{ color: '#cf1322' }}
                            // prefix={<ArrowDownOutlined />}
                            // suffix="人"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户付费金额"
                                value={1647891.15}
                                precision={2}
                            // valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户付费人数"
                                value={45678}
                            // precision={2}
                            // valueStyle={{ color: '#cf1322' }}
                            // prefix={<ArrowDownOutlined />}
                            // suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
                <Card style={{ marginTop: 20 }}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="用户付费" key="1">
                            <Row style={{ marginTop: 20 }} gutter={16}>
                                <Col span={12}><ReactECharts option={this.getOption()} theme={echartsTheme.theme} style={{ height: 450 }} /></Col>
                                <Col span={12}><ReactECharts option={this.getOption2()} theme={echartsTheme.theme} style={{ height: 450 }} /></Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="订单趋势" key="2">
                            <ReactECharts option={this.getOption3()} theme={echartsTheme.theme} style={{ height: 450, marginTop: 20 }} />
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}