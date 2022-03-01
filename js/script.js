// Togling the elements
const toggleErrorMsg = (value) => {
  const error = document.getElementById("error-msg");
  error.style.display = `${value}`;
};
const toggleSpinner = (value) => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = `${value}`;
};
const toggleShowBtn = (value) => {
  const showBtn = document.getElementById("show-btn");
  showBtn.style.display = `${value}`;
};

// Loading the Data

const loadData = () => {
  toggleSpinner("block");
  const searchText = document.getElementById("search-box").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length === 0 || data === undefined) {
        toggleErrorMsg("block");
        toggleSpinner("none");
        toggleShowBtn("none");
        document.getElementById("search-box").value = "";
      } else {
        displayData(data.data.slice(0, 20));
        toggleShowBtn("block");
        const showBtn = document.getElementById("show-btn");
        showBtn.addEventListener("click", () => {
          displayData(data.data.slice(0, 5000));
          toggleShowBtn("none");
        });
      }
    });
};

// Displaying the Data

const displayData = (myData) => {
  const cards = document.getElementById("cards");
  cards.textContent = "";

  myData.forEach((phone) => {
    toggleErrorMsg("none");
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
                <button type="button" class="learn-more" onclick="loadDetails('${phone.slug}')">
                <a href="#main">
                <span class="circle" aria-hidden="true">
                 <span class="icon arrow"></span>
                </span>
                 <span class="button-text">View Details</span> </a>
                 </button>
              </div>
              </div>
          </div>
      </div>
          `;
    cards.appendChild(div);
    toggleSpinner("none");
  });
  // Clearing the input box
  document.getElementById("search-box").value = "";
};

// Loading the Details to show on the top

const loadDetails = (phoneId) => {
  toggleSpinner("block");
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

// Displaying the data on the top

const displayDetails = (detail) => {
  console.log(detail);
  const detailsDiv = document.getElementById("phone-details");
  detailsDiv.textContent = "";
  const div = document.createElement("div");
  div.classList.add("details");
  div.innerHTML = `
  <div class="details-img">
  <img src="${detail.image}" class="card-img-top" alt="...">
</div>
  <div class="details-body">
    <h2 class="">${detail.brand} ${detail.name} Specifications</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Value</th>
          <th scope="col">Properties</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Release Date</th>
          <td>${
            detail.releaseDate ? detail.releaseDate : "No release date found"
          }</td>
        </tr>
        <tr>
          <th scope="row">Cheap Set</th>
          <td>${detail.mainFeatures.chipSet}</td>
        </tr>
        <tr>
          <th scope="row">Storage</th>
          <td>${detail.mainFeatures.storage}</td>
        </tr>
        <tr>
          <th scope="row">Memory</th>
          <td>${detail.mainFeatures.memory}</td>
        </tr>
        <tr>
          <th scope="row">Display Size</th>
          <td>${detail.mainFeatures.displaySize}</td>
        </tr>
        <tr>
          <th scope="row">Sensors</th>
          <td>${
            detail.others
              ? `
    <ul>
        <li><span>Bluetooth:</span> ${detail.others.Bluetooth}</li>
        <li><span>GPS:</span> ${detail.others.GPS}</li>
        <li><span>NFC:</span> ${detail.others.NFC}</li>
        <li><span>Radio:</span> ${detail.others.Radio}</li>
        <li><span>USB:</span> ${detail.others.USB}</li>
        <li><span>WLAN:</span> ${detail.others.WLAN}</li>
    </ul>`
      : "No sensors found"}</td>
        </tr>
      </tbody>
    </table>
</div>
  `;
  detailsDiv.appendChild(div);
  toggleSpinner("none");
};
