import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  title = 'Google OAuth2 Demo';
  user = signal<any | null>(null);
  loading = signal(false);

  constructor(private auth: AuthService, private userSvc: UserService) {}


  ngOnInit() {
    this.refreshUser();
  }


  refreshUser() {
    this.loading.set(true);
    this.userSvc.me().subscribe({
      next: (u) => {
        this.user.set(u);
        this.loading.set(false);
        console.log(this.user);
      },
      error: () => {
        this.user.set(null);
        this.loading.set(false);
      }
    });
  }


  login() { this.auth.loginWithGoogle(); }
  logout() { this.auth.logout(); }
}
