import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDto, UserService } from '../user.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule],
  template: `
    <h2>User List</h2>
    <button (click)="reload()">Reload</button>
    <ul>
      <li *ngFor="let u of users()">
        #{{u.id}} • {{u.email}} • {{u.roles.join(', ')}} • active={{u.active}}
        <button (click)="edit(u.id)">Edit</button>
        <button (click)="del(u.id)">Delete</button>
      </li>
    </ul>
  `
})
export class UserListComponent implements OnInit {
  private service = inject(UserService);
  private router = inject(Router);

  users = signal<UserDto[]>([]);

  ngOnInit() { this.reload(); }

  reload() {
    this.service.list().subscribe((r: UserDto[]) => this.users.set(r));
  }

  edit(id: number) {
    this.router.navigate(['/users', id]);
  }

  del(id: number) {
    if (!confirm(`Xóa user #${id}?`)) return;
    this.service.remove(id).subscribe(() => this.reload());
  }
}
