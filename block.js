( function( blocks, editor, i18n, element, components, _ ) {
    var __ = i18n.__;
	var el = element.createElement;
	var MediaUpload = editor.MediaUpload;
    var RichText = editor.RichText;
	blocks.registerBlockType( 'sylletka/file-thumbnail', {
		title: i18n.__( 'File thumbnail', 'file-thumbnail' ),
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
					el( 'div', { className: 'file-thumbnail' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? __( 'Select media', 'file-thumbnail' ) : el( 'img', {  src: attributes.mediaThumbnailURL } )
								);
							}
						} )
					),
                    el( RichText, {
						tagName: 'div',
						inline: true,
						placeholder: __( 'Label', 'file-thumbnail' ),
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
					el( 'figure', { className: 'file-thumbnail' },
                        el( 'a', { href: attributes.mediaURL },
                            el( 'img', { src: attributes.mediaThumbnailURL } ),
                        ),
                        el( 'figcaption', { className: 'file-thumbnail-label'}, attributes.mediaLabel),
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
