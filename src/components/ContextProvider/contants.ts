//声明
export interface AppStateValue {
    token: string;
    headImgUrl: string;
    userId: string | number;
    realName: string;
    userPhone: string;
}

//初始值
export const defaultContextValue: AppStateValue = {
    token: '',
    headImgUrl: '',
    userId: '',
    realName: '',
    userPhone: '',
};