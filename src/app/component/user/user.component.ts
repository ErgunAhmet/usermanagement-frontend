import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../model/User";
import {UserService} from "../../service/user/user.service";
import {NotificationService} from "../../service/notification/notification.service";
import {NotificationTypeEnum} from "../../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private titleSubject = new BehaviorSubject<string> ('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[] = [];
  public refreshing: boolean = false;
  private subscription: Subscription[] = [];
  public selectedUser: User | undefined;

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUsers(true)
  }


  public changeTitle(title: string): void {
    this.titleSubject.next(title)
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscription.push(
      this.userService.getUsers().subscribe(
        // @ts-ignore
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationTypeEnum.SUCCESS, `${response.length} users(s) loaded successfully`)
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationTypeEnum.ERROR, errorResponse.error.message())
        }
      )
    )
  }
  onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    // @ts-ignore
    document.getElementById('openUserInfo').click();

  }

  private sendNotification(notificationTypeEnum: NotificationTypeEnum, message: string): void {
    if (message) {
      this.notificationService.notify(notificationTypeEnum, message);
    } else {
      this.notificationService.notify(notificationTypeEnum, 'An error occurred. Please try again')
    }
  }
}
