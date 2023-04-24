import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from './requirement';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  // Mockup Data
  //   requirements: Requirement[] = [
  //   {
  //     id: 123,
  //     title: 'USB wire',
  //     contactMobileNo: '0807071657'
  //   },
  //   {
  //     id: 124,
  //     title: 'USB A wire',
  //     contactMobileNo: '0801234567'
  //   },
  //   {
  //     id: 125,
  //     title: 'USB C wire',
  //     contactMobileNo: '0123456789'
  //   },
  // ];

  constructor(private httpClient: HttpClient) {}

  getRequirements(): Observable<Requirement[]> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.get<Requirement[]>(url);
  }

  // get by Id
  getRequirementById(id: number): Observable<Requirement> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.get<Requirement>(`${url}/${id}`);
  }

  addRequirement(newRequirement: Requirement): Observable<Requirement> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.post<Requirement>(url, newRequirement);
  }

  deleteRequirement(id: number): Observable<void> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.delete<void>(`${url}/${id}`);
  }

 editRequirement(id: number, editRequirement: Requirement): Observable<void> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.put<void>(`${url}/${id}`, editRequirement);
  }

  approveRequirement(id: number): Observable<void> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.patch<void>(`${url}/${id}`, { status: 'A'});
    // patch คือ การ update แค่บางค่า ของ field เท่านั้น จะอัพเดทให้ได้
  }

  setLoggedOut() {
    sessionStorage.clear();
  }

  isLoggedIn() {
    return sessionStorage.getItem('loggedInUser') != null;
  }



}
