import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../api";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
