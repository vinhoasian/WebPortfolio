function showFilter() {
    const filterForm = document.getElementById("filterContent");
    const newForm = document.getElementById("newContent");
    filterForm.style.display = "block";
    newForm.style.display = "none";
}

function showAddNew() {
    const filterForm = document.getElementById("filterContent");
    const newForm = document.getElementById("newContent");
    filterForm.style.display = "none";
    newForm.style.display = "flex";
}

function filterArticles() {
    const opinionChecked = document.getElementById("opinionCheckbox").checked;
    const recipeChecked = document.getElementById("recipeCheckbox").checked;
    const updateChecked = document.getElementById("updateCheckbox").checked;

    const articles = document.querySelectorAll("#articleList article");

    articles.forEach(article => {
        if (article.classList.contains("opinion")) {
            article.style.display = opinionChecked ? "block" : "none";
        }
        if (article.classList.contains("recipe")) {
            article.style.display = recipeChecked ? "block" : "none";
        }
        if (article.classList.contains("update")) {
            article.style.display = updateChecked ? "block" : "none";
        }
    });
}

function addNewArticle() {
    const title = document.getElementById("inputHeader").value;
    const text = document.getElementById("inputArticle").value;

    const opinionRadio = document.getElementById("opinionRadio").checked;
    const recipeRadio = document.getElementById("recipeRadio").checked;
    const lifeRadio = document.getElementById("lifeRadio").checked;

    let type = "";
    let markerText = "";

    if (opinionRadio) {
        type = "opinion";
        markerText = "Opinion";
    } else if (recipeRadio) {
        type = "recipe";
        markerText = "Recipe";
    } else if (lifeRadio) {
        type = "update";
        markerText = "Update";
    }

    if (title === "" || text === "" || type === "") {
        alert("Please complete all fields.");
        return;
    }

    const newArticle = document.createElement("article");
    newArticle.classList.add(type);

    const marker = document.createElement("span");
    marker.classList.add("marker");
    marker.textContent = markerText;

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const p = document.createElement("p");
    p.textContent = text;

    newArticle.appendChild(marker);
    newArticle.appendChild(h2);
    newArticle.appendChild(p);

    document.getElementById("articleList").appendChild(newArticle);

    document.getElementById("newContent").reset();

    filterArticles();
}
