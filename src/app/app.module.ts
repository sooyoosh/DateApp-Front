import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoadingComponent } from './loading/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { PhotoEditorComponent } from './member/photo-editor/photo-editor.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TimeagoModule } from 'ngx-timeago';
import { TableModule } from 'primeng/table';
import { MemberMessagesComponent } from './member/member-messages/member-messages.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HasroleDirective } from './directives/hasrole.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    MemberEditComponent,
    LoadingComponent,
    PhotoEditorComponent,
    MemberMessagesComponent,
    AdminComponent,
    HasroleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ToolbarModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    HttpClientModule,
    ToastModule,
    CardModule,
    TabViewModule,
    GalleriaModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    RadioButtonModule,
    PaginatorModule,
    DropdownModule,
    SelectButtonModule,
    TableModule,
    TimeagoModule.forRoot() 
  ],
  providers: [MessageService,provideHttpClient(withInterceptors([authInterceptor,loadingInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
