<?php
// Query per estrarre i dati per Wind Consumer

$sqlWind = "SELECT
SUM(CASE WHEN esito_op=1 THEN 1 ELSE 0 END) AS esito_ok_contratto,
SUM(CASE WHEN esito_op=2 THEN 1 ELSE 0 END) AS esito_non_risponde, 
SUM(CASE WHEN esito_op=3 THEN 1 ELSE 0 END) AS esito_non_interessato, 
SUM(CASE WHEN esito_op=4 THEN 1 ELSE 0 END) AS non_contattare_piu, 
SUM(CASE WHEN esito_op=5 THEN 1 ELSE 0 END) AS richiamo_personale,  
SUM(CASE WHEN esito_op=6 THEN 1 ELSE 0 END) AS richiamo_pubblico, 
SUM(CASE WHEN esito_op=7 THEN 1 ELSE 0 END) AS segreteria, 
SUM(CASE WHEN esito_op=8 THEN 1 ELSE 0 END) AS numero_inesistente, 
SUM(CASE WHEN esito_op=9 THEN 1 ELSE 0 END) AS gia_cliente_tim, 
SUM(CASE WHEN esito_op=10 THEN 1 ELSE 0 END) AS gia_cliente_wind, 
SUM(CASE WHEN esito_op=11 THEN 1 ELSE 0 END) AS fatta_trattativa
FROM leads WHERE brand LIKE 'WIND CONSUMER'";
$queryWind = mysqli_query($db_connect, $sqlWind) or die(mysqli_error($db_connect));

// Query per estrarre i dati per Wind Business
$sqlWindBs = "SELECT
    SUM(CASE WHEN esito_op=1 THEN 1 ELSE 0 END) AS esito_ok_contratto,
    SUM(CASE WHEN esito_op=2 THEN 1 ELSE 0 END) AS esito_non_risponde, 
    SUM(CASE WHEN esito_op=3 THEN 1 ELSE 0 END) AS esito_non_interessato, 
    SUM(CASE WHEN esito_op=4 THEN 1 ELSE 0 END) AS non_contattare_piu, 
    SUM(CASE WHEN esito_op=5 THEN 1 ELSE 0 END) AS richiamo_personale,  
    SUM(CASE WHEN esito_op=6 THEN 1 ELSE 0 END) AS richiamo_pubblico, 
    SUM(CASE WHEN esito_op=7 THEN 1 ELSE 0 END) AS segreteria, 
    SUM(CASE WHEN esito_op=8 THEN 1 ELSE 0 END) AS numero_inesistente, 
    SUM(CASE WHEN esito_op=9 THEN 1 ELSE 0 END) AS gia_cliente_tim, 
    SUM(CASE WHEN esito_op=10 THEN 1 ELSE 0 END) AS gia_cliente_wind, 
    SUM(CASE WHEN esito_op=11 THEN 1 ELSE 0 END) AS fatta_trattativa
FROM leads WHERE brand LIKE 'WIND BUSINESS'";
$queryWindBs = mysqli_query($db_connect, $sqlWindBs) or die(mysqli_error($db_connect));

// Query per estrarre i dati per TIM Consumer
$sqlTim = "SELECT
    SUM(CASE WHEN esito_op=1 THEN 1 ELSE 0 END) AS esito_ok_contratto,
    SUM(CASE WHEN esito_op=2 THEN 1 ELSE 0 END) AS esito_non_risponde, 
    SUM(CASE WHEN esito_op=3 THEN 1 ELSE 0 END) AS esito_non_interessato, 
    SUM(CASE WHEN esito_op=4 THEN 1 ELSE 0 END) AS non_contattare_piu, 
    SUM(CASE WHEN esito_op=5 THEN 1 ELSE 0 END) AS richiamo_personale,  
    SUM(CASE WHEN esito_op=6 THEN 1 ELSE 0 END) AS richiamo_pubblico, 
    SUM(CASE WHEN esito_op=7 THEN 1 ELSE 0 END) AS segreteria, 
    SUM(CASE WHEN esito_op=8 THEN 1 ELSE 0 END) AS numero_inesistente, 
    SUM(CASE WHEN esito_op=9 THEN 1 ELSE 0 END) AS gia_cliente_tim, 
    SUM(CASE WHEN esito_op=10 THEN 1 ELSE 0 END) AS gia_cliente_wind, 
    SUM(CASE WHEN esito_op=11 THEN 1 ELSE 0 END) AS fatta_trattativa
FROM leads WHERE brand LIKE 'TIM CONSUMER'";
$queryTim = mysqli_query($db_connect, $sqlTim) or die(mysqli_error($db_connect));

// Query per estrarre i dati per TIM Business
$sqlTimBs = "SELECT
    SUM(CASE WHEN esito_op=1 THEN 1 ELSE 0 END) AS esito_ok_contratto,
    SUM(CASE WHEN esito_op=2 THEN 1 ELSE 0 END) AS esito_non_risponde, 
    SUM(CASE WHEN esito_op=3 THEN 1 ELSE 0 END) AS esito_non_interessato, 
    SUM(CASE WHEN esito_op=4 THEN 1 ELSE 0 END) AS non_contattare_piu, 
    SUM(CASE WHEN esito_op=5 THEN 1 ELSE 0 END) AS richiamo_personale,  
    SUM(CASE WHEN esito_op=6 THEN 1 ELSE 0 END) AS richiamo_pubblico, 
    SUM(CASE WHEN esito_op=7 THEN 1 ELSE 0 END) AS segreteria, 
    SUM(CASE WHEN esito_op=8 THEN 1 ELSE 0 END) AS numero_inesistente, 
    SUM(CASE WHEN esito_op=9 THEN 1 ELSE 0 END) AS gia_cliente_tim, 
    SUM(CASE WHEN esito_op=10 THEN 1 ELSE 0 END) AS gia_cliente_wind, 
    SUM(CASE WHEN esito_op=11 THEN 1 ELSE 0 END) AS fatta_trattativa
FROM leads WHERE brand LIKE 'TIM BUSINESS'";
$queryTimBs = mysqli_query($db_connect, $sqlTimBs) or die(mysqli_error($db_connect));

// Dati e etichette per il primo grafico (Wind Consumer)
$labels = ['Esito OK Contratto', 'Esito Non Risponde', 'Esito Non Interessato', 'Non Contattare Più', 'Richiamo Personale', 'Richiamo Pubblico', 'Segreteria', 'Numero Inesistente', 'Già Cliente TIM', 'Già Cliente Wind', 'Fatta Trattativa'];
$occurrencesWindConsumer = [];
while ($row = mysqli_fetch_assoc($queryWind)) {
    foreach ($row as $key => $value) {
        $occurrencesWindConsumer[$key] = $value;
    }
}

// Dati e etichette per il secondo grafico (Wind Business)
$occurrencesWindBusiness = [];
while ($row = mysqli_fetch_assoc($queryWindBs)) {
    foreach ($row as $key => $value) {
        $occurrencesWindBusiness[$key] = $value;
    }
}

// Dati e etichette per il terzo grafico (TIM Consumer)
$occurrencesTimConsumer = [];
while ($row = mysqli_fetch_assoc($queryTim)) {
    foreach ($row as $key => $value) {
        $occurrencesTimConsumer[$key] = $value;
    }
}

// Dati e etichette per il quarto grafico (TIM Business)
$occurrencesTimBusiness = [];
while ($row = mysqli_fetch_assoc($queryTimBs)) {
    foreach ($row as $key => $value) {
        $occurrencesTimBusiness[$key] = $value;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
         .chart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 400px;
            height: 400px;
            margin: 20px;
            
        }

    </style>
</head>

<body>
    <table>
        <tr>
            <td>
                <div class="chart-container">
                    <canvas id="windConsumerChart"></canvas>
                    <p><br>WIND CONSUMER</p>
                </div>
            </td>
            <td>
                <div class="chart-container">
                    <canvas id="windBusinessChart"></canvas>
                    <p><br>WIND BUSINESS</p>
                </div>
            </td>
            <td>
                <div class="chart-container">
                    <canvas id="timConsumerChart"></canvas>
                    <p><br>TIM CONSUMER</p>
                </div>
            </td>
            <td>
                <div class="chart-container">
                    <canvas id="timBusinessChart"></canvas>
                    <p><br>TIM BUSINESS</p>
                </div>
            </td>
        </tr>
    </table>

    <script>
        // Wind Consumer Chart
        var ctxWindConsumer = document.getElementById('windConsumerChart').getContext('2d');
        var windConsumerChart = new Chart(ctxWindConsumer, {
            type: 'pie',
            data: {
                labels: <?php echo json_encode($labels); ?>,
                datasets: [{
                    label: 'Wind Consumer',
                    data: <?php echo json_encode(array_values($occurrencesWindConsumer)); ?>,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Wind Business Chart
        var ctxWindBusiness = document.getElementById('windBusinessChart').getContext('2d');
        var windBusinessChart = new Chart(ctxWindBusiness, {
            type: 'pie',
            data: {
                labels: <?php echo json_encode($labels); ?>,
                datasets: [{
                    label: 'Wind Business',
                    data: <?php echo json_encode(array_values($occurrencesWindBusiness)); ?>,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // TIM Consumer Chart
        var ctxTimConsumer = document.getElementById('timConsumerChart').getContext('2d');
        var timConsumerChart = new Chart(ctxTimConsumer, {
            type: 'pie',
            data: {
                labels: <?php echo json_encode($labels); ?>,
                datasets: [{
                    label: 'TIM Consumer',
                    data: <?php echo json_encode(array_values($occurrencesTimConsumer)); ?>,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // TIM Business Chart
        var ctxTimBusiness = document.getElementById('timBusinessChart').getContext('2d');
        var timBusinessChart = new Chart(ctxTimBusiness, {
            type: 'pie',
            data: {
                labels: <?php echo json_encode($labels); ?>,
                datasets: [{
                    label: 'TIM Business',
                    data: <?php echo json_encode(array_values($occurrencesTimBusiness)); ?>,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    </script>
</body>

</html>
