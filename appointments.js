import { db } from "./firebase.js";
import {collection, addDoc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

alert("JS Loaded");

document.getElementById("appointmentForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const appointment = {
        name: document.querySelector('input[name="patient_name"]').value,
        mobile: document.querySelector('input[name="mobile"]').value,
        email: document.querySelector('input[name="email"]').value,
        age: document.querySelector('input[name="age"]').value,
        gender: document.querySelector('select[name="gender"]').value,
        doctor: document.querySelector('select[name="doctor"]').value,
        service: document.querySelector('select[name="service"]').value,
        date: document.querySelector('input[name="date"]').value,
        time: document.querySelector('input[name="time"]').value,
        message: document.querySelector('textarea[name="message"]').value,
        status: "Pending"
    };

    try {

        await addDoc(collection(db, "appointments"), appointment);

        alert("Appointment Booked Successfully!");

        document.getElementById("appointmentForm").reset();

    } catch (error) {

        console.error(error);

        alert("Error Saving Appointment");

    }

});