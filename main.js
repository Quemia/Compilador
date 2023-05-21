function main(inicial, estado, alfabeto, simbolos) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];

    if (estado == 0) {
      if (alfabeto.includes(caractere)) {
        console.log("caract: " + caractere );
        Identificadores(estado, inicial, alfabeto);
      } else if (caractere == "@") {
        estado = 4;
        console.log("caract: " + caractere + " estado <- 4");
      } else if (caractere == "/") {
        estado = 6;
        console.log("caract: " + caractere + " estado <- 6");
      } else if (/\d/.test(caractere)) {
        estado = 16;
        console.log("caract: " + caractere + " estado <- 16");
      } else if (caractere == "-") {
        estado = 15;
        console.log("caract: " + caractere + " estado <- 15");
      } else if (caractere == "+") {
        estado = 20;
        console.log("caract: " + caractere + " estado <- 20");
      } else if (caractere == "<") {
        estado = 22;
        console.log("caract: " + caractere + " estado <- 22");
      } else if (caractere == ">" || caractere == ":") {
        estado = 24;
        console.log("caract: " + caractere + " estado <- 24");
      } else if (simbolos.includes(caractere)) {
        estado = 25;
        console.log("caract: " + caractere + " estado <- 25");
      } else {
        console.log("Não reconhecido:", caractere);
        estado = -1;
      }
    } else {
      console.log("Não reconhecido: ", caractere);
      break;
    }
  }
}

function Identificadores(estado, inicial, alfabeto) {
  console.log('entrei '+inicial.length);
  for (i = 0; i < inicial.length; i++) {
    console.log(inicial + " / " + estado);
    let caractere = inicial[i];
    if (estado == 0) {
      if (alfabeto.includes(caractere)) {
        console.log(caractere + "  " + estado);
        estado = 1;
      } else {
        console.log(caractere + " / " + estado);
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 1) {
      if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
        console.log(caractere + "  " + estado);
        estado = 3;
      } else if (caractere == "_") {
        console.log(caractere + "  " + estado);
        estado = 2;
      } else if (caractere == "@") {
        console.log(caractere + "  " + estado);
        estado = 2;
      } else {
        console.log(caractere + "  " + estado);
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 2) {
      if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
        console.log(caractere + "  " + estado);
        estado = 3;
      } else {
        console.log(caractere + "  " + estado);
        console.log("Cadeia não reconhecida");
        console.log("entrei ii");
        estado = -1;
        break;
      }
    } else if (estado == 3) {
      if (alfabeto.includes(caractere) || /\d/.test(caractere)) {
        console.log(caractere + "  " + estado);
        estado = 3;
      } else {
        console.log(caractere + "  " + estado);
        console.log("Cadeia não reconhecida ");
        console.log("entrei ii");
        estado = -1;
        break;
      }
    } else {
      console.log(caractere + "  " + estado);
      console.log("Cadeia não reconhecida");
      break;
    }
  }
  if (estado == 1 || estado == 3) {
    console.log("Cadeia Reconhecida.");
    // estado = 0;
  }
}

function SimbolosEspeciais(estado, inicial, simbolos) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];
    if (estado == 0) {
      if (caractere == "-") {
        estado = 14;
      } else if (caractere == "+") {
        estado = 19;
      } else if (caractere == "@") {
        estado = 4;
      } else if (caractere == "/") {
        estado = 6;
      } else if (caractere == "<") {
        estado = 21;
      } else if (caractere == ">" || caractere == ":") {
        estado = 23;
      } else if (simbolos.includes(caractere)) {
        estado = 24;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 14) {
      if (caractere == "-") {
        estado = 18;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 19) {
      if (caractere == "+") {
        estado = 20;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 21) {
      if (caractere == ">" || caractere == "=") {
        estado = 22;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 23) {
      if (caractere == "=") {
        estado = 22;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else {
      console.log("Cadeia não reconhecida");
      estado = -1;
      break;
    }
  }

  if (
    estado == 4 ||
    estado == 6 ||
    estado == 14 ||
    estado == 18 ||
    estado == 19 ||
    estado == 20 ||
    estado == 21 ||
    estado == 22 ||
    estado == 23 ||
    estado == 24
  ) {
    console.log("Cadeia Reconhecida.");
  }
}

function Comentarios_1(estado, inicial) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];
    if (estado != -1) {
      if (estado == 0) {
        if (caractere == "@") {
          estado = 4;
        } else if (caractere == "/") {
          estado = 6;
          console.log("caract: " + caractere + " estado: ", estado);
        } else {
          estado = -1;
          // console.log("caract: " + caractere + " estado: ", estado);
        }
      } else if (estado == 4) {
        if (caractere == "@") {
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 5) {
        estado = 10;
      } else if (estado == 6) {
        if (caractere == "/") {
          estado = 7;
        } else if (caractere == "#") {
          estado = 11;
          console.log("caract: " + caractere + " estado: ", estado);
        } else {
          estado = -1;
          // console.log("caract: " + caractere + " estado: ", estado);
        }
      } else if (estado == 7) {
        estado = 8;
      } else if (estado == 8) {
        if (caractere == "/") {
          estado = 9;
        } else {
          estado = -1;
        }
      } else if (estado == 9) {
        if (caractere == "/") {
          estado = 10;
        } else {
          estado = -1;
        }
      } else if (estado == 11) {
        estado = 12;
        console.log("caract: " + caractere + " estado: ", estado);
      } else if (estado == 12) {
        if (caractere == "#") {
          estado = 13;
        } else {
          estado = -1;
          // console.log("caract: " + caractere + " estado: ", estado);
        }
      } else if (estado == 13) {
        if (caractere == "/") {
          estado = 10;
          console.log("caract: " + caractere + " estado: ", estado);
        } else {
          estado = -1;
          // console.log("caract: " + caractere + " estado: ", estado);
        }
      } else {
        console.log("Cadeia não reconhecida");
        break;
      }
    } else {
      console.log("Cadeia não reconhecida");
      break;
    }
  }
  if (estado == 4 || estado == 6 || estado == 10) {
    console.log("Cadeia Reconhecida.");
  }
}

function Digitos(estado, inicial) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];
    if (estado == 0) {
      if (caractere == "-") {
        estado = 14;
      } else if (/\d/.test(caractere)) {
        estado = 15;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 14) {
      if (/\d/.test(caractere)) {
        estado = 15;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 15) {
      if (/\d/.test(caractere)) {
        estado = 15;
      } else if (caractere == ",") {
        estado = 16;
      } else {
        estado = -1;
        break;
      }
    } else if (estado == 16) {
      if (/\d/.test(caractere)) {
        estado = 17;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else if (estado == 17) {
      if (/\d/.test(caractere)) {
        estado = 17;
      } else {
        console.log("Cadeia não reconhecida");
        estado = -1;
        break;
      }
    } else {
      console.log("Cadeia não reconhecida");
      estado = -1;
      break;
    }
  }
  if (estado == 15 || estado == 17) {
    console.log("Cadeia Reconhecida.");
  }
}

function Comentarios(estado, inicial) {
  for (i = 0; i < inicial.length; i++) {
    let caractere = inicial[i];
    if (estado != -1) {
      if (estado == 0) {
        if (caractere == "/") {
          estado = 6;
        } else if (caractere == "@") {
          estado = 4;
        } else {
          estado = -1;
        }
      } else if (estado == 4) {
        if (caractere == "@") {
          estado = 5;
        } else {
          estado = -1;
        }
      } else if (estado == 5) {
        if (caractere == regex) {
          estado = 10;
        } else if (caractere != regex) {
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
      } else {
        estado = -1;
      }
    } else {
      console.log("Cadeia não reconhecida");
      break;
    }

    if (estado == 10) {
      console.log("Cadeia Reconhecida.");
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
      console.log(data.split("\n"));
      inicial = data.split();
      // main(data, estado, alfabeto, simbolos);
    }
  });
}



// CAMINHO PARA LEITOR DE ARQUIVO
const fs = require("fs");
const nome_arquivo = "/arquivo.txt";
const path = __dirname + `${nome_arquivo}`;
LeitorArquivo(path);


// REGEX PARA COMENTÁRIO
var regex = "\n";
var criaRegex = / [/\n\n\r/]/g;
var resultado = regex.match(criaRegex);

// Identificadores(estado, alfabeto);
// Comentarios(estado, inicial);
// Digitos(estado, inicial);
// SimbolosEspeciais(estado, inicial, simbolos);
// i+1 = len(entrada)
