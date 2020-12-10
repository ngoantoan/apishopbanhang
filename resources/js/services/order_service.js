import {http, httpFile} from "./http_service";

export function getListOrders() {
    return http().get('get-list-orders');
}
