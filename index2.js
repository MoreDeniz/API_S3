// Задача 2.

// Бесконечная лента фотографий
// Для создания бесконечной ленты с фотографиями с использованием Unsplash API, выполните следующие шаги:
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

// получаем функцию, кот увеличивает номер страницы
const getNumPage = counter();

// закачиваем сейчас данные или нет
let isFetching = false;

const photoContentEl = document.getElementById("photo-container");

try {
  // получаем данные fotoData возвращает promice, меняет
  const fotoData = await getImagesFetch(getNumPage());
  render(fotoData);
} catch (err) {
  alert(err);
}

window.addEventListener("scroll", async function () {
  // если уже качается, то больше не подкачивать!
  if (isFetching) {
    return;
  }
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  // когда дойдём до низа - подгрузить ещё
  if (document.documentElement.scrollTop > scrollHeight * 0.7) {
    try {
      // получаем данные fotoData возвращает promice, меняет
      const fotoData = await getImagesFetch(getNumPage());
      render(fotoData);
    } catch (err) {
      alert(err);
    }
  }
});

// отображение фото - синхр ф-ция!!!
function render(fotoData) {
  // передаём его в showPictures
  const html = showPictures(fotoData);

  photoContentEl.insertAdjacentHTML("beforebegin", html);
}

// Получить данные с сервера, вернёт промис кот резолвится в js-object
async function getImagesFetch(numPage) {
  isFetching = true; //если подкачиваем новые фото
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/?client_id=${client_id}&page=${numPage}`
    );
    if (!response.ok) {
      throw new Error("Сервер встал");
    }
    return await response.json();
  } catch (err) {
    //принимаем ошибку и прокидываем дальше
    throw err;
  } finally {
    isFetching = false;
  }
}

// function getImagesFetch(numPage) {
//   isFetching = true; //если подкачиваем новые фото
//   return fetch(
//     `https://api.unsplash.com/photos/?client_id=${client_id}&page=${numPage}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Сервер встал")
//       }
//       response.json();
//     })
//     .then((fotolist) => {
//       return fotolist;
//     })
//     .finally(() => isFetching = false);
// }

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

// перемотка страниц
function counter() {
  let count = 1;
  return function () {
    return count++;
  };
}
