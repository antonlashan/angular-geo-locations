import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Delivery } from '../deliveries/delivery.model';

import { ViewService } from './view.service';

@Component({
  selector: 'am-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit, OnDestroy {
  private subs = new Subscription();

  delivery: Delivery;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subs.add(
      this.viewService.getDelivery(id).subscribe(
        res => {
          this.delivery = res;
          this.cdr.detectChanges();
        },
        () => {
          this.router.navigate(['track-deliveries']);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onChangeDelivery(delivery: Delivery) {
    this.delivery = delivery;
    this.cdr.detectChanges();
  }
}
