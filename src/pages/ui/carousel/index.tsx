import React from 'react';
import { Card, Carousel, } from 'antd';

import '../index.less'
export default class Carousels extends React.Component {



    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant Motion Banner - <span style={{ color: '#f1c40f' }}>React</span></h3></div>
                        <div><h3>Ant Motion Banner - <span style={{ color: '#e74c3c' }}>Vue</span></h3></div>
                        <div><h3>Ant Motion Banner - <span style={{ color: '#3498db' }}>Angular</span></h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-wrap">
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src="./carousel-img/carousel-1.jpg" width="100%" alt="" />
                        </div>
                        <div>
                            <img src="./carousel-img/carousel-2.jpg" width="100%" alt="" />
                        </div>
                        <div>
                            <img src="./carousel-img/carousel-3.jpg" width="100%" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}