<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
  <title>DYNAMIC</title>
</head>
    <body>
        <!-- <h3 style="color: rgb(193, 19, 19); border: 5px dashed rgb(71, 88, 202);">SHARPENER EXPENCE TRACKER</h3> -->
        <form onsubmit="savetolocalstorage(event)">
            <label>NAME :</label>
            <input type="text" name="usernm" id="usernameInputTag"/>
            <label>USERNAME EMAIL:</label>
            <input type="text" name ="emailId" id="emailInputTag"/>
            <!-- <label>Choose a category:</label>
            <input list="browsers" name="category" id="categoryInputTag">
             <datalist id="browsers">
               <option value="movie">
               <option value="trip">
               <option value="partying"> -->
             <!-- </datalist> -->
            <button> SUBMIT</button>
        </form>
        <ul id='listOfitems'></ul>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.2/axios.min.js"></script>
        <script>
            function savetolocalstorage(event){
                event.preventDefault();
                const name= event.target.usernm.value;
                const email= event.target.emailId.value;
                // const category= event.target.category.value;

                // localStorage.setItem('name',name);
                // localStorage.setItem('email',email)
                // localStorage.setItem('category',category);
                let obj ={
                    name,
                    email

                }
                // localStorage.setItem(email,JSON.stringify(obj))
                axios.post("https://crudcrud.com/api/bf1f06d34cd14a11b146a3021b19fbb7/appointment",obj)
                  .then((response)=>{
                    showuseronscreen(response.data)
                    console.log(response)
                  })
                  .catch((err)=>{
                    console.log(err)
                  })
                // showuseronscreen(obj)
            }
            window.addEventListener("DOMContentLoaded",()=>{
              axios.get("https://crudcrud.com/api/bf1f06d34cd14a11b146a3021b19fbb7/appointment")
               .then((response)=>{
                console.log(response)
                for(var i=0;i<response.data.length;i++){
                  showuseronscreen(response.data[i])
                }
               })
               .catch((err)=>{
                console.log(err)
               })
              // const localStorageObj =localStorage;
              // const localStorageKeys = Object.keys(localStorageObj)
              // for (var i=0;i<localStorageKeys.length;i++){
              //   const key =localStorageKeys[i]
              //   const userDetailsString =localStorageObj[key];
              //   const userDetailsObj = JSON.parse(userDetailsString);
              //   showuseronscreen(userDetailsObj)

              // }
            })
            function showuseronscreen(user){
                // user ={
                //   _id: '',
                  
                // }
                const parentelem = document.getElementById("listOfitems")
                const childelem = document.createElement('li')
                childelem.textContent = user.name + '-'+ user.email 
                const deleteButton = document.createElement('input')
                deleteButton.type = "button"
                deleteButton.value = 'DELETE'
                deleteButton.onclick=()=>{
                    axios.delete(`https://crudcrud.com/api/bf1f06d34cd14a11b146a3021b19fbb7/appointment/${user._id}`)
                      .then((response)=>{
                        console.log(response)
                        parentelem.removeChild(childelem)
                      })
                      .catch((err)=>{
                        console.log(err)
                      })
                    localStorage.removeItem(user.email)
                    // parentelem.removeChild(childelem)
                }
                const editButton = document.createElement('input')
                editButton.type ='button'
                editButton.value ='EDIT'
                editButton.onclick=()=>{
                    localStorage.removeItem(user.email)
                    parentelem.removeChild(childelem)
                    document.getElementById('usernameInputTag').value = user.name
                    document.getElementById('emailInputTag').value = user.email
                    document.getElementById('categoryInputTag').value = user.category
                }
                childelem.appendChild(deleteButton)
                childelem.appendChild(editButton)
                parentelem.appendChild(childelem)

            }
        </script>
    </body>
</html>
