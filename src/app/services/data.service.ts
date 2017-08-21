import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	constructor(public http:Http) {

	}

	getUsers() {
		return this.http.get('http://sellinghive.applite.com/NgService')
		.map(res => res.json());
	}

	addUser(user) {
		return this.http.post('http://sellinghive.applite.com/NgService/addUser', user)
		.map(res => res.json());
	}

	deleteUser(id) {
		return this.http.post('http://sellinghive.applite.com/NgService/deleteUser', id)
		.map(res => res.json());
	}

	editUser(user) {
		return this.http.post('http://sellinghive.applite.com/NgService/editUser', user)
		.map(res => res.json());
	}
}