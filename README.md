# 说明

## 项目工程化

1. 项目架构设计
2. 目录结构定义
3. 制定项目开发规范（ESLint 规范）
4. 模块化、组件化
5. 前后端接口规范
6. 性能优化、自动化部署（压缩、合并、打包）

## 2021.09.24

封装表单

## 2021.09.30

```typescript
/*
多表单联动
通过 Form.Provider 在表单间处理数据。本例子中，Modal 的确认按钮在 Form 之外，
通过 form.submit 方法调用表单提交功能。反之，则推荐使用 <Button htmlType="submit" /> 调用 web 原生提交逻辑。
*/
// this.userForm.form.current.submit();
this.userForm.form.current
	.validateFields()
	.then((values) => {
		values.birthday = moment(values.birthday).format('YYYY-MM-DD');
		const params = {
			params: values,
		};
		userService.oprateUser(type, params).then((res) => {
			if (res.status === 0) {
				message.success(res.msg);
				this.userForm.form.current.resetFields();
				this.setState({
					isVisible: false,
				});
				this.request();
			} else {
				message.warn(res.msg);
			}
		});
	})
	.catch((info) => {
		console.log('Validate Failed:', info);
	});
```

## 2021.10.02

授权的学习

### redux 的学习

首先明确一点，Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。

曾经有人说过这样一句话。

"如果你不知道是否需要 Redux，那就是不需要它。"

Redux 的创造者 Dan Abramov 又补充了一句。

"只有遇到 React 实在解决不了的问题，你才需要 Redux 。"

简单说，如果你的 UI 层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

用户的使用方式非常简单
用户之间没有协作
不需要与服务器大量交互，也没有使用 WebSocket
视图层（View）只从单一来源获取数据
上面这些情况，都不需要使用 Redux。

用户的使用方式复杂
不同身份的用户有不同的使用方式（比如普通用户和管理员）
多个用户之间可以协作
与服务器大量交互，或者使用了 WebSocket
View 要从多个来源获取数据
上面这些情况才是 Redux 的适用场景：多交互、多数据源。

从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。

某个组件的状态，需要共享
某个状态需要在任何地方都可以拿到
一个组件需要改变全局状态
一个组件需要改变另一个组件的状态
发生上面情况时，如果不使用 Redux 或者其他状态管理工具，不按照一定规律处理状态的读写，代码很快就会变成一团乱麻。你需要一种机制，可以在同一个地方查询状态、改变状态、传播状态的变化。

总之，不要把 Redux 当作万灵丹，如果你的应用没那么复杂，就没必要用它。另一方面，Redux 只是 Web 架构的一种解决方案，也可以选择其他方案。

#### Redux 基本介绍

1. 单向数据流：从父组件流向子组件，兄弟组件无法共享数据
2. State:React 中的状态，是只读对象，不可直接修改
3. Reducer: 基本函数，用于对 State 的业务处理
4. Action:普通对象，用于描述事件行为，改变 State

#### Redux 设计思想

Redux 的设计思想很简单，就两句话。

（1）Web 应用是一个状态机，视图与状态是一一对应的。

（2）所有的状态，保存在一个对象里面。

#### Redux 安装

yarn add redux --save

yarn add react-redux --save

#### Redux 集成

1. 创建 Aciton 模块
2. 创建 Reducer 模块
3. 创建 Store 模块
4. 通过 connect 方法将 React 组件和 Redux 连接起来
5. 添加 Porvider 作为项目的各组件，用于数据的存储

## 课程总结

1. 从 UI 基础部分到共享单车核心模块的实战
2. 从 React 过渡到全家桶
3. 从项目简单开发到项目工程化，规范化开发
4. 业务类型涵盖：基础 UI、增删改查、地图、图表、权限、菜单、公共机制、主题定制
5. 项目开发技巧、调试经验
6. 打包部署（如果是要域名的子目录下，需要使用相对路径）

## 启动

yarn 

yarn start

yarn build 打包