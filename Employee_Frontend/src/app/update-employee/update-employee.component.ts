import { Component, OnInit } from '@angular/core';
import { Employee } from '../entity/employee';
import { EmployeeServiceService } from '../service/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent  implements OnInit{

  id : number;
  employee: Employee = new Employee();
  constructor(private employeeService : EmployeeServiceService,
     private route :ActivatedRoute,
     private router : Router){}

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];

      this.employeeService.getEmployeeById(this.id).subscribe(data => 
      {
        this.employee = data;
      },error => console.log(error));
  }

  onSubmit(){
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
        this.goToEmploeeList();
    }, error => console.log(error));
  }

  goToEmploeeList(){
    this.router.navigate(['/employees']);
  }

}
