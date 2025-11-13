<meta charset='utf-8'>

<?
    $email=$_GET['email'];
    if (!$email) {
        echo ('이메일 주소를 입력하세요.');
    } else {
        include "dbconn.php";
        mysqli_query($connect, 'set names utf8');

        $sql="select * from nes_member where email='$email' ";

        $result=mysqli_query($connect, $sql);
        $num_record=mysqli_num_rows($result);

        if ($num_record) {
            echo '이메일 주소가 이미 존재합니다. <br>';
            echo '다른 이메일 주소를 사용해 주세요 <br>';
        } else {
            echo '사용 가능한 이메일 주소입니다.';
        }
        mysqli_close($connect);
    }