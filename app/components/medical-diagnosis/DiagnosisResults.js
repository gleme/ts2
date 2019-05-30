import { Component } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'CID10',
    dataIndex: 'cid',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'Description',
    dataIndex: 'description',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'Category',
    dataIndex: 'category',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  }
];

export default class DiagnosisResults extends Component {
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  render() {
    const { results } = this.props;
    const tableData = results.map(({ code, description, category }) => ({
      key: code,
      cid: code,
      description: description,
      category: category.code
    }));
    return <Table columns={columns} dataSource={tableData} onChange={this.onChange} />;
  }
}
