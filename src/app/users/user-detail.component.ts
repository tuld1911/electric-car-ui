import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRole, UserDto, UserService } from '../user.service';

@Component({
  standalone: true,
  selector: 'app-user-detail',
  imports: [CommonModule, FormsModule],
  template: `
    <button (click)="back()">← Back</button>
    <h2>Edit roles • User #{{id}}</h2>

    <div *ngIf="loading()">Loading...</div>
    <form *ngIf="!loading()" (ngSubmit)="save()">
      <p><b>Email:</b> {{user()?.email}}</p>
      <p><b>Active:</b> {{user()?.active ? 'true' : 'false'}}</p>

      <label>
        Roles
        <select multiple [(ngModel)]="roles" name="roles" size="4">
          <option *ngFor="let r of roleOptions" [value]="r">{{r}}</option>
        </select>
      </label>

      <div style="margin-top:12px">
        <button type="submit">Save</button>
      </div>
    </form>
  `
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UserService);

  id!: number;
  user = signal<UserDto | null>(null);
  roles: AppRole[] = [];
  roleOptions: AppRole[] = ['CUSTOMER','STAFF','TECHNICIAN','ADMIN'];
  loading = signal(true);

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(this.id).subscribe({
      next: (u) => { this.user.set(u); this.roles = [...(u.roles ?? [])]; this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  save() {
    this.service.updateRoles(this.id, this.roles).subscribe(() => this.back());
  }

  back() { this.router.navigate(['/users']); }
}
