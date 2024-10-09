# Voting app

## Use case descriptions

---

### Look all votes

**Actors:** Registered and non-registered users
**Trigger:** User open the app
**Preconditions:** User want use app and want look open or closed votes
**Postconditions:** User can see all open and closed votes
**Flow:**

**1.** User open app
**2.** App listing open votes

**Exception conditions:**
If there is no open or closed votes -> user can see "no votes available" text

---

### Look individual vote

**Actors:** Registered and non-registered users
**Trigger:** User select single vote from list
**Preconditions:** User want see single individual vote situation
**Postconditions:** User see chosen one individual vote
**Flow:**

**1.** User open one open or closed vote
**2.** App show chosen vote situation and infos

**Exception conditions:** Can not load the vote -> user see error message

---

### Register

**Actors:** Non-registered users
**Trigger:** User press registration/sign-in button
**Preconditions:** The user want login
**Postconditions:** The user registers in the app
**Flow:**

**1.** User press registration button
**2.** App shows registration from
**3.** User input user name and password
**4.** App checks if password or username are valid

**Exception conditions:**
User password or username are not valid -> show error message  
Username has already registered -> show error message

---

### Login

**Actors:** Registered users or admin
**Trigger:** User press logon button
**Preconditions:** User want vote
**Postconditions:** User can vote in open votes
**Flow:**

**1.** User press login button
**2.** App shows login fields
**3.** User input username and password
**4.** User press login button
**5.** App checks if username and password are correct

**Exception conditions:**
Username or password are not correct-> show error message

---

### Vote

**Actors:** Registered users
**Trigger:** User press "vote now" button
**Preconditions:** User want vote and need select individual open vote
**Postconditions:** User votes in an open vote and vote is registered
**Flow:**

**1.** User select one open vote
**2.** User inputting necessary infos regarding voting
**3.** User press vote button to confirm vote
**4.** App registers the vote

**Exception conditions:**
Selected vote is removed or closed when user is still voting the vote -> show error message  
User has already voted that vote -> show error message

---

### Make new votes

**Actors:** Registered admin
**Trigger:** Press "new vote" button
**Preconditions:** Admin wants make a new vote
**Postconditions:** Admin has made a new vote and it's registered in app
**Flow:**

**1.** Admin press "make new vote" button
**2.** Admin select vote type
**3.** Admin inputting vote infos to the vote form
**4.** Admin press "register new vote" button

**Exception conditions:**
No inputted required infos to the new vote form -> show error message

---

### Delete votes

**Actors:** Registered admin
**Trigger:** Press delete button in single vote
**Preconditions:** Select vote want to delete
**Postconditions:** The vote is deleted
**Flow:**

**1.** Select vote want delete
**2.** Press "delete vote" button
**3.** The vote is deleted

**Exception conditions:**
No votes to delete -> show "no votes available" text
