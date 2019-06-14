import { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'Patient',
    dataIndex: 'patient',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'Measles Indicator',
    dataIndex: 'measlesIndicator',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'Score',
    dataIndex: 'score',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'Date',
    dataIndex: 'date',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  }
];

export default class ScreeningList extends Component {
  onChange = () => {};

  render() {
    const { screenings, selectedKeys, onSelectChange } = this.props;
    const tableData = screenings.map(({ id, patient, score, measlesRate, date }) => ({
      key: id,
      id,
      patient: patient.name,
      date: moment(date).format('DD/MM/YYYY'),
      score: `${(measlesRate * 100).toFixed(1)}%`,
      measlesIndicator: score.message
    }));
    return (
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={this.onChange}
        rowSelection={{ selectedRowKeys: selectedKeys, onChange: onSelectChange }}
      />
    );
  }
}
