# Test Matrix

Các ca dưới đây dùng để kiểm thử thủ công trên ứng dụng chạy bằng `npm run dev`. Cột Actual/Pass được để là `Chưa chạy` cho đến khi ca đó được thực hiện trên trình duyệt.

| ID | Nhóm chức năng | Tên Test Case | Thao tác thực hiện | Kết quả mong đợi (Expected result) | Kết quả thực tế (Actual/Pass) |
|---|---|---|---|---|---|
| LOGIN-01 | Login - Normal | Đăng nhập Admin hợp lệ | Nhập `Admin` / `Admin`, nhấn Login. | Đăng nhập thành công và hiển thị trang quản trị. | Chưa chạy |
| LOGIN-02 | Login - Negative | Sai mật khẩu | Nhập `Admin` / `sai`, nhấn Login. | Hiển thị lỗi; vẫn ở trang Login. | Chưa chạy |
| LOGIN-03 | Login - Negative | Sai tài khoản | Nhập tài khoản không tồn tại và mật khẩu bất kỳ. | Hiển thị lỗi; không vào trang quản trị. | Chưa chạy |
| LOGIN-04 | Login - Negative | Bỏ trống username | Để trống username, nhập mật khẩu, nhấn Login. | Báo cần nhập đủ thông tin; không đăng nhập. | Chưa chạy |
| LOGIN-05 | Login - Negative | Bỏ trống password | Nhập username, để trống password, nhấn Login. | Báo cần nhập đủ thông tin; không đăng nhập. | Chưa chạy |
| LOGIN-06 | Login - Edge | Username khác kiểu chữ | Nhập `admin` / `Admin`, nhấn Login. | Đăng nhập thành công nếu username được chuẩn hóa không phân biệt hoa thường. | Chưa chạy |
| AUTH-01 | Auth - Negative | Tài khoản Staff không được xác thực | Nhập `staff1` / `123`, nhấn Login. | Không được đăng nhập; hiển thị lỗi. | Chưa chạy |
| AUTH-02 | Auth - Normal | Đăng xuất | Đăng nhập hợp lệ, nhấn Đăng xuất. | Auth state được xóa và màn hình Login xuất hiện. | Chưa chạy |
| NAV-01 | Navigation - Normal | Hiển thị menu quản trị | Đăng nhập Admin và quan sát sidebar. | Có đủ Dashboard, Category, News, Users và Settings. | Chưa chạy |
| NAV-02 | Navigation - Normal | Chuyển giữa các mục menu | Lần lượt chọn cả năm mục trong sidebar. | Nội dung trang thay đổi đúng mục; menu hiện tại được highlight. | Chưa chạy |
| NAV-03 | Navigation - Edge | Điều hướng không reload | Chuyển qua lại giữa các mục và quan sát trạng thái trang. | Ứng dụng chuyển trang theo SPA, không tải lại toàn bộ trang. | Chưa chạy |
| CAT-01 | Category - Normal | Đọc danh sách và trạng thái | Mở Category khi có dữ liệu mẫu. | Danh sách được hiển thị; trạng thái hiện là Active hoặc Inactive. | Chưa chạy |
| CAT-02 | Category - Edge | Danh sách Category rỗng | Đặt giá trị localStorage `categories` thành `[]`, rồi mở trang Category. | Hiển thị empty state, không crash. | Chưa chạy |
| CAT-03 | Category CRUD - Normal | Thêm Category | Mở form thêm, nhập tên hợp lệ và lưu. | Category mới xuất hiện, có ID duy nhất và có thông báo thành công. | Chưa chạy |
| CAT-04 | Category CRUD - Negative | Thêm Category không có tên | Mở form thêm, để trống tên và lưu. | Hiển thị lỗi; không thêm Category. | Chưa chạy |
| CAT-05 | Category CRUD - Normal | Cập nhật Category | Mở sửa một Category, kiểm tra form được điền sẵn, đổi thông tin và lưu. | Thông tin được cập nhật và có thông báo thành công. | Chưa chạy |
| CAT-06 | Category - Normal | Hủy xác nhận xóa | Nhấn Xóa rồi chọn Cancel trong confirmation dialog. | Category vẫn còn trong danh sách. | Chưa chạy |
| CAT-07 | Category - Normal | Xác nhận xóa Category không được sử dụng | Chọn Category không có News tham chiếu, xác nhận xóa. | Category bị xóa và có thông báo thành công. | Chưa chạy |
| CAT-08 | Category - Negative | Xóa Category đang được News sử dụng | Thử xóa Category có bài News tham chiếu. | Không xóa Category; hiển thị lý do. | Chưa chạy |
| CAT-09 | Category Search - Normal | Tìm theo tên Category | Nhập một phần tên vào ô tìm kiếm, sau đó xóa từ khóa. | Kết quả được lọc; xóa từ khóa thì toàn bộ danh sách gốc trở lại. | Chưa chạy |
| NEWS-01 | News CRUD - Normal | Đọc danh sách News | Mở trang News khi có dữ liệu mẫu. | Danh sách bài viết và tên Category tương ứng được hiển thị. | Chưa chạy |
| NEWS-02 | News CRUD - Normal | Thêm News với Category hợp lệ | Thêm bài viết, chọn Category trong danh sách và lưu. | Bài viết mới được lưu với `categoryId` của Category đã chọn. | Chưa chạy |
| NEWS-03 | News CRUD - Negative | Lưu News thiếu tiêu đề | Mở form thêm hoặc sửa, để trống tiêu đề và lưu. | Hiển thị lỗi; dữ liệu không được thêm/cập nhật. | Chưa chạy |
| NEWS-04 | News CRUD - Normal | Cập nhật News | Mở sửa bài viết, thay đổi tiêu đề hoặc Category rồi lưu. | Thay đổi được hiển thị và được lưu. | Chưa chạy |
| NEWS-05 | News - Normal | Hủy xác nhận xóa | Nhấn Xóa rồi chọn Cancel. | Bài viết vẫn còn trong danh sách. | Chưa chạy |
| NEWS-06 | News - Normal | Xác nhận xóa | Nhấn Xóa rồi xác nhận trong confirmation dialog. | Bài viết bị xóa khỏi danh sách. | Chưa chạy |
| NEWS-07 | News Search - Normal | Tìm bài viết theo tiêu đề | Nhập từ khóa có trong tiêu đề, sau đó xóa từ khóa. | Kết quả được lọc và danh sách gốc được hiển thị lại khi bỏ tìm kiếm. | Chưa chạy |
| NEWS-08 | News - Edge | Không có Category để chọn | Xóa danh sách Category, rồi thử mở form thêm News. | Không thể lưu News với Category không tồn tại; ứng dụng không crash. | Chưa chạy |
| USER-01 | Users CRUD - Normal | Đọc danh sách và nhãn Role | Mở trang Users. | Danh sách người dùng hiển thị Role 1 là Admin, Role 2 là Staff. | Chưa chạy |
| USER-02 | Users CRUD - Normal | Tạo tài khoản | Thêm người dùng với username, email và password hợp lệ. | Tài khoản mới xuất hiện, có ID duy nhất và thông báo thành công. | Chưa chạy |
| USER-03 | Users CRUD - Negative | Username hoặc email bị trùng | Tạo tài khoản với username hoặc email đã tồn tại. | Hiển thị lỗi trùng dữ liệu; không tạo tài khoản. | Chưa chạy |
| USER-04 | Users CRUD - Normal | Cập nhật tài khoản | Sửa thông tin người dùng, lưu lại. | Thay đổi được lưu và có thông báo thành công. | Chưa chạy |
| USER-05 | Users - Normal | Hủy xác nhận xóa tài khoản | Nhấn Xóa tài khoản khác tài khoản đang đăng nhập, chọn Cancel. | Tài khoản vẫn còn. | Chưa chạy |
| USER-06 | Users - Normal | Xác nhận xóa tài khoản | Xóa tài khoản khác tài khoản đang đăng nhập và xác nhận. | Tài khoản bị xóa và có thông báo thành công. | Chưa chạy |
| USER-07 | Users - Negative | Xóa hoặc khóa tài khoản hiện tại | Thử xóa hoặc khóa tài khoản đang đăng nhập. | Thao tác bị từ chối và hiển thị thông báo lỗi. | Chưa chạy |
| USER-08 | Users Search - Normal | Tìm theo username hoặc email | Nhập một phần username hoặc email vào ô tìm kiếm. | Chỉ các tài khoản phù hợp được hiển thị. | Chưa chạy |
| STORE-01 | Storage - Normal | Dữ liệu tồn tại sau khi reload | Tạo hoặc cập nhật Category, News, User rồi tải lại trang. | Dữ liệu đã lưu trong localStorage vẫn còn sau khi tải lại. | Chưa chạy |
| STORE-02 | Storage - Edge | Thiếu khóa localStorage | Xóa các khóa `categories`, `news`, `users` trong localStorage rồi mở lại ứng dụng. | Ứng dụng khởi tạo dữ liệu mặc định cho các khóa bị thiếu và không crash. | Chưa chạy |
| STORE-03 | Storage - Edge | localStorage không ghi được | Chặn quyền ghi storage hoặc mô phỏng lỗi quota, sau đó lưu một thay đổi. | Hiển thị thông báo lỗi; giao diện không báo lưu thành công khi storage thất bại. | Chưa chạy |
