import React from "react";
import { Button, Form, Input } from "antd";
import { CreateUser, User } from "@/types";

type FieldType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
};

const Fields: {
  label: string;
  name: keyof FieldType;
  type: string;
  rules: {
    required: boolean;
    message: string;
  }[];
}[] = [
  {
    label: "Name",
    name: "name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    rules: [{ required: true, message: "Please input your phone!" }],
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    rules: [{ required: true, message: "Please input your password!" }],
    type: "password",
  },
];

const UserForm: React.FC<{
  initialValues?: Record<string, any> | undefined | null;
  onSubmit?: (user: User | CreateUser) => void;
}> = ({ initialValues, onSubmit }) => {
  const onFinish = (values: any) => {
    if (onSubmit) {
      onSubmit({
        id: initialValues?.id,
        ...values,
      });
    }
  };
  return (
    <Form
      name="user-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={
        initialValues ? { ...initialValues, password: undefined } : {}
      }
      onFinish={onFinish}
      autoComplete="off"
    >
      {Fields.map((field, index) => (
        <Form.Item<FieldType>
          key={index}
          label={field.label}
          name={field.name}
          rules={field.rules}
        >
          {field.type === "password" ? <Input.Password /> : <Input />}
        </Form.Item>
      ))}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 hover:bg-blue-800"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
