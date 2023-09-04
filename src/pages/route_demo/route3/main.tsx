import React from 'react' // 在 React V15.5 版本之前，类型校验的能力，和 react 是在一起；
import { Link } from 'react-router-dom'

export default class Main extends React.Component {

    // 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
    render() {
        return (
            <div>
                main pages
                <br />
                <Link to="/main/test-id">嵌套路由1</Link>
                <br />
                <Link to="/main/456">嵌套路由2</Link>
                <hr />
                {this.props.children}
            </div>
        )
    }

}