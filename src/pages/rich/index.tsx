import React from 'react'
import { Card } from 'antd'
import ReactWEditor from 'wangeditor-for-react';
export default class RichText extends React.Component {

    state = {
        editerContent: null,
    }

    render() {
        const { editerContent } = this.state;
        return (
            <div>
                <Card title="富文本编辑器">
                    <ReactWEditor
                        config={null}
                        defaultValue={editerContent}
                        linkImgCallback={(src, alt, href) => {
                            // 插入网络图片的回调事件
                            console.log('图片 src ', src)
                            console.log('图片文字说明', alt)
                            console.log('跳转链接', href)
                        }}
                        onlineVideoCallback={(video) => {
                            // 插入网络视频的回调事件
                            console.log('插入视频内容', video)
                        }}
                        onChange={(html) => {
                            console.log('onChange html:', html)
                            this.setState({
                                editerContent: html
                            })
                        }}
                        onBlur={(html) => {
                            console.log('onBlur html:', html)
                        }}
                        onFocus={(html) => {
                            console.log('onFocus html:', html)
                        }}
                    />
                </Card>
                <Card>
                    <label style={{ color: '#ff4757' }}>输入的内容：</label>{editerContent}
                </Card>
            </div>
        );
    }
}