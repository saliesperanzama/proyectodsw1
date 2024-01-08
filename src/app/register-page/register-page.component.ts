import { Component, Renderer2, ElementRef} from '@angular/core';
import { ApiProvider } from '../providers/api.prov';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  public userName: string = '';
  public noControl: number = 0;
  public email: string = '';
  public password: string = '';
  public password2: string = '';
  public role: string = 'EST';
  public students: any = [];
  public users: any = [];
  public userEmail = localStorage.getItem('userEmail');
  constructor(
    private apiProv: ApiProvider,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {
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
        }else{
          window.location.href = 'products-est';
        }
      });
      // window.location.href = '/books';
    }
  }

  public register() {
    //Verificar que la contraseña sea igual
    if(this.password != this.password2){
      alert('Las contraseñas no coinciden');
      this.password = '';
      this.password2 = '';
      return;
    }
    
    

    // //Verificar que todos los campos esten completos
    // if(this.userName == '' || this.noControl == 0 || this.email == '' || this.password == ''){
    //   alert('Rellene todos los campos');
    //   return;
    // }

    //Verificar que el email y noControl esten en student
    this.apiProv.getStudents().then((res) => {
      this.students = res.data;

      //Verificar email
      const emailExiste = this.students.find((student: any) => student.email == this.email);
      //Verificar noControl
      const noControlExiste = this.students.find((student: any) => student.noControl == this.noControl);

      //Verificar que todos los campos esten completos
      if(this.noControl == 0 || this.email == '' || this.password == '' || this.password2 == ''){
        alert('Rellene todos los campos');
        return;
      }

      if(emailExiste && noControlExiste){
        //Verificar que no se encuentre ya registrado
        this.apiProv.getUsers().then((res) => {
          this.users = res.data;
          
          //Verificar con el numero de control
          const noControlExiste = this.users.find((user: any) => user.noControl == this.noControl);

          if(noControlExiste){
            alert('El usuario ya se encuentra registrado, inicie sesión.');
            this.userName = '';
            this.noControl = 0;
            this.email = '';
            this.password = '';
            this.password2 = '';
            window.location.href = '/login';
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
                alert('Usuario creado, inicie sesión.');
                this.userName = '';
                this.noControl = 0;
                this.email = '';
                this.password = '';
                this.password2 = '';
              }
              window.location.href = '/login';
              console.log(res);
            });
          }
        })
      }else{
        alert('No se encuentra registrado como estudiante \n Verifique que el correo y el número de control sean correctos');
        this.userName = '';
            this.noControl = 0;
            this.email = '';
            this.password = '';
            this.password2 = '';
      }
    });
  }
}
