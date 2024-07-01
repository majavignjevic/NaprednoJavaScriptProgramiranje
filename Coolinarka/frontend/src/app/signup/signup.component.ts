import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';
  email: string = '';
  passwordRepeat: string = '';

  constructor(private apiService: ApiServiceService) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.password !== this.passwordRepeat) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.apiService.addUser(newUser).subscribe(
      response => {
        console.log('User added successfully:', response);
        alert('User added successfully');
      },
      error => {
        console.error('Error adding user:', error);
        alert('Error adding user');
      }
    );
  }
}
