import { useMutation, useQueryClient } from "react-query";
import { createUser } from "../api";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
