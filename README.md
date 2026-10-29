# SUMO ENGLISH ADVENTURE

Trò chơi tĩnh miễn phí bằng HTML/CSS/JavaScript, không cần gói npm, tài khoản hoặc máy chủ dữ liệu. Tiến độ ở localStorage, sao lưu JSON trong Góc của mẹ.

## Nội dung thực tế
5 cấp đã biên soạn, 100 mục riêng biệt. Bản đồ hiển thị 100 cấp, 95 cấp chưa có nội dung được khóa rõ ràng. Không tuyên bố đã hoàn thành 2.000 mục. Câu hỏi dùng nghĩa, nghe (có chữ thay thế), chọn từ, gõ chính tả và hiểu câu mẫu. Thẻ học hiển thị emoji minh họa riêng cho từng từ (hệ thống tự vẽ, không tải ảnh ngoài); chưa có hoạt động nhận dạng ảnh riêng. IPA và gợi âm tiếng Việt chưa kiểm chứng được bỏ trống/ghi rõ trạng thái. Giọng đọc tiếng Anh dùng speechSynthesis của thiết bị, khả năng hoạt động ngoại tuyến tùy gói giọng đã cài.

## Phát triển
Node 24 để chạy `npm test` và `npm run validate`. Không cần cài dependencies. `npm start` phục vụ trang tĩnh cổng 4173 bằng Python 3. Mở qua HTTP, không mở index.html bằng file:// vì dữ liệu dùng fetch.

## Phát hành miễn phí
Workflow `.github/workflows/pages.yml` kiểm thử rồi triển khai khi đẩy nhánh main. Repository Settings → Pages → Build and deployment → Source → GitHub Actions. Cần quyền ghi Git và quyền Pages; việc có workflow không có nghĩa đã xuất bản.

## Dữ liệu và bảo mật
Không theo dõi, quảng cáo, SDK ngoài hay thu thập thông tin trẻ. PIN băm SHA-256 kèm salt là chốt cửa đơn giản trên máy, không xác thực an toàn. Tiến độ có thể bị sửa trong trình duyệt; không có giá trị tiền thật. Giá món quà 5 sao được mẹ xác nhận, luôn dưới 500.000 đồng. Không chuyển đổi sao và xu.

Mẹ chỉnh bài, ví dụ, chủ đề, mốc quà, tên/giá đồ trong Góc của mẹ. Nhập JSON theo bản xuất hoặc CSV có cột `level` cùng các trường mục học; cấp liên tiếp đủ 20 mục, không trùng ID/từ. Nhập thay cả bộ; giữ ID ổn định khi chỉnh. Validator kiểm tra cấu trúc, tính duy nhất và cụm từ xuất hiện trong ví dụ, không thay thế kiểm duyệt ngôn ngữ. Bản sao lưu chứa cả nội dung tùy chỉnh, PIN băm và tiến độ.

## Kiểm tra giao diện đã thực hiện
`python3 tests/browser.py` dùng Playwright Python và Chromium có sẵn trong môi trường QA (không phải dependency của trò chơi), với máy chủ đang chạy cổng 4173. Kịch bản đi hết 20 lượt luyện và 10 câu cuối cấp trên màn hình 390px, kiểm tra tải lại, trang bị đồ, PIN, tải sao lưu, đổi/duyệt/trao quà và ôn cấp sau. Kiểm tra Node độc lập không cần Playwright. Không coi kiểm tra giao diện này là kiểm duyệt ngôn ngữ hay xác minh triển khai công khai.

## Biểu tượng điện thoại và chuyển tiến độ
Ứng dụng PWA có manifest, icon gốc PNG và service worker cache toàn bộ bài học/UI theo phạm vi repository. iPhone: Safari → Chia sẻ → Thêm vào Màn hình chính. Android: Chrome → menu → Cài đặt ứng dụng. Mở một lần khi có mạng trước khi học ngoại tuyến. Âm thanh phụ thuộc giọng đọc thiết bị. Bản cập nhật được dùng sau khi đóng tất cả cửa sổ ứng dụng rồi mở lại; workflow gắn mã commit vào tên cache để tránh giữ mã cũ vô thời hạn.

GitHub Pages không có máy chủ đồng bộ. Góc của mẹ → Tạo liên kết chuyển tiến độ tạo bản chụp nén trong phần fragment của URL (không gửi fragment đến máy chủ HTTP). Chỉ gửi riêng: ai có liên kết có thể đọc tiến độ và lịch sử quà. PIN bị loại bỏ. Thiết bị nhận giữ PIN riêng, yêu cầu mở PIN nếu đã thiết lập, xác nhận thay dữ liệu và không hợp nhất/phát thêm thưởng. Luôn chuyển từ thiết bị học gần nhất. Liên kết quá dài hoặc thiết bị không hỗ trợ nén: dùng tệp sao lưu JSON. Trên iOS, Safari và ứng dụng đã cài có thể dùng vùng lưu trữ khác; trong ứng dụng, Góc của mẹ có ô dán liên kết để nhận trực tiếp. Không tuyên bố đồng bộ tự động hay đã kiểm thử cài đặt trên thiết bị iOS thật.

Kiểm thử chuyển và offline: `python3 tests/devices.py` khi server cổng 4173 đang chạy; dùng hai browser context độc lập, kiểm tra nhận/giữ PIN, chặng học, số dư, trang phục, bài học và icon ngoại tuyến.

## Quà theo từng giai đoạn
Góc của mẹ → Chỉnh sửa quà tặng từ mẹ hiển thị trực tiếp biểu mẫu tên, mô tả/lời nhắn, giai đoạn và bật/tắt hiển thị cho mỗi mốc sao. Giữ các mốc 1/2/3/5 sao và quy định Điều ước của Sumo ở mốc 5. Tạm ẩn chỉ ngăn yêu cầu mới; yêu cầu cũ vẫn được duyệt, từ chối và trao quà bình thường. Mỗi yêu cầu lưu bản chụp tên/mô tả/giai đoạn lúc xin quà, nên chỉnh sửa sau không thay lịch sử hay số dư. Dữ liệu cũ thiếu các trường mới vẫn tương thích. Sao lưu và liên kết chuyển thiết bị mang theo cấu hình quà. `python3 tests/rewards-ui.py` kiểm thử biểu mẫu trên màn hình điện thoại với server đang chạy.
