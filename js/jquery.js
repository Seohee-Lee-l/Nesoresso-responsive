$(function() {
    // 디바운싱 함수 정의
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }    
    
    // 제품 페이지 옵션 패딩 조정 함수
    function updateCoffeeListPadding() {
        const windowWidth = $(window).width();
        
        if (windowWidth >= 1200) {
            return;
        }
        
        const hasVisibleSub = $('.option .sub:visible').length > 0;
        
        if (hasVisibleSub) {
            if (windowWidth <= 800) {
                $('.vertuo-coffee-list').css('padding-top', '35%');
            } else if (windowWidth <= 1199) {
                $('.vertuo-coffee-list').css('padding-top', '23%');
            }
        } else {
            if (windowWidth <= 800) {
                $('.vertuo-coffee-list').css('padding-top', '27%');
            } else if (windowWidth <= 1199) {
                $('.vertuo-coffee-list').css('padding-top', '15%');
            }
        }
    }

    // 통합된 resize 핸들러
    function handleWindowResize() {
        // 메인 탭 더보기 버튼 관련
        $(".tab-content").each(function() {
            const $tab = $(this);
            const $items = $tab.find("ul li");
            const $moreBtn = $tab.find(".more-btn");
            const totalItems = $items.length;

            function getShowCount() {
                const winWidth = $(window).width();
                if (winWidth <= 800) {
                    return 2;
                } else if (winWidth <= 1199) {
                    return 3;
                } else {
                    return totalItems;
                }
            }

            function showItems(count) {
                $items.hide();
                $items.slice(0, count).show();

                if (count >= totalItems) {
                    $moreBtn.hide();
                } else {
                    $moreBtn.show();
                }
            }

            const showCount = getShowCount();
            showItems(showCount);
        });

        // 제품 페이지 옵션 패딩 조정
        updateCoffeeListPadding();        
        
        
        // 슬라이드 위치 재조정
        if (typeof window.slideTo === 'function' && typeof window.currentSlideIndex !== 'undefined') {
            window.slideTo(window.currentSlideIndex);
        }

        // 메인 배너 슬라이드 위치 재조정
        if (typeof window.slideto === 'function' && typeof window.currentBannerIndex !== 'undefined') {
            window.slideto(window.currentBannerIndex);
        }

        // 메인 이미지 업데이트
        updateImages();
    }

    // 디바운싱이 적용된 resize 이벤트 핸들러 등록 (250ms 지연)
    const debouncedResize = debounce(handleWindowResize, 250);
    $(window).on("resize", debouncedResize);

    // 헤더 스크롤 이벤트
    $(window).on('scroll', function() {
        const scrollTop=$(this).scrollTop();

        if (scrollTop>50) {
            $('#header').addClass('on');
        } else {
            $('#header').removeClass('on');
        }
    });

    // 메인 탭
    $(".tab-content:not("+$(".quick-menu ul li a.selected").attr("href")+")").hide();

    $(".quick-menu ul li a").click(function() {
        $(".quick-menu ul li a").removeClass("selected");
        $(this).addClass("selected");

        $(".tab-content").hide();
        $($(this).attr("href")).show();

        return false;
    });

    // 메인 탭 장바구니 버튼 이동
    $('.quick-menu ul li a.tabCart').click(function() {
        window.location.href='cart.html';
    });


   // 메인 더보기 버튼
   $(".tab-content").each(function() {
        const $tab=$(this);

        $tab.find(".vertuo, .original").each(function() { 
            const $list=$(this);
            const $items=$list.find("article");
            const $moreBtn=$list.nextAll(".more").first().find("button");
            const totalItems=$items.length;

            function getShowCount() {
                const winWidth=$(window).width();

                if (winWidth<=800) {
                    return 2;
                } else if (winWidth<=1199) {
                    return 3;
                } else {
                    return totalItems;
                }
            }

            function showItems(count) {
                $items.hide();
                $items.slice(0, count).show();

                if (count>=totalItems) {
                    $moreBtn.hide();
                } else {
                    $moreBtn.show();
                }
            }

            let showCount=getShowCount();

            function initList() {
                showCount = getShowCount();
                showItems(showCount);
            }

            initList();

            $moreBtn.off("click").on("click", function() {
                showCount+=getShowCount();

                if (showCount>totalItems) {
                    showCount=totalItems;
                }
                showItems(showCount);
            });
        });
   });


    // 메뉴
    $("#menu-btn").click(function() {
        if ($("#nav-menu").is(":animated")) {
            return false;
        }
        
        const currentRight = $("#nav-menu").css("right");
        const currentTop = $("#nav-menu").css("top");

        if (window.innerWidth <= 1200) {
            if (currentRight === "0px") {
                $("#nav-menu").animate({ right: "-80%" }, 500);
                $(".menu-modal").fadeOut(300);

                $('.sub-menu').stop().slideUp(300);
                $('.menu-title').children("i").attr("class", 'xi-plus-thin');
            } else {
                $("#nav-menu").animate({ right: "0" }, 500);
                $(".menu-modal").fadeIn(500);
            }
        } else {
            if (currentTop === "0px") {
                $("#nav-menu").animate({ top: "-70%" }, 500);
            } else {
                $("#nav-menu").animate({ top: "0" }, 500);
            }
        }
    });


    // 메뉴 닫기(x 버튼)
    $(".menu .close i").on("click", function() {
        if (window.innerWidth <= 1200) {
            $("#nav-menu").animate({right: "-80%"}, 500);
            $(".menu-modal").fadeOut(300);

            $('.sub-menu').stop().slideUp(300);
            $('.menu-title').children("i").attr("class", 'xi-plus-thin');
        } else {
            $("#nav-menu").animate({top: "-70%"}, 500);
        }
    });

    // 메뉴 닫기(모달 클릭)
    $('.menu-modal').on('click', function() {
        $("#nav-menu").animate({right: "-80%"}, 500);
        $('.menu-modal').fadeOut(300);

        $('.sub-menu').stop().slideUp(300);
        $('.menu-title').children("i").attr("class", 'xi-plus-thin');
    });




    // 서브 메뉴
    $(".menu-title").click(function(e) {
        e.preventDefault();

        if (window.innerWidth<=1200) {
            if ($(this).next().is(":visible")) {
                $(this).next().stop().slideUp(300);
                $(this).children("i").attr("class", "xi-plus-thin");
            } else {
                $(".sub-menu").stop().slideUp(300);
                $(".menu-title").children("i").attr("class", "xi-plus-thin");

                $(this).next().stop().slideDown(300);
                $(this).children("i").attr("class", "xi-minus-thin");
            };
        };
    });

    // 검색창
    let isOpen=false;
    $("#search-btn").click(function() {
        if (!isOpen) {
            $(".search-pop-down").stop().animate({top: "0"}, 300);
            $(".search-modal").fadeIn(300);
            isOpen = true;
        } else {
            $(".search-pop-down").stop().animate({top: "-100%"}, 300);
            $(".search-modal").fadeOut(300);
            isOpen = false;
        }
    });

    $(".search-close button").click(function() {
        if (isOpen) {
            $(".search-pop-down").stop().animate({top: "-100%"}, 300);
            $(".search-modal").fadeOut(300);
            isOpen = false;
        }
    });

    $(".search-modal").click(function() {
        if (isOpen) {
            $(".search-pop-down").stop().animate({top: '-100%'}, 300);
            $(".search-modal").fadeOut(300);
            isOpen = false;
        }
    });

    $("#filter-btn").click(function(e) {
        e.preventDefault();
        
        // 다른 서브메뉴 닫기
        $("#sort-btn").next().css("display", "none");

        if ($(this).next().is(":visible"))
        {
            $(this).next().stop().css("display", "none");
        } else {
            $(this).next().css("display", "block");
        }
        
        updateCoffeeListPadding();
    });

    $("#sort-btn").click(function(e) {
        e.preventDefault();
        
        // 다른 서브메뉴 닫기
        $("#filter-btn").next().css("display", "none");

        if ($(this).next().is(":visible"))
        {
            $(this).next().stop().css("display", "none");
        } else {
            $(this).next().css("display", "block");
        }
        
        updateCoffeeListPadding();
    });    
    
    
    // 문서 클릭 시 옵션 닫기
    $(document).click(function(e) {
        if (!$(e.target).closest('.option').length) {
            $('.option .sub').css("display", "none");
            updateCoffeeListPadding();
        }
    });



    // 제품 판매 페이지 - 상세 보기
    $(".ex_click").click(function() {
        if ($(this).next().is(":visible"))
        {
            $(this).next().stop().slideUp(500);
            $(this).find('i').attr('class', 'xi-angle-down-thin');
        } else {
            $(this).next().slideDown(500);
            $(this).find('i').attr('class', 'xi-angle-up-thin');
        };
    });


    const $mainImage=$(".item-page > .slideShow");
	const $imgs=$mainImage.find("img");

	let currentIndex=0;
	const totalSlides=$imgs.length;
	let autoSlideInterval;

	// slideTo() 함수
	function slideTo(index) {
		if (index < 0) index=0;
		if (index>=totalSlides) index=totalSlides-1;

		$imgs.removeClass("active").eq(index).addClass("active");

		currentIndex=index;
		window.currentSlideIndex = index;
	};

	window.slideTo = slideTo;

	// startAutoSlide() 함수
	function startAutoSlide() {
		autoSlideInterval=setInterval(function() {
			let nextIndex=(currentIndex+1)%totalSlides;

			slideTo(nextIndex);
		}, 2000);
	};

    slideTo(0);
    startAutoSlide();




    // 메인 배너 슬라이드 (드래그로 끌어당기기)
    const $ul = $("#main_image ul");
    const $slide = $ul.find("li");
    const $bookRoll = $("#book_roll li a");

    let curIndex = 0;
    const totalSlide = $slide.length;
    
    function slideto(index) {
        curIndex = index;
        if (curIndex >= totalSlide) curIndex = 0;
        if (curIndex < 0) curIndex = totalSlide - 1;
        $ul.css("transition", "transform 0.6s ease");
        $ul.css("transform", `translateX(${-100 * curIndex}%)`);

        // 인디케이터 활성화
        $("#book_roll div").removeClass("indicator-on").eq(curIndex).addClass("indicator-on");

        $slide.find('.caption').removeClass('active');
        $slide.eq(curIndex).find('.caption').addClass('active');
        
        window.currentBannerIndex = index;
    }

    // 전역에서 접근 가능하도록 함수를 window 객체에 할당
    window.slideto = slideto;
    $("#book_roll div").on("click", function() {
        var idx = $(this).index();
        stopBannerAutoSlide();
        slideto(idx);
        startBannerAutoSlide();
    });

    // 메인 배너 자동 슬라이드 기능
    let bannerAutoSlideInterval;

    function startBannerAutoSlide() {
        bannerAutoSlideInterval = setInterval(function() {
            slideto(curIndex + 1);
        }, 4000); // 4초마다 자동 슬라이드
    }

    function stopBannerAutoSlide() {
        if (bannerAutoSlideInterval) {
            clearInterval(bannerAutoSlideInterval);
        }
    }

    // 드래그 슬라이드 기능
    let bannerStartX = 0;
    let bannerDragging = false;
    let bannerDiff = 0;

    $ul.on("mousedown touchstart", function (e) {
        stopBannerAutoSlide(); // 드래그 시작 시 자동 슬라이드 정지
        bannerDragging = true;
        bannerStartX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
        bannerDiff = 0;
        $ul.css("transition", "none");
    });

    $ul.on('mousemove touchmove', function (e) {
        if (!bannerDragging) return;
        let moveX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
        bannerDiff = moveX - bannerStartX;
        $ul.css('transform', `translateX(${-100 * curIndex + (bannerDiff / $ul.width()) * 100}%)`);
    });

    $ul.on("mouseup touchend mouseleave", function (e) {
        if (!bannerDragging) return;
        bannerDragging = false;
        $ul.css("transition", "transform 0.6s ease");
        if (Math.abs(bannerDiff) > 50) {
            if (bannerDiff < 0) {
                slideto(curIndex + 1);
            } else {
                slideto(curIndex - 1);
            }
        } else {
            slideto(curIndex);
        }
        startBannerAutoSlide(); // 드래그 종료 후 자동 슬라이드 재시작
    });

    slideto(0);
    startBannerAutoSlide(); // 자동 슬라이드 시작




    // pc 배너 이미지 변경
    function updateImages() {
        const isPc=$(window).width() >= 1200;
        $("#main_image ul li img").each(function() {
            const $img=$(this);
            const pcSrc=$img.data("pc");
            const mobileSrc=$img.data("mobile");

            if (isPc && pcSrc) {
                $img.attr("src", pcSrc);
            } else if (mobileSrc) {
                $img.attr("src", mobileSrc);
            }
        });
    }

    // quick-menu 스크롤 고정
    if (location.pathname.indexOf('rwd_lsh2.html') !== -1 && $('.quick-menu').length) {
        const quickMenuOriginTop = $('.quick-menu').offset().top;
        $(window).on('scroll', function() {
            const headerHeight = $('#header').outerHeight();
            const quickMenu = $('.quick-menu');
            const tabContent = $('.tab-content').last();
            const quickMenuHeight = quickMenu.outerHeight();
            const tabContentBottom = tabContent.offset().top + tabContent.outerHeight();
            const scrollTop = $(window).scrollTop();
            const gapFromHeader = 40;
            
            if (scrollTop + headerHeight + gapFromHeader >= quickMenuOriginTop) {
                if (scrollTop + headerHeight + gapFromHeader + quickMenuHeight < tabContentBottom) {
                    quickMenu.css({
                        position: 'fixed',
                        top: (headerHeight + gapFromHeader) + 'px',
                        width: '100%'
                    });
                } else {
                    quickMenu.css({
                        position: 'absolute',
                        top: (tabContentBottom - quickMenuHeight) + 'px',
                        width: '100%'
                    });
                }
            } else {
                quickMenu.css({
                    position: '',
                    top: '',
                    width: ''
                });
            }
        });
    }

    // 장바구니 카운트 옵션
    $(".count-box").each(function() {
        const $box=$(this);
        const $minus=$box.find(".minus");
        const $plus=$box.find(".plus");
        const $count=$box.find(".count");
        const $price=$box.closest('.item').find('.pr-box p');

        // 초기 가격 저장
        const basePrice = parseInt($price.text().replace(/[₩,\s]/g, ''));

        function updatePrice() {
            const quantity=parseInt($count.text());
            const totalPrice=basePrice*quantity;
            $price.text('₩' + totalPrice.toLocaleString());
        }

        function updateCartTotal() {
            let total=0;
            $('.item .pr-box p').each(function() {
                const price=parseInt($(this).text().replace(/[₩,\s]/g, ''));
                total+=price;
            });

            $('.sum .sum-li').eq(0).find('li').eq(1).text('₩' + total.toLocaleString());
            $('.sum .sum-li').eq(3).find('li').eq(1).text('₩' + total.toLocaleString());
        }

        $minus.on("click", function() {
            let num=parseInt($count.text());
            if (num>1) {
                $count.text(num-1);
                updatePrice();
                updateCartTotal();
            }
        });

        $plus.on("click", function() {
            let num=parseInt($count.text());
            $count.text(num+1);
            updatePrice();
            updateCartTotal();
        });
    });
   

    // 아이템 페이지 pc-option 높이 설정
    const $option=$(".pc-option");
    const $footer=$("footer");

    if ($option.length && $footer.length) {
        $(window).on("scroll", function() {
            const optionHeight=$option.outerHeight();
            const footerTop=$footer.offset().top;
            // footer가 페이지 맨 위에서부터 떨어진 거리

            const maxTop=footerTop-optionHeight;
            // option이 움직일 수 있는 최대 top 값
            // maxTop=옵션 박스의 top이 0에서 시작해서, footer에 닿기 전까지 이동할 수 있는 최대 거리

            if ($(window).scrollTop() < maxTop) {
                $option.css("top", "0px");
            } else {
                $option.css("top", (maxTop-$(window).scrollTop())+"px");
                // 스크롤 내린 값이 maxTop보다 크면 음수 >>> footer에 닿으면서 위치 고정
            }
        });
    }


    // 드래그 스크롤
    let isDown=false;
    let startX, scrollLeft;
    const $main=$("#machine-section .original-machine, .item-page-roast section, .item-page-cup .cup-slide");

    $main.on("mousedown", function(e) {
        isDown=true;
        $main.addClass("dragging");
        startX=e.pageX-$main.offset().left;
        scrollLeft=$main.scrollLeft();
    });

    $(document).on("mouseup", function() {
        isDown=false;
        $main.removeClass("dragging");
    });

    $main.on("mouseleave", function() {
        isDown=false;
        $main.removeClass("dragging");
    });

    $main.on("mousemove", function(e) {
        if (!isDown) return;
        e.preventDefault();

        let x=e.pageX-$main.offset().left;
        let walk=(x-startX);

        $main.scrollLeft(scrollLeft-walk);
    });

    // 애니메이션
    $(window).on('scroll', function() {
        $('.col > div').each(function() {
            const elemTop = $(this).offset().top;
            const winBottom = $(window).scrollTop() + $(window).height();
            if (winBottom > elemTop + 50) {
                $(this).addClass('active');
            }
        });

        $('.item-page .item-caption').each(function() {
            const itemTop=$(this).offset().top;
            const itemHeight=$(this).outerHeight();
            const winBottom=$(window).scrollTop()+$(window).height();

            if (winBottom>itemTop) {
                $(this).addClass('active');
            }
        });

        $('.item-page .page1 .txt-group').each(function() {
            const txtTop=$(this).offset().top;
            const txtHeight=$(this).outerHeight();
            const winBottom=$(window).scrollTop()+$(window).height();

            if (winBottom>txtTop) {
                $(this).addClass('active');
            }
        });

        $(".item-page .item-imgs").each(function() {
            const imgTop=$(this).offset().top;
            const imgHeight=$(this).outerHeight();
            const winBottom=$(window).scrollTop()+$(window).height();

            if (winBottom>imgTop-10) {
                $(this).addClass('active');
            }
        });

        $('.recycle-page .rec-img img').each(function() {
            const recTop=$(this).offset().top;
            const winBottom=$(window).scrollTop()+$(window).height();

            if (winBottom>recTop-50) {
                $(this).addClass('active');
            }
        });

        $('.recycle-page .recycle-txt').each(function() {
            const recTxtTop=$(this).offset().top;
            const winBottom=$(window).scrollTop()+$(window).height();

            if (winBottom>recTxtTop-50) {
                $(this).addClass('active');
            }
        })
    });

    // 페이지 로드시도 체크
    $(window).trigger('scroll');

    // 푸터 카테고리 클릭
    $("#footer .footer-container .footer-category .footer-click").on('click', function() {
        const $this = $(this);
        const $footerTxt = $this.next('.footer-txt');
        const $icon = $this.find('i');
        
        if ($footerTxt.is(":visible")) {
            $footerTxt.stop().slideUp(400);
            $icon.removeClass("xi-angle-up").addClass("xi-angle-down");
        } else {
            $('.footer-txt').stop().slideUp(400);
            $('.footer-click i').removeClass("xi-angle-up").addClass("xi-angle-down");
            
            $footerTxt.stop().slideDown(400);
            $icon.removeClass("xi-angle-down").addClass("xi-angle-up");
        }
    });

    // top 버튼
    $(".topBtn").on('click', function() {
        $('html, body').animate({scrollTop: 0}, 700);
    });

    // down 버튼
    $(".downBtn").on("click", function() {
        $('html, body').animate({scrollTop: $(document).height()}, 700);
    });

    // 레시피 모달창 기능
    $(".item-page2 .article").on("click", function() {
        const modalId = $(this).data("modal");
        if (modalId) {
            $("." + modalId).addClass("active");
            $("body").css("overflow", "hidden");
            $('.r-modal').css('display', 'block');
        }
    });

    // 레시피 모달창 닫기 - X 버튼 클릭
    $(".recipe-modal .rmodal-close").on("click", function() {
        $(this).closest(".recipe-modal").removeClass("active");
        $("body").css("overflow", "auto");
        $('.r-modal').css("display", "none");
    });

    // 모달창 닫기 - 배경 클릭
    $(".recipe-modal").on("click", function(e) {
        if (e.target === this) {
            $(this).removeClass("active");
            $("body").css("overflow", "auto");
            $('.r-modal').css("display", "none");
        }
    });

    // 모달창 닫기 - ESC 키
    $(document).on("keydown", function(e) {
        if (e.keyCode===27) {
            $(".recipe-modal.active").removeClass("active");
            $("body").css("overflow", "auto");
            $('.r-modal').css("display", "none");
        }
    });

    // 전체 동의 체크박스 기능
    $('.all-check input[type="checkbox"]').on('change', function() {
        const isChecked=$(this).is(':checked');

        if (isChecked) {
            $('.check-box input[type="checkbox"]').prop('checked', true);
        } else {
            $('.check-box input[type="checkbox"]').prop('checked', false);
        }
    });
})
// jQuery end   




// JavaScript
document.addEventListener('DOMContentLoaded', function() { 
    // item-vertuo-pop 이미지 슬라이드/인디케이터 (해당 요소가 있는 페이지에서만 실행)
    const slides = document.querySelectorAll(".item-img img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const bars = document.querySelectorAll(".nav .bar");
    const slideContainer = document.querySelector(".item-img");

    // 요소들이 모두 존재하는지 확인
    if (slides.length > 0 && prevBtn && nextBtn && bars.length > 0 && slideContainer) {
        let currentIndex = 0;

        function showSlide(index) {
            if (index >= slides.length) currentIndex = 0;
            else if (index < 0) currentIndex = slides.length - 1;
            else currentIndex = index;

            const offset = -currentIndex * 100;
            slideContainer.style.transform = `translateX(${offset}%)`;

            bars.forEach(bar => bar.classList.remove("active"));
            bars[currentIndex].classList.add("active");
        }

        prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
        nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));

        bars.forEach((bar, idx) => {
        // bars.forEach(function(bar, idx) {}) 
        bar.addEventListener("click", () => showSlide(idx));
        });

        showSlide(0);
    }

    // item-vertuo-pop 본문 이미지 페이드인아웃
    let fadeShows=document.querySelectorAll(".fadeShow");

    fadeShows.forEach(fadeShow=> {
    // fadeShows.forEach(function(fadeShow() {})

        let imgs=fadeShow.querySelectorAll("img");
        let currentIndex2=0;

        imgs[currentIndex2].classList.add("active");

        function fadeInOut() {
            let currentImg=imgs[currentIndex2];
            let nextIndex=(currentIndex2+1)%imgs.length;
            // %imgs.length : 마지막 이미지에서 다시 첫번째 이미지로 돌아가기 위한 코드

            let nextImg=imgs[nextIndex];

            nextImg.classList.add("active");
            currentImg.classList.remove("active");

            currentIndex2=nextIndex;
        }
        fadeInOut();
        setInterval(fadeInOut, 3000);
    });
});