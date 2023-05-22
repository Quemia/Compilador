function main(inicial, estado, alfabeto, simbolos) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];
    if (estado != -1) {
      if (estado == 0) {
        if (alfabeto.includes(caractere)) {
          // console.log("esssseeee ", alfabeto.includes(inicial[i + 1]));
          // console.log(inicial[i + 1]);

          //verifica se é identificador único
          if (inicial[i + 1] == undefined) {
            // console.log("*****");
            tokens.push(inicial[i]);
            estado = 1;
            //verifica se o próximo é @ ou _
          } else if (inicial[i + 1] == "_" || inicial[i + 1] == "@") {
            // console.log("eee1ee " + inicial[i]);
            lexeme = inicial[i];
            estado = 2;
          } else if (inicial[i + 1] != "@" || inicial[i + 1] != "_") {
            if (
              alfabeto.includes(inicial[i + 1]) ||
              /\d/.test(inicial[i + 1])
            ) {
              // console.log("inicial[i]  " + inicial[i]);
              // console.log("inicial[i+1] " + inicial[i + 1]);
              lexeme = inicial[i];
              // console.log("lexeme estado 0", lexeme);
              // console.log("----------");
              estado = 3;
            } else {
              // console.log("lexeme else 0", lexeme);
              lexeme = inicial[i];
              // tokens.push(inicial[i]);
              estado = 3;
            }
          } else {
            estado = -1;
          }
        } else if (caractere == "@") {
          if (inicial[i + 1] == "@") {
            lexema = inicial[i];
            estado = 4;
          } else {
            tokens.push(inicial[i]);
            estado = 4;
          }
        } else if (caractere == "/") {
          lexeme = inicial[i];
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
          // console.log(" 1", inicial[i + 1]);
          lexeme = lexeme + inicial[i];
          // console.log(" 1?", lexeme);
          // console.log("1", inicial[i]);

          estado = 3;
        } else if (inicial[i + 1] != alfabeto.includes(inicial[i + 1])) {
          estado = 0;
        } else {
          estado = -1;
        }
      } else if (estado == 3) {
        //verifica se é letra ou numero
        if (alfabeto.includes(inicial[i]) || /\d/.test(inicial[i])) {
          // console.log("ini ", inicial[i - 1]);
          // console.log("verdadeeeeeeeeeeeeeeeeee ", inicial[i]);
          // console.log(lexeme.includes("_")) || lexeme.includes("@");
          // verifica se o próximo é letra ex: Tt / Tttt
          if (alfabeto.includes(inicial[i + 1]) || /\d/.test(inicial[i + 1])) {
            // console.log(inicial[i]);
            // console.log("..........");
            lexeme = lexeme + inicial[i];
            // console.log("entrei lexeme: ", lexeme);
            estado = 3;

            //verificar s e o anterior é
          } else if (inicial[i - 1] == "_" || inicial[i - 1] == "@") {
            lexeme = lexeme + inicial[i];
            // console.log("888888");
            // console.log("ini lex ", lexeme);
            // console.log("ini ", inicial[i]);
            tokens.push(lexeme);
            estado = 3;

            //verifica se o lexema possui _ ou @
          } else if (lexeme.includes("_") || lexeme.includes("@")) {
            // console.log("////////");
            lexeme = lexeme + inicial[i];
            // console.log(lexeme);
            tokens.push(lexeme);
            estado = 3;
          } else if (alfabeto.includes(inicial[i]) || /\d/.test(inicial[i])) {
            // console.log("+++++++++++");
            // console.log("entrei ??? ", lexeme);
            lexeme = lexeme + inicial[i];
            estado = 3;
          } else if (inicial[i + 1] == undefined) {
            // console.log("////////");
            // console.log("entrei ??? ", lexeme);
            lexeme = lexeme + inicial[i];
            tokens.push(lexeme);
            estado = 3;
          } else {
            // console.log("¨¨¨¨¨¨¨");
            tokens.push(lexeme);
            estado = 3;
          }
          //verifica se o proximo não é igual a letra ou numero
        } else if (
          inicial[i + 1] != alfabeto.includes(inicial[i + 1]) ||
          inicial[i + 1] != /\d/.includes(inicial[i + 1])
        ) {
          console.log("entra???", lexeme);
          tokens.push(lexeme);
          estado = 0;
        } else {
          estado = -1;
        }
      } else if (estado == 4) {
        if (inicial[i] == "@") {
          lexema = lexema + inicial[i];
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 5) {
        if (inicial[i] == regex) {
          tokens.push(lexema);
          estado = 10;
        } else if (inicial[i] != regex) {
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 6) {
        if (caractere == "#") {
          lexeme = lexeme + inicial[i];
          estado = 11;
        } else if (caractere == "/") {
          lexeme = lexeme + inicial[i];
          estado = 7;
        } else {
          estado = -1;
        }
      } else if (estado == 7) {
        estado = 8;
      } else if (estado == 8) {
        if (caractere == "/" && inicial[i + 1] == "/") {
          lexeme = lexeme + inicial[i];
          estado = 9;
        } else if (caractere == "/") {
          estado = 9;
        } else if (caractere != "/") {
          estado = 8;
        } else {
          estado = -1;
        }
      } else if (estado == 9) {
        console.log("i:  ", inicial[i]);
        if (caractere == "/") {
          lexeme = lexeme + inicial[i];
          tokens.push(lexeme);
          estado = 10;
        } else if (caractere != "/") {
          estado = 8;
        } else {
          estado = 0;
        }
      } else if (estado == 10) {
        estado = 0;
      } else if (estado == 11) {
        estado = 12;
      } else if (estado == 12) {
        if (caractere == "#" && inicial[i + 1] == "/") {
          lexeme = lexeme + inicial[i];
          estado = 13;
        } else if (caractere == "#") {
          estado = 13;
        } else if (caractere != "#") {
          estado = 12;
        } else {
          estado = -1;
        }
      } else if (estado == 13) {
        if (caractere == "/") {
          lexeme = lexeme + inicial[i];
          tokens.push(lexeme);
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
        console.log(inicial[i] + "  " + estado);
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

    // for (i = 0; i < tokens.length; i++) {
    //   // if(tokens[i])
    //   console.log(tokens.length);
    //   console.log(tokens[i]);
    //   console.log(regexTeste.test(tokens[i]));
    // }
  });
}

function checkStr(str) {
  return token.includes(str);
}
var regexTeste = /[a-zA-Z0-9]/g;

const { Console } = require("console");
// CAMINHO PARA LEITOR DE ARQUIVO
const fs = require("fs");
const readline = require("readline");
const nome_arquivo = "/arquivo.txt";
const path = __dirname + `${nome_arquivo}`;
LeitorArquivo(path);

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

var lexeme = "";
/*
  else if (
          !alfabeto.includes(inicial[i + 1]) &&
          !/\d/.test(inicial[i + 1])
        ) {
          console.log("inicial[i] 2 " + inicial[i]);
          console.log("inicial[i+1] 2 " + inicial[i + 1]);
          console.log("lexeme NOT  2 ", lexeme);
          // lexeme = lexeme + inicial[i];
          tokens.push(lexeme);
          estado = 0;
        }*/
