function hitungBiaya() {
    let jarak = parseFloat(document.getElementById("jarak").value);
    let kecepatan = parseFloat(document.getElementById("kecepatan").value);
    let harga = parseFloat(document.getElementById("harga").value);

    if (isNaN(jarak) || isNaN(kecepatan) || isNaN(harga) || jarak <= 0 || kecepatan <= 0 || harga <= 0) {
        alert("Harap masukkan nilai yang valid!");
        return;
    }
    
    // Fungsi konsumsi bahan bakar: f(v) = 1/v + 5
    let konsumsiBbm = Math.log(Math.abs(kecepatan)) + 5 * kecepatan;
    let totalBbm = konsumsiBbm * jarak / 100;
    let totalBiaya = totalBbm * harga;
    
    document.getElementById("hasil").innerHTML = `Total bahan bakar: ${totalBbm.toFixed(2)} liter<br>Total biaya: Rp${totalBiaya.toFixed(2)}`;
    buatGrafik(kecepatan, konsumsiBbm);
}

function buatGrafik(kecepatan, konsumsiBbm) {
    let ctx = document.getElementById("grafik").getContext("2d");
    
    let dataKecepatan = [];
    let dataKonsumsi = [];
    for (let v = 40; v <= 120; v += 10) {
        let konsumsi = Math.log(Math.abs(v)) + 5 * v;
        dataKecepatan.push(v);
        dataKonsumsi.push(konsumsi);
    }
    
    new Chart(ctx, {
        type: "line",
        data: {
            labels: dataKecepatan,
            datasets: [{
                label: "Konsumsi Bahan Bakar (liter per 100 km)",
                data: dataKonsumsi,
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Kecepatan (km/jam)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Konsumsi Bahan Bakar (liter per 100 km)"
                    }
                }
            }
        }
    });
}
