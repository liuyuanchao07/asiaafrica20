(function () {
  'use strict';

  /* eslint-disable*/
  document.addEventListener('DOMContentLoaded', function () {
    var truncate = Truncator.truncate;
    var truncWrapper = Array.prototype.slice.call(document.querySelectorAll('.archive_item'));
    var agent = navigator.userAgent.toLowerCase();
    var truncContents = truncWrapper.map(function (item) {
      return item.querySelector('.archive_text').innerHTML
    });
    var isSp = function () {
      return (document.documentElement.clientWidth || document.body.clientWidth) < 768
    };
    var trimmingTextMain = function () {
      truncWrapper.forEach(function (item, index) {
        var truncContent = item.querySelector('.archive_text');
        if (isSp()) {
          if (agent.indexOf('iphone') > -1) {
            truncate(truncContent, truncContents[index], {line: 4});
          } else if (agent.indexOf('android') > -1) {
            truncate(truncContent, truncContents[index], {line: 5});
          }
        } else {
          truncContent.innerHTML = truncContents[index];
        }
      });
    };
    trimmingTextMain();

    window.addEventListener('resize', function () {
      trimmingTextMain();
    });
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdHJpbS5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3RyaW0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbGV0IHRydW5jYXRlID0gVHJ1bmNhdG9yLnRydW5jYXRlXG4gIGNvbnN0IHRydW5jV3JhcHBlciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcmNoaXZlX2l0ZW0nKSlcbiAgY29uc3QgYWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbiAgY29uc3QgdHJ1bmNDb250ZW50cyA9IHRydW5jV3JhcHBlci5tYXAoKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYXJjaGl2ZV90ZXh0JykuaW5uZXJIVE1MXG4gIH0pXG4gIGNvbnN0IGlzU3AgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkgPCA3NjhcbiAgfVxuICBjb25zdCB0cmltbWluZ1RleHRNYWluID0gKCkgPT4ge1xuICAgIHRydW5jV3JhcHBlci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdHJ1bmNDb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYXJjaGl2ZV90ZXh0JylcbiAgICAgIGlmIChpc1NwKCkpIHtcbiAgICAgICAgaWYgKGFnZW50LmluZGV4T2YoJ2lwaG9uZScpID4gLTEpIHtcbiAgICAgICAgICB0cnVuY2F0ZSh0cnVuY0NvbnRlbnQsIHRydW5jQ29udGVudHNbaW5kZXhdLCB7bGluZTogNH0pXG4gICAgICAgIH0gZWxzZSBpZiAoYWdlbnQuaW5kZXhPZignYW5kcm9pZCcpID4gLTEpIHtcbiAgICAgICAgICB0cnVuY2F0ZSh0cnVuY0NvbnRlbnQsIHRydW5jQ29udGVudHNbaW5kZXhdLCB7bGluZTogNX0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRydW5jQ29udGVudC5pbm5lckhUTUwgPSB0cnVuY0NvbnRlbnRzW2luZGV4XVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgdHJpbW1pbmdUZXh0TWFpbigpXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICB0cmltbWluZ1RleHRNYWluKClcbiAgfSlcbn0pXG4iXSwibmFtZXMiOlsibGV0IiwiY29uc3QiXSwibWFwcGluZ3MiOiI7OztFQUFBO0VBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixjQUFLO0lBQy9DQSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUTtJQUNqQ0MsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsRUFBQztJQUMzRkEsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUU7SUFDL0NBLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxHQUFHLFdBQUUsSUFBSSxFQUFFO01BQzVDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTO0tBQ3JELEVBQUM7SUFDRkEsSUFBTSxJQUFJLGVBQU07TUFDZCxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksR0FBRztNQUNqRjtJQUNEQSxJQUFNLGdCQUFnQixlQUFNO01BQzFCLFlBQVksQ0FBQyxPQUFPLFdBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUNqQ0EsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUM7UUFDeEQsSUFBSSxJQUFJLEVBQUUsRUFBRTtVQUNWLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQztXQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4QyxRQUFRLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQztXQUN4RDtTQUNGLE1BQU07VUFDTCxZQUFZLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUM7U0FDOUM7T0FDRixFQUFDO01BQ0g7SUFDRCxnQkFBZ0IsR0FBRTs7SUFFbEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsY0FBSztNQUNuQyxnQkFBZ0IsR0FBRTtLQUNuQixFQUFDO0dBQ0gsQ0FBQzs7OzsifQ==