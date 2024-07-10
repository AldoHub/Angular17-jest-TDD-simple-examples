import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Tag } from "../shared/types/tag";

import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  //for the http mocking
  afterEach(() => {
    
    //checks theres nothing else loading after the test
    httpTestingController.verify();
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getTags', () => {
    
    it("should return a list of tags", () => {
      let tags:Tag[] | undefined;

      service.getTags().subscribe((response) => {
        tags = response;
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      //pass data you expect to be returning from the http call
      req.flush([]);
      expect(tags).toEqual([]);

    });


  });


  describe('createTag', () => {

    it("should createa a new tag", () => {
      let tag: Tag | undefined;

      service.createTag('tag1').subscribe((response) => {
        tag = response;
      });


      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({
        id: "1",
        name: "foo"
      });

      expect(tag).toEqual({
        id: "1",
        name: "foo"
      });

    })


    it("should pass the correct body data", () => {
      let tag: Tag | undefined;

      service.createTag('tag1').subscribe((response) => {
        tag = response;
      });


      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({
        id: "1",
        name: "foo"
      });

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({name: 'tag1'});

    });

  });



  it("should throw an error if request fails", () => {

    //handle errors
    let actualError: HttpErrorResponse | undefined;

    service.createTag('tag1').subscribe({
      next: () => {
        fail('Success should not be called'); //if we hit this part of the code, the test will fail
      },
      error: (err) => {
        actualError = err;
      }
    });

    const req = httpTestingController.expectOne('http://localhost:3004/tags');
    req.flush('Server Error', {
      status: 422,
      statusText: "Unprocessible entity",
    });

    expect(actualError?.status).toEqual(422);
    expect(actualError?.statusText).toEqual("Unprocessible entity");

  })

});


//MIN 53:51