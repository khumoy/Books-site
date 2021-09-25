

// Navbar Menu Burger
const menuBurger = () => {
  var menu = document.querySelector(".menu")
  var ham = document.querySelector(".ham")
  var xIcon = document.querySelector(".xIcon")
  var menuIcon = document.querySelector(".menuIcon")

  ham.addEventListener("click", toggleMenu)

  function toggleMenu() {
    if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      xIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      menu.classList.add("showMenu");
      xIcon.style.display = "block";
      menuIcon.style.display = "none";
    }
  }

  var menuLinks = document.querySelectorAll(".menuLink")

  menuLinks.forEach(
    function (menuLink) {
      menuLink.addEventListener("click", toggleMenu)
    }
  )
};
menuBurger();

const baseUrl = `https://api.nytimes.com/svc/books/v3`;
const apiKey = `0nG5do2caU59G7F2PT1eRQD0RAsaX5Du`;

const getBooks = async () => {
  try {

    const res = await axios.get(`${baseUrl}/lists/names.json?api-key=${apiKey}`
    );
    console.log(res.data)
    return { success: true, data: res.data };

  } catch (error) {
    console.error("Error getBooks Function - 404" + error);
    return { success: false };
  }

};

getBooks();

const loading = document.getElementById("loadingPanel");
const errorPanel = document.getElementById("errorPanel");
const leftBar = document.getElementById("leftBar");


let lastActive;

const setLists = async () => {

  leftBar.innerHTML = ``;
  errorPanel.classList.add("d-none");


  const res = await getBooks();
  console.log(res)

  loading.classList.add("d-none");


  if (res.success) {
    res.data.results.map((v, i) => {
      const a = document.createElement("a");
      a.href = "#";
      a.onclick = (event) => {
        event.target.classList.add("active");
        lastActive.classList.remove("active");
        lastActive = event.target;
        setBooks(v);
      };
      a.className = `list-group-item list-group-item-action bg-secondary text-info mb-2`;
      a.innerHTML = ` 
                    <p class="fw-bold py-1">${v.list_name}</p>
                <div class="d-flex justify-content-between pt-2">
                <span class="text-white">
                    <i class="fas fa-calendar-alt  text-warning  "></i>
                    ${v.newest_published_date}
                </span>
                <span class="bg-warning text-dark p-1 rounded">${v.updated}</span>
                </div>
                </p>
          `;

      leftBar.appendChild(a);
    });

    if (leftBar.children.length > 0) {
      leftBar.children[0].classList.add("active");
      lastActive = leftBar.children[0];
      setBooks(res.data.results[0]);
    }

  } else {
    error.classList.remove("d-none");
  }
};

setLists();

const getBooksList = async (list_name_encoded) => {
  try {

    const res = await axios.get(`${baseUrl}/lists/current/${list_name_encoded}.json?api-key=${apiKey}`
    );
    return { success: true, data: res.data };

  } catch (error) {
    console.error("Error getBooks Function - 404" + error);
    return { success: false };
  }

};


const loading2 = document.getElementById("loadingPanel2");
const errorPanel2 = document.getElementById("errorPanel2");
const rightBar = document.getElementById("rightBar");
const bookTitle = document.getElementById("titleBooks");

const setBooks = async (obj) => {
  rightBar.innerHTML = ``;
  loading2.classList.remove("d-none");
  errorPanel2.classList.add("d-none");

  bookTitle.innerHTML = obj.list_name;
  const res = await getBooksList(obj.list_name_encoded);

  loading2.classList.add("d-none");

  if (res.success) {
    console.log(res.data.results.books);
    res.data.results.books.map((v, i) => {
      const div = document.createElement("div");
      div.classList = "col-sm-6 col-lg-4 col-xl-3 mb-3"
      div.innerHTML = `
            <div class="card_book rounded  w-100 h-100">
            <img class="w-100 rounded shadow" src="${v.book_image}"
              alt="">
            <div class="card_title">
              <p class="mt-2 mb-1 fw-bold">${v.title}</p>
              <span class="text-secondary">Author: ${v.author}</span>
              <span class="mb-2 fw-bold">Price: <span class="fw-normal text-warning">${v.price}</span></span>
              <div class="buyBtn">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-dark w-100 align-items-end" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  Buy
                </button>

                <!-- Modal -->
                <div class="modal   fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header bg-dark text-light">
                        <h5 class="modal-title" id="exampleModalLabel">Book Details</h5>
                        <button type="button" class="btn-close bg-light" data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="modalBody">
                        <div class="container-fluid">
                          <div class="detailsBook d-flex align-items-start  ">
                            <div class="w-50 shadow">
                              <img class="w-100 rounded "
                                src="${v.book_image}" alt="">

                            </div>
                            <div class="px-3 py-1">
                              <h3 class="fw-bold">Book Name: <span class="fw-normal text-secondary">${v.title}</span></h3>
                              <p class="fw-bold">Autor: <span class="text-secondary fw-normal">${v.author}</span>
                              </p>
                              <p class="fw-bold ">Description: <span class="text-secondary fw-normal">${v.description}</span></p>
                              <p class="fw-bold ">Isbn 10: <span class="text-secondary fw-normal me-3">${v.primary_isbn10}</span>
                                Isbn 13:
                                <span class="text-secondary fw-normal">${v.primary_isbn13}</span>
                              </p>

                              <p class="fw-bold">Price: <span class="fw-normal text-primary">${v.price}</span> </p>
                              <p class="fw-bold">Publisher: <span>${v.publisher}</span></p>
                            </div>
                          </div>
                          <div class="d-inline-block pb-3">
                            <i class="fas fa-star text-warning "></i>
                            <i class="fas fa-star text-warning "></i>
                            <i class="fas fa-star text-warning "></i>
                            <i class="fas fa-star text-warning "></i>
                            <i class="fas fa-star text-warning "></i>
                          </div>
                          <h4 class="fw-bold">Buy Links <i class="fas fa-link"></i></h4>
                          <a href="${v.buy_links[0].url}" class="btn btn-dark rounded "> <i
                              class="fab fa-amazon text-warning mt-2 me-1"></i>${v.buy_links[0].name}</a>
                          <a href="${v.buy_links[1].url}" class="btn btn-dark rounded ms-1"> <i
                              class="fab fa-apple text-warning mt-2 me-1"></i>${v.buy_links[1].name}</a>
                          <a href="${v.buy_links[2].url}" class="btn btn-dark rounded ms-1"> <i
                              class="fab fa-staylinked text-warning mt-2 me-1"></i>${v.buy_links[2].name}</a>
                          <a href="${v.buy_links[3].url}" class="btn btn-dark rounded ms-1"> <i
                              class="fab fa-monero text-warning mt-2 me-1"></i>${v.buy_links[3].name}</a>
                          <a href="${v.buy_links[4].url}" class="btn btn-dark rounded ms-1"> <i
                              class="fas fa-book text-warning mt-2 me-1"></i>${v.buy_links[4].name}</a>
                          <a href="${v.buy_links[5].url}" class="btn btn-dark rounded mt-2"> <i
                              class="fab fa-soundcloud text-warning mt-2 me-1"></i>${v.buy_links[5].name}</a>


                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
`;
      rightBar.appendChild(div);

    });
  } else {
    errorPanel2.classList.remove("d-none");
  }
}
setBooks();