import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import About from './about'
import Main from './main'
import Topic from './topic'

export default class Home extends React.Component {

    // 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                        <hr />
                        {/* exact 精确匹配 当没有exact时，是会合成多个，比如/about，就会变成main和about页面的 */}
                        <Switch>
                            <Route path="/" component={Main} exact></Route>
                            <Route path="/about" component={About}></Route>
                            <Route path="/topics" component={Topic}></Route>
                        </Switch>
                    </ul>
                </div>
            </HashRouter>
        )
    }

}