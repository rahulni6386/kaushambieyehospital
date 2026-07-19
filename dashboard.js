// ================= Firebase =================

import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ================= Secure Login =================

if (localStorage.getItem("adminLogin") !== "true") {

    alert("Please Login First");

    window.location.href = "login.html";

}


// ================= Variables =================

let appointments = [];

const table =
    document.getElementById("appointmentTable") ||
    document.getElementById("appointmentsTable");

    console.log(table);

// ================= Load Appointments =================

onSnapshot(collection(db, "appointments"), (snapshot) => {

    appointments = [];

    if (table) {

        table.innerHTML = "";

    }

    snapshot.forEach((docSnap) => {

        const item = docSnap.data();

        item.docId = docSnap.id;

        appointments.push(item);

    });

console.log("Table =", table);
console.log("Appointments =", appointments);
console.log("Length =", appointments.length);

    appointments.forEach((item, index) => {

    table.innerHTML += `
<tr>

<td>${index + 1}</td>

<td>${item.name}</td>

<td>${item.mobile}</td>

<td>${item.doctor}</td>

<td>
${item.date}<br>
<small>${item.time}</small>
</td>

<td><strong>${item.status}</strong></td>

<td>

<div class="action-buttons">

<button class="view-btn" title="View"
onclick="viewAppointment(${index})">
<i class="fa-solid fa-eye"></i>
</button>

<button class="approve-btn" title="Approve"
onclick="approveAppointment(${index})">
<i class="fa-solid fa-circle-check"></i>
</button>

<button class="complete-btn" title="Complete"
onclick="completeAppointment(${index})">
<i class="fa-solid fa-check-double"></i>
</button>

<button class="reject-btn" title="Reject"
onclick="rejectAppointment(${index})">
<i class="fa-solid fa-circle-xmark"></i>
</button>

<button class="edit-btn" title="Edit"
onclick="editAppointment(${index})">
<i class="fa-solid fa-pen"></i>
</button>

<button class="print-btn" title="Print"
onclick="printAppointment(${index})">
<i class="fa-solid fa-print"></i>
</button>

<button class="delete-btn" title="Delete"
onclick="deleteAppointment(${index})">
<i class="fa-solid fa-trash"></i>
</button>

</div>

</td>

</tr>
`;
 
    });

    console.log(table.innerHTML);

    updateCounters();
    document.querySelectorAll(".approve-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        approveAppointments(btn.dataset.index);
    });
});

document.querySelectorAll(".complete-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        completeAppointments(btn.dataset.index);
    });
});

document.querySelectorAll(".reject-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        rejectAppointments(btn.dataset.index);
    });
});

document.querySelectorAll(".edit-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        editAppointments(btn.dataset.index);
    });
});

document.querySelectorAll(".delete-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        deleteAppointments(btn.dataset.index);
    });
});

document.querySelectorAll(".print-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        printAppointments(btn.dataset.index);
    });
});

});
// ================= Search =================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const value = search.value.toLowerCase();

        document.querySelectorAll("#appointmentTable tr").forEach(row => {

            row.style.display = row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });

}


// ================= Delete =================

async function deleteAppointment(index) {

    if (!confirm("Delete this appointment?")) return;

    try {

        await deleteDoc(
            doc(db, "appointments", appointments[index].docId)
        );

        alert("Appointment Deleted Successfully");

    } catch (error) {

        console.error(error);

        alert("Delete Failed");

    }

}


// ================= Edit =================

async function editAppointment(index) {

    const item = appointments[index];

    const name = prompt("Patient Name", item.name);
    if (name === null) return;

    const mobile = prompt("Mobile Number", item.mobile);
    if (mobile === null) return;

    const doctor = prompt("Doctor Name", item.doctor);
    if (doctor === null) return;

    const date = prompt("Appointment Date", item.date);
    if (date === null) return;

    const time = prompt("Appointment Time", item.time);
    if (time === null) return;

    try {

        await updateDoc(
            doc(db, "appointments", item.docId),
            {
                name: name,
                mobile: mobile,
                doctor: doctor,
                date: date,
                time: time
            }
        );

        alert("Appointment Updated Successfully");

    } catch (error) {

        console.error(error);

        alert("Update Failed");

    }

}


// ================= Logout =================

const logout = document.querySelector('a[href="index.html"]');

if (logout) {

    logout.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("adminLogin");

            window.location.href = "login.html";

        }

    });

}


// ================= Dashboard Date =================

const heading = document.querySelector("header h1");

if (heading) {

    heading.innerHTML +=
        "<br><small>" +
        new Date().toLocaleDateString() +
        "</small>";

}


// ================= Dashboard Counters =================

function updateCounters() {

    document.getElementById("totalPatients").innerText = appointments.length;

    const today = new Date().toISOString().split("T")[0];

    document.getElementById("todayAppointments").innerText =
        appointments.filter(a => a.date === today).length;

    document.getElementById("pmjayPatients").innerText =
        appointments.filter(a => a.service === "PM-JAY Consultation").length;

    document.getElementById("pendingCount").innerText =
        appointments.filter(a => a.status === "Pending").length;

    document.getElementById("approvedCount").innerText =
        appointments.filter(a => a.status === "Approved").length;

    document.getElementById("completedCount").innerText =
        appointments.filter(a => a.status === "Completed").length;

}
// ================= Approve Appointment =================

async function approveAppointment(index) {

    try {

        await updateDoc(
            doc(db, "appointments", appointments[index].docId),
            {
                status: "Approved"
            }
        );

        alert("Appointment Approved");

    } catch (error) {

        console.error(error);

        alert("Approve Failed");

    }

}


// ================= Complete Appointment =================

async function completeAppointment(index) {

    try {

        await updateDoc(
            doc(db, "appointments", appointments[index].docId),
            {
                status: "Completed"
            }
        );

        alert("Appointment Completed");

    } catch (error) {

        console.error(error);

        alert("Complete Failed");

    }

}


// ================= Reject Appointment =================

async function rejectAppointment(index) {

    try {

        await updateDoc(
            doc(db, "appointments", appointments[index].docId),
            {
                status: "Rejected"
            }
        );

        alert("Appointment Rejected");

    } catch (error) {

        console.error(error);

        alert("Reject Failed");

    }

}


// ================= Print Appointment =================

function printAppointment(index) {

    const item = appointments[index];

    const printWindow = window.open("", "", "width=900,height=700");

    printWindow.document.write(`
    <html>

    <head>

    <title>Appointment Slip</title>

    <style>

    body{
        font-family:Arial;
        padding:30px;
    }

    h2{
        text-align:center;
        color:#0b5ed7;
    }

    table{
        width:100%;
        border-collapse:collapse;
    }

    td{
        border:1px solid #ccc;
        padding:10px;
    }

    </style>

    </head>

    <body>

    <h2>Kaushambi Eye Hospital</h2>

    <table>

    <tr><td><b>Patient Name</b></td><td>${item.name}</td></tr>
    <tr><td><b>Mobile</b></td><td>${item.mobile}</td></tr>
    <tr><td><b>Email</b></td><td>${item.email}</td></tr>
    <tr><td><b>Age</b></td><td>${item.age}</td></tr>
    <tr><td><b>Gender</b></td><td>${item.gender}</td></tr>
    <tr><td><b>Doctor</b></td><td>${item.doctor}</td></tr>
    <tr><td><b>Service</b></td><td>${item.service}</td></tr>
    <tr><td><b>Date</b></td><td>${item.date}</td></tr>
    <tr><td><b>Time</b></td><td>${item.time}</td></tr>
    <tr><td><b>Problem</b></td><td>${item.message}</td></tr>
    <tr><td><b>Status</b></td><td>${item.status}</td></tr>

    </table>

    <br>

    <h3 style="text-align:center;">
        Thank You for Choosing Kaushambi Eye Hospital
    </h3>

    </body>

    </html>
    `);

    printWindow.document.close();
    printWindow.print();

}

console.log("✅ Kaushambi Eye Hospital Dashboard Loaded Successfully");
window.approveAppointment = approveAppointment;
window.completeAppointment = completeAppointment;
window.rejectAppointment = rejectAppointment;
window.editAppointment = editAppointment;
window.deleteAppointment = deleteAppointment;
window.printAppointment = printAppointment;

function viewAppointment(index){

const item = appointments[index];

alert(

"Patient : " + item.name +

"\n\nMobile : " + item.mobile +

"\nEmail : " + item.email +

"\nAge : " + item.age +

"\nGender : " + item.gender +

"\nDoctor : " + item.doctor +

"\nService : " + item.service +

"\nDate : " + item.date +

"\nTime : " + item.time +

"\nProblem : " + item.message +

"\nStatus : " + item.status

);

}

window.viewAppointment = viewAppointment;