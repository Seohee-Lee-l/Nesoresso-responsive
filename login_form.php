<?
    session_start();
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nespresso_Login</title>

    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/xeicon/2/xeicon.min.css">
    <link rel="stylesheet" href="font/SUIT-woff2/SUIT.css">
    <link rel="stylesheet" href="css/animation.css">

    <script src="js/jquery-1.11.2.min.js"></script>
    <script src="js/jquery.js"></script>
</head>


<body>
    <header id="header">
        <div class="m-header">
            <a href="rwd_lsh2.html"><img src="img/nespresso-wordmark-black.png" alt="header-logo" class="logo-img"></a>
            <div class="button-wrapper">
                <button id="search-btn"><i class="xi-search"></i></button>
                <button id="menu-btn"><i class="xi-bars"></i></button>   
            </div>
        </div>
    </header>

    <div class="menu" id="nav-menu">
        <div class="close">
            <i class="xi-close"></i>
        </div>

        <ul class="main-menu">
            <li class="main-sub">
                <a href="vertuo-coffee.html" class="menu-title">
                커피
                <i class="xi-plus-thin"></i>
                </a>
                
                <ul class="sub-menu">
                    <li><a href="vertuo-coffee.html">버츄오 커피</a></li>
                    <li><a href="vertuo-coffee.html">오리지널 커피</a></li>
                    <li><a href="#">내 취향 커피 찾기</a></li>
                </ul>
            </li>

            <li class="main-sub">
                    <a href="vertuo-machine.html" class="menu-title">머신 <i class="xi-plus-thin"></i></a>

                <ul class="sub-menu">
                    <li><a href="vertuo-machine.html">버츄오 머신</a></li>
                    <li><a href="vertuo-machine.html">오리지널 머신</a></li>
                    <li><a href="#">버츄오 / 오리지널 머신 비교</a></li>
                </ul>
            </li>

            <li class="main-sub">
                <a href="#" class="menu-title">액세서리 <i class="xi-plus-thin"></i></a>

                <ul class="sub-menu">
                    <li><a href="vertuo-acc.html">버츄오 액세서리</a></li>
                    <li><a href="vertuo-acc.html">오리지널 액세서리</a></li>
                    <li><a href="acc-milk.html">우유 거품기</a></li>
                    <li><a href="vertuo-acc.html">푸드 & 바이트</a></li>
                    <li><a href="#">머신 부속품</a></li>
                </ul>
            </li>

            <li class="main-sub">
                <a href="#" class="menu-title">정품 등록 <i class="xi-plus-thin"></i></a>

                <ul class="sub-menu">
                    <li><a href="#">정품 등록 안내</a></li>
                    <li><a href="#">보증 기간 안내</a></li>
                </ul>
            </li>

            <li class="main-sub">
                <a href="proffessional_coffee.html" class="menu-title">프로페셔널<i class="xi-plus-thin"></i></a>

                <ul class="sub-menu">
                    <li><a href="proffessional_coffee.html">기업용 커피</a></li>
                    <li><a href="#">기업용 머신</a></li>
                </ul>
            </li>
        </ul>

        <div class="user">
            <a href="login.html">로그인</a>
            <a href="cart.html">장바구니</a>
        </div>
    </div>

    <div class="menu-modal"></div>
    
    <div class="search-pop-down" id="search-bar">
        <div class="search-wrapper">
            <div class="search">
                <form class="search-form">
                    <div class="search-input">
                        <input type="search" name="search" id="search_input" placeholder="Search...">
                    </div>
                </form>

                <div class="search-icon">
                    <button><i class="xi-search"></i></button>
                </div>
            </div>
        </div>

        <div class="search-close">
            <button>
                <i class="xi-close"></i>
            </button>
        </div>
    </div>

    <div class="search-modal"></div>

    <section class="login">
        <h2>Login</h2>

        <form action="login.php" class="login-form" method="post">
            <label for="email">이메일 주소</label>
            <input type="text" name="email" id="email" required placeholder="이메일 주소">

            <label for="member_pass">비밀번호</label>
            <input type="password" id="pass" name="pass" required placeholder="비밀번호 ">

            <button type="submit">로그인</button>
        </form>

        <ul>
            <li><a href="signup_form.php">회원가입</a></li>
            <li><a href="email_screen.php">이메일 주소 찾기</a></li>
            <li><a href="pw_screen.php">비밀번호 찾기</a></li>
        </ul>
    </section>

    <footer id="footer">
        <div class="footer-container">
            <div class="footer-category category1">
                <div class="footer-click">
                    <h3>네스프레소</h3>
                    <i class="xi-angle-down"></i>
                </div>

                <div class="footer-txt">
                    <a href="#">지속 가능성</a>
                    <a href="#">채용</a>
                    <a href="#">네스프레소 레시피</a>
                    <a href="#">회사 소개</a>
                </div>
            </div>

            <div class="footer-category category2">
                <div class="footer-click">
                    <h3>고객 서비스</h3>
                    <i class="xi-angle-down"></i>
                </div>

                <div class="footer-txt">
                    <a href="#">머신 사용</a>
                    <a href="#">배송 조회</a>
                    <a href="#">주문 조회 / 취소</a>
                    <a href="#">클럽 멤버 가입</a>
                </div>
            </div>

            <div class="footer-category category3">
                <div class="footer-click">
                    <h3>문의</h3>
                    <i class="xi-angle-down"></i>
                </div>

                <div class="footer-txt">
                    <a href="https://bizmessage.kakao.com/chat/open/@nespresso_club?extra=NPmobile&bot=true&event=start" target="_blank">카카오톡 상담</a>
                    <a href="tel:0807341111" target="_blank">국내 전화</a>
                    <a href="tel:+82232771398" target="_blank">국제 전화</a>
                    <a href="https://www.nespresso.com/kr/ko/contactus" target="_blank">이메일 문의</a>
                </div>
            </div>

            <div class="footer-category category4">
                <div class="footer-click">
                    <h3>SNS</h3>
                    <i class="xi-angle-down"></i>
                </div>

                <div class="footer-txt">
                    <a href="https://www.instagram.com/nespresso.kr" target="_blank">인스타그램</a>
                    <a href="https://www.youtube.com/user/nespresso" target="_blank">유튜브</a>
                    <a href="https://www.twitter.com/nespresso" target="_blank">X</a>
                    <a href="https://www.facebook.com/Nespresso" target="_blank">페이스북</a>
                    <a href="https://www.pinterest.com/nespresso/" target="_blank">핀터레스트</a>
                </div>
            </div>

            <div class="footer-category category4">
                <div class="footer-click">
                    <h3>약관·정책</h3>
                    <i class="xi-angle-down"></i>
                </div>

                <div class="footer-txt">
                    <a href="#">판매이용약관</a>
                    <a href="#" class="highlight">개인정보 처리방침</a>
                    <a href="#">쿠키</a>
                    <a href="#">사이트맵</a>
                    <a href="#">웹 접근성</a>
                </div>
            </div>
        </div>

        <div class="footer-ex">
            <div class="lan-box">
                <form class="language">
                    <select name="language" id="language">
                        <option value="한국어">한국어</option>
                        <option value="english">English</option>
                    </select>
                </form>
            </div>

            <div class="payment">
                <img src="img/payment.png" alt="payment img">
            </div>
        </div>

        <div class="footer-bottom">
            <div class="txt">
                <p>상호 : 네슬레코리아 유한책임회사</p>
                <p>대표자 : 토마스제프리카소</p>
            </div>

            <div class="txt">
                <p>사업자등록번호 : 110-86-10100</p>
                <a href="#">통신판매업신고 : 2014-서울서대문-0247</a>
            </div>

            <div class="txt">
                <a href="#">채무지급보증안내</a>
                <a href="#">정보보호관리체계</a>
                <a href="#">대표번호 : 080-734-1111</a>
            </div>

            <div class="txt">
                <a href="#">이메일 : club.korea@nespresso.com</a>
            </div>

            <div class="txt">
                <p><address>주소 : 서울시 서대문구 충정로70 웨스트게이트타워 10, 12, 16층</address></p>
            </div>
        </div>
    </footer>
</body>


</html>