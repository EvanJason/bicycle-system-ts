import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

    // 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <hr />
                    {this.props.children}
                </ul>
            </div>
        )
    }

}