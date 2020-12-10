import {http, httpFile} from "./http_service";

export function getListLoaiSanPham()
{
    return http().get('loai-san-pham');
}

export function createLoaiSanPham(data)
{
    return httpFile().post('loai-san-pham',data);
}

export function updateLoaiSanPham(id, data)
{
    return httpFile().post(`loai-san-pham/${id}`,data);
}

export function deleteLoaiSanPham(id)
{
    return http().delete(`loai-san-pham/${id}`);
}
