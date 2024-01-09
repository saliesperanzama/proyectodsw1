import { Component } from '@angular/core';
import { ApiProvider } from '../../../providers/api.prov';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  public users: any = [];
  public role: string = '';
  //Obtener email del localstorage
  public userEmail = localStorage.getItem('userEmail');

  constructor(private apiProv: ApiProvider) {  
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
  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }
}
