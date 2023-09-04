import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import About from '../route1/about';
import Info from './info';
import Main from './main';
import Topic from '../route1/topic';
import Home from './home';
import NoMatch from './noMatch';

export default class IRoute extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <Home>
                    {/* 只匹配一个 */}
                    <Switch>
                        {/* exact 精确匹配，比如/home 有设置exact 就只会匹配这个/home, 没有设置的话，比如/home 会先去匹配/，再去匹配home */}
                        <Route path="/main" render={() =>
                            <Main>
                                <Route path="/main/:id" component={Info}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route exact path="/about/abc" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}
