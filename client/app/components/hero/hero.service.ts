import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {BackendService} from './backend.service';
import {Logger} from '../common/logger.service';

@Injectable()
export class HeroService {
    constructor(
        private _backend: BackendService,
        private _logger: Logger) { }

    private _heroes:Hero[] = [];

    getHeroes() {
        this._backend.getAll(Hero).then( (heroes:Hero[]) => {
            this._logger.log(`Fetched ${heroes.length} heroes.`);
            this._heroes.push(...heroes); // fill cache
        });
        return this._heroes;
    }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */