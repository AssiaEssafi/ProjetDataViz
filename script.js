window.onload = function () {
    let employees = [];
    let taches = [];

    // La fonction générant le Dashboard
    function genererDashboard() {
        if (employees.length === 0 || taches.length === 0) {
            alert("Charge les deux fichiers CSV d'abord !");
            return;
        }

        if (typeof Plotly === 'undefined') {
            alert("Plotly n'est pas défini. Assure-toi que le fichier Plotly est chargé correctement.");
            return;
        }

        // Exemple 1 : Bar Chart - Nombre de tâches par employé
        const tachesParEmploye = {};
        taches.forEach(t => {
            const empId = t.ID_employe;
            if (!tachesParEmploye[empId]) tachesParEmploye[empId] = 0;
            tachesParEmploye[empId]++;
        });

        const noms = Object.keys(tachesParEmploye).map(id => {
            const emp = employees.find(e => e.ID === id);
            return emp ? emp.Nom : `Employé ${id}`;
        });

        const traceBar = {
            x: noms,
            y: Object.values(tachesParEmploye),
            type: 'bar',
            marker: { color: 'blue' }
        };

        Plotly.newPlot('barChart', [traceBar], {
            title: 'Nombre de tâches par employé',
            xaxis: { title: 'Employés' },
            yaxis: { title: 'Nombre de tâches' }
        });

        // Exemple 2 : Pie Chart - Répartition des statuts
        const statuts = {};
        taches.forEach(t => {
            if (!statuts[t.État]) statuts[t.État] = 0;
            statuts[t.État]++;
        });

        const tracePie = {
            labels: Object.keys(statuts),
            values: Object.values(statuts),
            type: 'pie'
        };

        Plotly.newPlot('pieChart', [tracePie], {
            title: 'Répartition des statuts de tâches'
        });
    }

    // Gérer l'importation des fichiers CSV
    document.getElementById('employeeCSV').addEventListener('change', function (e) {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                employees = results.data;
                alert("employee.csv chargé !");
            }
        });
    });

    document.getElementById('tachesCSV').addEventListener('change', function (e) {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                taches = results.data;
                alert("taches.csv chargé !");
            }
        });
    });

    // Ajouter un écouteur d'événements pour le bouton
    document.getElementById('generateBtn').addEventListener('click', genererDashboard);
};
