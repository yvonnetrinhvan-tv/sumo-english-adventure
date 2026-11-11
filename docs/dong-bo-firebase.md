# Bật đồng bộ Sumo bằng Firebase (miễn phí, khoảng 10 phút)

Làm một lần trên máy tính. Cần tài khoản Google (Gmail).

## Bước 1. Tạo dự án
1. Vào https://console.firebase.google.com và đăng nhập Gmail.
2. Bấm **Create a project** (Tạo dự án). Đặt tên, ví dụ `sumo-english`.
3. Tắt Google Analytics (không cần). Bấm **Create project**.

## Bước 2. Bật Firestore
1. Menu trái: **Build → Firestore Database → Create database**.
2. Chọn vị trí gần nhất (ví dụ `asia-southeast1`). Chọn **Production mode**. Bấm **Enable**.
3. Mở thẻ **Rules**, xóa nội dung cũ, dán đoạn dưới, bấm **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sync/{code} {
      allow get: if code.size() == 24;
      allow create, update: if code.size() == 24
        && request.resource.data.keys().hasOnly(['payload', 'updatedAt'])
        && request.resource.data.payload is string
        && request.resource.data.payload.size() < 900000
        && request.resource.data.updatedAt is int;
      allow list, delete: if false;
    }
  }
}
```

Quy tắc này chỉ cho đọc/ghi đúng một tài liệu khi biết mã 24 ký tự. Không ai liệt kê hay xóa được.

## Bước 3. Lấy hai giá trị
1. Bấm biểu tượng bánh răng → **Project settings**.
2. Mục **Your apps** → bấm biểu tượng web `</>` → đặt tên → **Register app**.
3. Trong đoạn `firebaseConfig`, chép hai giá trị: `projectId` và `apiKey`.
4. Gửi hai giá trị này cho Claude. Chúng không phải bí mật.

## Bước 4 (nên làm). Giới hạn khóa API
1. Vào https://console.cloud.google.com/apis/credentials, chọn đúng dự án.
2. Bấm khóa "Browser key" → **Website restrictions** → thêm địa chỉ trang Sumo của bạn.

## Bước 5. Dùng
1. Trên máy có tiến độ mới nhất: Góc của mẹ → **Bật đồng bộ**. Chép mã 24 ký tự.
2. Trên iPhone: Góc của mẹ → nhập mã → **Ghép nối**.
3. Nếu iPhone dùng cả Safari và app cài ra màn hình chính: nhập mã ở cả hai nơi.

## Lưu ý
- Ai có mã đều đọc được tiến độ. Chỉ chia sẻ trong gia đình.
- Hai máy sửa cùng lúc: bản lưu sau thắng. Bản cũ nằm ở `sumo-adventure-v1-before-sync` trong trình duyệt.
- Mất mạng vẫn học được. Có mạng lại thì tự khớp.
