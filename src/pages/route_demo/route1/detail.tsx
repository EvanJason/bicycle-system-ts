import React from 'react' // 在 React V15.5 版本之前，类型校验的能力，和 react 是在一起；

export default class Detail extends React.Component {
    // 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
    render() {
        return (
            <div>
                内容
            </div>
        )
    }
}