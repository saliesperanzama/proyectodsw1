import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiProvider } from '../../../providers/api.prov';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  public userName = '';
  public noControl = 0;
  public email = '';
  public password = '';
  public confirmPassword = '';
  public role = '';
  public users: any = [];
  public userEmail = localStorage.getItem('userEmail');
  public students: any = [];

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private apiProv: ApiProvider
  ){
    this.userName = datos.userName;
    this.noControl = datos.noControl;
    this.email = datos.email;
    this.password = datos.password;
    this.confirmPassword = datos.confirmPassword;
    this.role = datos.role;

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

  public registerUser() {
    if(this.password != this.confirmPassword){
      Swal.fire({
        title: 'Las contraseñas no coinciden',
        icon: 'error',
      });
      return;
    }
    
    //Verificar si es estudiante o administrador
    if(this.role=='EST'){
      //Verificar que el email y noControl esten en student
    this.apiProv.getStudents().then((res) => {
      this.students = res.data;

      //Verificar email
      const emailExiste = this.students.find((student: any) => student.email == this.email);
      //Verificar noControl
      const noControlExiste = this.students.find((student: any) => student.noControl == this.noControl);

      //Verificar que todos los campos esten completos
      if(this.noControl == null || this.email == '' || this.password == '' || this.confirmPassword == ''){
        Swal.fire({
          title: 'Rellene todos los campos.',
          icon: 'error',
        });
        return;
      }

      if(emailExiste && noControlExiste){
        //Verificar que no se encuentre ya registrado
        this.apiProv.getUsers().then((res) => {
          this.users = res.data;
          
          //Verificar con el numero de control
          const noControlExiste = this.users.find((user: any) => user.noControl == this.noControl);

          if(noControlExiste){
            Swal.fire({
              title: 'El usuario ya se encuentra registrado.',
              icon: 'error',
            });
            this.userName = '';
            this.noControl = 0;
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            return; 
          }else{
            //Registrar al usuario
            const data = {
              userName: this.noControl,
              noControl: this.noControl,
              email: this.email,
              password: this.password,
              role: this.role
            }
            this.apiProv.register(data).then((res) => {
              if(res) {
                Swal.fire({
                  title: 'Usuario creado con exito.',
                  icon: 'success',
                });
                this.userName = '';
                this.noControl = 0;
                this.email = '';
                this.password = '';
                this.confirmPassword = '';
              }
              
              console.log(res);
            });
          }
        })
      }else{
        Swal.fire({
          title: 'El usuario que desea registrar no se encuentra registrado como estudiante.',
          icon: 'error',
        });
          this.userName = '';
            this.noControl = 0;
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
      }
    });
    }else{
      //Verificar que todos los campos esten completos
      if(this.noControl == null || this.email == '' || this.password == '' || this.confirmPassword == ''){
        Swal.fire({
          title: 'Rellene todos los campos.',
          icon: 'error',
        });
        return;
      }
      //Verificar que no se encuentre ya registrado
      this.apiProv.getUsers().then((res) => {
        this.users = res.data;
        
        //Verificar con el numero de control
        const noControlExiste = this.users.find((user: any) => user.noControl == this.noControl);

        if(noControlExiste){
          Swal.fire({
            title: 'El usuario ya se encuentra registrado.',
            icon: 'error',
          });
          this.userName = '';
          this.noControl = 0;
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          return; 
        }else{
          //Verificar que no este en la tabla de estudiantes
          this.apiProv.getStudents().then((res) => {
            this.students = res.data;

            //Verificar email
            const emailExiste = this.students.find((student: any) => student.email == this.email);
            //Verificar noControl
            const noControlExiste = this.students.find((student: any) => student.noControl == this.noControl);
          
            if(emailExiste || noControlExiste){
              Swal.fire({
                title: 'El usuario se encuentra registrado como estudiante.',
                icon: 'error',
              });
              this.userName = '';
              this.noControl = 0;
              this.email = '';
              this.password = '';
              this.confirmPassword = '';
              return;
            }else{
              //Registrar al usuario
              const data = {
                userName: this.noControl,
                noControl: this.noControl,
                email: this.email,
                password: this.password,
                role: this.role
              }
              this.apiProv.register(data).then((res) => {
                if(res) {
                  Swal.fire({
                    title: 'Usuario creado con exito.',
                    icon: 'success',
                  });
                  this.userName = '';
                  this.noControl = 0;
                  this.email = '';
                  this.password = '';
                  this.confirmPassword = '';
                }
                console.log(res);
              });
            }
          });
        }
      })
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
