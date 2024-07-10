import { TestBed } from "@angular/core/testing";
import { UsersService } from "./users.service";
import { User } from "../shared/types/user";
import { UtilsService } from "./utils.service";

describe('UsersService', () => {

    let usersService: UsersService;
    let utilsService: UtilsService; // for spy functionality only

    //mock the utilsService - for mock functionality only
    const utilsServiceMock = {
      pluck: jest.fn() //mock the pluck function using this empty function
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          UsersService,
          UtilsService, //used for spy functionality - when we dont want to use mock functionality
          {provide: UtilsService, useValue: utilsServiceMock} //used only for mocked up functionality
        ]
      });

      //create the service instance
      usersService = TestBed.inject(UsersService);
      utilsService = TestBed.inject(UtilsService); // for spy

    });
    
    it('creates a service', () => {
      expect(usersService).toBeTruthy();
    });

  
    describe("addUser function", () => {
      it("should add a new user", () => {

        let user:User = {
          id: '2',
          name: 'testUser'
        }

        usersService.addUser(user);
          expect(usersService.users).toEqual([{
            id: '2',
            name: 'testUser'
          }]
        );

      });


      it("should add a new user - observable", () => {

        let user:User = {
          id: '2',
          name: 'testUser'
        }
  
        usersService.addUser(user);
          expect(usersService.users$.getValue()).toEqual([{
            id: '2',
            name: 'testUser'
          }]
        );
  
      });
  
    });


    describe("removeUser function", () => {
      it("should add a new user", () => {

        //set the users to have some values
        usersService.users = [{
          id: '2',
          name: 'testUser'
        }];

        usersService.removeUser('2');
        expect(usersService.users).toEqual([]);

      });

      it("should add a new user - observable", () => {

        //set the users to have some values
        usersService.users$.next([{
          id: '2',
          name: 'testUser'
        }]);

        usersService.removeUser('2');
        expect(usersService.users$.getValue()).toEqual([]);

      });

    });

    describe("getUsernames function", () => {

      it("should return the correct usernames - with mock", () => {
        //make the mock function to return something in order for the test to be passed
        utilsServiceMock.pluck.mockReturnValue(['foo']);
        expect(usersService.getUsernames()).toEqual(["foo"]);
      });


      it("should return the correct usernames - with Spy", () => {
        
        usersService.users = [{
          id: '2',
          name: 'testUser'
        }];

        //use spyon
        jest.spyOn(utilsService, "pluck");
        //call the function to test
        usersService.getUsernames();
        
        //make the expectation by passing the required parameters to the needed function
        expect(utilsService.pluck).toHaveBeenCalledWith(
          usersService.users,
          "name"
        );

      });

    });


    

});