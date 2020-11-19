**E Commerce**
----

* **URL**

  `/register`

* **Method:**
  
  `POST`
  
* **Data Params**

  `{
    email: string,
    password: string
  }`

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `{ access_token: string }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ msg : String }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ msg : string }`

