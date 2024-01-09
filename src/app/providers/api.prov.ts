import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  url = environment.apiURL;

  //Login
  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users/login', data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Credenciales incorrectas.\nRevise su correo y contraseña.",
            icon: "error"
          });
        });
    });
  }

  //Autenticacion
  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  //Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  }

  //Registrar usuario
  register(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users', data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  //Obtener usuarios
  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'users')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  //CRUD DE ESTUDIANTES
  getStudents(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'students')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  createStudent(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
    axios.post(this.url + 'students', data, {
      headers: {
        Authorization: token
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
    });
  });
  }

  updateStudent(studentId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.put(this.url + 'students/' + studentId, data, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  deleteStudent(studentId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.delete(this.url + 'students/' + studentId, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  //CRUD DE PRODUCTOS
  getProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'products')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  createProduct(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.post(this.url + 'products', data, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  updateProduct(productId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.put(this.url + 'products/' + productId, data, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  deleteProduct(productId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.delete(this.url + 'products/' + productId, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }
  
  //CRUD DE SERVICIOS
  getServices(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'services')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  createService(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.post(this.url + 'services', data, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  updateService(serviceId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.put(this.url + 'services/' + serviceId, data, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  deleteService(serviceId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios.delete(this.url + 'services/' + serviceId, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
  }
}