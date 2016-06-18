import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LogonService } from '../../../services';
import { FormBuilder, Validators } from '@angular/common';
import { Http, Headers } from '@angular/http';
// IUserData
import { ILogonData } from '../../../interfaces';
const template = require('./logon.component.html');
const styles = require('./logon.component.css');

@Component({
  selector: 'logon',
  template: template,
  styles: [styles]
})
export class Logon {
  private logonForm: any;
  private imageData: any;

  constructor(private logonService: LogonService,
              private formBuilder: FormBuilder) {
    this.logonForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public logon($event, username, password) {
    $event.preventDefault();
    const data = <ILogonData> {
      name: username,
      password: password
    };
    this.logonService.doLogon(data).subscribe(
      userData => {
        console.log(data);
        alert('Logon succeeded!');
      },
      error => {
        console.log(error);
        alert('Logon forbidden!');
      }
    );
  }
}
