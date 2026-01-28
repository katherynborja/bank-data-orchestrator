import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankDataService, BankUser } from '../../services/bank-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  bankData: BankUser[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private bankDataService: BankDataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadBankData();
  }

  loadBankData(): void {
    console.log('🔄 Iniciando carga de datos desde:', this.bankDataService.getApiUrl());
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.bankDataService.getBankData().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos exitosamente:', data.length, 'usuarios');
        this.bankData = data;
        this.loading = false;
        this.cdr.detectChanges(); // Forzamos a Angular a pintar las tarjetas
      },
      error: (err) => {
        console.error('❌ Error en la carga de datos:', err);
        this.error = err.message || 'Error al cargar los datos';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  retry(): void {
    this.loadBankData();
  }
}

