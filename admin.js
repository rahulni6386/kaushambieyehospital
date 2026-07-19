// ======================================
// KAUSHAMBI EYE HOSPITAL
// ADMIN.JS
// ======================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ======================================
// Document Reference
// ======================================

const adminRef = doc(db,"settings","admin");

// ======================================
// Load Admin Data
// ======================================

async function loadAdmin(){

    try{

        const snap = await getDoc(adminRef);

        if(snap.exists()){

            const data = snap.data();

            document.getElementById("adminName").value =
                data.adminName || "";

            document.getElementById("adminEmail").value =
                data.adminEmail || "";

            document.getElementById("adminMobile").value =
                data.adminMobile || "";

            document.getElementById("hospitalName").value =
                data.hospitalName || "";

            document.getElementById("hospitalPhone").value =
                data.hospitalPhone || "";

            document.getElementById("hospitalEmail").value =
                data.hospitalEmail || "";

            document.getElementById("hospitalWebsite").value =
                data.hospitalWebsite || "";

            document.getElementById("hospitalAddress").value =
                data.hospitalAddress || "";

            document.getElementById("adminNameText").innerText =
                data.adminName || "Administrator";

            if(data.adminPhoto){

                document.getElementById("adminPhotoPreview").src =
                    data.adminPhoto;

            }

            if(data.hospitalLogo){

                document.getElementById("hospitalLogoPreview").src =
                    data.hospitalLogo;

            }

        }

    }
    catch(error){

        console.error(error);

    }

}

// ======================================
// Run
// ======================================

loadAdmin();

// ======================================
// Save Admin Profile
// ======================================

const adminForm = document.getElementById("adminForm");

adminForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        adminName:
        document.getElementById("adminName").value,

        adminEmail:
        document.getElementById("adminEmail").value,

        adminMobile:
        document.getElementById("adminMobile").value,

        adminPassword:
        document.getElementById("adminPassword").value,

        hospitalName:
        document.getElementById("hospitalName").value,

        hospitalPhone:
        document.getElementById("hospitalPhone").value,

        hospitalEmail:
        document.getElementById("hospitalEmail").value,

        hospitalWebsite:
        document.getElementById("hospitalWebsite").value,

        hospitalAddress:
        document.getElementById("hospitalAddress").value,

        adminPhoto:
        document.getElementById("adminPhotoPreview").src,

        hospitalLogo:
        document.getElementById("hospitalLogoPreview").src

    };

    try{

        await setDoc(
            adminRef,
            data,
            {
                merge:true
            }
        );

        document.getElementById("adminNameText").innerText =
        data.adminName;

        alert("Admin Profile Saved Successfully");

    }

    catch(error){

        console.error(error);

        alert("Failed to Save Profile");

    }

});

// ======================================
// Image Preview
// ======================================

const adminPhoto = document.getElementById("adminPhoto");
const hospitalLogo = document.getElementById("hospitalLogo");

adminPhoto.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(file){

        document.getElementById("adminPhotoPreview").src =
        URL.createObjectURL(file);

    }

});

hospitalLogo.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(file){

        document.getElementById("hospitalLogoPreview").src =
        URL.createObjectURL(file);

    }

});


// ======================================
// Auto Fill Today's Date
// ======================================

const todayDate = document.getElementById("todayDate");

if(todayDate){

    todayDate.innerHTML =
    new Date().toLocaleDateString("en-GB",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    });

}


// ======================================
// Success Message
// ======================================

console.log("✅ Admin Profile Module Loaded Successfully");


// ======================================
// Reload Name after Save
// ======================================

document.getElementById("adminName").addEventListener("keyup",function(){

    document.getElementById("adminNameText").innerText =
    this.value || "Administrator";

});