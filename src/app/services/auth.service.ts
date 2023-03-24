import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Registration } from '../Interfaces/registration';
import { Login } from '../Interfaces/login';
import { Observable } from 'rxjs';
import { branch } from '../Interfaces/branch';
import { company } from '../Interfaces/company';
import { department } from '../Interfaces/department';
import { request } from '../Interfaces/request';
import { vendors } from '../Interfaces/vendors';
import { scrap } from '../Interfaces/scrap';
import { asset } from '../Interfaces/asset';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  Login(data: Login) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  readonly baseServeUrl = "https://localhost:44377/api/";
  // readonly baseServeUrl = "https://localhost:5001/api/";
  // readonly baseServeUrl = "https://localhost:5000/api/";

  //   const data = { name: 'John Doe', age: 30 };
  //   const jsonData = JSON.stringify(data);

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };

  // this.http.post(url, jsonData, httpOptions).subscribe(...);


  //get method for all tables
  getAllTables(): Observable<any> {
    // debugger
    return this.http.get(this.baseServeUrl + "Registeration/GetAllTables");
  }


  //get method for all dashboard values
  getAllValues(): Observable<any> {
    // debugger
    return this.http.get(this.baseServeUrl + "Reports/DashbordValues");
  }


  //register post service
  registerUser(objRegister: Registration): Observable<any> {
    return this.http.post<Registration>(this.baseServeUrl + "Registeration/NewUser", objRegister);
  }


  //login post service
  loginUser(objLogin: Login): Observable<any> {
    return this.http.post<Login>(this.baseServeUrl + "Registeration/login", objLogin);
  }


  //add post branch
  addasset(objasset: asset): Observable<any> {
    return this.http.post<asset>(this.baseServeUrl + "Asset/AddNew", objasset);
  }


  //get current branch data with the ID
  getAssetById(Assetid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Asset/Getid/" + Assetid);
  }


  //edit branch
  editAsset(asset: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Asset/Update/" + id, asset);
  }


  //delete branch
  deleteAsset(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Asset/Delete/" + id);
  }


  //Asset get Service
  assetDetails(PageNumber: any, pageSize: any, Assets: any): Observable<any> {
    // debugger
    return this.http.get(this.baseServeUrl + "Asset/GetAllAssets?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Assets);
  }


  //add post branch
  addbranch(objbranch: branch): Observable<any> {
    return this.http.post<branch>(this.baseServeUrl + "Branch/AddNew", objbranch);
  }


  //get current branch data with the ID
  getBranchById(Branchid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Branch/Getid/" + Branchid);
  }



  //edit branch
  editBranch(branch: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Branch/Update/" + id, branch);
  }


  //delete branch
  deleteBranch(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Branch/Delete/" + id);
  }


  //Branch get service
  branchDetails(PageNumber: any, pageSize: any, Branches: any): Observable<any> {
    // debugger
    return this.http.get(this.baseServeUrl + "Branch/GetAllBranch?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Branches);
  }


  //add post company
  addcompany(objcompany: company): Observable<any> {
    return this.http.post<company>(this.baseServeUrl + "Company/AddNew", objcompany);
  }


  //get current company data with the ID
  getCompanyById(Companyid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Company/Getid/" + Companyid);
  }


  //edit company
  editCompany(company: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Company/Update/" + id, company);
  }


  //delete company
  deleteCompany(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Company/Delete/" + id);
  }


  //company get service
  companyDetails(PageNumber: any, pageSize: any, Companies: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Company/GetAllComp?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Companies);
  }


  //add post department
  adddepartment(objdepartment: department): Observable<any> {
    return this.http.post<department>(this.baseServeUrl + "Department/AddNew", objdepartment);
  }


  //get current department data with the ID
  getDepartmentById(Depid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Department/Getid/" + Depid);
  }


  //edit department
  editDepartment(department: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Department/Update/" + id, department);
  }


  //delete department
  deleteDepartment(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Department/Delete/" + id);
  }


  //department get service
  depDetails(PageNumber: any, pageSize: any, Departments: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Department/GetAllDep?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Departments);
  }


  //add post request
  addrequest(objrequest: request): Observable<any> {
    return this.http.post<request>(this.baseServeUrl + "Request/CreateNew", objrequest);
  }


  //get current request data with the ID
  getRequestById(Requestid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Request/Getbyid/" + Requestid);
  }


  //get asset dropdown
  assetDropDown(typeid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Request/AssetDropdown/" + typeid);
  }


  //edit request
  editRequest(request: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Request/UpdateRequest/" + id, request);
  }


  //delete request
  deleteRequest(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Request/DeleteRequest/" + id);
  }


  //status change in request
  statusChange(id: any, type: any, isworking: any, inuse: any): Observable<any> {
    debugger
    return this.http.get(this.baseServeUrl + "Request/StatusChange/" + id + '?type=' + type + '&isworking=' + isworking + '&inuse=' + inuse);
  }


  //Request get service
  requestDetails(PageNumber: any, pageSize: any, Requests: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Request/GetAllRequests?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchString=' + Requests);
  }


  //status get service
  statusDetails(PageNumber: any, pageSize: any, Status: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Status/GetAllStatus?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Status);
  }


  //delete User
  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Registeration/Delete/" + id);
  }


  //user get service
  userDetails(PageNumber: any, pageSize: any, Users: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Registeration/GetAllUsers?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Users);
  }



  //add post vendors
  addvendors(objvendors: vendors): Observable<any> {
    return this.http.post<vendors>(this.baseServeUrl + "Vendor/AddNew", objvendors);
  }


  //get current vendor data with the ID
  getVendorById(Vendorid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Vendor/Getid/" + Vendorid);
  }


  //edit vendor
  editVendor(vendor: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Vendor/Update/" + id, vendor);
  }


  //delete vendor
  deleteVendor(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Vendor/Delete/" + id);
  }

  //vendor get service
  vendorDetails(PageNumber: any, pageSize: any, Vendors: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Vendor/GetAllVendors?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Vendors);
  }


  //add post scrap
  addscrap(objscrap: scrap): Observable<any> {
    return this.http.post<scrap>(this.baseServeUrl + "Scrap/AddNew", objscrap);
  }


  //get current scrap data with the ID
  getScrapById(Scrapid: any): Observable<any> {
    return this.http.get(this.baseServeUrl + "Scrap/Getid/" + Scrapid);
  }


  //edit scrap
  editScrap(scrap: any, id: any): Observable<any> {
    return this.http.put(this.baseServeUrl + "Scrap/Update/" + id, scrap);
  }


  //delete scrap
  deleteScrap(id: any): Observable<any> {
    return this.http.delete(this.baseServeUrl + "Scrap/Delete/" + id);
  }


  //scrap get service
  scrapDetails(PageNumber: any, pageSize: any, Scraps: any): Observable<any> {
    //debugger
    return this.http.get(this.baseServeUrl + "Scrap/GetAllScrap?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Scraps);
  }


}
// insertLocationUpdate(location:Locationmanagement): Observable<any> {
//   return this.http.post(API_URL + 'location/insertupdatelocation',location, httpOptions);
// }