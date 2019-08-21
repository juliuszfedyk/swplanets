import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationsService} from '../../services/notifications.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public text: string;

  constructor(
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit() {
    this.subscription = this.notificationsService.notification.subscribe((text: string) => {
      this.text = text;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeNotification() {
    this.text = null;
  }
}
