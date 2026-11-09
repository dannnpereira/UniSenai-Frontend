'use client';

import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [valorAnterior, setValorAnterior] = useState<number | null>(null);
  const [operador, setOperador] = useState<string | null>(null);
  const [novoValor, setNovoValor] = useState(false);

  function digitar(valor: string): void {
    if (display === 'Erro' || novoValor) {
      setDisplay(valor === '.' ? '0.' : valor);
      setNovoValor(false);
      return;
    }

    if (valor === '.' && display.includes('.')) {
      return;
    }

    if (display === '0' && valor !== '.') {
      setDisplay(valor);
    } else {
      setDisplay(display + valor);
    }
  }

  function calcularResultado(
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

  function selecionarOperador(op: string): void {
    const valor = Number(display);

    if (!Number.isFinite(valor)) {
      return;
    }

    if (operador !== null && !novoValor) {
      const resultado = calcularResultado(
        valorAnterior!,
        valor,
        operador
      );

      if (resultado === null) {
        setDisplay('Erro');
        setValorAnterior(null);
        setOperador(null);
        setNovoValor(true);
        return;
      }

      setDisplay(String(resultado));
      setValorAnterior(resultado);
    } else {
      setValorAnterior(valor);
    }

    setOperador(op);
    setNovoValor(true);
  }

  function calcular(): void {
    if (operador === null || valorAnterior === null) {
      return;
    }

    const resultado = calcularResultado(
      valorAnterior,
      Number(display),
      operador
    );

    if (resultado === null) {
      setDisplay('Erro');
    } else {
      setDisplay(String(Number(resultado.toPrecision(10))));
    }

    setValorAnterior(null);
    setOperador(null);
    setNovoValor(true);
  }

  function limpar(): void {
    setDisplay('0');
    setValorAnterior(null);
    setOperador(null);
    setNovoValor(false);
  }

  function apagarUltimo(): void {
    if (novoValor || display === 'Erro') {
      setDisplay('0');
      setNovoValor(false);
      return;
    }

    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  }

  function trocarSinal(): void {
    if (display === '0' || display === 'Erro') {
      return;
    }

    setDisplay(String(Number(display) * -1));
  }

  return (
    <main className="pagina">
      <section className="calculadora">
        <h1>Calculadora</h1>

        <div className="visor" aria-live="polite">
          {display}
        </div>

        <div className="botoes">
          <button
            type="button"
            className="botao botao-funcao"
            onClick={limpar}
          >
            AC
          </button>

          <button
            type="button"
            className="botao botao-funcao"
            onClick={apagarUltimo}
          >
            ⌫
          </button>

          <button
            type="button"
            className="botao botao-funcao"
            onClick={trocarSinal}
          >
            +/-
          </button>

          <button
            type="button"
            className="botao botao-operador"
            onClick={() => selecionarOperador('/')}
          >
            ÷
          </button>

          <button type="button" className="botao" onClick={() => digitar('7')}>7</button>
          <button type="button" className="botao" onClick={() => digitar('8')}>8</button>
          <button type="button" className="botao" onClick={() => digitar('9')}>9</button>

          <button
            type="button"
            className="botao botao-operador"
            onClick={() => selecionarOperador('*')}
          >
            ×
          </button>

          <button type="button" className="botao" onClick={() => digitar('4')}>4</button>
          <button type="button" className="botao" onClick={() => digitar('5')}>5</button>
          <button type="button" className="botao" onClick={() => digitar('6')}>6</button>

          <button
            type="button"
            className="botao botao-operador"
            onClick={() => selecionarOperador('-')}
          >
            −
          </button>

          <button type="button" className="botao" onClick={() => digitar('1')}>1</button>
          <button type="button" className="botao" onClick={() => digitar('2')}>2</button>
          <button type="button" className="botao" onClick={() => digitar('3')}>3</button>

          <button
            type="button"
            className="botao botao-operador"
            onClick={() => selecionarOperador('+')}
          >
            +
          </button>

          <button
            type="button"
            className="botao botao-zero"
            onClick={() => digitar('0')}
          >
            0
          </button>

          <button type="button" className="botao" onClick={() => digitar('.')}>.</button>

          <button
            type="button"
            className="botao botao-igual"
            onClick={calcular}
          >
            =
          </button>
        </div>
      </section>
    </main>
  );
}