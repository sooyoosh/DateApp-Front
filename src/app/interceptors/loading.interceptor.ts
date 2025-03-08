import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService=inject(LoadingService);
  loadingService.show();
  return next(req).pipe(
    delay(1000),
    finalize(()=>{
      loadingService.hide();
    })
  );
};
