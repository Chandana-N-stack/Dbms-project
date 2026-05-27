// ============================================================
//  PATIENTS
// ============================================================
let patients = JSON.parse(localStorage.getItem("patients")) || [];

const form = document.getElementById("patientForm");
const container = document.getElementById("patientsContainer");
const totalPatients = document.getElementById("totalPatients");

if (container)   { displayPatients(); }
if (totalPatients) { totalPatients.textContent = patients.length; }

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name      = document.getElementById("patientName").value.trim();
        const age       = document.getElementById("patientAge").value.trim();
        const condition = document.getElementById("patientCondition").value.trim();
        if (!name || !condition) { alert("Please fill all fields."); return; }
        patients.push({ name, age, condition });
        localStorage.setItem("patients", JSON.stringify(patients));
        displayPatients();
        form.reset();
    });
}

function displayPatients() {
    if (!container) return;
    container.innerHTML = "";
    patients.forEach((p, i) => {
        container.innerHTML += `
        <div class="col-md-6">
          <div class="card p-3 mb-2">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">${p.name}</h5>
              <button class="btn btn-danger btn-sm" onclick="deletePatient(${i})">Delete</button>
            </div>
            <p class="mb-0 mt-1"><i class="ti ti-user"></i> Age: ${p.age}</p>
            <p class="mb-0"><i class="ti ti-heartbeat"></i> ${p.condition}</p>
          </div>
        </div>`;
    });
    if (totalPatients) totalPatients.textContent = patients.length;
}

function deletePatient(index) {
    if (confirm("Delete this patient?")) {
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));
        displayPatients();
    }
}

// ============================================================
//  AMBULANCES
// ============================================================
function addAmbulance() {
    let ambulances = JSON.parse(localStorage.getItem("ambulances")) || [];
    const id       = document.getElementById("ambulanceId").value.trim();
    const driver   = document.getElementById("driverName").value.trim();
    const location = document.getElementById("ambulanceLocation").value.trim();
    if (!id || !driver || !location) { alert("Please fill all fields."); return; }
    ambulances.push({ id, driver, location, status: "Available" });
    localStorage.setItem("ambulances", JSON.stringify(ambulances));
    alert("Ambulance added successfully!");
    closeAndReloadAmbulances();
}

function closeAndReloadAmbulances() {
    // close the form modal
    cm("ambFormModal");
    // clear the inputs
    document.getElementById("ambulanceId").value    = "";
    document.getElementById("driverName").value     = "";
    document.getElementById("ambulanceLocation").value = "";
    // refresh the fleet table if it is visible
    renderAmbulanceTable();
}

function renderAmbulanceTable() {
    const tbody = document.getElementById("ambulanceTableBody");
    if (!tbody) return;
    let ambulances = JSON.parse(localStorage.getItem("ambulances")) || [];
    // merge with the default list shown on first load
    const defaults = [
        { id:"AMB-101", driver:"Ravi Kumar",  location:"MG Road",        status:"Available"   },
        { id:"AMB-102", driver:"Suresh Patil",location:"Whitefield",     status:"On Duty"     },
        { id:"AMB-103", driver:"Manoj Singh", location:"Electronic City",status:"Maintenance" },
        { id:"AMB-104", driver:"Arjun Reddy", location:"Koramangala",    status:"Available"   }
    ];
    const allAmbulances = [...defaults, ...ambulances];
    tbody.innerHTML = allAmbulances.map(a => `
        <tr>
          <td>${a.id}</td>
          <td>${a.driver}</td>
          <td>${a.location}</td>
          <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
        </tr>`).join("");
}

// ============================================================
//  HOSPITALS
// ============================================================
function addHospital() {
    let hospitals  = JSON.parse(localStorage.getItem("hospitals")) || [];
    const name     = document.getElementById("hospitalName").value.trim();
    const location = document.getElementById("hospitalLocation").value.trim();
    const general  = document.getElementById("hospitalGeneral").value.trim();
    const icu      = document.getElementById("hospitalICU").value.trim();
    if (!name || !location || !general || !icu) { alert("Please fill all fields."); return; }
    hospitals.push({ name, location, general, icu, status: "Active" });
    localStorage.setItem("hospitals", JSON.stringify(hospitals));
    alert("Hospital added successfully!");
    cm("hosFormModal");
    document.getElementById("hospitalName").value     = "";
    document.getElementById("hospitalLocation").value = "";
    document.getElementById("hospitalGeneral").value  = "";
    document.getElementById("hospitalICU").value      = "";
    renderHospitalTable();
}

function renderHospitalTable() {
    const tbody = document.getElementById("hospitalTableBody");
    if (!tbody) return;
    let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const defaults = [
        { name:"City General",  location:"MG Road",   general:72, icu:14, status:"Active"     },
        { name:"Apollo North",  location:"Hebbal",    general:45, icu:9,  status:"Moderate"   },
        { name:"St. Mary's",    location:"Jayanagar", general:12, icu:2,  status:"Almost Full"},
        { name:"Sunrise Medical",location:"Whitefield",general:61,icu:18, status:"Active"     }
    ];
    const allHospitals = [...defaults, ...hospitals];
    tbody.innerHTML = allHospitals.map(h => `
        <tr>
          <td>${h.name}</td>
          <td>${h.location}</td>
          <td>${h.general}</td>
          <td>${h.icu}</td>
          <td><span class="badge ${badgeClass(h.status)}">${h.status}</span></td>
        </tr>`).join("");
}

// ============================================================
//  PATIENTS MODAL TABLE  (inside dashboard modal)
// ============================================================
function renderPatientsTable() {
    const tbody = document.getElementById("patientsTableBody");
    if (!tbody) return;
    let pts = JSON.parse(localStorage.getItem("patients")) || [];
    if (pts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#999">No patients registered yet.</td></tr>`;
        return;
    }
    tbody.innerHTML = pts.map((p, i) => `
        <tr>
          <td>${p.name}</td>
          <td>${p.age}</td>
          <td>${p.condition}</td>
          <td>
            <button onclick="deletePatientFromDashboard(${i})"
              style="border:none;background:#fce8e8;color:#a32d2d;padding:3px 10px;border-radius:6px;cursor:pointer;font-size:12px">
              Delete
            </button>
          </td>
        </tr>`).join("");
}

function deletePatientFromDashboard(index) {
    if (confirm("Delete this patient?")) {
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));
        if (totalPatients) totalPatients.textContent = patients.length;
        renderPatientsTable();
    }
}

// ============================================================
//  EMERGENCIES
// ============================================================
function addEmergency() {
    let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
    const name      = document.getElementById("emergencyPatient").value.trim();
    const type      = document.getElementById("emergencyType").value.trim();
    const severity  = document.getElementById("emergencySeverity").value;
    if (!name || !type) { alert("Please fill all fields."); return; }
    emergencies.push({ name, type, severity, hospital: "Pending", ambulance: "Pending", status: "New" });
    localStorage.setItem("emergencies", JSON.stringify(emergencies));
    alert("Emergency created!");
    cm("emgFormModal");
    document.getElementById("emergencyPatient").value = "";
    document.getElementById("emergencyType").value    = "";
    renderEmergencyTable();
    updateEmergencyBadge();
}

function renderEmergencyTable() {
    const tbody = document.getElementById("emergencyTableBody");
    if (!tbody) return;
    let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
    const defaults = [
        { name:"Ravi Kumar", type:"Cardiac Arrest",   severity:"Critical", hospital:"City General",  ambulance:"AMB-101", status:"En Route"          },
        { name:"Priya Singh",type:"ICU Required",     severity:"Critical", hospital:"Apollo North",  ambulance:"AMB-102", status:"Assigned"           },
        { name:"Mohan Das",  type:"Accident",         severity:"Urgent",   hospital:"Sunrise Medical",ambulance:"AMB-104",status:"Admitted"           },
        { name:"Ayesha Banu",type:"Respiratory Issue",severity:"Urgent",   hospital:"St. Mary's",    ambulance:"AMB-106", status:"Under Observation"  },
        { name:"Deepak Raj", type:"Stroke",           severity:"Critical", hospital:"City General",  ambulance:"AMB-109", status:"Waiting ICU"        }
    ];
    const all = [...defaults, ...emergencies];
    tbody.innerHTML = all.map(e => `
        <tr>
          <td>${e.name}</td>
          <td>${e.type}</td>
          <td><span class="badge ${severityBadge(e.severity)}">${e.severity}</span></td>
          <td>${e.hospital}</td>
          <td>${e.ambulance}</td>
          <td><span class="badge b-dark">${e.status}</span></td>
        </tr>`).join("");
}

function updateEmergencyBadge() {
    const badge = document.getElementById("emergencyBadge");
    if (!badge) return;
    let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
    badge.textContent = (7 + emergencies.length) + " Active Emergencies";
}

// ============================================================
//  REGISTER PATIENT  (from dashboard form modal)
// ============================================================
function registerPatient() {
    const name      = document.getElementById("patFormName").value.trim();
    const age       = document.getElementById("patFormAge").value.trim();
    const condition = document.getElementById("patFormCondition").value.trim();
    if (!name || !age || !condition) { alert("Please fill all fields."); return; }
    patients.push({ name, age, condition });
    localStorage.setItem("patients", JSON.stringify(patients));
    if (totalPatients) totalPatients.textContent = patients.length;
    alert("Patient registered successfully!");
    cm("patFormModal");
    document.getElementById("patFormName").value      = "";
    document.getElementById("patFormAge").value       = "";
    document.getElementById("patFormCondition").value = "";
    renderPatientsTable();
}

// ============================================================
//  HELPERS
// ============================================================
function badgeClass(status) {
    const map = {
        "Available":"b-success","Active":"b-success",
        "On Duty":"b-danger","Almost Full":"b-danger",
        "Maintenance":"b-warning","Moderate":"b-warning","Limited":"b-warning",
        "New":"b-info","Assigned":"b-info"
    };
    return map[status] || "b-dark";
}

function severityBadge(s) {
    if (s === "Critical") return "b-danger";
    if (s === "Urgent")   return "b-warning";
    return "b-success";
}

// modal open / close (used across the file)
function om(id) { document.getElementById(id).classList.add("open"); }
function cm(id) { document.getElementById(id).classList.remove("open"); }

// close on backdrop click
document.querySelectorAll(".overlay").forEach(o => {
    o.addEventListener("click", e => { if (e.target === o) o.classList.remove("open"); });
});

// render all tables on page load
renderEmergencyTable();
renderAmbulanceTable();
renderHospitalTable();
renderPatientsTable();
updateEmergencyBadge();