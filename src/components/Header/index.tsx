import { Button, Col, Dropdown, Menu, Row } from 'antd';
import React from 'react';
import { common } from '../../common/public';
import './index.less';
import { connect } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
interface Props {
    menuType?: any,
    history?: any,
    menuName?: any,
}

class Header extends React.Component<Props> {
    state = {
        userName: null,
        sysTime: null
    };

    componentWillMount() {
        this.setState({
            userName: '深海如梦'
        });
        setInterval(() => {
            let sysTime = common.getDateFormatStyle(new Date().getTime());
            this.setState({
                sysTime
            });
        }, 1000);
    }

    exit = () => {
        window.location.href = './#/login'
    }

    render() {
        const menuType = this.props.menuType;
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={this.exit}>退出</a>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span={6} className="logo">
                                <span>LCar System</span>
                            </Col>
                            : null
                    }
                    <Col span={menuType ? 18 : 24}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="link" style={{ marginLeft: 10, color: menuType ? '#f9f9f9' : null }}>{this.state.userName} <DownOutlined /></Button>
                        </Dropdown>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {this.props.menuName}
                            </Col>
                            <Col span="20" className="date">
                                时间： <span style={{ color: '#000000', fontWeight: 'bold' }}>{this.state.sysTime}</span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}
const mapStateToPorps = (state: any) => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToPorps)(Header);