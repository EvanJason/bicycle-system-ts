import { Avatar, Button, Card, Col, List, Row, Skeleton } from 'antd';
import axios from 'axios'
import moment from 'moment';
import React, { Component } from 'react'

export default class webKnow extends Component {

    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        count: 1,
        pageIndex: 8,
    }

    componentDidMount() {
        this.request(res => {
            let data = [];
            if (res.status === 200 && res.data.success) {
                data = res.data.data
            } else {
                data = [];
            }
            this.setState({
                initLoading: false,
                list: data,
                data,
            });
        });
    }

    request = callback => {
        const { pageIndex, count } = this.state
        const params = {
            params: {
                page: count, //页数
                limit: pageIndex, //每一页的主题数量
                tab: 'all', //String 主题分类。目前有 ask share job good all
                mdrender: false //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
            }
        }

        axios.get('https://cnodejs.org/api/v1/topics', params).then(res => {
            console.log(res);
            callback(res);
        })
    };

    onLoadMore = () => {
        // console.log(this.state.count);
        let count = ++this.state.count;

        this.setState({
            loading: true,
            count: count,
        });

        this.request(res => {
            let data = [];
            if (res.status === 200 && res.data.success) {
                data = res.data.data.map(item => {
                    item.loading = true
                    return item
                })
            } else {
                data = [];
            }

            const result = this.state.data.concat(data);
            // console.log(result);
            this.setState({
                loading: false,
                list: result,
                data: result,
            })
            let root = document.querySelector('.container .main');
            if (root) root.scrollTop = 99999999
            setTimeout(() => {
                this.setState(
                    {
                        list: result.map(item => {
                            item.loading = false
                            return item
                        }),
                        count: count++,
                    },
                    () => {
                        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                        // In real scene, you can using public method of react-virtualized:
                        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                        window.dispatchEvent(new Event('resize'));
                    },
                );
            }, 1000);
        });
    }

    render() {
        const { initLoading, loading, list } = this.state
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>加载更多</Button>
                </div>
            ) : null;
        return (
            <Card>
                <List
                    style={{ minHeight: 350 }}
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <Skeleton title={false} loading={item.loading} avatar active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.author.avatar_url} />
                                    }
                                    title={

                                        <Row>
                                            <Col span={20}>{item.title}</Col>
                                            <Col span={4} style={{ textAlign: 'right' }}>创建时间：{moment(item.create_at).format('YYYY-MM-DD')}</Col>
                                        </Row>
                                    }
                                    description={
                                        <Row>
                                            <Col span={20}><a href={'https://cnodejs.org/topic/' + item.id} target="_blank">{item.content.length < 100 ? item.content : item.content.substring(0, 150).concat(' ...')}</a></Col>
                                            <Col span={4} style={{ textAlign: 'right' }}>最新回复：{moment(item.last_reply_at).format('YYYY-MM-DD')}</Col>
                                        </Row>
                                    }
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Card>

        )
    }
}