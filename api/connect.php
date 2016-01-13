<?php $dbhost ="localhost";
$dbuser ="foodLove";
$dbpass ="jqAwkJyL4SeL";
$dberror1 ="Couldn't connect to database";
$dbname ="recipe";

$conn = new mysqli($dbhost,$dbuser,$dbpass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>