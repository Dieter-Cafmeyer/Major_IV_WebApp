<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webapp</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>

  <script>
    WebFontConfig = {
      custom: {
        families: ['pier'],
        urls: ['/assets/fonts/fonts.css']
      }
    };

    (function() {
      var wf = document.createElement('script');
      wf.src = 'js/vendor/webfontloader.min.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
    </script>

  <link rel="stylesheet" type="text/css" href="<?php echo $basePath;?>/css/style.css"/>
</head>
<body>
  <div class="react-app">
  </div>
  <script>
  window.app = window.app || {};
  window.app.basename = '<?php echo $basePath;?>';
  </script>
  <script src="<?php echo $basePath;?>/js/script.js"></script>
</body>
</html>
