import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Receta } from 'src/app/models/receta';
import { GLOBAL } from 'src/app/services/global';
import { RecetaService } from 'src/app/services/receta.service';
let RecetaNewComponent = class RecetaNewComponent {
    constructor(_route, _router, _userService, _recetaService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._recetaService = _recetaService;
        this.nImagenes = 1;
        this.nVideos = 1;
        this.afuConfig = {
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
        this.afuConfigImage = {
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
        this.afuConfigVideo = {
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
        this.titulo = 'Crear nueva receta';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    ngOnInit() {
        if (this.identity == null) {
            this._router.navigate(['/login']);
        }
        else {
            // Crear receta
            this.receta = new Receta(null, this.identity.sub, null, null, null, null, null, null, null, null, null, null);
        }
    }
    ngDoCheck() {
    }
    onSubmit(form) {
        console.log("this.receta");
        console.log(this.receta);
        this._recetaService.create(this.token, this.receta).subscribe((response) => {
            console.log(response);
        }, (error) => {
            console.log('error');
            console.log(error);
        });
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
};
RecetaNewComponent = __decorate([
    Component({
        selector: 'app-receta-new',
        templateUrl: './receta-new.component.html',
        styleUrls: ['./receta-new.component.css'],
        providers: [UserService, RecetaService],
    })
], RecetaNewComponent);
export { RecetaNewComponent };
//# sourceMappingURL=receta-new.component.js.map