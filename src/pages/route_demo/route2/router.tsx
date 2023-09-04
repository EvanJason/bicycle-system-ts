import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import About from '../route1/about';
import Main from './main';
import Topic from '../route1/topic';
import Home from './home';
export default class IRoute extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    {/* exact 精确匹配，比如/home 有设置exact 就只会匹配这个/home, 没有设置的话，比如/home 会先去匹配/，再去匹配home */}
                    <Route path="/home" render={() =>
                        <Main>
                            <Route path="/home/a" component={About}></Route>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                </Home>
            </Router>
        );
    }
}
