<!DOCTYPE html>
<html>
<head>
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script> -->
</head>
<body>
<?php
    $q = $_GET['q'];
    $con = mysqli_connect('localhost', 'root', 'root', 'contact_manager');
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }
    //$sql="SELECT * FROM Contact";
    $sql = "SELECT * FROM Contact WHERE fname = '$q' OR lname = '$q'";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td scope='row'>" . $row['contact_id'] . "</td>";
        echo "<td scope='row'>" . $row['fname'] . "</td>";
        echo "<td scope='row'>" . $row['mname'] . "</td>";
        echo "<td scope='row'>" . $row['lname'] . "</td>";
        echo "<td scope='row'><button type='button' class='btn btn-primary' id='editbutton'>Edit</button></td>";
        echo "<td scope='row'><button type='button' class='btn btn-danger' id='deletebutton'>Delete</button></td>";
        echo "</tr>";
    }
    mysqli_close($con);
?>
</body>
</html>