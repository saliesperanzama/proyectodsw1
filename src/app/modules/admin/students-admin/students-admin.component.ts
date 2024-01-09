import { Component } from '@angular/core';
import { ApiProvider } from '../../../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { StudentModalComponent } from '../student-modal/student-modal.component';

@Component({
  selector: 'app-students-admin',
  templateUrl: './students-admin.component.html',
  styleUrl: './students-admin.component.css'
})
export class StudentsAdminComponent {
  public users: any = [];
  public students: any = [];
  public role: string = '';
  //Obtener email del localstorage
  public userEmail = localStorage.getItem('userEmail');

  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
    ) {  
    this.getStudents();
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

  public getStudents() {
    this.apiProv.getStudents().then(res => {
      this.students = res.data;
    });
  }

  public newStudentModal() {
    const dialogRef = this.dialog.open(StudentModalComponent,{
      data: {
        new: true
      },
      disableClose: true,
      hasBackdrop: true,
      width: '30%',
      height: '30%',
    });
  }

  public updateStudentModal(student: any) {
    const dialogRef = this.dialog.open(StudentModalComponent,{
      data: {
        new: false,
        studentId: student._id,
        noControl: student.noControl,
        email: student.email
      },
      disableClose: true,
      hasBackdrop: true,
      width: '30%',
      height: '30%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getStudents();
    });
  }

  public deleteStudent(student: any) {
    Swal.fire({
      showCancelButton: true,
      title: '¿Estas seguro?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        const isEmailInUsers = this.users.some((user: { email: string }) => user.email == student.email);
        if(isEmailInUsers){
          alert('No se puede eliminar el estudiante porque tiene un usuario asociado');
        }else{
          this.apiProv.deleteStudent(student._id)
          .then(
            (res) => {
              Swal.fire({
                title: "Estudiante Eliminado",
                icon: "success"
              });
              this.getStudents();
              console.log(res);
            }
            );
        }
      }
    });
  }

  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }
}
