import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { toast } from "react-toastify";
import { axiosInstanse } from "../api/axios";
import { useCookies } from "react-cookie";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const AdminCategory = () => {
  const [userData, setUserData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [form] = Form.useForm();

  const [cookies, setCookie] = useCookies(["token"]);
  // model start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // model start

  // form fn start
  const onFinish = (values) => {
    if (!isUpdate) {
      createCategory(values);
    } else {
      updateCategory(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // form fn start

  // get All user fn start

  const getAllCategory = async () => {
    try {
      let response = await axiosInstanse.get("/category");

      setUserData(response.data.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get All user fn finsh

  const deleteCategory = async (id) => {
    try {
      let response = await axiosInstanse.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      toast.success("Ma'lumot o'chirildi✅");
      getAllCategory();
    } catch (err) {
      toast.success("Ma'lumot o'chirilmadi❌");
      console.log(err);
    }
  };

  // set inbput Value fn
  const setInputValueFn = (value) => {
    console.log(value);
    showModal();

    form.setFieldValue("name", value.name);
    form.setFieldValue("desc", value.desc);

    setUpdateId(value._id);
    setIsUpdate(true);
  };

  const createCategory = async (data) => {
    try {
      let response = await axiosInstanse.post("/category", values, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      toast.success("Category yaratildi✅");
      getAllCategory();
      handleCancel();
    } catch (err) {
      console.log(err);
      toast.error("Category yaratilmadi❌");
    }
  };

  // edit fn
  const updateCategory = async (data) => {
    try {
      let response =await axiosInstanse.put(`/category/${updateId}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(response);

      toast.success("Malumot yangilandi✅")
      handleCancel()
      setIsUpdate(false)
      setUpdateId(null)
      form.resetFields()
      getAllCategory()
    } catch (err) {
      toast.error("Ma'lumot yangilanmadi❌")
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "_id",
      render(_id, value) {
        return <EditOutlined onClick={() => setInputValueFn(value)} />;
      },
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "_id",
      render(_id, value) {
        return <DeleteOutlined onClick={() => deleteCategory(_id)} />;
      },
    },
  ];

  console.log(userData);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Category"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {/* Form start */}
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {!isUpdate ? "Create" : "Update"}
            </Button>
          </Form.Item>
        </Form>

        {/* Form finsih */}
      </Modal>
      <Table dataSource={userData} columns={columns} />;

      <Chart1 />
    </>
  );
};
export default AdminCategory;
