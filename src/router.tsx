import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import App from './App';
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/noMatch';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import TabsPage from './pages/ui/tabs';
import Gallerys from './pages/ui/gallerys';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import KeyBoardEvent from './pages/test/keyboard';
import FormReg from './pages/form/register';
import Home from './pages/home';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/hightTable';
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/detail';
import User from './pages/user';
import Projects from './pages/projects';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import PermissionUser from './pages/permission';
import webKnow from './pages/webKnow';
import DoubleY from './pages/echarts/doubleY';

export default class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch> {/* 加switch只会访问一个 */}
                        {/* 通用页面 */}
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        } />
                        {/* 登录 */}
                        <Route path="/login" component={Login}></Route>
                        {/* 主页面 */}
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}></Route>
                                    {/* UI */}
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notice} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={TabsPage} />
                                    <Route path="/ui/gallery" component={Gallerys} />
                                    <Route path="/ui/carousel" component={Carousels} />
                                    {/* 表单 */}
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={FormReg} />
                                    {/* 表格 */}
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    {/* 城市管理 */}
                                    <Route path="/city" component={City} />
                                    {/* 订单管理 */}
                                    <Route path="/order" component={Order} />
                                    {/* 员工管理 */}
                                    <Route path="/user" component={User} />
                                    {/* 车辆管理 */}
                                    <Route path="/bikeMap" component={BikeMap}></Route>
                                    {/* echarts图表 */}
                                    <Route path="/charts/bar" component={Bar}></Route>
                                    <Route path="/charts/pie" component={Pie}></Route>
                                    <Route path="/charts/line" component={Line}></Route>
                                    <Route path="/charts/doubleY" component={DoubleY}></Route>


                                    {/* 富文本 */}
                                    <Route path="/rich" component={RichText}></Route>

                                    {/* 权限管理 */}
                                    <Route path="/permission" component={PermissionUser}></Route>


                                    {/* 项目列表 */}
                                    <Route path="/projects" component={Projects} />

                                    {/* 测试专用 */}
                                    <Route path="/test/keydown" component={KeyBoardEvent} />

                                    {/* 获取前端知识文章（掘金渠道） */}
                                    <Route path="/webKnow" component={webKnow} />

                                    {/* <Route component={NoMatch}></Route> 404页面*/}
                                    {/* 重定向 */}
                                    <Redirect to="/home" />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}
