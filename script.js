// Back To Top Button

let topButton = document.getElementById("topBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
document.getElementById("appointmentForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.querySelector('input[name="patient_name"]').value;
    let mobile = document.querySelector('input[name="mobile"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let date = document.querySelector('input[name="appointment_date"]').value;
    let doctor = document.querySelector('select[name="doctor"]').value;
    let message = document.querySelector('textarea[name="message"]').value;

    let text =
`New Appointment Request

👤 Name: ${name}

📱 Mobile: ${mobile}

📧 Email: ${email}

📅 Date: ${date}

👨‍⚕️ Doctor: ${doctor}

📝 Message: ${message}`;

    let whatsapp = "https://wa.me/919120777201?text=" + encodeURIComponent(text);

    window.open(whatsapp, "_blank");

});