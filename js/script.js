const loadData = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
  const searchText = document.getElementById("search-box").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
const displayData = (myData) => {
  console.log(myData);
  const cards = document.getElementById("cards");
  cards.textContent = "";
  if (myData.length === 0) {
    const error = document.getElementById("error-msg");
    error.style.display = "block";
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
  }
  myData.forEach((phone) => {
      const error = document.getElementById("error-msg");
        error.style.display = "none";
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
              <div class="col-md-4">
                  <img src="${phone.image}" class="img-fluid rounded-start p-3" alt="...">
              </div>
              <div class="col-md-8 d-flex justify-content-center align-items-center">
              <div class="card-body">
              <h3 class="card-title">Brand : ${phone.brand}</h3>
              <h3 class="card-title">Model : ${phone.phone_name}</h3>
              <button class="learn-more" onclick="showDetails()">
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">View Details</span>
              </button>
              </div>
              </div>
          </div>
      </div>
          `;
    cards.appendChild(div);
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
  });
  document.getElementById("search-box").value = "";
};
