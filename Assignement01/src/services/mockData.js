// 1. Bảng USERS (2 đối tượng: 1 Admin, 1 Staff)
export const initialUsers = [
  {
    id: 1,
    username: "Admin",
    password: "Admin",
    role: 1, // 1 = Admin
    status: 1, // 1 = Active
    email: "admin@funews.edu.vn"
  },
  {
    id: 2,
    username: "staff1",
    password: "123",
    role: 2, // 2 = Staff
    status: 1,
    email: "staff1@funews.edu.vn"
  }
];

// 2. Bảng CATEGORIES (5 đối tượng)
export const initialCategories = [
  { id: 1, name: "Thế Giới", status: 1 },
  { id: 2, name: "Thời Sự", status: 1 },
  { id: 3, name: "Thể Thao", status: 1 },
  { id: 4, name: "Công Nghệ", status: 1 },
  { id: 5, name: "Giải Trí", status: 0 } // 0 = Inactive (dùng để test filter/status)
];

// 3. Bảng NEWS (5 đối tượng - có categoryId tham chiếu đến Categories)
export const initialNews = [
  {
    id: 1,
    title: "Hội nghị thượng đỉnh về biến đổi khí hậu",
    content: "Các quốc gia đã cam kết cắt giảm lượng khí thải carbon...",
    categoryId: 1, // Thuộc "Thế Giới"
    createdBy: "admin",
    status: 1
  },
  {
    id: 2,
    title: "Dự án cao tốc mới chính thức thông xe",
    content: "Rút ngắn thời gian di chuyển giữa các tỉnh miền Tây...",
    categoryId: 2, // Thuộc "Thời Sự"
    createdBy: "staff1",
    status: 1
  },
  {
    id: 3,
    title: "Kết quả lượt trận Cúp C1 rạng sáng nay",
    content: "Trận đấu kịch tính nghiêng về đội chủ nhà với tỷ số 3-2...",
    categoryId: 3, // Thuộc "Thể Thao"
    createdBy: "staff1",
    status: 1
  },
  {
    id: 4,
    title: "Mô hình AI mới chính thức ra mắt",
    content: "Khả năng xử lý ngôn ngữ tự nhiên được nâng cấp vượt bậc...",
    categoryId: 4, // Thuộc "Công Nghệ"
    createdBy: "admin",
    status: 1
  },
  {
    id: 5,
    title: "Phim điện ảnh mới lập kỷ lục doanh thu",
    content: "Cán mốc 100 tỷ đồng chỉ sau 3 ngày công chiếu đầu tiên...",
    categoryId: 5, // Thuộc "Giải Trí"
    createdBy: "staff1",
    status: 0
  }
];