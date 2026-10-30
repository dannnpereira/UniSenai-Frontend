<script setup lang="ts">
import { ref } from 'vue'

const display = ref('0')
const valorAnterior = ref<number | null>(null)
const operador = ref<string | null>(null)
const novoValor = ref(false)

function digitar(valor: string): void {
  if (display.value === 'Erro' || novoValor.value) {
    display.value = valor === '.' ? '0.' : valor
    novoValor.value = false
    return
  }

  if (valor === '.' && display.value.includes('.')) {
    return
  }

  if (display.value === '0' && valor !== '.') {
    display.value = valor
  } else {
    display.value += valor
  }
}

function calcularResultado(
  a: number,
  b: number,
  op: string
): number | null {
  let resultado: number

  switch (op) {
    case '+':
      resultado = a + b
      break

    case '-':
      resultado = a - b
      break

    case '*':
      resultado = a * b
      break

    case '/':
      if (b === 0) {
        return null
      }

      resultado = a / b
      break

    default:
      return b
  }

  return Number.isFinite(resultado) ? resultado : null
}

function selecionarOperador(op: string): void {
  const valor = Number(display.value)

  if (!Number.isFinite(valor)) {
    return
  }

  if (operador.value !== null && !novoValor.value) {
    const resultado = calcularResultado(
      valorAnterior.value!,
      valor,
      operador.value
    )

    if (resultado === null) {
      display.value = 'Erro'
      valorAnterior.value = null
      operador.value = null
      novoValor.value = true
      return
    }

    display.value = String(resultado)
    valorAnterior.value = resultado
  } else {
    valorAnterior.value = valor
  }

  operador.value = op
  novoValor.value = true
}

function calcular(): void {
  if (operador.value === null || valorAnterior.value === null) {
    return
  }

  const resultado = calcularResultado(
    valorAnterior.value,
    Number(display.value),
    operador.value
  )

  if (resultado === null) {
    display.value = 'Erro'
  } else {
    display.value = String(Number(resultado.toPrecision(10)))
  }

  valorAnterior.value = null
  operador.value = null
  novoValor.value = true
}

function limpar(): void {
  display.value = '0'
  valorAnterior.value = null
  operador.value = null
  novoValor.value = false
}

function apagarUltimo(): void {
  if (novoValor.value || display.value === 'Erro') {
    display.value = '0'
    novoValor.value = false
    return
  }

  if (display.value.length <= 1) {
    display.value = '0'
  } else {
    display.value = display.value.slice(0, -1)
  }
}

function trocarSinal(): void {
  if (display.value === '0' || display.value === 'Erro') {
    return
  }

  display.value = String(Number(display.value) * -1)
}
</script>

<template>
  <main class="pagina">
    <section class="calculadora">
      <h1>Calculadora</h1>

      <div class="visor" aria-live="polite">
        {{ display }}
      </div>

      <div class="botoes">
        <button
          type="button"
          class="botao botao-funcao"
          @click="limpar"
        >
          AC
        </button>

        <button
          type="button"
          class="botao botao-funcao"
          @click="apagarUltimo"
        >
          ⌫
        </button>

        <button
          type="button"
          class="botao botao-funcao"
          @click="trocarSinal"
        >
          +/-
        </button>

        <button
          type="button"
          class="botao botao-operador"
          @click="selecionarOperador('/')"
        >
          ÷
        </button>

        <button type="button" class="botao" @click="digitar('7')">
          7
        </button>

        <button type="button" class="botao" @click="digitar('8')">
          8
        </button>

        <button type="button" class="botao" @click="digitar('9')">
          9
        </button>

        <button
          type="button"
          class="botao botao-operador"
          @click="selecionarOperador('*')"
        >
          ×
        </button>

        <button type="button" class="botao" @click="digitar('4')">
          4
        </button>

        <button type="button" class="botao" @click="digitar('5')">
          5
        </button>

        <button type="button" class="botao" @click="digitar('6')">
          6
        </button>

        <button
          type="button"
          class="botao botao-operador"
          @click="selecionarOperador('-')"
        >
          −
        </button>

        <button type="button" class="botao" @click="digitar('1')">
          1
        </button>

        <button type="button" class="botao" @click="digitar('2')">
          2
        </button>

        <button type="button" class="botao" @click="digitar('3')">
          3
        </button>

        <button
          type="button"
          class="botao botao-operador"
          @click="selecionarOperador('+')"
        >
          +
        </button>

        <button
          type="button"
          class="botao botao-zero"
          @click="digitar('0')"
        >
          0
        </button>

        <button type="button" class="botao" @click="dig