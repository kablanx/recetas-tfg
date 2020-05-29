import { async, TestBed } from '@angular/core/testing';
import { RecetaEditComponent } from './receta-edit.component';
describe('RecetaEditComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecetaEditComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RecetaEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=receta-edit.component.spec.js.map