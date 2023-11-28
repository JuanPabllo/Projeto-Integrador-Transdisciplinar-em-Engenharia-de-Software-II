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
import axios from 'axios';
import { useState } from 'react';
import { FieldType } from './types';

export const BooksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: FieldType) => {
    await axios.post('http://localhost:8080/books', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const bookDataSource = [
    {
      key: '1',
      name: 'The Catcher in the Rye',
      writer: 'J.D. Salinger',
      release: 1951,
    },
    {
      key: '2',
      name: 'To Kill a Mockingbird',
      writer: 'Harper Lee',
      release: 1960,
    },
    {
      key: '3',
      name: '1984',
      writer: 'George Orwell',
      release: 1949,
    },
    {
      key: '4',
      name: 'The Great Gatsby',
      writer: 'F. Scott Fitzgerald',
      release: 1925,
    },
    {
      key: '5',
      name: 'Pride and Prejudice',
      writer: 'Jane Austen',
      release: 1813,
    },
  ];

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Escritor (a)',
      dataIndex: 'writer',
      key: 'writer',
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
        <Title level={3}>Lista de livro</Title>
        <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
          Adicionar novo livro
        </Button>
      </Flex>
      <Table dataSource={bookDataSource} columns={columns} />
      <Modal
        title="Adicionar novo livro"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Nome" name="name">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Escritor(a)" name="writer">
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
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
