// ===============================
// Kaushambi Eye Hospital
// doctor.js
// ===============================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ===============================
// Variables
// ===============================

const doctorTable = document.getElementById("doctorTable");

const doctorForm = document.getElementById("doctorForm");

let doctors = [];


// ===============================
// Load Doctors
// ===============================

onSnapshot(collection(db,"doctors"),(snapshot)=>{

    doctors=[];

    doctorTable.innerHTML="";

    snapshot.forEach((docSnap)=>{

        const doctor=docSnap.data();

        doctor.docId=docSnap.id;

        doctors.push(doctor);

    });

    doctors.forEach((doctor,index)=>{

        doctorTable.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${doctor.name}</td>

<td>${doctor.specialization}</td>

<td>${doctor.degree}</td>

<td>${doctor.mobile}</td>

<td>${doctor.email}</td>

<td>${doctor.timing}</td>

<td>

<div class="action-buttons">

<button class="edit-btn"
onclick="editDoctor(${index})">

<i class="fa-solid fa-pen"></i>

</button>

<button class="delete-btn"
onclick="deleteDoctor(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</td>

</tr>

`;

    });

});

// ===============================
// Add Doctor
// ===============================

doctorForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const doctor={

        name:document.getElementById("doctorName").value,

        specialization:document.getElementById("doctorSpecialization").value,

         mobile:document.getElementById("doctorMobile").value,

        degree:document.getElementById("doctorDegree").value,

        email:document.getElementById("doctorEmail").value,

        timing:document.getElementById("doctorTiming").value

    };

    try{

        await addDoc(collection(db,"doctors"),doctor);

        alert("Doctor Added Successfully");

        doctorForm.reset();

        document.getElementById("doctorModal").style.display="none";

    }

    catch(error){

        console.error(error);

        alert("Failed to Add Doctor");

    }

});


// ===============================
// Search Doctor
// ===============================

const searchDoctor=document.getElementById("searchDoctor");

if(searchDoctor){

searchDoctor.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll("#doctorTable tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)
? ""
: "none";

});

});

}

// ===============================
// Edit Doctor
// ===============================

async function editDoctor(index){

    const doctor = doctors[index];

    const name = prompt("Doctor Name", doctor.name);
    if(name===null) return;

    const specialization = prompt("Specialization", doctor.specialization);
    if(specialization===null) return;

    const mobile = prompt("Mobile", doctor.mobile);
    if(mobile===null) return;

    const email = prompt("Email", doctor.email);
    if(email===null) return;

    const timing = prompt("Timing", doctor.timing);
    if(timing===null) return;

    try{

        await updateDoc(
            doc(db,"doctors",doctor.docId),
            {
                name:name,
                specialization:specialization,
                degree:doctor.degree,
                mobile:mobile,
                email:email,
                timing:timing
            }
        );

        alert("Doctor Updated Successfully");

    }catch(error){

        console.error(error);

        alert("Update Failed");

    }

}


// ===============================
// Delete Doctor
// ===============================

async function deleteDoctor(index){

    if(!confirm("Delete this Doctor?")) return;

    try{

        await deleteDoc(
            doc(db,"doctors",doctors[index].docId)
        );

        alert("Doctor Deleted Successfully");

    }catch(error){

        console.error(error);

        alert("Delete Failed");

    }

}


// ===============================
// Global Functions
// ===============================

window.editDoctor = editDoctor;
window.deleteDoctor = deleteDoctor;

console.log("✅ Doctors Module Loaded Successfully");