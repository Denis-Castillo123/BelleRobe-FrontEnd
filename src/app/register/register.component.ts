import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isRegisterButtonDisabled: boolean = true;
  isLinear = true;
  registerForm!: FormGroup;

  constructor(private userService : UserService,
    private fb: FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });

    this.registerForm.statusChanges.subscribe(status => {
      this.isRegisterButtonDisabled = status !== 'VALID';
    });
  }

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
  
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Te has registrado exitosamente!',
          timer: 3000, // Tiempo en milisegundos antes de que la notificación se cierre automáticamente
          timerProgressBar: true, // Mostrar barra de progreso en el temporizador
          position: 'top',
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

}
