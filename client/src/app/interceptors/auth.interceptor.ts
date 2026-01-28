import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Direct access to avoid Circular Dependency: HttpClient -> Interceptor -> AuthService -> HttpClient
    const token = localStorage.getItem('bank_data_token');

    if (token) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq);
    }

    return next(req);
};
