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

  restauranteId!: number;
  restaurante: string = '';
  qtdeRestaurante: number = 0;
  tipoRestaurante: string = '';

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
    this.restauranteId = restaurante.id;
    this.restaurante = restaurante.nome;
    this.qtdeRestaurante = restaurante.qtdeRestaurante;
    this.tipoRestaurante = restaurante.tipoRestaurante;
    this.restauranteEmEdicao = restaurante;
  }

  botaoEdicao() {
    const restauranteEditado: ICadastroRestaurante = {
      nome: this.restaurante,
      qtdeRestaurante: this.qtdeRestaurante,
      id: this.restauranteId,
      tipoRestaurante: this.tipoRestaurante,
    };
    this.salvarEdicaoRestaurante(restauranteEditado, this.restauranteId);
  }

  salvarEdicaoRestaurante(
    restauranteEditado: ICadastroRestaurante,
    id: number
  ) {
    this.cadastroService
      .updateRestaurante(restauranteEditado, id)
      .subscribe(() => {
        this.getRestaurantes();
        this.restauranteEmEdicao = null;
      });
  }
}
