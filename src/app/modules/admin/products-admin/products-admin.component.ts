import { Component } from '@angular/core';
import { ApiProvider } from '../../../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { PsModalComponent } from '../ps-modal/ps-modal.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
  public users: any = [];
  public role: string = '';
  public userEmail = localStorage.getItem('userEmail');
  public products: any = [];

  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
    ) {
      this.getProducts();
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

  public getProducts() {
    this.apiProv.getProducts().then(res => {
      this.products = res.data;
    });
  }

  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
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
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getProducts();
    });
  }

  public deleteProduct(product: any) {
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar producto: ' + product.nombre + ' ?',
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