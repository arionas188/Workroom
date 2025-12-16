<?php
header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.workroomarchitects.gr/sitemap-main.php</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.workroomarchitects.gr/sitemap-projects.php</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.workroomarchitects.gr/sitemap-images.php</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
  </sitemap>
</sitemapindex>