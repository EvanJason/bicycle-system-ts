import { Button, Checkbox, DatePicker, Form, FormInstance, Input, Select } from 'antd'
import moment from 'moment';
import React from 'react'
import { common } from '../../common/public';


const FormItem = Form.Item
const { RangePicker } = DatePicker;
interface Props {
    formList?: any;
    filterSubmit?: any;
}
export default class FilterForm extends React.Component<Props> {

    disabledDate(current) {
        return current && current > moment().endOf('day');
    }

    handleFilterSubmit = (values) => {
        this.props.filterSubmit(values);
    }

    formRef = React.createRef<FormInstance>();

    reset = () => {
        this.formRef.current!.resetFields();
    }

    initFormList = () => {
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || null;
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '时间查询') {
                    const rangeDate = <FormItem label="订单时间" name={[field]} key={field}>
                        <RangePicker allowClear placeholder={placeholder} disabledDate={this.disabledDate} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(rangeDate)
                } else if (item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} name={[field]} initialValue={initialValue} key={field}>
                        <Input type="text" placeholder={placeholder} />
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} name={[field]} initialValue={initialValue} key={field}>
                        <Select
                            style={{ width: width }}
                            placeholder={placeholder}
                        >
                            {common.getOptionList(item.list)}
                        </Select>
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} name={[field]} valuePropName="checked" initialValue={initialValue} key={field}>
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                } else if (item.type == 'DATE') {
                    const Date = <FormItem label={label} name={[field]} initialValue={initialValue} key={field}>
                        <DatePicker allowClear placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(Date)
                }
            })
        }
        return formItemList;
    }

    render() {
        return (
            <Form layout="inline" ref={this.formRef} onFinish={this.handleFilterSubmit}>
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} htmlType="submit">查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}