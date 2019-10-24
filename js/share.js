(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  $(function () {
    $('.o-menu').on('click', function () {
      if ($(this).hasClass('o-open')) {
        $(this).removeClass('o-open');
        $('.header_nav_sp_link_wrapper').stop().slideUp();
        $('.header_nav_button_text').html('メニュー');
      } else {
        $(this).addClass('o-open');
        $('.header_nav_sp_link_wrapper').stop().slideDown();
        $('.header_nav_button_text').html('閉じる');
      }
    });

    $('.header_nav_sp_button_close').on('click', function () {
      $('.o-menu').removeClass('o-open');
      $('.header_nav_sp_link_wrapper').stop().slideUp();
      $('.header_nav_button_text').html('メニュー');
    });

    $(window).on('resize', function () {
      if ($(this).width() >= 768) {
        $('.header_nav_sp_link_wrapper').hide();
        $('.o-menu').removeClass('o-open');
        $('.header_nav_button_text').html('メニュー');
      }
    });
  });

}(jQuery));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2hhcmUuanMiLCJzb3VyY2VzIjpbInNyYy9qcy9zaGFyZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAkKCcuby1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ28tb3BlbicpKSB7XHJcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ28tb3BlbicpXHJcbiAgICAgICQoJy5oZWFkZXJfbmF2X3NwX2xpbmtfd3JhcHBlcicpLnN0b3AoKS5zbGlkZVVwKClcclxuICAgICAgJCgnLmhlYWRlcl9uYXZfYnV0dG9uX3RleHQnKS5odG1sKCfjg6Hjg4vjg6Xjg7wnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnby1vcGVuJylcclxuICAgICAgJCgnLmhlYWRlcl9uYXZfc3BfbGlua193cmFwcGVyJykuc3RvcCgpLnNsaWRlRG93bigpXHJcbiAgICAgICQoJy5oZWFkZXJfbmF2X2J1dHRvbl90ZXh0JykuaHRtbCgn6ZaJ44GY44KLJylcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAkKCcuaGVhZGVyX25hdl9zcF9idXR0b25fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuby1tZW51JykucmVtb3ZlQ2xhc3MoJ28tb3BlbicpXHJcbiAgICAkKCcuaGVhZGVyX25hdl9zcF9saW5rX3dyYXBwZXInKS5zdG9wKCkuc2xpZGVVcCgpXHJcbiAgICAkKCcuaGVhZGVyX25hdl9idXR0b25fdGV4dCcpLmh0bWwoJ+ODoeODi+ODpeODvCcpXHJcbiAgfSlcclxuXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJCh0aGlzKS53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAkKCcuaGVhZGVyX25hdl9zcF9saW5rX3dyYXBwZXInKS5oaWRlKClcclxuICAgICAgJCgnLm8tbWVudScpLnJlbW92ZUNsYXNzKCdvLW9wZW4nKVxyXG4gICAgICAkKCcuaGVhZGVyX25hdl9idXR0b25fdGV4dCcpLmh0bWwoJ+ODoeODi+ODpeODvCcpXHJcbiAgICB9XHJcbiAgfSlcclxufSlcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBRUEsQ0FBQyxDQUFDLFlBQVk7SUFDWixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO01BQ25DLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztRQUM3QixDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUU7UUFDakQsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztPQUMxQyxNQUFNO1FBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUM7UUFDMUIsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFFO1FBQ25ELENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUM7T0FDekM7S0FDRixFQUFDOztJQUVGLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtNQUN2RCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztNQUNsQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUU7TUFDakQsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztLQUMxQyxFQUFDOztJQUVGLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7TUFDakMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQzFCLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLElBQUksR0FBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztRQUNsQyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO09BQzFDO0tBQ0YsRUFBQztHQUNILENBQUM7Ozs7In0=
