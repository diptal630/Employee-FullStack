import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../entity/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseURL ="http://localhost:8081/api/v1/employees"
  constructor(private httpClient : HttpClient) { }


  getEmployeesList():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`)
  }

  createEmployee(employee:Employee):Observable<Object>{
    return this.httpClient.post(`http://localhost:8081/api/v1/employees/createemployee`,employee);
  }


  getEmployeeById(id:number) : Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id:number , employee : Employee) : Observable<Object>{
      return this.httpClient.put(`http://localhost:8081/api/v1/employees/updateemployee/${id}`,employee);
  }


  deleteEmployee(id:number):Observable<Object>{
    return this.httpClient.delete(`http://localhost:8081/api/v1/employees/deleteemployee/${id}`);
  }
}
