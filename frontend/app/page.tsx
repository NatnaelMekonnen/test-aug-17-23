"use client";
import React, { useState } from "react";
import { Button, Layout, Spin } from "antd";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import UserTable from "@/components/UserTabe";
import UserModal from "@/components/UserModal";
import { CreateUser, User } from "@/types";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateUser } from "@/hooks/useCreateUser";

const { Header, Content } = Layout;

type Task = "view" | "update" | "create";

const Home: React.FC = () => {
  const { data: users, isLoading } = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState<User | undefined | null>(
    null,
  );
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [task, setTask] = useState<Task>("view");
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  const createUserMutation = useCreateUser();

  const handleOpen = (type: Task) => {
    setTask(type);
    setUserModalVisible(true);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUserMutation.mutateAsync(id);
  };

  const handleCreateUser = async (user: CreateUser) => {
    await createUserMutation.mutateAsync(user).then(() => {
      setUserModalVisible(false);
    });
  };

  const handleUpdateUser = async (user: User) => {
    await updateUserMutation.mutateAsync(user).then(() => {
      setUserModalVisible(false);
    });
  };

  const handleViewUser = (id: number) => {
    const user = users?.find((user) => user.id === id);
    setSelectedUser(user);
    handleOpen("view");
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setUserModalVisible(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <Layout>
      <Header className="text-center text-xl text-white bg-blue-500 p-4">
        User Management
      </Header>
      <Content className="p-4">
        <Button
          type="primary"
          className="mb-4 bg-blue-500 hover:bg-blue-800"
          onClick={() => handleOpen("create")}
        >
          Create User
        </Button>
        <UserTable
          users={users || []}
          onDelete={(id: number) => handleDeleteUser(id)}
          onView={(id: number) => handleViewUser(id)}
          onUpdate={(id: number) => {
            const user = users?.find((user) => user.id === id);
            setSelectedUser(user);
            handleOpen("update");
          }}
        />
        <UserModal
          task={task}
          user={selectedUser}
          visible={userModalVisible}
          onClose={handleCloseModal}
          onSubmit={task === "create" ? handleCreateUser : handleUpdateUser}
        />
      </Content>
    </Layout>
  );
};

export default Home;
