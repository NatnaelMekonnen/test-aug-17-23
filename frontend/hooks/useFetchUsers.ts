import { useQuery } from "react-query";
import { fetchUsers } from "../api";

export const useFetchUsers = () => {
  return useQuery("users", fetchUsers);
};
