import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityResponse, ActivityService } from '../../../core/services/activity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
    constructor(
      private authService: Auth,
      private router: Router,
      private activityService: ActivityService,
      private cd: ChangeDetectorRef
    ) {}

    activities: (ActivityResponse & { totalHours: number })[] = [];
    isLoading = true;
    showModal = false;
    newDescription = '';
    isEditMode = false;
    editingId: string | null = null;

    ngOnInit(): void {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        return;
      }

      this.loadActivities();
  }

  loadActivities() {
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.activities = data.map(activity => ({
          ...activity,
          totalHours: activity.TimeActivities.reduce((sum, t) => sum + t.Hours, 0)
        }));
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert(err.error[0].Message);
        if (err.status === 401) {
          this.authService.logout();
        }
      }
    });
  }

  openModal() {
    this.isEditMode = false;
    this.newDescription = '';
    this.editingId = null;
    this.showModal = true;
  }
  editActivity(activity: ActivityResponse) {
    this.isEditMode = true;
    this.newDescription = activity.Descripcion;
    this.editingId = activity.Id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newDescription = '';
    this.isEditMode = false;
    this.editingId = null;
  }

  submitActivity() {
    const payload = {
      Id: this.editingId,
      Descripcion: this.newDescription,
      TimeActivities: []
    };

    const request = this.isEditMode
      ? this.activityService.updateActivity(payload)
      : this.activityService.createActivity(payload);

    request.subscribe({
      next: () => {
        this.closeModal();
        this.loadActivities(); // recarga la tabla
      },
      error: (err) => {
        alert(err.error[0].Message);
      }
    });
  }

  confirmDelete(id: string | null) {
    const confirmed = confirm('¿Estás seguro que deseas eliminar esta actividad?');
    if (confirmed && id !== null) {
      this.activityService.deleteActivity(id).subscribe({
        next: (data) => {
          if (data) {
            this.loadActivities();
          }
        },
        error: (err) => {
          alert(err.error[0].Message);
        }
      });
    }
  }
}
