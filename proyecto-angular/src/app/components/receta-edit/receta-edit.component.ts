import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { RecetaService } from 'src/app/services/receta.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-receta-edit',
  templateUrl: './receta-edit.component.html',
  styleUrls: ['./receta-edit.component.css'],
  providers: [UserService, RecetaService],
})
export class RecetaEditComponent implements OnInit {
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
    maxSize: '70',
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
    maxSize: '70',
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
    maxSize: '70',
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
    this.titulo = 'Editar receta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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
    this.getReceta(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {}

  onSubmit(form) {
    console.log('this.receta');

    console.log(this.receta);

    if (
      this.receta.descripcion != '' &&
      this.receta.descripcion != null &&
      this.receta.ingredientes != '' &&
      this.receta.ingredientes != null
    ) {

      // Quitar propiedades que no se actualizan
      delete this.receta['comentarios'];
      delete this.receta['descripcion'];
      delete this.receta['comentarios'];
      delete this.receta['likes'];
      delete this.receta['user'];
      delete this.receta['created_at'];
      delete this.receta['updated_at'];

      this._recetaService.update(this.token, this.receta).subscribe(
        (response) => {
          console.log(response);
          form.reset();
          this._router.navigate(['/perfil-usuario', this.receta.id_usuario]);
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

  getReceta(id) {
    this._recetaService.getReceta(id).subscribe(
      (response) => {
        this.receta = response.receta;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
