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
  const [selectedUser, setSelectedUser] = useState<User>();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [task, setTask] = useState<Task>("view");
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  const createUserMutation = useCreateUser();

  const handleOpen = (type: Task) => {
    setTask(type);
    if (type === "create") {
      setSelectedUser(undefined);
    }
    setUserModalVisible(true);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUserMutation.mutateAsync(id);
  };

  const handleCreateUser = async (user: CreateUser) => {
    await createUserMutation
      .mutateAsync({
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
      })
      .then(() => {
        setUserModalVisible(false);
      });
  };

  const handleUpdateUser = async (user: User) => {
    await updateUserMutation.mutateAsync(user).then(() => {
      handleCloseModal();
    });
  };

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    handleOpen("update");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    handleOpen("view");
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
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
          onView={(user: User) => handleViewUser(user)}
          onUpdate={(user: User) => handleUpdate(user)}
        />
        <UserModal
          task={task}
          user={task === "create" ? null : selectedUser}
          visible={userModalVisible}
          onClose={handleCloseModal}
          onSubmit={task === "create" ? handleCreateUser : handleUpdateUser}
        />
      </Content>
    </Layout>
  );
};

export default Home;
