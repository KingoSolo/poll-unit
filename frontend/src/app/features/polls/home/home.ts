import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PollsService } from '../../../core/services/polls';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatIconModule, MatSnackBarModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  allPolls: any[] = [];
  polls: any[] = [];
  activeFilter: 'all' | 'active' | 'closed' = 'all';
  searchQuery = '';

  constructor(
    private pollsService: PollsService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getPolls();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getPolls() {
    this.pollsService.getPolls().subscribe({
      next: (res: any) => {
        this.allPolls = res;
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Failed to load polls', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  setFilter(filter: 'all' | 'active' | 'closed') {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onSearch(query: string) {
    this.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.polls = this.allPolls
      .filter(p => this.activeFilter === 'all' || p.status === this.activeFilter)
      .filter(p => !this.searchQuery ||
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.description?.toLowerCase().includes(this.searchQuery)
      );
  }
}
