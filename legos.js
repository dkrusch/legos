// Some starter code
document.querySelector(".btn").addEventListener("click", event => {
  const creator = document.querySelector("#lego_creator").value;
  const shape = document.querySelector("#lego_shape").value;
  const name = document.querySelector("#lego_name").value;
  const colors = document.querySelector("#lego_color");
  const color = colors.options[colors.selectedIndex].textContent;
  console.log(colors);
  console.log(color);

  // Once you have collected all the values, build your data structure
  const legoToSave = `{
        "creator": "${creator}",
        "color": "${color}",
        "shape": "${shape}",
        "name": "${name}"
    }`;

    fetch("http://localhost:3000/legos", {
      // Replace "url" with your API's URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: legoToSave
    })
});

const renderDom = {
  makeJournalEntryComponent(journalEntry) {
    // Create your own HTML structure for a journal entry
    console.log("inside make", journalEntry);
    console.log("concept", journalEntry.creator);
    return `
        <h1 class="concept">Creator: ${journalEntry.creator}</h1>
        <h3 class="date">Color: ${journalEntry.color}</h3>
        <h2 class="entry">Shape: ${journalEntry.shape}</h2>
        <h3 class="mood">Name: ${journalEntry.name}</h3>
        `;
  }
};

const API = {
  getJournalEntries: function() {
    return fetch("http://localhost:3000/legos").then(response =>
      response.json()
    );
  }
};

API.getJournalEntries().then(entries => {
  addToDom.addEntry(entries);
});

const addToDom = {
  addEntry(entries) {
    entries.forEach(entry => {
      document.querySelector(".forLegos").innerHTML += renderDom.makeJournalEntryComponent(entry);
    });
  }
};
