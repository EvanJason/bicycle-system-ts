import React from 'react';
import { Button, Card, message, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../index.less'

const { TabPane } = Tabs



export default class TabsPage extends React.Component {

    state = {
        newTabIndex: 0,
        activeKey: null,
        panes: [],
    }

    componentDidMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Content 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Content 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Content 3',
                key: '3'
            }
        ];
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }


    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab ${this.state.newTabIndex++}`;
        panes.push({ title: `NewTab ${this.state.newTabIndex}`, content: `New Tab Pane ${this.state.newTabIndex}`, key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
        // message.success("您删除了页签：" + activeKey)
    };


    handleCallback = (key) => {
        message.info("Hi,您选择了页签：" + key)
    }

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>欢迎学习React课程</TabPane>
                        <TabPane tab="Tab 3" key="3">React是一个非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><PlusOutlined />Tab 1</span>} key="1">欢迎学习React课程</TabPane>
                        <TabPane tab={<span><EditOutlined />Tab 2</span>} key="2">欢迎学习React课程</TabPane>
                        <TabPane tab={<span><DeleteOutlined />Tab 3</span>} key="3">React是一个非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <div style={{ marginBottom: 16 }}>
                        <Button onClick={this.add}>添加</Button>
                    </div>
                    <Tabs
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        );
    }
}