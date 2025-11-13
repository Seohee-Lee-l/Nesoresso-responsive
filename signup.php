<?
    session_start();
?>

<meta charset='utf-8'>

<?
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $name=$_POST['name'];
    $hp=$_POST['hp'];
    $member_addr1=$_POST['member_addr1'];
    $member_addr2=$_POST['member_addr2'];
    $member_zipcode=$_POST['member_zipcode'];
    $member_city=$_POST['member_city'];

    // 입력 데이터 검증
    if (!$email) {
        echo("
            <script>
                window.alert('이메일을 입력하세요.');
                history.go(-1);
            </script>
        ");
        exit;
    }

    if (!$pass) {
        echo ("
            <script>
                window.alert('비밀번호를 입력하세요.');
                history.go(-1);
        ");
        exit;
    }

    if (!$name) {
        echo("
            <script>
                window.alert('이름을 입력하세요.');
                history.go(-1);
            </script>
        ");
        exit;
    }

    if (!$hp) {
        echo("
            <script>
                window.alert('전화번호를 입력하세요.');
                history.go(-1);
        ");
        exit;
    }

    if (!$member_addr1 || !$member_addr2 || !$member_zipcode || !$member_city) {
        echo("
            <script>
                window.alert('주소를 모두 입력하세요.');
                history.go(-1);
            </script>
        ");
        exit;
    }

    include "dbconn.php";
    mysqli_query($connect, 'set names utf8');

    // 이메일 중복 검사
    $sql="select * from nes_member where email='$email' ";
    $result=mysqli_query($connect, $sql);
    $exist_email=mysqli_num_rows($result);

    if ($exist_email) {
        echo("
            <script>
                window.alert('이미 존재하는 이메일입니다.');
                history.go(-1);
            </script>
        ");
        exit;
    } else {
        // 회원 정보 삽입
        $sql="insert into nes_member (email, pass, name, hp, member_addr1, member_addr2, member_zipcode, member_city) ";
        $sql.="values ('$email', '$pass', '$name', '$hp', '$member_addr1', '$member_addr2', '$member_zipcode', '$member_city') ";

        if (mysqli_query($connect, $sql)) {
            echo ("
                <script>
                    window.alert('회원가입이 완료되었습니다.');
                    location.href='rwd_lsh2.html';
                </script>
            ");
        } else {
            echo("
                <script>
                    window.alert('회원가입에 실패했습니다. 다시 시도해주세요.');
                    history.go(-1);
                </script>
            ");
        }
    }

    mysqli_close($connect);
?>