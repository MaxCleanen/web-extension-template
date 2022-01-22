# Разработка

Создаем каталог с расширеним
Выполняем `npm i` который установит пакет `@types/chrome` для удобства разработки с typescript-подсказками

Ссылка на докуменатцию Хрома
https://developer.chrome.com/docs/extensions/reference/

Ссылка на докуменатцию MDN
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions

# Установка в браузер

# Chrome

1.  Открываем chrome://extensions/
2.  Включаем Developer mode в шапке
3.  Нажимаем кнопку 'Load unpacked' и указываем путь к папке 'src'

## Firefox

Необходимо установить пакет web-ext
`npm install --global web-ext`

Запускаем из папки `src` командой
`npx web-ext run`

Для проверки расширения на ошибки, полезно использовать команду `lint`
_Запуск из корня папки `src`_
`npx web-ext lint`

Пример ответа:

```cmd
Validation Summary:

errors          0
notices         0
warnings        0
```

## Safari

Необходимо устновить XCode 😒

Из корня репозитория выполнить

`xcrun safari-web-extension-converter src --project-location ./safari`

В открывшемся окне XCode нажимаем кнопку Build.

# Content-script

Js-Скрипты, которые инжектятся на страницы, указанные в `matches` в `manifest.json`.

# Background-script

Background-скрипт служит своеобразным "бэкендом" для расширения и содержит более расширенную версию API, чем content-скрипты

# Popup

Web-страница, которая открывается при нажатии на иконку расширения в браузерной панели. Может содержать свои js-скрипты, которые могут взаимодествовать c background-скриптом

# Взаиимодействие между скриптами

## Сообщения

Взаимподействие между контент скриптом и бэкеграундом и попап-скриптом и бэкграундом используется механизм сообщения.

1. Посылаем сообщение получателю
2. Перехватываем сообщение на стороне получателя
3. Возвращаем отправителю колбэк (опционально)

```js
chrome.runtime.sendMessage({ action: "action-name" }, (responseData) => {
  //callback code
  console.log(responseData);
});
```

```js
chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === "action-name") {
    cb(some_data);
  }
});
```

```js
//console.log(responseData)
```

## Команды

Команды описаны в `commands` в `manifest.json` и обрабатываются background-скриптом.

```js
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "command_name") {
    //отправялем соощение content-скрипту работающему во вкладке, в которой была вызвана команда
    chrome.tabs.sendMessage(
      tab.id,
      { action: "command runned" },
      (response) => {
        //console.log(response)
      }
    );
  }
});
```
