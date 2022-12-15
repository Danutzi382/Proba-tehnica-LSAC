# Proba-tehnica-LSAC

# Rulare aplicatie
Aplicatia poate fi rulata din terminal utilizand node server.js sau npm start
Pachete necesare: express, mongoose, bcrypt, cookie-parser, express-validator, express-session, body-parser, express-session, cors, body-parser
Aplicatii : MongoDB ( cu url-ul pentru conexiune: mongodb://127.0.0.1:27017/ ), Postman

# Task-uri implementate 
M-am apucat tarziu si am apucat sa implementez doar primele 4 task-uri de la backend

# Task 1
Am implementat schemele pentru cele 2 entitati, am exportat modelele create pentru a le putea folosi in aplicatie, am incercat sa setez variabilele necesare in fisierul principal si am testat in browser daca se conecteaza la portul respectiv
Probleme: erori prin terminal 
- ceva eroare cu o notificare legata de mongoose si strictQuery  care nu ma lasa mai incolo sa rulez aplicatia ( sol: am setat in fisierele entitatilor valoarea implicita true ca sa nu imi mai apara)
- probleme din neatentie pe la instalarea pachetelor

# Task 2
Implementarea operatiilor CRUD
Probleme:
- nu se conecta aplicatia la mongo si dupa un lag mare in terminal aparea ca totusi s-ar conecta mongoose
- nu am putut testa vreo 2-3 zile daca operatiile merg pentru ca nu puteam face post-uri si nici nu puteam interoga baza de date
 sol: am adaugat in path mongo, am incercat sa reinstalez aplicatia, am instalat si o versiune mai veche ca m-am gandit ca poate ultima are bug-uri, am incercat sa inchid conexiunea si sa o redeschid, sa creez alta conexiune, am verificat setarile la retea, am incercat sa schimb path-ul la conexiune.... pana la urma nu mergea ca cica dupa o anumita versiune nu mai merge sa pui host-ul localhost si trebuie pus 127.0.0.1 ://////////
- la get by id puneam si underscore-ul la apelul requestului si nu imi mergea  

# Task 3
Am creat endpointurile necesare pentru logarea si inregistrarea userilor si am folosit algoritmul bcrypt pentru hashuirea parolelor introduse in baza de date, respectiv pachetul express-session pentru generarea cookie-urilor.

# Task 4
Am modificat endpoint-urile legate de introducerea datelor folosind pachetul express-validator pentru verificarea conditiilor si am returnat posibilele erori aparute
