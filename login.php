<?php
    session_start();
?>

<?php
    $email=$_POST['email'];
    if (!$email) {
        echo("
            <script>
                window.alert('이메일을 입력해주세요.');
                history.go(-1);
            </script>
        ");
        exit;
    }

    $pass=$_POST['pass'];
    if (!$pass) {
        echo("
            <script>
                window.alert('비밀번호를 입력해주세요.');
                history.go(-1);
            </script>
        ");
        exit;
    }

    include "dbconn.php";
    mysqli_query($connect, 'set names utf8');

    $sql="select * from nes_member where email='$email' ";
    $result=mysqli_query($connect, $sql);
    $num_match=mysqli_num_rows($result);

    if (!$num_match) {
        echo ("
            <script>
                window.alert('입력하신 이메일 주소가 존재하지 않습니다.');
                history.go(-1);
            </script>
        ");
    } else {        $row=mysqli_fetch_array($result);
        $db_pass=$row['pass'];

        if ($pass!=$db_pass) {
            echo("
                <script>
                    window.alert('비밀번호가 일치하지 않습니다.');
                    history.go(-1);
                </script>
            ");
            exit;
        } else {
            $useremail=$row['email'];
            $username=$row['name'];

            $_SESSION['useremail']=$useremail;
            $_SESSION['username']=$username;

            echo ("
                <script>
                    location.href='rwd_lsh2.html';
                </script>
            ");
        }
    }
?>