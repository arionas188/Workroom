<?php
header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.workroomarchitects.gr/</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.workroomarchitects.gr/projects.html</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.workroomarchitects.gr/news.html</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.workroomarchitects.gr/cookies_policy.html</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://www.workroomarchitects.gr/Privacy_Policy.html</loc>
    <lastmod><?php echo date('Y-m-d'); ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>