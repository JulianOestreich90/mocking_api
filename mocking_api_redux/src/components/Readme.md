# Hinweise
---
*Eine kleine Einführung zur Benutzung der Mocking_API*


**Mocken von API Responses:**

1. Legt euch ein Benutzerprofil über den 'Register' Reiter in der Website Navigation an.

2. Logged euch mit euren Login Daten ein.

3. Notiert euch eure persönliche UserID, die ihr unter Profile finden könnt.

4. Jetzt könnt ihr mit dem Anlegen von Mockdaten starten, indem ihr zuerst eine neue Url anlegt. Dazu wählt bitte den Reiter 'Mocking aus'. Als Url solltet ihr am Besten einen gültigen Endpunkt der MDR API wählen, z.B.: ``v1/appcontent/sports/matches/live``

5. Ist die URL angelegt, könnt ihr diese anklicken. Es öffnet sich dann die Option zum Erstellen einer neuen Json. Für diese könnt ihr eine Beschreibung anlegen, damit euch die Identifikation der angelegten Daten leichter fällt, sowie selbstverständlich, die zu ersetzenden Daten für den Request in einem **gültigen** Json Format.

6. Die Json lässt sich dann über den ``activate`` Button aktivieren.

7. Abfragen lassen sich die Daten zu Kontrollzwecken dann auch im Browser über ``https://deine-url/mocked/{eure_user_id}/{der_angelegte_url_endpunkt}``


**Falls wieder die Original Response der MDR Live oder Dev API gewünscht wird:**

1. Klickt den angelegten URL Endpunkt an.

2. ``Deactivate``

3. Wählt im oberen rechten Teil der Website entweder `Live` oder `Dev` aus

4. Abfragen lassen sich die Daten dann genau wie im Punkt 7 der Mocking Beschreibung.

5. Ihr solltet dann bei einer Abfrage der Url die Originale Response der jeweiligen MDR API zurück bekommen.


### Hinweise:
- Angelegte URL Endpunkte sollten **auf keinen Fall mit einem führenden Slash** ``/`` beginnen.
 
   - **Richtig**: `v1/appcontent/sports/matches/live` 
   
   - **Falsch**: `/v1/appcontent/sports/matches/live` 
   
- Eine **valide Json** beruht auf wohlgeformten Klammerausdrücken (für jeden öffnenden Klammerausdruck einen schließenden). Bezeichner und String in für Json Werte werden mit doppelten Anführungszeichen `"` und **nicht mit einfachen Anführungszeichen** `'` angegeben.
- **Beispiel:** 

   ````javascript
{
  "employees": {
    "employee": [
      {
        "id": "1",
        "firstName": "Tom",
        "lastName": "Cruise",
        "photo": "https://jsonformatter.org/img/tom-cruise.jpg"
      },
      {
        "id": "2",
        "firstName": "Maria",
        "lastName": "Sharapova",
        "photo": "https://jsonformatter.org/img/Maria-Sharapova.jpg"
      },
      {
        "id": "3",
        "firstName": "Robert",
        "lastName": "Downey Jr.",
        "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg"
      }
    ]
  }
}
   ````


