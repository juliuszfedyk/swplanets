import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notification = new EventEmitter();
  public setNotification (text) {
    this.notification.emit(text);
  }
}
