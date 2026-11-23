var groups = ["Projeler", "Araçlar ve modlar", "Arşiv"];

function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
}

function link(className, href, text) {
  var node = el("a", className, text);
  node.href = href;
  node.target = "_blank";
  node.rel = "noopener";
  return node;
}

function card(item) {
  var box = el("article", "card");

  var top = el("div", "card-top");
  top.appendChild(el("h3", "", item.name));
  if (item.status) {
    top.appendChild(el("span", "chip status", item.status));
  }
  box.appendChild(top);

  if (item.description) {
    box.appendChild(el("p", "desc", item.description));
  }

  if (Array.isArray(item.tags) && item.tags.length) {
    var tags = el("ul", "tags");
    item.tags.forEach(function (tag) {
      tags.appendChild(el("li", "chip", tag));
    });
    box.appendChild(tags);
  }

  if (item.url || item.repo) {
    var actions = el("div", "actions");
    if (item.url) {
      actions.appendChild(link("btn", item.url, "Aç"));
    }
    if (item.repo) {
      actions.appendChild(link("btn", item.repo, "GitHub"));
    }
    box.appendChild(actions);
  }

  return box;
}

function render(items) {
  var app = document.getElementById("app");
  groups.forEach(function (name) {
    var list = items.filter(function (item) {
      return item.group === name;
    });
    if (!list.length) {
      return;
    }
    var section = el("section", "group");
    section.appendChild(el("h2", "", name));
    var grid = el("div", "grid");
    list.forEach(function (item) {
      grid.appendChild(card(item));
    });
    section.appendChild(grid);
    app.appendChild(section);
  });
}

function showError() {
  var message = document.getElementById("message");
  if (!message) {
    return;
  }
  message.textContent = "Liste yüklenemedi";
  message.hidden = false;
}

fetch("./projects.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("bad response");
    }
    return response.json();
  })
  .then(function (data) {
    if (!Array.isArray(data)) {
      throw new Error("bad data");
    }
    render(data);
  })
  .catch(showError);
