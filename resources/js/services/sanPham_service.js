import {http, httpFile} from "./http_service";

export function getListLoaiSanPham()
{
    return http().get('loai-san-pham');
}

export function getListSanPham()
{
    return http().get('san-pham');
}

export function createSanPham(data)
{
    return httpFile().post('san-pham',data);
}

export function updateSanPham(id, data)
{
    return httpFile().post(`san-pham/${id}`,data);
}

export function deleteSanPham(id)
{
    return http().delete(`san-pham/${id}`);
}

// Chi tiết sản phẩm
export function getListChiTietSanPham(id)
{
    return http().get(`danh-sach-chi-tiet-san-pham/${id}`);
}

export function createChiTietSanPham(data)
{
    return http().post('them-chi-tiet-san-pham',data);
}

export function updateChiTietSanPham(id, data)
{
    return http().post(`cap-nhat-chi-tiet-san-pham/${id}`,data);
}

export function deleteChiTietSanPham(id)
{
    return http().delete(`xoa-chi-tiet-san-pham/${id}`);
}

// Sản phẩm bộ sưu tập
export function getListSanPhamBoSuTap()
{
    return http().get('bo-su-tap');
}

export function getBoSuTapCuaSanPham(id)
{
    return http().get(`bo-suu-tap-cua-san-pham/${id}`);
}

export function createSanPhamBoSuTap(data)
{
    return http().post('them-san-pham-bo-su-tap', data);
}
