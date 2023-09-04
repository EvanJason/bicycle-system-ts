import { Button, Layout } from 'antd';
import React, { Fragment } from 'react';
import './index.less'
import { ArrowRightOutlined } from '@ant-design/icons';

/* mojs动画 */
import mojs from '@mojs/core';
// import MojsPlayer from '@mojs/player';

const { Content } = Layout;

interface Props {
    history?: any
}


export default class Login extends React.Component<Props> {


    state = {
        isShow: false,
    }

    enterSys = () => {
        this.props.history.push({ pathname: '/home' })
    }

    mojs = () => {
        const COLORS = {
            white: '#ffffff',
            black: '#000000',
            green: '#49F2CC',
            pink: '#777',
            grey: '#29363B',
            cyan: 'cyan',
            yellow: '#FFE202',
            hotpink: 'deeppink',
        };
        const y = -50;
        const staticTriangle = new mojs.Shape({
            shape: 'polygon',
            duration: 1160,
            radius: { 60: 65 },
            angle: -60,
            fill: 'none',
            stroke: COLORS.white,
            strokeWidth: { 30: 5 },
            easing: 'cubic.out',
            isShowEnd: false,
            width: 170,
            height: 170,
            y
        });

        // small triangles

        let shift1 = 87,
            shift2 = 50,
            SMALL_OPTS = {
                shape: 'polygon',
                duration: 1160,
                radius: 14,
                angle: -60,
                fill: 'none',
                stroke: COLORS.white,
                strokeWidth: { 14: 4 },
                easing: 'expo.out',
                isShowEnd: false
            };

        let small1 = new mojs.Shape({
            ...SMALL_OPTS,
            x: { 0: -shift1 },
            y: { [y]: -shift2 + y }
        });

        let small2 = new mojs.Shape({
            ...SMALL_OPTS,
            x: { 0: shift1 },
            y: { [y]: -shift2 + y }
        });

        let small3 = new mojs.Shape({
            ...SMALL_OPTS,
            y: { [y]: 1.15 * shift1 + y }
        });

        // supporting large triangles

        let SUPP_OPTS = {
            shape: 'polygon',
            duration: 1000,
            radius: { 40: 20 },
            angle: -60,
            fill: 'white',
            fillOpacity: { 0: 1 },
            stroke: COLORS.white,
            strokeWidth: { 7: 0 },
            easing: 'cubic.out',
            delay: 60,
            y,
            // x:            1,
            isShowEnd: false
        }
        let support1 = new mojs.Shape(SUPP_OPTS);

        let support2 = new mojs.Transit({
            ...SUPP_OPTS,
            strokeWidth: { 4: 0 },
            fill: 'none',
            // duration:     810,
            radius: { 85: 95 }
        });

        const timeline = new mojs.Timeline({
            repeat: 2,
        });
        timeline.add(staticTriangle, [small1, small2, small3], [support1, support2]);
        timeline.play();
        var idObject = document.createElement('div');
        idObject.setAttribute('id', 'mojs');
        idObject.append(timeline)
    }
    componentDidMount() {
        this.mojs();
        setTimeout(() => {
            var idObject = document.getElementById('mojs');
            if (idObject) idObject.parentNode.removeChild(idObject);
            setTimeout(() => {
                this.setState({ isShow: true });
            }, 200);
        }, 3600);
    }

    render() {
        const { isShow } = this.state
        return (
            // <div style={{ textAlign: 'center', fontSize: 20 }}>
            //     登录
            //     <Link to='/admin'><Button type="primary">进入系统</Button></Link>
            // </div>
            <Layout>
                <Layout className="site-layout" style={{ overflow: 'hidden', height: '100vh', background: isShow ? '#ffffff' : '#000000' }}>
                    <Content style={{ margin: '0px 18px 0', overflow: 'hidden' }}>
                        {
                            isShow ?
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                                    <img style={{ marginBottom: 20, borderRadius: '10%', width: 150 }} src="./assets/logo.svg" />
                                    <h2>欢迎使用 Lcar System</h2>
                                    <Button type="primary" style={{ marginTop: 10 }} onClick={this.enterSys}>进入<ArrowRightOutlined /></Button>
                                </div> : null
                        }
                    </Content>
                </Layout>
            </Layout>
        );
    }
}