

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyRoutingModule } from './currency-routing.module';import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversionTableComponent } from './components/conversion-table/conversion-table.component';

@NgModule({
  declarations: [
    CurrencyConverterComponent,
    ConversionTableComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    ReactiveFormsModule ,
	MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ]
})
export class CurrencyModule { }
