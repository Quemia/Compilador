function main(inicial, estado, alfabeto, simbolos) {
  for (i = 0; i < inicial.length; i++) {
    let count = i + 1;
    let caractere = inicial[i];
    if (estado != -1) {
      if (estado == 0) {
        if (alfabeto.includes(caractere)) {
          if (count == inicial.length) {
            lexeme += inicial[i];
            console.log(`Identificador: ${lexeme}`);
            estado = 0;
            lexeme = "";
          } else {
            lexeme = inicial[i];
            estado = 1;
          }
        } else if (caractere == "@") {
          if (count == inicial.length) {
            lexeme += inicial[i];
            console.log(`Simbolo Especial: ${lexeme}`);
            estado = 0;
            lexeme = "";
          } else {
            lexeme = inicial[i];
            estado = 4;
          }
        } else if (caractere == "/") {
          lexeme = inicial[i];
          estado = 6;
        } else if (/\d/.test(caractere)) {
          if (/\d/.test(inicial[i + 1])) {
            console.log("estado 0, if, caractere: ", inicial[i]);
            lexeme = inicial[i];
            estado = 15;
          } else {
            console.log("estado 0, else, caractere: ", inicial[i]);
            tokens.push(inicial[i]);
            estado = 15;
          }
        } else if (caractere == "-") {
          console.log(inicial[i]);
          lexeme = inicial[i];
          estado = 14;
        } else if (caractere == "+") {
          console.log("estado = 0 ", inicial[i]);
          lexeme = inicial[i];
          // tokens.push(lexeme);
          estado = 19;
        } else if (caractere == "<") {
          estado = 21;
        } else if (caractere == ">" || caractere == ":") {
          estado = 23;
        } else if (simbolos.includes(caractere)) {
          estado = 24;
        } else {
          estado = 0;
        }
      } else if (estado == 1) {
        if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
          lexeme = lexeme + caractere;
          estado = 3;
        } else if (caractere == "_") {
          lexeme = lexeme + caractere;
          estado = 2;
        } else if (caractere == "@") {
          lexeme = lexeme + caractere;
          estado = 2;
        } else {
          estado = -1;
        }
      } else if (estado == 2) {
        console.log(`${lexeme}`);
        console.log(`${caractere}`);
        if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
          if (count == inicial.length) {
            lexeme += inicial[i];
            console.log(`Identificador: ${lexeme}`);
            lexeme = "";

            estado = 0;
          } else {
            lexeme += caractere;
            estado = 3;
          }
        } else {
          estado = -1;
        }
      } else if (estado == 3) {
        if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
          let count = i + 1;
          if (count == inicial.length) {
            lexeme += caractere;
            if (palavrasReservadas.includes(lexeme)) {
              console.log(`Palavra Reservada: ${lexeme}`);
            } else {
              console.log(`Identificador: ${lexeme}`);
            }
            lexeme = "";
            estado = 0;
          } else {
            lexeme += caractere;
            estado = 3;
          }
        } else {
          estado = -1;
        }
      } else if (estado == 4) {
        if (caractere == "@") {
          lexeme = lexeme + inicial[i];
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 5) {
        if (count == inicial.length) {
          console.log(`Comentário: ${lexeme}`);
          lexeme = "";
          estado = 0;
        } else {
          estado = 5;
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
        console.log(!/\d/.test(inicial[i + 1]));
        // se simbolo '-'
        if (caractere == "-") {
          lexeme = lexeme + inicial[i];
          console.log(inicial[i]);
          tokens.push(lexeme);
          estado = 18;
        }
        // se inicial[i] == numero E inicial[i+1] == numero
        else if (/\d/.test(caractere) && /\d/.test(inicial[i + 1])) {
          console.log("entrei 1: ", inicial[i]);
          lexeme = lexeme + inicial[i];
          console.log("entrei 1: ", lexeme);
          estado = 15;
        }
        // se numero negativo => -2
        else if (inicial[i + 1] != "-" || /\d/.test(inicial[i + 1])) {
          lexeme = lexeme + inicial[i];
          console.log("entrei 2: ", inicial[i]);
          tokens.push(lexeme);
          estado = 14;
        } else {
          console.log("Cadeia ", lexeme);
          tokens.push(lexeme);
          estado = 0;
        }
      } else if (estado == 15) {
        console.log("estado 15, caractere: ", inicial[i]);
        console.log(!/\d/.test(inicial[i + 1]));
        //se inicial[i] == numero E inicial[i+1] == numero

        if (/\d/.test(caractere) && /\d/.test(inicial[i + 1])) {
          console.log("entrei estado 1:15 ", inicial[i]);
          lexeme = lexeme + inicial[i];
          estado = 15;
        }
        //se inicial[i] == numero e i+1 != ','
        else if (/\d/.test(caractere) && inicial[i + 1] != ",") {
          console.log("entrei estado 2:15 , ", inicial[i]);
          lexeme = lexeme + inicial[i];
          tokens.push(lexeme);
          estado = 15;
        }
        //se inicial[i] == numero e i+1 == ','
        else if (/\d/.test(caractere) && inicial[i + 1] == ",") {
          console.log("entrei estado 2:15 , ", inicial[i]);
          lexeme = lexeme + inicial[i];
          estado = 15;
        }
        // se caractere é igual a ','
        else if (caractere == ",") {
          console.log("entrei estado 3:15 , ", inicial[i]);
          lexeme = lexeme + inicial[i];
          estado = 16;
        } else {
          console.log("entrei estado 15 ", lexeme);
          estado = 0;
        }
      } else if (estado == 16) {
        if (/\d/.test(caractere)) {
          lexeme = lexeme + inicial[i];
          console.log("entrei estado 16 , ", inicial[i]);
          console.log("entrei estado 16 , ", lexeme);
          estado = 17;
        } else {
          estado = -1;
        }
      } else if (estado == 17) {
        console.log("entrei estado 17 , ", inicial[i]);
        if (/\d/.test(caractere) && /\d/.test(inicial[i + 1])) {
          console.log("reconhecida");
          lexeme = lexeme + inicial[i];
          estado = 17;
        } else if (/\d/.test(caractere) && !/\d/.test(inicial[i + 1])) {
          console.log("Cadeia");
          lexeme = lexeme + inicial[i];
          tokens.push(lexeme);
          estado = 17;
        } else if (/\d/.test(caractere)) {
          lexeme = lexeme + inicial[i];
          console.log("entrei estado 16:2 , ", inicial[i]);
          console.log("entrei estado 16:2 , ", lexeme);
          // tokens.push(lexeme);
          estado = 17;
        } else {
          console.log("Cadeia não reconhecida");
          estado = 0;
        }
      } else if (estado == 18) {
        estado = 0;
      } else if (estado == 19) {
        console.log("1 ", inicial[i]);
        if (caractere == "+") {
          console.log("2 ", inicial[i]);
          lexeme = lexeme + inicial[i];
          tokens.push(lexeme);
          console.log("2 ", inicial[i]);
          estado = 20;
        } else {
          console.log("3 ", inicial[i]);
          tokens.push(lexeme);
          estado = 19;
        }
      } else if (estado == 20) {
        console.log("entrei");
        estado = 20;
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
      console.log(`Erro: Caractere não esperado ${caractere}`);
      break;
    }
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

    // main(inicial, estado, alfabeto, simbolos);

    // for (i = 0; i < tokens.length; i++) {
    //   // if(tokens[i])
    //   console.log(tokens.length);
    //   console.log(tokens[i]);
    //   console.log(regexTeste.test(tokens[i]));
    // }
  });

  lineReader.eachLine("arquivo.txt", function (line, last) {
    inicial = line;
    main(inicial, estado, alfabeto, simbolos);
  });
}

function checkStr(str) {
  return token.includes(str);
}
var regexTeste = /[a-zA-Z0-9]/g;
var lineReader = require("line-reader");

const { Console } = require("console");
// CAMINHO PARA LEITOR DE ARQUIVO
const fs = require("fs");
const readline = require("readline");
const nome_arquivo = "/arquivo.txt";
const path = __dirname + `${nome_arquivo}`;
LeitorArquivo(path);

// REGEX PARA COMENTÁRIO
var regex = "\n";
var criaRegex = / [/\n\n\r/]/g;
var resultado = regex.match(criaRegex);
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
