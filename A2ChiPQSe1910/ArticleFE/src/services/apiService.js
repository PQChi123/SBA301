/**
* ChiPQCe180289
*
**/
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/* ==========================================================================
   1. ACCOUNTS (Tài khoản & Đăng nhập)
   ========================================================================== */
const ACCOUNTS_API = `${BASE_URL}/accounts`;

export const loginAccount = async (email, password) => {
    const response = await axios.post(`${ACCOUNTS_API}/login`, { email, password });
    return response.data;
};

export const getAllAccounts = async () => {
    const response = await axios.get(ACCOUNTS_API);
    return response.data;
};

export const searchAccountByName = async (name) => {
    const response = await axios.get(ACCOUNTS_API, { params: { name } });
    return response.data;
};

export const getAccountById = async (id) => {
    const response = await axios.get(`${ACCOUNTS_API}/${id}`);
    return response.data;
};

export const createAccount = async (accountData) => {
    const response = await axios.post(ACCOUNTS_API, accountData);
    return response.data;
};

export const updateAccount = async (id, accountData) => {
    const response = await axios.put(`${ACCOUNTS_API}/${id}`, accountData);
    return response.data;
};

export const deleteAccount = async (id) => {
    const response = await axios.delete(`${ACCOUNTS_API}/${id}`);
    return response.data;
};

export const getProfile = async (id) => {
    const response = await axios.get(`${ACCOUNTS_API}/${id}/profile`);
    return response.data;
};

export const updateProfile = async (id, profileData) => {
    const response = await axios.put(`${ACCOUNTS_API}/${id}/profile`, profileData);
    return response.data;
};


/* ==========================================================================
   2. CATEGORIES (Danh mục)
   ========================================================================== */
const CATEGORIES_API = `${BASE_URL}/categories`;

// GET /categories
export const getAllCategories = async () => {
    const response = await axios.get(CATEGORIES_API);
    return response.data;
};

// GET /categories/{id}
export const getCategoryById = async (id) => {
    const response = await axios.get(`${CATEGORIES_API}/${id}`);
    return response.data;
};

// GET /categories/search?name=sport
export const searchCategoryByName = async (name) => {
    const response = await axios.get(`${CATEGORIES_API}/search`, { params: { name } });
    return response.data;
};

// POST /categories
export const createCategory = async (categoryData) => {
    const response = await axios.post(CATEGORIES_API, categoryData);
    return response.data;
};

// PUT /categories/{id}
export const updateCategory = async (id, categoryData) => {
    const response = await axios.put(`${CATEGORIES_API}/${id}`, categoryData);
    return response.data;
};

// DELETE /categories/{id}
export const deleteCategory = async (id) => {
    const response = await axios.delete(`${CATEGORIES_API}/${id}`);
    return response.data;
};


/* ==========================================================================
   3. NEWS ARTICLES (Bài viết)
   ========================================================================== */
const NEWS_API = `${BASE_URL}/news-articles`;

// GET /news-articles/active (Lấy các bài viết active cho Guest)
export const getActiveNews = async () => {
    const response = await axios.get(`${NEWS_API}/active`);
    return response.data;
};

// GET /news-articles (Lấy tất cả bài viết)
export const getAllNews = async () => {
    const response = await axios.get(NEWS_API);
    return response.data;
};

// GET /news-articles/{id} (Lấy bài viết theo ID)
export const getNewsById = async (id) => {
    const response = await axios.get(`${NEWS_API}/${id}`);
    return response.data;
};

// GET /news-articles/search?keyword=sport (Tìm bài viết theo tiêu đề)
export const searchNewsByTitle = async (keyword) => {
    const response = await axios.get(`${NEWS_API}/search`, { params: { keyword } });
    return response.data;
};

// GET /news-articles/history/{staffId} (Lấy lịch sử bài viết của Staff)
export const getNewsHistoryByStaff = async (staffId) => {
    const response = await axios.get(`${NEWS_API}/history/${staffId}`);
    return response.data;
};

// POST /news-articles (Tạo bài viết, gắn danh mục và danh sách tag)
export const createNewsArticle = async (newsData) => {
    const response = await axios.post(NEWS_API, newsData);
    return response.data;
};

// PUT /news-articles/{id} (Cập nhật bài viết)
export const updateNewsArticle = async (id, newsData) => {
    const response = await axios.put(`${NEWS_API}/${id}`, newsData);
    return response.data;
};

// DELETE /news-articles/{id} (Xóa bài viết)
export const deleteNewsArticle = async (id) => {
    const response = await axios.delete(`${NEWS_API}/${id}`);
    return response.data;
};


/* ==========================================================================
   4. TAGS (Thẻ)
   ========================================================================== */
const TAGS_API = `${BASE_URL}/tags`;

// GET /tags (Lấy danh sách tag)
export const getAllTags = async () => {
    const response = await axios.get(TAGS_API);
    return response.data;
};

// GET /tags/search?name=sport (Tìm tag theo tên)
export const searchTagByName = async (name) => {
    const response = await axios.get(`${TAGS_API}/search`, { params: { name } });
    return response.data;
};