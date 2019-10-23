( function( blocks, editor, i18n, element, components, _ ) {
    var __ = i18n.__;
	var el = element.createElement;
	var MediaUpload = editor.MediaUpload;
    var RichText = editor.RichText;
	blocks.registerBlockType( 'pdf-preview/pdf-preview', {
		title: i18n.__( 'PDF preview', 'pdf-preview' ),
		icon: 'index-card',
		category: 'layout',
		attributes: {
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'href',
			},
			mediaThumbnailURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
            mediaLabel: {
                type: 'string',
            }
		},
        supports: {
            align: true,
            alignWide: true
        },
        edit: function( props ) {
            var attributes = props.attributes;
			var onSelectImage = function( media ) {
				return props.setAttributes( {
                    mediaID: media.id,
					mediaURL: media.url,
                    mediaThumbnailURL: media.sizes.thumbnail.url,
				} );
			};
			return (
				el( 'div', { className: props.className,  },
					el( 'div', { className: 'pdf-preview' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: ['application/pdf'],
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? __( 'Upload Image', 'pdf-preview' ) : el( 'img', {  src: attributes.mediaThumbnailURL } )
								);
							}
						} )
					),
                    el( RichText, {
						tagName: 'div',
						inline: true,
						placeholder: __( 'Label', 'pdf-preview' ),
						value: attributes.mediaLabel,
						onChange: function( value ) {
							props.setAttributes( { mediaLabel: value } );
						},
					} ),
				)
			);
		},
		save: function( props ) {
			var attributes = props.attributes;
			return (
				el( 'div', { className: props.className },
					attributes.mediaID &&
					el( 'figure', { className: 'pdf-preview-block' },
                        el( 'a', { href: attributes.mediaURL },
                            el( 'img', { src: attributes.mediaThumbnailURL } ),
                        ),
                        el( 'figcaption', { className: 'pdf-preview-label'}, attributes.mediaLabel),
					),
				)
			);
		},
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
