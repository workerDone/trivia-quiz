import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeWhile, timer } from 'rxjs';
import { NgClass } from '@angular/common';
import { Time } from '../time/time';
import { MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE } from '../time-constants';

@Component({
  selector: 'app-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, Time],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer implements OnInit {
  readonly seconds = input.required<number>();
  readonly expired = output<void>();
  private readonly destroyRef = inject(DestroyRef);

  readonly secondsLeft = signal(0);
  readonly isEnding = computed(
    () => this.secondsLeft() > 0 && this.secondsLeft() <= SECONDS_IN_MINUTE,
  );

  ngOnInit(): void {
    this.secondsLeft.set(this.seconds());
    timer(MILLISECONDS_IN_SECOND, MILLISECONDS_IN_SECOND)
      .pipe(
        // Stop as soon as we hit zero so the countdown never goes negative.
        takeWhile(() => this.secondsLeft() > 0),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.secondsLeft.update((secondsLeft) => secondsLeft - 1);
        // takeWhile ends the stream after this, so `expired` emits exactly once.
        if (this.secondsLeft() === 0) {
          this.expired.emit();
        }
      });
  }
}
