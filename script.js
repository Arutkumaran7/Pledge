document.addEventListener("DOMContentLoaded", () => {

    // --- MOCK DATA (Simulates Google Sheets or JSON backend) ---
    // This array holds all pledge data.
    let pledgeData = [
        {
            id: 1,
            name: "Arun B.",
            date: "2025-10-28",
            state: "Tamil Nadu",
            profile: "Student",
            commitments: 3 
        },
        {
            id: 2,
            name: "Sam C.S.",
            date: "2025-10-29",
            state: "Kerala",
            profile: "Working Professional",
            commitments: 5
        }
    ];


    const kpiAchieved = document.getElementById("kpi-achieved");
    const kpiStudents = document.getElementById("kpi-students");
    const kpiProfessionals = document.getElementById("kpi-professionals");
    const pledgeTableBody = document.getElementById("pledge-table-body");
    const form = document.getElementById("form");
    const modal = document.getElementById("certificate-modal");
    const certName = document.getElementById("certificate-name");
    const certRating = document.getElementById("certificate-rating");
    const closeModalBtn = document.getElementById("close-modal");
    function updateKPIs() {
        const achievedCount = pledgeData.length;
        kpiAchieved.textContent = achievedCount;
        const studentCount = pledgeData.filter(p => p.profile === "Student").length;
        kpiStudents.textContent = studentCount;
        const professionalCount = pledgeData.filter(p => p.profile === "Working Professional").length;
        kpiProfessionals.textContent = professionalCount;
    }
    function populatePledgeWall() {
        pledgeTableBody.innerHTML = "";
        pledgeData.slice().reverse().forEach(pledge => {
            const row = document.createElement("tr");
            let stars = '⭐'; 
            if (pledge.commitments > 3) stars = '⭐⭐'; 
            if (pledge.commitments > 6) stars = '⭐⭐⭐';
            row.innerHTML = `
                <td>${pledge.id}</td>
                <td>${pledge.name}</td>
                <td>${pledge.date}</td>
                <td>${pledge.state}</td>
                <td>${pledge.profile}</td>
                <td>${stars}</td>
            `;
            pledgeTableBody.appendChild(row);
        });
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const state = document.getElementById("state").value;
        const profile = document.getElementById("profile").value;
        const commitmentCount = document.querySelectorAll('input[name="commitment"]:checked').length;
        const newPledge = {
            id: pledgeData.length + 1, 
            name: name, 
            date: new Date().toISOString().split('T')[0], 
            state: state,
            profile: profile,
            commitments: commitmentCount
        };
        pledgeData.push(newPledge);
        updateKPIs();
        populatePledgeWall();
        showCertificate(name, commitmentCount);
        form.reset();
    }

    function showCertificate(name, commitmentCount) {
        certName.textContent = name;
        let hearts = '';
        if (commitmentCount <= 3) hearts = '❤️';
        else if (commitmentCount <= 6) hearts = '❤️❤️';
        else hearts = '❤️❤️❤️';
        
        certRating.innerHTML = hearts;
        modal.style.display = "flex";
    }
    function closeModal() {
        modal.style.display = "none";
    }


    form.addEventListener("submit", handleFormSubmit);
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    updateKPIs();
    populatePledgeWall();

});