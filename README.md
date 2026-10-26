# SUMO ENGLISH ADVENTURE

Trò chơi tĩnh miễn phí bằng HTML/CSS/JavaScript, không cần gói npm, tài khoản hoặc máy chủ dữ liệu. Tiến độ ở localStorage, sao lưu JSON trong Góc của mẹ.

## Nội dung thực tế
5 cấp đã biên soạn, 100 mục riêng biệt. Bản đồ hiển thị 100 cấp, 95 cấp chưa có nội dung được khóa rõ ràng. Không tuyên bố đã hoàn thành 2.000 mục. Câu hỏi dùng nghĩa, nghe (có chữ thay thế), chọn từ, gõ chính tả và hiểu câu mẫu. Biểu tượng chủ đề không phải hình riêng của từng từ; chưa có hoạt động nhận dạng ảnh riêng. IPA và gợi âm tiếng Việt chưa kiểm chứng được bỏ trống/ghi rõ trạng thái. Giọng đọc tiếng Anh dùng speechSynthesis của thiết bị, khả năng hoạt động ngoại tuyến tùy gói giọng đã cài.

## Phát triển
Node 24 để chạy `npm test` và `npm run validate`. Không cần cài dependencies. `npm start` phục vụ trang tĩnh cổng 4173 bằng Python 3. Mở qua HTTP, không mở index.html bằng file:// vì dữ liệu dùng fetch.

## Phát hành miễn phí
Workflow `.github/workflows/pages.yml` kiểm thử rồi triển khai khi đẩy nhánh main. Repository Settings → Pages → Build and deployment → Source → GitHub Actions. Cần quyền ghi Git và quyền Pages; việc có workflow không có nghĩa đã xuất bản.

## Dữ liệu và bảo mật
Không theo dõi, quảng cáo, SDK ngoài hay thu thập thông tin trẻ. PIN băm SHA-256 kèm salt là chốt cửa đơn giản trên máy, không xác thực an toàn. Tiến độ có thể bị sửa trong trình duyệt; không có giá trị tiền thật. Giá món quà 5 sao được mẹ xác nhận, luôn dưới 500.000 đồng. Không chuyển đổi sao và xu.

Mẹ chỉnh bài, ví dụ, chủ đề, mốc quà, tên/giá đồ trong Góc của mẹ. Nhập JSON theo bản xuất hoặc CSV có cột `level` cùng các trường mục học; cấp liên tiếp đủ 20 mục, không trùng ID/từ. Nhập thay cả bộ; giữ ID ổn định khi chỉnh. Validator kiểm tra cấu trúc, tính duy nhất và cụm từ xuất hiện trong ví dụ, không thay thế kiểm duyệt ngôn ngữ. Bản sao lưu chứa cả nội dung tùy chỉnh, PIN băm và tiến độ.

## Kiểm tra giao diện đã thực hiện
`python3 tests/browser.py` dùng Playwright Python và Chromium có sẵn trong môi trường QA (không phải dependency của trò chơi), với máy chủ đang chạy cổng 4173. Kịch bản đi hết 20 lượt luyện và 10 câu cuối cấp trên màn hình 390px, kiểm tra tải lại, trang bị đồ, PIN, tải sao lưu, đổi/duyệt/trao quà và ôn cấp sau. Kiểm tra Node độc lập không cần Playwright. Không coi kiểm tra giao diện này là kiểm duyệt ngôn ngữ hay xác minh triển khai công khai.
