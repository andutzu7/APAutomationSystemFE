import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  panelOpenState = false;
  users: User[]= [];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getUsers().subscribe(
      resp => {
        this.users = resp;
      });
  }

  removeUser(identifier: string){
    this.authService.deleteUser(identifier).subscribe(answer => {
      this.showSuccess("Successfully deleted!")
    });
  }

  showSuccess(successMessage: string) {
    let snackBarRef = this.snackBar.open(successMessage,  "OK");

    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    })
  }
}
