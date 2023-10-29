import { Component, OnInit } from '@angular/core';
import { Employee } from '../entity/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{

  id:number
  employee:Employee
  constructor(private router : ActivatedRoute, private employeeService : EmployeeServiceService){}

  ngOnInit(): void {
      this.id = this.router.snapshot.params['id'];

      this.employee = new Employee();
      this.employeeService.getEmployeeById(this.id).subscribe( 
        data => {
          this.employee = data;
        }
      )
  }
}
