function main(inicial, estado, alfabeto, simbolos) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];
    if (estado != -1) {
      if (estado == 0) {
        if (alfabeto.includes(caractere)) {
          //verifica se é identificador único
          // console.log(inicial[i]);
          if (inicial[i + 1] == undefined) {
            console.log("eeeee ");
            console.log("eeeee "+inicial[i]);
            tokens.push(inicial[i]);
            estado = 1;
            //verifica se o próximo é letra
          } else if (inicial[i + 1] == "_" || inicial[i + 1] == "@") {
            tokens.push(inicial[i]);
            estado = 2;
          } else if (inicial[i + 1] != "@" || inicial[i + 1] != "_") {
            tokens.push(inicial[i]);
            estado = 3;
          } else {
            estado = -1;
          }
        } else if (caractere == "@") {
          if (inicial[i + 1] == undefined) {
            tokens.push(inicial[i]);
            estado = 4;
          } else {
            estado = 4;
          }
        } else if (caractere == "/") {
          estado = 6;
        } else if (/\d/.test(caractere)) {
          estado = 15;
        } else if (caractere == "-") {
          estado = 14;
        } else if (caractere == "+") {
          estado = 19;
        } else if (caractere == "<") {
          estado = 21;
        } else if (caractere == ">" || caractere == ":") {
          estado = 23;
        } else if (simbolos.includes(caractere)) {
          estado = 24;
        } else {
          console.log(caractere + " / " + estado);
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 1) {
        if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
          estado = 3;
        } else if (caractere == "_") {
          estado = 2;
        } else if (caractere == "@") {
          estado = 2;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 2) {
        if (alfabeto.includes(inicial[i + 1]) || /\d/.test(inicial[i + 1])) {
          // console.log("eeeee "+inicial[i-1] + inicial[i]);
          // tokens.push(inicial[i - 1] + inicial[i]);
          estado = 3;
        } else if (inicial[i + 1] != alfabeto.includes(inicial[i + 1])) {
          estado = 0;
        } else {
          estado = -1;
        }
      } else if (estado == 3) {
        if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
          console.log("eeeee " + inicial[i - 2] + inicial[i - 1] + inicial[i]);
          tokens.push(inicial[i - 2] + inicial[i - 1] + inicial[i]);
          estado = 3;
        } else if (inicial[i + 1] != alfabeto.includes(inicial[i + 1])) {
          estado = 0;
        } else {
          estado = -1;
        }
      } else if (estado == 4) {
        if (inicial[i] == "@") {
          tokens.push(inicial[i] + inicial[i - 1]);
          console.log("eeeee " + inicial[i - 1] + inicial[i]);
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 5) {
        if (inicial[i] == regex) {
          estado = 10;
        } else if (inicial[i] != regex) {
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 6) {
        if (caractere == "#") {
          estado = 11;
        } else if (caractere == "/") {
          estado = 7;
        } else {
          estado = -1;
        }
      } else if (estado == 7) {
        estado = 8;
      } else if (estado == 8) {
        if (caractere == "/") {
          estado = 9;
        } else if (caractere != "/") {
          estado = 8;
        } else {
          estado = -1;
        }
      } else if (estado == 9) {
        if (caractere == "/") {
          estado = 10;
        } else if (caractere != "/") {
          estado = 8;
        } else {
          estado = -1;
        }
      } else if (estado == 11) {
        estado = 12;
      } else if (estado == 12) {
        if (caractere == "#") {
          estado = 13;
        } else if (caractere != "#") {
          estado = 12;
        } else {
          estado = -1;
        }
      } else if (estado == 13) {
        if (caractere == "/") {
          estado = 10;
        } else if (caractere != "/") {
          estado = 12;
        } else {
          estado = -1;
        }
      } else if (estado == 14) {
        if (caractere == "-") {
          estado = 18;
        } else if (/\d/.test(caractere)) {
          estado = 15;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 15) {
        if (/\d/.test(caractere)) {
          estado = 15;
        } else if (caractere == ",") {
          estado = 16;
        } else {
          estado = -1;
        }
      } else if (estado == 16) {
        if (/\d/.test(caractere)) {
          estado = 17;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 17) {
        if (/\d/.test(caractere)) {
          estado = 17;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 19) {
        if (caractere == "+") {
          estado = 20;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 21) {
        if (caractere == ">" || caractere == "=") {
          estado = 22;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else if (estado == 23) {
        if (caractere == "=") {
          estado = 22;
        } else {
          console.log("Cadeia não reconhecida");
          estado = -1;
        }
      } else {
        console.log(caractere + "  " + estado);
        console.log("Cadeia não reconhecida");
        estado = -1;
      }
    } else {
      console.log("Cadeia não reconhecida - else final");
    }
  }
  if (
    estado == 1 ||
    estado == 3 ||
    estado == 4 ||
    estado == 6 ||
    estado == 10 ||
    estado == 14 ||
    estado == 15 ||
    estado == 17 ||
    estado == 18 ||
    estado == 19 ||
    estado == 20 ||
    estado == 21 ||
    estado == 22 ||
    estado == 23 ||
    estado == 24
  ) {
    console.log("Cadeia Reconhecida.");
    console.log(tokens);
  }
}

function LeitorArquivo(caminho) {
  let estado = 0;
  var inicial = "";
  const simbolos = [",", ".", ";", "*", "(", ")", "#", "="];
  const alfabeto = [
    "A",
    "B",
    "C",
    "Ç",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "ç",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  let removeEspaco = /\s*;\s*/;

  fs.readFile(caminho, "utf-8", (error, data) => {
    if (error) {
      console.log("erro de leitura: " + error.message);
    } else {
      // console.log(data.split("\n"));
      inicial = data;
      // main(data, estado, alfabeto, simbolos);
    }

    main(inicial, estado, alfabeto, simbolos);
    // for (i = 0; i < inicial.length; i++) {}
  });
}

const { Console } = require("console");
// CAMINHO PARA LEITOR DE ARQUIVO
const fs = require("fs");
const readline = require("readline");
const nome_arquivo = "/arquivo.txt";
const path = __dirname + `${nome_arquivo}`;
LeitorArquivo(path);

// var r = readline.createInterface({
//   input: fs.createReadStream(nome_arquivo),
// });
// r.on("line", (text) => {
//   console.log(text);
// });

// console.log("teste " + readline.nome_arquivo);

// REGEX PARA COMENTÁRIO
var regex = "$";
// var criaRegex = / [/\n\n\r/]/g;
// var resultado = regex.match(criaRegex);
var tokens = [];
var palavrasReservadas = [
  "program",
  "if",
  "then",
  "else",
  "while",
  "do",
  "until",
  "repeat",
  "int",
  "double",
  "char",
  "case",
  "switch",
  "end",
  "procedure",
  "function",
  "for",
  "begin",
];

// console.log()

// data = ".";
// let estado = 0;
// const simbolos = [",", ".", ";", "*", "(", ")", "#", "="];
// const alfabeto = [
//   "A",
//   "B",
//   "C",
//   "Ç",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
//   "a",
//   "b",
//   "c",
//   "ç",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r",
//   "s",
//   "t",
//   "u",
//   "v",
//   "w",
//   "x",
//   "y",
//   "z",
// ];
// main(data, estado, alfabeto, simbolos);
