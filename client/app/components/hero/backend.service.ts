import {Injectable, Type} from 'angular2/core';
import {Logger} from '../common/logger.service';
import {Hero} from './hero';

const HEROES = [
    new Hero('Windstorm', 'Weather mastery'),
    new Hero('Mr. Nice', 'Killing them with kindness'),
    new Hero('Magneta', 'Manipulates metalic objects')
];

@Injectable()
export class BackendService {
    constructor(private _logger: Logger) {}

    getAll(type:Type) : PromiseLike<any[]>{
        if (type === Hero) {
            // TODO get from the database
            return Promise.resolve<Hero[]>(HEROES);
        }
        let err = new Error('Cannot get object of this type');
        this._logger.error(err);
        throw err;
    }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */