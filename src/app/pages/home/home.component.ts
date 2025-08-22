import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, map, Subject, takeUntil} from 'rxjs';

interface IFormat {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private target: Date = new Date('2025-12-31T00:00:00');
  private remainingSubject = new Subject<IFormat>();
  remaining$ = this.remainingSubject.asObservable();

  ngOnInit(): void {
    interval(1000).pipe(
      map(() => {
        const diffMs = this.target.getTime() - Date.now();
        const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return {days, hours, minutes, seconds};
      }),
      takeUntil(this.destroy$)
    ).subscribe(remaining => this.remainingSubject.next(remaining));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
