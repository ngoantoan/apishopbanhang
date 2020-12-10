import {http, httpFile} from "./http_service";

export function getQuarterlyStatistics()
{
    return http().get('get-quarterly-statistics');
}

export function getCategorytStatistics()
{
    return http().get('get-category-statistics');
}
