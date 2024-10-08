import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

const routes: Routes = [
  { path: 'converter', component: CurrencyConverterComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
