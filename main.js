//Aluna: Quemia Oliveira
// Disc. Compiladores

var classToken = [];
var num = 0;

function lexico(inicial, indice) {
  conta_linha += 1;
  for (i = indice; i <= inicial.length; i++) {
    var count = i + 1;
    var caractere = inicial[i];

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
              count -= 1;
              estado = 0;
              tipoLexico = "Identificador";
              isFinal = count == inicial.length;
              return { lexeme, tipoLexico, isFinal, count };
            } else {
              lexeme = caractere;
              estado = 1;
            }
          } else if (caractere == "@") {
            if (count == inicial.length) {
              lexeme += inicial[i];
              count -= 1;
              estado = 0;
              tipoLexico = "SimboloEspecial";
              isFinal = count == inicial.length;
              return { lexeme, tipoLexico, isFinal, count };
            } else {
              lexeme = caractere;
              estado = 4;
            }
          } else if (caractere == "/") {
            lexeme = inicial[i];
            estado = 6;
          } else if (/\d/.test(caractere)) {
            lexeme = "";
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
            lexeme = "";
            lexeme += caractere;
            estado = 23;
          } else if (simbolos.includes(caractere)) {
            estado = 0;
            lexeme = caractere;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          } else if (caractere == undefined) {
            estado = 0;
            count = "\n";
            tipoLexico = "Comentario";
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
                i -= 1;
                estado = 0;
                isFinal = count == inicial.length;
                tipoLexico = "PalavraReservada";
                return { lexeme, tipoLexico, isFinal, count };
                lexeme = "";
              } else {
                i -= 1;
                estado = 0;
                tipoLexico = "Identificador";
                isFinal = count == inicial.length;
                return { lexeme, tipoLexico, isFinal, count };
                lexeme = "";
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
            tipoLexico = "Identificador";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
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
                i -= 1;
                estado = 0;
                isFinal = count == inicial.length;
                tipoLexico = "PalavraReservada";
                return { lexeme, tipoLexico, isFinal, count };
              } else {
                i -= 1;
                estado = 0;
                tipoLexico = "Identificador";
                isFinal = count == inicial.length;
                return { lexeme, tipoLexico, isFinal, count };
              }
            } else {
              lexeme += caractere;
              estado = 3;
            }
          } else if (palavrasReservadas.includes(lexeme)) {
            i -= 1;
            estado = 0;
            isFinal = count == inicial.length;
            tipoLexico = "PalavraReservada";
            return { lexeme, tipoLexico, isFinal, count };
          } else {
            // i -= 1;
            count -= 1;
            estado = 0;
            tipoLexico = "Identificador";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 4) {
          if (caractere == "@") {
            lexeme = lexeme + inicial[i];
            estado = 5;
          } else {
            count -= 1;
            estado = 0;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 5) {
          estado = 0;
          count = "\n";
          tipoLexico = "Comentario";
          isFinal = count == inicial.length;
          return { lexeme, tipoLexico, isFinal, count };
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
            lexeme = "";
            estado = 0;
            count -= 1;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 14) {
          if (caractere == "-") {
            lexeme += caractere;
            estado = 18;
          } else if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 15;
          } else {
            count -= 1;
            estado = 0;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 15) {
          if (/\d/.test(caractere)) {
            lexeme += caractere;
            estado = 15;
          } else if (caractere == ",") {
            lexeme += caractere;
            estado = 16;
          } else {
            count -= 1;
            estado = 0;
            isFinal = count == inicial.length;
            tipoLexico = "Digito";
            return { lexeme, tipoLexico, isFinal, count };
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
            count -= 1;
            estado = 0;
            isFinal = count == inicial.length;
            tipoLexico = "Digito";
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 18) {
          estado = 0;
          count -= 1;
          tipoLexico = "Operador";
          isFinal = count == inicial.length;
          return { lexeme, tipoLexico, isFinal, count };
        } else if (estado == 19) {
          if (caractere == "+") {
            lexeme += caractere;
            estado = 20;
          } else {
            count -= 1;
            estado = 0;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 20) {
          count -= 1;
          estado = 0;
          tipoLexico = "Operador";
          isFinal = count == inicial.length;
          return { lexeme, tipoLexico, isFinal, count };
        } else if (estado == 21) {
          if (caractere == "=" || caractere == ">") {
            lexeme += caractere;
            estado = 22;
          } else {
            estado = 0;
            count -= 1;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
          }
        } else if (estado == 22) {
          estado = 0;
          count -= 1;
          tipoLexico = "SimboloEspecial";
          isFinal = count == inicial.length;
          return { lexeme, tipoLexico, isFinal, count };
        } else if (estado == 23) {
          if (caractere != "=") {
            estado = 0;
            tipoLexico = "SimboloEspecial";
            isFinal = count == inicial.length;
            return { lexeme, tipoLexico, isFinal, count };
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
          comentario = false;
          lexeme = 0;
          estado = 0;
          count = "\n";
          tipoLexico = "Comentario";
          isFinal = count == inicial.length;
          return { lexeme, tipoLexico, isFinal, count };
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
      break;
    }
  }
}

function expressao(inicial) {
  classToken = lexico(inicial, classToken.count);

  expressaoSimpless(inicial);
  if (
    classToken.lexeme == ">" ||
    classToken.lexeme == "=" ||
    classToken.lexeme == "<" ||
    classToken.lexeme == "<>" ||
    classToken.lexeme == "<=" ||
    classToken.lexeme == ">="
  ) {
    expressaoSimpless(inicial);
  }
}

function fator() {
  if (
    classToken.tipoLexico == "Digito" ||
    (classToken.tipoLexico == "Identificador" && isFinal == true)
  ) {
  } else if (classToken.lexeme == "(") {
    expressao(inicial);
    if (classToken.lexeme == ")") {
    } else {
      console.log("Erro sintático, esperado ')' ");
    }
  }
}

function termo(inicial) {
  fator();
  classToken = lexico(inicial, classToken.count);
  if (
    classToken.lexeme == "*" ||
    classToken.lexeme == "div" ||
    classToken.lexeme == "and"
  ) {
    classToken = lexico(inicial, classToken.count);
    termo(inicial);
  }
}

function expressaoSimpless(inicial) {
  if (
    classToken.tipoLexico == "Digito" ||
    classToken.tipoLexico == "Identificador"
  ) {
    termo(inicial);
  } else {
    console.log(`Erro sintático, esperado expressão simples`);
  }

  if (
    classToken.lexeme == "+" ||
    classToken.lexeme == "-" ||
    classToken.lexeme == "or"
  ) {
    classToken = lexico(inicial, classToken.count);
    termo(inicial);
  }
}

function expressao(inicial) {
  classToken = lexico(inicial, classToken.count);
  expressaoSimpless(inicial, classToken.count);

  // relação
  if (
    classToken.lexeme == ">" ||
    classToken.lexeme == "=" ||
    classToken.lexeme == "<" ||
    classToken.lexeme == "<>" ||
    classToken.lexeme == "<=" ||
    classToken.lexeme == ">="
  ) {
    classToken = lexico(inicial, classToken.count);
    expressaoSimpless(inicial, classToken.count);
  } else {
    return;
  }
}

function Sintatico(inicial) {
  var linha = 0;

  if (estado == -1) {
    return;
  }

  classToken = lexico(inicial, linha);

  if (classToken.lexeme != undefined) {
    if (classToken.lexeme == "program") {
      if (isFinal == false) {
        // console.log(classToken);
        classToken = lexico(inicial, classToken.count);
        if (classToken.tipoLexico == "Identificador" && isFinal == false) {
          // console.log(classToken);
          classToken = lexico(inicial, classToken.count);
          if (classToken.lexeme == ";" && isFinal == true) {
            // console.log(classToken);
            control = 1;
          } else {
            console.log("Erro sintático");
            estado = -1;
            return;
          }
        } else {
          console.log("Erro sintático 2");
          estado = -1;
          return;
        }
      }
    } else if (
      classToken.lexeme == "begin" &&
      isFinal == true &&
      control == 1
    ) {
      // console.log(classToken);
      return;
    } else if (classToken.tipoLexico == "Comentario" || comentario == true) {
      classToken = lexico(inicial, linha);
    } else if (classToken.tipoLexico == "Identificador" && isFinal == false) {
      //atribuição
      // console.log(classToken);
      classToken = lexico(inicial, classToken.count);
      if (classToken.lexeme == ":=" && isFinal == false) {
        num = classToken.count;
        expressao(inicial, num);
        if (classToken.lexeme == ";") {
          // console.log(classToken);
          classToken = lexico(inicial, linha);
        } else {
          console.log("Erro sintático");
          estado = -1;
        }
      } else {
        console.log("Erro sintático");
        estado = -1;
      }
    } else if (classToken.lexeme == "end" && final == true) {
      // console.log(classToken);
      console.log("Compilado com sucesso.");
    } else if (final == true) {
      console.log("Erro sintático, esperava fechamento de bloco.");
      estado = -1;
    } else {
      console.log("Erro sintático, esperava fechamento de bloco.");
      estado = -1;
    }
  } else {
    console.log("Erro sintático.");
    estado = 1;
  }
}

function LeitorArquivo() {
  lineReader.eachLine("arquivo.txt", async function (line, last) {
    // let cont = line.length;
    inicial = line;
    final = last;

    if (inicial.length == 0) {
      console.log(": ", line);
      line.newRead();
    }

    Sintatico(inicial);
    // console.log(": ", inicial);
  });
}

var inicial = "";
var conta_linha = 0;
var final = false;
var lineReader = require("line-reader");
const fs = require("fs");
const { clearScreenDown } = require("readline");

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
  "type",
  "or",
  "and",
  "div",
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