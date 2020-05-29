import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Receta } from 'src/app/models/receta';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta-new',
  templateUrl: './receta-new.component.html',
  styleUrls: ['./receta-new.component.css'],
  providers: [UserService, RecetaService],
})
export class RecetaNewComponent implements OnInit {
  public titulo: string;
  public identity;
  public token;
  public receta: Receta;
  public ingredientes;
  public descripcion;

  public nImagenes = 1;
  public nVideos = 1;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ',jpg, .png, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: GLOBAL.url + 'receta/upload',
      headers: {
        Authorization: this._userService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube el avatar de la receta',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
    },
  };

  public afuConfigImage = {
    multiple: false,
    formatsAllowed: ',jpg, .png, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: GLOBAL.url + 'receta/upload',
      headers: {
        Authorization: this._userService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen de la receta',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
    },
  };
  public afuConfigVideo = {
    multiple: false,
    formatsAllowed: '.mp4, .flv, .vk',
    maxSize: '50',
    uploadAPI: {
      url: GLOBAL.url + 'receta/uploadVideo',
      headers: {
        Authorization: this._userService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube un vídeo de la receta',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _recetaService: RecetaService
  ) {
    this.titulo = 'Crear nueva receta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    if (this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      // Crear receta
      this.receta = new Receta(
        null,
        this.identity.sub,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
    }
  }

  ngDoCheck() {}

  onSubmit(form) {
    console.log('this.receta');

    console.log(this.descripcion);
    console.log(this.ingredientes);
    if (
      (this.receta.descripcion != '' && this.receta.descripcion != null) &&
      (this.receta.ingredientes != '' && this.receta.ingredientes != null)
    ) {
      this._recetaService.create(this.token, this.receta).subscribe(
        (response) => {
          console.log(response);
          form.reset();
        },
        (error) => {
          console.log('error');
          console.log(<any>error);
        }
      );
    }
  }

  image1Upload(datos) {
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.receta.image1 = data.image;
    /* let data = JSON.parse(datos.response);
    this.identity.avatar = data.image; */
  }
  image2Upload(datos) {
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.receta.image2 = data.image;
    /* let data = JSON.parse(datos.response);
    this.identity.avatar = data.image; */
  }
  image3Upload(datos) {
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.receta.image3 = data.image;
    /* let data = JSON.parse(datos.response);
    this.identity.avatar = data.image; */
  }
  video1Upload(datos) {
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.receta.video1 = data.video;
    /* let data = JSON.parse(datos.response);
    this.identity.avatar = data.image; */
  }
  video2Upload(datos) {
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.receta.video2 = data.video;
    /* let data = JSON.parse(datos.response);
    this.identity.avatar = data.image; */
  }
}
