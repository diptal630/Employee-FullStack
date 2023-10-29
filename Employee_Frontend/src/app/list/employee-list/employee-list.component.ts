import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/entity/employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent  implements OnInit{


  employees : Employee[];
  constructor( private employeeService: EmployeeServiceService, private router:Router){}

  ngOnInit() : void {
    this.getEmployees();
  }
   private getEmployees(){
      this.employeeService.getEmployeesList().subscribe(
        data => { this.employees = data;
        });
    }

  updateEmployee(id: number){
    this.router.navigate(['update-employee',id])
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    })
  }


  employeeDetails(id:number){
    this.router.navigate(['employee-details',id])
  }
  
  }

