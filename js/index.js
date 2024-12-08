const donateBtns = document.querySelectorAll(".donate-btn");
const updateNavbarBalance = (amountBalance) => {
  const navbarBalance = parseFloat(
    document.getElementById("balance").innerText
  );
  const remainingBalance = navbarBalance - amountBalance;
  document.getElementById("balance").innerText = remainingBalance.toFixed(2);
};

const addToDonationHistory = (amountBalance, cardTitle) => {
  const historyContainer = document.getElementById("history-container");

  const historyEntry = document.createElement("div");
  historyEntry.classList.add("border", "p-4", "rounded-lg", "shadow-sm");
  historyEntry.innerHTML = `
   <h3 class="font-semibold">Title: ${cardTitle}</h3>
   <p>Donation Amount: ${amountBalance}</p>
   <p>Date: ${new Date().toLocaleString()}</p>
  `;

  historyContainer.appendChild(historyEntry);
};

const handleDonate = (button) => {
  const cardElemnt = button.closest(".card");
  const amountBalance = parseFloat(cardElemnt.querySelector(".input").value);
  const navBarBalace = parseFloat(document.getElementById("balance").innerText);

  if (
    isNaN(amountBalance) ||
    amountBalance <= 0 ||
    navBarBalace < amountBalance
  ) {
    alert("Please give valid input..");
    return;
  }
  updateNavbarBalance(amountBalance);
  const cardBalance = parseFloat(
    cardElemnt.querySelector(".card-balance").innerText
  );

  const newCardBalance = cardBalance + amountBalance;
  cardElemnt.querySelector(".card-balance").innerText =
    newCardBalance.toFixed(2);
  const cardTitle = cardElemnt.querySelector(".card-title").innerText;

  addToDonationHistory(amountBalance, cardTitle);
  cardElemnt.querySelector(".input").value = "";
  document.getElementById("show-modal-btn").showModal();
};

donateBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleDonate(e.target);
  });
});

const toggleTab = (activeBtn, inactiveBtn, showId, hideId) => {
  document.getElementById(activeBtn).classList.remove("active");
  document.getElementById(inactiveBtn).classList.add("active");

  document.getElementById(showId).classList.add("hidden");
  document.getElementById(hideId).classList.remove("hidden");
};

document.getElementById("show-history-btn").addEventListener("click", () => {
  toggleTab(
    "show-donation-btn",
    "show-history-btn",
    "donation-container",
    "history-container"
  );
});

document.getElementById("show-donation-btn").addEventListener("click", () => {
  toggleTab(
    "show-history-btn",
    "show-donation-btn",
    "history-container",
    "donation-container"
  );
});