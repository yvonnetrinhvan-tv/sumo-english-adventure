# SUMO – App học tiếng Anh cho bé

## Là gì, cho ai
- Game học tiếng Anh tĩnh (HTML/CSS/JS, miễn phí) cho bé Sumo. Mẹ quản lý trong "Góc của mẹ".
- Chi tiết tính năng: xem `README.md`.

## Quy ước làm việc
- Chat này là nơi DUY NHẤT sửa app. Chat cũ không sửa app nữa.
- Nhánh làm việc: `claude/lucid-brahmagupta-xh0or2`. Nhánh phát hành: `main`.
- BẮT BUỘC: mọi cập nhật giữ tiến độ học cũ. Không đổi khóa lưu `sumo-adventure-v1`, không xóa/đổi tên ID mục học (`tests/fixtures/item-ids.json`), trường mới phải có giá trị mặc định trong `normalize()`. Đổi cấu trúc dữ liệu thì viết bước nâng cấp, không bỏ dữ liệu cũ. `npm test` kiểm tra các điều này (`tests/progress-safety.test.js`).
- Mỗi lần sửa: chạy `npm test` và `npm run validate` trước khi commit.

## Đã chốt (tính đến 2026-11-11)
- 100 cấp, 1.000 từ cốt lõi (2026-11-11): cấp 1–50 học từ mới, cấp 51–100 ôn tập tổng hợp dựng lúc chạy từ chính 1.000 từ đó (`src/review-levels.js`).
- Mẫu một cấp: 20 mục, `difficulty` = số cấp, ID `Lccc-nn`, đủ trường như cấp 1–5, ví dụ phải chứa từ học.
- Đã bỏ phần nuôi linh thú (2026-11-11); giao diện không hiển thị xu; dữ liệu cũ vẫn nằm trong bản lưu. Thưởng còn: XP và Sao Vàng.
- Ôn tập: đục lỗ câu, thiếu chữ cái (l_ve → o), gõ từ; mục `#review`. Mỗi thử thách cấp có 2 câu đục lỗ và 2 câu thiếu chữ cái.
- Mục `core` = `data/curriculum.json` (50 cấp). Không đổi/xóa ID mục; thêm cấp học mới thì cập nhật `CORE_LEVELS` và test, `migrateBase` tự dịch tiến độ.
- Mẹ tự nhập từ vựng, app tự dựng cấp mới (20 từ/cấp).
- Màn học một trang, nút xác nhận ở đáy.
- PWA, ngoại tuyến, chuyển tiến độ qua liên kết hoặc JSON.
- Đồng bộ tự động bằng Firebase Firestore (REST, không SDK), mã ghép nối 24 ký tự, bản sau cùng thắng, không đồng bộ PIN. Mẹ đã duyệt; iPhone dùng Safari.
- Mốc `main` hiện tại: PR #2 đã merge (commit `1fb802b`).

## Bản đồ
| Cần sửa | File |
|---|---|
| Giao diện, luồng màn hình | `src/app.js`, `src/style.css`, `index.html` |
| Luật chơi, câu hỏi, tính điểm | `src/engine.js` |
| Ôn tập, đục lỗ, thiếu chữ cái | `src/engine.js` (clozeQuestion, lettersQuestion, drillQuestions), `src/app.js` (drillHub) |
| Dữ liệu linh thú cũ (chỉ để tương thích) | `src/pets.js` |
| Hình minh họa từ | `src/illustration.js` |
| Mẹ nhập từ vựng | `src/vocab.js` |
| Chuyển tiến độ thủ công | `src/transfer.js` |
| Đồng bộ tự động (Firebase) | `src/sync.js`, `src/sync-config.js`, `docs/dong-bo-firebase.md` |
| Nội dung bài học (50 cấp) | `data/curriculum.json` |
| Cấp ôn tập 51–100 | `src/review-levels.js` |
| Cache ngoại tuyến | `sw.js`, `manifest.webmanifest` |
| Kiểm thử | `tests/` |

## Việc tiếp theo
- Chờ `projectId` và `apiKey` Firebase của mẹ để điền `src/sync-config.js`, rồi mẹ thử trên iPhone thật.
- Mẹ nghe thử giọng mẫu cấp 6–50 và báo từ cần sửa IPA/gợi âm.
- Thử trên iPhone thật: màn hình gõ chữ của câu đục lỗ và thiếu chữ cái.
