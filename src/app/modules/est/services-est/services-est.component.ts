import { Component } from '@angular/core';
import { ApiProvider } from '../../../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { PsModalComponent } from '../../admin/ps-modal/ps-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-est',
  templateUrl: './services-est.component.html',
  styleUrl: './services-est.component.css'
})
export class ServicesEstComponent {
  public users: any = [];
  public role: string = '';
  public userEmail = localStorage.getItem('userEmail');
  public services: any = [];

  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
  ){
    this.getServices();
    if(apiProv.isAuthenticatedUser()){
      this.apiProv.getUsers().then((res) => {
        this.users = res.data;
        for(const user of this.users){
         if(user.email == this.userEmail){
            this.role = user.role;
          }
        }
        if(this.role == 'ADMIN'){
          window.location.href = 'home-admin';
        }
      });
    }else{
      window.location.href = '/login';
    }
  }

  public getServices() {
    this.apiProv.getServices().then(res => {
      this.services = res.data;
    });
  }

  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }

  public newServiceModal() {
    const dialogRef = this.dialog.open(PsModalComponent, {
      data: {
        new: true
      },
      disableClose: true,
      hasBackdrop: true,
      width: '50%',
      height: '70%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getServices();
    });
  }

  public updateServiceModal(service: any) {
    const dialogRef = this.dialog.open(PsModalComponent, {
      data: {
        serviceId: service._id,
        nombre: service.nombre,
        descripcion: service.descripcion,
        precio: service.precio,
        telefono: service.telefono,
        img: service.img,
        vendedor: service.vendedor
      },
      disableClose: true,
      hasBackdrop: true,
      width: '50%',
      height: '70%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getServices();
    });
  }

  public deleteService(service: any) {
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar Servicio: ' + service.nombre + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteService(service._id)
        .then(
          (res) => {
            Swal.fire({
              title: "Servicio Eliminado",
              icon: "success"
            });
            this.getServices();
          }
        );
      }
    });
  }
}
