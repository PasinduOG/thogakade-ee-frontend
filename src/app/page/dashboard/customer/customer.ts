import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiResponse, CustomerModel } from '../../../../model/types';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  customerList: CustomerModel[] = [];
  customerObj: CustomerModel = {
    id: '',
    title: '',
    name: '',
    dob: '',
    salary: 0,
    address: '',
    city: '',
    province: '',
    postalCode: ''
  };

  isModalOpen = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAll();
  }

  openAddCustomerModal(): void {
    this.isModalOpen = true;
  }

  closeAddCustomerModal(): void {
    this.isModalOpen = false;
  }

  getAll() {
    this.http.get<ApiResponse<CustomerModel[]>>("http://localhost:8080/api/customers").subscribe(response => {
      this.customerList = response.content;
      this.cdr.detectChanges();
    });
  }

  addCustomer() {
    this.http.post<ApiResponse<void>>("http://localhost:8080/api/customers", this.customerObj).subscribe(response => {
      if (response !== null) {
        Swal.fire({
          title: response.message,
          text: `You added ${this.customerObj.name}!`,
          icon: "success"
        });
      }
      this.getAll();
    });
  }

  deleteCustomer(id:String){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete<ApiResponse<void>>(`http://localhost:8080/api/customers/${id}`).subscribe(response => {
          if (response !== null) {
            Swal.fire({
              title: response.message,
              icon: "success"
            });
            this.getAll();
          }
        })
      }
    });
  }
}
