<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Kanopi
 */

$copyright = get_option( 'copyright' ) ?? 'Kanopi Studios';

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="container">
			<div class="site-info">
				<span>&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php echo esc_html( $copyright ); ?>| All Rights Reserved</span>

				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'kanopi' ) ); ?>">
					<?php
					/* translators: %s: CMS name, i.e. WordPress. */
					printf( esc_html__( 'Proudly powered by %s', 'kanopi' ), 'WordPress' );
					?>
				</a>
				<span class="sep"> | </span>
					<?php
					/* translators: 1: Theme name, 2: Theme author. */
					printf( esc_html__( 'Theme: %1$s by %2$s.', 'kanopi' ), 'kanopi', '<a href="http://kanopistudios.com">Shane Robinson</a>' );
					?>
			</div><!-- .site-info -->
		</div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
