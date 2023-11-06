import { Component, EventEmitter, Output } from '@angular/core';
import { CadastroService } from 'src/app/services/cadastro.service';
import { ICadastroRestaurante } from 'src/app/model/icadastro-restaurante';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  restaurante: string = '';
  qtdeRestaurante: number = 0;
  id!: number;
  tipoRestaurante!: string;
  restauranteEmEdicao: ICadastroRestaurante | null = null;

  @Output() restauranteAdicionado = new EventEmitter<void>();
  @Output() salvarEdicaoRestaurante = new EventEmitter<ICadastroRestaurante>();

  constructor(private cadastroService: CadastroService) {}

  public addRestaurante(): void {
    if (!this.restaurante || this.qtdeRestaurante <= 0) {
      return;
    }

    this.cadastroService
      .addRestaurante({
        id: this.id,
        nome: this.restaurante,
        qtdeRestaurante: this.qtdeRestaurante,
        tipoRestaurante: this.tipoRestaurante,
      })
      .subscribe(() => {
        this.restauranteAdicionado.emit();
      });

    if (this.restauranteEmEdicao) {
      this.salvarEdicaoRestaurante.emit(this.restauranteEmEdicao);
      this.restauranteEmEdicao = null;
    } else {
      this.cadastroService
        .addRestaurante({
          id: this.id,
          nome: this.restaurante,
          qtdeRestaurante: this.qtdeRestaurante,
          tipoRestaurante: this.tipoRestaurante,
        })
        .subscribe(() => {
          this.restauranteAdicionado.emit();
        });

      this.restaurante = '';
      this.qtdeRestaurante = 0;
    }

    this.restaurante = '';
    this.qtdeRestaurante = 0;
  }

  public editarRestaurante(restaurante: ICadastroRestaurante): void {
    this.restaurante = restaurante.nome;
    this.qtdeRestaurante = restaurante.qtdeRestaurante;
    this.tipoRestaurante = restaurante.tipoRestaurante;
    this.restauranteEmEdicao = restaurante;
  }
}
