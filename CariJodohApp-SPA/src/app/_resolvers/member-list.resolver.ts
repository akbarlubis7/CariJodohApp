import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from './../_services/user.service';
import { User } from './../_models/user';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    
    constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertifyService.error('problem retrieving users data');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}