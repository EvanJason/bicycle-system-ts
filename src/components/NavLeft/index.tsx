import React from 'react';
import menuList from '../../config/menuConfig';
import { Menu, message } from 'antd';

import './index.less';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action';
import { indexService } from './service';
import { commonParams } from '../../common/params';
const { SubMenu } = Menu;

interface Props {
    dispatch?: any,
}

class NavLeft extends React.Component<Props> {

    state = {
        menuTreeNode: [],
        currentKey: null,
        menuList: [],
        userName: null,
    };

    componentDidMount() {
        this.request();
    }

    request = () => {
        this.setState({
            loading: true
        })
        indexService.getMenuList().then(res => {
            if (res.status === 0) {
                // console.log(res.data.menuList);
                this.setState({
                    menuList: res.data.menuList,
                    userName: res.data.username
                })
                // 获取菜单树，并渲染菜单
                const menuTreeNode = this.renderMemu(res.data.menuList);
                // 去除#和其他字符，保存当前路由名字，设置菜单选中，即刷新的时候菜单还是选中状态
                let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
                this.setState({
                    currentKey,
                    menuTreeNode: menuTreeNode
                });
                commonParams.menuList = res.data.menuList.filter(item => {
                    if (item.type === 1) {
                        return item;
                    }
                });
                console.log(commonParams.menuList);
            } else {
                message.warn('获取菜单失败，请联系管理员设置');
            }

        })
    }

    // 菜单渲染 菜单递归
    renderMemu = (data) => {
        return data.map((item) => {
            if (item.type === 1) {
                if (item.children) {
                    return (
                        <SubMenu title={item.title} key={item.key}>
                            {this.renderMemu(item.children)}
                        </SubMenu>
                    );
                }
                return <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>;
            }
        });
    };

    handleClick = ({ item, key }) => {
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey: key
        })
    }

    render() {
        const { menuTreeNode, currentKey } = this.state;
        return (
            <div>
                <div className="logo">
                    <img src="./assets/logo.svg" alt="" />
                    <Link to='/home'><h1>Lcar System</h1></Link>
                </div>
                {/* 菜单选中状态 */}
                <Menu mode="inline" theme="dark" selectedKeys={[currentKey]} onClick={this.handleClick}>
                    {menuTreeNode}
                </Menu>
            </div>
        );
    }
};
export default connect()(NavLeft);