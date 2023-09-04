import React from 'react'
import { Row, Col } from 'antd';
import Header from './components/Header'
import './style/common.less'


export default class Common extends React.Component {
    render() {
        return (
            /* 通用界面结构 */
            <div>
                <Row className="simple-page">
                    <Col span={24}><Header menuType="second" /></Col>
                </Row>
                <Row className="content">
                    <Col span={24}>{this.props.children}</Col>
                </Row>
            </div>
        );
    }
}