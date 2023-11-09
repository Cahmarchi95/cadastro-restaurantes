import { Injectable } from '@angular/core';
import { IHistoricoRestaurante } from '../model/ihistorico-restaurante';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  historico: IHistoricoRestaurante[] = [];

  constructor() {}

  adicionarLog(hora: string, data: string, acao: string) {
    const logNovo: IHistoricoRestaurante = {
      hora: hora,
      data: data,
      acao: acao,
    };
    this.historico.push(logNovo);
  }

  limpar() {
    this.historico = [];
  }
}
