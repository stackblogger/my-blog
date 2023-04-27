import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, TruncatePipe],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
