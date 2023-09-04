import { Button, Card } from 'antd';
import React from 'react';
export default class KeyBoardEvent extends React.Component {

    state = {
        keyName: null,
        result: null
    }

    clickEvent = () => {
        document.addEventListener('keydown', this.triggerKeyDown)
    }

    triggerKeyDown = (e) => {
        // console.log(e.code);
        this.setState({ keyName: e.code })
        const actions = new Map([
            ['KeyA', () => {
                this.setState({
                    result: <span style={{ color: '#3498db', fontSize: 20 }}>1</span>,
                })
            }],
            ['KeyD', () => {
                this.setState({
                    result: <span style={{ color: '#3498db', fontSize: 20 }}>2</span>,
                })
            }],
            ['KeyE', () => {
                this.setState({
                    result: <span style={{ color: '#3498db', fontSize: 20 }}></span>,
                })
            }],
            ['default', () => {
                this.setState({
                    result: <span style={{ color: 'red', fontSize: 20 }}>没有</span>,
                })
            }],
        ])
        let result = actions.get(e.code) || actions.get('default')
        result();

    }

    render() {
        const { keyName, result } = this.state
        return (
            <div>
                <Card>
                    <p>点击后，进行键盘事件</p>
                    <Button onClick={this.clickEvent} style={{ marginBottom: 20 }}>点击</Button>
                    <p>键盘名：{keyName}</p>
                    <p>事件：{result}</p>
                </Card>
            </div>
        )
    }
}