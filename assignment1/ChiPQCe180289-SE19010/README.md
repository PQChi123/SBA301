# FUNews Management

Ứng dụng quản trị tin tức xây dựng bằng ReactJS và Vite. Dữ liệu mẫu được lưu ở phía trình duyệt bằng `localStorage`; không cần backend.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Tài khoản mặc định:

| Username | Password | Role |
|---|---|---|
| `Admin` | `Admin` | 1 - Admin |
| `staff1` | `123` | 2 - Staff |

Kiểm tra mã nguồn:

```bash
npm run lint
npm run build
```

## Phạm vi và mô hình dữ liệu

Ứng dụng quản lý ba entity: Users/Accounts, Categories và News. ID của mỗi entity là số nguyên duy nhất trong danh sách; các bản ghi mới dùng số nguyên dương nhỏ nhất chưa được sử dụng.

| Entity | Các trường chính | Ràng buộc |
|---|---|---|
| User | `id`, `username`, `password`, `email`, `role`, `status` | Role `1` là Admin, `2` là Staff; Status `1` là hoạt động, `0` là khóa; username và email không trùng |
| Category | `id`, `name`, `description`, `status` | Status `1` là hoạt động, `0` là tạm khóa; không xóa category đang được bài viết tham chiếu |
| News | `id`, `title`, `categoryId`, `author`, `createdDate`, `status` | `categoryId` phải tham chiếu category có thật; Status `1` là đã xuất bản, `0` là bản nháp |

`src/services/mockData.js` chứa dữ liệu khởi tạo. NewsPage chuẩn hóa dữ liệu tin cũ trong `localStorage` (ví dụ `categoryName`, `createdBy`, `Published`/`Draft`) sang `categoryId`, `author` và Status `1`/`0` khi đọc.

## Cây component

```text
main.jsx
└── App
    ├── LoginPage
    └── AdminLayout
        ├── Header
        ├── Sidebar
        └── Page theo tab hiện tại
            ├── DashboardPage
            ├── CategoryPage ── Modal ── Form
            ├── NewsPage ───── Modal ── Form
            ├── UserPage (Admin) ─ Modal ── Form
            └── SettingsPage
```

`App` sở hữu trạng thái xác thực; `AdminLayout` sở hữu tab điều hướng. Mỗi trang quản lý sở hữu danh sách, từ khóa tìm kiếm, item đang sửa và form state của trang đó. `Modal` dùng chung phần trình bày dialog; mỗi trang quản lý cung cấp nội dung form và xử lý Create/Update của entity đó.

Điều hướng dùng state trong `AdminLayout` thay vì React Router vì ứng dụng chỉ có năm khu vực nội bộ, không yêu cầu URL riêng. Dữ liệu danh mục, tin tức và tài khoản được lưu lần lượt tại các khóa `categories`, `news`, `users` trong `localStorage`; mỗi trang đọc lại dữ liệu khi được mở. Trạng thái đăng nhập chỉ tồn tại trong phiên React hiện tại.

## Input – Process – Output

| Chức năng | Input | Process | Output |
|---|---|---|---|
| Login | Username, password | Kiểm tra không rỗng, tìm account, từ chối sai thông tin hoặc account có Status `0` | Vào Admin Layout theo role hoặc hiển thị lỗi |
| Create | Các trường form của entity | Validate dữ liệu, tìm ID số nguyên chưa dùng, tạo bản ghi; News kiểm tra `categoryId` | Cập nhật bảng và `localStorage` |
| Read | Danh sách mock hoặc dữ liệu đã lưu | Đọc bản ghi và resolve `News.categoryId` sang tên Category | Hiển thị bảng, role và status |
| Update | Item được chọn và giá trị form | Prefill form; cập nhật đúng bản ghi theo ID, giữ nguyên các trường không sửa | Bảng và `localStorage` phản ánh thay đổi |
| Delete | ID của item và quyết định xác nhận | Chỉ xóa sau khi xác nhận; chặn xóa account đang đăng nhập và category đang được News dùng | Danh sách cập nhật hoặc không đổi khi hủy |
| Search | Từ khóa | Lọc danh sách nguồn không phân biệt hoa thường, không sửa danh sách gốc | Danh sách kết quả hoặc thông báo không tìm thấy |

## Kiểm thử và bằng chứng

Các luồng dưới đây đã được thực hiện trực tiếp trên trình duyệt local tại `http://127.0.0.1:5173`; dữ liệu tạo trong lúc kiểm tra đã được xóa khỏi danh sách. Các thao tác build/lint cũng chạy trên mã nguồn hiện tại.

| ID | Nhóm | Kịch bản | Kết quả mong đợi | Kết quả thực tế |
|---|---|---|---|---|
| L01 | Negative | Gửi form đăng nhập rỗng | Báo cần nhập username và password | Pass — hiện thông báo kiểm tra dữ liệu |
| L02 | Negative | Đăng nhập bằng thông tin sai | Không vào trang quản trị, hiện lỗi | Pass — hiện “Invalid username or password.” |
| L03 | Normal | Đăng nhập `Admin` / `Admin` | Hiện Header và khu vực quản trị Admin | Pass |
| L04 | Normal | Đăng nhập `staff1` / `123` | Hiện role Staff và ẩn menu Users | Pass |
| N01 | Normal | Chuyển qua Dashboard, Category, News, Users, Settings bằng Admin | Hiện đúng nội dung từng tab | Pass |
| D01 | Normal | Khóa rồi mở lại Category từ Dashboard | Trạng thái Category đồng bộ trên trang Category | Pass — hiển thị lần lượt “Tạm khóa” và “Hoạt động” |
| C01 | Normal | Tìm Category có thật và từ khóa không khớp | Hiện kết quả tương ứng hoặc thông báo rỗng | Pass |
| C02 | Normal | Thêm Category rồi cập nhật | Tạo ID số nguyên; form cập nhật điền sẵn dữ liệu | Pass — ID mới là `6`; form sửa được prefill |
| C03 | Edge | Xóa Category đang được News tham chiếu | Không xóa, báo category đang được dùng | Pass — thao tác bị chặn |
| C04 | Edge | Danh sách Category rỗng | Hiện thông báo danh sách rỗng | Pass — hiện “Chưa có Category nào.” |
| N02 | Normal | Thêm News dạng Draft vào Category có sẵn | ID nguyên, lưu status `0`, bảng hiện đúng tên Category | Pass — News mới hiển thị đúng category đã chọn |
| N03 | Normal | Tìm và cập nhật News | Lọc theo tiêu đề; dialog cập nhật prefill và lưu thay đổi | Pass |
| N04 | Negative | Tìm News không tồn tại | Hiện thông báo không tìm thấy | Pass |
| N05 | Negative | Hủy xác nhận xóa News | Bản ghi vẫn còn | Pass |
| N06 | Normal | Xác nhận xóa News | Bản ghi bị xóa | Pass |
| N07 | Edge | Danh sách News rỗng | Hiện trạng thái danh sách rỗng | Pass — hiện “Chưa có bài viết nào.” |
| U01 | Normal | Tạo User Staff, tìm kiếm và cập nhật | Tạo ID mới, thể hiện Role `2`, form sửa prefill | Pass — ID mới là `3` |
| U02 | Negative | Xóa User rồi chọn Cancel | Bản ghi không đổi | Pass |
| U03 | Normal | Xác nhận xóa User | Bản ghi bị xóa | Pass |
| U04 | Edge | Tìm kiếm User không có kết quả / danh sách rỗng | Hiện thông báo tương ứng | Pass |
| V01 | Build | `npm run build` | Vite tạo bản production | Pass |
| V02 | Lint | `npm run lint` | Không còn lỗi ESLint | Pass |

## Ghi chú

- `localStorage` phù hợp cho bài tập mock/demo; đây không phải hệ thống xác thực an toàn cho production. Tài khoản và mật khẩu mẫu được lưu phía client.
- Logo FUNews là SVG được tạo với hỗ trợ AI tại `public/funews-logo.svg`, được nhúng trong Header để ứng dụng chạy không phụ thuộc dịch vụ ảnh ngoài.
- Bộ test chức năng hiện được ghi nhận dưới dạng kiểm thử trình duyệt thủ công; dự án chưa cài framework test tự động cho React.
