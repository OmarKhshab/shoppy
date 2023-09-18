import { of } from 'rxjs';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let headerComponent: HeaderComponent;
    let translateServiceMock: any;
    let routerMock: any;
    let loginServiceMock: any;

    beforeEach(()=> {
        translateServiceMock = jasmine.createSpyObj('translateServiceMock' , ['currentLang', 'use']);
        routerMock = jasmine.createSpyObj('routerMock', ['navigate']);
        loginServiceMock = jasmine.createSpyObj('loginServiceMock', ['logout', 'loginStatus']);

        headerComponent = new HeaderComponent(translateServiceMock,loginServiceMock,routerMock);
    });

    it('should initalize and go to home page', () => {
        headerComponent.goToHomePage();
        expect(routerMock.navigate).toHaveBeenCalled();
    });

    it('should initalize and logout', () => {
        headerComponent.logout();
        expect(loginServiceMock.logout).toHaveBeenCalled();
    });

    it('should initalize and logout', () => {
        headerComponent.changeLanguage();
        expect(translateServiceMock.use).toHaveBeenCalled();
    });
});