import axios from "axios";
import { CreateUser, User } from "@/types";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.API_URL || "http://localhost:5000";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const createUser = async (user: CreateUser): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/users`, user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
};
