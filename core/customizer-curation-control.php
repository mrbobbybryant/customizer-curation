<?php
if ( ! class_exists( 'WP_Customize_Control' ) ) {
	return null;
}
class Customizer_Curation extends WP_Customize_Control {

    public $id;

	public $resource;

	public $description;

	public $placeholder = '';

	public $options;

	public $value = [];

	public $list = false;

    private $max = false;

	public function __construct( $manager, $id, $args = array() ) {
		parent::__construct( $manager, $id, $args );

		if ( ! isset( $args['resource'] ) || empty( $args['resource'] ) ) {
		    $this->resource = 'posts';
        } else {
		    $this->resource = $args['resource'];
        }

        if ( isset( $args['list'] ) && ! empty( $args['list']) ) {
		    $this->list = true;
        }

		if ( isset( $args['description'] ) && ! empty( $args['description']) ) {
			$this->description = $args['description'];
		}

		if ( isset( $args['placeholder'] ) && ! empty( $args['placeholder']) ) {
			$this->placeholder = $args['placeholder'];
		}

        if ( isset( $args['max'] )  && ! empty( $args['max'] ) ) {
            if ( ! is_numeric( $args['max'] ) ) {
                throw new Exception( 'Customizer Curator expects Max argument to be a number.' );
            }

            $this->max = $args['max'];
        }

        $this->options = $this->fetch_initial_options();
	}

	public function enqueue() {
		wp_enqueue_script(
            'customizer-curation-js',
			local_url( 'dist/index.bundle.js', __DIR__ ),
            array( 'jquery' ),
            CUSTOMIZER_CURATION_VERSION,
            true
        );

		wp_enqueue_style(
			'customizer-curation-css',
			local_url( 'dist/index.bundle.css', __DIR__ ),
			array( 'dragula-css' ),
			CUSTOMIZER_CURATION_VERSION
		);

		wp_enqueue_style(
			'dragula-css',
			'https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.2/dragula.min.css',
			array(),
			OMG_FIELDS_VERSION
		);

		wp_localize_script(
			'customizer-curation-js',
			'CustomizerCuration',
            [
                'baseURL'   =>  site_url(),
                'resource'  =>  $this->resource,
                'list'      =>  $this->list
            ]
        );
	}

	public function render_content() {

		$values = $this->value();

		$values = json_decode( $values );
		?>

		<div class="customizer-curation-control">
            <span class="customize-control-title">
                <label for="customizer-curation-input-<?php echo $this->id; ?>"><?php echo $this->label ?></label>
            </span>

            <?php if ( ! empty( $this->description ) ) : ?>
                <p class="customizer-curation-description">
                    <?php echo esc_html( $this->description ); ?>
                </p>
            <?php endif; ?>
            <?php if ( true === $this->list ) {
                echo $this->render_autosuggest_list( $values );
            } else {
                echo $this->render_autosuggest( $values );
            } ?>
		</div>
		<?php
	}

	private function render_autosuggest_list( $values ) {
		if ( empty( $values ) ) {
			$values = [];
		}

        $disabled = ( count( $values ) === $this->max ) ? 'disabled' : '';
        $max = ( $this->max ) ? sprintf('data-max="%s"', $this->max ) : '';


	    ob_start(); ?>

        <div class="customizer-curation-list">
	        <?php echo $this->build_autosuggest_list( $values, 'customizer-curation-list-list' ); ?>
            <input
                type="text"
                name="<?php echo $this->id; ?>"
                placeholder="<?php echo esc_attr( $this->placeholder ); ?>"
                class="customizer-curation-list-input"
                id="customizer-curation-input-<?php echo $this->id; ?>"
                list="<?php echo $this->id; ?>"
                <?php echo $max;?>
                <?php echo $disabled;?>
            />
            <datalist id="<?php echo $this->id; ?>">
		        <?php echo $this->render_initial_options() ?>
            </datalist>
            <input <?php $this->link(); ?> class="input__field customizer-curation-list-hidden" type="hidden" value="<?php echo json_encode( [1,2,3] ); ?>" />
        </div>

        <?php return ob_get_clean();
    }

    private function build_autosuggest_list( $listItems, $class ) {
	    ob_start(); ?>
        <ul class="<?php echo esc_attr( $class ); ?>">
		    <?php foreach( $listItems as $value ) : ?>
                <li class=text-list-item data-id="<?php echo esc_attr( $value->id ); ?>">
                    <span><?php echo esc_html( $value->title ); ?></span>
                    <div class="list-icon">
                        <svg viewBox="0 0 20 20">
                            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
                        </svg>
                    </div>
                </li>
		    <?php endforeach; ?>
        </ul>
	    <?php return ob_get_clean();
    }

    private function render_autosuggest( $values ) {
        ob_start(); ?>

        <div class="customizer-curation">
            <input
                class="input__field customizer-curation-input"
                placeholder="<?php echo esc_attr( $this->placeholder ); ?>"
                type="text"
                list="<?php echo esc_attr( $this->id ); ?>"
                value="<?php echo esc_attr( ( ! empty( $values ) ) ? $values->title : '' ); ?>"
            />
            <datalist id="<?php echo esc_attr( $this->id ); ?>"></datalist>
            <input
                class="input__field customizer-curation-hidden"
                type="hidden"
	            <?php $this->link(); ?>
                value="<?php echo esc_attr( json_encode( $values ) ); ?>"
            />
        </div>

        <?php return ob_get_clean();
    }

	private function fetch_initial_options() {
	    $args = [
            'post_type'                 =>  $this->resource,
            'post_status'               =>  'publish',
            'no_found_rows'             =>  true,
            'update_post_meta_cache'    =>  false,
            'update_post_term_cache'    =>  false,
        ];

	    $posts = new \WP_Query( $args );

	    if ( is_wp_error( $posts ) || ! $posts->have_posts() ) {
	        return [];
        }

        return $posts->posts;
    }

    private function render_initial_options() {
	    ob_start();
	    foreach ( $this->options as $option ) { ?>
            <option value="<?php echo esc_attr( $option->post_title ); ?>" data-id="<?php echo esc_attr( $option->ID ); ?>">
        <?php }

        return ob_get_clean();
    }

}
