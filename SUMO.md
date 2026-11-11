# SUMO – App học tiếng Anh cho bé

## Là gì, cho ai
- Game học tiếng Anh tĩnh (HTML/CSS/JS, miễn phí) cho bé Sumo. Mẹ quản lý trong "Góc của mẹ".
- Chi tiết tính năng: xem `README.md`.

## Quy ước làm việc
- Chat này là nơi DUY NHẤT sửa app. Chat cũ không sửa app nữa.
- Nhánh làm việc: `claude/lucid-brahmagupta-xh0or2`. Nhánh phát hành: `main`.
- Mỗi lần sửa: chạy `npm test` và `npm run validate` trước khi commit.

## Đã chốt (tính đến 2026-11-11)
- 5 cấp, 100 mục có nội dung. Bản đồ 100 cấp, phần chưa có nội dung bị khóa.
- Linh thú thay cửa hàng avatar. Sumo điều khiển linh thú, trang phục đổi theo giai đoạn.
- Mẹ tự nhập từ vựng, app tự dựng cấp mới (20 từ/cấp).
- Màn học một trang, nút xác nhận ở đáy.
- PWA, ngoại tuyến, chuyển tiến độ qua liên kết hoặc JSON.
- Mốc `main` hiện tại: PR #2 đã merge (commit `1fb802b`).

## Bản đồ
| Cần sửa | File |
|---|---|
| Giao diện, luồng màn hình | `src/app.js`, `src/style.css`, `index.html` |
| Luật chơi, câu hỏi, tính điểm | `src/engine.js` |
| Linh thú, xu, trứng | `src/pets.js`, `src/petart.js` |
| Cảnh Sumo cưỡi linh thú | `src/rider.js` |
| Hình minh họa từ | `src/illustration.js` |
| Mẹ nhập từ vựng | `src/vocab.js` |
| Chuyển tiến độ | `src/transfer.js` |
| Nội dung bài học | `data/curriculum.json` |
| Cache ngoại tuyến | `sw.js`, `manifest.webmanifest` |
| Kiểm thử | `tests/` |

## Việc tiếp theo
- (Điền khi có yêu cầu mới.)
