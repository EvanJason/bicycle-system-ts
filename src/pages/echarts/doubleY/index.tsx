import React from 'react'
import { Card } from 'antd'
import { echartsTheme } from '../../../config/echartTheme';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import ErrorBoundary from '../../../components/ErrorBoundary';
export default class DoubleY extends React.Component {

    state = {
        xAxis: [],
        Users: [],
        Roles: [],
        firstRoles: [],
        firstRoleRate: [],
    }

    componentDidMount() {
        let data:any[] = [
            ["2021/04", "2021/05", "2021/06", "2021/07", "2021/08", "2021/09", "2021/10"],
            [120009, 50729, 42366, 97950, 76727, 57874, 12855],
            [121003, 52932, 44010, 100302, 79162, 85434, 95473],
            [115891, 48906, 40855, 95131, 74069, 55462, 34561],
            [0.9657, 0.8041, 0.7043, 0.6012, 0.7054, 0.8083, 0.9556],
        ]
        let rate = data[4].map(item => {
            return (item * 100).toFixed(2)
        })
        this.setState({
            xAxis: data[0],
            Users: data[1],
            Roles: data[2],
            firstRoles: data[3],
            firstRoleRate: rate
        })
    }

    getOption = () => {
        const { xAxis, Users, Roles, firstRoles, firstRoleRate } = this.state
        let x1 = Math.ceil(Math.max.apply(null, Users) / 5) * 5;
        let x2 = Math.ceil(Math.max.apply(null, Roles) / 5) * 5;
        let x3 = Math.ceil(Math.max.apply(null, firstRoles) / 5) * 5;
        let arr = [x1, x2, x3];
        let Xmax = Math.max(...arr);
        let Ymax = 100;
        let Ymin = 0;
        let TwoYaxis = true;
        Ymax = 100;
        Ymin = 0;
        TwoYaxis = true;

        const legendData = ["注册", "新增创用", "首次创用", "首创用率"]

        let option = {
            title: {
                text: '新增走势'
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    let str = "<div>" + params[0].name.split("[")[0] + "</div>";
                    let newParams = [];
                    let tooltipString = [];
                    tooltipString.push(str);
                    newParams = [...params];
                    newParams.forEach((p) => {
                        if (p.seriesName === "首创用率") {
                            const cont =
                                p.marker + " " + p.seriesName + ": " + p.value + "%" + "<br/>";
                            tooltipString.push(cont);
                        } else {
                            const cont =
                                p.marker +
                                " " +
                                p.seriesName +
                                ": " +
                                p.value.toLocaleString() +
                                "<br/>";
                            tooltipString.push(cont);
                        }
                    });
                    return tooltipString.join("");
                },
            },
            legend: {
                data: legendData,
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: xAxis,
            },
            yAxis: [
                {
                    // 第一条Y轴
                    name: "单位(人)",
                    type: "value",
                    axisLabel: {
                        show: true,
                        interval: "auto",
                        formatter: "{value}",
                        textStyle: {
                            color: "#808695",
                        },
                    },
                    min: 0,
                    max: Xmax,
                    splitNumber: 5,
                    interval: Xmax / 5,
                },
                {
                    //第二条Y轴
                    type: "value",
                    axisLabel: {
                        show: true,
                        interval: "auto",
                        formatter: "{value}%",
                        textStyle: {
                            color: "#808695",
                        },
                    },
                    min: Ymin,
                    max: Ymax,
                    splitNumber: 5,
                    interval: 20,
                },
            ],
            series: [
                {
                    name: "注册",
                    type: "line",
                    data: Users,
                },
                {
                    name: "新增创用",
                    type: "line",
                    data: Roles,
                },
                {
                    name: "首次创用",
                    type: "line",
                    data: firstRoles,
                },
                {
                    //第二条Y轴显示的内容
                    name: "首创用率",
                    type: "line",
                    yAxisIndex: "1",
                    data: firstRoleRate,
                },
            ],
        }
        return option;
    }

    render() {
        return (
            <ErrorBoundary>
                <div>
                    <Card title="双Y轴图">
                        <ReactECharts option={this.getOption()} theme={echartsTheme.theme} style={{ height: 500 }} />
                    </Card>
                </div>
            </ErrorBoundary>
        );
    }
}