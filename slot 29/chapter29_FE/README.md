# Library Management System - Frontend

Frontend cho dự án Library Management System sử dụng React + Vite.

## Cài đặt

```powershell
npm install
```

## Chạy development server

```powershell
npm run dev
```

Frontend sẽ chạy tại http://localhost:5173

## Backend

Frontend yêu cầu backend Spring Boot chạy tại http://localhost:8080

Để chạy backend:
```powershell
cd ..
mvn spring-boot:run "-Dspring-boot.run.profiles=demo"
```

## Tính năng

- **Students Tab**: Hiển thị danh sách sinh viên với thông tin email, tên, GPA và số sách đã mượn
- **Books Tab**: Hiển thị danh sách sách với thông tin ISBN, tiêu đề, tác giả và số sinh viên đang mượn

## API Endpoints

- `GET /api/students` - Lấy danh sách sinh viên
- `GET /api/books` - Lấy danh sách sách
