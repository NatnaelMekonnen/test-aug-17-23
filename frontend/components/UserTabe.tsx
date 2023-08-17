import { Table, Space } from "antd";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onUpdate: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
  onView,
  onUpdate,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          <a onClick={() => onView(record.id)}>View</a>
          <a onClick={() => onUpdate(record.id)}>Update</a>
          <a onClick={() => onDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} />;
};

export default UserTable;
