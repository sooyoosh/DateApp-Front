import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  let accountService = inject(AccountService);
  let messagingService=inject(MessageService)
   return accountService.roles$.pipe(
    map(roles => {
      if (roles?.includes("Admin") || roles?.includes("Moderator")) {
        return true;
      } else {
        messagingService.add({
          key: 'toast1',
          severity: 'error',
          summary: 'Error',
          detail: 'You shall not pass'
        });
        return false;
      }
    })
  );

};
