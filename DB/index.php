<?php
// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "23_10_sequenze";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Esegui la query per ottenere i dati
$sql = "SELECT img1, img2, img3 FROM sequenze";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Imposta l'intestazione della risposta come JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo json_encode(array('message' => 'Nessun dato trovato.'));
}

// Chiudi la connessione al database
$conn->close();
?>
