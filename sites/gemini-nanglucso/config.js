// Mọi thông tin cần thay đổi nằm ở đây. Sửa xong lưu lại, tải lại trang là thấy.
window.SITE_CONFIG = {
  // Giá gốc 1 tài khoản, năm đầu tiên, đơn vị đồng. Hiện gạch ngang cạnh giá ưu đãi. Để 0 thì ẩn.
  listPriceVnd: 6156000,

  // Giá ưu đãi khách thực trả, đã gồm VAT. Là số tiền trong mã QR. Để 0 khi chưa chốt giá: trang hiện "Giá đang cập nhật".
  // Nhớ sửa PRICE_VND trong Apps Script cho giống.
  priceVnd: 4924800,

  // Tài khoản nhận tiền. bankId là mã ngân hàng theo VietQR (ví dụ: VCB, TCB, MB, ACB, BIDV, ICB).
  // Để trống thì mã QR chưa hiện.
  bank: {
    bankId: "",
    accountNo: "",
    accountName: "",
    bankName: "",
  },

  // Link Web App của Google Apps Script (giai đoạn 2). Để trống: trang chạy chế độ xem thử, không lưu đơn.
  endpoint: "https://script.google.com/macros/s/AKfycbztS8E50S4Nc5bdptT-MvdXhnUD4zfrwVhSYMu3otIKrQWhuN6v0DCT934PB4z93BJbzQ/exec",

  supportEmail: "product@futureskills.edu.vn",
};
