# Labyrinth
## Express - Node.js
Labirintus társasjátékot valósítom meg mind szerver és mind kliens oldalon.

## Szabály
A társasjáték szabályához nyisd meg a következő weboldalt:
url http://elfnet.hu/kikapcsolodas/tarsasjatekok/labyrinth.php

A szabályt teljes mértékben megörzöm, azon egyszerűsítéstől eltekintve, hogy a cél az adott személy számára mindig be 
lesz jelölve és nem kell szimbólum alapján megkeresni

## Weboldal
**index:** főoldal, itt van lehetőség a bejelentkezéshez, akár a Google-on keresztül is
**register:** új felhasználó regisztrálására ad lehetőséget (hagyományos, nem Google-on keresztül)

**forgotpassword:** amennyiben elfelejted a jelszavad itt az adott emailcímre kaphatsz új jelszót,
amit rövid időn belül meg kell változtatni.

**home:** üres oldal (házi feladaton kívül szeretném majd itt megjeleníteni a különböző emberhez tartozó statisztikákat)

**friends:** barát hozzáadására szolgál (e-mailcím alapján), azok statisztikáit itt meglehet nézni, barátot törölni is lehet

**gameTeams:** lehetőség van a barátok listája alapján csapatokat létrehozni, ahol indíthatunk játékot. Egy csapatban max négy ember lehet, szerkeszthető, törölhető.

GET /
authMain
(auth) -> /home
render

POST /
authMain
(auth) -> /home
findUser
simpleLogin
(user)
(same password) -> saveSession -> /home
!-> locals.error
!-> locals.error
render

GET /register
authMain -> /home
render

POST /register
authMain -> /home
findUser
simpleRegister
(input correct) -> saveUser, saveSession -> /home
!-> locals.error
renderer


USE /googleLogin
authMain -> /home
googleToken -> /
findUser
googleRegister
(user) ->


Login Simple and index
getSessionUser
+ -> /home
- ->
Login Google
Registration
Modify data
