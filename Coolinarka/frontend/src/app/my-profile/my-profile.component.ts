import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  isPasswordVisible: boolean = false;
  activeUser: any = {
    user_id: null,
    username: '',
    email: '',
    password_hash: ''
  };

  constructor(
    private activeUserService: ActiveUserService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.activeUser = this.activeUserService.getActiveUser();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  updateProfile() {
    this.apiService.updateUser(this.activeUser.user_id, this.activeUser).subscribe(
      () => {
        console.log('User updated successfully.');
        alert('Profile updated successfully!');
      },
      error => {
        console.error('Error updating user:', error);
        alert('Error updating profile.');
      }
    );
  }
}
