import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../services/snackbar.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  currencyForm: FormGroup;
  currencies: string[] = [];
  loading = false;
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private fb: FormBuilder,
    private currencyService: HttpService,
    private snackBarService: SnackbarService
  ) {
    this.currencyForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      fromCurrency: [null, Validators.required],
      toCurrency: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadConversionHistory();
  }

  loadCurrencies(): void {
    this.loading = true;
    this.currencyService.getCurrencies().subscribe({
      next: (response) => {
        this.currencies = Object.keys(response.data.data);
        this.loading = false;
      },
      error: () => {
        this.snackBarService.showError('Failed to load currencies');
        this.loading = false;
      },
    });
  }

  convertCurrency(): void {
    if (this.currencyForm.invalid) {
      this.snackBarService.showInfo('Please provide all fields');
      return;
    }

    const { amount, fromCurrency, toCurrency } = this.currencyForm.value;
    if (fromCurrency === toCurrency) {
      this.snackBarService.showInfo('Please select different currencies');
      return;
    }

    this.loading = true;
    this.currencyService
      .convertCurrency(amount, fromCurrency, toCurrency)
      .subscribe({
        next: (result) => {
          const conversionResult = {
            amount,
            from: fromCurrency,
            to: toCurrency,
            convertedAmount: result.data.convertedAmount,
            date: new Date().toISOString(),
          };

          this.saveConversion(conversionResult);
          this.snackBarService.showSuccess('Conversion Successful');
          this.currencyForm.reset();
          this.loadConversionHistory();
          this.loading = false;
        },
        error: () => {
          this.snackBarService.showError('Conversion failed');
          this.loading = false;
        },
      });
  }

  saveConversion(conversion: any): void {
    if (typeof localStorage !== 'undefined') {
      const conversions = JSON.parse(
        localStorage.getItem('conversions') || '[]'
      );
      conversions.push(conversion);
      localStorage.setItem('conversions', JSON.stringify(conversions));
    } else {
      this.snackBarService.showError('LocalStorage is not available.');
    }
  }

  loadConversionHistory(): void {
    if (typeof localStorage !== 'undefined') {
      const conversions = JSON.parse(
        localStorage.getItem('conversions') || '[]'
      );
      this.dataSource.data = conversions;
    } else {
      this.snackBarService.showError('LocalStorage is not available.');
    }
  }
}
