import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../member/member-edit/member-edit.component';

export const unsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if(component.editForm.dirty){
    return confirm("you made changed, do you sure to leave this page?!")
  }
  return true
};
