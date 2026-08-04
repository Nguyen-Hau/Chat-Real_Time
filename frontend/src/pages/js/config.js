import axios from "axios";
export const API_BASE_URL = "http://localhost:5001/api";

let inMemoryToken = null;

export const setToken = (token) => {
  inMemoryToken = token;
};

export const getToken = () => {
  return inMemoryToken;
};

// B2.
// Cấu trúc: axios.create() — tạo instance riêng với config mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Địa chỉ gốc của BE
  headers: {
    "Content-Type": "application/json", // Báo BE biết body là JSON
  },
  withCredentials: true, // Tự động gửi Cookie trong mỗi request
});

// interceptors.request.use() → chặn request TRƯỚC khi gửi đi
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Đính kèm vào Header
  }
  return config; // Cho request tiếp tục đi
});

export default apiClient;
