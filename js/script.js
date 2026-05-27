const form = document.getElementById("patientForm");
const container = document.getElementById("patientsContainer");

let patients = JSON.parse(localStorage.getItem("patients")) || [];



if(container){
    displayPatients();
}

if(form){
    form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("patientName").value;
    const condition = document.getElementById("patientCondition").value;
    const hospital = document.getElementById("patientHospital").value;

    const patient = {
        name,
        condition,
        hospital
    };

    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));

    displayPatients();

    form.reset();
});
}

function displayPatients() {

    container.innerHTML = "";

    patients.forEach((patient, index) => {

        container.innerHTML += `

        <div class="col-md-6">

            <div class="card">

                <div class="d-flex justify-content-between align-items-center">

                    <h5>${patient.name}</h5>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deletePatient(${index})">

                        Delete

                    </button>

                </div>

                <p>
                    <i class="ti ti-heartbeat"></i>
                    ${patient.condition}
                </p>

                <p>
                    <i class="ti ti-building-hospital"></i>
                    ${patient.hospital}
                </p>

            </div>

        </div>

        `;

    });

}
const totalPatients = document.getElementById("totalPatients");

if(totalPatients){

    totalPatients.textContent = patients.length;

}
function deletePatient(index){

    const confirmDelete =
        confirm("Are you sure you want to delete this patient?");

    if(confirmDelete){

        patients.splice(index, 1);

        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );

        displayPatients();


    }

}
function addAmbulance(){

let ambulances =
JSON.parse(localStorage.getItem("ambulances")) || [];

const ambulance = {

id: document.getElementById("ambulanceId").value,
driver: document.getElementById("driverName").value,
location: document.getElementById("ambulanceLocation").value,
status: "Available"

};

ambulances.push(ambulance);

localStorage.setItem(
"ambulances",
JSON.stringify(ambulances)
);

alert("Ambulance Added Successfully");

location.reload();

}