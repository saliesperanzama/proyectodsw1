import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiProvider } from '../../../providers/api.prov';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrl: './student-modal.component.css'
})
export class StudentModalComponent {
  public new = true;
  public noControl: number = 0;
  public email = '';
  public studentId = '';
  public users: any = [];
  public role: string = '';
  public userEmail = localStorage.getItem('userEmail');
  public students: any = [];
  constructor(
    public dialogRef: MatDialogRef<StudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private apiProv: ApiProvider
  ){
    this.new = datos.new;
    this.studentId = datos.studentId;
    this.noControl = datos.noControl;
    this.email = datos.email;

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

  public createStudent() {
    this.apiProv.getStudents().then((res) => {
      this.students = res.data;

      //Verificar que no exista con noControl
      const existe = this.students.find((student: any) => student.noControl == this.noControl);
      
      if(existe){
        Swal.fire({
          title: 'El estudiante ya existe',
          icon: 'error',
        });
        this.onClose();
      }else{
        
        const data = {
          noControl: this.noControl,
          email: this.email
        }
        
        this.apiProv.createStudent(data)
        .then((res) => {
          if (res) {
            Swal.fire({
              title: 'Estudiante creado',
              icon: 'success',
            });
            this.onClose();
          }
        });
      }
    });
  }

  public updateStudent(): void {
    const data = {
      noControl: this.noControl,
      email: this.email
    }
    
    this.apiProv.updateStudent(this.studentId, data).then((res) => {
      Swal.fire({
        title: 'Estudiante actualizado',
        icon: 'success',
      });
      this.onClose();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
