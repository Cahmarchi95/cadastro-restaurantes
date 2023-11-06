import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroService } from './services/cadastro.service';

@NgModule({
  declarations: [AppComponent, FormularioComponent, CadastroComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CadastroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
