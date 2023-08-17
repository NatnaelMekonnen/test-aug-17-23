import { Modal } from "antd";
import { CreateUser, User } from "../types";
import UserForm from "./UserForm";

interface UserModalProps {
  task: "view" | "update" | "create";
  user: User | null | undefined;
  visible: boolean;
  onClose: () => void;
  onSubmit?: (user: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  task,
  user,
  visible,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal title="User Details" open={visible} onCancel={onClose} footer={null}>
      <hr className="my-2 opacity-50"/>
      {task === "view" ? (
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Name:</span> {user?.name || "----"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email || "----"}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span> {user?.phoneNumber || "----"}
          </p>
        </div>
      ) : (
        <div>
          <UserForm initialValues={user} onSubmit={onSubmit} />
        </div>
      )}
    </Modal>
  );
};

export default UserModal;
