import { Card, message } from 'antd'
import React from 'react'
import './detail.less'
import { orderService } from './service';

interface Props {
    match?: any,
}
export default class OrderDetail extends React.Component<Props> {

    state = {
        orderInfo: null,
    }
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) this.getDetailInfo(orderId);
    }

    getDetailInfo = (id) => {
        const params = {
            orderId: id
        }
        orderService.getOrderDetail(params).then(res => {
            if (res.status === 0) {
                // console.log(res);
                this.setState({
                    orderInfo: res.data
                })
                this.renderMap(res.data);
            } else {
                message.warn(res.msg);
            }
        })
    }



    map: any;
    /**
     * 创建百度地图（这里的globalThis，是为了兼容window）
     * @param result 
     */
    renderMap = (result) => {
        this.map = new globalThis.BMap.Map('orderDetailMap');
        // this.map.centerAndZoom('北京', 11); // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        // 添加地图控件
        this.addMapControl();
        // 调用路线图绘制方法
        this.drawBikeRoute(result.position_list);
        // // 调用服务区绘制方法
        this.drwaServiceArea(result.area);
    }

    /**
     * 添加地图控件
     */
    addMapControl = () => {
        let map = this.map;
        map.addControl(new globalThis.BMap.ScaleControl({ anchor: globalThis.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new globalThis.BMap.NavigationControl({ anchor: globalThis.BMAP_ANCHOR_TOP_RIGHT }));
    }

    /**
     * 绘制用户的行驶路线
     * @param positionList 
     */
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];

            startPoint = new globalThis.BMap.Point(first.lon, first.lat);
            // 定义标注图标 
            let startIcon = new globalThis.BMap.Icon('./assets/start_point.png', new globalThis.BMap.Size(36, 42), {
                imageSize: new globalThis.BMap.Size(36, 42),
                anchor: new globalThis.BMap.Size(18, 42)
            })

            let startMarker = new globalThis.BMap.Marker(startPoint, { icon: startIcon }); // 创建开始标注   
            this.map.addOverlay(startMarker);// 将开始标注添加到地图中


            endPoint = new globalThis.BMap.Point(last.lon, last.lat);
            // 定义标注图标 
            let endIcon = new globalThis.BMap.Icon('./assets/end_point.png', new globalThis.BMap.Size(36, 42), {
                imageSize: new globalThis.BMap.Size(36, 42),
                anchor: new globalThis.BMap.Size(18, 42)
            })
            let endMarker = new globalThis.BMap.Marker(endPoint, { icon: endIcon }); // 创建结束标注
            this.map.addOverlay(endMarker);// 将结束标注添加到地图中

            // 连接路线图
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new globalThis.BMap.Point(point.lon, point.lat));
            }

            let polyline = new globalThis.BMap.Polyline(trackPoint, {
                strokeColor: '#1890ff',
                strokeWeight: 3,
                strokeOpacity: 1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11); // 初始化地图,设置中心点坐标和地图级别,聚焦在中心点位置以便查看
        }
    }


    /**
     * 绘制服务区
     * @param {*} positionList
     */
    drwaServiceArea = (positionList) => {
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new globalThis.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new globalThis.BMap.Polygon(trackPoint, {
            strokeColor: '#ff0000',
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.3
        })
        this.map.addOverlay(polygon);
    }

    render() {
        const { orderInfo } = this.state;
        return (
            <div>
                <Card>
                    {/* 地图功能实现 */}
                    <div id="orderDetailMap" className="order-map"></div>

                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo?.mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo?.order_sn || '-'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo?.bike_sn || '-'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo?.user_name || '-'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo?.mobile || '-'}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo?.start_location || '-'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo?.end_location || '-'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo?.distance / 1000 || 0}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>)
    }
}
