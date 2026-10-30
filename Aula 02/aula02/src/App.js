import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [novoValor, setNovoValor] = useState(false);

  function digitar(valor) {
    if (display === 'Erro' || novoValor) {
      setDisplay(valor === '.' ? '0.' : valor);
      setNovoValor(false);
      return;
    }

    if (valor === '.' && display.includes('.')) {
      return;
    }

    setDisplay((atual) => {
      if (atual === '0' && valor !== '.') {
        return valor;
      }

      return atual + valor;
    });
  }

  function selecionarOperador(op) {
    const valor = Number(display);

    if (!Number.isFinite(valor)) {
      return;
    }

    if (operador !== null && !novoValor) {
      const resultado = calcularResultado(
        Number(valorAnterior),
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

  function calcularResultado(a, b, op) {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b === 0 ? null : a / b;
      default:
        return b;
    }
  }

  function calcular() {
    if (operador === null || valorAnterior === null) {
      return;
    }

    const resultado = calcularResultado(
      Number(valorAnterior),
      Number(display),
      operador
    );

    if (resultado === null || !Number.isFinite(resultado)) {
      setDisplay('Erro');
    } else {
      setDisplay(
        String(Number(resultado.toPrecision(10)))
      );
    }

    setValorAnterior(null);
    setOperador(null);
    setNovoValor(true);
  }

  function limpar() {
    setDisplay('0');
    setValorAnterior(null);
    setOperador(null);
    setNovoValor(false);
  }

  function apagarUltimo() {
    if (novoValor || display === 'Erro') {
      setDisplay('0');
      setNovoValor(false);
      return;
    }

    setDisplay((atual) => {
      if (atual.length <= 1) {
        return '0';
      }

      return atual.slice(0, -1);
    });
  }

  function trocarSinal() {
    if (display === '0' || display === 'Erro') {
      return;
    }

    setDisplay((atual) =>
      String(Number(atual) * -1)
    );
  }

  function criarBotao(texto, acao, classe = '') {
    return (
      <button
        key={texto}
        type="button"
        className={`botao ${classe}`}
        onClick={acao}
      >
        {texto}
      </button>
    );
  }

  return (
    <main className="pagina">
      <section className="calculadora">
        <h1>Calculadora</h1>

        <div className="visor" aria-live="polite">
          {display}
        </div>

        <div className="botoes">
          {criarBotao('AC', limpar, 'botao-funcao')}
          {criarBotao('⌫', apagarUltimo, 'botao-funcao')}
          {criarBotao('+/-', trocarSinal, 'botao-funcao')}
          {criarBotao('÷', () => selecionarOperador('/'), 'botao-operador')}

          {criarBotao('7', () => digitar('7'))}
          {criarBotao('8', () => digitar('8'))}
          {criarBotao('9', () => digitar('9'))}
          {criarBotao('×', () => selecionarOperador('*'), 'botao-operador')}

          {criarBotao('4', () => digitar('4'))}
          {criarBotao('5', () => digitar('5'))}
          {criarBotao('6', () => digitar('6'))}
          {criarBotao('−', () => selecionarOperador('-'), 'botao-operador')}

          {criarBotao('1', () => digitar('1'))}
          {criarBotao('2', () => digitar('2'))}
          {criarBotao('3', () => digitar('3'))}
          {criarBotao('+', () => selecionarOperador('+'), 'botao-operador')}

          {criarBotao('0', () => digitar('0'), 'botao-zero')}
          {criarBotao('.', () => digitar('.'))}
          {criarBotao('=', calcular, 'botao-igual')}
        </div>
      </section>
    </main>
  );
}

export default App;