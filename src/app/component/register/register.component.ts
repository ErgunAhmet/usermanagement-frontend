import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {NotificationService} from "../../service/notification/notification.service";
import {User} from "../../model/User";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationTypeEnum} from "../../enum/notification-type.enum";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subscription: Subscription[] = []

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
  }

  public onRegister(user: User): void {
    this.showLoading = true;
    this.subscription.push(
      this.authenticationService.register(user).subscribe(
        // @ts-ignore
        (response: User) => {
          this.showLoading = false;
          this.sendNotification(NotificationTypeEnum.SUCCESS,
            `A new account was created for ${response.firstName} Please check your email for password to log in.`)
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationTypeEnum.ERROR, errorResponse.error.message)
        }
      )
    )
  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  }

  private sendNotification(notificationTypeEnum: NotificationTypeEnum, message: string): void {
    if (message) {
      this.notificationService.notify(notificationTypeEnum, message);
    } else {
      this.notificationService.notify(notificationTypeEnum, 'An error occurred. Please try again')
    }
  }
}
