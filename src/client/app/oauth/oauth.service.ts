import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { StorageService } from '../services/storage.service';

@Injectable()
export class OauthService {

    constructor(
        private authHttp: AuthHttp,
        private stoarge: StorageService
    ) { }

    isLogged(): boolean {
        return this.stoarge.get('token');
    }

}
