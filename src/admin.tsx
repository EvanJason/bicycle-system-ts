import React from 'react';
import { Row, Col, message } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import './style/common.less';
import watermark from './common/watermark';
export default class Admin extends React.Component {


  componentDidMount() {
    // 水印
    watermark.set('深海如梦', { w: 160, h: 128, top: '0px', left: '0px', width: '150%', height: '150%' });
  }


  render() {
    return (
      /* 主页面结构，嵌套相关页面 */
      <div>
        <Row className="container">
          <Col span="3" className="nav_left">
            <NavLeft />
          </Col>
          <Col span="21" className="main">
            <Header />
            <Row className="content">
              {this.props.children}
            </Row>
            <Footer />
          </Col>
        </Row>
      </div>
    );
  }
}