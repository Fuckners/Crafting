class Backpack {
  patternSlots = [
    new Array(9).fill(null),
    new Array(9).fill(null),
    new Array(9).fill(null),
    new Array(8).fill(null),
  ];

  constructor(mapa = this.patternSlots) {
    this.slots = mapa;
  }

  clear() {
    this.slots = this.patternMapa;
    return this;
  }

  add(item, slot) {
    this.slots[slot.x][slot.y] = item;
    return this;
  }

  remove(slot) {
    this.slots[slot.x][slot.y] = null;
    return this;
  }

  move(destino, origem) {
    origem.item = this.slots[origem.x][origem.y];
    destino.item = this.slots[destino.x][destino.y];

    // talvez esse if seje desnecessário, mas o objetivo era otimizar
    if (origem.item === undefined || destino.item === undefined) return;

    this.remove(origem).add(destino.item, destino);
    this.remove(destino).add(origem.item, origem);

    // this.slots[origem.x][origem.y] = destino.item;
    // this.slots[destino.x][destino.y] = origem.item;

    return this;
  }

  slotHTML(id, content = "") {
    return `
      <div class="slots" id="${id}">
          ${content}
      </div>
    `;
  }
}

export default Backpack;
