import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@coreui/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewRequestRoutingModule } from './new-request-routing.module';
import { NewRequestComponent } from './new-request.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  
  declarations: [
    
  ],

  imports: [
    NewRequestRoutingModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
})
export class NewRequestModule {
}
