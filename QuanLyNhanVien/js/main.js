// Tạo lớp Nhân Viên
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
      this.taiKhoan = taiKhoan;
      this.hoTen = hoTen;
      this.email = email;
      this.matKhau = matKhau;
      this.ngayLam = ngayLam;
      this.luongCB = Number(luongCB);
      this.chucVu = chucVu;
      this.gioLam = Number(gioLam);
      this.tongLuong = this.tinhTongLuong();
      this.loaiNV = this.xepLoaiNV();
    }
  
    tinhTongLuong() {
      let heSo = 1;
      if (this.chucVu === "Sếp") heSo = 3;
      else if (this.chucVu === "Trưởng Phòng") heSo = 2;
      return this.luongCB * heSo;
    }
  
    xepLoaiNV() {
      if (this.gioLam >= 192) return "Xuất sắc";
      if (this.gioLam >= 176) return "Giỏi";
      if (this.gioLam >= 160) return "Khá";
      return "Trung bình";
    }
  }
  
  // Mảng lưu danh sách nhân viên
const dsNhanVien = [];

// Lấy dữ liệu từ form và thêm nhân viên
const themNhanVien = () => {
  const taiKhoan = document.getElementById("tknv").value;
  const hoTen = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const matKhau = document.getElementById("password").value;
  const ngayLam = document.getElementById("datepicker").value;
  const luongCB = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gioLam = document.getElementById("gioLam").value;

  const nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
  dsNhanVien.push(nv);

  hienThiDanhSach();
  resetForm();
};

// Hiển thị danh sách ra bảng
const hienThiDanhSach = () => {
  const tbody = document.getElementById("tableDanhSach");
  tbody.innerHTML = ""; // clear bảng cũ

  dsNhanVien.forEach(nv => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nv.taiKhoan}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong.toLocaleString()}</td>
      <td>${nv.loaiNV}</td>
    `;
    tbody.appendChild(row);
  });
};

// Reset form sau khi thêm
const resetForm = () => {
  document.getElementById("formQLNV").reset();
};

// Gán sự kiện cho nút thêm nhân viên
document.getElementById("btnThemNV").onclick = themNhanVien;


const validateForm = () => {
  const getValue = id => document.getElementById(id).value.trim();
  const showError = (id, message) => document.getElementById(id).innerText = message;

  let isValid = true;

  const taiKhoan = getValue("tknv");
  const hoTen = getValue("name");
  const email = getValue("email");
  const matKhau = getValue("password");
  const ngayLam = getValue("datepicker");
  const luongCB = +getValue("luongCB");
  const chucVu = getValue("chucvu");
  const gioLam = +getValue("gioLam");

  const check = (condition, id, message) => {
    if (!condition) {
      showError(id, message);
      isValid = false;
    } else {
      showError(id, "");
    }
  };
  
  check(/^\d{4,6}$/.test(taiKhoan), "tbTKNV", "Tài khoản 4-6 ký số, không để trống");
  check(/^[A-Za-zÀ-ỹ\s]+$/.test(hoTen), "tbTen", "Tên phải là chữ, không để trống");
  check(/^\S+@\S+\.\S+$/.test(email), "tbEmail", "Email không hợp lệ");
  check(/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/.test(matKhau), "tbMatKhau", "Mật khẩu 6-10 ký tự, có số, in hoa, ký tự đặc biệt");
  check(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(ngayLam), "tbNgay", "Định dạng mm/dd/yyyy");
  check(luongCB >= 1000000 && luongCB <= 20000000, "tbLuongCB", "Lương từ 1 triệu đến 20 triệu");
  check(["Giám đốc", "Trưởng phòng", "Nhân viên"].includes(chucVu), "tbChucVu", "Chọn chức vụ hợp lệ");
  check(gioLam >= 80 && gioLam <= 200, "tbGiolam", "Giờ làm từ 80 đến 200"); 
  return isValid;
};

// Gắn sự kiện onclick bằng arrow function
document.getElementById("btnThemNV").onclick = () => {
  const isValid = validateForm();
  if (isValid) {
    themNhanVien();
  } 
  else {
    alert("Vui lòng kiểm tra lại thông tin.");
  }
};


  // Biến toàn cục lưu danh sách nhân viên
let danhSachNhanVien = [];

// Hàm render bảng nhân viên
const renderTable = (danhSach) => {
  const tbody = document.getElementById("tableDanhSach");
  tbody.innerHTML = "";

  danhSach.forEach(nv => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${nv.taiKhoan}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong}</td>
      <td>${nv.loaiNV}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="xoaNhanVien('${nv.taiKhoan}')">
          <i class="fa fa-trash"></i>
        </button>
        <button class="btn btn-info btn-sm" onclick="suaNhanVien('${nv.taiKhoan}')">
          <i class="fa fa-pencil"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
};

const xoaNhanVien = (taiKhoan) => {
  const xacNhan = confirm("Bạn có chắc chắn muốn xoá nhân viên này?");
  if (!xacNhan) return;

  danhSachNhanVien = danhSachNhanVien.filter(nv => nv.taiKhoan !== taiKhoan);
  localStorage.setItem("DSNV", JSON.stringify(danhSachNhanVien));
  renderTable(danhSachNhanVien);
};

  
document.getElementById("btnCapNhat").onclick = () => {
  const taiKhoan = document.getElementById("tknv").value;
  const hoTen = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const ngayLam = document.getElementById("datepicker").value;
  const luongCB = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gioLam = document.getElementById("gioLam").value;

  let danhSachNV = JSON.parse(localStorage.getItem("DSNV")) || [];
  const index = danhSachNV.findIndex(nv => nv.taiKhoan === taiKhoan);

  if (index !== -1) {
      danhSachNV[index] = {
          taiKhoan,
          hoTen,
          email,
          password,
          ngayLam,
          luongCB,
          chucVu,
          gioLam
      };

      localStorage.setItem("DSNV", JSON.stringify(danhSachNV));
      hienThiDanhSach(danhSachNV);
      $("#myModal").modal("hide"); // Ẩn modal sau khi cập nhật
  }
};