<?php
include 'config.php';

$pdo = getDB();
$result = $pdo->exec('DELETE FROM events');

jsonResponse([
    'success' => true,
    'message' => 'All events deleted from database',
    'rows_deleted' => $result
]);
?>
