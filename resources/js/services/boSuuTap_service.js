import {http, httpFile} from "./http_service";

export function getListBoSuuTap()
{
    return http().get('bo-su-tap');
}

export function createBoSuuTap(data)
{
    return httpFile().post('bo-su-tap',data);
}

export function updateBoSuuTap(id, data)
{
    return httpFile().post(`bo-su-tap/${id}`,data);
}

export function deleteBoSuuTap(id)
{
    return http().delete(`bo-su-tap/${id}`);
}
