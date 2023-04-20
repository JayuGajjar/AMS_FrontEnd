import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  Login(data: Login) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  // readonly Url = "https://localhost:44377/api/";
  readonly Url = environment.apiURL;
  // readonly Url = "https://localhost:5001/api/";
  // readonly Url = "https://localhost:5000/api/";

  //   const data = { name: 'John Doe', age: 30 };
  //   const jsonData = JSON.stringify(data);

 httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  // this.http.post(url, jsonData, httpOptions).subscribe(...);


  //get method for all tables
  getAllTables(): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Registeration/GetAllTables");
  }



  //get method for all tables
  getReport(): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Reports/ReportGetAllTables");
  }



  //get method for all tables
  getQuantity(): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Reports/ReportGetAllTables");
  }


  
  //get method for inuse
  inuseDetails(PageNumber: any, pageSize: any, InUse: any): Observable<any> {
    debugger
    return this.http.get(this.Url + "Reports/GetInUseTable?pageNumber=" + PageNumber + "&pageSize=" + pageSize + "&searchString=" + InUse);
  }



  //get method for spare
  spareDetails(PageNumber: any, pageSize: any, spares: any): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Reports/GetIsSpareTable?pageNumber=" + PageNumber + "&pageSize=" + pageSize + "&searchString=" + spares);
  }



  //get method for working
  workingDetails(PageNumber: any, pageSize: any, working: any): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Reports/GetIsWorkingTable?pageNumber=" + PageNumber + "&pageSize=" + pageSize + "&searchString=" + working);
  }



  //get method for new request
  newRequestsDetails(PageNumber: any, pageSize: any, newRequests: any): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Reports/GetNew_RequestTable?pageNumber=" + PageNumber + "&pageSize=" + pageSize + "&searchString=" + newRequests);
  }


  //get method for all dashboard values
  getAllValues(): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Reports/DashbordValues");
  }


  //register post service
  registerUser(objRegister: Registration): Observable<any> {
    return this.http.post<Registration>(this.Url + "Registeration/NewUser", objRegister);
  }


  //login post service
  loginUser(objLogin: Login): Observable<any> {
    return this.http.post<Login>(this.Url + "Registeration/login", objLogin);
  }


  //add post branch
  addasset(objasset: asset): Observable<any> {
    return this.http.post<asset>(this.Url + "Asset/AddNew", objasset);
  }


  //get current branch data with the ID
  getAssetById(Assetid: any): Observable<any> {
    return this.http.get(this.Url + "Asset/Getid/" + Assetid);
  }


  //edit branch
  editAsset(asset: any): Observable<any> {
    debugger
    return this.http.post(this.Url + "Asset/Update/", asset);
  }


  //delete branch
  deleteAsset(id: any): Observable<any> {
    return this.http.get(this.Url + "Asset/Delete/" + id);
  }


  //Asset get Service
  assetDetails(PageNumber: any, pageSize: any, Assets: any, branchid: any, typeid: any, vendorid: any, dateid: any): Observable<any> {
    debugger
    return this.http.get(this.Url + "Asset/GetAllAssets?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Assets + '&Brcid=' + branchid + '&Typeid=' + typeid + '&Vendid=' + vendorid + '&DateFilter=' + dateid);
  }


  //add post branch
  addbranch(objbranch: branch): Observable<any> {
    // debugger
    return this.http.post<branch>(this.Url + "Branch/AddNew", objbranch);
  }


  //get current branch data with the ID
  getBranchById(Branchid: any): Observable<any> {
    return this.http.get(this.Url + "Branch/Getid/" + Branchid);
  }



  //edit branch
  editBranch(branch: any): Observable<any> {
    // debugger
    return this.http.post(this.Url + "Branch/Update/", branch);
  }


  //delete branch
  deleteBranch(id: any): Observable<any> {
    return this.http.get(this.Url + "Branch/Delete/" + id);
  }


  //Branch get service
  branchDetails(PageNumber: any, pageSize: any, Branches: any): Observable<any> {
    // debugger
    return this.http.get(this.Url + "Branch/GetAllBranch?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Branches);
  }


  //add post company
  addcompany(objcompany: company): Observable<any> {
    debugger
    return this.http.post<company>(this.Url + "Company/AddNew", objcompany);
  }


  //get current company data with the ID
  getCompanyById(Companyid: any): Observable<any> {
    return this.http.get(this.Url + "Company/Getid/" + Companyid);
  }


  //edit company
  editCompany(company: any): Observable<any> {
    debugger
    return this.http.post(this.Url + "Company/Update/", company);
  }


  //delete company
  deleteCompany(id: any): Observable<any> {
    return this.http.get(this.Url + "Company/Delete/" + id);
  }


  //company get service
  companyDetails(PageNumber: any, pageSize: any, Companies: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Company/GetAllComp?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Companies);
  }


  //add post department
  adddepartment(objdepartment: department): Observable<any> {
    debugger
    return this.http.post<department>(this.Url + "Department/AddNew", objdepartment);
  }


  //get current department data with the ID
  getDepartmentById(Depid: any): Observable<any> {
    return this.http.get(this.Url + "Department/Getid/" + Depid);
  }


  //edit department
  editDepartment(department: any): Observable<any> {
    debugger
    return this.http.post(this.Url + "Department/Update/", department);
  }


  //delete department
  deleteDepartment(id: any): Observable<any> {
    return this.http.get(this.Url + "Department/Delete/" + id);
  }


  //department get service
  depDetails(PageNumber: any, pageSize: any, Departments: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Department/GetAllDep?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Departments);
  }


  //add post request
  addrequest(userid: any, asset: any, justify: any): Observable<any> {
    // debugger
    return this.http.post(this.Url + "Request/CreateNew?userid=" + userid + '&asset=' + asset + '&justify=' + justify, this.httpOptions);
  }

  // assigntopic( userid: number, asset: number,justify:string): Observable<any> {
  //   return this.http.get(this.Url+'Request/CreateNew?userid='+userid+'&asset='+asset+'&justify='+justify);
  // }

  //get current request data with the ID
  getRequestById(Requestid: any): Observable<any> {
    return this.http.get(this.Url + "Request/Getbyid/" + Requestid);
  }


  //get asset dropdown
  assetDropDown(typeid: any): Observable<any> {
    return this.http.get(this.Url + "Request/AssetDropdown/" + typeid);
  }


  //edit request
  editRequest(userid: any, asset: any, justify: any, requestid: any): Observable<any> {
    debugger
    return this.http.post(this.Url + "Request/UpdateRequest?id=" + requestid + "&userid=" + userid + '&asset=' + asset + '&justify=' + justify, this.httpOptions);
  }


  //delete request
  deleteRequest(id: any): Observable<any> {
    return this.http.get(this.Url + "Request/DeleteRequest/" + id);
  }


  //status change in request
  statusChange(id: any, type: any, isworking: any, inuse: any): Observable<any> {
    debugger
    return this.http.get(this.Url + "Request/StatusChange/" + id + '?type=' + type + '&isworking=' + isworking + '&inuse=' + inuse);
  }


  //Request get service for admin
  requestDetailsAdmin(PageNumber: any, pageSize: any, Requests: any, assetid: any, statusid: any, dateid: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Request/GetAllRequests?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchString=' + Requests + '&assetId=' + assetid + '&statId=' + statusid + '&DateFilter=' + dateid);
  }


  //Request get service
  requestDetails(PageNumber: any, pageSize: any, Requests: any, userId: any): Observable<any> {
    debugger
    return this.http.get(this.Url + "Request/GetAllRequests?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchString=' + Requests + '&userId=' + userId);
  }


  //status get service
  statusDetails(PageNumber: any, pageSize: any, Status: any, assetid: any, statusid: any, dateid: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Status/GetAllStatus?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Status + '&Assetid=' + assetid + '&Statid=' + statusid + '&DateFilter=' + dateid);
  }


  //delete User
  deleteUser(id: any): Observable<any> {
    return this.http.get(this.Url + "Registeration/Delete/" + id);
  }


  //user get service
  userDetails(PageNumber: any, pageSize: any, Users: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Registeration/GetAllUsers?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Users);
  }


  //user update method
  editUser(user: any): Observable<any> {
    debugger
    return this.http.post(this.Url + "Registeration/Update", user);
  }



  //user search by id service
  searchUserById(Userid:any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Registeration/Searchbyid/" + Userid);
  }



  //user get service
  changeRole(id: any, role: any): Observable<any> {
    debugger
    return this.http.post(this.Url + "Registeration/SetRole/" + id + '?Role=' + role, this.httpOptions);
  }



  //add post vendors
  addvendors(objvendors: vendors): Observable<any> {
    return this.http.post<vendors>(this.Url + "Vendor/AddNew", objvendors);
  }


  //get current vendor data with the ID
  getVendorById(Vendorid: any): Observable<any> {
    return this.http.get(this.Url + "Vendor/Getid/" + Vendorid);
  }


  //edit vendor
  editVendor(vendor: any): Observable<any> {
    return this.http.post(this.Url + "Vendor/Update/", vendor);
  }


  //delete vendor
  deleteVendor(id: any): Observable<any> {
    return this.http.get(this.Url + "Vendor/Delete/" + id);
  }

  //vendor get service
  vendorDetails(PageNumber: any, pageSize: any, Vendors: any, dateid: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Vendor/GetAllVendors?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Vendors + '&DateFilter=' + dateid);
  }


  //add post scrap
  addscrap(objscrap: scrap): Observable<any> {
    return this.http.post<scrap>(this.Url + "Scrap/AddNew", objscrap);
  }


  //get current scrap data with the ID
  getScrapById(Scrapid: any): Observable<any> {
    return this.http.get(this.Url + "Scrap/Getid/" + Scrapid);
  }


  //edit scrap
  editScrap(scrap: any): Observable<any> {
    return this.http.post(this.Url + "Scrap/Update/" , scrap);
  }


  //delete scrap
  deleteScrap(id: any): Observable<any> {
    return this.http.get(this.Url + "Scrap/Delete/" + id);
  }


  //scrap get service
  scrapDetails(PageNumber: any, pageSize: any, Scraps: any, assetid: any, branchid: any, vendorid: any, dateid: any): Observable<any> {
    //debugger
    return this.http.get(this.Url + "Scrap/GetAllScrap?pageNumber=" + PageNumber + '&pageSize=' + pageSize + '&searchTerm=' + Scraps + '&assetId=' + assetid + '&brcId=' + branchid + '&vedId=' + vendorid + '&DateFilter=' + dateid);
  }


}
// insertLocationUpdate(location:Locationmanagement): Observable<any> {
//   return this.http.post(API_URL + 'location/insertupdatelocation',location, httpOptions);
// }