
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'nav-card',
  templateUrl: './nav-card.html',
  styleUrls: ['./nav-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavCardComponent {
  title = input<string>();
}
