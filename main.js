function main(inicial, estado, alfabeto, simbolos) {
  for (i = 0; i < inicial.length; i++) {
    var count = i + 1;
    var caractere = inicial[i];
    var comentario = false;
    if (estado != -1) {
      if (comentario == false) {
        if (estado == 0) {
          if (caractere == " " || count == inicial.length) {
            i += 1;
            estado = 0;
            lexeme = "";
          } else if (alfabeto.includes(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
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
              lexeme = caractere;
              estado = 4;
            }
          } else if (caractere == "/") {
            lexeme = inicial[i];
            estado = 6;
          } else if (/\d/.test(caractere)) {
            if (/\d/.test(caractere)) {
              lexeme = inicial[i];
              estado = 15;
            }
          } else if (caractere == "-") {
            lexeme = caractere;
            estado = 14;
          } else if (caractere == "+") {
            lexeme = inicial[i];
            estado = 19;
          } else if (caractere == "<") {
            lexeme += caractere;
            estado = 21;
          } else if (caractere == ">" || caractere == ":") {
            lexeme += caractere;
            console.log(lexeme);
            estado = 23;
          } else if (simbolos.includes(caractere)) {
            console.log("Simbolo Especial: ", caractere);
            lexeme = "";
            estado = 0;
          } else {
            lexeme += caractere;
            estado = -1;
          }
        } else if (estado == 1) {
          if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
              if (palavrasReservadas.includes(lexeme)) {
                console.log(`Palavra Reservada: ${lexeme}`);
                lexeme = "";
                i -= 1;
                estado = 0;
              } else {
                console.log(`Identificador: ${lexeme}`);
                lexeme = "";
                i -= 1;
                estado = 0;
              }
            } else {
              lexeme += caractere;
              estado = 3;
            }
          } else if (caractere == "_") {
            lexeme = lexeme + caractere;
            estado = 2;
          } else if (caractere == "@") {
            lexeme = lexeme + caractere;
            estado = 2;
          } else if (
            !alfabeto.includes(caractere) ||
            !/\d/.test(caractere) ||
            caractere != "@" ||
            caractere != "_"
          ) {
            lexeme += inicial[i];
            console.log(`Identificador: ${lexeme}`);
            lexeme = "";
            estado = 0;
          } else {
            estado = -1;
          }
        } else if (estado == 2) {
          if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
            // if (count == inicial.length) {
            //   lexeme += inicial[i];
            //   console.log(`Identificador : 2 ${lexeme}`);
            //   estado = 0;
            //   i -= 1;
            //   lexeme = "";
            // } else
            // if {
            lexeme += caractere;
            estado = 3;
            // }
          } else {
            lexeme += caractere;
            estado = -1;
          }
        } else if (estado == 3) {
          if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
              if (palavrasReservadas.includes(lexeme)) {
                console.log(`Palavra Reservada: ${lexeme}`);
              } else {
                console.log(`Identificador: ${lexeme}`);
              }
              lexeme = "";
              i -= 1;
              estado = 0;
            } else {
              lexeme += caractere;
              estado = 3;
            }
          } else {
            if (palavrasReservadas.includes(lexeme)) {
              console.log(`Palavra Reservada: ${lexeme}`);
            } else {
              console.log(`Identificador: ${lexeme}`);
            }
            lexeme = "";
            i -= 1;
            estado = 0;
          }
        } else if (estado == 4) {
          if (caractere == "@") {
            lexeme = lexeme + inicial[i];
            estado = 5;
          } else {
            console.log("Simbolo Especial: ", lexeme);
            lexeme = "";
            i -= 1;
            estado = 0;
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
          if (caractere == "#" && count == inicial.length) {
            lexeme += caractere;
            comentario = true;
            estado = 11;
          } else if (caractere == "/") {
            comentario = true;
            lexeme = lexeme + caractere;
            console.log(lexeme, comentario)
            estado = 7;
          } else {
            // estado = -1;
            console.log("Simbolo Especial: ", lexeme);
            lexeme = "";
            i -= 1;
            estado = 0;
          }
          // } else if (estado == 7) {
          //   if (count == inicial.length) {
          //     inicial += i;
          //     estado = 8;
          //   } else {
          //     estado = 8;
          //   }
          // } else if (estado == 8) {
          //   if (caractere == "/") {
          //     lexeme += caractere;
          //     estado = 9;
          //   } else {
          //     estado = 8;
          //   }
          // } else if (estado == 9) {
          //   if (caractere == "/") {
          //     lexeme = lexeme + inicial[i];
          //     console.log(`Comentário: ${lexeme}`);
          //     lexeme = "";
          //     estado = 10;
          //   } else if (caractere != "/") {
          //     //retiva do lexema o ultimo adicionado, pois não era simbolo de comentário
          //     lexeme = lexeme.slice(0, -1);
          //     estado = 8;
          //   } else {
          //     estado = -1;
          //   }
          // } else if (estado == 10) {
          //   estado = 0;
        } else if (estado == 11) {
          // console.log(lexeme)
          // if (count == inicial.length) {
          // pulaLinha(caractere, estado);
          // } else {
          // console.log("eeee");
          estado = 12;
          // }
        } else if (estado == 12) {
          if (caractere == "#") {
            lexeme += caractere;
            estado = 13;
          } else {
            estado = 12;
          }
        } else if (estado == 13) {
          if (caractere == "/") {
            lexeme += caractere;
            console.log(`Comentário: ${lexeme}`);
            comentario = false;
            lexeme = "";
            estado = 10;
          } else if (caractere != "/") {
            lexeme = lexeme.slice(0, -1);
            estado = 12;
          } else {
            estado = -1;
          }
        } else if (estado == 14) {
          if (caractere == "-") {
            lexeme += caractere;
            estado = 18;
          } else if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 15;
          } else {
            console.log(`Simbolo Especial: ${lexeme}`);
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 15) {
          if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 15;
          } else if (caractere == ",") {
            lexeme += caractere;
            estado = 16;
          } else if (!/\d/.test(caractere) || caractere != ",") {
            lexeme += caractere;
            console.log(`Digito: ${lexeme}`);
            i -= 1;
            lexeme = "";
            estado = 0;
          } else {
            console.log("Digito: ", lexeme);
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 16) {
          if (/\d/.test(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
              console.log(`Digito: ${lexeme}`);
              lexeme = "";
              estado = 0;
            } else {
              lexeme += caractere;
              estado = 17;
            }
          } else {
            estado = -1;
          }
        } else if (estado == 17) {
          if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 17;
          } else if (!/\d/.test(caractere)) {
            lexeme += caractere;
            console.log(`Digito: ${lexeme}`);
            lexeme = "";
            estado = 0;
          } else {
            lexeme += caractere;
            console.log(`Digito: ${lexeme}`);
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 18) {
          console.log("Operador", lexeme);
          lexeme = "";
          estado = 0;
        } else if (estado == 19) {
          if (caractere == "+") {
            lexeme += caractere;
            estado = 20;
          } else {
            console.log(`Simbolo Especial: ${lexeme}`);
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 20) {
          console.log(`Simbolo Especial: ${lexeme}`);
          lexeme = "";
          estado = 0;
        } else if (estado == 21) {
          if (caractere == ">" || caractere == "=") {
            console.log(`Simbolo Especial: ${lexeme}`);
            lexeme = "";
            estado = 0;
          } else {
            console.log(`Simbolo Especial: ${lexeme}`);
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 23) {
          if (caractere == "=") {
            lexeme += caractere;
            console.log(`Simbolo Especial: ${lexeme}`);
            lexeme = "";
            estado = 0;
          } else {
            lexeme += caractere;
            console.log(`Simbolo Especial: ${lexeme}`);
            lexeme = "";
            estado = 0;
          }
        } else {
          console.log(`Erro: Caractere não esperado ${caractere}`);
          estado = -1;
        }
      } else {
        console.log(lexeme, comentario)
        // console.log("entreiiii")
        if (estado == 7) {
          console.log(lexeme, comentario)
          if (count == inicial.length) {
            inicial += i;
            estado = 8;
          } else {
            estado = 8;
          }
        } else if (estado == 8) {
          if (caractere == "/") {
            lexeme += caractere;
            estado = 9;
          } else {
            estado = 8;
          }
        } else if (estado == 9) {
          if (caractere == "/") {
            lexeme = lexeme + inicial[i];
            console.log(`Comentário: ${lexeme}`);
            lexeme = "";
            comentário = false;
            estado = 10;
          } else if (caractere != "/") {
            lexeme = lexeme.slice(0, -1);
            estado = 8;
          } else {
            estado = -1;
          }
        } else if (estado == 10) {
          estado = 0;
        }
      }
    } else {
      console.log(`Erro: Caractere não esperado: ${lexeme}`);
      break;
    }
  }
}

function LeitorArquivo(caminho) {
  let estado = 0;
  var inicial = "";

  const simbolos = [",", ".", ";", "*", "(", ")", "#", "=", "{", "}"];
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

  lineReader.eachLine("arquivo.txt", function (line, last) {
    inicial = line;
    main(inicial, estado, alfabeto, simbolos);
  });
}

const pulaLinha = (caractere, estado) => {
  console.log("fffff", caractere);
  console.log(newLine);
  // if(caractere == )

  estado = 12;
  return caractere, estado;
};

var lineReader = require("line-reader");
// const readline = require("readline");
const nome_arquivo = "/arquivo.txt";
const path = __dirname + `${nome_arquivo}`;
LeitorArquivo(path);

var lexeme = "";
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
var simbolosEspecais = [
  ";",
  ",",
  ".",
  "+",
  "-",
  "*",
  "(",
  ")",
  "<",
  ">",
  ":",
  "=",
  "{",
  "}",
  ":=",
  "<>",
  "<=",
  ">=",
  "/",
  "@",
  "_",
  "#",
];

var regex = "\n";
var criaRegex = / [/\n\n\r/]/g;
var resultado = regex.match(criaRegex);
