import { Component } from '@angular/core';
import { ApiProvider } from '../../../providers/api.prov';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css'
})
export class UsersAdminComponent {
  public users: any = [];
  public role: string = '';
  public userEmail = localStorage.getItem('userEmail');
  
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
    ) {
      this.getUsers();
    if(apiProv.isAuthenticatedUser()){
      this.apiProv.getUsers().then((res) => {
        this.users = res.data;
        for(const user of this.users){
         if(user.email == this.userEmail){
            this.role = user.role;
          }
        }
        if(this.role == 'EST'){
          window.location.href = 'products-est';
        }
      });
    }else{
      window.location.href = '/login';
    }
  }

  public getUsers() {
    this.apiProv.getUsers().then(res => {
      this.users = res.data;
    });
  }

  public newUserModal(){
    const dialogRef = this.dialog.open(UserModalComponent,{
      data: {
        new: true
      },
      disableClose: true,
      hasBackdrop: true,
      width: '30%',
      height: '50%',
    });
  }
  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }
}
