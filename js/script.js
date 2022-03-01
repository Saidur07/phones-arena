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
  if (searchText === "") {
      const errorTxt = document.getElementById('error-text')
      errorTxt.innerText = "Please enter a value first"
      setTimeout(() => {
          errorTxt.innerText = "Please enter a value first"
          
      }, 5000);
  }
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        if (data.data.length === 0 || data === undefined) {
          toggleErrorMsg("block");
          toggleSpinner("none");
          toggleShowBtn("none");
          document.getElementById("search-box").value = "";
        }else{

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
                <button type="button" class="learn-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails()">
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
    toggleSpinner("none");
  });
  // Clearing the input box
  document.getElementById("search-box").value = "";
};
const loadDetails = () =>{
    toggleSpinner("block");
  const id = document.getElementById("search-box").value;
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
}