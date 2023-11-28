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

export const MoviesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: FieldType) => {
    await axios.post('http://localhost:8080/movies', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const movieDataSource = [
    {
      key: '1',
      name: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      release: 1994,
    },
    {
      key: '2',
      name: 'The Godfather',
      director: 'Francis Ford Coppola',
      release: 1972,
    },
    {
      key: '3',
      name: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      release: 1994,
    },
    {
      key: '4',
      name: 'The Dark Knight',
      director: 'Christopher Nolan',
      release: 2008,
    },
    {
      key: '5',
      name: 'Inception',
      director: 'Christopher Nolan',
      release: 2010,
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
      <Table dataSource={movieDataSource} columns={columns} />
      <Modal
        title="Adicionar novo filme"
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
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
