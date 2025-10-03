import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  standalone: true,                         // ✅ standalone component
  selector: 'app-home-component',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']       // ✅ dùng styleUrls (dạng mảng)
})
export class HomeComponent implements OnInit {
  title = 'Google OAuth2 Demo';
  user = signal<any | null>(null);
  loading = signal(true);

  constructor(private auth: AuthService, private userSvc: UserService) {}

  ngOnInit() {
    this.refreshUser();
  }

  refreshUser() {
    this.loading.set(true);
    this.userSvc.me().subscribe({
      next: (u: any) => {                   // ✅ gõ kiểu cho u để hết TS7006
        this.user.set(u);
        this.loading.set(false);
        console.log('me()', u);
      },
      error: () => {
        this.user.set(null);
        this.loading.set(false);
      }
    });
  }

  login()  { this.auth.loginWithGoogle(); }
  logout() { this.auth.logout(); }
}
