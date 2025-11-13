<div id='top_login'>
    <?php
        if (!isset($_SESSION['useremail']) || !$_SESSION['useremail']) {
    ?>
        <a href='login_form.php'>로그인</a>
    <?php
        } else {
    ?>
        <a href="logout.php" class='logout'>로그아웃</a>
    <?php
        }
    ?>
</div>