import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
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
  {
    name: 'Assets',
    url: '/base/asset',
  },
  {
    name:'Branches',
    url: '/base/branch'
  },
  {
    name: 'Companies',
    url: '/base/company'
  },
  {
    name: 'Departments',
    url: '/base/department'
  },
  {
    name: 'Requests',
    url: '/base/request'
  },
  {
    name: 'Status',
    url: '/base/status'
  },
  {
    name: 'Users',
    url: '/base/users'
  },
  {
    name: 'Vendors',
    url: '/base/vendor'
  },
  {
    name: 'Scraps',
    url: '/base/scrap'
  },
];
