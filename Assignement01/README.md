# FUNewsManagementSystem

## Giới thiệu

FUNewsManagementSystem là ứng dụng quản lý tin tức và danh mục, xây dựng bằng React và Vite. Giao diện dành cho quản trị viên, có thể quản lý tin tức, danh mục và tài khoản người dùng.

## Cài đặt và chạy

Yêu cầu Node.js và npm.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal để sử dụng ứng dụng. Tạo bản build production bằng `npm run build`.

## Tài khoản thử nghiệm

- Username: `Admin`
- Password: `Admin`

## Chức năng

- Đăng nhập và đăng xuất.
- Điều hướng giữa Dashboard, Category, News, Users và Settings.
- Thêm, xem, sửa, xóa và tìm kiếm Category, News và Users.
- Kiểm tra Category được chọn khi tạo hoặc cập nhật News.
- Lưu dữ liệu trên trình duyệt bằng localStorage và hiển thị thông báo thao tác.

## Giới hạn

- Đây là ứng dụng frontend; chưa kết nối API hoặc cơ sở dữ liệu.
- Dữ liệu được lưu trên trình duyệt hiện tại bằng localStorage, không đồng bộ giữa người dùng hoặc thiết bị.
- Đăng nhập dùng tài khoản mẫu cố định, không phải cơ chế xác thực an toàn cho môi trường thực tế.
- Phần cập nhật hồ sơ và đổi mật khẩu trong Settings chỉ minh họa giao diện, chưa lưu thay đổi vào tài khoản.

## Tham khảo và sử dụng AI

- Tài liệu React: https://react.dev/
- Tài liệu Vite: https://vite.dev/guide/
- AI được sử dụng để hỗ trợ viết, chỉnh sửa và kiểm tra một số phần của dự án.

## Kiểm thử

Các trường hợp kiểm thử thủ công được ghi trong [TEST-MATRIX.md](./TEST-MATRIX.md).
