<?php

/**
 * Preloader template.
 *
 * This template can be overriden by copying this file to your-theme/bs-preloader-main/preloader.php
 *
 * @author 		bootScore
 * @package 	bS Preloader
 * @version   5.0.1.5
 */

if (!defined('ABSPATH')) exit; // Don't allow direct access

?>

<div id="preloader" class="align-items-center justify-content-center position-fixed top-0 end-0 bottom-0 start-0 zi-1070">
  <div id="status" class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>