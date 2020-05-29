import { async, TestBed } from '@angular/core/testing';
import { RecetaMostrarComponent } from './receta-mostrar.component';
describe('RecetaMostrarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecetaMostrarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RecetaMostrarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=receta-mostrar.component.spec.js.map