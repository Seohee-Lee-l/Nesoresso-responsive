<?php
    session_start();
?>

<meta charset='utf-8'>

<?php
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $name=$_POST['name'];
    $hp=$_POST['hp'];

    $ip=$REMOTE_ADDR;

    include "dbconn.php";
    mysqli_query($connect, 'set names utf8');

    $sql="select * from nes_member where email='$email' ";
    $result=mysqli_query($connect, $sql);
    $exist_email=mysqli_num_rows($result);

    if ($exist_email) {
        echo ("
            <script>
                window.alert('해당 이메일 주소가 존재합니다.');
                history.go(-1);
            </script>
        ");
        exit;
    } else {
        $sql="insert into nes_member(email, pass, name, hp) ";
        $sql.="values('$email', '$pass', '$name', '$hp')";

        mysqli_query($connect, $sql);
    }

    mysqli_close($connecT);

    echo "
        <script>
            location.href='rwdpf_lsh2.html';
        </script>
    ";
?>