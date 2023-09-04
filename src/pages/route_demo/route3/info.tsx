import React from 'react' // 在 React V15.5 版本之前，类型校验的能力，和 react 是在一起；

interface Props {
    match?: any
}
/* TODO 这边加泛型，是因为在ts,this.pros.match不在match属性,设置后生效 */
export default class Info extends React.Component<Props> {

    // 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
    render() {
        return (
            <div>
                测试动态路由功能
                <br />
                动态路由的值：{this.props.match.params.id}
            </div>
        )
    }

}