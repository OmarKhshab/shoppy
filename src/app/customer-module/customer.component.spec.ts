import { of } from 'rxjs';
import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
    let customerComponent: CustomerComponent;
    let productsServiceMock;

    beforeEach(()=> {
        productsServiceMock = jasmine.createSpyObj('productsServiceMock' , ['getCategories']);

        productsServiceMock.getCategories.and.returnValue(
            of(["electronics","jewelery","men's clothing","women's clothing"]),
        );

        customerComponent = new CustomerComponent(productsServiceMock);
    });

    it('should initalize component with load category', () => {
        customerComponent.ngOnInit();
        expect(customerComponent.categories).toBeTruthy();
    });

});