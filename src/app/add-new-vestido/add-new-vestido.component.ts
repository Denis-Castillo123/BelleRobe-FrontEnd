import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandel } from '../_model/file-handel.model';
import { Vestido } from '../_model/vestido.model';
import { VestidoService } from '../_services/vestido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-vestido',
  templateUrl: './add-new-vestido.component.html',
  styleUrls: ['./add-new-vestido.component.css']
})
export class AddNewVestidoComponent implements OnInit {
  isNewVestido = true;
  vestido: Vestido = {
    vestidoId: 0,
    vestidoName: "",
    vestidoDescription: "",
    vestidoDiscountedPrice: 0,
    vestidoActualPrice: 0,
    vestidoImages:[]
  }

  constructor(private vestidoService: VestidoService, 
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.vestido = this.activatedRoute.snapshot.data['vestido'];

    if(this.vestido && this.vestido.vestidoId){
      this.isNewVestido=false;
    }

  }

  addVestido(vestidoForm: NgForm) {
    const vestidoFormData = this.prepareFormData(this.vestido);
    this.vestidoService.addVestido(vestidoFormData).subscribe(
      (response: Vestido) => {
        vestidoForm.reset();
        this.vestido.vestidoImages = [];
  
        // Mostrar notificación con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El vestido se ha agregado exitosamente.',
          timer: 3000, // Tiempo en milisegundos antes de que la notificación se cierre automáticamente
          timerProgressBar: true, // Mostrar barra de progreso en el temporizador
          position: 'top',
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  

  prepareFormData(vestido: Vestido): FormData {
    const formData = new FormData();

    formData.append(
      'vestido',
      new Blob([JSON.stringify(vestido)], {type: 'application/json'})
    );

    for(var i=0; i<vestido.vestidoImages.length; i++){
      formData.append(
        'imageFile',
        vestido.vestidoImages[i].file,
        vestido.vestidoImages[i].file.name
      );
    }

    return formData;
  } 

  onFileSelected(event: any){
    if(event.target.files){
      const file= event.target.files[0];
      const fileHandel: FileHandel ={
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.vestido.vestidoImages.push(fileHandel);
    }
  }

  removeImages(i: number){
    this.vestido.vestidoImages.splice(i,1);
  }

  fileDropped(fileHandel : FileHandel) {
    this.vestido.vestidoImages.push(fileHandel);
  }

}
