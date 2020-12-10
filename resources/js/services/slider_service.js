import {http, httpFile} from "./http_service";

export function getListSlider()
{
    return http().get('slider');
}

export function createSlider(data)
{
    return http().post('slider',data);
}

export function updateSlider(id, data)
{
    return http().post(`slider/${id}`,data);
}

export function deleteSlider(id)
{
    return http().delete(`slider/${id}`);
}
