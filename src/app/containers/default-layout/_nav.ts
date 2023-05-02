import { INavData } from '@coreui/angular';

export const navItems1: INavData[] = [
  {
    name: 'Dashboard',
    role: 1,
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
];
export const navItems2: INavData[] = [
  {
    name: 'Summary',
    type: 1,
    url: '/base/summary',
  },
];
export const navItems3: INavData[] = [
  {
    name: 'New Request',
    role: 2,
    url: '/base/new-request',
  },
];


export const navItems: INavData[] = [

  
  {
    name: 'Assets',
    type: 1,
    url: '/base/asset',
  },
  {
    name: 'Asset Types',
    type: 1,
    url: '/base/assettype',
  },
  {
    name:'Branches',
    type: 1,
    url: '/base/branch'
  },
  {
    name: 'Companies',
    type: 1,
    url: '/base/company'
  },
  {
    name: 'Departments',
    type: 1,
    url: '/base/department'
  },
  // {
  //   name: 'Requests Status',
  //   type: 1,
  //   url: '/base/request'
  // },
  {
    name: 'Assets Status',
    type: 1,
    url: '/base/status'
  },
  {
    name: 'Users',
    type: 1,
    url: '/base/users'
  },
  {
    name: 'Vendors',
    type: 1,
    url: '/base/vendor'
  },
  {
    name: 'Scraps',
    type: 1,
    url: '/base/scrap'
  },
];


