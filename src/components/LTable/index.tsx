import { Table } from 'antd'
import React from 'react'
import "./index.less"
interface Props {
    bordered?: any;
    columns: any;
    dataSource: any;
    pagination?: any;
    rowSelection?: any;
    selectedRowKeys?: any;
    selectedItem?: any;
    selectedIds?: any;
    updateSelectedItem?: (selectedRowKeys: any, selectedItem: any, selectedIds?: any) => void;
}
export default class LTable extends React.Component<Props> {

    onRowClick = (record, index) => {
        // console.log(record, index);
        const { rowSelection } = this.props;
        if (rowSelection.type == 'checkbox') {
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    selectedIds.splice(i, 1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        } else {
            let selectedRowKeys = [index];
            let selectedItem = record;
            this.props.updateSelectedItem(selectedRowKeys, selectedItem)
        }
    }


    tatleInit = () => {
        const { rowSelection, selectedRowKeys } = this.props;
        let select = rowSelection;
        const rowSel: any = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        }
        if (!select) select = false;

        return (
            <Table
                bordered
                {...this.props}
                rowSelection={select ? rowSel : null}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            if (!select) {
                                return;
                            }
                            this.onRowClick(record, index);
                        }
                    };
                }}
            />
        )
    }

    render() {
        return (
            <div>
                {this.tatleInit()}
            </div>
        )
    }
}