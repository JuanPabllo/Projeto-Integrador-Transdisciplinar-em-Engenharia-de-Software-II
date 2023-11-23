import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Input,
  Modal,
  Table,
  Typography,
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { useState } from 'react';
import { FieldType } from './types';

export const MoviesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      director: 32,
      release: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      director: 42,
      release: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Diretor',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: 'Lançamento',
      dataIndex: 'release',
      key: 'release',
    },
    {
      title: 'Ações',
      key: 'action',
      render: () => (
        <Button
          danger
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  return (
    <div>
      <Flex justify="space-between">
        <Title level={3}>Lista de filmes</Title>
        <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
          Adicionar novo filme
        </Button>
      </Flex>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Adicionar novo filme"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Nome" name="name">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Diretor" name="director">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Lançamento" name="release">
            <DatePicker
              locale={locale}
              format="DD/MM/YYYY"
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
