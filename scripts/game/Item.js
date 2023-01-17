class Item {
  static managerId = 0;

  static idGenerator() {
    return ++this.managerId;
  }

  constructor(nome, classe, crafting, url = "", quantidade = 1, max = 64) {
    this.id = `${nome}#${Item.idGenerator()}`;
    this.class = classe; // pedra
    this.name = nome; // pedra lisa
    this.image = "imagens/" + url; // imagens/la_branca.png
    this.crafting = crafting; // uncraftable || number
    this.quantidade = quantidade; // 1
    this.max = max;
  }

  add(quantidade) {
    if (this.quantidade + quantidade < this.max) this.quantidade += quantidade;

    return this.quantidade;
  }

  remove(quantidade) {
    if (this.quantidade - quantidade > 0) this.quantidade - +quantidade;

    return this.quantidade;
  }

  HTML(item) {
    const base = item || this;
    return `
      <div
        class="item ${base.class}"
        id="${base.id}"
        data-name="${base.name}"
        draggable="true"
        ondragstart="onDragStart(event)"
      >
        <abbr class="name" title="${base.name}">
          <span class="qtd">${base.quantidade}</span>
          <img src="${base.image}" draggable="false">
        </abbr>
      </div>
    `;
  }
}

export default Item;
