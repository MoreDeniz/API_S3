// Задача 2.

// Бесконечная лента фотографий
// Для создания бесконечной ленты с фотографиями с использованием
// Unsplash API, выполните следующие шаги:
// 1. Зарегистрируйтесь на Unsplash:
// ○ Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// ○ Нажмите кнопку "Join" или "Регистрация", чтобы создать аккаунт, если у вас его еще нет.
// ○ Войдите в свой аккаунт Unsplash.

// 2. Создайте приложение:
// ○ После входа в аккаунт Unsplash, перейдите на страницу разработчика Unsplash
// (https://unsplash.com/developers).
// ○ Нажмите на кнопку "Your apps".
// ○ Нажмите "New Application" (Новое приложение).
// ○ Заполните информацию о вашем приложении, такую как имя, описание и сайт (вы можете
// использовать http://localhost для тестового сайта).
// ○ После заполнения информации, нажмите "Create Application" (Создать приложение).

// 3. Получите API-ключ:
// ○ После создания приложения, вы получите API-ключ. Этот ключ будет
// отображаться в вашей панели управления приложением.
// ○ API-ключ представляет собой строку вида YOUR_ACCESS_KEY.
// Скопируйте его.
// 4. Измените код HTML и JavaScript:
// ○ Откройте вашу HTML-страницу в текстовом редакторе или
// интегрированной среде разработки.
// ○ Замените 'YOUR_ACCESS_KEY' в коде JavaScript на ваш собственный
// API-ключ.

// 5. Реализуйте загрузку фотографий при открытии страницы.

// 6. Реализуйте бесконечную подгрузку фотографий при прокручивании страницы.

// const fotoData = [];
const url =
  "https://api.unsplash.com/photos/?client_id=ehChI0CYn26sYMvZVht--g4AW_CRCwbdBHSNJxkCAzU";
const photoContentEl = document.getElementById("photo-container");


// Получить данные с сервера, вернёт промисб кот резолвится в js-object
function getImagesFetch() {
  return fetch(url)
    .then((data) => data.json())
    .then((fotolist) => {
      return fotolist;
    });
}

//функция, принимает массив, возвр строку html, состоящую из наших img
function showPictures(array) {
  // переменная для строки
  let imgString = "";
  //добавляем в неё кусочки
  for (const arrayElement of array) {
    imgString += `<div class="photo">
        <img src="${arrayElement.urls.small}">
        </div>`;
  }
  // ссылка на картинку
  // arrayElement.urls.small;
  return imgString;
}

// fotoData возвращает promice
const fotoData = await getImagesFetch();
// передаём его в showPictures
const html = showPictures(fotoData);

photoContentEl.insertAdjacentHTML("beforebegin", html);
