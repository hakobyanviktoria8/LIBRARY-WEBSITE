//Registration
regBtn.onclick = function () {
    regBtnForm.style.display = "block";
    logBtnForm.style.display = "none";
};

//Login
logBtn.onclick = function () {
    logBtnForm.style.display = "block";
    regBtnForm.style.display = "none";
};

//registration page
let id = document.getElementById("id");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let address = document.getElementById("address");
let phone = document.getElementById("phone");
let program = document.getElementById("program");
let level = document.getElementById("level");
let grade = document.getElementById("grade");
let btnReg = document.getElementById("btnReg");

//function gender
function funGender(){
    if (inlineRadio1.checked){
        return inlineRadio1.value
    }
    if(inlineRadio2.checked){
        return inlineRadio2.value
    }
}

//fullName validation
fullName.onblur = function() {
    if(/[a-zA-Z]{4,}/.test(fullName.value)){
        fullName.style.borderColor = " #0dee19"
    } else {
        fullName.style.borderColor = "red"
    }
};
//email validation
email.onblur = function() {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)) {
        email.style.borderColor = " #0dee19"
    } else {
        email.style.borderColor = "red"
    }
};
//address validation
address.onblur = function() {
    if (/^[#.0-9a-zA-Z\s,-]+$/.test(address.value)) {
        address.style.borderColor = " #0dee19"
    } else {
        address.style.borderColor = "red"
    }
};
//phone validation
phone.onblur = function() {
    if (/\d{3}-\d{2}-\d{2}-\d{2}/.test(phone.value)) {
        phone.style.borderColor = " #0dee19"
    } else {
        phone.style.borderColor = "red"
    }
};
//password validation
password.onblur = function() {
    if (/\w{6,}$/.test(password.value)) {
        password.style.borderColor = " #0dee19"
    } else {
        password.style.borderColor = "red"
    }
};

//fanction ID
function funid(){
    let i = localStorage.getItem('id') ==="" ? 0 : +localStorage.getItem('id');
    i+=1;
    localStorage.setItem('id',i);
    return i
}

//Registration create obj send localStorage
btnReg.onclick = function() {
    //profile validacia
    if (fullName.value && email.value && address.value && phone.value && password.value && program.value && level.value && funGender()) {
        alert("You have successfully registered.")
    } else {
        alert("Please fill in all fields...!");
        return
    }
    //student data obj
    let obj = {
        id: funid(),
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        address: address.value,
        phone: phone.value,
        program: program.value,
        level: level.value,
        grade: 40,
        gender: funGender()
    };

    let objJsonStr = JSON.stringify(obj);
    localStorage.setItem(obj.id, objJsonStr);

    //profile regist->jnji  Account-> baci
    registrNav.style.display = "none";
    registration.style.display = "none";
    myAccount.style.display = "block";

    // add table new student
    // studentAddTable([obj.id, obj.fullName, obj.program, obj.level, obj.grade]);

    //fill student data in card
    myCardData([obj.fullName, obj.email, obj.address, obj.phone]);
    // location.reload()
};

//registered obj login
btnLog.onclick = function(){
    if (!loginEmale.value || !loginPassword.value) {
        alert("Please fill in all fields...!");
        return
    }
    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        if (value.email === loginEmale.value && value.password === loginPassword.value) {
            myCardData([value.fullName, value.email, value.address, value.phone]);
            registrNav.style.display = "none";
            registration.style.display = "none";
            myAccount.style.display = "block";
            return;
        }
    }
    alert("Incorrect login or password...!");
};

//add table new student
function studentAddTable(arr) {
    let tr = document.createElement("tr");
    tr.setAttribute("id",arr[0]);
    for (let i=0; i<5; i++){
        let td = document.createElement("td");
        if (i===4){
            td.innerHTML = '<input type="number" min="40" max="100" step="5" value="' + arr[i] + '">';
            let tdInput = td.getElementsByTagName("input")[0];
            tdInput.onblur =  function () {
                let user = JSON.parse(localStorage.getItem(arr[0]));  //user obj
                user.grade = tdInput.value;                            //changed value
                localStorage.setItem(arr[0],JSON.stringify(user))   //seved localStorage id, user obj
            }
        } else {
            td.innerHTML = arr[i];
        }
        tr.append(td);
    }
    tbody.append(tr);
}

//Teacher selekt Program
let btnProgram = document.querySelectorAll(".btnProgram");
for (let i of btnProgram){
    i.onclick= function () {
        table.style.display="block";
        courses.style.display="none";
        selectedProgramStudent(i.id, "Level")
    }
}

//select program & level show student
function selectedProgramStudent(selectProgram, selectLevel){
    let p = document.getElementById("progr");
    p.value = selectProgram;
    tbody.innerHTML = "";

    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key === "id")continue;  // return undefined, save user id
        let value = JSON.parse(localStorage.getItem(key));
        if ((selectProgram==="Program" || selectProgram === value.program) &&
            (selectLevel === "Level" || selectLevel === value.level)) {
            studentAddTable([value.id, value.fullName, value.program, value.level, value.grade]);
        }
    }
}
//in table select "progr" program
progr.onchange = function(){
    selectedProgramStudent(progr.value, levl.value)
};

//in table select "levl" level
levl.onchange = function(){
    selectedProgramStudent(progr.value, levl.value);
};

//my Card data
function myCardData(arr) {
    cardName.innerHTML = arr[0];
    cardEmail.innerHTML = arr[1];
    cardAdd.innerHTML += arr[2];
    cardPhone.innerHTML += arr[3]
}

//my Account & My Card
myAccount.onclick = function () {
    card.style.display === "none" ?  card.style.display = "block": card.style.display = "none"
};

//logout
logout.onclick = function () {
    registrNav.style.display = "block";
    registration.style.display = "block";
    myAccount.style.display = "none";
    card.style.display = "none";
};

//book search
bookSearch.onclick = function () {
    result.innerHTML ="";
    bookimg.classList.add("bookimgAnim");
    setTimeout(function () {
        resultbook.style.display = "none";
    },500);
};

//
logo.onclick = function () {
    location.reload()
};

//
myLibCard.onclick =function () {
    card.style.display = "none"
};