import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  url = environment.apiURL;

  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users/login', data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert('Credenciales incorrectas\nRevise su correo y contraseña.');
        });
    });
  }

  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  }

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

  getBooks(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'books')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  createBook(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
		axios.post(this.url + 'books', data, {
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

  updateBook(bookId: any, data: any): Promise<any> {
	const token = localStorage.getItem('token');
	return new Promise((resolve, reject) => {
		axios.put(this.url + 'books/' + bookId, data, {
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

  deleteBook(bookId: any): Promise<any> {
	const token = localStorage.getItem('token');
	return new Promise((resolve, reject) => {
		axios.delete(this.url + 'books/' + bookId, {
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