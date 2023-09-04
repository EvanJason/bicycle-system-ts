import React from 'react'
import { Card } from 'antd'
import { echartsTheme } from '../../../config/echartTheme';
import ReactECharts from 'echarts-for-react';
export default class Bar extends React.Component {

    getOption = () => {
        let option = {
            title: {
                text: '用户乘车订单'
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
                    name: '订单量',
                    type: 'bar',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
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
            legend: {
                data: ['小红', '小兰', '小新']
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
                    name: '小红',
                    type: 'bar',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                }, {
                    name: '小兰',
                    type: 'bar',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                }, {
                    name: '小新',
                    type: 'bar',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactECharts option={this.getOption()} theme={echartsTheme.theme} style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表之二" style={{ marginTop: 10 }}>
                    <ReactECharts option={this.getOption2()} theme={echartsTheme.theme} style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}