import React from 'react';
import { Card, Button, notification } from 'antd';

import '../index.less'
export default class Notice extends React.Component {

    openNotification = (type: string, direction?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
        if (direction) {
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message: '发工资了',
            description: '上个月考勤25天，迟到0天，实发工资20000，请笑纳'
        });
    }

    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
                </Card>
            </div>
        );
    }
}