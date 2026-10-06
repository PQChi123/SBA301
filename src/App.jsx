import OrchidExplorer from "./components/OrchidExplorer";
import OrchidDetail from "./components/OrchidDetail";
import { Routes, Route } from "react-router-dom";

function App() {
return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<OrchidExplorer />} />
        <Route path="/orchid/:id" element={<OrchidDetail />} />
      </Routes>
    </div>
  );
}

export default App;








// đây là lần đầu mình tiếp xúc với ngôn ngữ này vẫn chưa hiểu các nó hoạt động  như thế nào hãy phân tích chi tiết hơn nữa
// // 1. Hàm giả lập một tác vụ async trả về Promise (ví dụ: gọi API lấy thông tin User)
// function fetchUserData(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (userId > 0) {
//         resolve({ id: userId, name: "Nguyễn Văn A", role: "Developer" });
//       } else {
//         reject(new Error("User ID không hợp lệ!"));
//       }
//     }, 1000); // Giả lập độ trễ mạng 1 giây
//   });
// }

// // 2. Sử dụng async/await + try/catch/finally để xử lý bất đồng bộ
// async function getUserInfo(id) {
//   console.log("--> Bat dau tai du lieu user..."); // (1) Sync
//   
//   try {
//     // await tạm dừng việc thực thi trong hàm async này cho đến khi Promise settled
//     const user = await fetchUserData(id);
//     console.log("--> Lay du lieu thanh cong:", user);
//     return user;
//   } catch (error) {
//     console.error("--> Xay ra loi:", error.message);
//   } finally {
//     console.log("--> Hoan thanh chu trinh request (du thanh cong hay pride)!");
//   }
// }

// // 3. Minh họa thứ tự chạy (Event Loop: Sync -> Microtask -> Macrotask/Timer)
// console.log("=== CHƯƠNG TRÌNH BẮT ĐẦU ==="); // (Sync)

// // Gọi hàm async
// getUserInfo(1);

// // Promise handler (Microtask Queue)
// Promise.resolve().then(() => {
//   console.log("[Microtask] Promise resolved ngay lap tuc!");
// });

// // setTimeout callback (Macrotask / Task Queue)
// setTimeout(() => {
//   console.log("[Macrotask] Timer 0ms chay sau microtask!");
// }, 0);

// console.log("=== CHƯƠNG TRÌNH KẾT THÚC CÁC BƯỚC ĐỒNG BỘ ==="); // (Sync)