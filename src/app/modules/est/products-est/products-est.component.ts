import { Component } from '@angular/core';
import { ApiProvider } from '../../../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { PsModalComponent } from '../../admin/ps-modal/ps-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-est',
  templateUrl: './products-est.component.html',
  styleUrl: './products-est.component.css'
})
export class ProductsEstComponent {
  public users: any = [];
  public role: string = '';
  public userEmail = localStorage.getItem('userEmail');
  public products: any = [];

  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
  ){
    this.getProducts();
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

  public getProducts() {
    this.apiProv.getProducts().then(res => {
      this.products = res.data;
    });
  }

  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }

  public newProductModal() {
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
      this.getProducts();
    });
  }

  public updateProductModal(product: any) {
    const dialogRef = this.dialog.open(PsModalComponent, {
      data: {
        productId: product._id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        telefono: product.telefono,
        img: product.img,
        vendedor: product.vendedor
      },
      disableClose: true,
      hasBackdrop: true,
      width: '50%',
      height: '70%',
    });
  }

  public deleteProduct(product: any) {
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar Producto: ' + product.nombre + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteProduct(product._id)
        .then(
          (res) => {
            Swal.fire({
              title: "Producto Eliminado",
              icon: "success"
            });
            this.getProducts();
          }
        );
      }
    });
  }
}
