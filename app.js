const GROUPS = ["Projeler", "Araçlar ve modlar", "Arşiv"];

function makeLink(label, href) {
  const a = document.createElement("a");
  a.className = "btn";
  a.href = href;
  a.textContent = label;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

function makeCard(project) {
  const card = document.createElement("article");
  card.className = "card";

  const head = document.createElement("div");
  head.className = "card-head";

  const title = document.createElement("h3");
  title.textContent = project.name || "";
  head.appendChild(title);

  if (project.status) {
    const status = document.createElement("span");
    status.className = "chip status";
    status.textContent = project.status;
    head.appendChild(status);
  }

  card.appendChild(head);

  if (project.description) {
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = project.description;
    card.appendChild(desc);
  }

  if (Array.isArray(project.tags) && project.tags.length > 0) {
    const tags = document.createElement("ul");
    tags.className = "tags";
    project.tags.forEach(function (tag) {
      const item = document.createElement("li");
      item.className = "chip";
      item.textContent = tag;
      tags.appendChild(item);
    });
    card.appendChild(tags);
  }

  const actions = document.createElement("div");
  actions.className = "actions";
  if (project.url) {
    actions.appendChild(makeLink("Aç", project.url));
  }
  if (project.repo) {
    actions.appendChild(makeLink("GitHub", project.repo));
  }
  if (actions.childElementCount > 0) {
    card.appendChild(actions);
  }

  return card;
}

function render(projects) {
  const app = document.getElementById("app");
  const message = document.getElementById("message");

  GROUPS.forEach(function (groupName) {
    const items = projects.filter(function (project) {
      return project.group === groupName;
    });
    if (items.length === 0) {
      return;
    }

    const section = document.createElement("section");
    section.className = "group";

    const heading = document.createElement("h2");
    heading.textContent = groupName;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "grid";
    items.forEach(function (project) {
      grid.appendChild(makeCard(project));
    });
    section.appendChild(grid);

    app.insertBefore(section, message);
  });
}

function showError() {
  const message = document.getElementById("message");
  message.textContent = "Liste yüklenemedi";
  message.hidden = false;
}

fetch("./projects.json", { cache: "no-cache" })
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
