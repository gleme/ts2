import { Component } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Protocol',
    dataIndex: 'protocol',
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
    title: 'Physician',
    dataIndex: 'physician',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  },
  {
    title: 'CID-10',
    dataIndex: 'diagnosis',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.length - b.length
  }
];

export default class ConsultationList extends Component {
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  render() {
    const { consultations } = this.props;
    const tableData = consultations.map(({ protocol, patient, physician, diagnosis }) => ({
      key: protocol,
      protocol,
      patient: patient.name,
      physician: physician.name,
      diagnosis: diagnosis.reduce((acc, curr) => {
        acc += acc ? ` | ${curr.code}` : curr.code;
        return acc;
      }, '')
    }));
    return <Table columns={columns} dataSource={tableData} onChange={this.onChange} />;
  }
}
