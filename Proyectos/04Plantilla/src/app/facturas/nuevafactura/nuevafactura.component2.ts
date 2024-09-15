import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturaService } from '../services/factura.service';
import { IFactura } from '../Interfaces/factura';

@Component({
  selector: 'app-nuevafactura',
  templateUrl: './nuevafactura.component.html',
  styleUrls: ['./nuevafactura.component.css']
})
export class NuevafacturaComponent implements OnInit {
  frm_factura: FormGroup;
  listaClientes: any[] = [];
  productoelejido: any[] = [];
  totalapagar: number = 0;
  titulo: string = 'Nueva Factura';

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.frm_factura = this.fb.group({
      Fecha: ['', Validators.required],
      Sub_total: ['', Validators.required],
      Sub_total_iva: ['', Validators.required],
      Valor_IVA: ['0.15'],
      Clientes_idClientes: ['']
    });

    // Cargar clientes y otros datos necesarios
  }

  grabar() {
    if (this.frm_factura.valid) {
      const factura: IFactura = this.frm_factura.value;
      // Llamada al servicio para grabar la factura
    }
  }

  descargarPDF() {
    const idFactura = this.frm_factura.get('idFactura')?.value;
    if (idFactura) {
      this.facturaService.generarPDF(idFactura).subscribe((pdfBlob: Blob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Factura_${idFactura}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  cambio(event: any) {
    // Manejo del cambio de cliente
  }

  productosLista(event: any) {
    // Manejo de la lista de productos
  }

  cargaModal(productForm: any) {
    // Manejo de carga de productos en el modal
  }

  calculos() {
    // Realizar cálculos necesarios
  }
}

