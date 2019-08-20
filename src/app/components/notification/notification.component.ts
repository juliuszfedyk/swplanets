import {Component} from '@angular/core';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  public text: string;

  constructor(
    private notificationsService: NotificationsService
  ) {
    this.notificationsService.notification.subscribe((text: string) => {
      this.text = text;
    });
  }

  closeNotification() {
    this.text = null;
  }
}
