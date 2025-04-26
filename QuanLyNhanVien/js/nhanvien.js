//* lớp Food giúp tạo đối tượng food
class nhanvien {
    //phương thức khởi tạo => tạo thuộc tính
    constructor(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa) {
        //thuộc tính (property)
        this.maMon = maMon
        this.tenMon = tenMon
        this.loaiMon = loaiMon
        this.giaMon = giaMon
        this.khuyenMai = khuyenMai
        this.tinhTrang = tinhTrang
        this.hinhAnh = hinhAnh
        this.moTa = moTa
        this.giaSauKM = 0 // C2: không cần lưu giá KM
    }

    //phương thức (method)
    //C2: không cần tạo phương thức tinhTienKM
    //C1:
    tinhTienKM() {
       this.giaSauKM = this.giaMon * (100 - this.khuyenMai) / 100
    }

}