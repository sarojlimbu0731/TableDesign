import {
  Button,
  Table,
  Drawer,
  Space,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import React from "react";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function TableDesign() {
  const [open, setOpen] = useState(false);
  const [isupdate, setIsupdate]=useState(false)
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
      duration: 2,
    });
  };

  const cancel = (e) => {
    message.error("cancel");
  };

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "practice1",
      email: "practice1@gmail.com",
      address: "new baneshowr",
    },
    {
      id: 2,
      name: "practice2",
      email: "practice2@gmail.com",
      address: "koteshwor",
    },
    {
      id: 3,
      name: "practice3",
      email: "practice3@gmail.com",
      address: "nakkhu",
    },
    {
      id: 4,
      name: "practice4",
      email: "practice4@gmail.com",
      address: "balaju",
    },
    {
      id: 5,
      name: "practice1",
      email: "practice1@gmail.com",
      address: "kantipath",
    },
  ]);

  const columnFields = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "NAME",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "ADDRESS",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "ACTION",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => handleUserEdit(record)}
              style={{ color: "green", cursor: "pointer" }}
            />
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => handleUserDelete(record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{ color: "red", marginLeft: "2rem", cursor: "pointer" }}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const openAddUserDrawer = () => {
    setIsupdate(false)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUserEdit = (record) => {
    setIsupdate(true)
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      email: record.email,
      address: record.address,
    });
    setOpen(true);
  };

  const handleUserDelete = (record) => {
    message.success("Delete successful");
    setDataSource((prev) => {
      return prev.filter((data) => record.id !== data.id);
    });
  };

  return (
    <div className="table_container">
      <Space>
        <Button type="primary" onClick={openAddUserDrawer}>
          Add new_user
        </Button>
      </Space>

      {/* add_user drawer code */}
      <Drawer
        title={isupdate?"Update the user detail":`Add the user detail`}
        placement="right"
        size="samll"
        onClose={onClose}
        open={open}
      >
        {contextHolder}
        <Form
          form={form}
          autoComplete="off"
          wrapperCol={{ span: 18 }}
          labelCol={{ span: 6 }}
          onFinish={(values) => {
            if(isupdate){
                let index=dataSource.findIndex(data=>data.id===values.id)
                if (index !== -1){
                   setDataSource(prev=>{
                    prev.splice(index,1)
                    return [...prev,values]
                   })
                }
            }else{
              setDataSource((prev) => {
                return [...prev, values];
              });
            }
            onClose();
            success();
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[
              {
                required: true,
                message: "Id filled must be provided",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="enter an Id"></Input>
          </Form.Item>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "name field must be filled",
              },
              {
                min: 3,
                message: "name must have atleast 3 characters",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="enter a full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "please enter the valid email",
              },
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <Input placeholder="please enter an email"></Input>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "address field must be filled",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="enter a address"></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Space>
              <Button block type="primary" htmlType="submit">
            {isupdate?"Update":"Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <Table
        columns={columnFields}
        dataSource={dataSource}
        pagination={{ pageSize: 6 }}
      ></Table>
    </div>
  );
}

export default TableDesign;
