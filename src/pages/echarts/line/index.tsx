import React from 'react'
import { Card } from 'antd'
import { echartsTheme } from '../../../config/echartTheme';
import ReactECharts from 'echarts-for-react';
export default class Line extends React.Component {


    getOption = () => {
        let option = {
            title: {
                text: '用户乘车订单'
            },
            tooltip: {
                trigger: 'axis'
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
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户乘车订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['小红订单量', '小兰订单量']
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
                    name: '小兰订单量',
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

    getOption3 = () => {
        let option = {
            title: {
                text: '用户乘车订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    '周一', '周二', '周三', '周四', '周五', '周六', '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="折线图表之一">
                    <ReactECharts option={this.getOption()} theme={echartsTheme.theme} style={{ height: 500 }} />
                </Card>
                <Card title="折线图表之二" style={{ marginTop: 10 }}>
                    <ReactECharts option={this.getOption2()} theme={echartsTheme.theme} style={{ height: 500 }} />
                </Card>
                <Card title="折线图表之三" style={{ marginTop: 10 }}>
                    <ReactECharts option={this.getOption3()} theme={echartsTheme.theme} style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}