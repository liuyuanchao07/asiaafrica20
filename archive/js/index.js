(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  /* eslint-disable*/

  document.addEventListener('DOMContentLoaded', function () {
    var truncate = Truncator.truncate;
    var total = document.querySelectorAll('.archive_item');
    var truncWrapper = Array.prototype.slice.call(total);
    var pagination = document.querySelector('.pagination');
    var paginationList = pagination.querySelector('.pagination_list');
    var prev = document.querySelector('.o-prev');
    var next = document.querySelector('.o-next');
    var totalLen = total.length;
    var maxShow = 12;
    var page = Math.ceil(totalLen / maxShow);
    var count = 1;
    var paginationCount = 0;
    var eventTargetIndex = 1;

    var truncContents = truncWrapper.map(function (item) {
      return item.querySelector('.archive_item_title').innerHTML
    });

    var trimmingTextMain = function () {
      truncWrapper.forEach(function (item, index) {
        var truncContent = item.querySelector('.archive_item_title');
        truncate(truncContent, truncContents[index], {line: 2});
      });
    };
    trimmingTextMain();

    window.addEventListener('resize', function () {
      trimmingTextMain();
    });

    var paginationModule = function () {
      var str = '';
      if (page === 1) {
        pagination.classList.remove('o-hide');
      } else if (page <= 4) {
        for (var i = 0; i < page; i++) {
          if (i === 0) {
            str += "<span class=\"pagination_list_item o-current\" data-index=\"" + (i + 1) + "\">" + (i + 1) + "</span>";
            continue
          }
          str += "<span class=\"pagination_list_item\" data-index=\"" + (i + 1) + "\">" + (i + 1) + "</span>";
        }
      } else {
        for (var i$1 = 0; i$1 < 3; i$1++) {
          if (i$1 === 0) {
            str += "<span class=\"pagination_list_item o-current\" data-index=\"" + (i$1 + 1) + "\">" + (i$1 + 1) + "</span>";
            continue
          }
          str += "<span class=\"pagination_list_item\" data-index=\"" + (i$1 + 1) + "\">" + (i$1 + 1) + "</span>";
        }
        str += "<span class=\"pagination_list_ellipsis o-ellipsis\">…</span>";
        str += "<span class=\"pagination_list_item\" data-index=\"" + page + "\">" + page + "</span>";
      }
      paginationList.innerHTML = str;
      str = null;
    };
    paginationModule();

    var paginationListItem = paginationList.querySelectorAll('.pagination_list_item');
    var likeAry = Array.prototype.slice.call(paginationListItem);

    var paginationChange = function (curIndex) {
      var str = '';
      if (curIndex >= 3 && curIndex < page - 2) {
        str += "<span class=\"pagination_list_item\" data-index=\"1\">1</span>";
        str += "<span class=\"pagination_list_ellipsis o-ellipsis\">…</span>";
        for (var i = curIndex; i < curIndex + 2; i++) {
          if (i === curIndex) {
            str += "<span class=\"pagination_list_item o-current\" data-index=\"" + i + "\">" + i + "</span>";
            continue
          }
          str += "<span class=\"pagination_list_item\" data-index=\"" + i + "\">" + i + "</span>";
        }
        str += "<span class=\"pagination_list_ellipsis o-ellipsis\">…</span>";
        str += "<span class=\"pagination_list_item\" data-index=\"" + page + "\">" + page + "</span>";
      } else if (curIndex < 3) {
        for (var i$1 = 0; i$1 < 3; i$1++) {
          if (i$1 === curIndex - 1) {
            str += "<span class=\"pagination_list_item o-current\" data-index=\"" + (i$1 + 1) + "\">" + (i$1 + 1) + "</span>";
            continue
          }
          str += "<span class=\"pagination_list_item\" data-index=\"" + (i$1 + 1) + "\">" + (i$1 + 1) + "</span>";
        }
        str += "<span class=\"pagination_list_ellipsis o-ellipsis\">…</span>";
        str += "<span class=\"pagination_list_item\" data-index=\"" + page + "\">" + page + "</span>";
      } else if (curIndex >= page - 2) {
        str += "<span class=\"pagination_list_item\" data-index=\"1\">1</span>";
        str += "<span class=\"pagination_list_ellipsis o-ellipsis\">…</span>";
        for (var i$2 = page - 2; i$2 <= page; i$2++) {
          if (i$2 === curIndex) {
            str += "<span class=\"pagination_list_item o-current\" data-index=\"" + i$2 + "\">" + i$2 + "</span>";
            continue
          }
          str += "<span class=\"pagination_list_item\" data-index=\"" + i$2 + "\">" + i$2 + "</span>";
        }
      }
      paginationList.innerHTML = str;
      str = null;
    };

    paginationList.addEventListener('click', function (e) {
      var eventTarget = e.target;
      if (eventTarget.classList.contains('o-ellipsis') || eventTarget.tagName.toLowerCase() !== 'span') {
        return false
      }
      count = Number(eventTarget.dataset.index);
      eventTargetIndex = Number(eventTarget.dataset.index);
      paginationListItem = paginationList.querySelectorAll('.pagination_list_item');
      likeAry = Array.prototype.slice.call(paginationListItem);
      likeAry.forEach(function (item, index) {
        if (Number(item.dataset.index) === count) {
          item.classList.add('o-current');
          paginationCount = index;
        } else {
          item.classList.remove('o-current');
        }
      });
      if (page > 4) {
        paginationChange(count);
      }
      pageChange();
      trimmingTextMain();
      smoothScrollTop();

      if (count !== 1) {
        prev.classList.remove('o-hide');
      } else {
        prev.classList.add('o-hide');
      }

      if (count === page) {
        next.classList.add('o-hide');
      } else {
        next.classList.remove('o-hide');
      }
    });

    next.addEventListener('click', function () {
      paginationCount++;
      prev.classList.remove('o-hide');
      if (page <= 4) {
        count = Number(likeAry[paginationCount].dataset['index']);
        if (count === page) {
          next.classList.add('o-hide');
        }
        likeAry.forEach(function (item, index) {
          item.classList.remove('o-current');
          likeAry[paginationCount].classList.add('o-current');
        });
      } else if (page > 4) {
        eventTargetIndex++;
        count = eventTargetIndex;
        if (eventTargetIndex === page) {
          next.classList.add('o-hide');
        }
        paginationChange(eventTargetIndex);
      }
      pageChange();
      trimmingTextMain();
      smoothScrollTop();
    });

    prev.addEventListener('click', function () {
      paginationCount--;
      if (page <= 4) {
        count = Number(likeAry[paginationCount].dataset['index']);
        if (paginationCount !== page) {
          next.classList.remove('o-hide');
        }
        if (paginationCount === 0) {
          prev.classList.add('o-hide');
        }
        likeAry.forEach(function (item, index) {
          item.classList.remove('o-current');
          likeAry[paginationCount].classList.add('o-current');
        });
      } else if (page > 4) {
        eventTargetIndex--;
        count = eventTargetIndex;
        if (eventTargetIndex !== page) {
          next.classList.remove('o-hide');
        }
        if (eventTargetIndex === 1) {
          prev.classList.add('o-hide');
        }
        paginationChange(eventTargetIndex);
      }
      pageChange();
      trimmingTextMain();
      smoothScrollTop();
    });

    var pageChange = function () {
      Array.prototype.slice.call(total).forEach(function (item, index) {
        if (index >= (count - 1) * maxShow && index < count * maxShow) {
          item.classList.remove('o-hide');
          item.classList.add('o-show');
        } else {
          item.classList.remove('o-show');
          item.classList.add('o-hide');
        }
      });
    };
  });

  function smoothScrollTop () {
    $('html, body').animate({
      scrollTop: 0
    }, 500, 'swing');
  }

}(jQuery));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjaGl2ZS9qcy9pbmRleC5qcyIsInNvdXJjZXMiOlsic3JjL2FyY2hpdmUvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUqL1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGxldCB0cnVuY2F0ZSA9IFRydW5jYXRvci50cnVuY2F0ZVxyXG4gIGNvbnN0IHRvdGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hpdmVfaXRlbScpXHJcbiAgY29uc3QgdHJ1bmNXcmFwcGVyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG90YWwpXHJcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJylcclxuICBjb25zdCBwYWdpbmF0aW9uTGlzdCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb25fbGlzdCcpXHJcbiAgY29uc3QgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vLXByZXYnKVxyXG4gIGNvbnN0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuby1uZXh0JylcclxuICBjb25zdCB0b3RhbExlbiA9IHRvdGFsLmxlbmd0aFxyXG4gIGNvbnN0IG1heFNob3cgPSAxMlxyXG4gIGNvbnN0IHBhZ2UgPSBNYXRoLmNlaWwodG90YWxMZW4gLyBtYXhTaG93KVxyXG4gIGxldCBjb3VudCA9IDFcclxuICBsZXQgcGFnaW5hdGlvbkNvdW50ID0gMFxyXG4gIGxldCBldmVudFRhcmdldEluZGV4ID0gMVxyXG5cclxuICBjb25zdCB0cnVuY0NvbnRlbnRzID0gdHJ1bmNXcmFwcGVyLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgcmV0dXJuIGl0ZW0ucXVlcnlTZWxlY3RvcignLmFyY2hpdmVfaXRlbV90aXRsZScpLmlubmVySFRNTFxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHRyaW1taW5nVGV4dE1haW4gPSAoKSA9PiB7XHJcbiAgICB0cnVuY1dyYXBwZXIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdHJ1bmNDb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYXJjaGl2ZV9pdGVtX3RpdGxlJylcclxuICAgICAgdHJ1bmNhdGUodHJ1bmNDb250ZW50LCB0cnVuY0NvbnRlbnRzW2luZGV4XSwge2xpbmU6IDJ9KVxyXG4gICAgfSlcclxuICB9XHJcbiAgdHJpbW1pbmdUZXh0TWFpbigpXHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICB0cmltbWluZ1RleHRNYWluKClcclxuICB9KVxyXG5cclxuICBsZXQgcGFnaW5hdGlvbk1vZHVsZSA9ICgpID0+IHtcclxuICAgIGxldCBzdHIgPSAnJ1xyXG4gICAgaWYgKHBhZ2UgPT09IDEpIHtcclxuICAgICAgcGFnaW5hdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdvLWhpZGUnKVxyXG4gICAgfSBlbHNlIGlmIChwYWdlIDw9IDQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlOyBpKyspIHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtIG8tY3VycmVudFwiIGRhdGEtaW5kZXg9XCIke2kgKyAxfVwiPiR7aSArIDF9PC9zcGFuPmBcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbVwiIGRhdGEtaW5kZXg9XCIke2kgKyAxfVwiPiR7aSArIDF9PC9zcGFuPmBcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtIG8tY3VycmVudFwiIGRhdGEtaW5kZXg9XCIke2kgKyAxfVwiPiR7aSArIDF9PC9zcGFuPmBcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbVwiIGRhdGEtaW5kZXg9XCIke2kgKyAxfVwiPiR7aSArIDF9PC9zcGFuPmBcclxuICAgICAgfVxyXG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2VsbGlwc2lzIG8tZWxsaXBzaXNcIj7igKY8L3NwYW4+YFxyXG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiJHtwYWdlfVwiPiR7cGFnZX08L3NwYW4+YFxyXG4gICAgfVxyXG4gICAgcGFnaW5hdGlvbkxpc3QuaW5uZXJIVE1MID0gc3RyXHJcbiAgICBzdHIgPSBudWxsXHJcbiAgfVxyXG4gIHBhZ2luYXRpb25Nb2R1bGUoKVxyXG5cclxuICBsZXQgcGFnaW5hdGlvbkxpc3RJdGVtID0gcGFnaW5hdGlvbkxpc3QucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb25fbGlzdF9pdGVtJylcclxuICBsZXQgbGlrZUFyeSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhZ2luYXRpb25MaXN0SXRlbSlcclxuXHJcbiAgbGV0IHBhZ2luYXRpb25DaGFuZ2UgPSAoY3VySW5kZXgpID0+IHtcclxuICAgIGxldCBzdHIgPSAnJ1xyXG4gICAgaWYgKGN1ckluZGV4ID49IDMgJiYgY3VySW5kZXggPCBwYWdlIC0gMikge1xyXG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiMVwiPjE8L3NwYW4+YFxyXG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2VsbGlwc2lzIG8tZWxsaXBzaXNcIj7igKY8L3NwYW4+YFxyXG4gICAgICBmb3IgKGxldCBpID0gY3VySW5kZXg7IGkgPCBjdXJJbmRleCArIDI7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSBjdXJJbmRleCkge1xyXG4gICAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtIG8tY3VycmVudFwiIGRhdGEtaW5kZXg9XCIke2l9XCI+JHtpfTwvc3Bhbj5gXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiJHtpfVwiPiR7aX08L3NwYW4+YFxyXG4gICAgICB9XHJcbiAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfZWxsaXBzaXMgby1lbGxpcHNpc1wiPuKApjwvc3Bhbj5gXHJcbiAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbVwiIGRhdGEtaW5kZXg9XCIke3BhZ2V9XCI+JHtwYWdlfTwvc3Bhbj5gXHJcbiAgICB9IGVsc2UgaWYgKGN1ckluZGV4IDwgMykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSBjdXJJbmRleCAtIDEpIHtcclxuICAgICAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbSBvLWN1cnJlbnRcIiBkYXRhLWluZGV4PVwiJHtpICsgMX1cIj4ke2kgKyAxfTwvc3Bhbj5gXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiJHtpICsgMX1cIj4ke2kgKyAxfTwvc3Bhbj5gXHJcbiAgICAgIH1cclxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9lbGxpcHNpcyBvLWVsbGlwc2lzXCI+4oCmPC9zcGFuPmBcclxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtXCIgZGF0YS1pbmRleD1cIiR7cGFnZX1cIj4ke3BhZ2V9PC9zcGFuPmBcclxuICAgIH0gZWxzZSBpZiAoY3VySW5kZXggPj0gcGFnZSAtIDIpIHtcclxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtXCIgZGF0YS1pbmRleD1cIjFcIj4xPC9zcGFuPmBcclxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9lbGxpcHNpcyBvLWVsbGlwc2lzXCI+4oCmPC9zcGFuPmBcclxuICAgICAgZm9yIChsZXQgaSA9IHBhZ2UgLSAyOyBpIDw9IHBhZ2U7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSBjdXJJbmRleCkge1xyXG4gICAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtIG8tY3VycmVudFwiIGRhdGEtaW5kZXg9XCIke2l9XCI+JHtpfTwvc3Bhbj5gXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiJHtpfVwiPiR7aX08L3NwYW4+YFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBwYWdpbmF0aW9uTGlzdC5pbm5lckhUTUwgPSBzdHJcclxuICAgIHN0ciA9IG51bGxcclxuICB9XHJcblxyXG4gIHBhZ2luYXRpb25MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGxldCBldmVudFRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICBpZiAoZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWVsbGlwc2lzJykgfHwgZXZlbnRUYXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnc3BhbicpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBjb3VudCA9IE51bWJlcihldmVudFRhcmdldC5kYXRhc2V0LmluZGV4KVxyXG4gICAgZXZlbnRUYXJnZXRJbmRleCA9IE51bWJlcihldmVudFRhcmdldC5kYXRhc2V0LmluZGV4KVxyXG4gICAgcGFnaW5hdGlvbkxpc3RJdGVtID0gcGFnaW5hdGlvbkxpc3QucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb25fbGlzdF9pdGVtJylcclxuICAgIGxpa2VBcnkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYWdpbmF0aW9uTGlzdEl0ZW0pXHJcbiAgICBsaWtlQXJ5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChOdW1iZXIoaXRlbS5kYXRhc2V0LmluZGV4KSA9PT0gY291bnQpIHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ28tY3VycmVudCcpXHJcbiAgICAgICAgcGFnaW5hdGlvbkNvdW50ID0gaW5kZXhcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ28tY3VycmVudCcpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAocGFnZSA+IDQpIHtcclxuICAgICAgcGFnaW5hdGlvbkNoYW5nZShjb3VudClcclxuICAgIH1cclxuICAgIHBhZ2VDaGFuZ2UoKVxyXG4gICAgdHJpbW1pbmdUZXh0TWFpbigpXHJcbiAgICBzbW9vdGhTY3JvbGxUb3AoKVxyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkge1xyXG4gICAgICBwcmV2LmNsYXNzTGlzdC5yZW1vdmUoJ28taGlkZScpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmV2LmNsYXNzTGlzdC5hZGQoJ28taGlkZScpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdW50ID09PSBwYWdlKSB7XHJcbiAgICAgIG5leHQuY2xhc3NMaXN0LmFkZCgnby1oaWRlJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5leHQuY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgcGFnaW5hdGlvbkNvdW50KytcclxuICAgIHByZXYuY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcclxuICAgIGlmIChwYWdlIDw9IDQpIHtcclxuICAgICAgY291bnQgPSBOdW1iZXIobGlrZUFyeVtwYWdpbmF0aW9uQ291bnRdLmRhdGFzZXRbJ2luZGV4J10pXHJcbiAgICAgIGlmIChjb3VudCA9PT0gcGFnZSkge1xyXG4gICAgICAgIG5leHQuY2xhc3NMaXN0LmFkZCgnby1oaWRlJylcclxuICAgICAgfVxyXG4gICAgICBsaWtlQXJ5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvLWN1cnJlbnQnKVxyXG4gICAgICAgIGxpa2VBcnlbcGFnaW5hdGlvbkNvdW50XS5jbGFzc0xpc3QuYWRkKCdvLWN1cnJlbnQnKVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIGlmIChwYWdlID4gNCkge1xyXG4gICAgICBldmVudFRhcmdldEluZGV4KytcclxuICAgICAgY291bnQgPSBldmVudFRhcmdldEluZGV4XHJcbiAgICAgIGlmIChldmVudFRhcmdldEluZGV4ID09PSBwYWdlKSB7XHJcbiAgICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKCdvLWhpZGUnKVxyXG4gICAgICB9XHJcbiAgICAgIHBhZ2luYXRpb25DaGFuZ2UoZXZlbnRUYXJnZXRJbmRleClcclxuICAgIH1cclxuICAgIHBhZ2VDaGFuZ2UoKVxyXG4gICAgdHJpbW1pbmdUZXh0TWFpbigpXHJcbiAgICBzbW9vdGhTY3JvbGxUb3AoKVxyXG4gIH0pXHJcblxyXG4gIHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBwYWdpbmF0aW9uQ291bnQtLVxyXG4gICAgaWYgKHBhZ2UgPD0gNCkge1xyXG4gICAgICBjb3VudCA9IE51bWJlcihsaWtlQXJ5W3BhZ2luYXRpb25Db3VudF0uZGF0YXNldFsnaW5kZXgnXSlcclxuICAgICAgaWYgKHBhZ2luYXRpb25Db3VudCAhPT0gcGFnZSkge1xyXG4gICAgICAgIG5leHQuY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcclxuICAgICAgfVxyXG4gICAgICBpZiAocGFnaW5hdGlvbkNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgcHJldi5jbGFzc0xpc3QuYWRkKCdvLWhpZGUnKVxyXG4gICAgICB9XHJcbiAgICAgIGxpa2VBcnkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ28tY3VycmVudCcpXHJcbiAgICAgICAgbGlrZUFyeVtwYWdpbmF0aW9uQ291bnRdLmNsYXNzTGlzdC5hZGQoJ28tY3VycmVudCcpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPiA0KSB7XHJcbiAgICAgIGV2ZW50VGFyZ2V0SW5kZXgtLVxyXG4gICAgICBjb3VudCA9IGV2ZW50VGFyZ2V0SW5kZXhcclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0SW5kZXggIT09IHBhZ2UpIHtcclxuICAgICAgICBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ28taGlkZScpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0SW5kZXggPT09IDEpIHtcclxuICAgICAgICBwcmV2LmNsYXNzTGlzdC5hZGQoJ28taGlkZScpXHJcbiAgICAgIH1cclxuICAgICAgcGFnaW5hdGlvbkNoYW5nZShldmVudFRhcmdldEluZGV4KVxyXG4gICAgfVxyXG4gICAgcGFnZUNoYW5nZSgpXHJcbiAgICB0cmltbWluZ1RleHRNYWluKClcclxuICAgIHNtb290aFNjcm9sbFRvcCgpXHJcbiAgfSlcclxuXHJcbiAgbGV0IHBhZ2VDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b3RhbCkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID49IChjb3VudCAtIDEpICogbWF4U2hvdyAmJiBpbmRleCA8IGNvdW50ICogbWF4U2hvdykge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ28tc2hvdycpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvLXNob3cnKVxyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnby1oaWRlJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBzbW9vdGhTY3JvbGxUb3AgKCkge1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgIHNjcm9sbFRvcDogMFxyXG4gIH0sIDUwMCwgJ3N3aW5nJylcclxufVxyXG4iXSwibmFtZXMiOlsibGV0IiwiY29uc3QiLCJpIl0sIm1hcHBpbmdzIjoiOzs7OztFQUFBO0FBQ0E7RUFFQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLGNBQUs7SUFDL0NBLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFRO0lBQ2pDQyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFDO0lBQ3hEQSxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO0lBQ3REQSxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFB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
