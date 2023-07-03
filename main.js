//Aluna: Quemia Oliveira
// Disc. Compiladores

var classToken = [];

function lexico(inicial, indice) {
  for (i = indice; i < inicial.length; i++) {
    var count = i + 1;
    var caractere = inicial[i];
    conta_linha += 1;
    if (estado != -1) {
      if (comentario == false) {
        if (estado == 0) {
          if (caractere == " " || caractere == "\n") {
            i += 1;
            lexeme = "";
            i -= 1;
            estado = 0;
          } else if (alfabeto.includes(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
              console.log(`Identificador: ${lexeme}`);
              estado = 0;
              lexeme = "";
            } else {
              lexeme = caractere;
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
            lexeme += caractere;
            estado = 15;
          } else if (caractere == "-") {
            if (count == inicial.length) {
              console.log(`Simbolo Especial: ${lexeme}`);
              lexeme = "";
              estado = 0;
            }
            lexeme = caractere;
            estado = 14;
          } else if (caractere == "+") {
            lexeme = caractere;
            estado = 19;
          } else if (caractere == "<") {
            lexeme += caractere;
            estado = 21;
          } else if (caractere == ">" || caractere == ":") {
            lexeme += caractere;
            estado = 23;
          } else if (simbolos.includes(caractere)) {
            lexeme = caractere;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          } else {
            console.log(
              `Erro linha ${conta_linha}, caractere não esperado: ${caractere}`
            );
            estado = -1;
          }
        } else if (estado == 1) {
          if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
              if (palavrasReservadas.includes(lexeme)) {
                console.log(`Palavra Reservada: ${lexeme}  ss ${count.length}`);
                // return lexeme;
                i -= 1;
                lexeme = "";
                estado = 0;
              } else {
                console.log(`Identificador: ${lexeme}`);
                lexeme = "";
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
          } else {
            console.log(`Identificador: ${lexeme}`);
            i -= 1;
            estado = 0;
            lexeme = "";
          }
        } else if (estado == 2) {
          if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
            lexeme += caractere;
            estado = 3;
          } else {
            console.log(
              `Erro linha ${conta_linha}, caractere não esperado: ${caractere}`
            );
            estado = -1;
          }
        } else if (estado == 3) {
          if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
            if (count == inicial.length) {
              lexeme += caractere;
              if (palavrasReservadas.includes(lexeme)) {
                estado = 0;
                isFinal = count == inicial.length;
                tipoLexico = "PalavraReservada";
                return { lexeme, tipoLexico, isFinal, count };
              } else {
                estado = 0;
                tipoLexico = "Identificador";
                isFinal = count == inicial.length;
                return { lexeme, tipoLexico, isFinal, count };
              }
            } else {
              lexeme += caractere;
              estado = 3;
            }
          } else {
            if (palavrasReservadas.includes(lexeme)) {
              estado = 0;
              isFinal = count == inicial.length;
              tipoLexico = "PalavraReservada";
              return { lexeme, tipoLexico, isFinal, count };
            } else {
              estado = 0;
              tipoLexico = "Identificador";
              isFinal = count == inicial.length;
              return { lexeme, tipoLexico, isFinal, count };
            }
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
          if (caractere == "#") {
            comentario = true;
            lexeme += caractere;
            estado = 11;
          } else if (caractere == "/") {
            comentario = true;
            lexeme += caractere;
            estado = 7;
          } else {
            console.log("Simbolo Especial: ", lexeme);
            lexeme = "";
            i -= 1;
            estado = 0;
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
            i -= 1;
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
          } else {
            console.log("Digito: ", lexeme);
            i -= 1;
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 16) {
          if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 17;
          } else {
            estado = -1;
          }
        } else if (estado == 17) {
          if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 17;
          } else {
            console.log(`Digito: ${lexeme}`);
            i -= 1;
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 18) {
          console.log("Operador", lexeme);
          i -= 1;
          lexeme = "";
          estado = 0;
        } else if (estado == 19) {
          if (caractere == "+") {
            lexeme += caractere;
            estado = 20;
          } else {
            console.log(`Simbolo Especial: ${lexeme}`);
            i -= 1;
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 20) {
          console.log(`Operador: ${lexeme}`);
          i -= 1;
          lexeme = "";
          estado = 0;
        } else if (estado == 21) {
          if (caractere == "=" || caractere == ">") {
            lexeme += caractere;
            estado = 22;
          } else {
            console.log(`Simbolo Especial: ${lexeme}`);
            i -= 1;
            lexeme = "";
            estado = 0;
          }
        } else if (estado == 22) {
          console.log("Simbolo Especial: ", lexeme);
          i -= 1;
          lexeme = "";
          estado = 0;
        } else if (estado == 23) {
          if (caractere != "=") {
            console.log("Simbolo Especial: ", lexeme);
            i -= 1;
            lexeme = "";
            estado = 0;
          } else {
            lexeme += caractere;
            estado = 22;
          }
        } else {
          console.log(
            `Erro linha ${conta_linha}, caractere não esperado ${caractere}`
          );
          estado = -1;
        }
      } else {
        if (estado == 7) {
          if (caractere == " " || caractere == "\n") {
            i += 1;
            estado = 7;
          } else if (count == inicial.length) {
            inicial += i;
            estado = 8;
          } else {
            estado = 8;
          }
        } else if (estado == 8) {
          estado = 8;
          if (caractere == " " || caractere == "\n") {
            i += 1;
            estado = 8;
          } else if (caractere == "/") {
            estado = 9;
          } else if (caractere != "/") {
            i += 1;
            estado = 8;
          }
          if (final == true && lexeme == "//") {
            console.log("Um comentário foi aberto e não foi finalizado.");
            break;
          }
        } else if (estado == 9) {
          if (caractere == " " || caractere == "\n") {
            i += 1;
            estado = 9;
          } else if (caractere == "/") {
            estado = 10;
          } else if (caractere != "/") {
            estado = 8;
          }

          if (final == true && lexeme == "//") {
            console.log("Um comentário foi aberto e não foi finalizado.");
            break;
          }
        } else if (estado == 10) {
          lexeme = "";
          i += 1;
          comentario = false;
          estado = 0;
        } else if (estado == 11) {
          if (caractere == " " || caractere == "\n") {
            i += 1;
            estado = 11;
          } else if (count == inicial.length) {
            inicial += i;
            estado = 12;
          } else {
            estado = 12;
          }
        } else if (estado == 12) {
          estado = 12;
          if (caractere == " " || caractere == "\n") {
            i += 1;
            estado = 12;
          } else if (caractere == "#") {
            estado = 13;
          } else if (caractere != "#") {
            i += 1;
            estado = 12;
          }
          if (final == true && lexeme == "/#") {
            console.log("Um comentário foi aberto e não foi finalizado.");
            break;
          }
        } else if (estado == 13) {
          // se for # fica aqui
          if (caractere == " " || caractere == "\n") {
            i += 1;
            estado = 13;
          } else if (caractere == "/") {
            estado = 10;
          } else if (caractere != "#") {
            estado = 12;
          }

          if (final == true && lexeme == "/#") {
            console.log("Um comentário foi aberto e não foi finalizado.");
            break;
          }
        }
      }
    } else {
      // console.log(`Erro: Caractere não esperado: ${lexeme}`);
      break;
    }
  }
}

function Sintatico(inicial) {
  var cont = 0;
  var linha = 0;

  classToken = lexico(inicial, linha);
  if (inicial == "\n") {
    inicial += 1;
  }
  if (classToken.lexeme != undefined) {
    if (control == 0) {
      if (classToken.lexeme == "program") {
        if (isFinal == false) {
          console.log(classToken);
          classToken = lexico(inicial, classToken.count);
          if (classToken.tipoLexico == "Identificador" && isFinal == false) {
            console.log(classToken);
            classToken = lexico(inicial, classToken.count);
            if (classToken.lexeme == ";" && isFinal == true) {
              console.log(classToken);
              control = 1;
            } else {
              console.log("Erro sintático 3");
            }
          } else {
            console.log("Erro sintático 2");
          }
        }
      } else {
        console.log("Erro sintático 1");
      }
    } else if (control == 1) {
      classToken = lexico(inicial, linha);
      if (classToken.lexeme == "begin" && isFinal == true) {
        console.log(classToken);
        control = 2;
      } else {
        console.log("Erro sintático");
      }
    } else if (control == 2) {
      classToken = lexico(inicial, linha);
      if (classToken.lexeme == "if" && isFinal == false) {
        console.log(classToken);
        classToken = lexico(inicial, classToken.count);
        if (
          classToken.tipoLexico == "Digito" ||
          (classToken.tipoLexico == "Identificador" && isFinal == false)
        ) {
          console.log(classToken);
          classToken = lexico(inicial, classToken.count);
        }
      } else {
        console.log("Erro sintático");
      }
    }
  }
}

function LeitorArquivo() {
  lineReader.eachLine("arquivo.txt", function (line, last) {
    inicial = line;
    final = last;
    Sintatico(inicial);
  });
}

var inicial = "";
var conta_linha = 0;
var final = false;
var lineReader = require("line-reader");

var tipoLexico = "";
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
var estado = 0;
var comentario = false;
var isFinal = false;

var simbolos = [",", ".", ";", "*", "(", ")", "#", "=", "{", "}"];
var alfabeto = [
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
var control = 0;

LeitorArquivo();
