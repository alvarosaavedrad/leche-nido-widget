/**
 * Leche NIDO Widget Controller
 */

(() => {
  /**
   * Data
   */

  const data = {};

  /**
   * View Object
   */

  const view = {
    lecheNido: {
      widget: document.querySelector("#leche-nido-widget"),
      texts: document.querySelector(".leche-nido-widget__texts"),
      timeline: {
        main: document.querySelector(".leche-nido-widget__timeline"),
        message: `<div class="timeline__message"><p class="noselect">Por su edad debe tomar</p><span class="timeline__message-tail"></span></div>`,
        spanContainer: document.querySelector(".timeline__span-container"),
        list: document.querySelector(".timeline__list"),
        timeline: document.querySelector(".timeline__main"),
        circles: {
          "nido-etapa-1": {
            main: document.querySelector(".timeline__circle.timeline__circle__nido-etapa-1"),
            small: document.querySelector(
              ".timeline__circle__small.timeline__circle__nido-etapa-1"
            ),
          },
          "nido-etapa-3": {
            main: document.querySelector(".timeline__circle.timeline__circle__nido-etapa-3"),
            small: document.querySelector(
              ".timeline__circle__small.timeline__circle__nido-etapa-3"
            ),
          },
          "nido-etapa-5": {
            main: document.querySelector(".timeline__circle.timeline__circle__nido-etapa-5"),
            small: document.querySelector(
              ".timeline__circle__small.timeline__circle__nido-etapa-5"
            ),
          },
          "etapa-escolar": {
            main: document.querySelector(".timeline__circle.timeline__circle__etapa-escolar"),
          },
          "todas-las-edades": {
            main: document.querySelector(".timeline__circle.timeline__circle__todas-las-edades"),
          },
        },
      },
    },
  };

  /**
   * Model
   */

  window.lecheNido = {
    widget: {
      currentSelected: "",
    },
  };

  const model = {
    etapas: ["nido-etapa-1", "nido-etapa-3", "nido-etapa-5", "etapa-escolar", "todas-las-edades"],
  };

  /**
   * Controllers
   */

  const circleOnClick = (e) => {
    // Getting age and parsing it to int
    const age = e.target.dataset.age.indexOf(",") === -1 ? parseInt(e.target.dataset.age) : 7;
    selectContent(age);
  };

  const insertMessage = (age, selected) => {
    const type = age === 2 || age === 4 || age === 6 ? "small" : "main";

    if (view.lecheNido.timeline.circles[selected][type]) {
      const msg = view.lecheNido.timeline.circles[selected][type].parentElement.querySelector(
        ".timeline__message"
      );

      if (!msg) {
        view.lecheNido.timeline.circles[selected][type].parentElement.insertAdjacentHTML(
          "afterbegin",
          view.lecheNido.timeline.message
        );
      }
    }
  };

  const listItemOnClick = (e) => {
    // Getting age and parsing it to int
    const age = parseInt(e.target.textContent, 10);
    selectContent(age);
  };

  const matchSelection = (age) => {
    let currentSelected = "";

    if (age === 1 || age === 2) {
      currentSelected = model.etapas[0];
    } else if (age === 3 || age === 4) {
      currentSelected = model.etapas[1];
    } else if (age == 5 || age === 6) {
      currentSelected = model.etapas[2];
    } else if (age >= 7 && age < 10) {
      currentSelected = model.etapas[3];
    } else if (age >= 10) {
      currentSelected = model.etapas[4];
    }

    return currentSelected;
  };

  const removeMessage = (age, selected) => {
    const type = age === 2 || age === 4 || age === 6 ? "small" : "main";

    Object.keys(view.lecheNido.timeline.circles).forEach((key) => {
      Object.keys(view.lecheNido.timeline.circles[key]).forEach((subkey) => {
        const msg = view.lecheNido.timeline.circles[key][subkey].parentElement.querySelector(
          ".timeline__message"
        );

        if (key !== selected || (key === selected && subkey !== type)) {
          if (msg) {
            msg.parentElement.removeChild(msg);
          }
        }
      });
    });
  };

  const selectContent = (age) => {
    // Set span
    view.lecheNido.timeline.spanContainer.querySelector("span").textContent = age;

    // Mathcing age with etapas
    const currentSelected = matchSelection(age);

    // Show message over selected circle
    removeMessage(age, currentSelected);
    insertMessage(age, currentSelected);

    // Setting currentSelected in dataset attribute and global window object
    window.lecheNido.widget.currentSelected = currentSelected;
    view.lecheNido.widget.dataset.currentSelected = currentSelected;
  };

  /**
   * Adding Events
   */

  // List Items
  const listItems = Array.from(document.querySelectorAll(".timeline__list li"));

  listItems.forEach((li) => {
    li.addEventListener("click", listItemOnClick);
  });

  // Timeline circles
  const standardCircles = Array.from(document.querySelectorAll(".timeline__circle"));
  const smallCircles = Array.from(document.querySelectorAll(".timeline__circle__small"));
  const circles = standardCircles.concat(smallCircles);

  circles.forEach((circle) => {
    circle.addEventListener("click", circleOnClick);
  });

  /**
   * Init
   */

  insertMessage(1, "nido-etapa-1");
})();