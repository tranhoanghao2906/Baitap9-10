/////////////// In ra table danh sách nhân viên//////////
// Sample employee data (replace with actual data source as needed)
const employeeList = [
  {
      account: "NV001",
      fullName: "Nguyễn Văn A",
      email: "nva@example.com",
      startDate: "2023-10-01",
      position: "Nhân viên",
      totalSalary: "10000000",
      rating: "Giỏi"
  },
  {
      account: "NV002",
      fullName: "Trần Thị B",
      email: "ttb@example.com",
      startDate: "2023-09-15",
      position: "Trưởng phòng",
      totalSalary: "15000000",
      rating: "Xuất sắc"
  },
  {
      account: "NV003",
      fullName: "Lê Văn C",
      email: "lvc@example.com",
      startDate: "2023-11-20",
      position: "Sếp",
      totalSalary: "20000000",
      rating: "Khá"
  }
];

// Function to render employee table
function renderEmployeeTable() {
  const tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML = ""; // Clear existing content

  employeeList.forEach(employee => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${employee.account}</td>
          <td>${employee.fullName}</td>
          <td>${employee.email}</td>
          <td>${employee.startDate}</td>
          <td>${employee.position}</td>
          <td>${employee.totalSalary}</td>
          <td>${employee.rating}</td>
          <td>
              <button class="btn btn-warning btn-sm" onclick="editEmployee('${employee.account}')">
                  <i class="fa fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employee.account}')">
                  <i class="fa fa-trash"></i>
              </button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

// Placeholder functions for edit and delete (to be implemented based on your needs)
function editEmployee(account) {
  alert(`Edit employee with account: ${account}`);
  // Logic to populate modal with employee data for editing
}

function deleteEmployee(account) {
  if (confirm(`Are you sure you want to delete employee with account: ${account}?`)) {
      // Logic to remove employee from the list
      const index = employeeList.findIndex(emp => emp.account === account);
      if (index !== -1) {
          employeeList.splice(index, 1);
          renderEmployeeTable(); // Re-render table after deletion
      }
  }
}

// Run the render function when the page loads
document.addEventListener("DOMContentLoaded", function () {
  renderEmployeeTable();
});




////////////////////////Thêm nhân viên mới///////////////////////////

/**
 * Quản lý nhân viên
 * CRUD: Create, Read, Update, Delete
 * + Thêm, xóa, sửa, đọc
 * + Tìm kiếm, bộ lọc (filter), sắp xếp, phân trang
 */

// Lớp NhanVien giúp tạo đối tượng nhân viên
class NhanVien {
  constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
      this.taiKhoan = taiKhoan;
      this.hoTen = hoTen;
      this.email = email;
      this.matKhau = matKhau;
      this.ngayLam = ngayLam;
      this.luongCoBan = luongCoBan;
      this.chucVu = chucVu;
      this.gioLam = gioLam;
      this.tongLuong = 0;
      this.xepLoai = "";
  }

  tinhTongLuong() {
      let heSo = this.chucVu === "Sếp" ? 3 : this.chucVu === "Trưởng phòng" ? 2 : 1;
      this.tongLuong = (this.luongCoBan * heSo).toFixed(0);
  }

  tinhXepLoai() {
      if (this.gioLam >= 192) {
          this.xepLoai = "Xuất sắc";
      } else if (this.gioLam >= 176) {
          this.xepLoai = "Giỏi";
      } else if (this.gioLam >= 160) {
          this.xepLoai = "Khá";
      } else {
          this.xepLoai = "Trung bình";
      }
  }
}

// Lớp NhanVienList quản lý danh sách nhân viên
class NhanVienList {
  constructor() {
      this.nhanVienArr = [];
  }

  themNhanVien(nhanVien) {
      this.nhanVienArr.push(nhanVien);
  }

  xoaNhanVien(taiKhoan) {
      this.nhanVienArr = this.nhanVienArr.filter(nv => nv.taiKhoan !== taiKhoan);
  }

  capNhatNhanVien(nhanVienUpdate) {
      let index = this.nhanVienArr.findIndex(nv => nv.taiKhoan === nhanVienUpdate.taiKhoan);
      if (index !== -1) {
          this.nhanVienArr[index] = nhanVienUpdate;
      }
  }
}

// Thể hiện của lớp NhanVienList
const nhanVienList = new NhanVienList();

// Hàm hiển thị bảng danh sách nhân viên
const hienThiTable = () => {
  let tbody = document.querySelector("#tableDanhSach");
  let contentTable = "";
  
  nhanVienList.nhanVienArr.map((nv, index) => {
      let trNhanVien = `<tr>
          <td>${nv.taiKhoan}</td>
          <td>${nv.hoTen}</td>
          <td>${nv.email}</td>
          <td>${nv.ngayLam}</td>
          <td>${nv.chucVu}</td>
          <td>${parseInt(nv.tongLuong).toLocaleString()}</td>
          <td>${nv.xepLoai}</td>
          <td>
              <button onclick="xoaNhanVien('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
              <button onclick="xemChiTietNhanVien('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal" class="btn btn-info">Xem</button>
          </td>
      </tr>`;
      contentTable += trNhanVien;
  });

  tbody.innerHTML = contentTable;
};

// Hàm hiển thị thông tin nhân viên mới trên giao diện
const hienThiThongTinNhanVienMoi = (nhanVien) => {
  document.querySelector("#spTaiKhoan").textContent = nhanVien.taiKhoan;
  document.querySelector("#spHoTen").textContent = nhanVien.hoTen;
  document.querySelector("#spEmail").textContent = nhanVien.email;
  document.querySelector("#spNgayLam").textContent = nhanVien.ngayLam;
  document.querySelector("#spChucVu").textContent = nhanVien.chucVu;
  document.querySelector("#spTongLuong").textContent = parseInt(nhanVien.tongLuong).toLocaleString();
  document.querySelector("#spXepLoai").textContent = nhanVien.xepLoai;

  document.querySelector("#thongTinNhanVienMoi").style.display = "block";
};

// Hàm lưu vào localStorage
const setLocalStorage = () => {
  let nhanVienJSON = JSON.stringify(nhanVienList.nhanVienArr);
  localStorage.setItem("NHAN_VIEN_LIST", nhanVienJSON);
};

// Hàm lấy từ localStorage
const getLocalStorage = () => {
  if (localStorage.getItem("NHAN_VIEN_LIST") != null) {
      let nhanVienJSON = localStorage.getItem("NHAN_VIEN_LIST");
      nhanVienList.nhanVienArr = JSON.parse(nhanVienJSON);
      hienThiTable();
  }
};

// Lấy dữ liệu từ localStorage khi load web
getLocalStorage();

/**
* Thêm nhân viên mới
* Input: taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam
* Process:
*  B1: Lấy giá trị từ form
*  B2: Kiểm tra dữ liệu
*  B3: Tạo đối tượng nhân viên
*  B4: Thêm nhân viên vào nhanVienArr
*  B5: Hiển thị nhanVienArr lên table và giao diện
*  B6: Lưu vào localStorage
*/
const themNhanVien = () => {
  // B1: Lấy dữ liệu từ form
  let taiKhoan = document.querySelector("#tknv").value.trim();
  let hoTen = document.querySelector("#name").value.trim();
  let email = document.querySelector("#email").value.trim();
  let matKhau = document.querySelector("#password").value.trim();
  let ngayLam = document.querySelector("#datepicker").value.trim();
  let luongCoBan = document.querySelector("#luongCB").value.trim();
  let chucVu = document.querySelector("#chucvu").value;
  let gioLam = document.querySelector("#gioLam").value.trim();

  // B2: Kiểm tra dữ liệu
  let loi = {};
  let hopLe = true;

  if (!taiKhoan || taiKhoan.length < 4 || taiKhoan.length > 6) {
      loi.taiKhoan = "Tài khoản phải từ 4 đến 6 ký tự.";
      hopLe = false;
  } else if (nhanVienList.nhanVienArr.some(nv => nv.taiKhoan === taiKhoan)) {
      loi.taiKhoan = "Tài khoản đã tồn tại.";
      hopLe = false;
  }

  if (!hoTen || !/^[a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]+$/.test(hoTen)) {
      loi.hoTen = "Họ và tên chỉ chứa chữ cái và khoảng trắng.";
      hopLe = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      loi.email = "Email không hợp lệ.";
      hopLe = false;
  }

  if (!matKhau || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(matKhau)) {
      loi.matKhau = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
      hopLe = false;
  }

  if (!ngayLam || !/^\d{2}\/\d{2}\/\d{4}$/.test(ngayLam)) {
      loi.ngayLam = "Ngày làm phải có định dạng DD/MM/YYYY.";
      hopLe = false;
  }

  luongCoBan = parseFloat(luongCoBan);
  if (isNaN(luongCoBan) || luongCoBan < 1000000 || luongCoBan > 20000000) {
      loi.luongCoBan = "Lương cơ bản phải từ 1,000,000 đến 20,000,000.";
      hopLe = false;
  }

  if (!["Sếp", "Trưởng phòng", "Nhân viên"].includes(chucVu)) {
      loi.chucVu = "Vui lòng chọn chức vụ hợp lệ.";
      hopLe = false;
  }

  gioLam = parseFloat(gioLam);
  if (isNaN(gioLam) || gioLam < 80) {
      loi.gioLam = "Giờ làm phải từ 80 giờ trở lên.";
      hopLe = false;
  }

  document.querySelector("#tbTKNV").textContent = loi.taiKhoan || "";
  document.querySelector("#tbTen").textContent = loi.hoTen || "";
  document.querySelector("#tbEmail").textContent = loi.email || "";
  document.querySelector("#tbMatKhau").textContent = loi.matKhau || "";
  document.querySelector("#tbNgay").textContent = loi.ngayLam || "";
  document.querySelector("#tbLuongCB").textContent = loi.luongCoBan || "";
  document.querySelector("#tbChucVu").textContent = loi.chucVu || "";
  document.querySelector("#tbGiolam").textContent = loi.gioLam || "";

  if (!hopLe) {
      return;
  }

  // B3: Tạo đối tượng nhân viên
  let nhanVien = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
  nhanVien.tinhTongLuong();
  nhanVien.tinhXepLoai();

  // B4: Thêm nhân viên vào nhanVienArr
  nhanVienList.themNhanVien(nhanVien);

  // B5: Hiển thị lên table và giao diện
  hienThiTable();
  hienThiThongTinNhanVienMoi(nhanVien);

  // B6: Lưu vào localStorage
  setLocalStorage();

  // B7: Xóa biểu mẫu và đóng modal
  document.querySelector("#myModal form").reset();
  document.querySelectorAll(".sp-thongbao").forEach(span => (span.textContent = ""));
  $("#myModal").modal("hide");
};

document.querySelector("#btnThemNV").onclick = themNhanVien;

// Hàm xóa nhân viên
const xoaNhanVien = (taiKhoan) => {
  nhanVienList.xoaNhanVien(taiKhoan);
  setLocalStorage();
  getLocalStorage();
};

/**
* Cập nhật nhân viên
* Hàm 1: Xem thông tin nhân viên
* Hàm 2: Cập nhật nhân viên
*/
const xemChiTietNhanVien = (taiKhoan) => {
  let nhanVienObjFind = nhanVienList.nhanVienArr.find(nv => nv.taiKhoan === taiKhoan);

  if (nhanVienObjFind) {
      document.querySelector("#tknv").value = nhanVienObjFind.taiKhoan;
      document.querySelector("#tknv").disabled = true;
      document.querySelector("#name").value = nhanVienObjFind.hoTen;
      document.querySelector("#email").value = nhanVienObjFind.email;
      document.querySelector("#password").value = nhanVienObjFind.matKhau;
      document.querySelector("#datepicker").value = nhanVienObjFind.ngayLam;
      document.querySelector("#luongCB").value = nhanVienObjFind.luongCoBan;
      document.querySelector("#chucvu").value = nhanVienObjFind.chucVu;
      document.querySelector("#gioLam").value = nhanVienObjFind.gioLam;

      // Hiển thị nút Cập nhật, ẩn nút Thêm
      document.querySelector("#btnCapNhat").style.display = "inline-block";
      document.querySelector("#btnThemNV").style.display = "none";
  }
};

const capNhatNhanVien = () => {
  // B1: Lấy dữ liệu đã cập nhật từ form
  let taiKhoan = document.querySelector("#tknv").value.trim();
  let hoTen = document.querySelector("#name").value.trim();
  let email = document.querySelector("#email").value.trim();
  let matKhau = document.querySelector("#password").value.trim();
  let ngayLam = document.querySelector("#datepicker").value.trim();
  let luongCoBan = document.querySelector("#luongCB").value.trim();
  let chucVu = document.querySelector("#chucvu").value;
  let gioLam = document.querySelector("#gioLam").value.trim();

  // B2: Kiểm tra dữ liệu
  let loi = {};
  let hopLe = true;

  if (!hoTen || !/^[a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]+$/.test(hoTen)) {
      loi.hoTen = "Họ và tên chỉ chứa chữ cái và khoảng trắng.";
      hopLe = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      loi.email = "Email không hợp lệ.";
      hopLe = false;
  }

  if (!matKhau || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(matKhau)) {
      loi.matKhau = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
      hopLe = false;
  }

  if (!ngayLam || !/^\d{2}\/\d{2}\/\d{4}$/.test(ngayLam)) {
      loi.ngayLam = "Ngày làm phải có định dạng DD/MM/YYYY.";
      hopLe = false;
  }

  luongCoBan = parseFloat(luongCoBan);
  if (isNaN(luongCoBan) || luongCoBan < 1000000 || luongCoBan > 20000000) {
      loi.luongCoBan = "Lương cơ bản phải từ 1,000,000 đến 20,000,000.";
      hopLe = false;
  }

  if (!["Sếp", "Trưởng phòng", "Nhân viên"].includes(chucVu)) {
      loi.chucVu = "Vui lòng chọn chức vụ hợp lệ.";
      hopLe = false;
  }

  gioLam = parseFloat(gioLam);
  if (isNaN(gioLam) || gioLam < 80) {
      loi.gioLam = "Giờ làm phải từ 80 giờ trở lên.";
      hopLe = false;
  }

  document.querySelector("#tbTen").textContent = loi.hoTen || "";
  document.querySelector("#tbEmail").textContent = loi.email || "";
  document.querySelector("#tbMatKhau").textContent = loi.matKhau || "";
  document.querySelector("#tbNgay").textContent = loi.ngayLam || "";
  document.querySelector("#tbLuongCB").textContent = loi.luongCoBan || "";
  document.querySelector("#tbChucVu").textContent = loi.chucVu || "";
  document.querySelector("#tbGiolam").textContent = loi.gioLam || "";

  if (!hopLe) {
      return;
  }

  // B3: Tạo đối tượng nhân viên chứa thông tin cập nhật
  let nhanVienUpdate = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
  nhanVienUpdate.tinhTongLuong();
  nhanVienUpdate.tinhXepLoai();

  // B4: Cập nhật nhân viên trong mảng
  nhanVienList.capNhatNhanVien(nhanVienUpdate);

  // B5: Lưu vào localStorage và hiển thị lại
  setLocalStorage();
  getLocalStorage();

  // B6: Xóa biểu mẫu và đóng modal
  document.querySelector("#myModal form").reset();
  document.querySelectorAll(".sp-thongbao").forEach(span => (span.textContent = ""));
  document.querySelector("#tknv").disabled = false;
  document.querySelector("#btnCapNhat").style.display = "none";
  document.querySelector("#btnThemNV").style.display = "inline-block";
  $("#myModal").modal("hide");
};

document.querySelector("#btnCapNhat").onclick = capNhatNhanVien;

