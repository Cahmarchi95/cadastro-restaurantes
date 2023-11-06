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
      })
      .subscribe(() => {
        this.restauranteAdicionado.emit(); // Notifica o componente pai sobre a adição
      });

    if (this.restauranteEmEdicao) {
      // Modo de edição - Salvar as alterações no restaurante
      // Implemente a lógica para salvar a edição no serviço
      this.salvarEdicaoRestaurante.emit(this.restauranteEmEdicao); // Notificar o componente pai
      this.restauranteEmEdicao = null; // Sair do modo de edição
    } else {
      // Modo de adição - Adicionar um novo restaurante
      this.cadastroService
        .addRestaurante({
          id: this.id,
          nome: this.restaurante,
          qtdeRestaurante: this.qtdeRestaurante,
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
    this.restauranteEmEdicao = restaurante;
  }
}
