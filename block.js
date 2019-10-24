( function( blocks, editor, i18n, element, components, _ ) {
    var __ = i18n.__;
    var el = element.createElement;
    var MediaUpload = editor.MediaUpload;
    var RichText = editor.RichText;
    var InspectorControls = editor.InspectorControls;
    var ColorPicker = wp.components.ColorPicker;
    var CheckboxControl = wp.components.CheckboxControl;
    var RangeControl  = wp.components.RangeControl;
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
            },
            borderColor: {
                type: 'string',
            },
            borderWidth: {
                type: 'integer',
            },
            shadow:{
                type: 'boolean',
            },
            shadowHOffset:{
                type: 'integer',
            },
            shadowVOffset:{
                type: 'integer',
            },
            shadowBlur:{
                type: 'integer',
            },
            shadowColor:{
                type: 'string',
            },
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
                    mediaThumbnailURL:
                    media.sizes ? media.sizes.thumbnail.url : media.icon,
                } );
            };
            return (
                el( 'div', { className: props.className,  },
                    el( 'div', { className: 'file-thumbnail' },
                        el( MediaUpload, {
                            onSelect: onSelectImage,
                            value: attributes.mediaID,
                            render: function( obj ) {
                                return el( components.Button,
                                    {
                                        className: attributes.mediaID ? 'image-button' : 'button button-large',
                                        onClick: obj.open
                                    },
                                    ! attributes.mediaID
                                    ? __( 'Select media', 'file-thumbnail' )
                                    : el(
                                        'img', {
                                            src: attributes.mediaThumbnailURL,
                                            style: {
                                                borderColor:  attributes.borderColor || 'transparent',
                                                borderWidth: attributes.borderWidth || '0' + 'px',
                                                borderStyle: 'solid',
                                                boxShadow:
                                                attributes.shadow &&
                                                    ( attributes.shadowHOffset || '0') + 'px ' +
                                                    ( attributes.shadowVOffset || '0') + 'px ' +
                                                    ( attributes.shadowBlur || '0') + 'px ' +
                                                    ( attributes.shadowColor || 'transparent' )
                                            }
                                        }
                                    )
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
                        }
                    } ),
                    el( InspectorControls,
                        {}, [
                            el( RangeControl, {
                                label: 'Border width',
                                value: props.attributes.borderWidth,
                                min: 0,
                                max: 10,
                                onChange: ( value ) => {
                                    props.setAttributes( { borderWidth: value } );
                                }
                            } ),
                            el( ColorPicker, {
                                label: 'Border color',
                                value: props.attributes.borderColor,
                                onChangeComplete: ( value ) => {
                                    props.setAttributes( { borderColor: value.hex } );
                                }
                            } ),
                            el( CheckboxControl,{
                                label: 'Shadow',
                                checked: props.attributes.shadow,
                                onChange: ( value ) => {
                                    props.setAttributes( { shadow: value } );
                                }
                            } ),
                            props.attributes.shadow ? [
                                el( RangeControl, {
                                    label: 'Shadow horizontal offset',
                                    value: props.attributes.shadowHOffset,
                                    min: -25,
                                    max: 25,
                                    onChange: ( value ) => {
                                        props.setAttributes( { shadowHOffset: value } );
                                    }
                                } ),
                                el( RangeControl, {
                                    label: 'Shadow vertical offset',
                                    value: props.attributes.shadowVOffset,
                                    min: -25,
                                    max: 25,
                                    onChange: ( value ) => {
                                        props.setAttributes( { shadowVOffset: value } );
                                    }
                                } ),
                                el( RangeControl, {
                                    label: 'Shadow blur',
                                    value: props.attributes.shadowBlur,
                                    min: 0,
                                    max: 25,
                                    onChange: ( value ) => {
                                        props.setAttributes( { shadowBlur: value } );
                                    }
                                } ),
                                el( ColorPicker, {
                                    label: 'Shadow color',
                                    value: props.attributes.shadowColor,
                                    onChangeComplete: ( value ) => {
                                        props.setAttributes( { shadowColor: value.hex } );
                                    }
                                } )
                            ] : []
                        ]
                    )
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
                            el( 'img', {
                                src: attributes.mediaThumbnailURL,
                                style: {
                                    borderColor: attributes.borderColor || 'transparent',
                                    borderWidth: attributes.borderWidth || '0' + 'px',
                                    borderStyle: 'solid',
                                    boxShadow:
                                    attributes.shadow &&
                                        ( attributes.shadowHOffset || '0') + 'px ' +
                                        ( attributes.shadowVOffset || '0') + 'px ' +
                                        ( attributes.shadowBlur || '0') + 'px ' +
                                        ( attributes.shadowColor || 'transparent' )
                                    }
                                }
                            )
                        ),
                        el( 'figcaption', { className: 'file-thumbnail-label'}, attributes.mediaLabel ),
                    )
                )
            );
        }
    } );
} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.i18n,
    window.wp.element,
    window.wp.components,
    window._,
);
