import { Component } from '@angular/core';
import { IHistoricoRestaurante } from 'src/app/model/ihistorico-restaurante';
import { HistoricoService } from 'src/app/services/historico.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent {
  historico: IHistoricoRestaurante[];

  constructor(
    private HistoricoService: HistoricoService,
    private location: Location
  ) {
    this.historico = HistoricoService.historico;
  }

  limpar() {
    this.HistoricoService.limpar();
    this.historico = this.HistoricoService.historico;
  }
}
