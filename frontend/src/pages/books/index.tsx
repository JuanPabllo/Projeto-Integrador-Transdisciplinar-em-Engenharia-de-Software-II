import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Table,
  Typography,
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { FieldType } from './types';

export const BooksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/books', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data.map((item: FieldType) => {
      return {
        name: item.name,
        release: format(parseISO(item.release), 'dd/MM/yyyy'),
        writer: item.writer,
      };
    });

    setData(data);
  };

  const onFinish = async (values: FieldType) => {
    await axios.post('http://localhost:8080/books', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await fetchData();
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Flex justify="space-between">
        <Title level={3}>Lista de livro</Title>
        <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
          Adicionar novo livro
        </Button>
      </Flex>
      <Table dataSource={data} columns={columns} />
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
            <DatePicker locale={locale} format="DD/MM/YYYY" />
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
