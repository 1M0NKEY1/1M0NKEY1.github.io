function saveFilmsToLocalStorage() {
    const films = [];
    const filmElements = document.querySelectorAll(".todo-film");

    filmElements.forEach(film => {
        let filmTextNotTrimmed = film.querySelector("span").textContent;

        const filmText = filmTextNotTrimmed
            .replace(/\s+/g, '')
            .trim();

        const isChecked = film.querySelector(".film-check-box").checked;
        films.push({ text: filmText, completed: isChecked });
    });

    localStorage.setItem("films", JSON.stringify(films));
}

function attachCheckboxListeners() {
    const checkboxes = document.querySelectorAll(".film-check-box");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", saveFilmsToLocalStorage);
    });
}

function loadTasksFromLocalStorage() {
    const films = JSON.parse(localStorage.getItem("films")) || [];

    films.forEach(film => {
        let filmHTML = `
            <div class="todo-film">
                <div class="todo-check-button-container">
                    <input type="checkbox" class="film-check-box" ${film.completed ? "checked" : ""} />
                </div>
                <span id="todo-filmname">
                    ${film.text}
                </span>
            </div>
        `;
        document.querySelector('#todo-films').innerHTML += filmHTML;
    });

    attachCheckboxListeners();
}

function addNewMovie() {
    const inputElement = document.querySelector('#todo-newfilm input');
    const inputValue = inputElement.value.trim();

    if (inputValue.length === 0) return;

    setTimeout(() => {
        if (inputValue === "/delete") {
            const currentFilms = document.querySelectorAll(".film-check-box:checked");
            const filmCount = currentFilms.length;

            if (filmCount > 0) {
                Swal.fire({
                    title: 'Вы уверены?',
                    text: `Вы собираетесь удалить ${filmCount} фильм(ов)!`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Да, удалить!',
                    cancelButtonText: 'Отмена'
                }).then((result) => {
                    if (result.isConfirmed) {
                        currentFilms.forEach(film => film.closest(".todo-film").remove());
                        saveFilmsToLocalStorage();
                        toastr.success('Фильмы успешно удалены!');
                    }
                });
            } else {
                toastr.warning('Нет отмеченных фильмов для удаления!');
            }
        } else if (inputValue === "/back") {
            window.location.href = "../html/add-movie.html";
        } else {
            let filmHTML = `
                <div class="todo-film">
                    <div class="todo-check-button-container">
                        <input type="checkbox" class="film-check-box" />
                    </div>
                    <span id="todo-filmname">
                        ${inputValue}
                    </span>
                </div>
            `;
            const list = document.querySelector('#todo-films');
            list.innerHTML += filmHTML;

            attachCheckboxListeners();
        }

        inputElement.value = "";
        saveFilmsToLocalStorage();
    }, 50);
}

async function fetchMovies() {
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');
    const filmList = document.getElementById('todo-films');

    preloader.style.display = 'block';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Сеть недоступна');
        }
        const movies = await response.json();
        renderMovies(movies);
    } catch (error) {
        console.error(error);
        errorMessage.style.display = 'block';
    } finally {
        preloader.style.display = 'none';
    }
}

function renderMovies(movies) {
    const filmList = document.getElementById('todo-films');
    movies.forEach(movie => {
        const filmHTML = `
            <div class="todo-film">
                <div class="todo-check-button-container">
                    <input type="checkbox" class="film-check-box" />
                </div>
                <span id="todo-filmname">
                    ${movie.title}
                </span>
            </div>
        `;
        filmList.innerHTML += filmHTML;
    });

    attachCheckboxListeners();
}

document.querySelector('#add-new-film-button').addEventListener("click", addNewMovie);

document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
    // fetchMovies();
});