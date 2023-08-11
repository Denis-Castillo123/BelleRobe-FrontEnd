import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError = false;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
  
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
  
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!',
          timer: 3000, // Tiempo en milisegundos antes de que la notificación se cierre automáticamente
          timerProgressBar: true, // Mostrar barra de progreso en el temporizador
          position: 'top',
        });
      },
      (error) => {
        console.log(error);
        this.showError = true; 
      }
    );
  }
  

  registerUser(){
    this.router.navigate(['/register']);
  }
}
