import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  display = '0';

  valorAnterior: number | null = null;
  operador: string | null = null;
  novoValor = false;

  digitar(valor: string): void {
    if (this.display === 'Erro' || this.novoValor) {
      this.display = valor === '.' ? '0.' : valor;
      this.novoValor = false;
      return;
    }

    if (valor === '.' && this.display.includes('.')) {
      return;
    }

    if (this.display === '0' && valor !== '.') {
      this.display = valor;
    } else {
      this.display += valor;
    }
  }

  selecionarOperador(op: string): void {
    const valor = Number(this.display);

    if (!Number.isFinite(valor)) {
      return;
    }

    if (this.operador !== null && !this.novoValor) {
      const resultado = this.calcularResultado(
        this.valorAnterior!,
        valor,
        this.operador
      );

      if (resultado === null) {
        this.display = 'Erro';
        this.valorAnterior = null;
        this.operador = null;
        this.novoValor = true;
        return;
      }

      this.display = String(resultado);
      this.valorAnterior = resultado;
    } else {
      this.valorAnterior = valor;
    }

    this.operador = op;
    this.novoValor = true;
  }

  private calcularResultado(
    a: number,
    b: number,
    op: string
  ): number | null {
    let resultado: number;

    switch (op) {
      case '+':
        resultado = a + b;
        break;

      case '-':
        resultado = a - b;
        break;

      case '*':
        resultado = a * b;
        break;

      case '/':
        if (b === 0) {
          return null;
        }

        resultado = a / b;
        break;

      default:
        return b;
    }

    return Number.isFinite(resultado) ? resultado : null;
  }

  calcular(): void {
    if (this.operador === null || this.valorAnterior === null) {
      return;
    }

    const resultado = this.calcularResultado(
      this.valorAnterior,
      Number(this.display),
      this.operador
    );

    if (resultado === null) {
      this.display = 'Erro';
    } else {
      this.display = String(Number(resultado.toPrecision(10)));
    }

    this.valorAnterior = null;
    this.operador = null;
    this.novoValor = true;
  }

  limpar(): void {
    this.display = '0';
    this.valorAnterior = null;
    this.operador = null;
    this.novoValor = false;
  }

  apagarUltimo(): void {
    if (this.novoValor || this.display === 'Erro') {
      this.display = '0';
      this.novoValor = false;
      return;
    }

    if (this.display.length <= 1) {
      this.display = '0';
    } else {
      this.display = this.display.slice(0, -1);
    }
  }

  trocarSinal(): void {
    if (this.display === '0' || this.display === 'Erro') {
      return;
    }

    this.display = String(Number(this.display) * -1);
  }
}