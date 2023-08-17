import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
