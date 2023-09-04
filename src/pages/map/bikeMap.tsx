import React from 'react';
import { Card, Form, message } from 'antd'
import BaseForm from '../../components/BaseForm';
import moment from 'moment';
import { mapService } from './service';

export default class BikeMap extends React.Component {

    state = {
        total_count: 0,
        params: null,
    }


    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }, { id: '4', name: '杭州' }]
        },
        {
            type: '时间查询',
            field: 'range_picker',
            placeholder: ['请选择开始日期', '请选择结束日期'],
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
        }
    ]

    params = {
        page: 1
    }

    requestList = () => {
        const params = this.params
        mapService.getTableList(params).then(res => {
            if (res.status == 0) {
                this.setState({
                    total_count: res.data.total_count
                })
                this.renderMap(res.data);
            }
        })
    }

    componentWillMount() {
        this.requestList();
    }
    map: any;
    // 渲染地图数据
    renderMap = (data) => {
        // console.log(data);
        let list = data.route_list;
        this.map = new globalThis.BMap.Map('container');
        let gps1 = list[0].split(',');
        // 获取经度纬度 Point(经度，纬度)
        let startPoint = new globalThis.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new globalThis.BMap.Point(gps2[0], gps2[1]);

        this.map.centerAndZoom(endPoint, 11);  // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        // 添加地图控件
        this.addMapControl();

        let startPointIcon = new globalThis.BMap.Icon('./assets/start_point.png', new globalThis.BMap.Size(36, 42), {
            imageSize: new globalThis.BMap.Size(36, 42),
            anchor: new globalThis.BMap.Size(18, 42)
        })
        let bikeMarkerStart = new globalThis.BMap.Marker(startPoint, { icon: startPointIcon })
        this.map.addOverlay(bikeMarkerStart);
        let endPointIcon = new globalThis.BMap.Icon('./assets/end_point.png', new globalThis.BMap.Size(36, 42), {
            imageSize: new globalThis.BMap.Size(36, 42),
            anchor: new globalThis.BMap.Size(18, 42)
        })
        let bikeMarkerEnd = new globalThis.BMap.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMarkerEnd);

        //绘制车辆行驶路线
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            routeList.push(new globalThis.BMap.Point(p[0], p[1]))
        })

        let polyLine = new globalThis.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1,
        })
        this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList = [];

        let serviceList = data.service_list;

        serviceList.forEach((item) => {
            servicePointList.push(new globalThis.BMap.Point(item.lon, item.lat))
        })
        let polyServiceLine = new globalThis.BMap.Polygon(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.2
        })
        this.map.addOverlay(polyServiceLine);


        // 添加地图中的汽车图标
        let bikeList = data.bike_list;
        let bikeIcon = new globalThis.BMap.Icon('./assets/car.svg', new globalThis.BMap.Size(36, 42), {
            imageSize: new globalThis.BMap.Size(36, 42),
            anchor: new globalThis.BMap.Size(18, 42)
        })

        bikeList.forEach((item) => {
            let p = item.split(',');
            let point = new globalThis.BMap.Point(p[0], p[1]);
            let bikeMarker = new globalThis.BMap.Marker(point, { icon: bikeIcon })
            this.map.addOverlay(bikeMarker);
        })
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
     * 查询表单
     * @param params 
     * @returns 
     */
    handelFilterSubmit = (params) => {
        // console.log(params);
        if (!params['range_picker']) {
            message.warn('请选择订单时间！！！')
            return;
        }
        // const start = moment(params['range_picker'][0]).format('YYYY-MM-DD HH:mm:ss');
        // const end = moment(params['range_picker'][1]).format('YYYY-MM-DD HH:mm:ss')
        console.log(params);
        this.params = params;
        this.requestList();
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        );
    }
}
