import React from "react";
import { Alert } from 'antd';

interface ErrorBoundaryProps {
    children: React.ReactNode,
    height?: number,
}

interface StateType {
    hasError: boolean,
    Error?: null | Error,
    ErrorInfo?: null | React.ErrorInfo,
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, StateType> { //错误边界
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            Error: null,
            ErrorInfo: null,
        };
    }

    // 控制渲染降级UI
    static getDerivedStateFromError(error: Error): StateType {
        return { hasError: true };
    }

    // 捕获抛出异常
    async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // do something
        this.setState((preState) => (
            { hasError: preState.hasError, Error: error, ErrorInfo: errorInfo }
        ));
    }

    render() {
        const { hasError, Error, ErrorInfo } = this.state;
        const { height, children } = this.props;
        if (hasError) {
            // 降级后的 UI 并渲染
            return <div
                style={{
                    width: '100%',
                    height: height || 300,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Alert
                    message={`Error:${Error?.message}`}
                    description={ErrorInfo?.componentStack}
                    type="error"
                    showIcon
                />
            </div>
        }

        return <div>
            {children}
        </div>
    }
}

export default ErrorBoundary