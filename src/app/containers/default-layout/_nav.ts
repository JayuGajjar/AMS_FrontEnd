import { INavData } from '@coreui/angular';

export const navItems1: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'New Request',
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
  {
    name: 'Requests',
    type: 1,
    url: '/base/request'
  },
  {
    name: 'Status',
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


