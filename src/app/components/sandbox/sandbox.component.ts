import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'sandbox',
	template: `
		<div class="container">
			<form (submit)="onSubmit(isEdit)">
				<input type="text" class="form-control" [(ngModel)]="user.name" name="name" placeholder="Enter Name">
				<input type="email" class="form-control" [(ngModel)]="user.email" name="email" placeholder="Enter Email">
				<input type="submit" class="btn btn-default btn-sm">
			</form>
			<ul>
				<li *ngFor="let user of users; let i = index">{{ user.name }} {{user.email}} <button (click)="btnEdit(user, i)">Edit</button> <button (click)="btnDelete(user.id, i)">Delete</button></li>
			</ul>
		</div>
	`,
	styleUrls: ['./sandbox.component.css']
}) 

export class SandboxComponent {
	users:any[];
	user = {
		name: "",
		email: ""
	}

	isEdit:boolean = false;
	editId:number = 0;

	constructor(public dataService:DataService) {
		this.dataService.getUsers().subscribe(users => {
			this.users = users.result;
		});
	}

	onSubmit(isEdit) {
		if(isEdit) {
			this.dataService.editUser(this.user).subscribe(user => {
				this.users.splice(this.editId, 1);
				this.users.unshift(user.result);
			});
		}else {
			this.dataService.addUser(this.user).subscribe(user => {
				//console.log(user);
				this.users.unshift(user.result);
			});
		}
	}

	btnDelete(id, index) {
		this.dataService.deleteUser(id).subscribe(result => {
			if(result.success == 1) {
				this.users.splice(index, 1);
			}
		});
	}

	btnEdit(user, index) {
		this.user = user;
		this.isEdit = true;
		this.editId = index;
	}
}

