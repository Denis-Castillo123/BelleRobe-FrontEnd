import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandel } from './_model/file-handel.model';
import { Vestido } from './_model/vestido.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer : DomSanitizer) { }

  public createImages(vestido: Vestido){
    const vestidoImages: any[] = vestido.vestidoImages;

    const vestidoImagesToFileHandle: FileHandel[] = [];

    for(let i=0; i<vestidoImages.length; i++){
      const imageFileData = vestidoImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type});

      const finalFileHandel : FileHandel = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      vestidoImagesToFileHandle.push(finalFileHandel);
    }
    vestido.vestidoImages = vestidoImagesToFileHandle;
    return vestido;
  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i=0; i<byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;

  }

}
