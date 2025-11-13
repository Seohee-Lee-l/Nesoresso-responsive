<?
    session_start();
?>

<meta charset='utf-8'>

<?
    include "dbconn.php";
    mysqli_query($connect, 'set names utf8');

    $email=$_POST['email'];
    $name=$_POST['name'];

    $sql="select * from nes_member where email='$email' AND name='$name' ";
    $result=mysqli_query($connect, $sql);
    $num_match=mysqli_fetch_array($result);

    if (!empty($num_match)) {
        echo "
            <script>
                window.alert('회원님의 비밀번호는 ".$num_match['pass']."입니다.');
                location.href='login_form.php';
            </script>
        ";
    } else {
        echo "
            <script>
                window.alert('입력하신 정보와 일치하는 회원이 없습니다.');
                history.go(-1);
            </script>
        ";
    }
    mysqli_close($connect);
?>