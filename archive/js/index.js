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
      if (curIndex >= 3 && curIndex <= page - 2) {
        str += "<span class=\"pagination_list_item\" data-index=\"1\">1</span>";
        str += "<span class=\"pagination_list_ellipsis o-ellipsis\">…</span>";
        for (var i = curIndex; i < curIndex + 3; i++) {
          if (i === curIndex + 1) {
            str += "<span class=\"pagination_list_item o-current\" data-index=\"" + (i - 1) + "\">" + (i - 1) + "</span>";
            continue
          }
          str += "<span class=\"pagination_list_item\" data-index=\"" + (i - 1) + "\">" + (i - 1) + "</span>";
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
      } else if (curIndex > page - 2) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjaGl2ZS9qcy9pbmRleC5qcyIsInNvdXJjZXMiOlsic3JjL2FyY2hpdmUvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUqL1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBsZXQgdHJ1bmNhdGUgPSBUcnVuY2F0b3IudHJ1bmNhdGVcbiAgY29uc3QgdG90YWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJjaGl2ZV9pdGVtJylcbiAgY29uc3QgdHJ1bmNXcmFwcGVyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG90YWwpXG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpXG4gIGNvbnN0IHBhZ2luYXRpb25MaXN0ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbl9saXN0JylcbiAgY29uc3QgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vLXByZXYnKVxuICBjb25zdCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm8tbmV4dCcpXG4gIGNvbnN0IHRvdGFsTGVuID0gdG90YWwubGVuZ3RoXG4gIGNvbnN0IG1heFNob3cgPSAxMlxuICBjb25zdCBwYWdlID0gTWF0aC5jZWlsKHRvdGFsTGVuIC8gbWF4U2hvdylcbiAgbGV0IGNvdW50ID0gMVxuICBsZXQgcGFnaW5hdGlvbkNvdW50ID0gMFxuICBsZXQgZXZlbnRUYXJnZXRJbmRleCA9IDFcblxuICBjb25zdCB0cnVuY0NvbnRlbnRzID0gdHJ1bmNXcmFwcGVyLm1hcCgoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlX2l0ZW1fdGl0bGUnKS5pbm5lckhUTUxcbiAgfSlcblxuICBjb25zdCB0cmltbWluZ1RleHRNYWluID0gKCkgPT4ge1xuICAgIHRydW5jV3JhcHBlci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdHJ1bmNDb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYXJjaGl2ZV9pdGVtX3RpdGxlJylcbiAgICAgIHRydW5jYXRlKHRydW5jQ29udGVudCwgdHJ1bmNDb250ZW50c1tpbmRleF0sIHtsaW5lOiAyfSlcbiAgICB9KVxuICB9XG4gIHRyaW1taW5nVGV4dE1haW4oKVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgdHJpbW1pbmdUZXh0TWFpbigpXG4gIH0pXG5cbiAgbGV0IHBhZ2luYXRpb25Nb2R1bGUgPSAoKSA9PiB7XG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHBhZ2UgPT09IDEpIHtcbiAgICAgIHBhZ2luYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPD0gNCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW0gby1jdXJyZW50XCIgZGF0YS1pbmRleD1cIiR7aSArIDF9XCI+JHtpICsgMX08L3NwYW4+YFxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtXCIgZGF0YS1pbmRleD1cIiR7aSArIDF9XCI+JHtpICsgMX08L3NwYW4+YFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbSBvLWN1cnJlbnRcIiBkYXRhLWluZGV4PVwiJHtpICsgMX1cIj4ke2kgKyAxfTwvc3Bhbj5gXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiJHtpICsgMX1cIj4ke2kgKyAxfTwvc3Bhbj5gXG4gICAgICB9XG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2VsbGlwc2lzIG8tZWxsaXBzaXNcIj7igKY8L3NwYW4+YFxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtXCIgZGF0YS1pbmRleD1cIiR7cGFnZX1cIj4ke3BhZ2V9PC9zcGFuPmBcbiAgICB9XG4gICAgcGFnaW5hdGlvbkxpc3QuaW5uZXJIVE1MID0gc3RyXG4gICAgc3RyID0gbnVsbFxuICB9XG4gIHBhZ2luYXRpb25Nb2R1bGUoKVxuXG4gIGxldCBwYWdpbmF0aW9uTGlzdEl0ZW0gPSBwYWdpbmF0aW9uTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbl9saXN0X2l0ZW0nKVxuICBsZXQgbGlrZUFyeSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhZ2luYXRpb25MaXN0SXRlbSlcblxuICBsZXQgcGFnaW5hdGlvbkNoYW5nZSA9IChjdXJJbmRleCkgPT4ge1xuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChjdXJJbmRleCA+PSAzICYmIGN1ckluZGV4IDw9IHBhZ2UgLSAyKSB7XG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiMVwiPjE8L3NwYW4+YFxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9lbGxpcHNpcyBvLWVsbGlwc2lzXCI+4oCmPC9zcGFuPmBcbiAgICAgIGZvciAobGV0IGkgPSBjdXJJbmRleDsgaSA8IGN1ckluZGV4ICsgMzsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSBjdXJJbmRleCArIDEpIHtcbiAgICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW0gby1jdXJyZW50XCIgZGF0YS1pbmRleD1cIiR7aSAtIDF9XCI+JHtpIC0gMX08L3NwYW4+YFxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtXCIgZGF0YS1pbmRleD1cIiR7aSAtIDF9XCI+JHtpIC0gMX08L3NwYW4+YFxuICAgICAgfVxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9lbGxpcHNpcyBvLWVsbGlwc2lzXCI+4oCmPC9zcGFuPmBcbiAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbVwiIGRhdGEtaW5kZXg9XCIke3BhZ2V9XCI+JHtwYWdlfTwvc3Bhbj5gXG4gICAgfSBlbHNlIGlmIChjdXJJbmRleCA8IDMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSBjdXJJbmRleCAtIDEpIHtcbiAgICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW0gby1jdXJyZW50XCIgZGF0YS1pbmRleD1cIiR7aSArIDF9XCI+JHtpICsgMX08L3NwYW4+YFxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtXCIgZGF0YS1pbmRleD1cIiR7aSArIDF9XCI+JHtpICsgMX08L3NwYW4+YFxuICAgICAgfVxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9lbGxpcHNpcyBvLWVsbGlwc2lzXCI+4oCmPC9zcGFuPmBcbiAgICAgIHN0ciArPSBgPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX2xpc3RfaXRlbVwiIGRhdGEtaW5kZXg9XCIke3BhZ2V9XCI+JHtwYWdlfTwvc3Bhbj5gXG4gICAgfSBlbHNlIGlmIChjdXJJbmRleCA+IHBhZ2UgLSAyKSB7XG4gICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiMVwiPjE8L3NwYW4+YFxuICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9lbGxpcHNpcyBvLWVsbGlwc2lzXCI+4oCmPC9zcGFuPmBcbiAgICAgIGZvciAobGV0IGkgPSBwYWdlIC0gMjsgaSA8PSBwYWdlOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGN1ckluZGV4KSB7XG4gICAgICAgICAgc3RyICs9IGA8c3BhbiBjbGFzcz1cInBhZ2luYXRpb25fbGlzdF9pdGVtIG8tY3VycmVudFwiIGRhdGEtaW5kZXg9XCIke2l9XCI+JHtpfTwvc3Bhbj5gXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gYDxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9saXN0X2l0ZW1cIiBkYXRhLWluZGV4PVwiJHtpfVwiPiR7aX08L3NwYW4+YFxuICAgICAgfVxuICAgIH1cbiAgICBwYWdpbmF0aW9uTGlzdC5pbm5lckhUTUwgPSBzdHJcbiAgICBzdHIgPSBudWxsXG4gIH1cblxuICBwYWdpbmF0aW9uTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZS50YXJnZXRcbiAgICBpZiAoZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWVsbGlwc2lzJykgfHwgZXZlbnRUYXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnc3BhbicpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBjb3VudCA9IE51bWJlcihldmVudFRhcmdldC5kYXRhc2V0LmluZGV4KVxuICAgIGV2ZW50VGFyZ2V0SW5kZXggPSBOdW1iZXIoZXZlbnRUYXJnZXQuZGF0YXNldC5pbmRleClcbiAgICBwYWdpbmF0aW9uTGlzdEl0ZW0gPSBwYWdpbmF0aW9uTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbl9saXN0X2l0ZW0nKVxuICAgIGxpa2VBcnkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYWdpbmF0aW9uTGlzdEl0ZW0pXG4gICAgbGlrZUFyeS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKE51bWJlcihpdGVtLmRhdGFzZXQuaW5kZXgpID09PSBjb3VudCkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ28tY3VycmVudCcpXG4gICAgICAgIHBhZ2luYXRpb25Db3VudCA9IGluZGV4XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ28tY3VycmVudCcpXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocGFnZSA+IDQpIHtcbiAgICAgIHBhZ2luYXRpb25DaGFuZ2UoY291bnQpXG4gICAgfVxuICAgIHBhZ2VDaGFuZ2UoKVxuICAgIHRyaW1taW5nVGV4dE1haW4oKVxuICAgIHNtb290aFNjcm9sbFRvcCgpXG5cbiAgICBpZiAoY291bnQgIT09IDEpIHtcbiAgICAgIHByZXYuY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldi5jbGFzc0xpc3QuYWRkKCdvLWhpZGUnKVxuICAgIH1cblxuICAgIGlmIChjb3VudCA9PT0gcGFnZSkge1xuICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKCdvLWhpZGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ28taGlkZScpXG4gICAgfVxuICB9KVxuXG4gIG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcGFnaW5hdGlvbkNvdW50KytcbiAgICBwcmV2LmNsYXNzTGlzdC5yZW1vdmUoJ28taGlkZScpXG4gICAgaWYgKHBhZ2UgPD0gNCkge1xuICAgICAgY291bnQgPSBOdW1iZXIobGlrZUFyeVtwYWdpbmF0aW9uQ291bnRdLmRhdGFzZXRbJ2luZGV4J10pXG4gICAgICBpZiAoY291bnQgPT09IHBhZ2UpIHtcbiAgICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKCdvLWhpZGUnKVxuICAgICAgfVxuICAgICAgbGlrZUFyeS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ28tY3VycmVudCcpXG4gICAgICAgIGxpa2VBcnlbcGFnaW5hdGlvbkNvdW50XS5jbGFzc0xpc3QuYWRkKCdvLWN1cnJlbnQnKVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPiA0KSB7XG4gICAgICBldmVudFRhcmdldEluZGV4KytcbiAgICAgIGNvdW50ID0gZXZlbnRUYXJnZXRJbmRleFxuICAgICAgaWYgKGV2ZW50VGFyZ2V0SW5kZXggPT09IHBhZ2UpIHtcbiAgICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKCdvLWhpZGUnKVxuICAgICAgfVxuICAgICAgcGFnaW5hdGlvbkNoYW5nZShldmVudFRhcmdldEluZGV4KVxuICAgIH1cbiAgICBwYWdlQ2hhbmdlKClcbiAgICB0cmltbWluZ1RleHRNYWluKClcbiAgICBzbW9vdGhTY3JvbGxUb3AoKVxuICB9KVxuXG4gIHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcGFnaW5hdGlvbkNvdW50LS1cbiAgICBpZiAocGFnZSA8PSA0KSB7XG4gICAgICBjb3VudCA9IE51bWJlcihsaWtlQXJ5W3BhZ2luYXRpb25Db3VudF0uZGF0YXNldFsnaW5kZXgnXSlcbiAgICAgIGlmIChwYWdpbmF0aW9uQ291bnQgIT09IHBhZ2UpIHtcbiAgICAgICAgbmV4dC5jbGFzc0xpc3QucmVtb3ZlKCdvLWhpZGUnKVxuICAgICAgfVxuICAgICAgaWYgKHBhZ2luYXRpb25Db3VudCA9PT0gMCkge1xuICAgICAgICBwcmV2LmNsYXNzTGlzdC5hZGQoJ28taGlkZScpXG4gICAgICB9XG4gICAgICBsaWtlQXJ5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnby1jdXJyZW50JylcbiAgICAgICAgbGlrZUFyeVtwYWdpbmF0aW9uQ291bnRdLmNsYXNzTGlzdC5hZGQoJ28tY3VycmVudCcpXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAocGFnZSA+IDQpIHtcbiAgICAgIGV2ZW50VGFyZ2V0SW5kZXgtLVxuICAgICAgY291bnQgPSBldmVudFRhcmdldEluZGV4XG4gICAgICBpZiAoZXZlbnRUYXJnZXRJbmRleCAhPT0gcGFnZSkge1xuICAgICAgICBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ28taGlkZScpXG4gICAgICB9XG4gICAgICBpZiAoZXZlbnRUYXJnZXRJbmRleCA9PT0gMSkge1xuICAgICAgICBwcmV2LmNsYXNzTGlzdC5hZGQoJ28taGlkZScpXG4gICAgICB9XG4gICAgICBwYWdpbmF0aW9uQ2hhbmdlKGV2ZW50VGFyZ2V0SW5kZXgpXG4gICAgfVxuICAgIHBhZ2VDaGFuZ2UoKVxuICAgIHRyaW1taW5nVGV4dE1haW4oKVxuICAgIHNtb290aFNjcm9sbFRvcCgpXG4gIH0pXG5cbiAgbGV0IHBhZ2VDaGFuZ2UgPSAoKSA9PiB7XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG90YWwpLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPj0gKGNvdW50IC0gMSkgKiBtYXhTaG93ICYmIGluZGV4IDwgY291bnQgKiBtYXhTaG93KSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnby1oaWRlJylcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdvLXNob3cnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvLXNob3cnKVxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ28taGlkZScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcblxuZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9wICgpIHtcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgIHNjcm9sbFRvcDogMFxuICB9LCA1MDAsICdzd2luZycpXG59XG4iXSwibmFtZXMiOlsibGV0IiwiY29uc3QiLCJpIl0sIm1hcHBpbmdzIjoiOzs7OztFQUFBO0FBQ0E7RUFFQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLGNBQUs7SUFDL0NBLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFRO0lBQ2pDQyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFDO0lBQ3hEQSxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO0lBQ3REQSxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBQztJQUN4REEsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBQztJQUNuRUEsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUM7SUFDOUNBLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFDO0lBQzlDQSxJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTTtJQUM3QkEsSUFBTSxPQUFPLEdBQUcsR0FBRTtJQUNsQkEsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxFQUFDO0lBQzFDRCxJQUFJLEtBQUssR0FBRyxFQUFDO0lBQ2JBLElBQUksZUFBZSxHQUFHLEVBQUM7SUFDdkJBLElBQUksZ0JBQWdCLEdBQUcsRUFBQzs7SUFFeEJDLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxH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
