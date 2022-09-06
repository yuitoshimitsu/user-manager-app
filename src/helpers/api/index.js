import apiClient from "../../lib/axios";

function getUsers() {
  const response = apiClient.get(`/users`);
  return response;
}

function getUser(userId) {
  const response = apiClient.get(`/users/${userId}`);
  return response;
}

function addUser(data) {
  const response = apiClient.post(`/users`, data);
  return response;
}

function updateUser(userId,data) {
  const response = apiClient.put(`/users/${userId}`, data);
  return response;
}

function deleteUser(userId) {
  const response = apiClient.delete(`/users/${userId}`);
  return response;
}

export { getUsers, getUser, addUser, updateUser, deleteUser };
