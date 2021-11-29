# vue-course

# JAK URUCHOMIĆ.

## server

npm run devStart

## frontend

npm run serve

# GŁÓWNE ZMIANY:

dodano zakładkę ustawienia,

nie ma potrzeby modyfikowania app.js na serwerze w celu wpisania loginu hasła i numeru telefonu.

Wszystko można uzupełnić w zakładce ustawienia na stronie.

Dane zapisywane są w pliku settings.json na serwerze (normalnie byłyby w bazie ale już nie chciałem komplikować).

Obsługa w przypadku nie odebrania połączenia.

Zablokowanie wejście na Connected, Failed, Ringing, Answered

# MNIEJSZE ZMIANY:

małe zmiany wizualne.

dodany timer połączenia

numery mogą być wpisane ze spacjami (zarówno w ustawieniach jak i na stronie głównej)
