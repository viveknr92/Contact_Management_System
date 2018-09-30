<?php
    $link = mysqli_connect("localhost", "root", "root", "contact_manager");

    /* check connection */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    /* check if server is alive */
    if (mysqli_ping($link)) {
        printf ("Our connection is ok!\n");
    } else {
        printf ("Error: %s\n", mysqli_error($link));
    }

    $result = mysqli_query($link,"SELECT * FROM Contact");

    while($row = mysqli_fetch_array($result))
    { 
        echo $row['fname'] . " " . $row['lname'];
        echo "<br>";
    }

    /* close connection */
    mysqli_close($link);
?>