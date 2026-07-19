// =====================================
// KAUSHAMBI EYE HOSPITAL
// PATIENTS.JS
// =====================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// =====================================
// Variables
// =====================================

const patientTable = document.getElementById("patientTable");
const patientForm = document.getElementById("patientForm");

let patients = [];

// =====================================
// Load Patients
// =====================================

onSnapshot(collection(db,"patients"), (snapshot)=>{

    patients = [];

    patientTable.innerHTML = "";

    let male = 0;
    let female = 0;

    snapshot.forEach((docSnap)=>{

        const patient = docSnap.data();

        patient.docId = docSnap.id;

        patients.push(patient);

        if(patient.gender==="Male") male++;
        if(patient.gender==="Female") female++;

    });

    document.getElementById("totalPatients").innerText = patients.length;
    document.getElementById("malePatients").innerText = male;
    document.getElementById("femalePatients").innerText = female;

    patients.forEach((patient,index)=>{

        patientTable.innerHTML += `

<tr>

<td>${index+1}</td>

<td>KEH-${1000+index}</td>

<td>${patient.name}</td>

<td>${patient.age}</td>

<td>${patient.gender}</td>

<td>${patient.mobile}</td>

<td>${patient.doctor}</td>

<td>${patient.visitDate}</td>

<td>

<div class="action-buttons">

<button class="view-btn"
onclick="viewPatient(${index})">

<i class="fa-solid fa-eye"></i>

</button>

<button class="edit-btn"
onclick="editPatient(${index})">

<i class="fa-solid fa-pen"></i>

</button>

<button class="print-btn"
onclick="printPatient(${index})">

<i class="fa-solid fa-print"></i>

</button>

<button class="delete-btn"
onclick="deletePatient(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</td>

</tr>

`;

    });

});

// =====================================
// Add Patient
// =====================================

patientForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const patient={

        name:document.getElementById("patientName").value,

        mobile:document.getElementById("patientMobile").value,

        email:document.getElementById("patientEmail").value,

        age:document.getElementById("patientAge").value,

        gender:document.getElementById("patientGender").value,

        doctor:document.getElementById("patientDoctor").value,

        visitDate:document.getElementById("visitDate").value,

        address:document.getElementById("patientAddress").value

    };

    try{

        await addDoc(collection(db,"patients"),patient);

        alert("Patient Added Successfully");

        patientForm.reset();

        document.getElementById("patientModal").style.display="none";

    }

    catch(error){

        console.error(error);

        alert("Failed to Save Patient");

    }

});


// =====================================
// Search Patient
// =====================================

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll("#patientTable tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)
? ""
: "none";

});

});

}


// =====================================
// Refresh Button
// =====================================

const refreshBtn=document.getElementById("refreshBtn");

if(refreshBtn){

refreshBtn.onclick=function(){

location.reload();

};

}

// =====================================
// View Patient
// =====================================

function viewPatient(index){

    const p = patients[index];

    alert(

`Patient Details

Name : ${p.name}
Mobile : ${p.mobile}
Email : ${p.email}
Age : ${p.age}
Gender : ${p.gender}
Doctor : ${p.doctor}
Visit Date : ${p.visitDate}
Address : ${p.address}`

    );

}


// =====================================
// Edit Patient
// =====================================

async function editPatient(index){

    const p = patients[index];

    const name = prompt("Patient Name", p.name);
    if(name===null) return;

    const mobile = prompt("Mobile", p.mobile);
    if(mobile===null) return;

    const age = prompt("Age", p.age);
    if(age===null) return;

    const doctor = prompt("Doctor", p.doctor);
    if(doctor===null) return;

    try{

        await updateDoc(
            doc(db,"patients",p.docId),
            {
                name,
                mobile,
                age,
                doctor
            }
        );

        alert("Patient Updated Successfully");

    }catch(error){

        console.error(error);

        alert("Update Failed");

    }

}


// =====================================
// Delete Patient
// =====================================

async function deletePatient(index){

    if(!confirm("Delete this patient?")) return;

    try{

        await deleteDoc(
            doc(db,"patients",patients[index].docId)
        );

        alert("Patient Deleted Successfully");

    }catch(error){

        console.error(error);

        alert("Delete Failed");

    }

}


// =====================================
// Print Patient
// =====================================

function printPatient(index){

    const p = patients[index];

    const win = window.open("", "_blank");

    win.document.write(`
        <html>
        <head>
            <title>Patient Details</title>
            <style>
                body{
                    font-family:Arial,sans-serif;
                    padding:30px;
                    line-height:1.8;
                }
                h2{
                    color:#165cc9;
                }
            </style>
        </head>
        <body>

        <h2>Kaushambi Eye Hospital</h2>
        <hr>

        <p><b>Name:</b> ${p.name}</p>
        <p><b>Mobile:</b> ${p.mobile}</p>
        <p><b>Email:</b> ${p.email}</p>
        <p><b>Age:</b> ${p.age}</p>
        <p><b>Gender:</b> ${p.gender}</p>
        <p><b>Doctor:</b> ${p.doctor}</p>
        <p><b>Visit Date:</b> ${p.visitDate}</p>
        <p><b>Address:</b> ${p.address}</p>

        <script>
            window.print();
        <\/script>

        </body>
        </html>
    `);

    win.document.close();

}


// =====================================
// Global Functions
// =====================================

window.viewPatient = viewPatient;
window.editPatient = editPatient;
window.deletePatient = deletePatient;
window.printPatient = printPatient;

console.log("✅ Patients Module Loaded Successfully");