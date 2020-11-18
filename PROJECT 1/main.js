// This is Project 1 coded by me. Little by little,I managed to do it. I needed a lot of help from online sources like MDN web docs, W3 Schools and Stack Overflow. I'm aware there are probably a lot of things that should be fixed,but since I'm a beginner I guess it's forgiven :D It wasn't an easy task ,and I hope you'll be satisfied.


const wrapper1 = document.getElementById("wrapper1");
const wrapper2 = document.getElementById("wrapper2");
const wrapper3 = document.getElementById("wrapper3");
const wrapper4 = document.getElementById("wrapper4");
const logIn = wrapper1.querySelectorAll("button");
const creatingToDoList = document.getElementById("create");
const logOut = document.getElementById("logOut");
const accountSettings = document.getElementById("accountSettings");
const goBack = document.getElementById("goBack");
const logoCorner = document.getElementById("divForLogo");

//Inputs:

const logInBtn = document.querySelector(".buttonW2");
const signUpBtn = document.querySelector(".buttonW3");

const nameInput = document.querySelector("#nameSign");
const lastNameInput = document.querySelector("#lastNameSign");

//Account settings edit button:

const ASedit = document.getElementById('ASedit');


////// Redirecting to log in and sign up form: //////

logIn[0].addEventListener("click",logInForm);

function logInForm(){
    wrapper1.style.display = "none";
    wrapper2.style.display = "block";
    logoCorner.style.display = "block";
}

logIn[1].addEventListener("click",signUpForm);

function signUpForm(){
    wrapper1.style.display = "none";
    wrapper3.style.display = "block";
    logoCorner.style.display = "block";
}

// LOG IN BUTTON 2 (in wrapper2):

const logIn2 = document.getElementById('logIn2');

//SIGN UP button 2 (in wrapper3):

const signUp2 = document.getElementById('signUp2');

////// HASHING PASSWORDS //////

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


////// LOCAL STORAGE --- SIGN UP and LOG IN //////

/// SIGN UP event listener:

signUp2.addEventListener("click", saving);


function saving(e){

    e.preventDefault();

    //Invalid inputs:

    if(document.getElementById("nameSign").value === ""){
        document.getElementById("nameSign").style.border = "2px solid red";
        return false;
    } else if(document.getElementById("lastNameSign").value === ""){
        document.getElementById("lastNameSign").style.border = "2px solid red";
        return false;
    }else if(document.getElementById("emailSign").value === ""){
        document.getElementById("emailSign").style.border = "2px solid red";
        return false;
    }else if(document.getElementById("passSign").value.length < 8 ){
            document.getElementById("passSign").style.border = "2px solid red";
            alert("Your password should have at least 8 characters!");
            return false;
    }else if(document.getElementById('checkBox').checked !== true){
        alert("Read our 'Terms of Use' to proceed please.");
        return false;
    }else{
        wrapper3.style.display= "none"
        wrapper4.style.display= "block";
        logoCorner.style.display = "block";


    }

    let suInfo = {
        firstName : document.getElementById('nameSign').value,
        lastName: document.getElementById('lastNameSign').value,
        email: document.getElementById('emailSign').value,
        password: document.getElementById('passSign').value.hashCode()
    }
    
    // Checking If there is an array already. If not - we create a new one, If exists, we just add new values to it.

    let signUpInfo = !!localStorage.getItem('User Sign Up Information') ? JSON.parse(localStorage.getItem('User Sign Up Information')) : [];

    signUpInfo.push(suInfo);

    //saving items in LOCAL STORAGE:

    localStorage.setItem('User Sign Up Information', JSON.stringify(signUpInfo));

    
    
}


/// LOG IN event listener:

logIn2.addEventListener("click", checking);

function checking(e){
    e.preventDefault();

    let lsData = localStorage.getItem('User Sign Up Information');
    let parsedData = JSON.parse(lsData);

    let emailLG = document.getElementById('emailLog').value;
    let passLG = document.getElementById('passLog').value.hashCode();


    if(!parsedData){
        document.getElementById('emailLog').style.border = "2px solid red";;
        document.getElementById('passLog').style.border = "2px solid red";
        document.getElementById('emailLog').focus();
    }
    
    // We have to use for loop because there are going to be more users:

    for(let i = 0; i < parsedData.length; i++){
        if(emailLG === parsedData[i].email && passLG === parsedData[i].password){
        wrapper2.style.display = "none";
        wrapper4.style.display = "block";
      }else if(emailLG !== parsedData[i].email && passLG === parsedData[i].password){
        document.getElementById('emailLog').style.border = "2px solid red";
        document.getElementById('emailLog').focus();
        return false;
       }else if(emailLG === parsedData[i].email && passLG !== parsedData[i].password){
        document.getElementById('passLog').style.border = "2px solid red";
        document.getElementById('passLog').focus();
        return false;
       }else if(emailLG !== parsedData[i].email && passLG !== parsedData[i].password){
        document.getElementById('emailLog').style.border = "2px solid red";;
        document.getElementById('passLog').style.border = "2px solid red";
        document.getElementById('emailLog').focus();
       }
    
    }

    
}




////// Creating TO DO list //////

creatingToDoList.addEventListener("click", createToDoList);

function createToDoList(){
    //creating list 
    const newDiv = document.createElement("div");
    newDiv.classList.add("newDiv");
    wrapper4.appendChild(newDiv);
    
    // save, edit ,rename button

    //list title

    const listTitle = document.createElement("input");
    listTitle.classList.add("listTitle","inputs");

    listTitle.value = "My new list";
    newDiv.appendChild(listTitle);


   //rename button

    const renameButton = document.createElement("button");
    const renameButtonText = document.createTextNode("Rename");
    renameButton.appendChild(renameButtonText);
    renameButton.classList.add("inputs","renameButton");
    newDiv.appendChild(renameButton);

    //Function which renames list title:

    renameButton.addEventListener("click",renameFun);

    var listNameDeff; //had to declare variable here ,because of the global scope (will need in EDIT list name)

    function renameFun(){

        const listNameArray = [];

        const listName = listTitle.value;
        listNameArray.push(listName);

        listNameDeff = document.createElement("p");
        listNameDeff.innerText = listNameArray[0];
        listNameDeff.classList.add("listTitleRenamed");
        newDiv.appendChild(listNameDeff);

        listTitle.style.display = "none";
        
    }



    //Creating to-do items:

    //buttons - ADD, SAVE, EDIT:

    // ADD
    const addButton = document.createElement("button");
    const addButtonText = document.createTextNode("Add");
    addButton.appendChild(addButtonText);
    addButton.classList.add("inputs","renameButton","addButton");
    newDiv.appendChild(addButton);

    //SAVE

    const saveButton = document.createElement("button");
    const saveButtonText = document.createTextNode("Save");
    saveButton.appendChild(saveButtonText);
    saveButton.classList.add("inputs","renameButton","saveButton");
    newDiv.appendChild(saveButton);

    //EDIT - in savingItems() function
    
    

    // Creating to - do input:

    const toDoInput = document.createElement("input");
    toDoInput.classList.add("inputs","toDoItems");
    toDoInput.id = "toDoInputID";
    newDiv.appendChild(toDoInput);
    toDoInput.placeholder = "Your items";
    
   
    ////// ADDING To Do Items //////

    addButton.addEventListener("click",addingItems);

    function addingItems(){
        
        const itemsArray = [];

        const itemsArrayWritten = toDoInput.value;
        itemsArray.push(itemsArrayWritten);

        //adding items:
        const divItems = document.createElement("ul");
        const addedItems = document.createElement("li");
        divItems.id = "divItems";
        divItems.appendChild(addedItems);
        const br = document.createElement("br");

        //clearing text from input:
        document.getElementById("toDoInputID").value = "";
        toDoInput.focus();


        addedItems.innerText = itemsArray[0];
        addedItems.classList.add("addedToDoItems");
        newDiv.appendChild(divItems);
        newDiv.appendChild(br);

        

        //addedItems click event (striking item):

        addedItems.addEventListener("click",strikedItem);

        function strikedItem(){
            if(addedItems.innerHTML === addedItems.innerText){
                addedItems.innerHTML = "<s>" + addedItems.innerText + "</s>";
                addedItems.style.color = "rgba(235, 235, 0, 0.5)";
            }else if(addedItems.innerHTML !== addedItems.innerText){
                addedItems.innerHTML = addedItems.innerText;
                addedItems.style.color = "rgb(235,235,0)"
            }

        }



    }

    //Saving list items;

    saveButton.addEventListener("click",savingItems);

    function savingItems(){

        const savedItems = document.createElement("div");
          const savedItemsName = document.createTextNode(listNameDeff.innerText);
          savedItems.appendChild(savedItemsName);
        savedItems.classList.add("savedItems" ,"inputs");
        wrapper4.appendChild(savedItems);

        newDiv.style.display = "none";
        savedItems.style.display = "block";


        //edit button;

        const editButton = document.createElement("button");
        const editButtonText = document.createTextNode("Edit");
        editButton.appendChild(editButtonText);
        editButton.classList.add("inputs","renameButton","editButton");
        savedItems.appendChild(editButton);

        //editing list event listener;
        editButton.addEventListener("click",editingList);

        function editingList(){
            savedItems.style.display = "none";
            newDiv.style.display = "block";
        }


    }






}


/// ACCOUNT SETTINGS button and LOG OUT button EVENT LISTENERS: ///
    
//LOG OUT:

logOut.addEventListener("click",loggingOut);

function loggingOut(){
    wrapper4.style.display = "none";
    wrapper1.style.display = "block";
    location.reload();
}

//ACCOUNT SETTINGS:

accountSettings.addEventListener("click",accSettingsFun);

function accSettingsFun(){
    wrapper4.style.display = "none";
    wrapper5.style.display = "block";
    

    // email and password from LOG IN input
    let emLog = document.getElementById('emailLog').value;
    let passLog = document.getElementById('passLog').value.hashCode();

    //email and password we got from local storage:

    let parsedData_as = JSON.parse(localStorage.getItem('User Sign Up Information'));


    for(let i = 0; i < parsedData_as.length; i++){

        //for LOG IN
      if(emLog === parsedData_as[i].email && passLog === parsedData_as[i].password){
       document.getElementById('editNameSign').value = parsedData_as[i].firstName;
       document.getElementById('editLastNameSign').value = parsedData_as[i].lastName;
       document.getElementById('editEmailSign').value = parsedData_as[i].email;
       document.getElementById('editPassSign').value = parsedData_as[i].password;
       break;
      }else{
          //for SIGN UP
        document.getElementById('editNameSign').value  = parsedData_as[i].firstName;
        document.getElementById('editLastNameSign').value = parsedData_as[i].lastName;
        document.getElementById('editEmailSign').value = parsedData_as[i].email;
        document.getElementById('editPassSign').value = parsedData_as[i].password;
      }



    }
    

    /// EDIT EVENT LISTENER

    ASedit.addEventListener("click",editData);

    function editData(e){
        e.preventDefault();

        //First,we need to make sure user has entered valid data:

        if(document.getElementById('editNameSign').value === ""){
            document.getElementById('editNameSign').style.border = "2px solid red";
            return false;
        }else if(document.getElementById('editLastNameSign').value === ""){
            document.getElementById('editLastNameSign').style.border = "2px solid red";
            return false;
        }else if(document.getElementById('editEmailSign').value === ""){
            document.getElementById('editEmailSign').style.border = "2px solid red";
            return false;
        }else if(document.getElementById('editPassSign').value === ""){
            document.getElementById('editPassSign').style.border = "2px solid red";
            return false;
        }else if(document.getElementById('editPassSign').value.length < 8){
            document.getElementById("editPassSign").style.border = "2px solid red";
            alert("Your password should have at least 8 characters!");
            return false;

        }else{
            
        wrapper5.style.display = "none";
        wrapper4.style.display = "block";

        }



        let parsedData = JSON.parse(localStorage.getItem('User Sign Up Information'));
        
        // If values are not the same (user has changed them), then,we need to DELETE an old object:

        for(let i = 0; i < parsedData.length; i++){
            
            if(document.getElementById('editNameSign').value === parsedData[i].firstName || document.getElementById('editLastNameSign').value === parsedData[i].lastName || document.getElementById('editEmailSign').value === parsedData[i].email || document.getElementById('editPassSign').value.hashCode() === parsedData[i].password){

            parsedData.splice(i,1);

          }


        }
        

        localStorage.setItem('User Sign Up Information',JSON.stringify(parsedData));



        //Later,in the same moment,we need to create a new one with new values: 

        let editedObj = {
            firstName: document.getElementById('editNameSign').value,
            lastName: document.getElementById('editLastNameSign').value,
            email: document.getElementById('editEmailSign').value,
            password: document.getElementById('editPassSign').value.hashCode()
        }

        let signUpInfo = !!localStorage.getItem('User Sign Up Information') ? JSON.parse(localStorage.getItem('User Sign Up Information')) : [];

        signUpInfo.push(editedObj);

        localStorage.setItem('User Sign Up Information',JSON.stringify(signUpInfo));




    }

    //Go back button event listener:

    goBack.addEventListener('click',justGoBack);

    function justGoBack(e){
        e.preventDefault();

        wrapper5.style.display = "none";
        wrapper4.style.display = "block";
    }

}

