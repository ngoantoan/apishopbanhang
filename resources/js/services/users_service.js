import {http, httpFile} from "./http_service";

export function getNhaVien()
{
    return http().get('danh-sach-nhan-vien');
}

export function getCustomers()
{
    return http().get('danh-sach-khach-hang');
}

export function createUser(data)
{
    return http().post('users',data);
}

export function updateUser(id, data)
{
    return http().post(`users/${id}`,data);
}

export function deleteUser(id)
{
    return http().delete(`users/${id}`);
}
