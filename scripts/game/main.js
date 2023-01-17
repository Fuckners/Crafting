/* Eventos draggable:

ondrag, ondragend, ondragenter, ondragexit, ondragleave ondragover, ondragstart e ondrop

-> ondragstart: este manipulador de eventos será anexado ao nosso elemento draggable e será disparado quando um evento dragstart ocorrer.

-> ondragover: este manipulador de eventos será anexado ao nosso elemento dropzone e será disparado quando um evento dragover ocorrer.

-> ondrop: este manipulador de eventos será anexado ao nosso elemento dropzone e será disparado quando um evento drop ocorrer.
*/

// const Backpack = require("./Backpack");
// const Item = require("./Item");

import * as Backpack from "./Backpack";
import "./Item";

const backpack = new Backpack();

backpack.slots.forEach((row, index) => {
  const area =
    index === 3
      ? document.getElementById("hotbar")
      : document.getElementById("backpack");

  area.innerHTML += row
    .map((item) =>
      item
        ? backpack.slotHTML("slot" + index, item.HTML())
        : backpack.slotHTML("slot" + index)
    )
    .join("");
});

let count = 0;

// criando um objeto para cada item
const plank = new Item("Madeira", "plank", "uncraftable", "Madeira.webp");
console.table(plank);

const white_whool = new Item("Lã Branca", "whool", "uncraftable", "La_Branca.webp");
console.table(white_whool);

const blue_whool = new Item("Lã Azul", "whool", "uncraftable", "La_Azul.webp");
console.table(blue_whool);

const blue_bed = new Item(
  "Cama Azul",
  "bed",
  "none none none whool whool whool plank plank plank",
  "Cama_azul.webp",
  1,
  1
);
console.table(blue_bed);

const chest = new Item(
  "Baú",
  "chest",
  "plank plank plank plank none plank plank plank plank",
  "Bau.webp"
);
console.table(chest);

const craft_table = new Item(
  "Bancada de Trabalho",
  "workbanch",
  "none none none none plank plank none plank plank",
  "CraftingTable.webp"
);
console.table(craft_table);

// Todos os items criado devem ser adicionados aqui
const items = [plank, white_whool, blue_whool, blue_bed, chest, craft_table];

Array.from(document.getElementsByClassName("item")).forEach((element) => {
  element.setAttribute("draggable", true);
  element.addEventListener("dragstart", onDragStart);
});

Array.from(document.getElementsByClassName("slots")).forEach((element) => {
  element.addEventListener("dragover", onDragOver);
  element.addEventListener("drop", onDrop);
  if (/slot|craft/.test(element.id)) {
    element.addEventListener("dragenter", (event) => {
      // const target = verificarTarget(event.target)
      event.target.style.backgroundColor = "#969696";
    });
    element.addEventListener("dragleave", (event) => {
      // const target = verificarTarget(event.target)
      event.target.style.backgroundColor = "darkgray";
    });
  }
});

document
  .getElementById("trash")
  .addEventListener("dragenter", (event) => (event.target.style.opacity = 0.8));

document
  .getElementById("trash")
  .addEventListener("dragleave", (event) => (event.target.style.opacity = 1));

// firstInfyItems(items)
// Cria os slots da barra de items infinitos
(function firstInfyItems(arr) {
  let infyBar = document.querySelector(".infinity");
  for (let item of arr) {
    infyBar.innerHTML += `<div class="infy" id="${item.name}" ondragover="onDragOver(event)"></div>`;
  }
  infyItems();
})(items);

// repor os itens da barra infinita
function infyItems() {
  for (let item of items) {
    let slot = document.getElementById(item.name);
    slot.innerHTML = item.HTML();
  }
}

// Guardar os dados do objeto que está sendo segurado
function onDragStart(event) {
  console.log("O objeto está sendo segurado!");

  event.dataTransfer.setData("text/plain", event.target.id);
}

// Cancelar evento padrão do navegador de não deixar mover items
function onDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// verificar se o event está com o target no lugar certo
function verificarTarget(targetO) {
  let eventTarget;
  if (targetO.tagName == "SPAN" || targetO.tagName == "IMG") {
    eventTarget = targetO.parentElement.parentElement.parentElement; // SPAN/IMG // ABBR // DIV.item // DIV.slot

    // console.log('Novo event.target: ', eventTarget)
  } else if (targetO.tagName != "DIV") {
    eventTarget = targetO.parentElement.parentElement; // SPAN/IMG // ABBR
  } else {
    // console.log('event.target não precisou ser modificado')
    eventTarget = targetO;
  }
  return eventTarget;
}

// Transferir os dados do objeto segurado para o novo elemento
function onDrop(event) {
  event.preventDefault();

  const eventTarget = verificarTarget(event.target);

  // muda a cor de fundo do slot onde for solto
  if (/slot|craft/.test(eventTarget.id)) {
    eventTarget.style.backgroundColor = "darkgray";
  } else if (eventTarget.id == "trash") {
    eventTarget.style.backgroundColor = "#af5b5b";
  }

  // recupera o id do elemento que está sendo movido
  const dados = event.dataTransfer.getData("text/plain");
  // pega o elemento que está sendo movido
  const draggableElement = document.getElementById(dados);
  // se o elemento target tiver o id "trash" ele exclui o elemento que está sendo movido
  if (eventTarget.id == "trash") {
    try {
      eventTarget.appendChild(draggableElement);
      draggableElement.remove();
      console.log("O item foi excluido!");
    } catch (error) {
      console.log("O item não pode ser excluido!");
    }
  } else {
    try {
      // se o elemento target já tiver um elemento dentro dele, o elemento segurado recebe a soma da quantidade dos dois elementos
      console.log("target: ", eventTarget.id, eventTarget.tagName);
      console.log("dragElement: ", draggableElement.id, draggableElement.tagName);
      if (draggableElement.parentElement.id == eventTarget.id) {
        // console.log('O item foi colocado no mesmo slot!')
      } else if (eventTarget.childElementCount > 0) {
        if (
          draggableElement.dataset.name == eventTarget.firstElementChild.dataset.name
        ) {
          // console.log('O target TEM elementos filhos')
          // pega o conteúdo da qtd do elemento target
          const a = +eventTarget.querySelector(".qtd").innerHTML;
          // pega o conteúdo da qtd do elemento que está sendo movido
          let b = +draggableElement.querySelector(".qtd").innerHTML;
          // span recebe o valor de a + b
          draggableElement.querySelector(".qtd").innerHTML = a + b;
          console.log("Nova quantidade: ", a + b);

          // remover elemento já existente
          eventTarget.children[0].remove();
        } else {
          throw "Os itens não podem ser agrupados";
        }
      }
      // adiciona o elemento que está sendo movido, pro elemento target
      eventTarget.appendChild(draggableElement);
      // console.log('O objeto foi solto em: ', eventTarget.id)
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("HEROBRINE ÉS TU?");
      } else {
        console.error("Não foi possivel completar o drop: ", error);
      }
    }
    craftTable();
  }

  console.log("-------------");
  event.stopPropagation();

  // chama a função de repor os itens infinitos
  infyItems();
}

// gerar crafting
function craftTable() {
  const finishSlot = document.querySelector(".finish");
  if (finishSlot.childElementCount >= 1) {
    finishSlot.firstElementChild.remove();
  }
  const divs = [];
  const crafts = []; // items que estão nos craft slots
  const slots = document.getElementsByClassName("craft");
  for (let slot of slots) {
    divs.push(slot.firstElementChild);
  }

  for (let i in divs) {
    if (divs[i]) {
      // caso não seja null
      crafts[i] = divs[i].className.split(" ")[1];
    } else {
      // caso seja null
      crafts[i] = "none";
    }
  }
  // só faz essa parte caso todos os craft slots estejam preenchidos
  for (let item of items) {
    // console.log(item.crafting)
    // console.log(crafts.join(' '))
    if (item.crafting == crafts.join(" ")) {
      console.log(`O item ${item.name} vai ser craftado!`);
      finishSlot.innerHTML = item.HTML();
    }
  }
}

function removeCrafts() {
  const slots = document.getElementsByClassName("craft");
  for (let slot of slots) {
    // slot.firstElementChild é referente ao item
    if (slot.firstElementChild == null) {
      // ignorar
      // se a quantidade do item no slot de crafting for igual a 1, vai remover o item
    } else if (+slot.firstElementChild.querySelector(".qtd").innerText <= 1) {
      console.log(`${slot.firstElementChild.id} foi removido!`);
      slot.firstElementChild.remove();
      // se a quantidade do item no slot de crafting for maior que um, vai remover apenas uma unidade dele
    } else {
      let qtd = +slot.firstElementChild.querySelector(".qtd").innerText - 1;

      slot.firstElementChild.querySelector(".qtd").innerText = qtd;
      console.log(`Uma unidade foi removida do item ${slot.firstElementChild.id}`);
    }
  }
}
