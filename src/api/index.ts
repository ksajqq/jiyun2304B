
import {http} from './http';

export const loginApi = (data: any) => {
    return http.post('/park/login', data);
}

export const listApi = (data: any) => {
    return http.get('/parking/card/list',data)
}