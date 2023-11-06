import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/services/cadastro.service';
import { ICadastroRestaurante } from 'src/app/model/icadastro-restaurante';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  listaRestaurantes: ICadastroRestaurante[] = [];
  restauranteEmEdicao: ICadastroRestaurante | null = null;

  constructor(private cadastroService: CadastroService) {}

  ngOnInit() {
    this.getRestaurantes();
  }

  restauranteAdicionado() {
    this.getRestaurantes();
  }

  public excluirRestaurante(i: number): void {
    const restauranteId = this.listaRestaurantes[i].id;
    this.cadastroService.excluirRestaurante(restauranteId).subscribe(() => {
      this.getRestaurantes();
    });
  }

  getRestaurantes(): void {
    this.cadastroService.getAllRestaurantes().subscribe((listaRestaurantes) => {
      this.listaRestaurantes = listaRestaurantes;
    });
  }

  editarRestaurante(restaurante: ICadastroRestaurante) {
    this.restauranteEmEdicao = restaurante;
  }

  salvarEdicaoRestaurante(restauranteEditado: ICadastroRestaurante) {
    this.cadastroService
      .updateRestaurante(restauranteEditado)
      .subscribe((updatedRestaurante) => {
        this.getRestaurantes();
        this.restauranteEmEdicao = null;
      });
  }
}
